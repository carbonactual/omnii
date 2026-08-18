# OMNII UNIVERSAL EVENT LIFECYCLE

## Purpose
Define a universal lifecycle for events representing meaningful occurrences, requests, state changes, decisions, executions, and external signals.

## Event Contract
An event MUST identify event ID, type, source, subject, timestamp/effective time, payload, provenance, correlation/causation context, authority context, and lifecycle status.

## Lifecycle
Observed/Created → Validated → Accepted → Routed → Processed → Applied → Acknowledged → Archived.

Failure states include Rejected, Dead-lettered, Cancelled, and Escalated.

## Invariants
Events are immutable records of occurrence. State may change through events, but historical event meaning is not silently rewritten. Processing is attributable and auditable.

## Relationships
Events carry Motion, trigger Intent or Execution, update Knowledge, affect Value and Trust, and propagate through Relationships and Integrations.

## ABBA
ABBA may consume, classify, route, correlate, prioritize, and orchestrate event handling subject to authority and governance.
