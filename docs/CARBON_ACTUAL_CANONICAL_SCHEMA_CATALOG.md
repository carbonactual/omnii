# Carbon Actual Canonical Schema Catalog

**Status:** Canonical architecture contract
**Purpose:** Define the minimum reusable machine-readable objects from which Carbon Actual products and systems are composed.

## Design rule

Carbon Actual does not create a new object model for every product. Products compose canonical objects and domain extensions.

Every object has:

- `id`
- `type`
- `version`
- `status`
- `created_at`
- `updated_at`
- `provenance`
- `authority`
- `relationships`
- `permissions`
- `lifecycle`

Unknown fields must be preserved rather than silently discarded. Unknown object types enter `pending_evaluation` until classified.

## Canonical object families

### 1. Entity
Represents anything that can exist, participate, relate, act, own, owe, provide, receive, learn or become.

Core fields:

- identity reference
- entity class
- capabilities
- relationships
- authority
- lifecycle state
- provenance
- value position
- obligations

Entity classes are extensible and may include human, intelligence, organization, government, association, animal, machine, robot, physical asset, digital asset, place, service, network or future classes.

### 2. HASH
Represents an ecosystem identity relationship. For a human it associates the human with their governed intelligence environment without collapsing human and AI into one unbounded authority.

Required concepts:

- subject
- intelligence association
- human authority
- capabilities
- consent
- delegation
- provenance
- selective disclosure
- continuity
- revocation

### 3. SEAL
Represents human or authorized approval/attestation.

Must record who authorized what, under which authority, at what time, with what scope and whether it remains valid.

### 4. Intelligence
Represents an AI/model/agent/intelligence capability or instance.

Includes:

- model/provider provenance
- capability profile
- permissions
- tools
- memory boundaries
- objectives
- constraints
- evaluation
- safety state
- economic account where applicable

### 5. Capability
A reusable ability with a stable interface and replaceable implementations.

Examples: tutoring, translation, transport, routing, construction, payment, search, diagnosis, repair, communication, sourcing.

### 6. Swarm
A dynamic field of alternative implementations of a capability.

Includes members, evaluations, benchmarks, strengths, weaknesses, costs, reliability, compatibility, risks and selection policies.

### 7. Team
A purposeful composition of capabilities from one or more Swarms.

Includes objective, roles, members, authority, workflow, resources, constraints, expected outcome and measured outcome.

### 8. Relationship / Union
Represents connection, membership, ownership, dependency, collaboration, kinship, communication, association, delegation or other relationship.

Relationships are first-class objects because Union is a core operating principle.

### 9. Event / Pulse
An observed occurrence or feedback signal.

Pulse must distinguish:

- observation
- source
- confidence
- timestamp
- context
- effect
- evidence
- value contribution
- uncertainty

### 10. Value
Represents measured economic/operational consequence.

Value is multidimensional before aggregation. Inputs may include time, energy, labor, attention, data, computation, bandwidth, distance, materials, depreciation, maintenance, risk, capital, opportunity cost and outcome quality.

No aggregation formula is constitutional until mathematically and empirically validated.

### 11. Asset / Liability
Represents economic position, responsibility or obligation.

The Carbon Actual economic model permits inverted relationships, but every classification must retain:

- source
- owner/responsible party
- counterparty
- measurement basis
- confidence
- duration
- settlement state
- legal/regulatory context

### 12. Ledger Entry
A normalized record suitable for one or more logical ledgers.

Ledger implementations may be database-backed, distributed, blockchain-backed or hybrid.

Logical ledger families include identity, provenance, capability, rights, value, Pulse, contracts, settlement, asset/liability, security, lifecycle and governance.

### 13. Contract / Commitment
Represents an obligation, agreement, promise, service-level condition, authorization or enforceable relationship.

Must support parties, terms, scope, value, obligations, evidence, conditions, expiry, renewal, breach, dispute and settlement.

### 14. Resource
Represents human, digital, physical, financial, informational, computational, material or environmental resources.

### 15. Workflow
Represents ordered or conditional execution of capabilities.

Must support human steps, agent steps, automated steps, physical steps, approvals, exceptions, retries, compensation and audit.

### 16. Integration Adapter
A replaceable connector to an external provider or protocol.

Adapters must expose:

- source
- protocol
- capabilities
- permissions
- data exchanged
- authentication method
- rate/cost limits
- failure behavior
- provenance
- replacement alternatives

### 17. Product Branch
A composed deployable system built from canonical capabilities.

It contains:

- mission
- required capabilities
- selected Swarms
- Teams
- workflows
- integrations
- identity model
- economic model
- physical/digital requirements
- governance
- KPIs
- lifecycle

### 18. Credential / Certification
Evidence that an entity has demonstrated a capability under a defined assessment regime.

No HASH should claim a capability solely from self-description when certification is required by the relevant product, institution, law or governance policy.

### 19. Provenance
Records where an object, assertion, capability, dataset, credential or value claim came from and how it changed.

Provenance should support source traceability without exposing unnecessary private information.

### 20. Security Context
Represents risk, threat, anomaly, policy violation, quarantine state, response and recovery.

Ash may carry residual/security context; Phoenix represents authorized response/recovery workflows.

## Universal state model

Every canonical object should support lifecycle states appropriate to its type:

`draft → proposed → verified → active → suspended → deprecated → archived`

Additional domain states may extend this without changing the universal lifecycle contract.

## Universal provenance model

Every material claim should be classifiable as:

- source-derived
- attested
- measured
- inferred
- model-generated
- user-declared
- externally imported
- unknown

Confidence and evidence references accompany claims where meaningful.

## Authority model

Authority is separate from identity.

A HASH may identify a person while SEAL/authority determines whether that person can approve an operation. Delegation must be explicit, scoped, time-bounded where appropriate, auditable and revocable.

## Privacy model

Default principles:

- data minimization
- purpose limitation
- selective disclosure
- least privilege
- consent where applicable
- encryption
- provenance
- revocation
- portability
- no unnecessary surveillance

Public Atlas data is not equivalent to unrestricted access to Root or Vault.

## Economic state model

At minimum:

`contribution → Pulse → Value analysis → asset/liability classification → ledger representation → settlement/continuity`

Residuals are classified rather than discarded. Unknown states remain visible until evaluated.

## Composition rule

A product should be expressible as:

`Product = Objects + Capabilities + Swarms + Teams + Workflows + Integrations + Governance + Value model`

This is the machine-facing foundation of the Carbon Actual LEGO architecture.
