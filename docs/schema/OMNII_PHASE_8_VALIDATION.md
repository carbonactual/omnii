# OMNII PHASE 8 VALIDATION

## Scope
Validate canonical schema materialization before proceeding to the next architectural phase.

## Validation Gates
1. **Envelope completeness** — canonical objects contain identity, type, version, lifecycle, payload, relationships, dependencies, authority, and provenance.
2. **Relationship integrity** — relationship endpoints are addressable and relationship types are registered and directional.
3. **Dependency integrity** — dependencies declare type, strength, compatibility, resolution state, and provenance.
4. **Event integrity** — consequential events carry actor/subject, time, causation/correlation, authority, provenance, and explicit event type.
5. **Registry integrity** — every canonical schema is registered, versioned, lifecycle-controlled, and discoverable.
6. **Compatibility** — schema versions declare backward/forward compatibility expectations and breaking changes are explicit.
7. **Authority separation** — schema registration, capability, ownership, and execution authority remain distinct.
8. **Unknown-state preservation** — unsupported fields, states, relationships, and evidence are not silently converted into false certainty.
9. **Provenance** — materialization and migration preserve source and transformation history.
10. **Graph safety** — cycles, dangling references, invalid dependencies, and impossible lifecycle transitions are detectable.

## Exit Criteria
Phase 8 is complete when the five canonical schema families are materialized, registered, internally consistent, and validated against representative OMNII objects and event flows.

## Required Evidence
- schema definitions
- registry entries
- validation results
- compatibility checks
- representative object instances
- representative relationship/dependency graphs
- representative event streams
- unresolved findings register

## Failure Rule
A failed validation gate blocks architectural promotion. Unknown results remain unknown and require explicit follow-up; they are not treated as passes.
