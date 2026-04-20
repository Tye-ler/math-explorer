# Autonomous Workflow — Set Comparator (Reset)

## Purpose
This file defines how Cursor should operate autonomously on the reset roadmap.

The user does not want to review every slice individually.
Cursor should complete the entire current milestone batch, self-checking as it goes, then stop for review.

## Workspace Mode
- Work in the currently open `set-comparator/` workspace.
- Work directly in the current branch.
- Do not create worktrees.
- Do not create extra branches.
- Do not require merges for preview.

## General Loop
For the active milestone in `.ai/CURRENT_MILESTONE.md`:

1. Read:
   - `.ai/PROJECT_BRIEF.md`
   - `.ai/ROADMAP.md`
   - `.ai/GUARDRAILS.md`
   - `.ai/CURRENT_MILESTONE.md`
2. Confirm `index.html` exists in the current workspace.
3. Inspect the current code state relevant to the first unfinished slice in the milestone.
4. Implement that slice.
5. Run the slice checks.
6. If checks fail:
   - keep iterating inside that slice
   - do not move to the next slice yet
7. If checks pass:
   - mark that slice complete in the milestone result
   - continue to the next slice in the same milestone
8. When all milestone slices are complete:
   - stop
   - provide a consolidated report

## Stop Conditions
Stop immediately if:
- `index.html` is missing
- the workspace is clearly wrong
- the current milestone cannot be continued without a real blocker
- continuing would require violating `GUARDRAILS.md`

Stop after completion if:
- all slices in the current milestone pass their checks

## Check Discipline
- Use the checks listed in `.ai/CURRENT_MILESTONE.md`
- Do not weaken the checks to make them pass
- Do not claim checks passed without actually verifying them against the implementation
- If a check cannot be verified directly, state that limitation explicitly

## Preview Discipline
Assume the user will preview the page after the milestone completes.

When useful, provide the local preview instruction based on the current workspace layout:
- if serving from `set-comparator/`, preview path is likely `http://localhost:8000/index.html`

Do not require:
- branch switching
- merge-to-main preview
- worktree application

## Scope Discipline
- Use the roadmap as context, not as permission to continue indefinitely
- Complete only the current milestone batch
- Do not automatically continue into the next milestone
- Do not take on speculative cleanup or redesign outside the milestone

## Final Milestone Report Must Include
1. milestone completed or blocked
2. slices completed
3. exact sections/functions changed
4. pass/fail check results
5. remaining risks or limitations
6. recommended next milestone