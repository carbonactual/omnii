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

## Continuity

Objects that represent externally hosted or operationally critical services should preserve continuity metadata sufficient to identify last-known-good state, critical dependencies, recovery/owner escalation, replacement/exit paths and material evidence.
