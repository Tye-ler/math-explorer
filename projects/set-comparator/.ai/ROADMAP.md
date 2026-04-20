# Roadmap — Set Comparator (Reset)

## Status Key
- [ ] not started
- [~] in progress
- [x] completed

---

# Phase A — Mathematical Contract
Goal: define what the tool can claim exactly, symbolically, or approximately.

## [ ] Slice A1 — Exactness model
### Goal
Introduce first-class exactness metadata for sets and results.

### Requirements
Every set / result should be classified as one of:
- exact finite
- exact semantic
- symbolic unresolved
- sampled approximation

### Success checks
- set objects or result objects expose exactness status
- evaluation outputs can report exactness status
- approximations are not silently treated as exact
- existing features still load

### Out of scope
- full evaluator rewrite
- Venn redesign
- visual polish

---

## [ ] Slice A2 — Truthful built-in set display
### Goal
Display built-in semantic sets as semantic sets, not as finite roster-like samples.

### Success checks
- `ℕ`, `ℤ`, `ℚ`, `ℝ`, `ℂ` are displayed as semantic objects
- sample displays, if any, are clearly labeled as samples/previews
- no built-in set is visually misrepresented as an exact finite roster set

### Out of scope
- expression parser rewrite
- new Venn behavior

---

## [ ] Slice A3 — Result truth classes
### Goal
Ensure evaluation results can distinguish:
- boolean truth
- exact set result
- symbolic set result
- sampled approximation
- unsupported / indeterminate

### Success checks
- result rendering reflects the result type accurately
- unsupported cases are shown explicitly instead of being forced into misleading output
- current result views do not regress

### Out of scope
- final UI polish
- full comparison overhaul

---

# Phase B — Unified Language Engine
Goal: one evaluator pipeline for expressions and operations.

## [ ] Slice B1 — Unify Operations and Expression pipelines
### Goal
Make the Operations workspace use the same parser / evaluator model as the Expression workspace.

### Success checks
- Operations and Expression tabs are backed by one coherent evaluation path
- operation buttons act as expression-building helpers, not a separate truth engine
- overlapping features produce consistent results

### Out of scope
- Venn overhaul
- builder redesign

---

## [ ] Slice B2 — Supported language contract
### Goal
Explicitly define and enforce the supported set language.

### Minimum supported forms
- roster literals
- named sets
- membership
- subset / proper subset
- equality / inequality
- union / intersection / difference / symmetric difference
- power set on exact finite sets
- supported derived-set rules

### Success checks
- unsupported forms fail clearly
- supported forms evaluate consistently
- the language surface is more predictable

### Out of scope
- theorem prover behavior
- arbitrary predicate logic

---

## [ ] Slice B3 — Symbolic vs extensional evaluation separation
### Goal
Separate symbolic results from extensional results instead of collapsing everything into displayed lists.

### Success checks
- finite extensional results stay exact
- symbolic results remain symbolic where appropriate
- sampled outputs occur only when explicitly needed for projection/exploration

### Out of scope
- final notation polish
- Venn redesign

---

# Phase C — Set Construction Redesign
Goal: make set definition mathematically explicit.

## [ ] Slice C1 — Constructor type separation
### Goal
Split Set Builder into explicit construction modes:
- finite listed set
- derived / rule-defined set
- semantic named set / alias if applicable

### Success checks
- each constructor path has clear semantics
- output set type is explicit
- current builder remains functional

### Out of scope
- final layout polish
- full documentation system

---

## [ ] Slice C2 — Supported derived-rule contract
### Goal
Define exactly what rule forms are supported for derived sets.

### Success checks
- rule syntax expectations are explicit
- unsupported rules fail clearly
- supported rules behave consistently

### Out of scope
- arbitrary predicate parsing
- advanced symbolic logic

---

## [ ] Slice C3 — Domain of validity
### Goal
Every derived set must state its base domain and whether the app treats it exactly, symbolically, or by sample in different contexts.

### Success checks
- derived sets expose base/domain information
- derived sets expose evaluation/projection mode
- downstream views use that information consistently

### Out of scope
- Venn redesign
- general polish

---

# Phase D — Truthful Comparison and Visualization
Goal: make Venn and comparison views mathematically honest.

## [ ] Slice D1 — Exact Venn restriction
### Goal
Only use exact Venn decomposition for exact finite sets.

### Success checks
- exact Venn appears only when mathematically valid
- invalid exact-Venn cases are blocked or redirected
- current finite exact comparisons still work

### Out of scope
- sampled Venn mode
- notation polish

---

## [ ] Slice D2 — Explicit sampled projection mode
### Goal
For semantic / infinite / rule-based sets, provide an explicitly labeled sampled comparison/projection mode.

### Success checks
- sampled mode is visibly labeled as approximation/projection
- sampling domain/window is declared
- sampled results are not presented as exact set truth

### Out of scope
- advanced visualization polish
- infinite exact region analysis

---

## [ ] Slice D3 — Non-Venn comparison summaries
### Goal
Provide comparison summaries that do not depend on Venn diagrams.

### Success checks
- comparison views can report exactness status
- comparison views can report containment/equality/membership facts
- non-finite comparisons remain useful even without exact Venn

### Out of scope
- final aesthetics
- extra teaching content

---

# Phase E — Secondary Views and Consistency
Goal: ensure power set and related views obey the same contract.

## [ ] Slice E1 — Power set exactness enforcement
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

## [ ] Slice E2 — Shared canonical result model
### Goal
Make builder, evaluator, comparison, Venn, and power set consume the same canonical set/result semantics.

### Success checks
- no contradictory display logic remains across tabs
- secondary views do not drift from core evaluation semantics
- the app behaves more consistently end-to-end

### Out of scope
- visual redesign
- extra educational overlays

---

# Phase F — Final Precision and Usability
Goal: polish only after semantics are trustworthy.

## [ ] Slice F1 — Notation and label precision
### Goal
Make notation, labels, and visible wording mathematically precise and consistent.

### Success checks
- labels are accurate
- notation is consistent
- wording does not overclaim exactness

### Out of scope
- core semantic changes

---

## [ ] Slice F2 — Pedagogical explanation layer
### Goal
Add small explanations where helpful:
- exact result
- symbolic result
- sampled projection
- why a feature is unavailable

### Success checks
- users can tell what kind of result they are looking at
- unsupported cases are understandable
- the page remains uncluttered

### Out of scope
- full tutorial system
- unrelated UI expansion

---

# Milestone Batches

## [ ] Milestone 1 — Exactness foundation
Includes:
- Slice A1
- Slice A2
- Slice A3

## [ ] Milestone 2 — Unified evaluator
Includes:
- Slice B1
- Slice B2
- Slice B3

## [ ] Milestone 3 — Construction semantics
Includes:
- Slice C1
- Slice C2
- Slice C3

## [ ] Milestone 4 — Truthful comparison and secondary consistency
Includes:
- Slice D1
- Slice D2
- Slice D3
- Slice E1
- Slice E2

## [ ] Milestone 5 — Final precision and pedagogy
Includes:
- Slice F1
- Slice F2

---

# Operating Rule
Use the roadmap as context.

For any autonomous Cursor run:
- inspect first
- verify current state
- execute only the slices in the active milestone
- self-check after each slice
- continue within the milestone until checks pass or a real blocker is hit
- stop after the milestone completes

Do not continue into future milestones unless explicitly instructed.