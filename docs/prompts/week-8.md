Continue Car Configurator OS.

Goal:
Redesign the entire visual experience — landing, configurator, summary —
as a cinematic automotive-industry portfolio piece ("The Private Viewing").
Hybrid of Ferrari configurator drama (car-as-hero stage) and Audi/BMW
configurator precision (restrained, typographic controls).

## Design Direction
- Color strategy: Drenched stage + Restrained controls. True stage-black
  background (deeper than current --color-neutral-950), radial spotlight
  pool behind the car. Electric Cobalt accent stays, used on ≤5% of any
  screen (price, active states, one CTA).
- Scene: a private underground showroom at night, one spotlight on the
  car, quiet concierge-style controls.
- Anchors: Ferrari configurator (stage drama, car fills the frame),
  Audi visualizer (control precision, typographic restraint), Porsche
  911 configurator (material/option richness — already reflected in
  existing DESIGN.md).

## Requirements

1. **Configurator page — "The Stage" layout.**
   - Car occupies the full viewport (floor reflection, radial spotlight
     that tints subtly toward the selected paint color — reuse/extend the
     existing color-tint gradient behavior).
   - Bottom floating glass dock (not the current right-side fixed panel):
     5 category labels (Trim/Color/Wheels/Interior/Packages), inline quick
     swatch row for the active category, live price right-aligned.
   - Clicking a category opens a glass drawer (slides up from the dock on
     narrow viewports, in from the right on wide viewports ≥1200px) showing
     the full option cards for that category (trim features, package
     descriptions, conflict notes — everything the current
     `.configurator-panel__content` shows). Drawer must never cover the
     center 40% of the viewport where the car sits.
   - Escape key or click-outside closes the drawer.
   - Angle switching (existing Front/Side/Rear/3-4 buttons) triggers a
     directional crossfade: the incoming image slides ~40px in the
     direction implied by the angle change while cross-fading, instead of
     the current plain fade-in.
   - Price changes animate digit-by-digit (odometer-style rolling digits),
     not an instant value swap.
   - Recovery banner becomes a toast that slides in from the dock area
     instead of pushing page content down.
   - Confirm dialog (package conflict) restyled to match the new glass/dock
     material language (dark glass panel, backdrop blur) rather than the
     current plain dark panel.

2. **Landing page — "The Reveal."**
   - Replace the current feature-grid section entirely (do not keep the
     6-card SaaS-style grid).
   - Full-viewport entrance: on load, the stage fades up under a spotlight
     and the featured car settles in with a slow scale/fade entrance
     (~1.2s total). Must be skippable by any user interaction (click,
     scroll, keypress) and fully disabled under `prefers-reduced-motion`.
   - The two cars (Falcon X, Aureon S) are presented as a horizontal
     cinematic pairing: hovering one dims and slightly shrinks the other
     while the hovered car swells slightly. Clicking navigates to that
     car's configurator, same as today.
   - Below the fold: replace the feature grid with a horizontal
     scroll-driven strip presenting 3 engineering claims (pricing engine,
     compatibility rules, URL sharing — reuse existing copy from
     `home.features.*` i18n keys, condensed to 3) paired with cropped
     detail imagery from existing assets (wheel macro, interior shot,
     light-bar detail crop). No new image generation required — crop from
     existing angle/wheel/interior images.
   - Keep the tech stack pill list and footer as-is structurally, restyled
     to match the new stage-black palette if needed.

3. **Summary page — "The Spec Sheet."**
   - Stays light-themed (the deliberate "printable receipt" contrast
     moment — do not convert to dark).
   - Redesign as a proper spec sheet: car hero image at the top, two-column
     line items below with thin rule dividers, a signature-style total line.
   - Keep the existing "Back to Configurator" browser-history behavior.

4. **Shared: theme system.**
   - Dark theme (default) becomes the stage-black described above.
   - Light theme becomes a bright studio "cyclorama" look (soft even
     daylight, no hard spotlight) — same dock/drawer/stage layout and
     interaction model, different lighting mood. Must still pass the
     existing WCAG AA contrast bar established in the current light-theme
     token override.
   - Existing `.light-surface` escape hatch (Summary, 404) is unaffected
     by this restyle.

5. **Motion.**
   - Add the `motion` npm package (successor to framer-motion) for the
     choreographed sequences (entrance, drawer slide, directional
     crossfade, digit-roll price). Simple hover/focus transitions can stay
     CSS-only.
   - Every new animation must have a `prefers-reduced-motion` fallback
     (instant/crossfade-only, no slides or scale).

## Constraints
- No new image generation required for this build (crop/reuse existing
  assets for the landing detail strip).
- Must not regress any existing i18n coverage — all existing translation
  keys keep working; new UI copy needs new keys in both `en` and `it`
  locale files.
- Must not regress accessibility: keyboard path through dock → drawer →
  options must remain fully operable, `aria-pressed`/`aria-live`/focus
  ring behavior preserved or improved, never removed.
- Must not regress the existing test suite (54 tests) — pure-function
  logic (pricing, rules, theme persistence, url-state, price formatting)
  is unchanged by this visual redesign and its tests must keep passing.
  Add new tests only if new pure logic is introduced (e.g. a digit-roll
  formatter helper, if extracted as a pure function).

## Edge Cases
- Drawer open + window resized across the 1200px breakpoint: drawer must
  reposition correctly (bottom-sheet vs right-panel) without breaking.
- Rapid category switching while a drawer animation is in-flight must not
  stack/duplicate drawers or leave the dock in an inconsistent active state.
- Angle crossfade must not flash the CSS placeholder between the outgoing
  and incoming image when both images exist (only show placeholder on
  genuine load failure, same as today).
- Landing entrance sequence must not block interaction — a user who
  clicks/scrolls immediately on page load must be able to proceed without
  waiting for the choreography to finish.
- `prefers-reduced-motion`: entrance sequence, drawer slide, directional
  crossfade, and price digit-roll all degrade to instant or simple
  crossfade with no transform/slide motion.

## Definition of Done
- Configurator: dock+drawer layout replaces the old side panel; angle
  switch uses directional crossfade; price uses digit-roll animation;
  recovery banner is a toast; confirm dialog uses glass styling.
- Landing: entrance choreography present and skippable; two-car cinematic
  hover pairing present; old feature grid removed and replaced by the
  3-claim scroll strip with cropped imagery.
- Summary: redesigned as a two-column spec sheet with hero image, still
  light-themed.
- Both themes (dark stage-black, light cyclorama) implemented and
  contrast-verified.
- `npm run build`, `npm run test`, `npm run lint`, `npm run type-check`
  all pass clean.
- Existing 54 tests pass unchanged.

## Return
A concise list of what changed per page, confirmation of motion
reduced-motion handling, and test/build status.
