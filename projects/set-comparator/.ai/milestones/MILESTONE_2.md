# Current Milestone — Set Comparator

## Active Milestone
`Milestone 2 — Unified evaluator`

This autonomous run should complete the following slices in order:

1. `Slice B1 — Unify Operations and Expression pipelines`
2. `Slice B2 — Supported language contract`
3. `Slice B3 — Symbolic vs extensional evaluation separation`

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

## Slice B1 — Unify Operations and Expression pipelines

### Goal
Make the Operations workspace use the same parser / evaluator model as the Expression workspace.

### Success checks
- Operations and Expression use one coherent evaluation path
- operation buttons act as expression-building helpers, not a separate truth engine
- overlapping features produce consistent results
- page still loads successfully

### Out of scope
- Venn overhaul
- builder redesign
- final polish

---

## Slice B2 — Supported language contract

### Goal
Explicitly define and enforce the supported set language.

### Success checks
- supported forms are handled consistently
- unsupported forms fail clearly
- the language surface is more predictable
- current supported use cases do not regress

### Out of scope
- theorem prover behavior
- arbitrary predicate logic
- final pedagogy layer

---

## Slice B3 — Symbolic vs extensional evaluation separation

### Goal
Separate symbolic results from extensional results instead of collapsing everything into displayed lists.

### Success checks
- finite extensional results remain exact
- symbolic results remain symbolic where appropriate
- sampled outputs occur only when explicitly needed for projection/exploration
- result rendering matches semantic status

### Out of scope
- final notation polish
- Venn redesign