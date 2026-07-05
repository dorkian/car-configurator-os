# CLAUDE.md

## Project
Car Configurator OS is a recruiter-facing, open-source React + Vite + TypeScript project.
Goal: showcase premium frontend engineering, product thinking, pricing logic, and automotive UX.
Constraint: low-cost local development, 2D-first, no backend in v1.

## Priorities
1. Keep architecture clean and understandable.
2. Prefer simple solutions over clever abstractions.
3. Optimize for recruiter readability and demo quality.
4. Maintain strong README and docs quality.
5. Avoid unnecessary dependencies.

## Non-goals
- No backend
- No DB
- No auth
- No paid third-party services
- No heavy 3D in v1

## Coding rules
- Use TypeScript strictly.
- Prefer feature-based organization.
- Keep components presentational when possible.
- Put pricing and rules logic in pure functions.
- Cover business logic with tests.
- Keep state serializable.
- Avoid over-engineering.

## Workflow
- Before coding: update spec or task context.
- During coding: implement one issue at a time.
- After coding: run lint, typecheck, tests, and update docs.
- For any major decision: append rationale to docs/ux-decisions.md or docs/architecture.md.

## Cost-aware AI usage
- Use cheaper model/settings for scaffolding, boilerplate, formatting, and repetitive edits.
- Use stronger reasoning only for architecture, rule modeling, and refactors.
- Summarize decisions compactly.
- Reuse existing docs instead of re-deriving context each session.

## Definition of done
- Feature works locally.
- Types are correct.
- Lint passes.
- Relevant tests pass.
- Docs updated.
- README updated if user-visible change.