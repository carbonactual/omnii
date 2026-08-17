# Carbon Actual Universal Event & Lifecycle Contract

**Status:** Canonical kernel contract

The ecosystem must model events consistently across every branch. Products should specialize event meaning rather than invent independent lifecycle machinery.

## Event

An Event is an occurrence, attempted occurrence, state transition, observation, communication, transaction or other meaningful change.

An event may be caused by a human, intelligence, software, hardware, organization, environment or external system.

## Event envelope

Where applicable, preserve:

- event identity
- event type
- source
- participants
- target/object
- time
- context
- authority
- correlation/causation references
- provenance
- integrity
- privacy class
- resulting state
- Pulse
- Value impact

## Universal lifecycle

```text
DISCOVERED
 ↓
PROPOSED
 ↓
AUTHORIZED
 ↓
SCHEDULED
 ↓
EXECUTING
 ↓
OBSERVED
 ↓
EVALUATED
 ↓
SETTLED
 ↓
LEARNED
```

Not every event uses every state.

## Exceptional states

Any lifecycle may additionally require:

- blocked
- denied
- paused
- cancelled
- expired
- failed
- disputed
- compensated
- reversed
- recovered
- escalated

## Idempotency

Where repeated delivery is possible, event handlers should distinguish duplicate delivery from a genuinely new event.

## Correlation

Related events should be linkable into a workflow, transaction, case, incident, contract or other process without requiring a product-specific event graph.

## Causation

Where determinable, events should identify the event or condition that caused them.

Causation must not be inferred as legal responsibility without the applicable responsibility analysis.

## Case

A Case is a coordinated container for events, participants, evidence, tasks, decisions and outcomes around a matter requiring resolution.

This can support government cases, support requests, emergency incidents, contracts, disputes, projects and personal workflows using one primitive.

## Task

A Task is an actionable unit required to progress an outcome or workflow.

Tasks may be assigned to humans, intelligences, software, hardware or teams according to capability, authority and suitability.

## Approval

Approval is a governed state transition by an authorized participant. It is distinct from acknowledgement, recommendation and observation.

## Auditability

Material state transitions should retain sufficient evidence to reconstruct who/what caused the transition and under what authority, subject to privacy and retention policy.

## Event sourcing principle

Where appropriate, current state should be derived from authoritative events rather than destroying the history needed to explain how the state arose.

This does not require every implementation to use a pure event-sourcing database architecture; it is a semantic contract.

## Universal rule

Products reuse Event, Case, Task, Approval and lifecycle primitives. Domain-specific states are extensions, not replacements for the universal lifecycle.
