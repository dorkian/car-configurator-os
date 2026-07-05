# UX Decisions

## Configurator Flow

Step-by-step linear flow, one section at a time:
1. Choose Trim
2. Choose Color
3. Choose Wheels
4. Choose Packages
5. Review Summary

Rationale: reduces cognitive load vs. showing everything at once. Each step is a distinct page section that scrolls into view.

## URL-as-State

The full build config is encoded in the URL (`?b=<base64>`). This means:
- No login required to save a build
- Sharing = copy URL
- Back button works naturally

## Conflict Handling (Packages)

When the user selects a package that conflicts with an already-selected one:
- The conflicting package card shows a disabled state (`package-card--unavailable`) with an inline note: "⚠ Conflicts with [Package Name]".
- The card is non-interactive while the conflict exists; the user must deselect the conflicting package first.
- Rationale: avoids a modal flow for a low-stakes conflict; the inline note gives enough context without interrupting the flow.

## Trim Change — Automatic Recovery

When the user changes trim and their existing color, wheel, interior, or package selections are not available on the new trim:
- The store resets each incompatible selection to the first available option for the new trim, and drops packages not offered on it.
- A dismissable `RecoveryBanner` appears above the option sections listing each change (e.g. "Wheels changed: 20″ Elite → 19″ Performance").
- Rationale: silent reset is necessary because the trim constraint is hard — there is no valid "keep" path for an unavailable option. The banner closes the information gap without blocking the user or requiring a confirmation step. Trim changes are intentional; the user expects adjustments.

## Pricing Display

- Always show running total in a sticky summary bar.
- Show a price breakdown on the summary page with named line items.
- Never show "free" — show "$0" or omit the line item.

## Responsive Design

- Mobile: single-column, image carousel at top, options below.
- Desktop: two-column layout — car preview left, config options right.
- Tablet: collapse to mobile layout at < 900px.

## Accessibility

- Color swatches must have `aria-label` with color name (not just visual).
- All interactive options are keyboard-navigable.
- Selected state uses both color and icon (not color alone).

## Image Handling

- Car images are static assets in `public/cars/{slug}/`.
- Hero image loads eagerly; angle/color/wheel images load lazily.
- Placeholder shown while images load (skeleton or blur-up).

## Theme Toggle (Light/Dark)

- Default is **dark** — the app's own "Showroom Floor" identity (see DESIGN.md).
- On first visit (no stored preference), the OS-level `prefers-color-scheme` is respected if the browser reports one; absent any signal, the app falls back to its dark default rather than assuming light.
- The choice is persisted (`localStorage`) so returning visitors don't need to re-select.
- Rationale: a car-brand configurator with a strong dark identity shouldn't force dark on every user — some genuinely prefer light, especially in bright environments — but the *brand's own* default point of view is dark, so a genuinely undetermined environment should land on brand rather than a generic light default.
- Toggle affects the whole app (landing + configurator); the shareable Build Summary page is a deliberate exception — it's styled as a printable/shareable "receipt" and stays light regardless of the app theme, since that's the more legible format for something meant to be screenshotted or shared outside the app's own dark context.

## Language Switcher (i18n)

- English and Italian ship at launch. The switcher is a small `EN`/`IT` toggle placed next to the theme toggle — both are "ambient" controls, not primary actions, so they sit in the nav corner rather than competing with the configurator's own option controls.
- Language choice is detected/persisted automatically (browser language on first visit, then `localStorage`), matching the same "respect the environment, then remember the choice" pattern as the theme toggle.
- Currency follows language, not a separate setting: choosing Italian also switches price formatting to EUR. Two independent currency toggles would ask the user to think about a distinction (language vs. currency) that doesn't meaningfully exist for this product's audience.

## Second Car — Aureon S

- Falcon X is positioned as the sport sedan; Aureon S is the luxury-sedan counterpart — different price tier, different package language ("Serenity Pack" and "Chauffeur Pack" vs. "Performance Pack"), different trim names (Elegance / Prestige / Signature vs. Standard / Sport / Elite).
- Rationale: a second car that was just a re-skinned Falcon X wouldn't meaningfully exercise the pricing/rules engine across a different price bracket and option philosophy. A luxury counterpart forces the domain model to prove it's genuinely car-agnostic, not implicitly tuned to one car's numbers.
- The landing page now presents both cars as a selection grid rather than a single "Configure" CTA, since the product now has more than one thing to configure.
