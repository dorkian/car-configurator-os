# Domain Model

## Core Entities

### Car
The base vehicle being configured.
- `id: string`
- `name: string`
- `slug: string`
- `basePrice: number` — in integer cents
- `tagline: string`
- `availableTrims: string[]`
- `heroImage: string`

### Trim
A variant of a car (Standard, Sport, Elite). Controls which options are available.
- `id: string`
- `carId: string`
- `name: string`
- `priceModifier: number` — cents, added to basePrice
- `features: string[]` — included features (display only)
- `availableColors: string[]`
- `availableWheels: string[]`
- `availableInteriors: string[]`
- `availablePackages: string[]`

### Color
Exterior paint option.
- `id: string`
- `name: string`
- `hex: string`
- `type: 'standard' | 'metallic' | 'premium'`
- `priceModifier: number`

### Wheel
Wheel/rim option.
- `id: string`
- `name: string`
- `size: number` — inches
- `image: string`
- `priceModifier: number`

### Interior
Interior finish option.
- `id: string`
- `name: string`
- `material: 'fabric' | 'leather' | 'alcantara'`
- `colorName: string`
- `thumbnail: string`
- `priceModifier: number`

### Package
An optional feature bundle.
- `id: string`
- `name: string`
- `description: string`
- `features: string[]`
- `priceModifier: number`
- `incompatibleWith: string[]` — package ids that cannot be selected simultaneously

### Build
The user's current configuration. Serialized to URL for sharing.
- `carId: string`
- `trimId: string`
- `colorId: string`
- `wheelId: string`
- `interiorId: string`
- `packageIds: string[]`

### PriceSummary
Computed from a Build.
- `basePrice: number`
- `trimPrice: number`
- `colorPrice: number`
- `wheelPrice: number`
- `interiorPrice: number`
- `packagePrice: number`
- `optionsTotal: number` — sum of all modifiers (trimPrice + colorPrice + wheelPrice + interiorPrice + packagePrice)
- `totalPrice: number` — basePrice + optionsTotal
- `lineItems: LineItem[]`

## Data Files

| Entity | File |
|--------|------|
| Car | `src/data/catalog.json` |
| Trim | `src/data/trims.json` |
| Color | `src/data/colors.json` |
| Wheel | `src/data/wheels.json` |
| Interior | `src/data/interiors.json` |
| Package | `src/data/packages.json` |

## Relationships

```
Car ──< Trim ──< Color
              ──< Wheel
              ──< Interior
              ──< Package >──< Package (incompatibility)
```

## Catalog (Falcon X)

| Entity | Count | Notes |
|--------|-------|-------|
| Car | 1 | Falcon X |
| Trim | 3 | Standard, Sport, Elite |
| Color | 6 | 2 standard, 3 metallic, 1 premium |
| Wheel | 4 | 17" → 20" |
| Interior | 3 | Black Leather, Cream Leather, Dark Alcantara |
| Package | 4 | Comfort, Safety, Tech, Performance |

## Assumptions
- All prices are stored and computed in **integer cents** to avoid float rounding.
- `optionsTotal` is what the customer is "paying extra" — useful for showing upgrade cost vs. base.
- Trim availability gates all other options; changing trim resets color, wheel, interior, and filters packages.
- Package incompatibilities are symmetric — if A conflicts with B, B also conflicts with A (enforced in data).
