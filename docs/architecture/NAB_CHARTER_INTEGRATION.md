# NAB — Charter Integration & Automation Contract

## Contract

```text
NAB → trusted movement knowledge
CHARTER → movement execution
```

Charter may query NAB before and during movement execution for registry, capability, availability, location, state, compliance, documents, route context and evidence.

## Automation workflows

### Pre-movement eligibility

`intent → NAB lookup → identity/document check → capability check → compliance check → readiness → Charter plan`

### Live movement

`journey active → NAB state updates → detect disruption → Charter replan/recovery → record event`

### Maintenance

`usage/telemetry → threshold → NAB maintenance state → Fleet workflow → Charter eligibility update`

### Certification

`expiry approaching → NAB alert → responsible authority/operator workflow → renewed/expired state`

### Incident

`signal → NAB incident record → evidence preservation → Charter recovery → outcome → biography update`

### Infrastructure disruption

`closure/congestion → NAB state → affected journeys → Charter fallback routing → notifications`

## Real-time inputs

NAB may integrate approved feeds from:

- government registries;
- transport authorities;
- airports and ports;
- infrastructure operators;
- fleet systems;
- vehicle/asset telemetry;
- maintenance/MRO systems;
- weather or environmental services;
- emergency systems;
- external operators.

Each feed must retain provider identity, timestamp, freshness and evidence/provenance.

## Automation boundary

Automation may recommend, block or route a workflow only according to explicit authority and policy. A data feed alone is not legal authority.

## Efficiency principle

Prefer one NAB lookup that supplies reusable authoritative context over multiple disconnected product-specific copies.

## Product extraction

Specialized products such as National Auto Biography can consume the same NAB substrate and expose jurisdiction-specific workflows without changing the Charter movement contract.
