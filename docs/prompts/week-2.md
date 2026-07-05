Continue Car Configurator OS.

Tasks:
1. Define TypeScript domain types for:
   - Car model
   - Trim
   - Exterior color
   - Wheel option
   - Interior option
   - Package option
   - Pricing adjustment
   - Compatibility rule
2. Create static JSON mock data for one car with:
   - 3 trims
   - 6 colors
   - 3 wheels
   - 3 interiors
   - 4 packages
3. Create a catalog service layer for loading and mapping mock data.
4. Add a store for current configuration state.
5. Add selectors for:
   - base price
   - selected options total
   - grand total
   - available options
6. Keep pricing and rules logic in pure functions.
7. Write docs/domain-model.md and docs/pricing-rules.md.
8. Return types, assumptions, and open questions.