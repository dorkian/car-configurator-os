# Release Notes — v1.0.0

**Car Configurator OS**  
Released: _[date TBD]_

---

## What's in v1.0.0

This is the first public release of Car Configurator OS — a fully client-side, open-source automotive configurator built with React, TypeScript, and Vite.

### Configurator

- Step-by-step configuration: Trim → Exterior Color → Wheels → Interior → Packages
- Live pricing with full line-item breakdown (integer-cent arithmetic, no floating-point errors)
- Conflict-aware package selection: incompatible packages show a disabled state with an inline explanation
- Trim-change recovery: when changing trim makes existing selections invalid, the store auto-recovers and a dismissable banner tells the user exactly what changed
- Sticky build summary panel with running total on desktop; stacked layout on mobile

### URL-shareable builds

- Every configuration is a shareable link — no login, no backend, no storage
- `?b=<base64>` token encodes the full build
- Page-load state restoration with `validateBuild` sanitization (stale or corrupted URLs degrade gracefully to valid defaults)
- "Share Build" button copies the URL to clipboard with a 2-second "Link copied!" confirmation

### Accessibility

- All interactive elements are keyboard-navigable (`<button>` elements throughout)
- `aria-label` on all selector cards (trim, color, wheel, interior)
- `aria-pressed` for toggle state
- `aria-disabled` for unavailable package cards
- `role="status" aria-live="polite"` on the recovery banner
- `:focus-visible` ring globally

### Mobile

- Responsive layout at ≤900px: single-column, stacked summary panel
- Package grid collapses to one column on mobile

### Business logic test coverage

- `computePrice` — 8 tests covering base price, all option modifiers, package combinations, line items
- `validateBuild` — 7 tests covering trim fallback, all option fallbacks, package filtering
- `getConflicts` — 3 tests
- `getTrimRecovery` — 5 tests covering per-field and multi-field recovery
- URL codec — 5 tests covering encode/decode round-trip and invalid input

**Total: 29 tests, all green.**

---

## Known limitations

- Car imagery is placeholder (CSS color-branded gradient); real photography planned for v2
- Catalog is static JSON; a headless CMS or catalog API is planned for v2
- English-only; i18n planned for v2
- No OG image yet for social sharing previews

---

## What's next (v2 roadmap)

- 3D car viewer with per-material shaders (Three.js)
- Real car photography per trim/color/wheel combination
- Headless catalog API (so stale URLs can resolve against live data)
- User accounts + saved builds
- i18n (RTL, multi-currency)

See [ROADMAP.md](../ROADMAP.md) for full backlog.

---

## Credits

Built by **Ashkan Dorkian** — AI-native frontend developer.  
[github.com/dorkian](https://github.com/dorkian) · [linkedin.com/in/ashkandorkian](https://linkedin.com/in/ashkandorkian)
