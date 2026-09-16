# Carbon Actual Ecosystem-Wide Common Capability & Product Conformance Design

**Status:** DESIGN — approved for specification and review
**Effective date:** 2026-09-16
**Scope:** Ecosystem-wide reusable capability, product composition, interaction/handoff, provider replacement, product boundary and repository conformance

## 1. Purpose

Carbon Actual must behave as one composable ecosystem rather than a collection of independently evolving applications. This design strengthens the relationship between the frozen OMNII Universal Capability Ontology, the Common Layer, the Universal Capability Registry, the Universal Composition Engine, the Ecosystem Interaction & Handoff Protocol, ABBA orchestration, and downstream products.

The goal is not to consolidate repositories or flatten product identities. The goal is to make the shared semantics, reusable capabilities, ownership boundaries, handoffs, provider adapters, and product compositions explicit and machine-verifiable.

The governing principle is:

> **Build once → strengthen once → compose many times → configure locally → deploy/handoff cleanly → feed validated improvements back into the shared fabric.**

## 2. Existing canonical foundations

This design extends, rather than replaces:

- `CARBON_ACTUAL_UNIVERSAL_CAPABILITY_ONTOLOGY.md`
- `OMNII_COMMON_LAYER_CANONICAL_1_0.md`
- `OMNII_UNIVERSAL_CAPABILITY_REGISTRY.md`
- `CARBON_ACTUAL_UNIVERSAL_COMPOSITION_ENGINE.md`
- `OMNII_CAPABILITY_ADAPTER_CONTRACT.md`
- `OMNII_ECOSYSTEM_INTERACTION_HANDOFF_PROTOCOL.md`
- `CARBON_ACTUAL_PRODUCT_BLUEPRINT.md`
- `OMNII_INSTITUTIONAL_COMPOSITION_INDEX.md`
- Universal Event & Interaction ontology and its extensions
- Canonical authority, projection, economic/value, Ash/Phoenix and runtime conformance boundaries

No competing registry, ontology, constitution, authority system or orchestration system is introduced.

## 3. Architectural layers

The ecosystem is treated as five interoperating layers:

```text
CONSTITUTIONAL LAYER
OMNII constitutional/runtime substrate

COMMON CAPABILITY LAYER
Universal denominators + ecosystem denominators + canonical capability registry

COMPOSITION / ORCHESTRATION LAYER
Universal Composition Engine + ABBA + SWIRM/TEAM/MISSION + workflow

PRODUCT / DOMAIN LAYER
OMNI, SPOTIST, DESK, RITES, NGIN, NAIRE, InstituteGPT, NASC, BUNK, Logistico, etc.

PROVIDER / WORLD LAYER
Human execution + AI/agents + physical systems + external providers + protocols + institutions
```

Products are bounded compositions. Providers are replaceable implementations. External protocols are transport/adapter mechanisms, not constitutional semantics.

## 4. Canonical product roles

The following roles are treated as canonical boundaries for composition purposes. Exact repository placement remains an implementation/repository-estate concern and must not be inferred from product names alone.

| Role | Canonical responsibility |
|---|---|
| OMNII | constitutional/runtime semantics, canonical state and shared composition substrate |
| Universal Capability Fabric | registered reusable capability contracts and discovery |
| ABBA | master intelligence, reasoning, orchestration, routing, monitoring and escalation |
| HAPI | human capability/interaction boundary and human-authority entry surface |
| HAPI World | associated AI/agent operating environment and participation context |
| SPOTIST | universal SEEK capability: discovery, finding, matching, tracing, qualification, verification and monitored seeks |
| OMNI economic platform | economic participation composition: trade, markets, investment, exchange and related economic workflows |
| OMNI operating/integration surface | runtime/routing/provider-adapter/integration capabilities where that existing product remains distinct until repository-boundary reconciliation |
| DESK | participant workspace/dashboard composition surface; it exposes capabilities rather than owning their universal semantics |
| I/O | movement, interaction transition, ledger/value circulation and settlement infrastructure |
| ROOT | durable canonical verified identity/state context |
| ACTUAL | current operational reality/state representation |
| ATLAS | governed discoverable/public projection; never competing source of truth |
| NGIN | organization/government/institution/association-side operating composition |
| NAIRE | human-side progression/value/economic composition |
| RITES | human continuity/lifecycle/relationship composition |
| InstituteGPT | learning/teaching/competency composition |
| Knowledge substrate | shared information/knowledge/data/research substrate |

