---
name: Car Configurator OS
description: A dark, precision-instrument automotive configurator — the showroom floor rendered as a live pricing tool.
colors:
  electric-cobalt: "#2f5ce8"
  electric-cobalt-hover: "#1e46c9"
  electric-cobalt-deep: "#16359e"
  cobalt-tint-100: "#dbe4ff"
  cobalt-tint-50: "#eef2ff"
  void-950: "#030712"
  void-900: "#111827"
  void-800: "#1f2937"
  void-700: "#374151"
  void-600: "#4b5563"
  void-500: "#6b7280"
  void-400: "#9ca3af"
  void-300: "#d1d5db"
  void-200: "#e5e7eb"
  void-100: "#f3f4f6"
  void-50: "#f9fafb"
  void-0: "#ffffff"
  signal-success: "#16a34a"
  signal-warning: "#d97706"
  signal-error: "#dc2626"
typography:
  display:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(1.875rem, 4vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.375
  title:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "0.12em"
  body:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.5
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
  xl: "12px"
  2xl: "16px"
  full: "9999px"
spacing:
  1: "4px"
  2: "8px"
  3: "12px"
  4: "16px"
  5: "20px"
  6: "24px"
  8: "32px"
  10: "40px"
  12: "48px"
  16: "64px"
components:
  button-primary:
    backgroundColor: "{colors.electric-cobalt}"
    textColor: "{colors.void-0}"
    rounded: "{rounded.lg}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.electric-cobalt-hover}"
  option-card-selected:
    backgroundColor: "{colors.void-900}"
    rounded: "{rounded.xl}"
    padding: "16px"
  option-card-unavailable:
    backgroundColor: "{colors.void-900}"
    rounded: "{rounded.xl}"
    padding: "16px"
---

# Design System: Car Configurator OS

## 1. Overview

**Creative North Star: "The Showroom Floor"**

This is what it feels like to stand in front of the car under gallery lighting, configuration options laid out like a spec sheet on a podium beside it — not a form to fill out, not a checkout cart. The vehicle is the exhibit; the UI is the placard beside it, precise and quiet, never competing for attention.

The system is dark, confident, and exact. Numbers are real (exact price deltas in cents, never rounded for "cleanliness"). Options are named and explained, never reduced to unlabeled icons. Depth comes from light — rim glow, thin borders catching a highlight — never from drop shadows, which would flatten the showroom-lighting illusion into a stack of paper cards.

This system explicitly rejects: generic e-commerce "product options" UI (dropdown selects, small thumbnail swatches, checkout-cart metaphors), long scrolling stacked sections for every option category, and SaaS dashboard conventions (cards-in-a-grid, sidebar nav built for unrelated features). This is a single focused tool, not a multi-page app shell.

**Key Characteristics:**
- Dark void background (`#030712`) so paint colors and chrome read as the brightest elements on screen, exactly as they would under showroom lighting
- One accent — Electric Cobalt — used sparingly for selection, focus, and price emphasis only
- Flat surfaces separated by light (borders, rim glow, inset highlights), never by drop shadow
- Every number is real and precise; no vague iconography standing in for information

## 2. Colors

A near-black void punctuated by a single electric accent; everything else is neutral so the car's actual paint color is the loudest thing in the frame.

### Primary
- **Electric Cobalt** (#2f5ce8): The one accent. Used for the active/selected state ring, the primary CTA ("Share Build"), and the running price total. Deliberately more saturated and cooler than the previous generic SaaS blue (#3b82f6) — reads as an automotive HUD accent, not a default framework color.
- **Electric Cobalt Hover** (#1e46c9): Hover/active state for primary actions.
- **Electric Cobalt Deep** (#16359e): Pressed state, and the deepest ring value for high-emphasis focus states.
- **Cobalt Tint 100** (#dbe4ff) / **Cobalt Tint 50** (#eef2ff): Reserved for light-mode surfaces only (the standalone Build Summary page); not used in the dark configurator shell.

### Neutral
- **Void 950** (#030712): App shell background. The "showroom floor."
- **Void 900** (#111827): Elevated surface — option panel background, selected-card fill.
- **Void 800** (#1f2937): Secondary surface, unselected card fill.
- **Void 700 / 600 / 500** (#374151 / #4b5563 / #6b7280): Borders, dividers, disabled text, secondary labels.
- **Void 400 / 300** (#9ca3af / #d1d5db): Placeholder and de-emphasized body text — never below 4.5:1 contrast against Void 950 for anything that must be read, not just glanced at.
- **Void 0** (#ffffff): Primary text on dark surfaces.

### Named Rules
**The One Accent Rule.** Electric Cobalt appears only on selection state, primary actions, and price. It never decorates a heading, never tints a background wash, never appears twice in the same glance without meaning something both times.

## 3. Typography

**Display Font:** Inter (system-ui, -apple-system fallback)
**Body Font:** Inter (same family, different weight — this is a one-family system by design)

**Character:** A single geometric-humanist sans across every role, differentiated by weight and size rather than a second typeface. This keeps the "instrument panel" feeling calibrated rather than editorial — no serif warmth, no display flourish.

### Hierarchy
- **Display** (700, clamp(1.875rem, 4vw, 2.25rem), 1.25 line-height, -0.02em tracking): Car name / page-level heading only. Appears once per screen.
- **Headline** (600, 1.25rem, 1.375 line-height): Section headers within the option panel (e.g. "Trim", "Exterior Color").
- **Title** (600, 0.75rem, 1.25 line-height, 0.12em tracking, uppercase): Category labels and the current-selection indicator beside each section header.
- **Body** (400, 1rem, 1.5 line-height): Option names, descriptions, feature lists. Cap at 65–75ch where prose appears (package descriptions).
- **Label** (500, 0.875rem, 1.5 line-height): Prices, button text, form-adjacent microcopy.

### Named Rules
**The One-Family Rule.** No second typeface is introduced for "personality." Hierarchy is entirely weight + size + tracking, matching the precision-instrument character — a system that reaches for a display serif to feel premium is reaching for the wrong lever here.

## 4. Elevation

Flat surfaces separated by light, not shadow. This is a dark environment lit like a showroom floor — real shadows would look like paper cards stacked under office lighting, breaking the illusion. Depth instead comes from three techniques: thin 1px borders at low opacity white, an inset highlight on the topmost edge of raised elements, and a soft outer glow (not a shadow) on the selected/focused state using the accent color.

### Shadow Vocabulary
- **Rim separation** (`box-shadow: inset 0 1px 0 0 rgba(255,255,255,0.06)`): Used on cards and panels to suggest a lit top edge, not a floating card.
- **Selection glow** (`box-shadow: 0 0 0 2px var(--color-brand-500), 0 0 24px -8px var(--color-brand-500)`): The only shadow that reads as "shadow" in the traditional sense — reserved for the selected/active state, functioning as a glow rather than a drop shadow.
- **Focus ring** (`box-shadow: 0 0 0 3px var(--color-brand-500)`): Keyboard focus indicator, same accent, no blur — crisp and immediate.

### Named Rules
**The No-Card-Shadow Rule.** Nothing gets a soft ambient drop shadow "for depth." If an element needs to visually separate from its neighbor, it does so with a border, a background-color step (Void 900 vs Void 950), or the selection glow — never a generic `box-shadow: 0 4px 6px rgba(0,0,0,0.1)`.

## 5. Components

### Buttons
- **Shape:** 8px radius (`--radius-lg`) — softened rectangle, not pill, not sharp square. Consistent with the option-card radius.
- **Primary:** Electric Cobalt background, white text, 12px/24px padding, semibold label weight.
- **Hover / Focus:** Background shifts to Electric Cobalt Hover on hover; focus-visible gets the crisp 3px accent ring, no blur.
- **Secondary / Ghost:** Void 800 background with Void 0 text for secondary actions (e.g. "View Full Summary" on light Build Summary page uses Void 100/Void 900 instead, inverted for the light surface).

### Option Cards (Signature Component)
The core building block of the redesigned side panel — one card per selectable option (trim, color, wheel, interior, package).
- **Corner Style:** 12px radius (`--radius-xl`).
- **Background:** Void 800 at rest, Void 900 when selected.
- **Selected State:** Selection glow (see Elevation) plus a checkmark or ring indicator — never color alone, per the WCAG requirement in PRODUCT.md.
- **Unavailable State:** Reduced opacity (60%), `cursor: not-allowed`, and an inline explanatory note (e.g. "Conflicts with Comfort Pack") — the option stays visible and is never removed from the layout, per PRODUCT.md's "constraints are explained, not hidden" principle.
- **Internal Padding:** 16px (`--space-4`).

### Side Panel (Signature Component)
- **Structure:** Persistent vertical panel, fixed width on desktop, containing a step/category switcher (Trim / Color / Wheels / Interior / Packages) and the active category's option cards. Only one category's cards render at a time — this replaces the prior long-scroll stack of all five sections at once.
- **Category switcher:** Title-weight uppercase labels, active category marked with Electric Cobalt underline or left-aligned indicator bar (not a colored left-border stripe on the content itself — the indicator lives in the switcher only).

### Vehicle Preview (Signature Component)
- **Role:** The dominant, persistent visual anchor — occupies the majority of the viewport, never scrolls out of view, updates live on every selection.
- **Background:** Void 950, optionally with a subtle radial gradient toward the selected paint color's hue at very low opacity (existing `image-preview__placeholder` gradient technique), reinforcing "showroom lighting responding to the car."
- **Price overlay:** Running total rendered in Label weight, Electric Cobalt color, anchored to a corner of the preview area — always visible, never requires scrolling to check.

### Cards / Containers (Build Summary — light surface only)
- **Corner Style:** 12–16px radius.
- **Background:** Void 0 (white) — this is the one surface in the system that inverts to light, matching its role as a printable/shareable receipt rather than the live tool.
- **Border:** 1px Void 200.

## 6. Do's and Don'ts

### Do:
- **Do** keep the vehicle preview as the largest, most persistent element on screen — it never scrolls away while configuring.
- **Do** use Electric Cobalt (#2f5ce8) exclusively for selection state, primary actions, and price — nowhere else.
- **Do** separate surfaces with borders, background-color steps, or the selection glow — never a generic drop shadow.
- **Do** show unavailable options in place with an inline explanation, never hide or silently remove them.
- **Do** keep one typeface (Inter) across every role; differentiate with weight, size, and tracking only.

### Don't:
- **Don't** build this as generic e-commerce "product options" UI — no dropdown selects standing in for real option cards, no small thumbnail swatches, no checkout-cart metaphor.
- **Don't** stack all five option categories as one long scrolling column — this is the exact layout being replaced. Use a persistent side panel with category switching instead.
- **Don't** reach for SaaS dashboard conventions (icon-heavy sidebar nav for unrelated features, cards-in-a-grid dashboards) — this is one focused tool, not a multi-page app shell.
- **Don't** use color alone to indicate selected/disabled state — pair with an icon, border-weight change, or explicit label per the WCAG 2.1 AA target in PRODUCT.md.
- **Don't** add soft ambient card shadows (`box-shadow: 0 4px 6px rgba(0,0,0,0.1)`) anywhere in the dark configurator shell — it breaks the showroom-lighting illusion.
