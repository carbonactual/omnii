# OMNII DEPENDENCY SCHEMA

## Status
Phase 8 — Canonical Schema Materialization

## Purpose
Materialize dependencies as explicit graph objects so composition, execution, deployment, recovery, and validation can reason about what is required, optional, replaceable, or blocking.

## Dependency Envelope
A dependency contains:
- `id`
- `source`
- `target`
- `dependency_type`
- `requirement`
- `strength`
- `version_constraint`
- `compatibility_constraint`
- `status`
- `resolution`
- `authority`
- `provenance`

## Dependency Types
- runtime
- data
- capability
- identity
- authority
- policy
- relationship
- resource
- integration
- workflow
- infrastructure
- human
- physical

## Strength
`required | conditional | optional | advisory`

## Resolution States
`unresolved → discovered → compatible → authorized → bound → active → degraded → failed → replaced`

## Rules
Dependencies must be resolvable to addressable objects or declared external contracts. Version compatibility must be explicit. A compatible dependency is not automatically authorized for use.

## Invariants
Circular dependencies must be detectable. Critical dependency failure must be observable. Replacement must preserve declared contract compatibility and produce a provenance trail.
