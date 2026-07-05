# Release Plan

## Versioning
Follows [Semantic Versioning](https://semver.org/). Pre-1.0 releases use `0.x.y`.

## Release Cadence
- Minor releases (`0.x.0`) at the end of each development week.
- Patch releases (`0.x.y`) for bug fixes as needed.

## v0.1.0 — Scaffold
**Target:** End of Week 2  
Deliverables: project compiles, routes work, catalog loads, no features yet.

## v0.2.0 — Configurator MVP
**Target:** End of Week 4  
Deliverables: full trim/color/wheel/package selection, pricing bar live.

## v0.3.0 — Summary & Share
**Target:** End of Week 5  
Deliverables: summary page, shareable URL, pricing breakdown.

## v0.4.0 — OSS Launch
**Target:** End of Week 6  
Deliverables: polished, accessible, mobile-ready, CI green, public GitHub release.

## Release Checklist (per release)
- [ ] All milestone issues closed or moved to backlog
- [ ] `npm run build` passes
- [ ] `npm run test` passes
- [ ] `CHANGELOG.md` updated
- [ ] Git tag pushed (`git tag v0.x.0`)
- [ ] GitHub Release created with notes

---

## v1.0.0 Launch Checklist

### Code quality
- [ ] `npm run build` passes clean (no errors, no warnings)
- [ ] `npm run test` passes clean (all tests green)
- [ ] `npm run lint` passes clean
- [ ] `npm run type-check` passes clean

### Content and docs
- [ ] README final review — case-study format complete, all links valid
- [ ] `CHANGELOG.md` v1.0.0 entry written
- [ ] `docs/ux-decisions.md` up to date with all product decisions
- [ ] `docs/architecture.md` accurate to final structure

### Assets
- [ ] Screenshot set captured: home, configurator desktop, configurator mobile, summary page (minimum 4)
- [ ] OG cover image at `public/og-cover.png` (1200×630)
- [ ] All placeholder images replaced or gracefully handled

### GitHub
- [ ] GitHub Release created with notes and attached screenshots
- [ ] Repo description set: `Open-source 2D car configurator — React, Vite, TypeScript, Zustand. Pricing engine, compatibility rules, URL-shareable builds.`
- [ ] Topics set: `react` `vite` `typescript` `configurator` `frontend-architecture` `zustand` `open-source` `portfolio`
- [ ] Website field set to live demo URL
- [ ] Repo pinned as #1 on profile

### Live demo
- [ ] Live demo URL confirmed working (Vercel / Netlify / GitHub Pages)
- [ ] Share-build URL round-trips correctly on live deploy
- [ ] Mobile layout verified on real device or browser devtools (≤900px)

### Distribution
- [ ] LinkedIn launch post drafted and scheduled
- [ ] Medium article published
- [ ] ashkian.com case study live at `/work/car-configurator-os`

### Milestone sign-off
- [ ] All Weeks 1–6 items completed and reviewed
