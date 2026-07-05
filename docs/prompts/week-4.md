Continue Car Configurator OS.

Goal:
Add senior-level business logic and user guidance.

Tasks:
1. Implement compatibility rules between trims, wheels, interiors, and packages.
2. Add disabled states for incompatible options.
3. Add explanatory UI messages for why options are unavailable.
4. Add automatic recovery behavior when a user changes trim and existing selections become invalid.
5. Extract pricing and rule logic into testable pure functions.
6. Write unit tests for:
   - total price calculation
   - incompatible option handling
   - recovery behavior
7. Update docs/ux-decisions.md with rationale for recovery and disabled-state behavior.
8. Return a concise list of rules implemented and test coverage added.