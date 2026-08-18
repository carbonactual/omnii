# OMNII Runtime Boundary and Registry Hardening

**Status: CANONICAL IMPLEMENTATION CONTRACT**

## Runtime boundary

The runtime must resolve an execution request in this order:

```text
request
 → identity
 → authority
 → policy/constraints
 → capability
 → resource
 → dependency
 → execution
 → state transition
 → event
 → audit/observability
```

A component may optimize this sequence internally but may not bypass its semantic controls.

## Registry boundary

There is one canonical meaning for each registry class:

| Registry | Canonical responsibility |
|---|---|
| Object Registry | canonical object identities/types/lifecycle/provenance |
| Relationship Registry | typed relationship records |
| Dependency Registry | declared implementation/architecture dependencies |
| Capability Registry | capability definitions and lifecycle |
| Resource Registry | resources/capacity and control boundaries |
| Product Registry | product compositions |
| Service Registry | exposed service capabilities |
| Agent Registry | agent identity/contracts/capability declarations |

A runtime may physically shard these stores, but sharding must not create alternate semantic registries.

## Event/state hardening

- Event records occurrence; state records condition.
- Command/action expresses requested work; execution records the attempt.
- Workflow composes executions; transaction records governed exchange/commitment where applicable.
- Queries must not mutate canonical state.
- State transitions must be attributable and observable.

## Phase package boundary

The Phase 21–40 TypeScript directories are currently executable reference specimens rather than independently packaged production services: they have no per-package manifests and are not imported by the root application as universal runtime dependencies. They must therefore be classified as reference/experimental implementation unless integration evidence proves otherwise.

This classification does not invalidate their architectural value and does not require rewriting working specimens.

## BUNK boundary

BUNK's database, APIs, authentication and product roles are implementation-specific. They may implement OMNII-compatible contracts but do not define the canonical object, relationship or authority model.
