# Roadmap

## Milestones

### Milestone 1 — Foundation
- [x] Initialize Vite + React + TypeScript project scaffold
- [x] Add linting, formatting, typecheck, and CI workflow
- [x] Create base folder structure
- [x] Add global design tokens and app shell
- [x] Write initial architecture and roadmap docs

### Milestone 2 — Catalog and State
- [x] Define domain types for model, trims, colors, wheels, packages
- [x] Create static JSON catalog
- [x] Implement catalog loading service
- [x] Implement configurator state store
- [ ] Add selectors for active trim, total price, available options

### Milestone 3 — Configurator UI
- [ ] Build landing page hero and project framing
- [ ] Build configurator layout shell
- [ ] Implement trim selector
- [ ] Implement color selector with image swaps
- [ ] Implement wheel selector
- [ ] Implement interior selector
- [ ] Implement package selector cards
- [ ] Build sticky build summary panel

### Milestone 4 — Rules and Pricing
- [x] Implement pricing engine
- [x] Implement compatibility rules engine
- [ ] Add disabled/locked option states
- [ ] Add dependency messages and recovery UX
- [x] Write unit tests for pricing and rules

### Milestone 5 — Shareability and Polish
- [x] Serialize build to URL query params
- [x] Parse URL to restore state
- [ ] Add copy-share link action
- [ ] Add mobile responsive refinements
- [ ] Add accessibility passes for keyboard/focus/labels
- [ ] Add loading, empty, and error states

### Milestone 6 — Launch Packaging
- [ ] Produce screenshots and OG cover
- [ ] Rewrite README as case study
- [ ] Add About Me section and personal links
- [ ] Deploy to free hosting
- [ ] Publish release v1.0.0
- [ ] Write Medium article draft
- [ ] Add ashkian.com case-study copy

---

## Weekly Plan

### Week 1 — Repository Foundation and Positioning ✅
**Goal:** Repo created, tooling locked, docs skeleton in place.
- [x] Repo created
- [x] Base tooling configured (Vite, ESLint, Prettier, TypeScript strict, Vitest, CI)
- [x] Docs folder with architecture, domain model, pricing rules, UX decisions, roadmap, release plan
- [x] Initial README skeleton
- [x] CLAUDE.md with project rules
- [ ] Issue board populated

### Week 2 — Domain Model and Mock Data ✅
**Goal:** Types finalized, catalog complete, store working, price skeleton.
- [x] Types finalized (`src/types/`)
- [x] JSON catalog completed (Falcon X — 3 trims, 6 colors, 4 wheels, 4 packages)
- [x] Config store working (Zustand)
- [x] Price calculation skeleton (pricing engine)
- [x] Domain docs written

### Week 3 — First Usable Configurator
**Goal:** Working end-to-end configurator visible in the browser.
- [ ] Landing page
- [ ] Configurator layout
- [ ] Working trim/color/wheel/package selections
- [ ] Price updates visible
- [ ] Image swap system done

### Week 4 — Senior-Level Logic and UX
**Goal:** Rule engine wired to UI, tests passing, polished microcopy.
- [ ] Compatibility rules wired to UI (locked/disabled states)
- [ ] Recovery flows (conflict modal, auto-deselect with message)
- [ ] Unit tests passing (pricing, rules, url-state)
- [ ] Better microcopy throughout

### Week 5 — Product Polish and Recruiter Packaging
**Goal:** Demo-ready, shareable, accessible, deployed.
- [ ] Shareable URLs working end-to-end
- [ ] Mobile polish (single-column, responsive breakpoints)
- [ ] Accessibility pass (axe-core, keyboard nav, aria labels)
- [ ] Screenshots captured to `docs/screenshots/`
- [ ] Final README (case-study format)
- [ ] Deployed to free hosting (GitHub Pages / Vercel)

### Week 6 — Distribution and SEO Assets
**Goal:** Visible to the internet, indexed by recruiters.
- [ ] Medium article draft written
- [ ] LinkedIn post drafted and scheduled
- [ ] ashkian.com case study copy written
- [ ] GitHub release v1.0.0 published with notes
- [ ] Repo pinned on GitHub profile

---

## Version Targets

| Version | Milestone | Week |
|---------|-----------|------|
| v0.1.0 | Foundation done | End of Week 1 |
| v0.2.0 | Catalog + state done | End of Week 2 |
| v0.3.0 | Configurator UI done | End of Week 3 |
| v0.4.0 | Rules + pricing wired | End of Week 4 |
| v1.0.0 | Polished + deployed | End of Week 5–6 |
| v1.1.0 | Second model, dark mode, i18n | Post-launch |
| v2.0.0 | 3D scene (Three.js / R3F) | Future |
| v3.0.0 | AI assistant (trim recommendation) | Future |
