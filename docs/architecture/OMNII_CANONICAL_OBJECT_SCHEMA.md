# OMNII CANONICAL OBJECT SCHEMA

## Purpose
Define the universal contract for identifiable objects participating in OMNII.

## Canonical Object
Every governed object MUST have an identity, type, lifecycle, provenance, authority context, and relationship surface.

## Core Fields
- `id`: stable object identifier
- `type`: canonical object type
- `version`: schema/object version
- `status`: lifecycle state
- `identity`: owning/representing identity references
- `provenance`: origin and evidence
- `authority`: authority and scope
- `attributes`: typed domain data
- `relationships`: references to relationship records
- `dependencies`: declared dependencies
- `capabilities`: available/granted capabilities
- `resources`: required or controlled resources
- `timestamps`: effective and recorded time
- `metadata`: non-canonical extensions

## Invariants
Identity and provenance cannot be silently replaced. Extensions cannot redefine canonical semantics. Relationships and dependencies remain externally auditable.

## Lifecycle
Proposed → Registered → Active → Modified/Suspended → Retired → Archived.

## Constitutional Mapping
Objects instantiate Being; Identity attributes them; Knowledge describes them; Motion changes them; Value records economic/contribution state; Trust governs confidence; Relationship connects them; Intent directs them; Execution changes state; Capability enables operations; Resource supplies capacity; Composition assembles them; Continuity preserves them; Integration connects boundaries.

## ABBA
ABBA may read, reason over, compose, route, and operate on objects only through declared capabilities and authority.
