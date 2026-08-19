# NAB — Operational State Model

## Principle

Operational state is time-bounded, sourced and evidence-linked.

## State families

- availability: available, reserved, unavailable, unknown;
- readiness: ready, degraded, maintenance, inspection_due, restricted;
- location: current position/place and freshness;
- occupancy: passenger/cargo/load utilization where applicable;
- capacity: available versus configured capacity;
- infrastructure: open, restricted, closed, congested, degraded;
- journey: planned, assigned, active, delayed, blocked, completed, cancelled;
- compliance: valid, expiring, expired, suspended, revoked, disputed, unknown;
- incident: detected, assessing, recovering, resolved, closed.

## Assertions

A state assertion should identify:

```text
subject
state
valid_from
observed_at
reported_at
source
confidence
authority_context
expires_at (when known)
evidence_refs
```

## Freshness

Real-time systems should not treat stale data as current. Consumers must be able to distinguish:

- current;
- recently observed;
- stale;
- unavailable;
- unknown.

## Event progression

State changes should be represented through existing OMNII event/lifecycle semantics so the history remains reconstructable.

## Automation

State changes may trigger workflows such as:

`inspection_due → notify → schedule → restrict if required`

`certificate_expired → eligibility_check → restrict affected operation`

`asset_unavailable → dispatch → fallback route → notify`

`infrastructure_closed → route_replan → journey update`

Automation must respect authority and safety constraints.
