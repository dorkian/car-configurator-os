# Changelog

All notable changes to this project will be documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versioning follows [Semantic Versioning](https://semver.org/).

---

## [Unreleased]

### Added
- Project scaffold: Vite + React 18 + TypeScript strict mode
- Domain types: `Car`, `Trim`, `Color`, `Wheel`, `Package`, `Build`, `PriceSummary`
- Static catalog data for Falcon X (3 trims, 6 colors, 4 wheels, 4 packages)
- Catalog service (typed static JSON loaders)
- Pricing engine (`computePrice`) — integer-cent arithmetic
- Rules engine (`validateBuild`, `getConflicts`)
- URL state codec (`encodeBuild` / `decodeBuild`)
- Zustand build store with `setTrim`, `setColor`, `setWheel`, `togglePackage`, `hydrate`
- React Router v6 routing (Home, Configurator, Summary, 404)
- Design tokens (CSS custom properties)
- Global styles and shared component classes
- Unit tests: pricing, rules, url-state
- CI workflow (lint + type-check + test + build)
- GitHub issue templates (bug, feature, task)
- Weekly AI prompt docs (weeks 1–6)
