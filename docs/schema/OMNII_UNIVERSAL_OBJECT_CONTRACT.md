# OMNII Universal Object Contract

The canonical object contract is the provider-neutral envelope for anything the ecosystem must know, govern, execute against, observe, exchange, preserve or reconstruct.

## Required core

`id`, `type`, `version`, `status`, `identity`, `provenance`, `authority`, `attributes`, `relationships`, `dependencies`, `capabilities`, `resources`, `timestamps`.

## Extended common-layer dimensions

Where applicable, objects also carry:

`state`, `intent`, `policy`, `trust`, `evidence`, `events`, `continuity`, `portability`, `settlement`, `liability`, `lifecycle`.

These are explicit surfaces rather than hidden provider metadata.

## Compatibility

- Provider-specific fields are preserved.
- Unknown object types remain classifiable without destruction of their original data.
- Schema evolution must preserve lineage and compatibility metadata.
- Domain extensions inherit the universal semantics; they do not redefine them.
- External identifiers are aliases/projections unless reconciled as canonical identity.

## Authority

The object contract records authority context, but the existence of an authority field does not grant authority. The applicable SEAL/authorization mechanism remains governing.

## Continuity is cross-cutting

`continuity` is a contract surface, not a competing primitive. Its implementation is bound to the existing ecosystem continuity chain:

`# / HASH → SEAL → ROOT → canonical state → EVENT / TRACEABILITY → VAULT → ASH → PHOENIX → ACTUAL / ATLAS → I/O`

The continuity surface should reference, where applicable, the canonical IDs for these existing primitives rather than create a second identity, storage, recovery or authority system.

Minimum continuity metadata for externally hosted or operationally critical objects:

- `canonical_object_id`
- `last_verified_state`
- `last_verified_at`
- `authority_context`
- `protected_evidence_refs`
- `critical_dependency_refs`
- `vault_refs`
- `event_refs`
- `recovery_path`
- `successor_or_replacement`
- `exit_handoff`

A provider account, session, credential, backup export or vendor recovery record may be referenced as evidence or implementation state, but never becomes the canonical continuity root solely by existing there.

## Portability

Portable state must preserve the semantic information necessary to reconstitute the object outside a provider where applicable: identity, semantics, relationships, authority, configuration, provenance, dependencies, lifecycle state, evidence, value/settlement position, obligations/liability and handoff information.
