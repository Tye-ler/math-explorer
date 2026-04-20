# Current Milestone — Set Comparator

## Active Milestone
`Milestone 1 — Exactness foundation`

This autonomous run should complete the following slices in order:

1. `Slice A1 — Exactness model`
2. `Slice A2 — Truthful built-in set display`
3. `Slice A3 — Result truth classes`

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

## Slice A1 — Exactness model

### Goal
Introduce first-class exactness metadata for sets and results.

### Success checks
- set or result objects expose exactness status
- downstream logic can distinguish exact vs sampled vs symbolic
- existing major features still load
- no new silent coercion from sampled to exact is introduced

### Out of scope
- full evaluator rewrite
- Venn redesign
- final polish

---

## Slice A2 — Truthful built-in set display

### Goal
Display built-in semantic sets as semantic objects rather than as misleading finite roster-style displays.

### Success checks
- built-ins render semantically
- any sample preview is explicitly marked as sample/preview
- semantic infinite sets are not visually treated as exact finite rosters
- previously working views still load

### Out of scope
- full parser changes
- Venn redesign
- final notation polish

---

## Slice A3 — Result truth classes

### Goal
Ensure evaluation outputs can distinguish booleans, exact sets, symbolic results, sampled approximations, and unsupported/indeterminate cases.

### Success checks
- boolean results render clearly
- exact set results render clearly
- symbolic results remain symbolic
- sampled approximation results are labeled as approximations
- unsupported/indeterminate cases are explicit
- page still loads successfully after the changes

### Out of scope
- unified parser/evaluator milestone work
- Venn redesign
- final UX polish