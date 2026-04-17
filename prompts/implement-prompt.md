Use the repository rules, the approved plan, and the shared template conventions.

Implement the playground in:

`projects/<slug>/index.html`

# Implement Prompt — Math Playground Feature Pass

Implement the requested feature in the target single-file project.

## Implementation Principles
- Follow KISS / YAGNI / DRY.
- Make the smallest clean change that satisfies the request.
- Preserve the current architecture and behavior unless the task explicitly changes them.
- Do not “improve” adjacent systems unless explicitly asked.
- Do not redesign layout, camera/view-fit, or unrelated rendering while implementing a local feature.

## Before Coding
First state, briefly and concretely:
1. what the feature is
2. whether it is:
   - additive layer
   - mutually exclusive mode
   - bounded subsystem extension
   - subsystem replacement
3. what existing systems must remain compatible
4. where the controls belong
5. what transform/evaluation order matters, if any
6. what normalization/bounds strategy is required, if any

Then implement.

## Implementation Constraints
- Preserve single-file structure unless explicitly told otherwise.
- Preserve existing IDs and current behavior where possible.
- Keep controls in the existing subsystem card/panel when reasonable.
- Do not create new cards unless necessary.
- Do not trigger dashboard layout rewrites for small local features.
- Do not alter view/framing logic unless explicitly requested.

## Motion Feature Rules
If the task adds motion:
- define the base state
- define the added motion
- define whether the motion stacks or replaces
- preserve compatibility with existing motion layers unless explicitly told otherwise
- implement a clear transform order

## Rendering / Color Feature Rules
If the task adds rendering or color behavior:
- explicitly choose whether the feature is:
  - whole-segment
  - per-endpoint
  - per-point
  - anchor-state based
- define the normalization strategy explicitly
- keep render modes mutually exclusive by default unless stacking is explicitly requested

## Layout Safety Rule
If you discover the requested change cannot be implemented cleanly with small local layout edits:
- do not thrash with repeated margin/spacing nudges
- make a structural fix in one pass
- preserve behavior and IDs

But only do this if genuinely required.

## Required Deliverable Format
After implementation, provide a concise report with these headings:

### Files Modified
List the exact file(s) changed.

### What Was Implemented
Summarize the feature.

### Key Decisions Applied
State the concrete implementation decisions you used.

### Compatibility Preserved
List the systems that were intentionally kept working.

### Validation Performed
Provide concrete pass/fail checks.

### Known Limitations
List any remaining limitations, caveats, or deferred follow-ups.

Approved plan:
[PASTE APPROVED PLAN HERE]