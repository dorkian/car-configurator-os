# Architecture

## Overview

Car Configurator OS is a client-side React SPA with no backend. All data lives in static JSON files under `src/data/`. State is managed with Zustand and serialized into the URL so builds are shareable without a server.

## Tech Stack

| Layer | Choice | Reason |
|-------|--------|--------|
| UI framework | React 18 | Component model suits step-by-step configurator |
| Language | TypeScript | Type safety for complex pricing/rules domain |
| Build tool | Vite | Fast DX, easy static asset handling |
| State | Zustand | Minimal boilerplate, easy URL sync |
| Routing | React Router v6 | Standard SPA routing |
| Styling | CSS custom properties + CSS Modules | No runtime overhead, full design token support |
| Testing | Vitest | Native Vite integration |
| i18n | react-i18next + i18next-browser-languagedetector | Industry-standard i18n pattern, automatic locale detection/persistence |

## Directory Map

```
src/
  app/          — router, providers, global store setup
  components/   — pure UI components (no business logic)
  features/     — feature slices (domain logic + UI wired together)
  hooks/        — shared React hooks (useTheme)
  i18n/         — react-i18next config + per-locale translation resources
  lib/          — pure functions (formatters, validators, URL state codec, theme persistence)
  pages/        — route-level components
  services/     — data loading (currently static JSON)
  types/        — TypeScript interfaces
  data/         — static JSON catalog data (multiple cars share the same schema)
  styles/       — global CSS, design tokens
  test/         — unit tests for domain logic
```

## Data Flow

```
static JSON → catalog.service.ts → Zustand store → feature components → UI
                                        ↕
                                    URL params (base64 encoded config state)
```

## Key Design Decisions

- **No backend**: enables zero-cost hosting (GitHub Pages, Vercel, Netlify).
- **URL-encoded state**: every configuration is a shareable link — no auth required.
- **Feature-sliced structure**: each domain (catalog, configurator, pricing, rules) owns its logic; components are dumb.
- **Pricing evaluated client-side**: rules engine in `src/features/rules/` computes final price from the current selection.
- **Multi-car catalog is schema-driven, not code-driven**: `catalog.service.ts` has no car-specific branching — every function is parameterized by `carId`/`trimId`. Adding a second car (Aureon S) required only new JSON data, zero changes to `computePrice`, `validateBuild`, or `getTrimRecovery`.

## Theming

Theme is a single `data-theme` attribute on `<html>`, set to `light` or `dark`. The neutral color ramp (`--color-neutral-0` through `--color-neutral-950`) is deliberately **inverted** under `[data-theme='light']` in `tokens.css`, rather than giving each component its own light/dark variant. Because every component already references the ramp by role (e.g. `--color-neutral-950` for shell background, `--color-neutral-0` for primary text), flipping the ramp's values under one selector re-themes the entire app with zero component-level CSS changes.

- `src/lib/theme/theme.ts` — pure, fully unit-tested functions: `getStoredTheme`, `storeTheme`, `getSystemPreferredTheme`, `resolveInitialTheme`, `applyTheme`. No React dependency, so it's testable without rendering.
- `src/hooks/useTheme.ts` — thin React wrapper: holds theme state, persists on change, applies the `data-theme` attribute via an effect.
- **Resolution order on load**: stored `localStorage` choice → OS `prefers-color-scheme` → app default (`dark`).
- A small inline script in `index.html` applies the resolved theme *before* React hydrates, avoiding a flash of the wrong theme on load.
- **`.light-surface` escape hatch**: pages that are deliberately always-light regardless of the app theme (the shareable Build Summary "receipt" page, the 404 page) pin the neutral ramp back to its canonical light values via a `.light-surface` class, so the light/dark toggle can't invert them.

## Internationalization (i18n)

- Library: **react-i18next** + **i18next-browser-languagedetector**, chosen over a hand-rolled solution because the pattern (`useTranslation()` + `t('namespace.key')`) is immediately recognizable to any React developer reviewing the code.
- Locale resources live at `src/i18n/locales/{en,it}/translation.json`, loaded eagerly (the catalog is small; no need for lazy-loaded namespace splitting at this scale).
- Language detection order: `localStorage` → `navigator.language`, with the resolved choice cached back to `localStorage` under `car-configurator-os:language` automatically by the detector plugin.
- **Pricing is locale-aware, not just UI copy**: `formatPrice(cents, locale)` maps the active i18next locale to a currency (`en` → USD, `it` → EUR) and formats via `Intl.NumberFormat`, so switching language also switches currency formatting.
- **Known scope boundary**: the trim-change recovery messages generated by `getTrimRecovery` (`src/features/rules/`) are plain template strings, not translation keys. That function is deliberately framework-free (no React or i18n import) so it stays a pure, independently-testable business-logic module — those specific dynamic messages remain English-only until a follow-up introduces a message-template return shape instead of pre-formatted strings.
