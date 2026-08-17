# Carbon Actual Universal Object Model

**Status:** Canonical design
**Ecosystem:** Carbon Actual

## Purpose

Define the smallest reusable object grammar from which humans, intelligence, organizations, governments, products, services, machines, contracts, physical systems and future entities can be represented without creating separate architectures.

## 1. Universal object

Every represented thing is an **Object** with a stable identity and a changing state.

```text
Object = Identity + Type + State + Capabilities + Relationships + Authority + Provenance + Lifecycle
```

An Object may be:

- Being
- Intelligence
- Human
- Organization
- Government/institution
- Agent
- Machine/robot
- Device
- Physical asset
- Digital asset
- Resource
- Capability
- Service
- Product
- Contract
- Obligation
- Event
- Location
- Knowledge/data
- Credential
- Opportunity
- Team
- Swarm
- Workflow
- Ledger record
- Future/unknown entity

These are semantic types, not separate infrastructure stacks.

## 2. Universal object envelope

Every object should be able to resolve to:

```text
id
identity/hash
kind/type
owner/authority
controller/delegate
state
capabilities
relationships
provenance
consent
permissions
location/context
value state
lifecycle state
security state
version
created/updated timestamps
parent/child/composition links
```

Only fields necessary for a context are disclosed.

## 3. Identity

HASH is the canonical ecosystem identity construct. Identity must support:

- human identity
- organizational identity
- machine identity
- intelligence identity
- delegated identity
- pseudonymous identity
- group identity
- future entity identity

Identity is not equivalent to public disclosure. The ecosystem separates **being identifiable by the system** from **being publicly identifiable**.

## 4. Authority

Authority is distinct from identity.

A subject may own, control, delegate, approve, operate, observe, administer or temporarily act for an object.

SEAL represents human approval/attestation where human authority is required.

Authority must be scoped, revocable, auditable and time/context bounded where appropriate.

## 5. Capability

A capability answers:

> What can this object reliably do?

Capability records include requirements, outputs, constraints, evidence, versions, performance and compatible contexts.

Capabilities are the atomic units used by Swarms, Teams and the Product Composer.

## 6. Relationship

Union represents relationships. A relationship can be:

- owns
- operates
- employs
- represents
- trusts
- collaborates
- depends_on
- supplies
- serves
- communicates_with
- belongs_to
- authorized_by
- composed_of
- located_at
- derived_from
- replaces
- competes_with
- learns_from
- contracted_with

Relationships have provenance, authority, lifecycle and context.

## 7. Event

An Event is an observed change or attempted change.

```text
Event = actor + action + target + context + time + evidence + authority + resource impact
```

Events feed Pulse. They do not automatically become public records.

## 8. Value state

Every economically relevant object/event may have a Value state:

- contribution
- consumption
- cost
- return
- risk
- obligation
- asset exposure
- liability exposure
- residual
- uncertainty

The Value Engine determines the appropriate interpretation; the object model does not hard-code one monetary unit.

## 9. Lifecycle

Continuum governs lifecycle transitions such as:

```text
proposed → verified → active → paused → transformed → maintained → retired → archived
```

Domain-specific states may be added without changing the universal lifecycle contract.

## 10. Provenance

Every important claim should be traceable to its source or evidence where lawful and technically possible.

Provenance answers:

- where did it originate?
- who/what asserted it?
- when?
- through which process?
- what evidence supports it?
- what transformations occurred?
- what confidence applies?

## 11. Privacy

The object model uses data minimization, selective disclosure and purpose limitation. A third party receives a capability/credential/attestation when that is sufficient instead of receiving the underlying personal record.

## 12. Composition

Objects may compose recursively.

```text
Object
 ├── components
 ├── capabilities
 ├── relationships
 ├── workflows
 └── outcomes
```

A vehicle can contain machines and software; a company can contain teams; a Team can contain humans and agents; a product can contain contracts and workflows.

Composition does not imply ownership.

## 13. Swarm and Team objects

A Swarm is a collection of capability candidates and evidence.

A Team is a context-specific composition of selected capabilities.

Both are ordinary universal objects with specialized behavior.

## 14. Unknown-state rule

If the ecosystem encounters something it cannot yet classify, it must create an **Unknown/Unclassified Object** rather than discard it.

The object can later be classified, linked, transformed or safely rejected.

This is the mechanism that allows future entity classes without constitutional redesign.

## 15. Product rule

A product is a composition of universal objects, capabilities, workflows, authority and economic relationships.

Therefore every Carbon Actual branch inherits the same object grammar.

## 16. Canonical distinction

```text
IDENTITY     → Who/what is it?
AUTHORITY    → Who may act for it?
CAPABILITY   → What can it do?
RELATIONSHIP → How is it connected?
EVENT        → What happened?
PROVENANCE   → Why do we know?
VALUE        → What consequence/resource position exists?
LIFECYCLE    → Where is it in time?
SECURITY     → What risk/state applies?
COMPOSITION  → What is it made of?
```

This is the universal grammar for Carbon Actual.