Where a role is currently represented by multiple repositories or historical names, history and compatibility identifiers remain provenance-bearing until an explicit repository-estate decision is made.

## 5. OMNI / DESK naming collision policy

There is currently a boundary collision between:

1. the former `carbonactual/desk` repository, now presenting itself as the OMNI economic participation platform; and
2. `carbonactual/omni`, which currently presents itself as an AI operating/integration surface.

This design does **not** silently rename either repository.

Before further build or repository rename actions:

- preserve both repositories and their histories;
- record the semantic distinction in a canonical reconciliation;
- map their capabilities and dependencies against the common registry;
- identify overlapping responsibilities;
- determine whether the operating/integration surface receives a distinct canonical product name or becomes an explicitly bounded OMNI operating layer;
- preserve compatibility identifiers until migration is proven safe;
- avoid creating a third competing OMNI concept.

The outcome must be one coherent public/product topology, not duplicate OMNI identities.

## 6. Common capability contract

Every reusable capability must have one canonical contract and one accountable owner.

Minimum manifest:

```yaml
id: stable-capability-id
name: human-readable-name
version: semver
status: canonical|candidate|experimental|deprecated
family: universal-family
purpose: capability-purpose
inputs: []
outputs: []
entities: []
preconditions: []
authority_requirements: []
permissions: []
privacy_classes: []
data_classes: []
policy_hooks: []
events: []
pulse_metrics: []
value_metrics: []
dependencies: []
providers: []
adapters: []
replacement: {}
health_contract: {}
provenance: {}
lifecycle: {}
```

A capability is semantically distinct from its implementations/providers.

## 7. Capability ownership rules

A capability is reusable when it has stable semantics across unrelated products/domains.

A capability owner:

- maintains the canonical semantic contract;
- maintains conformance tests and compatibility rules;
- accepts or rejects proposed extensions through governance;
- exposes replacement/provider rules;
- records provenance and maturity;
- does not grant authority merely by owning the capability.

A product may expose, specialize or compose a capability without becoming the owner of the underlying universal semantics.

## 8. Capability inheritance

Capability inheritance must follow:

```text
canonical capability
→ bounded specialization
→ domain configuration
→ product composition
```

A specialization:

- declares its parent capability;
- inherits semantic invariants;
- may add domain constraints;
- must not silently redefine inherited semantics;
- must retain provenance to the parent contract;
- must define whether its extensions are local or candidates for promotion back to the shared fabric.

## 9. Product composition contract

Every product must expose a machine-readable composition manifest containing:

```yaml
product_id: stable-product-id
product_name: display-name
purpose: product-purpose
entities: []
domain_capabilities: []
shared_capabilities: []
consumed_capabilities: []
provided_capabilities: []
workflows: []
interfaces: []
providers: []
adapters: []
authority_model: {}
data_boundaries: {}
evidence_model: {}
economic_model: {}
pulse_model: {}
continuity_model: {}
recovery_model: {}
exit_handoff: {}
compatibility_identifiers: []
```

Products must declare which capabilities they consume and which reusable capabilities they provide back to the ecosystem.

## 10. Composition decision algorithm

Before introducing a new feature or primitive:

```text
REQUEST / INTENT
→ SEARCH COMMON REGISTRY
→ IDENTIFY EXISTING CAPABILITY
→ CHECK SEMANTIC FIT
→ COMPOSE IF FIT
→ CONFIGURE IF DOMAIN-SPECIFIC
→ SPECIALIZE IF NECESSARY WITH EXPLICIT PARENT
→ PROMOTE TO UNIVERSAL ONLY IF REUSED ACROSS DOMAINS
→ REQUIRE ARCHITECTURE AMENDMENT ONLY FOR A NEW CONSTITUTIONAL LAYER
```

This prevents one-off primitives from proliferating in products.

## 11. Interaction and handoff contract

All products, services, capabilities, agents and external adapters use the canonical interaction grammar where applicable:

```text
INTENT
→ DISCOVERY
→ CONTEXT / ELIGIBILITY
→ AUTHORITY / AUTHORIZATION
→ REQUEST / WORKFLOW
→ EXECUTION
→ OBSERVATION / EVENT
→ EVIDENCE
→ RESULT / OUTCOME
→ HANDOFF / SETTLEMENT where applicable
→ PULSE / VALUE
→ CONTINUITY / NEXT ACTION
```

