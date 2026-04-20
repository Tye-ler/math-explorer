# Guardrails — Set Comparator (Reset)

## Core Rules
- Inspect before editing.
- Do not assume the current implementation is mathematically correct just because it already works.
- Do not execute beyond the currently assigned milestone.
- Do not jump to future milestones.
- Do not narrow the intended scope.
- Do not let a projection/sample layer become the semantic source of truth.

## Workspace / Branch Rules
- Work directly in the currently open workspace and current branch.
- Do not create or switch to worktrees.
- Do not create extra branches.
- Do not use detached HEAD states.
- Do not require a merge step just for preview.
- Keep edits local to the current workspace so the page can be previewed immediately via localhost.
- If you believe a worktree or branch is necessary, stop and explain why instead of doing it automatically.

## File Rules
- Primary target is `index.html` in the current `set-comparator/` workspace.
- Do not create fallback files such as `README.md`.
- If the target file is missing, stop and report the actual workspace/path state.

## Semantic Rules
- Exact finite, exact semantic, symbolic, and sampled objects must remain distinguishable.
- Do not silently coerce sampled approximations into exact sets.
- Do not silently display semantic infinite sets as if they were finite roster sets.
- Unsupported or indeterminate cases must be shown explicitly.
- Prefer mathematical honesty over convenience.

## Architecture Rules
- Keep the project self-contained.
- Do not split files unless explicitly instructed.
- Do not introduce frameworks.
- Do not perform broad refactors unless the current milestone truly requires one.
- Reuse existing helpers where reasonable, but replace misleading abstractions if necessary for correctness.
- Do not create duplicate parallel systems if one coherent model can be extended.

## Autonomous Execution Rules
- Execute only the slices listed in `.ai/CURRENT_MILESTONE.md`.
- For each slice:
  1. inspect the relevant current implementation
  2. implement the slice
  3. run the listed checks
  4. if checks fail, keep iterating within that slice
  5. continue only when the slice checks pass or a real blocker is reached
- Do not weaken checks just to pass them.
- If blocked, stop and explain the blocker clearly.
- If the milestone completes, stop and report the full milestone result.
- Do not continue into the next milestone automatically.

## Required Output Rules
At milestone end, provide:
1. milestone completed or blocked
2. slices completed
3. exact sections/functions changed
4. what semantic behavior changed
5. checks used and whether they passed
6. risks or remaining inconsistencies
7. recommended next milestone

## Review Standard
A good change:
- makes the tool more mathematically trustworthy
- makes approximations explicit
- reduces contradictions between tabs
- preserves real working behavior where valid
- removes misleading behavior where necessary