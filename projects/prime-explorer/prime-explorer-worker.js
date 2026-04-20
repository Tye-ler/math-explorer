/**
 * Prime Explorer — off-main-thread spiral data build (sieve + coordinates + optional aggregate bins).
 * Loaded as a classic Worker (no imports). Keep in sync with index.html math for plot modes.
 */
(function () {
  "use strict";

  const PRIME_STACK_GROUP_INNER_DY = 0.22;
  const AGG_GRID_DEFAULT = 320;

  function sieveToUint8(limit) {
    const n = Math.max(2, limit | 0);
    const isPrime = new Uint8Array(n + 1);
    isPrime.fill(1);
    isPrime[0] = 0;
    isPrime[1] = 0;
    const max = Math.floor(Math.sqrt(n));
    for (let p = 2; p <= max; p++) {
      if (!isPrime[p]) continue;
      for (let m = p * p; m <= n; m += p) isPrime[m] = 0;
    }
    return isPrime;
  }

  function classify(n, isP) {
    if (n === 1) return "neither";
    return isP[n] ? "prime" : "composite";
  }

  function shouldShowInteger(n, kind, visibility, factorArr, useFilter) {
    if (visibility === "primes" && kind !== "prime") return false;
    if (visibility === "composites" && kind !== "composite") return false;
    if (kind !== "composite") return true;
    if (!useFilter) return true;
    for (let i = 0; i < factorArr.length; i++) {
      const p = factorArr[i];
      if (p !== 0 && n % p === 0) return false;
    }
    return true;
  }

  function polarRtilde(n, preset) {
    if (preset === "sqrt") return Math.sqrt(n);
    if (preset === "linear") return n;
    return Math.log(n + 1);
  }

  function polarXY(n, m, a, preset, radialSpacing) {
    const s = radialSpacing === undefined ? 1 : radialSpacing;
    const dTheta = (2 * Math.PI) / m;
    const theta = n * dTheta;
    const rTilde = polarRtilde(n, preset);
    const r = s * a * rTilde;
    return { x: r * Math.cos(theta), y: r * Math.sin(theta) };
  }

  /** O(N) lattice coords for classic square spiral, 1…N. */
  /** Must match index.html `transformSquareDupLattice` (flip → q×90° CCW → translate). */
  function transformSquareDupLattice(x, y, flipLR, rotQ, dx, dy) {
    let ax = x | 0;
    let ay = y | 0;
    if (flipLR) ax = -ax;
    let q = ((rotQ % 4) + 4) % 4;
    for (let i = 0; i < q; i++) {
      const nx = -ay;
      const ny = ax;
      ax = nx;
      ay = ny;
    }
    return { x: ax + (dx | 0), y: ay + (dy | 0) };
  }

  function fillSquareSpiralLattice(N, gx, gy) {
    gx[1] = 0;
    gy[1] = 0;
    if (N < 2) return;
    const dx = [1, 0, -1, 0];
    const dy = [0, 1, 0, -1];
    let x = 0;
    let y = 0;
    let k = 2;
    let len = 1;
    let dir = 0;
    outer: for (;;) {
      for (let side = 0; side < 2; side++) {
        for (let s = 0; s < len; s++) {
          x += dx[dir];
          y += dy[dir];
          gx[k] = x;
          gy[k] = y;
          if (k === N) break outer;
          k++;
        }
        dir = (dir + 1) % 4;
      }
      len++;
    }
  }

  /** O(N) prime stack columns (non-grouped). */
  function fillPrimeStackColumns(N, isP, gx, gy) {
    gx[1] = 0;
    gy[1] = 0;
    if (N < 2) return;
    const sh = new Int32Array(N + 2);
    let col = 0;
    for (let i = 2; i <= N; i++) {
      if (isP[i]) {
        col++;
        gx[i] = col;
        gy[i] = 0;
        sh[col] = 0;
      } else {
        sh[col]++;
        gx[i] = col;
        gy[i] = sh[col];
      }
    }
  }

  function nextPrimeStrictlyAfter(p, N, isP) {
    for (let i = p + 1; i <= N; i++) {
      if (isP[i]) return i;
    }
    return N + 1;
  }

  function compositeCountBeforeNextPrime(p, N, isP) {
    const np = nextPrimeStrictlyAfter(p, N, isP);
    return Math.max(0, np - p - 1);
  }

  function fillPrimeStackGrouped2DLattice(N, isP, gx, gy) {
    gx.fill(0);
    gy.fill(0);
    gx[1] = 0;
    gy[1] = 0;
    if (N < 2) return;
    const occByC = Object.create(null);
    const primeGx = new Float32Array(N + 1);
    const primeGy = new Float32Array(N + 1);
    for (let p = 2; p <= N; p++) {
      if (!isP[p]) continue;
      const c = compositeCountBeforeNextPrime(p, N, isP);
      const yslot = occByC[c] | 0;
      occByC[c] = yslot + 1;
      primeGx[p] = c;
      primeGy[p] = yslot;
      gx[p] = c;
      gy[p] = yslot;
    }
    for (let n = 2; n <= N; n++) {
      if (isP[n]) continue;
      let p = n - 1;
      while (p >= 2 && !isP[p]) p--;
      if (p < 2) continue;
      gx[n] = primeGx[p];
      gy[n] = primeGy[p] + (n - p) * PRIME_STACK_GROUP_INNER_DY;
    }
  }

  function smallestSurvivingComposite(N, isP, factorArr) {
    for (let n = 4; n <= N; n++) {
      if (classify(n, isP) !== "composite") continue;
      let blocked = false;
      for (let i = 0; i < factorArr.length; i++) {
        const p = factorArr[i];
        if (p !== 0 && n % p === 0) {
          blocked = true;
          break;
        }
      }
      if (!blocked) return n;
    }
    return -1;
  }

  function computeWorldXY(
    plotMode,
    n,
    cell,
    m,
    a,
    preset,
    radialSpacing,
    isP,
    gxPS,
    gyPS,
    sqGx,
    sqGy,
    psGx,
    psGy
  ) {
    if (plotMode === "square") {
      return { wx: sqGx[n] * cell, wy: sqGy[n] * cell, gxd: sqGx[n], gyd: sqGy[n] };
    }
    if (plotMode === "prime-stack") {
      if (gxPS && gyPS) {
        return { wx: gxPS[n] * cell, wy: gyPS[n] * cell, gxd: gxPS[n], gyd: gyPS[n] };
      }
      return { wx: psGx[n] * cell, wy: psGy[n] * cell, gxd: psGx[n], gyd: psGy[n] };
    }
    const p = polarXY(n, m, a, preset, radialSpacing);
    return { wx: p.x, wy: p.y, gxd: Math.abs(p.x) / (cell || 1), gyd: Math.abs(p.y) / (cell || 1) };
  }

  self.onmessage = function (ev) {
    const msg = ev.data || {};
    const jobId = msg.jobId | 0;
    const clientDataKey = typeof msg.clientDataKey === "string" ? msg.clientDataKey : "";
    const N = Math.max(1, Math.floor(msg.N) || 1);
    const plotMode = msg.plotMode || "polar";
    const m = Math.max(1, Math.floor(msg.m) || 1);
    const a = Number(msg.a) || 0.1;
    const preset = msg.preset || "sqrt";
    const radialSpacing = msg.radialSpacing !== undefined ? Number(msg.radialSpacing) : 1;
    const cell = Number(msg.cell) || 1;
    const visibility = msg.visibility || "all";
    const useFilter = !!msg.useFilter;
    const factorPrimes = Array.isArray(msg.factorPrimes) ? msg.factorPrimes : [];
    const primeStackGroupedDepth = !!msg.primeStackGroupedDepth;
    const outputMode = msg.outputMode === "aggregate" ? "aggregate" : "exact";
    const aggGrid = Math.max(64, Math.min(640, Math.floor(msg.aggregateGrid) || AGG_GRID_DEFAULT));
    const includeSquareOverlayAgg =
      plotMode === "square" &&
      outputMode === "aggregate" &&
      !!msg.includeSquareOverlayAgg;
    const sqFlip = !!msg.squareOverlayFlipLR;
    const sqRotQ = (((msg.squareOverlayRotQ | 0) % 4) + 4) % 4;
    const sqDx = msg.squareOverlayDx | 0;
    const sqDy = msg.squareOverlayDy | 0;

    try {
      const isP = sieveToUint8(N);
      let gxPS = null;
      let gyPS = null;
      let sqGx = null;
      let sqGy = null;
      let psGx = null;
      let psGy = null;

      if (plotMode === "square") {
        sqGx = new Float32Array(N + 1);
        sqGy = new Float32Array(N + 1);
        fillSquareSpiralLattice(N, sqGx, sqGy);
      } else if (plotMode === "prime-stack") {
        if (primeStackGroupedDepth) {
          gxPS = new Float32Array(N + 1);
          gyPS = new Float32Array(N + 1);
          fillPrimeStackGrouped2DLattice(N, isP, gxPS, gyPS);
        } else {
          psGx = new Float32Array(N + 1);
          psGy = new Float32Array(N + 1);
          fillPrimeStackColumns(N, isP, psGx, psGy);
        }
      }

      let cnt = 0;
      for (let n = 1; n <= N; n++) {
        const kind = classify(n, isP);
        if (!shouldShowInteger(n, kind, visibility, factorPrimes, useFilter)) continue;
        cnt++;
      }

      const survivor = smallestSurvivingComposite(N, isP, factorPrimes);

      if (outputMode === "aggregate") {
        let minX = Infinity;
        let maxX = -Infinity;
        let minY = Infinity;
        let maxY = -Infinity;
        let any = false;
        for (let n = 1; n <= N; n++) {
          const kind = classify(n, isP);
          if (!shouldShowInteger(n, kind, visibility, factorPrimes, useFilter)) continue;
          const w = computeWorldXY(
            plotMode,
            n,
            cell,
            m,
            a,
            preset,
            radialSpacing,
            isP,
            gxPS,
            gyPS,
            sqGx,
            sqGy,
            psGx,
            psGy
          );
          minX = Math.min(minX, w.wx);
          maxX = Math.max(maxX, w.wx);
          minY = Math.min(minY, w.wy);
          maxY = Math.max(maxY, w.wy);
          any = true;
        }

        const gridW = aggGrid;
        const gridH = aggGrid;
        const primeBins = new Int32Array(gridW * gridH);
        const nonPrimeBins = new Int32Array(gridW * gridH);

        let gHalfW = 1e-9;
        let gHalfH = 1e-9;

        if (any) {
          const rx = Math.max(maxX - minX, 1e-12);
          const ry = Math.max(maxY - minY, 1e-12);
          for (let n = 1; n <= N; n++) {
            const kind = classify(n, isP);
            if (!shouldShowInteger(n, kind, visibility, factorPrimes, useFilter)) continue;
            const w = computeWorldXY(
              plotMode,
              n,
              cell,
              m,
              a,
              preset,
              radialSpacing,
              isP,
              gxPS,
              gyPS,
              sqGx,
              sqGy,
              psGx,
              psGy
            );
            if (plotMode === "square" || plotMode === "prime-stack") {
              gHalfW = Math.max(gHalfW, Math.abs(w.gxd));
              gHalfH = Math.max(gHalfH, Math.abs(w.gyd));
            } else {
              gHalfW = Math.max(gHalfW, Math.abs(w.wx));
              gHalfH = Math.max(gHalfH, Math.abs(w.wy));
            }
            const ix = Math.min(gridW - 1, Math.max(0, Math.floor(((w.wx - minX) / rx) * gridW)));
            const iy = Math.min(gridH - 1, Math.max(0, Math.floor(((w.wy - minY) / ry) * gridH)));
            const idx = iy * gridW + ix;
            if (kind === "prime") primeBins[idx]++;
            else nonPrimeBins[idx]++;
          }
        }

        let sqOvOrigPrime = null;
        let sqOvDupPrime = null;
        if (includeSquareOverlayAgg && sqGx && any) {
          sqOvOrigPrime = new Int32Array(gridW * gridH);
          sqOvDupPrime = new Int32Array(gridW * gridH);
          const rx0 = Math.max(maxX - minX, 1e-12);
          const ry0 = Math.max(maxY - minY, 1e-12);
          for (let n = 1; n <= N; n++) {
            const kind = classify(n, isP);
            if (kind !== "prime") continue;
            if (!shouldShowInteger(n, kind, visibility, factorPrimes, useFilter)) continue;
            const gxn = sqGx[n];
            const gyn = sqGy[n];
            const wwx = gxn * cell;
            const wwy = gyn * cell;
            const ixO = Math.min(gridW - 1, Math.max(0, Math.floor(((wwx - minX) / rx0) * gridW)));
            const iyO = Math.min(gridH - 1, Math.max(0, Math.floor(((wwy - minY) / ry0) * gridH)));
            sqOvOrigPrime[iyO * gridW + ixO]++;

            const t = transformSquareDupLattice(gxn, gyn, sqFlip, sqRotQ, sqDx, sqDy);
            const dwx = t.x * cell;
            const dwy = t.y * cell;
            const ixD = Math.min(gridW - 1, Math.max(0, Math.floor(((dwx - minX) / rx0) * gridW)));
            const iyD = Math.min(gridH - 1, Math.max(0, Math.floor(((dwy - minY) / ry0) * gridH)));
            sqOvDupPrime[iyD * gridW + ixD]++;
          }
        }

        const transfer = [primeBins.buffer, nonPrimeBins.buffer, isP.buffer];
        if (sqOvOrigPrime) transfer.push(sqOvOrigPrime.buffer, sqOvDupPrime.buffer);
        const aggPayload = {
          jobId,
          clientDataKey,
          N,
          ok: true,
          outputMode: "aggregate",
          count: cnt,
          survivor,
          isPrime: isP,
          gridW,
          gridH,
          primeBins,
          nonPrimeBins,
          worldMinX: any ? minX : 0,
          worldMaxX: any ? maxX : 0,
          worldMinY: any ? minY : 0,
          worldMaxY: any ? maxY : 0,
          gHalfW,
          gHalfH,
          plotMode,
          polarGuideN: 0,
          squareOverlayAggregate: !!(sqOvOrigPrime && sqOvDupPrime),
        };
        if (sqOvOrigPrime) {
          aggPayload.squareOvOrigPrimeBins = sqOvOrigPrime;
          aggPayload.squareOvDupPrimeBins = sqOvDupPrime;
        }
        self.postMessage(aggPayload, transfer);
        return;
      }

      /* exact */
      const wx = new Float32Array(cnt);
      const wy = new Float32Array(cnt);
      const nArr = new Uint32Array(cnt);
      const kindArr = new Uint8Array(cnt);
      let gi = 0;
      let gHalfW = 1e-9;
      let gHalfH = 1e-9;

      for (let n = 1; n <= N; n++) {
        const kind = classify(n, isP);
        if (!shouldShowInteger(n, kind, visibility, factorPrimes, useFilter)) continue;
        const w = computeWorldXY(
          plotMode,
          n,
          cell,
          m,
          a,
          preset,
          radialSpacing,
          isP,
          gxPS,
          gyPS,
          sqGx,
          sqGy,
          psGx,
          psGy
        );
        wx[gi] = w.wx;
        wy[gi] = w.wy;
        nArr[gi] = n;
        if (kind === "prime") kindArr[gi] = 1;
        else if (kind === "composite") kindArr[gi] = 0;
        else kindArr[gi] = 2;
        if (plotMode === "square" || plotMode === "prime-stack") {
          gHalfW = Math.max(gHalfW, Math.abs(w.gxd));
          gHalfH = Math.max(gHalfH, Math.abs(w.gyd));
        }
        gi++;
      }

      if (plotMode === "polar") {
        for (let i = 0; i < cnt; i++) {
          gHalfW = Math.max(gHalfW, Math.abs(wx[i]));
          gHalfH = Math.max(gHalfH, Math.abs(wy[i]));
        }
      }

      let polarGx = null;
      let polarGy = null;
      let polarGuideN = 0;
      const includePolarGuide = msg.includePolarGuide !== false && plotMode === "polar" && N >= 1 && N <= (msg.polarGuideMaxN | 0);
      if (includePolarGuide) {
        polarGuideN = N;
        polarGx = new Float32Array(N);
        polarGy = new Float32Array(N);
        for (let n = 1; n <= N; n++) {
          const p = polarXY(n, m, a, preset, radialSpacing);
          polarGx[n - 1] = p.x;
          polarGy[n - 1] = p.y;
        }
      }

      const transfer = [wx.buffer, wy.buffer, nArr.buffer, kindArr.buffer, isP.buffer];
      if (polarGx) transfer.push(polarGx.buffer, polarGy.buffer);

      self.postMessage(
        {
          jobId,
          clientDataKey,
          N,
          ok: true,
          outputMode: "exact",
          count: cnt,
          survivor,
          isPrime: isP,
          wx,
          wy,
          n: nArr,
          kind: kindArr,
          gHalfW,
          gHalfH,
          polarGuideN,
          polarGx,
          polarGy,
          primeStackGroupedDepth: plotMode === "prime-stack" && primeStackGroupedDepth,
          plotMode,
        },
        transfer
      );
    } catch (err) {
      self.postMessage({
        jobId,
        ok: false,
        error: String(err && err.message ? err.message : err),
      });
    }
  };
})();
