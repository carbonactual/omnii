# OMNII UNIVERSAL EVENT SCHEMA

## Status
Phase 8 — Canonical Schema Materialization

## Purpose
Provide one universal event envelope for changes, observations, requests, decisions, executions, failures, communications, and other consequential occurrences across OMNII.

## Event Envelope
- `id`
- `type`
- `version`
- `occurred_at`
- `recorded_at`
- `subject`
- `actor`
- `source`
- `target` where applicable
- `action`
- `context`
- `payload`
- `authority`
- `provenance`
- `correlation_id`
- `causation_id`
- `classification`
- `sensitivity`
- `status`

## Event Families
- lifecycle
- identity
- authority
- relationship
- capability
- workflow
- execution
- communication
- integration
- resource
- value
- governance
- security
- anomaly
- recovery
- observation

## Event Rules
Events are immutable observations of occurrence. Corrections are new events referencing the original. Commands and events remain distinct: requesting an action is not evidence that the action occurred.

## Ordering
Events may be partially ordered through causation and correlation references. Consumers must not assume global ordering unless a stream explicitly guarantees it.

## Invariants
Every consequential event is attributable. Event provenance cannot be silently replaced. Unknown or unsupported event fields must not be mistaken for known semantics.