A handoff is a first-class transition, not message forwarding.

A handoff carries, where relevant:

- sender/receiver;
- responsibility;
- context;
- authority scope;
- evidence;
- documents;
- custody;
- state;
- unresolved questions;
- deadlines;
- dependencies;
- obligations;
- acceptance/rejection/escalation;
- next owner.

## 12. Cross-product interaction rule

Products must be able to hand work to another product/capability without forcing the receiving side to understand the sender's private domain model.

The boundary is:

```text
SOURCE PRODUCT
→ canonical interaction/handoff
→ receiving capability contract
→ target product/domain
```

Sender-specific objects may be referenced through canonical identifiers and representations, but the receiver must receive sufficient canonical context to operate without duplicating the sender's private state model.

## 13. Seeker/matcher/discovery fabric

Discovery is a shared capability family.

SPOTIST is a reusable implementation/composition of the broader discovery/matching family, with its canonical specialization as SEEK.

Other products can consume discovery without becoming SPOTIST.

Discovery results must preserve:

- exact/strong/possible match distinctions;
- lead status;
- provenance;
- evidence;
- confidence;
- contradiction;
- freshness;
- visibility/access constraints;
- authority requirements.

## 14. Communication and interaction reuse

Products must consume the common communication/interaction fabric for:

- messages;
- notifications;
- invitations;
- conversations;
- calls;
- meetings;
- documents;
- collaboration;
- decisions;
- tasks;
- feedback;
- handoffs;
- escalation.

Product-specific UI may differ, but interaction semantics remain canonical.

## 15. Provider and adapter reuse

Products depend on capability contracts, not directly on provider-specific semantics wherever practical.

Adapters translate:

```text
external provider/protocol
→ canonical capability
```

Rules:

- provider identifiers never become canonical identifiers;
- provider failure must be explicit;
- consequential non-idempotent operations require idempotency protection;
- provider availability never implies authority;
- a replacement provider must satisfy the existing contract or trigger an explicit version transition;
- external providers receive minimum necessary data.

## 16. Identity, authority and representation boundaries

No product may create competing universal identity or authority semantics.

The ecosystem retains the distinctions:

```text
identity ≠ representation
identity ≠ role
role ≠ authority
capability ≠ authority
recommendation ≠ decision
 decision ≠ execution authority
result ≠ evidence of truth by itself
evidence ≠ credential
credential ≠ license
attendance ≠ consent to publication
communication ≠ authorization
```

HAPI/ROOT/SEAL and applicable external authorities remain responsible for the appropriate identity/authority boundary.

## 17. Data, evidence and provenance

Every consequential cross-product operation must retain enough provenance to reconstruct:

```text
actor
→ authority
→ intent
→ policy
→ capability
→ provider
→ execution
→ event/state transition
→ evidence
→ result/outcome
→ handoff
→ value/pulse
```

Source records and derived representations remain distinguishable.

Summaries, translations, AI interpretations and projections cannot silently replace authoritative source evidence.

## 18. Value, Pulse and I/O interaction

Products must not invent parallel value or settlement semantics.

Use:

- **Value** for underlying recognized value semantics;
- **Pulse** for feedback/observable activity signals;
- **I/O** for movement, interaction transitions and applicable ledger/settlement pathways;
- applicable economic domains for trade, market, investment and transaction semantics.

A product may measure local activity, but it must state whether a measurement is Pulse, Value, economic transaction data, operational telemetry or another semantic class.

## 19. Human/AI/physical execution

Products must declare whether a workflow requires:

- human execution;
- AI execution;
- agent execution;
- machine/device execution;
- physical facilities;
- physical logistics;
- hybrid execution.

Automation should not silently replace required human authority or physical-world work.

## 20. Continuity, failure and recovery

Every reusable capability and product must define:

- unavailable provider;
- timeout;
- stale data;
- duplicate input/event;
- partial completion;
- failed handoff;
- expired authority;
- contradictory evidence;
- rollback/compensation where appropriate;
- recovery owner;
- retained failure history;
- migration/exit path.

Failures must remain attributable and cannot be rewritten into success by assumption.

Ash/Phoenix remain ecosystem-level residue/defence/recovery primitives rather than product-specific substitutes.

## 21. Product exit and portability

A product must be detachable from shared infrastructure without destroying canonical user/entity records.

