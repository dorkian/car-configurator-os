# Case Study: Car Configurator OS

**URL slug:** `/work/car-configurator-os`  
**Author:** Ashkan Dorkian — AI-native frontend developer

---

## Overview

Car Configurator OS is an open-source, client-side automotive configurator built with React, TypeScript, and Vite. It lets users configure a fictional car — trim, color, wheels, interior, and packages — with live pricing, conflict enforcement, and a shareable URL for every build.

**Who it's for:** Recruiters and engineering managers evaluating senior frontend candidates. The code is the portfolio; the engineering decisions are the cover letter.

**Live demo:** _[link once deployed]_  
**GitHub:** [github.com/dorkian/car-configurator-os](https://github.com/dorkian/car-configurator-os)

---

## The Problem

The typical portfolio project proves you can write code. It doesn't prove you can think about a domain, model its constraints, or make trade-offs between convenience and correctness. A CRUD app, a weather widget, or a clone — they're table stakes, and hiring managers know it.

Car configurators are among the hardest products to build well in the automotive industry. Options are deeply interlinked. Pricing is live and must be exact. State is complex and must be recoverable. Every selection has downstream effects on what else is valid.

Building this from scratch — without a backend, with full test coverage on the business logic, and with careful UX thinking on every edge case — demonstrates the kind of thinking that shows up in production software, not just demos.

---

## The Solution

The Falcon X configurator is a fully client-side React SPA. Key properties:

- **No backend.** All catalog data lives in static JSON. State is serialized into the URL as a base64 token — every build is a shareable link with no login, no server, and zero hosting cost.
- **Pricing engine in integer cents.** `computePrice(build)` is a pure function that returns a full `PriceSummary` with named line items. No floats, no rounding errors.
- **Compatibility rules enforced at the store level.** `togglePackage` strips conflicting packages before adding a new one. `setTrim` resets incompatible selections and surfaces what changed via a dismissable `RecoveryBanner`.
- **Testable domain logic.** `computePrice`, `validateBuild`, `getTrimRecovery`, `getConflicts` are all pure functions with Vitest coverage.

---

## Architecture

```
src/
  app/          — Zustand store + router
  features/
    pricing/    — computePrice() — pure pricing function
    rules/      — validateBuild(), getTrimRecovery(), getConflicts()
  components/
    configurator/ — TrimSelector, ColorSelector, WheelSelector,
                    InteriorSelector, PackageSelector,
                    BuildSummaryPanel, RecoveryBanner
  lib/
    url-state/  — encodeBuild(), decodeBuild()
    formatters/ — formatPrice()
  services/     — catalog.service.ts (data access layer)
  types/        — Car, Trim, Color, Wheel, Interior, Package, Build
  data/         — static catalog JSON
```

**Data flow:**

```
static JSON → catalog.service → Zustand store → UI
                                     ↕
                              URL (?b=<base64>)
```

---

## Key Engineering Decisions

### 1. Integer-cent pricing

All prices are stored in integer cents (`4200000` = $42,000). Arithmetic is exact. Formatting to `$42,000.00` happens only at render time via `Intl.NumberFormat`. This is the correct pattern for any financial UI — the bug you avoid is `0.1 + 0.2 !== 0.3`.

### 2. Trim-change recovery as a pure function

When the user changes trim, their existing color/wheel/interior/package selections may become invalid. Rather than silently resetting (bad UX) or blocking (worse UX), I model the recovery as a pure function:

```ts
getTrimRecovery(build, newTrimId) → RecoveryChange[]
```

The store captures what will change *before* applying it, then renders a `RecoveryBanner` listing each change. The user is informed without being blocked.

### 3. URL as the only persistence layer

No login, no database, no cookies. The full build is `btoa(JSON.stringify(build))`. Sharing is copy-URL. Back button works naturally. Hosting is free. The trade-off (URL length, no server-side validation) is acceptable for v1.

---

## Outcome

- 29 unit tests, all green
- TypeScript strict mode, no `any`
- Mobile-responsive at ≤900px
- Full accessibility pass: `aria-label`, `aria-pressed`, `:focus-visible`, `aria-live`
- Zero-cost deployable to Vercel, Netlify, or GitHub Pages

_GitHub stars and recruiter responses to be updated post-launch._

---

## Tech Used

React 18 · TypeScript (strict) · Vite · Zustand · React Router v6 · Vitest · CSS custom properties

---

*Ashkan Dorkian — AI-native frontend developer*  
[github.com/dorkian](https://github.com/dorkian) · [linkedin.com/in/ashkandorkian](https://linkedin.com/in/ashkandorkian)
