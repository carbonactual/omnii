# OMNII Registry Conformance Hardening

**Status: CANONICAL runtime/database hardening contract**

The 28-registry catalog is the current executable constitutional registry foundation. Hardening makes the shared rules enforceable across runtime and persistence without creating new constitutional primitives.

## Conformance envelope

Each registry must preserve:

- stable `registry:*` identity;
- version and explicit lifecycle;
- canonical provenance source and catalog version;
- explicit semantic domain and canonical source;
- typed, unique expected relationship vocabulary;
- explicit open-world semantics;
- non-granting authority policy;
- explicit authority boundary policy;
- typed relationships with provenance requirements;
- continuity lineage and no silent deletion;
- dependency declarations that cannot self-reference.

## Boundary law

A registry may describe, index, evaluate or route governed state, but the registry itself cannot create constitutional authority. Authority remains explicit and attributable to the applicable authority/governance contract.

`capability != authority`

`evaluation != authority`

`registry membership != authority`

## Provenance law

Registry records remain lineage-bearing. A projection, index, derived record or product-specific representation must identify its source rather than becoming a silent alternate source of truth.

## Relationship law

Cross-registry relationships are typed. Relationship provenance is required. Product-specific relationship names must not silently redefine universal relationship semantics.

## Dependency law

Dependencies are distinct from relationships. Registry dependencies may not self-reference, and dependency changes remain versioned and attributable.

## Continuity law

Lifecycle transitions preserve lineage. Deprecation, migration, supersession and recovery are explicit states; disappearance is not treated as continuity.

## Enforcement

Runtime validation is exposed through `validateRegistryConformance` in `packages/omnii-runtime`. Database validation is exposed through `public.omnii_registry_hardening_report(text)` and operates over the single `public.omnii_registries` index.

The database report returns total, valid, invalid, completeness and per-registry rule failures. A complete healthy catalog is exactly 28 valid registries.

## Security note

`public.omnii_civilization_domains` currently has Row Level Security disabled. This remains an explicit security finding because enabling RLS without deliberate policies can block intended access. It requires policy design before activation rather than an automatic migration.
