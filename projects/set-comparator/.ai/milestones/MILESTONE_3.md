# Current Milestone — Set Comparator

## Active Milestone
`Milestone 3 — Construction semantics`

This autonomous run should complete the following slices in order:

1. `Slice C1 — Constructor type separation`
2. `Slice C2 — Supported derived-rule contract`
3. `Slice C3 — Domain of validity`

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

## Slice C1 — Constructor type separation

### Goal
Split Set Builder into explicit construction modes with clear semantics.

### Success checks
- finite listed set construction is explicit
- derived/rule-defined construction is explicit
- semantic/named set treatment is explicit where applicable
- output set type is visible in downstream logic or UI
- page still loads successfully

### Out of scope
- final layout polish
- documentation expansion

---

## Slice C2 — Supported derived-rule contract

### Goal
Define exactly what rule forms are supported for derived sets.

### Success checks
- rule syntax expectations are explicit
- unsupported rules fail clearly
- supported rules behave consistently
- derived set creation is less ambiguous

### Out of scope
- arbitrary predicate parsing
- advanced symbolic logic

---

## Slice C3 — Domain of validity

### Goal
Every derived set must state its base domain and how the app treats it in exact, symbolic, or sampled contexts.

### Success checks
- derived sets expose base/domain information
- derived sets expose evaluation/projection mode
- downstream views use that information consistently
- page still loads successfully

### Out of scope
- Venn redesign
- general polish