# Prime Explorer — spec.md

## Project Summary

**Prime Explorer** is a single-file interactive visualization tool for plotting positive integers on a Cartesian canvas in different layout modes so the user can explore prime distribution visually and make observations.

The project is exploratory, not a proof engine. Its purpose is to help users inspect how primes and composites appear under different geometric mappings and filtering choices.

This project is intended for the `math-explorer` workflow and should remain bounded, structurally clear, and mathematically inspectable.

---

## Core Goal

Allow the user to:

- plot all positive integers from `1..N`
- highlight primes distinctly
- filter visible composites by entered prime factors
- switch between multiple integer-placement systems
- inspect the active equations and parameter values live

The emphasis is on seeing patterns, comparing layouts, and forming observations.

---

## Layout

The page should use a simple two-panel main layout:

- **Left:** control panel
- **Right:** Cartesian canvas

An equation/summary section may appear beneath those two panels if needed.

### Layout priorities

- clear and stable structure
- no decorative or fragile dashboard logic
- controls grouped by subsystem
- bounded v1 layout only
- no unnecessary cards/panels if a simpler left-sidebar layout is sufficient

---

## Core Data Model

The visualization is built from the positive integers in a finite range:

- generate integers from `1` to `N`
- determine whether each integer is prime or composite
- compute the integer’s plotted position from the active layout mode
- render visible integers as points/dots

### Rendering rules

- no integer labels in v1
- primes use a distinct highlight color
- visible non-primes/composites use a neutral/default color
- optional grid toggle for the Cartesian canvas

---

## Plot Modes

The page must support these separate, mutually exclusive plot modes:

1. **Polar Spiral**
2. **Square Spiral**

---

## Plot Mode 1 — Polar Spiral

### Concept

Positive integers are plotted using a parameterized polar spiral mapping.

The user should be able to inspect the equations being used and adjust the controlling values through bounded controls.

### Required controls

- **Max Integer N**
- **Point Size**
- **m** for `Δθ = 2π / m`
- **Radius Scale a**
- **Radius Preset**

### Required equation display

The interface should expose the active equations in readable form with live parameter values.

At minimum, show:

- `Δθ = 2π / m`
- the active radius equation
- a readable statement of the angle progression, e.g. `θ_n = n * (2π / m)`

### Radius presets

Use bounded preset equations only. No arbitrary typed formula parser in v1.

Required presets:

- `r_n = a√n`
- `r_n = an`
- `r_n = a log(n+1)`

### Notes

- user edits happen through sliders/inputs/selectors
- equations update live as controls change
- no raw formula typing in v1
- no spiral rotation-offset control in v1

---

## Plot Mode 2 — Square Spiral

### Concept

Positive integers are plotted on the classic square spiral.

Example progression:

- `1 -> (0,0)`
- `2 -> (1,0)`
- `3 -> (1,1)`
- `4 -> (0,1)`
- `5 -> (-1,1)`
- `6 -> (-1,0)`
- and so on

### Required controls

- **Max Integer N**
- **Point Size**
- **Cell Spacing / Scale**

### Notes

- keep this mode simple in v1
- no additional rotation/orientation controls in v1

---

## Prime Highlighting

Primes should be visually distinct from other visible integers.

### V1 behavior

- primes use a highlight color
- visible composites use a neutral/default color

No additional size/glow/label system is required in v1.

---

## Visibility Modes

Add a visibility/display mode selector with these options:

- **Show All**
- **Show Only Composites**
- **Show Only Primes**

These modes must operate together with the factor filter.

---

## Prime Factor Filtering

### Purpose

Allow the user to hide visible composites that are divisible by selected prime factors.

### Input style

Use a **typed comma-separated input**.

Examples of intended valid formatting:

- `2`
- `2,3,5`
- `2, 3, 5, 11`

### Parsing rules

- spaces are allowed and ignored
- entries are delimited by commas
- input should be parsed into integer values when possible

### Validation / warning states

There should be a compact inline indicator near the input.

#### Invalid state
Show an invalid/error state if syntax is malformed.

#### Warning state
Show a yellow warning state if syntax is valid but one or more entries are not prime.

Examples:
- `1`
- `4`
- `9`
- `2, 3, 9`

### Filter application rules

Only entered **prime values** are actually used as filtering factors.

- non-prime entries are ignored for filtering
- `1` is ignored for filtering
- valid syntax with non-prime entries should still warn

### Composite-hiding rule

Hide any **composite** divisible by any entered valid prime factor.

Important exception:

- primes remain visible even if their own value is entered as a factor

#### Example
If the entered filter is `2`:
- hide even composites
- keep `2` visible because it is prime

This behavior is intentional and should be preserved.

---

## Equation / Summary Display

The page should expose the active equations and parameter values clearly.

### Requirements

- readable mathematical/text summary
- updates live as controls change
- reflects the active plot mode
- sits beneath the main layout if needed

### Intent

The user should be able to understand:
- what equations are currently driving placement
- what each key parameter is set to
- how the current picture is being generated

---

## Canvas / Graph Requirements

The right-side visualization area should behave like a Cartesian plotting canvas.

### V1 requirements

- clear centered Cartesian drawing area
- optional grid toggle
- integer points plotted according to the active mode
- mathematically clear rendering over flashy effects

No camera/view-fit complexity is required beyond what the project needs.

---

## Interaction Principles

The page should feel like a mathematical explorer, not a toy or decorative animation.

### Priorities

- mathematical clarity
- stable controls
- inspectable behavior
- bounded v1 decisions
- no unnecessary abstraction

### User interaction style

- sliders, selectors, toggles, and text input
- live updates
- no raw formula parser
- no note-taking system
- no export system
- no hover labels in v1

---

## Performance / Scope Boundary

This project should be built as a practical interactive v1.

### Important boundary

Do **not** architect v1 as if it must literally render `1..10^100` point-by-point.

The app should support reasonably large interactive values of `N`, but must remain honest and bounded in implementation.

### Preferred approach

- clean rendering logic
- sensible recomputation boundaries
- readable code
- practical controls
- keep the structure open to future scale-oriented extensions, but do not fake them in v1

---

## Recommended Control Grouping

A good left-panel grouping is:

1. **Plot Mode**
2. **Display / Visibility**
3. **Prime Factor Filter**
4. **Polar Spiral Controls** (shown only in polar mode)
5. **Square Spiral Controls** (shown only in square mode)
6. **Equation Summary**

This grouping should remain compact and structurally clear.

---

## Non-Goals for V1

The following are explicitly out of scope for v1:

- arbitrary typed formula parsing
- integer labels
- hover labels
- export tools
- note-taking / observation logging
- proof or theorem-generation tooling
- square spiral orientation variants
- polar spiral rotation-offset controls
- fake support for astronomical `N` via misleading UI claims

---

## Implementation Principles

Use the `math-explorer` workflow principles:

- KISS
- YAGNI
- DRY
- bounded v1 choices
- preserve single-file architecture
- keep the code understandable and inspectable
- do not overengineer

---

## Acceptance Summary

A successful v1 should let the user:

- switch between **Polar Spiral** and **Square Spiral**
- choose a practical `N`
- see all integers from `1..N` as points
- clearly distinguish primes from composites
- hide composites divisible by selected valid prime factors
- keep primes visible even when their own value is in the filter
- inspect the equations and current parameter values live
- explore the resulting distributions on a Cartesian canvas with optional grid

This is the core of **Prime Explorer**.