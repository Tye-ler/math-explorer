# Current Milestone — Set Comparator

## Active Milestone
`Milestone 4 — Truthful comparison and secondary consistency`

This autonomous run should complete the following slices in order:

1. `Slice D1 — Exact Venn restriction`
2. `Slice D2 — Explicit sampled projection mode`
3. `Slice D3 — Non-Venn comparison summaries`
4. `Slice E1 — Power set exactness enforcement`
5. `Slice E2 — Shared canonical result model`

Do not continue beyond this milestone in this run.

---

## Workspace Rules
- Work in the currently open `set-comparator/` workspace
- Work directly in the current branch
- Do not create worktrees
- Do not create extra branches
- Do not require a merge step for preview

Primary target:
`index.html`

If `index.html` is missing, stop and report the actual workspace/path state.

---

## Slice D1 — Exact Venn restriction

### Goal
Only use exact Venn decomposition for exact finite sets.

### Success checks
- exact Venn appears only when mathematically valid
- invalid exact-Venn cases are blocked or redirected
- existing valid finite exact comparisons still work
- page still loads successfully

### Out of scope
- sampled Venn mode
- final polish

---

## Slice D2 — Explicit sampled projection mode

### Goal
Provide an explicitly labeled sampled comparison/projection mode for non-finite or semantic sets.

### Success checks
- sampled mode is visibly labeled as approximation/projection
- sampling domain/window is declared
- sampled results are not presented as exact truth
- non-finite comparisons remain explorable

### Out of scope
- advanced visualization polish
- infinite exact region analysis

---

## Slice D3 — Non-Venn comparison summaries

### Goal
Provide useful comparison summaries that do not depend on Venn diagrams.

### Success checks
- comparison views can report exactness status
- comparison views can report containment/equality/membership facts
- non-finite comparisons remain useful even without exact Venn
- current valid exact comparisons do not regress

### Out of scope
- final aesthetics
- extra teaching content

---

## Slice E1 — Power set exactness enforcement

### Goal
Allow power set generation only for exact finite extensional sets, with clear messaging elsewhere.

### Success checks
- exact finite sets support power set correctly
- non-finite / symbolic / sampled-only sets do not pretend to have exact power set enumeration
- power set results align with the exactness model

### Out of scope
- new power-set-specific features
- general polish

---

## Slice E2 — Shared canonical result model

### Goal
Make builder, evaluator, comparison, Venn, and power set consume the same canonical set/result semantics.

### Success checks
- contradictory display logic is reduced or removed across tabs
- secondary views do not drift from core evaluation semantics
- the app behaves more consistently end-to-end
- page still loads successfully

### Out of scope
- visual redesign
- extra educational overlays