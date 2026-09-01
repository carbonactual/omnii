# CHARTER Canonical Journey Runtime Design

## Goal

Turn the approved CHARTER transport architecture into a durable executable journey model that supports the full movement lifecycle while preserving canonical ownership of identity, vehicles, value, authority, proof and intelligence in their respective OMNII/Carbon Actual layers.

## Scope

This design covers the first implementation slice of the Transport/Mobility vertical: the canonical Journey runtime and its lifecycle/event/evidence contract. It does not attempt to build every transport mode or every external integration in the same slice.

## Architectural position

CHARTER is the universal movement layer. It owns journey composition, movement capability, routing/dispatch/execution and recovery semantics. Specialized products such as Ride, Along, Hitch, Pilgrim, Logistico, Fleet, Recovery and institutional/specialist movement compose bounded experiences over CHARTER rather than creating competing journey primitives.

NAB supplies trusted vehicle/movement knowledge; Fleet owns organizational asset operations; HAPI owns human/agent identity, capability and qualification; IO owns value movement; ABBA provides ecosystem intelligence/orchestration; OMNII supplies canonical object, relationship, authority and evidence substrate.

## Canonical Journey object

A Journey is distinct from a booking, vehicle, route, operator, payment or proof record. A journey references those objects rather than absorbing their canonical ownership.

Minimum journey context:

- journey_id
- request
- origin
- destination
- stops
- route/legs
- movement mode
- passenger/cargo/purpose context
- vehicle/asset reference
- operator/person/organization reference
- capability references
- schedule
- eligibility/readiness
- reservation/assignment references
- live operational state
- incident/exception state
- proof/evidence references
- value reference (not value ledger ownership)
- pulse/performance reference
- provenance and authority context

## Journey lifecycle

Primary lifecycle:

`intent → discovery → eligibility → availability → reservation → assignment → preparation → pickup/boarding → active movement → handoff → exception/recovery → completion → evidence → reconciliation → closed`

Controlled terminal/exception states:

`cancelled`, `denied`, `delayed`, `disrupted`, `incident`, `abandoned`, `recovery`.

State transitions must be explicit, attributable and persisted as events. Invalid transitions must be rejected.

## Events

Every material transition produces an append-only journey event containing:

- event id
- journey id
- event type
- actor/source
- timestamp
- prior state
- resulting state
- payload/attributes
- provenance
- authority/policy reference where required
- evidence references where available

Examples include reservation, assignment, boarding, departure, location update, handoff, delay, substitution, route deviation, breakdown, incident, recovery dispatch, completion and closure.

## Evidence

Transport state may reference position, time, capacity/load, vehicle condition, operator qualification, infrastructure state, route/waypoint state, connectivity state, inspection/maintenance, permits/compliance, incident/recovery, service commitments, custody/handoff, registry provenance and authority evidence.

Evidence storage is referenced through the canonical Vault/evidence substrate; CHARTER does not create a competing universal evidence store.

## Recovery and service integrity

The runtime must support explicit handling for post-acceptance renegotiation, vehicle/spec mismatch, unsafe/unfit condition, identity mismatch, unauthorized substitution, abandonment, coercive/non-transport exchange demands, route/destination deviation, capability loss, delay/cancellation, breakdown and recovery.

Recovery is a first-class workflow and may recompose a journey using available capabilities without destroying its history.

## Offline/resilience boundary

The design must allow a later offline-first implementation: locally retained signed journey references, event buffering/store-and-forward and reconciliation after connectivity returns. Connectivity state is part of operational evidence. The first runtime slice may use the existing persistence abstraction and explicit event semantics without claiming full offline production support.

## Multimodal boundary

A Journey may have multiple ordered legs and explicit handoffs. Future trip composition can include road, rail, marine, aviation, active mobility, assisted mobility, drones, autonomous systems and other registered capabilities without changing the Journey object contract.

## Specialized handoffs

- Ride/Door-to-door: passenger intent + HAPI operator + Fleet asset + CHARTER journey.
- Charter/premium: specialist assets + qualified personnel + CHARTER execution.
- Fleet: organizational asset operations over CHARTER capabilities.
- Logistico: goods movement and custody over CHARTER journeys.
- Hitch: conditional/shared mobility experience over CHARTER availability.
- Pilgrim: pilgrimage movement experience over CHARTER routes/stops/services.
- NAB: vehicle registry/biography and government handoff referencing canonical vehicle identity.
- Recovery: breakdown/tow/rescue over CHARTER capabilities and qualified specialists.

## Economic boundary

CHARTER may express reservations, eligibility, obligations and value requirements, and may attach a value reference to a journey. It does not own money, payment, settlement, financing, savings ledgers or token issuance primitives. Those remain under IO and applicable regulated infrastructure.

## Security and authority

Automation may recommend, route, block or trigger recovery only within explicit authority and policy. A data feed is evidence, not automatically legal authority. Identity/role/permission/SEAL checks must remain canonical references rather than product-local replacements.

## Testing requirements

The runtime must have tests for:

1. valid journey lifecycle transitions;
2. rejection of invalid transitions;
3. event creation with prior/resulting state;
4. multimodal legs and handoffs;
5. disruption and recovery without loss of journey history;
6. evidence references;
7. cancellation/denial/abandonment branches;
8. capability loss and reassignment;
9. persistence round trip;
10. compatibility with existing Charter capability registration and journey planning behavior.

## Non-goals for this slice

- public token trading;
- universal regulatory authority;
- replacing government registries;
- full live telemetry provider integrations;
- production autonomous vehicle control;
- production payment settlement;
- every consumer-facing transport UI.

## Success criteria

A developer can create a journey, progress it through a valid lifecycle, record every material transition as evidence-backed events, handle disruption/recovery, preserve multimodal handoffs, and close the journey with an auditable history while reusing existing OMNII persistence/object/relationship primitives.
