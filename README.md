# Car Configurator OS

An open-source, client-side car configurator built with React, TypeScript, and Vite — built to demonstrate production-grade frontend architecture, business logic, and automotive UX thinking.

**Live demo:** _coming soon_  
**Author:** [Ashkan Dorkian](https://github.com/dorkian) — AI-native frontend developer

> **Disclaimer:** Falcon X and Aureon S are entirely fictional vehicles created for this demo. All vehicle imagery on this site is AI-generated. This project is not affiliated with, endorsed by, or representative of any real automobile manufacturer.

---

## Why this project exists

Most portfolio projects are shallow — a CRUD app, a weather widget, a clone. This one isn't. Car configurators are among the most UX-intensive products in the automotive industry: they handle deeply interlinked options, real-time pricing, constraint enforcement, and a zero-tolerance policy for invalid state. Building one from scratch — without a backend, without a paid service, and with full test coverage on the business logic — is a deliberate demonstration of how I think about frontend architecture when the stakes matter.

This project is a recruiter-facing open-source application. The code is the portfolio. The engineering decisions are the cover letter.

---

## What it demonstrates

- **Feature-sliced architecture** — domain logic (`features/`), UI components, services, and types are cleanly separated; nothing leaks across layers
- **Pricing rule engine** — integer-cent arithmetic, pure functions, line-item breakdown; no floating-point errors, no magic
- **Option compatibility system** — `incompatibleWith` constraints enforced at the store level; disabled states and conflict explanations surfaced in the UI
- **Trim-change recovery** — when trim changes make existing selections invalid, the store auto-recovers and a `RecoveryBanner` tells the user exactly what changed
- **URL-serialized build state** — every configuration is a shareable link with no backend, no login, no storage
- **Zustand store design** — selectors, actions, and derived state cleanly modeled; no prop drilling, no context soup
- **Testable business logic** — `computePrice`, `validateBuild`, `getTrimRecovery`, `getConflicts` are pure functions with full Vitest coverage
- **Accessible UI** — keyboard navigation, `aria-pressed`, `aria-label`, `aria-live` recovery banner, `:focus-visible` ring

---

## Tech Stack

| | |
|---|---|
| UI | React 18 |
| Language | TypeScript (strict) |
| Build | Vite |
| State | Zustand |
| Routing | React Router v6 |
| Styling | CSS custom properties |
| Tests | Vitest |

---

## Architecture

```
src/
  app/           — router, Zustand store
  components/
    configurator/ — TrimSelector, ColorSelector, WheelSelector,
                    InteriorSelector, PackageSelector,
                    BuildSummaryPanel, RecoveryBanner, ImagePreview
  features/
    pricing/     — computePrice() pure function
    rules/       — validateBuild(), getTrimRecovery(), getConflicts()
  lib/
    formatters/  — formatPrice()
    url-state/   — encodeBuild(), decodeBuild()
    validators/
  pages/         — HomePage, ConfiguratorPage, BuildSummaryPage, NotFoundPage
  services/      — catalog.service.ts (data access layer)
  types/         — Car, Trim, Color, Wheel, Interior, Package, Build
  data/          — static catalog JSON
  styles/        — design tokens, globals, configurator layout
  test/          — unit tests (pricing, rules, url-state)
```

See [docs/architecture.md](docs/architecture.md) for a deeper breakdown.  
See [docs/domain-model.md](docs/domain-model.md) for entity definitions.  
See [docs/pricing-rules.md](docs/pricing-rules.md) for pricing and validation logic.

---

## Product decisions

**Why 2D-first?** Real 3D rendering (Three.js / WebGL) adds significant complexity, load time, and asset requirements. A 2D configurator with a strong layout and live pricing demonstrates the same business logic and UX thinking without the distraction. 3D is a v2 scope item.

**Why no backend?** URL-serialized state means every build is a shareable link with zero infrastructure cost. State lives in the URL; validation runs on the client. This is the right call for a v1 open-source portfolio project.

**What v2 looks like:** Real car imagery per trim/color/wheel combination, a 3D viewer, user accounts for saved builds, and a headless catalog API to replace the static JSON.

See [docs/ux-decisions.md](docs/ux-decisions.md) for all UX rationale.

---

## Local setup

```bash
git clone https://github.com/dorkian/car-configurator-os.git
cd car-configurator-os
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Type-check + production build |
| `npm run test` | Run unit tests |
| `npm run lint` | Lint source files |
| `npm run type-check` | TypeScript check without emit |

---

## About

**Ashkan Dorkian** — AI-native frontend developer. React · TypeScript · Vite · n8n · FastAPI.

- GitHub: [github.com/dorkian](https://github.com/dorkian)
- LinkedIn: [linkedin.com/in/ashkandorkian](https://linkedin.com/in/ashkandorkian)

Open to senior frontend and full-stack roles. Feel free to DM or connect.

---

## License

MIT
