# Project Brief — Set Comparator

## Project
`set-comparator/index.html`

## Scope
This `.ai` folder applies only to the Set Comparator project.

## Project Type
Single-file interactive HTML/CSS/JS math project.

## Purpose
This page is a set theory workbench / set comparator. It is meant to be a mathematically trustworthy tool for:

- exploring sets
- defining finite sets
- defining ambiguous / derived / rule-based sets
- evaluating set expressions
- comparing sets
- projecting appropriate finite comparisons onto a Venn diagram

## Core Product Principle
The tool must distinguish clearly between:

- exact finite sets
- exact semantic sets
- symbolic / unresolved set expressions
- sampled approximations used only for visualization or bounded exploration

The tool must never silently treat a sampled approximation as if it were the exact mathematical set.

## Intended Scope
The intended scope includes:

- semantic built-in number sets: `ℕ`, `ℤ`, `ℚ`, `ℝ`, `ℂ`
- user-defined finite sets
- derived / subset-defined / rule-defined sets
- compound set expressions
- comparison of exact and non-exact sets
- Venn-style visualization where mathematically appropriate
- explicit sampled projections where exact Venn is not appropriate
- power set support for exact finite sets
- mathematically accurate notation and labels

## What Must Be Preserved
- Do not narrow the scope.
- Number sets must behave mathematically.
- The tool should remain usable for exploration, not just formal input.
- The page should remain self-contained unless explicitly changed.
- The visual identity can evolve, but correctness is more important than visual cleverness.
- Venn diagrams are a projection layer, not the semantic source of truth.

## What Must Change
- Built-in semantic sets should not be presented as if they are finite roster sets.
- Infinite / semantic / derived sets should not be silently downgraded into finite samples.
- Expression evaluation and operations must use one coherent semantic model.
- Exactness / approximation status must become visible and first-class.

## Technical Constraints
- Primary target file: `index.html` in the currently open `set-comparator/` workspace.
- Keep the project self-contained unless explicitly instructed otherwise.
- Reuse existing logic where reasonable, but correctness takes priority over preserving flawed abstractions.
- Do not introduce frameworks.
- Do not split files unless explicitly instructed.

## Workflow Constraints
- Work directly in the current workspace and current branch.
- Do not create worktrees.
- Do not create extra branches.
- Do not require merges for preview.
- The page should be previewable immediately from the current workspace via localhost.

## Development Philosophy
Advance the project in milestone batches:
- inspect first
- verify current state
- implement the active milestone
- self-check after each slice
- continue within the milestone until checks pass or a real blocker is hit
- stop at the end of the milestone
- user review happens after the milestone completes

## Definition of Success
A successful milestone:
- makes the tool more mathematically trustworthy
- reduces semantic ambiguity
- keeps approximations explicitly labeled
- improves consistency across builder, evaluator, comparison, Venn, and power set views
- leaves the project in a cleaner state for the next milestone