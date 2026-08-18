# OMNII SCHEMA REGISTRY

## Status
Phase 8 — Canonical Schema Materialization

## Purpose
Provide the authoritative discovery and compatibility boundary for canonical object, relationship, dependency, event, and domain schemas.

## Registry Record
Each schema registration contains:
- schema identifier
- schema family
- version
- status
- canonical URI/path
- owning authority
- compatibility policy
- validation rules
- provenance
- effective date
- deprecation/supersession reference

## Schema Families
`object | relationship | dependency | event | capability | workflow | integration | domain`

## Lifecycle
`candidate → registered → active → deprecated → retired`

## Registry Rules
Only registered schemas may be declared canonical. Versions are immutable once active. Breaking changes require a new version and an explicit migration/compatibility statement.

## Resolution
Consumers resolve schemas by identifier and compatible version rather than by filename or implementation-specific location.

## Validation
The registry supports structural validation, semantic constraints, compatibility checks, lifecycle checks, and provenance checks.

## Invariants
The registry is a source of schema authority, not business authority. Registration does not authorize an actor to create, modify, own, or execute the represented objects.
