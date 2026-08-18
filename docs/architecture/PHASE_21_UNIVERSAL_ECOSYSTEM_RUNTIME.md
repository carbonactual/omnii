# Phase 21 — Universal Ecosystem Runtime

**Status:** Phase 21 architectural specification
**Depends on:** Phase 20 — Universal Operating Environment
**Classification:** Near-term implementation architecture; must be validated against the existing Phase 1–20 contracts before runtime expansion.

## 1. Objective

Enable OMNII to run multiple independent ecosystems on one constitutional substrate.

An ecosystem is a governed composition of people, organizations, products, communities, services, resources, agents, institutions, and territories. The runtime must provide shared primitives without collapsing local identity, governance, ownership, authority, or policy.

Canonical composition:

`Person → Organization → Product → Community → Territory → Ecosystem`

The arrow represents possible containment/participation/composition relationships, not a mandatory hierarchy.

## 2. Core distinction

Phase 21 introduces **ecosystem scope**, not a new constitution.

The existing constitutional layer remains the highest-order contract. Ecosystem governance operates inside that contract and may establish stricter local rules where compatible.

A runtime tenant, namespace, network, organization, or database partition is not automatically an ecosystem. An ecosystem is a governed canonical object with explicit identity, lifecycle, boundaries, authority, participants, resources, relationships, and operating rules.

## 3. Canonical ecosystem object

An ecosystem object should minimally carry:

- stable identity
- schema/version
- lifecycle state
- constitutional reference
- governance model/reference
- jurisdictional context where applicable
- owner/steward/authority references
- membership/participant policy
- resource and capability scope
- data visibility boundaries
- interoperability policy
- event/Pulse scope
- provenance
- creation/effective dates
- suspension/decommission rules

The final schema must reuse the Phase 1 universal object envelope rather than introduce a parallel object system.

## 4. Runtime model

The runtime should resolve work through:

`request → ecosystem context → identity → authority → policy → capability → resource → execution → outcome → event → audit`

Ecosystem context is mandatory for ecosystem-scoped operations.

Cross-ecosystem operations must resolve both source and target context and an explicit interoperability agreement or policy.

## 5. Isolation and autonomy

The runtime must support:

1. identity isolation
2. authorization isolation
3. data and knowledge visibility boundaries
4. resource/accounting separation
5. workflow and event scoping
6. agent authority scoping
7. ecosystem-specific governance
8. independent lifecycle and suspension

Shared infrastructure must not create implicit shared authority.

A failure, suspension, or policy change in one ecosystem must not silently mutate unrelated ecosystems.

## 6. Shared substrate vs local state

### Shared constitutional substrate

- universal object semantics
- identity/authority primitives
- provenance
- capability contracts
- event/Pulse contracts
- interoperability protocols
- security invariants
- audit requirements
- lifecycle semantics

### Ecosystem-local state

- local objects and relationships
- local governance configuration
- local policies
- local memberships
- local workflows
- local service compositions
- local resources and economic state
- local knowledge projections
- local operational context

A local ecosystem may extend shared capabilities but may not redefine constitutional meanings silently.

## 7. Ecosystem composition graph

OMNII should represent an ecosystem as a governed graph whose nodes may include:

`people, organizations, agents, products, services, communities, institutions, territories, infrastructure, resources, contracts, commitments, events, knowledge, value`

Relationships must remain typed and attributable.

The ecosystem graph is a projection over canonical registries and events; it must not become a second source of truth.

## 8. Ecosystem lifecycle

Minimum lifecycle:

`proposed → constituted → active → restricted/suspended → recovering → active → retiring → retired`

Transitions require the applicable authority and must produce audit evidence.

A suspended ecosystem must have explicit rules for safety, preservation, recovery, exit, and possible reactivation.

## 9. ABBA relationship

ABBA operates as coordinating intelligence inside the ecosystem runtime.

ABBA may:

- understand ecosystem state
- resolve capabilities
- coordinate agents and humans
- plan work
- propose changes
- monitor outcomes
- escalate exceptions

ABBA may not:

- constitute an ecosystem without authorized governance
- transfer authority implicitly
- override reserved decisions
- redefine constitutional semantics
- create unrestricted cross-ecosystem authority

Phase 23 will extend coordination across ecosystems; Phase 21 only establishes the runtime boundary that makes such future coordination possible.

## 10. Security requirements

The runtime must enforce:

- explicit ecosystem context
- deny-by-default cross-scope access
- capability-based action boundaries
- provenance on consequential operations
- auditability of authority changes
- tenant/ecosystem isolation
- secret isolation
- policy versioning
- revocation and suspension
- safe failure and recovery

Security controls must be enforced below convenience-level APIs so that a client cannot bypass them by choosing another interface.

## 11. Economic and resource boundaries

Each ecosystem must be capable of having distinct resource and value scopes.

Resource movements across ecosystems must be explicit, attributable, and governed.

The runtime must distinguish:

`reference → permission → reservation → transfer → settlement`

and must not treat a cross-ecosystem relationship as an economic transfer by default.

## 12. Observability

Every ecosystem-scoped runtime action should be attributable through:

`actor → authority → ecosystem → action → capability → resource → outcome → event`

Metrics and logs must preserve ecosystem context.

Aggregate analytics across ecosystems must respect their visibility and governance rules.

## 13. Failure model

Phase 21 must support independent failure domains.

A local outage should degrade the affected ecosystem without corrupting the shared constitutional layer or unrelated ecosystems.

Recovery should preserve event identity, ordering constraints where required, provenance, and authorization state.

## 14. Phase 21 acceptance criteria

Phase 21 is ready for implementation completion when the repository can demonstrate, through tests or executable proofs:

1. two distinct ecosystems can coexist on the same substrate;
2. ecosystem-scoped identity, policy, resources, events, and workflows remain isolated;
3. authorized users/agents can operate inside one ecosystem without gaining access to another;
4. an explicit governed cross-ecosystem reference can be represented without granting authority;
5. ecosystem lifecycle transitions are auditable;
6. ABBA can coordinate within one ecosystem while remaining bounded by authority;
7. constitutional objects and contracts remain shared and unchanged;
8. failure in one ecosystem does not silently mutate another ecosystem;
9. runtime state can be inspected by ecosystem scope;
10. the design can support future Phase 22 interoperability without requiring a second object or identity system.

## 15. Non-goals

Phase 21 does not implement:

- universal cross-ecosystem exchange
- planetary coordination
- self-modifying constitutional law
- autonomous constitutional governance
- civilization-scale simulation
- unrestricted AI authority

Those belong to later phases and remain gated by evidence from the current substrate.
