# Roadmap

## Milestones

| Milestone | Focus | Status |
|-----------|-------|--------|
| 1 — Foundation | Scaffold, tooling, docs, design tokens | ✅ Done |
| 2 — Catalog and State | Types, JSON catalog, store, pricing skeleton | ✅ Done |
| 3 — Configurator UI | Landing, layout, selectors, image swaps, summary panel | ✅ Done |
| 4 — Rules and Pricing | Locked states, conflict recovery, unit tests | ✅ Done |
| 5 — Shareability and Polish | URL sharing, mobile, accessibility | ✅ Done (deploy still pending) |
| 6 — Launch Packaging | README rewrite, Medium article, LinkedIn, ashkian.com | ✅ Drafted (publish still pending) |
| 7 — Second Model, Theming, i18n | Second car, dark/light mode, internationalization | 🔄 Up next |

---

## Weekly Schedule

### Week 1 — Foundation ✅
Repo, tooling, folder structure, design tokens, CI, docs skeleton.

### Week 2 — Domain Model ✅
Types, static catalog (Falcon X), catalog service, Zustand store, pricing engine, rules engine, URL codec.

### Week 3 — First Usable Configurator ✅
Landing page, configurator layout shell, working trim / color / wheel / interior / package selections, image swap system, live price updates.

### Week 4 — Senior-Level Logic and UX ✅
Compatibility rules wired to UI, locked/disabled option states, conflict recovery flow (confirmation dialog on package swap), unit tests green (29 tests).

### Week 5 — Product Polish and Recruiter Packaging ✅
Shareable URLs end-to-end, mobile responsive refinements, accessibility pass (aria-label/aria-pressed/focus-visible/aria-live), final README as case study. **Remaining:** deploy to live hosting, capture real screenshots.

### Week 6 — Distribution ✅ (content drafted)
Medium article, LinkedIn post, ashkian.com case study, and GitHub release notes all drafted in `docs/`. **Remaining:** actually publish/deploy these (manual, external actions).

### Week 7 — Second Model, Theming, i18n 🔄
Second configurable vehicle, light/dark theme toggle, internationalization (i18n) for UI copy and locale-aware pricing.

---

## Version Targets

| Version | Description | Status |
|---------|-------------|--------|
| v0.1.0 | Foundation scaffold | ✅ Done |
| v0.2.0 | Catalog + state complete | ✅ Done |
| v0.3.0 | Configurator UI complete | ✅ Done |
| v0.4.0 | Rules + pricing wired | ✅ Done |
| v1.0.0 | Full launch — polished, accessible | ✅ Built, not yet deployed/published |
| v1.1.0 | Second car model, dark mode, i18n | 🔄 In progress |
| v2.0.0 | Optional 3D scene (Three.js / R3F) | ⏳ Future |
| v3.0.0 | Optional AI trim recommendation assistant | ⏳ Future |
