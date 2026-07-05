# Pricing Rules

## Price Composition

```
optionsTotal = trim.priceModifier
             + color.priceModifier
             + wheel.priceModifier
             + interior.priceModifier
             + sum(selectedPackages[].priceModifier)

totalPrice = car.basePrice + optionsTotal
```

All prices are stored and computed in **integer cents** to avoid floating-point rounding issues.
Display formatting (USD, locale-aware) happens only at render time via `formatPrice()`.

## Selectors Exposed by the Store

| Selector | Returns |
|----------|---------|
| `basePrice()` | Car's base price in cents |
| `optionsTotal()` | Sum of all selected option modifiers |
| `totalPrice()` | basePrice + optionsTotal |
| `priceSummary()` | Full `PriceSummary` with line items |
| `availableColors()` | Colors valid for the current trim |
| `availableWheels()` | Wheels valid for the current trim |
| `availableInteriors()` | Interiors valid for the current trim |
| `availablePackages()` | Packages valid for the current trim |
| `activeTrim()` | The current `Trim` object |

## Compatibility Rules

### Package incompatibility
If package A lists package B in `incompatibleWith`, selecting A removes B (and vice versa).
The store's `togglePackage()` applies this automatically.
The UI should surface this to the user before applying (conflict confirmation modal).

### Trim-level availability
All options (color, wheel, interior, package) are filtered by the selected trim's allowed lists.
When a trim changes, `setTrim()` resets color, wheel, and interior to the first available option for the new trim, and drops any packages not supported by the new trim.

### Default selections on trim change
| Option | Default |
|--------|---------|
| Color | First in `trim.availableColors` |
| Wheel | First in `trim.availableWheels` |
| Interior | First in `trim.availableInteriors` |
| Packages | Empty (no defaults) |

## Validation (`validateBuild`)

Called when hydrating from URL to sanitize potentially stale state:

1. Verify `carId` exists
2. Verify `trimId` is valid for that car; fall back to first trim if not
3. Verify `colorId` is in the trim's available colors; fall back to first
4. Verify `wheelId` is in the trim's available wheels; fall back to first
5. Verify `interiorId` is in the trim's available interiors; fall back to first
6. Filter `packageIds` to only those available for the trim
7. Return sanitized `Build`

Invalid state is never surfaced as an error — it silently degrades to a valid default.

## Edge Cases

- Missing or unknown IDs in URL state → `validateBuild` falls back to defaults, never throws.
- Empty `interiorId` in URL (legacy builds without interior) → falls back to first interior for the trim.
- Package that conflicts with itself is a data error — not defended against in code.
