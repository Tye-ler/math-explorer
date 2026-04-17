Review this playground as a QA, math-correctness, maintainability, and layout-integrity pass:

`projects/<slug>/index.html`

# Review Prompt — Math Playground Verification Pass

Review the implemented changes in the target single-file project.

Your job is to verify whether the implementation matches the requested intent without introducing unrelated regressions.

## Review Priorities
Prioritize:
1. behavioral correctness
2. mathematical correctness
3. subsystem compatibility
4. layout/control placement correctness
5. regression detection

## Required Review Output

### 1. Scope Check
State whether the implementation stayed within scope or changed unrelated systems.

Explicitly call out if it touched:
- layout
- camera/view-fit
- unrelated controls
- unrelated rendering
- connector behavior
- motion systems not requested

### 2. Intent Match
State whether the feature matches the requested intent exactly, partially, or incorrectly.

### 3. Mathematical / Logical Correctness
Check the core logic.
Examples:
- sampling logic
- transform order
- motion layering
- radius/angle mapping
- normalization stability
- symmetry behavior
- gradient direction behavior

### 4. UI / Control Placement
Check whether the controls were added in the correct subsystem/panel and whether the UI stayed bounded.

### 5. Compatibility Checks
Explicitly verify whether the implementation preserved compatibility with relevant existing systems.

Examples:
- polar placement
- local rotation
- mirrored local rotation
- global rotation
- connectors
- trails
- segment rendering
- existing presets

### 6. Regression Check
List any unrelated regressions or risky side effects.

### 7. Pass / Needs Fix
Conclude with:
- Pass
- Pass with caveats
- Needs fix

If it needs fix, list the fixes in priority order.

## Required Review Rules
- Distinguish real bugs from expected mathematical/sampling artifacts.
- Flag unstable normalization if a feature depends on volatile extrema.
- Flag accidental subsystem drift.
- Flag when a supposedly local feature caused unnecessary layout or framing changes.
- If the implementation should have been additive but was made exclusive, call that out clearly.