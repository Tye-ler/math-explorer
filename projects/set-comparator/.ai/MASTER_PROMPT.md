Read .ai/milestones/MILESTONE_COMPLETE.md as the active milestone for this run.

# Master Prompt — Set Comparator Autonomous Milestone Run (No Current-Milestone File)

You are working on the Set Comparator project only.

## Project Scope
Work only within the currently open `set-comparator/` workspace/folder.

Assume the project control files live in:
- `.ai/PROJECT_BRIEF.md`
- `.ai/ROADMAP.md`
- `.ai/GUARDRAILS.md`
- `.ai/AUTONOMOUS_WORKFLOW.md`
- `.ai/REVIEW_CHECKLIST.md`

The active milestone is the milestone file explicitly named in the current user prompt, for example:
- `.ai/milestones/MILESTONE_1.md`
- `.ai/milestones/MILESTONE_2.md`

## Workspace / Branch Rules
- Work directly in the currently open workspace and current branch.
- Do not create or switch to worktrees.
- Do not create or switch to extra branches.
- Do not use detached HEAD states.
- Do not require a merge step just for preview.
- Keep edits local to the current workspace so the page can be previewed immediately via localhost.
- If you believe a worktree or branch is necessary, stop and explain why instead of doing it automatically.
- Do not create fallback files such as `README.md` if a path is missing.
- If the expected file/path is missing, stop and report the actual current workspace/path state instead of inventing files.

## Primary Target
- `index.html` in the currently open `set-comparator/` workspace

## First Actions
1. Read `.ai/PROJECT_BRIEF.md`
2. Read `.ai/ROADMAP.md`
3. Read `.ai/GUARDRAILS.md`
4. Read `.ai/AUTONOMOUS_WORKFLOW.md`
5. Read the active milestone file explicitly named in the current user prompt
6. Confirm that `index.html` exists in the current workspace
7. Do not make edits until you have completed those checks

## Execution Mode
Use the roadmap as context, but execute only the active milestone file explicitly named in the current user prompt.

For each slice in that milestone:
1. inspect current code relevant to the slice
2. verify the slice still makes sense given the current implementation
3. implement the slice
4. run the slice checks
5. if checks fail, keep iterating within that slice
6. when checks pass, continue to the next slice in the same milestone

Stop only when:
- all slices in the active milestone are complete, or
- a real blocker is reached

Do not continue into future milestones in this run.

## Preservation Rules
- Preserve valid existing behavior unless the current slice requires a change.
- Reuse existing helpers where reasonable.
- Keep the diff as localized as the milestone allows.
- Do not broaden the task into unrelated cleanup or redesign.
- Do not split files or introduce frameworks.

## Mathematical Rules
- Exact finite, exact semantic, symbolic, and sampled objects must remain distinguishable.
- Do not silently present samples as exact sets.
- Do not silently display infinite semantic sets as finite rosters.
- Unsupported/indeterminate cases must be explicit.

## Preview Guidance
Assume the user wants to preview changes immediately from the current workspace.

If useful, give the preview path based on the current workspace layout.
If serving from inside `set-comparator/`, the preview is likely:
`http://localhost:8000/index.html`

Do not require:
- branch switching
- merge-to-main preview
- worktree application

## Required Final Output

### 1. Milestone result
- completed or blocked
- slices completed

### 2. Verification / implementation summary
- current relevant behavior found
- what changed
- what was intentionally not changed

### 3. Exact sections / functions changed
- ...

### 4. Check results
- each slice check
- whether it passed
- if not fully verifiable, say why

### 5. Risks / limitations
- ...

### 6. Recommended next milestone
- ...

## Final Constraints
- Do not overreach.
- Do not make assumptions when the file can be inspected directly.
- Stay in the current workspace and current branch.
- Stop at the end of the active milestone.