Each deployable composition must have an exit package containing:

- capability manifest;
- data schema/mapping;
- integration inventory;
- authority dependencies;
- event/provenance dependencies;
- outstanding obligations;
- active workflows;
- user-owned state/export path;
- replacement/handoff targets;
- compatibility notes.

Products do not own the universal substrate merely because they consume it.

## 22. Product-specific vs reusable determination

A capability remains product/domain-specific when its semantics are genuinely bounded to one domain or depend on a domain law that should not be exported universally.

A capability becomes a candidate for universal promotion when:

1. at least two unrelated domains independently need the same semantic operation;
2. the operation can be represented using existing universal objects/relationships;
3. the operation has a stable interface;
4. the semantics do not depend on one product's private business model;
5. extracting it removes duplication without hiding domain-specific law.

Universal promotion requires registry ownership and conformance coverage.

## 23. Common interaction examples

### SPOTIST + DESK

`user intent → DESK presentation → SPOTIST seek → discovery → evidence → result → saved/active seek → alert`

### SPOTIST + OMNI

`economic intent → SPOTIST discovery → qualified opportunity/supply → OMNI economic workflow → Trade/Markets/Investment as applicable → I/O → outcome`

### SPOTIST + ABBA

`natural-language mission → ABBA decomposition → SPOTIST seek(s) → result set → ABBA orchestration → authorized handoff`

### DESK + ecosystem capabilities

`participant context → capability selection → workflow/task/communication → outcome → DESK projection`

DESK shows the state; it does not become the owner of every underlying capability.

### NGIN / NAIRE / RITES

These products compose the same identity, relationship, communication, workflow, evidence, capability, value, continuity and handoff primitives while applying their own bounded domain semantics.

## 24. Machine-verifiable conformance

Conformance tooling should eventually validate:

1. every referenced capability exists in the canonical registry;
2. every capability has an owner and maturity;
3. every specialization declares its parent;
4. no product claims constitutional ownership;
5. no product defines duplicate identity/authority/ledger/registry primitives;
6. all cross-product handoffs reference canonical contracts;
7. provider dependencies are adapterized or explicitly justified;
8. external identifiers remain linked identifiers rather than canonical identities;
9. authority requirements are declared;
10. consequential workflows have evidence/provenance paths;
11. value-related flows identify the appropriate I/O/economic boundary;
12. product manifests do not contradict frozen architecture;
13. deprecated capabilities remain provenance-bearing;
14. every product exposes an exit/handoff definition.

## 25. Repository-estate reconciliation

Repository names, historical directories and implementation locations do not define canonical semantics.

The reconciliation process must classify each artifact as:

- canonical semantic source;
- shared reusable implementation;
- product composition;
- adapter/provider;
- historical source;
- compatibility identifier;
- duplicate candidate;
- deprecated material;
- unknown/unresolved.

No repository is deleted, archived, merged or retired merely because it is redundant-looking. Evidence and authority must establish the correct disposition.

## 26. Strengthening loop

For every build:

```text
REQUEST
→ AUDIT EXISTING FABRIC
→ IDENTIFY REUSE
→ COMPOSE
→ IMPLEMENT
→ TEST
→ OBSERVE
→ MEASURE PULSE/VALUE
→ DETECT DUPLICATION/GAPS
→ EXTRACT REUSABLE IMPROVEMENTS
→ REGISTER/CONFORM
→ HANDOFF/DEPLOY
```

This is the primary mechanism for making the ecosystem stronger as products are built rather than allowing each product to become a separate architecture.

## 27. Out of scope for this design

This design does not itself:

- rename the two OMNI repositories;
- merge repositories;
- delete or archive product history;
- deploy new financial rails;
- create a new universal identity system;
- create a new universal ledger;
- create a second ABBA;
- implement every capability immediately.

Those require separate bounded plans after the composition/conformance design is accepted.

## 28. Success criteria

The ecosystem-wide hardening is successful when a new product can be assembled by selecting canonical capabilities and domain modules, when a capability can be improved once and consumed by multiple products, when products can exchange work through the same interaction/handoff grammar, when providers can be replaced without semantic rewrites, and when repository/product changes can be reconciled without silently changing constitutional meaning.

The final test is:

> **Can a new domain enter the ecosystem by composing what already exists, while leaving behind reusable improvements, without creating a competing primitive, identity, authority, ontology, registry, orchestration layer, or economic constitution?**
