# RESOURCE

**Status: CANONICAL CONSTITUTIONAL KERNEL**

## Purpose
Resource governs things that capabilities consume, control, allocate, produce, transform, preserve or make available.

## Canonical Objects
- Resource
- Asset
- Material
- Data
- Knowledge artifact
- Time
- Attention
- Energy
- Money/value unit
- Infrastructure
- Tool
- Capacity
- Human labor
- Agent capacity

## Invariants
1. A governed resource has identity, state, provenance and ownership/custody semantics where applicable.
2. Availability is distinct from authority to use.
3. Allocation, custody and transformation are auditable.
4. Resource state transitions preserve provenance and required continuity.
5. Scarce resources require explicit allocation rules.
6. Resource use cannot bypass the authority required by its controlling relationship.

## Inputs
Resource identity, state, quantity/capacity, ownership/custody, constraints, demand, authorization and context.

## Outputs
Availability, allocation, reservation, consumption, transformation, production, release or depletion record.

## Lifecycle
`Discovered → Registered → Available → Reserved → Allocated → Consumed/Transformed/Produced → Released/Depleted → Archived`

## Dependencies and Relationships
Resources are described through Knowledge, participate in Value, are controlled through Identity/Relationship, accessed through Capability, consumed by Execution and assembled through Composition.

## Composition Rules
Resources may be pooled, partitioned, transformed, leased, allocated or composed. Composite resources retain constituent provenance, custody and allocation constraints.

## Implementation Contract
A resource record must expose stable identity/type/version, state, quantity or capacity where applicable, custody/ownership, constraints, availability, provenance, allocation history and relevant value relationships. Resource stores must not become a second authority system.

## ABBA
ABBA may discover, match, reserve, allocate, optimize and monitor resources within delegated authority while preserving ownership, custody, scarcity and audit semantics.
