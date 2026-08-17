# Carbon Actual Time, Context and State Contract

**Status:** Canonical kernel contract

Carbon Actual is continuously changing, but it is not ungoverned. Its current configuration is a derived state of objects, events, relationships, value, obligations, context and time.

## 1. Time is first-class

Every material event and state transition should have temporal meaning.

Support:

- instant
- interval
- duration
- sequence
- recurrence
- deadline
- validity window
- effective time
- observation time
- publication time
- settlement time
- expiry

The distinction between **when something happened** and **when it became known** must be preserved.

## 2. Context is first-class

A claim, capability, authority or value is never assumed to be universally valid merely because it is valid somewhere.

Context can include:

- actor/participant
- role
- location/environment
- jurisdiction
- organization
- relationship
- resource conditions
- system state
- economic conditions
- security state
- objective
- policy
- time window
- relevant dependencies

## 3. State

State is a snapshot derived from authoritative records and current context.

```text
OBJECTS + RELATIONSHIPS + EVENTS + PULSE + VALUE + TIME + CONTEXT + POLICY
                              ↓
                         DERIVED STATE
```

A derived state must not overwrite the historical events from which it was calculated.

## 4. State transitions

A state transition records:

- previous state
- new state
- triggering event
- actor/agent/system
- authority
- effective time
- evidence
- reason
- resulting Pulse
- resulting Value where applicable

## 5. Temporal truth

Carbon Actual distinguishes:

- **observed truth:** what was recorded at observation time
- **current truth:** the latest accepted state
- **historical truth:** what was accepted at a previous point in time
- **projected state:** forecast or simulation
- **intended state:** declared future objective

These must never be silently conflated.

## 6. Contextual capability

Capability is evaluated in context.

A capability can be:

`available + authorized + suitable`

or:

`available + unauthorized`

`authorized + unavailable`

`available + authorized + unsuitable`

This distinction prevents the system from treating possession of a capability as permission or suitability to use it.

## 7. Temporal relationships

Relationships may be:

- permanent
- temporary
- recurring
- conditional
- historical
- prospective
- suspended

The relationship record must preserve effective and expiry information where applicable.

## 8. Contracts and commitments

Contracts must support effective dates, deadlines, milestones, conditions, renewals, suspension, breach, dispute and settlement.

## 9. Maintenance and continuity

Resources and capabilities can degrade over time.

The model therefore supports:

- condition
- age
- utilization
- depreciation
- maintenance history
- maintenance requirement
- expected life
- replacement requirement
- availability

This connects naturally to Spare and to the Value engine.

## 10. Becoming

Becoming is not simply a recommendation feed. It is a contextual curation process that considers:

`current state + capabilities + constraints + relationships + opportunities + intent + future objectives`

and produces possible next actions.

A recommendation does not become an obligation without appropriate authority or consent.

## 11. Simulation

The same state model should support simulation and experimentation.

A simulation must be explicitly marked as simulated and must never contaminate observed/historical truth.

This enables HAPI World and other environments to test strategies before real-world execution.

## 12. Reversibility

Where an action is reversible, the workflow should retain the information required to reverse or compensate it. Irreversible actions require stronger authority and safety checks.

## 13. State reconstruction

Given authoritative history and a defined point in time, the system should be able to reconstruct the applicable state subject to retained data and lawful privacy constraints.

## 14. Compression principle

Time, context and state are not separate product systems. They are universal dimensions applied to canonical objects, relationships, events, capabilities, contracts and value.
