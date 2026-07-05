# How I built an open-source car configurator with React, Vite, and TypeScript

*By Ashkan Dorkian — AI-native frontend developer*

---

## The problem with portfolio projects

Most portfolio projects prove you can write code. That's table stakes. What they don't prove is whether you can think.

A to-do app shows you understand state and lists. A weather app shows you can call an API. A clone shows you can read documentation. None of them show whether you understand *why* a problem is hard, how you'd model a domain with real constraints, or what trade-offs you'd make when convenience and correctness pull in opposite directions.

I wanted something different. Something where the business logic was genuinely complex, where the UX decisions had real stakes, and where a recruiter could open the code and see how I think — not just that I know React.

I built a car configurator.

---

## Why a car configurator?

Car configurators are among the most UX-intensive products in the automotive industry. I've worked with automotive software before, and the domain is deceptively hard:

- Options aren't independent. Certain packages conflict. Some wheels are only available on higher trims. Some interior materials are trim-exclusive.
- Pricing is live. Every selection changes the total, and the breakdown must be both accurate and clear.
- State is deeply interlinked. Change the trim, and the color, wheel, interior, and packages might all need to reset — and the user needs to know why.
- Invalid state must be impossible. A URL-shared build from six months ago might reference options that no longer exist. The app must recover gracefully and silently.

None of this is solved by a CRUD pattern. It requires a real domain model, a real rules engine, and real thought about where state lives and how it flows.

---

## Architecture decisions

### Feature-sliced, not file-type-sliced

Most React projects are organized by file type: `components/`, `hooks/`, `utils/`. That works fine until the project gets big, at which point you end up hunting across three folders to trace a single feature.

I organized by domain instead:

```
features/
  pricing/   — computePrice() pure function
  rules/     — validateBuild(), getTrimRecovery(), getConflicts()
```

The domain logic is isolated from the UI. Components are presentational. The store wires them together. Nothing leaks across layers.

### No backend

Every build state is serialized into the URL as a base64 token. That means:
- Every configuration is a shareable link with no login and no server
- Hosting is free (GitHub Pages, Vercel, Netlify)
- The app works offline once loaded

The serialization is a single pure function: `encodeBuild(build) → base64 string`. Deserialization validates the token before applying it, so a corrupted or stale URL never causes a crash.

### URL state as the source of truth

```ts
export function encodeBuild(build: Build): string {
  return btoa(JSON.stringify(build));
}

export function decodeBuild(param: string): Build | null {
  try {
    const parsed = JSON.parse(atob(param));
    // shape validation...
    return parsed as Build;
  } catch {
    return null;
  }
}
```

Simple, robust, zero dependencies.

---

## The pricing rule engine

The hardest constraint in financial UI is floating-point arithmetic. `0.1 + 0.2 !== 0.3` is a real bug in a pricing UI. The solution is to store and compute everything in integer cents:

```ts
// $42,000 base price
const basePrice = 4200000;

// +$4,000 trim upgrade
const trimPrice = 400000;

// total: $46,000 — no floating point involved
const totalPrice = basePrice + trimPrice;
```

Formatting to `$42,000.00` happens only at render time via `formatPrice()`. The domain never sees floats.

`computePrice(build: Build): PriceSummary` is a pure function — no side effects, no store access. That makes it trivially testable:

```ts
it('adds trim price modifier for sport trim', () => {
  const result = computePrice({ ...baseBuild, trimId: 'falcon-x-sport' });
  expect(result.trimPrice).toBe(400000);
  expect(result.totalPrice).toBe(4200000 + 400000 + 60000);
});
```

Eight tests. All green.

---

## Option compatibility — the hard part

Package conflicts are defined in the catalog data:

```json
{
  "id": "pkg-performance",
  "incompatibleWith": ["pkg-comfort"]
}
```

The store enforces this on every `togglePackage` action. But the interesting problem is trim changes: when a user is on the Elite trim with a 20" wheel and Aurora Gold paint, then switches to Standard, none of those selections are available. The store has to recover.

```ts
export function getTrimRecovery(build: Build, newTrimId: string): RecoveryChange[] {
  // pure function: returns what will change, without changing anything
  const changes: RecoveryChange[] = [];
  
  if (!newColors.some((c) => c.id === build.colorId)) {
    changes.push({ field: 'color', message: `Color changed: ${prev.name} → ${next.name}` });
  }
  // ... same for wheel, interior, packages
  
  return changes;
}
```

The store calls `getTrimRecovery` *before* applying the trim change, captures the messages, then applies the change. A `RecoveryBanner` renders with `role="status" aria-live="polite"` so the user knows exactly what got reset and why.

This is the kind of detail that a to-do app doesn't have. It's also the kind of detail that shows up in senior-level frontend interviews.

---

## What I'd do differently

**3D rendering.** A real configurator renders the car in 3D with accurate material shaders. I chose 2D-first deliberately — the business logic is the point, not the WebGL — but v2 would use Three.js with color/material variants per selection.

**Real API.** The static JSON catalog is fine for a demo. A real product would have a headless CMS or catalog API with versioning, so a stale URL from a year ago can resolve gracefully against the API instead of falling back to defaults.

**i18n.** Price formatting is locale-aware via `Intl.NumberFormat`, but the UI copy is English-only. Internationalizing a configurator is a meaningful engineering exercise — option names, feature descriptions, and error messages all need to be translated, and RTL layouts add another dimension.

---

## What this project shows about how I think

I could have built a to-do app in 2 hours. Instead I spent six weeks on this. Not because a car configurator is inherently more valuable, but because the *constraints* it creates are real:

- Integer arithmetic in a financial context
- Constraint propagation across a selection graph
- Recovery UX for invalid state
- URL as a serialization boundary

These are the kinds of problems that show up in production frontend at scale. The code is the proof.

---

**GitHub:** [github.com/dorkian/car-configurator-os](https://github.com/dorkian/car-configurator-os)

If you found this useful, follow me here on Medium and connect on LinkedIn — I write about frontend architecture, AI-native development, and building in public.

*— Ashkan Dorkian, AI-native frontend developer*
