# Car Configurator OS

An open-source, client-side car configurator built with React, TypeScript, and Vite. It's a working demo of production-grade frontend architecture, business logic, and automotive UX, not another CRUD sample.

**Live demo:** _coming soon_
**Author:** [Ashkan Dorkian](https://github.com/dorkian), AI-native frontend developer

> **Independent demo, not an official manufacturer configurator.** This project is an independent demo car configurator created for showcase purposes only. It is not affiliated with, endorsed by, sponsored by, or approved by any automotive manufacturer, distributor, or brand owner. Falcon X and Aureon S are fictional, concept-style vehicles. All vehicle visuals shown are AI-generated, illustrative images and do not depict real production vehicles or official manufacturer specifications.

<p align="center">
  <img src="public/cars/falcon-x/hero/hero.jpg" alt="Falcon X configurator hero shot" width="49%" />
  <img src="public/cars/aureon-s/hero/hero.jpg" alt="Aureon S configurator hero shot" width="49%" />
</p>

---

## Why this exists

Most portfolio projects are shallow: a to-do list, a weather widget, a clone of something famous. Car configurators sit at the opposite end of the spectrum. Tangled option dependencies, live pricing, hard constraints, and zero tolerance for an invalid build. I built one from scratch with no backend, no paid services, and full test coverage on the business logic, because that's the kind of problem that actually shows how I think.

This is a recruiter-facing open-source app. The code is the portfolio; the engineering decisions are the cover letter.

---

## What it demonstrates

- **Feature-sliced architecture**: domain logic (`features/`), UI, services, and types stay in their own lanes, and nothing leaks across layers
- **Pricing rule engine**: integer-cent arithmetic, pure functions, line-item breakdown, no floating-point surprises
- **Option compatibility system**: `incompatibleWith` constraints enforced at the store level, with disabled states and conflict explanations surfaced in the UI
- **Trim-change recovery**: when switching trims invalidates a selection, the store auto-recovers and a `RecoveryBanner` explains exactly what changed
- **URL-serialized build state**: every configuration is a shareable link, no backend, no login, no storage
- **Zustand store design**: selectors, actions, and derived state modeled cleanly, no prop drilling, no context soup
- **Testable business logic**: `computePrice`, `validateBuild`, `getTrimRecovery`, `getConflicts` are pure functions with full Vitest coverage
- **Accessible UI**: keyboard navigation, `aria-pressed`, `aria-label`, `aria-live` recovery banner, `:focus-visible` ring

---

## Screenshots

_AI-generated illustrative images of a fictional vehicle concept, pulled directly from the app's own asset set, not mockups._

| Trim & color selection | Wheels & interior |
|---|---|
| <img src="public/cars/falcon-x/angles/velocity-red-3q.jpg" width="380" /> | <img src="public/cars/falcon-x/wheels/20-elite.png" width="380" /> |
| **Interior finish** | **Build summary** |
| <img src="public/cars/aureon-s/interior/cognac-nappa.jpg" width="380" /> | <img src="public/og-cover.png" width="380" /> |

---

## Tech stack

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

Deeper dives: [architecture](docs/architecture.md) · [domain model](docs/domain-model.md) · [pricing & validation rules](docs/pricing-rules.md)

---

## Product decisions

**Why 2D, not 3D?** A real 3D viewer (Three.js/WebGL) adds load time, asset overhead, and complexity that would drown out the actual point of this project. A tight 2D layout with live pricing proves the same business logic and UX thinking without the distraction. 3D is on the v2 list.

**Why no backend?** Encoding state in the URL means every build is a shareable link with zero infrastructure. Validation runs entirely client-side. For a v1 portfolio piece, that's the right trade, not a limitation I'm apologizing for.

**What v2 looks like:** real per-combination car imagery, a 3D viewer, saved builds behind user accounts, and a headless catalog API in place of the static JSON.

Full rationale: [docs/ux-decisions.md](docs/ux-decisions.md)

---

## Run it locally

```bash
git clone https://github.com/dorkian/car-configurator-os.git
cd car-configurator-os
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Type-check, then build for production |
| `npm run test` | Run the unit tests |
| `npm run lint` | Lint source files |
| `npm run type-check` | TypeScript check, no emit |

---

## About

**Ashkan Dorkian**, AI-native frontend developer. React · TypeScript · Vite · n8n · FastAPI.

- GitHub: [github.com/dorkian](https://github.com/dorkian)
- LinkedIn: [linkedin.com/in/adorkian](https://linkedin.com/in/adorkian)

Open to senior frontend and full-stack roles. Feel free to DM or connect.

---

## License

MIT (source code). The MIT license covers this repository's code only. Vehicle imagery under `public/cars/` is AI-generated and illustrative; we make no claim about its copyright status and it should not be treated as cleared for reuse outside this demo.
