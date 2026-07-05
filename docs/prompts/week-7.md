Continue Car Configurator OS.

Goal:
Ship v1.1.0 — second car model, theming, and internationalization.

Tasks:
1. Add a second configurable car model to the catalog: **Aureon S**, a luxury sedan (fictional, no real-manufacturer IP — same convention as Falcon X per docs/distribution.md). Give it its own trims, colors, wheels, interiors, and packages with its own pricing data, distinct from Falcon X. Positioned as a premium/luxury counterpart to Falcon X's sport-sedan identity — different price tier, different option character (more premium materials, quieter/more luxury-oriented package names).
2. Update the landing page to let the user choose which car to configure (car selection, not just a single "Configure" CTA).
3. Add a light/dark theme toggle. Default remains dark (the existing "Showroom Floor" system); light mode must meet the same WCAG 2.1 AA contrast bar.
4. Persist the theme choice (localStorage) and respect the user's OS-level color-scheme preference on first visit.
5. Add internationalization (i18n) using **react-i18next**. Extract all hardcoded UI copy into translation resources. Ship English (en) and **Italian (it)**.
6. Prices must be locale-aware (currency formatting via Intl.NumberFormat keyed to the active locale, not hardcoded USD symbol).
7. Write unit tests for: Aureon S's pricing/rules behave identically to Falcon X (reusing the same pure functions, not duplicated logic), theme persistence logic, and locale-aware price formatting.
8. Update docs/architecture.md and docs/ux-decisions.md with the theming and i18n architecture decisions.
9. Return a concise list of what was added and test coverage.

## Resolved gaps (answered during spec review, before build)
- Second car: **Aureon S**, luxury sedan.
- i18n library: **react-i18next** (industry-standard, recognizable pattern over a custom lightweight solution).
- Second locale: **Italian (it)**.
