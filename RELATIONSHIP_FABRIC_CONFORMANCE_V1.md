# Relationship Fabric Conformance V1

OMNII is the shared interoperability/runtime layer. Relationship identity and graph semantics are canonical contracts, not product-local inventions.

## Required invariants

```text
IDENTITY != RELATIONSHIP
RELATIONSHIP != AUTHORITY
RELATIONSHIP != CONSENT
TRUST != AUTHORITY
EVIDENCE != AUTHORITY
```

## Runtime responsibilities

OMNII must preserve canonical party references, relationship identifiers, provenance, lifecycle state and source boundaries while routing authorized reads/writes/events between systems.

NAIRE and NGIN are contextual systems on the Floor. A branch may request context from either or both; OMNII must not infer that the branch owns the underlying record.

## Integration operations

`relationship.create`
`relationship.read`
`relationship.update`
`relationship.transition`
`relationship.search`
`relationship.resolve`
`relationship.authorize`
`relationship.consent`
`relationship.events`
`relationship.verify`

Every operation must preserve caller identity, correlation id, requested scope, provenance and policy context.

## Data boundary

Adapters may retain references and derived views. They must not silently fork an authoritative relationship record. Stale, disputed or revoked source state must reopen evaluation.

## Conformance source

The authoritative shared contract is `B3C0M1NG/carbon_actual/FLOOR/RELATIONSHIP_FABRIC_V1.md`.
