# OMNII RELATIONSHIP SCHEMA

## Status
Phase 8 — Canonical Schema Materialization

## Purpose
Define explicit, typed relationships between canonical objects so the ecosystem can represent identity, dependency, authority, composition, ownership, participation, communication, execution, value, and continuity without hidden coupling.

## Relationship Envelope
A relationship contains:
- `id`
- `type`
- `source`
- `target`
- `direction`
- `status`
- `effective_from`
- `effective_to` where applicable
- `authority`
- `provenance`
- `constraints`
- `metadata`

## Core Relationship Families
- identity / represents
- parent / child
- member / team
- belongs_to / contains
- depends_on / required_by
- enables / enabled_by
- composes / composed_of
- delegates / delegated_to
- authorizes / authorized_by
- communicates_with
- participates_in
- executes / executed_by
- owns / owned_by
- stewards / stewarded_by
- provides / consumes
- creates / created_by
- supersedes / superseded_by
- derived_from
- evidences / evidenced_by
- governs / governed_by
- related_to

## Semantics
Relationship type is canonical and versioned. Direction matters. Reciprocal relationships must not be inferred when doing so could change authority, ownership, dependency, or legal meaning.

## Invariants
A relationship is not merely a UI link. It is an addressable object with provenance and authority where consequential. Deleting an object must not silently erase relationship history.
