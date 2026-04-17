Use the repository rules and the shared template conventions.

I want a new mathematical playground at:

`projects/<slug>/index.html`

# Plan Prompt — Math Playground Feature / Project Planning

You are planning work for a single-file mathematical / geometric playground in this repo.

Your job is to produce a bounded implementation plan before coding.

## Repo Intent
This repo is a reusable factory for small contained math/geometric playgrounds.
The goal is not only to finish the current page, but to do it in a way that improves repeatability, correctness, and implementation reliability for future projects.

## Non-Negotiables
- Follow KISS / YAGNI / DRY.
- Do not make assumptions when exact behavior matters.
- Prefer bounded v1 decisions over vague open-ended options.
- Preserve single-file architecture unless expansion is explicitly required.
- Do not casually redesign layout, view/framing, or adjacent systems.

## Required Output Structure

### 1. Task Understanding
Briefly restate the requested feature/project in concrete terms.

### 2. Feature Classification
Classify the request in all applicable ways:
- geometry change
- motion change
- rendering/color change
- UI/control change
- layout change
- export/output change
- framing/view change

Then classify the implementation shape:
- additive layer
- mutually exclusive mode
- subsystem replacement
- bounded extension of an existing subsystem

### 3. Product Decisions To Lock Before Implementation
List the key v1 decisions that must be resolved before coding.
Examples:
- default behavior
- whether the feature stacks or replaces
- what object/state it applies to
- whether controls are toggles, sliders, selectors, etc.
- any normalization strategy
- any responsive/layout invariants
- any math/transform invariants

Do not leave important behavior vague if it can be bounded now.

### 4. Affected Existing Systems
List which current systems are touched and which must remain compatible.

Examples:
- polar placement
- segment orientation
- local rotation
- mirrored local rotation
- global rotation
- connector generation
- trails
- segment rendering
- dashboard layout
- camera/view-fit

### 5. Transform / Evaluation Order
If the request touches geometry or motion, explicitly define the evaluation order.

Use a concrete ordered list such as:
1. base sampled geometry
2. anchor motion
3. local orientation
4. global transforms
5. connector generation
6. rendering/color pass

If transform order is irrelevant, say so explicitly.

### 6. UI Placement
State exactly where the controls belong.
Prefer integrating into existing subsystem cards/panels rather than creating new ones.

### 7. Layout Risk Check
Decide whether this is:
- safe iterative polish
- moderate structural UI task
- risky layout task that should skip incremental tweaking early

If it is a risky layout task, say so directly and recommend structural changes instead of micro-tweaks.

### 8. Bounded Implementation Plan
Provide a concise phased plan for implementation.
Keep it concrete and ordered.

### 9. Validation Checklist
Provide pass/fail checks that can be verified after implementation.

Include:
- behavior checks
- compatibility checks
- UI placement checks
- regression checks
- any math-specific checks

## Important Planning Rules
- If the request describes emergent behavior through combined simple motions, prefer composable layers with explicit transform order.
- If the request adds visual variation, decide whether it is whole-object, per-endpoint, or per-point before implementation.
- If layout invariants matter, state them explicitly.
- If a task has high layout risk, do not recommend repeated prompt-guessing tweaks as the primary path.

Project spec:
[PASTE SPEC HERE]