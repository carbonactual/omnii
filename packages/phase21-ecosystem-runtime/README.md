# OMNII Phase 21 — Universal Ecosystem Runtime

This package is the first executable implementation beyond Phase 20.

It provides a framework-neutral runtime for multiple independently governed ecosystems sharing the OMNII constitutional substrate.

## Implemented invariants

- Ecosystems are first-class scoped objects.
- Local lifecycle is explicit and auditable.
- Actor identity and authority scope are checked before execution.
- Capabilities and resources are ecosystem-scoped.
- Cross-ecosystem actions are denied unless an explicit agreement authorizes the operation.
- Runtime events preserve actor, authority, ecosystem, action, outcome, correlation, and provenance.
- Runtime state is inspectable by ecosystem.
- No runtime operation creates constitutional authority.

## Runtime boundary

`request → ecosystem context → identity → authority → capability → resource → execution → outcome → event`

The implementation intentionally uses in-memory state at this stage. Persistence, distributed execution, external identity providers, and transport adapters remain replaceable implementation concerns governed by the Phase 1–20 contracts.
