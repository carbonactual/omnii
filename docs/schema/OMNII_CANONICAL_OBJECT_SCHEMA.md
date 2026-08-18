# OMNII CANONICAL OBJECT SCHEMA

## Status
Phase 8 — Canonical Schema Materialization

## Purpose
Materialize the universal shape shared by every canonical OMNII object without collapsing domain-specific semantics into one rigid payload.

## Required Envelope
Every canonical object has:
- `id` — globally addressable stable identifier
- `type` — canonical object type
- `version` — schema and object version
- `status` — lifecycle state
- `name` — human-readable label where applicable
- `data` — typed domain payload
- `relationships` — explicit links to other objects
- `dependencies` — required upstream objects/capabilities
- `authority` — authority and delegation references
- `provenance` — origin and evidence references
- `timestamps` — creation, update, effective and expiry times where applicable
- `extensions` — namespaced extensions that do not mutate canonical semantics

## Lifecycle
`draft → proposed → verified → active → suspended/restricted → retired/deprecated`

## Identity Rules
Identity is stable across versions. Versioning changes representation or semantics without silently creating a new identity. Replacement must be explicitly related to the superseded object.

## Authority Rules
Capability, ownership, authorship, and authority are distinct fields and relationships. Presence in the registry never implies authority to act.

## Provenance Rules
Canonical objects preserve source, actor, authority, transformation, timestamp, and evidence references for consequential claims.

## Extension Rules
Extensions are namespaced, versioned, discoverable, and non-destructive. A consumer that does not understand an extension must preserve it or explicitly report loss.

## Invariants
No domain object may bypass the canonical envelope when participating in the universal object graph. Domain schemas may add constraints but may not contradict constitutional invariants.
