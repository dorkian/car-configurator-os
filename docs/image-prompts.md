# Image Prompts and Asset Spec

## Asset Requirements

| Asset | Count | Path | Notes |
|-------|-------|------|-------|
| Hero image | 1 | `public/cars/falcon-x/hero/hero.jpg` | Full-width, dramatic 3/4 front angle, dark studio background |
| Angle renders per color | 4 | `public/cars/falcon-x/angles/{color}-{angle}.jpg` | front, rear, side, 3/4-front |
| Color swatch renders | 1 per color | `public/cars/falcon-x/colors/{color}.jpg` | Neutral angle, consistent lighting across all colors |
| Wheel closeups | 3 | `public/cars/falcon-x/wheels/{wheel-id}.jpg` | Isolated on white/dark bg, consistent crop |
| Interior thumbnails | 3 | `public/cars/falcon-x/interior/{interior-id}.jpg` | Dashboard + seat view |
| OG cover | 1 | `public/og-cover.png` | 1200×630, car + project name overlay |

---

## Midjourney / AI Prompt Templates

### Hero image
```
sleek futuristic sports sedan, silver-blue metallic paint, dramatic 3/4 front angle, 
dark studio background, cinematic automotive photography, soft rim lighting, 
8K, photorealistic, car advertisement quality, no text
```

### Per-color angle render (replace {color_descriptor})
```
sleek futuristic sports sedan, {color_descriptor} paint, {angle} angle, 
dark neutral background, studio automotive photography, sharp detail, 
photorealistic, no text, no logos
```
- Angles: `3/4 front`, `front`, `rear`, `side profile`
- Color descriptors: `midnight black`, `alpine white`, `steel grey metallic`, `velocity red metallic`, `cobalt blue metallic`, `aurora gold premium`

### Wheel closeup
```
{wheel_name} alloy wheel, {size}-inch, isolated on dark background, 
macro product photography, sharp reflections, automotive detail shot, 
photorealistic, no text
```

### Interior thumbnail
```
{interior_name} car interior, premium {material} seats in {color}, 
modern dashboard, soft ambient lighting, driver POV angle, 
automotive photography, photorealistic, no text
```

### OG cover (for social/share meta)
```
cinematic automotive hero image, futuristic sports sedan, 
side profile on dark background, glowing accent lights, 
space for text overlay on left third
```
Then composite: car image + "Falcon X" wordmark + "Car Configurator OS" subtitle in Figma or equivalent.

---

## Naming Conventions

```
public/cars/falcon-x/
  hero/
    hero.jpg
  angles/
    midnight-black-front.jpg
    midnight-black-rear.jpg
    midnight-black-side.jpg
    midnight-black-3q.jpg
    alpine-white-front.jpg
    ... (repeat per color)
  colors/
    midnight-black.jpg
    alpine-white.jpg
    steel-grey.jpg
    velocity-red.jpg
    cobalt-blue.jpg
    aurora-gold.jpg
  wheels/
    17-alloy.jpg
    18-sport.jpg
    19-performance.jpg
    20-elite.jpg
  interior/
    black-leather.jpg
    cream-leather.jpg
    dark-alcantara.jpg
```

---

## Fallback Strategy (before real assets exist)

Use CSS gradient placeholders in the color picker and a single placeholder image for all angles. The component should accept an `onError` fallback so missing images degrade gracefully without breaking layout. Placeholder text: `[Image coming soon]` in a styled empty state.
