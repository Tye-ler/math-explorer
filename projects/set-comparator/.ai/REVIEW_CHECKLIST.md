# Review Checklist — Set Comparator (Reset)

## Workspace / Repo Sanity
- Did Cursor stay in the correct `set-comparator/` workspace?
- Did it avoid stray files?
- Did it avoid extra branches/worktrees?

## Scope Control
- Did it stay inside the current milestone only?
- Did it avoid continuing past the assigned milestone?
- Did it avoid speculative cleanup or redesign outside milestone scope?

## Semantic Improvement
- Did the project become more mathematically honest?
- Are exact, semantic, symbolic, and sampled states more clearly separated?
- Were misleading finite-looking displays reduced?

## Code Quality
- Did it avoid duplicate semantic systems?
- Did it improve coherence instead of adding more patches?
- Is the diff still understandable enough to review?

## Behavior Preservation
- Does the page still load?
- Did valid existing interactions survive?
- Were misleading behaviors removed deliberately rather than accidentally?

## Result Correctness
- Are built-in sets displayed truthfully?
- Are approximations labeled as approximations?
- Are unsupported/indeterminate cases explicit?
- Do results appear more consistent across tabs?

## Visual Review
- Does the page still render correctly?
- Is the updated output understandable?
- Is any new exactness labeling readable rather than noisy?

## Next-Step Readiness
- Did Cursor clearly report what changed?
- Did Cursor clearly report risks or limitations?
- Is the recommended next milestone reasonable?