# Product

## Register

product

## Users

Two overlapping audiences interact with this surface:

1. **End users of the configurator itself** — someone building a Falcon X: choosing trim, color, wheels, interior, and packages, watching price update live, and sharing the result via URL. Their context: a focused, single-task session, likely on desktop but sometimes mobile, evaluating options and comparing trade-offs (price vs. features vs. look).
2. **Recruiters and senior engineers evaluating the underlying code** — they will open this same UI in a browser to judge whether the product thinking matches the engineering. For them, the interaction quality of the configurator itself IS the demonstration.

The primary task on this screen: move through trim → color → wheels → interior → packages with a live, dominant view of the car and an always-visible running price, then share or finalize the build.

## Product Purpose

Car Configurator OS is an open-source, client-side automotive configurator. It exists to demonstrate senior-level frontend engineering — pricing rule engines, compatibility constraints, trim-change recovery, URL-serialized state — through a real, non-trivial UI rather than a toy app.

Success looks like: a user can configure a car with the same fluency and visual confidence as a real manufacturer configurator (Porsche, Tesla), and a technical reviewer can see the underlying architecture is production-grade.

## Brand Personality

**Precise, confident, engineered.**

- Precise: exact pricing (integer cents), exact constraint enforcement, no ambiguous states.
- Confident: the UI doesn't hedge or over-explain; it shows the car, the price, and the next decision.
- Engineered: reads like a product built by someone who understands automotive UX conventions, not a generic e-commerce configurator skin.

Reference: **Porsche's configurator** — richer material/color presentation than Tesla's minimalism, denser and more considered option detail, warmer imagery treatment, still restrained rather than showy.

## Anti-references

- Generic e-commerce "product options" UI (dropdown selects, small thumbnail swatches, checkout-cart metaphors) — this should never feel like buying a phone case.
- Long scrolling stacked sections for every option category (the current layout) — reads as a form, not a configurator.
- SaaS dashboard conventions (cards-in-a-grid, sidebar nav with icons+labels for unrelated features) — this is a single focused tool, not a multi-page app shell.

## Design Principles

1. **The car is the interface.** The vehicle preview is the dominant, persistent visual anchor — it updates live with every selection and never gets pushed off-screen by option content.
2. **One decision at a time, always visible price.** Options live in a persistent side panel with clear step/category navigation; the user is never scrolling through five stacked sections to find where they are.
3. **Precision without clutter.** Real numbers (exact price deltas, real feature names) presented cleanly — no vague icons or unlabeled affordances standing in for actual information.
4. **Constraints are explained, not hidden.** Disabled/incompatible options are visible and explained in place, never silently removed from view.
5. **Every session is shareable and recoverable.** State lives in the URL; changes that invalidate a prior selection are surfaced, never silently discarded.

## Accessibility & Inclusion

Target: WCAG 2.1 AA. Existing implementation already covers keyboard navigation (native `<button>` elements throughout), `aria-label` on all selector cards, `aria-pressed` for toggle state, `aria-disabled` for unavailable options, `role="status" aria-live="polite"` for the trim-recovery banner, and a global `:focus-visible` ring. Any redesign must preserve or improve on this baseline — color must never be the only signal for selected/disabled state, and all interactive targets must remain reachable by keyboard.
