# CHARTER — Public / Private Transport & Logistics Ecosystem

**Status:** Constitutional architecture supplement
**Domain:** Universal transport / movement
**Purpose:** Extend Charter's movement model to explicitly include government, public infrastructure, transport associations, parks, depots, trailer parks, terminals, corridors, enforcement, emergency services and other institutional actors without creating competing canonical primitives.

## 1. Core position

Charter is not a private ride marketplace and not a government transport replacement.

Charter is the **universal movement composition domain** through which public, private, community, cooperative, association, institutional and autonomous movement capabilities can be represented, connected, observed and composed.

Government is therefore not an external exception. Government is a first-class **authority, infrastructure operator, service provider, regulator, planner, purchaser, emergency actor and data participant**, according to the authority actually held in a given context.

The same canonical movement model must work for:

- a private car;
- a commercial bus;
- a transport union/association route;
- a government fleet;
- a public bus system;
- a school fleet;
- an NYSC movement;
- a funeral convoy;
- a military or institutional movement where authorized;
- a truck and trailer;
- a trailer park or truck staging area;
- a motor park or terminal;
- a warehouse or logistics depot;
- a port, airport, railway or inland waterway node;
- an emergency response vehicle;
- an autonomous vehicle;
- a drone or robotic delivery agent;
- a future movement capability not yet known.

## 2. Public infrastructure is movement infrastructure

Charter must represent public and regulated infrastructure as active movement capabilities, not static map points.

### Movement nodes

Examples include:

- motor parks;
- bus terminals;
- loading bays;
- informal but recognized pickup points;
- trailer parks;
- truck staging areas;
- weigh stations/weighbridges;
- rest areas;
- border/inspection facilities;
- ferry terminals;
- rail stations;
- airports and airfields;
- ports and inland ports;
- logistics hubs;
- warehouses;
- distribution centres;
- markets;
- emergency facilities;
- maintenance depots;
- fuel and charging locations;
- mobility hubs;
- government service points;
- community movement nodes.

A node has state, capacity, operating rules, authority, availability, services, restrictions, incidents, accessibility and evidence.

A node may therefore answer:

> What can be done here right now?

rather than only:

> Where is this place?

## 3. Parks are ecosystems, not merely waiting areas

A motor park or trailer park can contain:

- operators;
- associations/unions;
- queues;
- vehicles;
- drivers;
- cargo;
- passengers;
- dispatch rules;
- loading rules;
- parking capacity;
- departure schedules;
- inspection requirements;
- maintenance;
- fuel;
- food;
- sanitation;
- security;
- ticketing;
- manifests;
- parcel handling;
- overnight staging;
- recovery capability;
- public authority presence;
- revenue/fee obligations;
- local economic activity.

Charter must model the park as a **movement node with internal state and relationships**.

This also allows digital coordination without assuming that every park must become a conventional app-based terminal.

## 4. Trailer and freight parks

Trailer parks, truck stops and freight staging locations are first-class logistics infrastructure.

The model should support:

- truck arrival/departure;
- trailer identity;
- cargo association;
- available parking/staging capacity;
- loading/unloading windows;
- queue state;
- weigh/inspection state;
- driver rest;
- fuel/charging;
- maintenance;
- refrigeration/power where available;
- security state;
- route restrictions;
- dispatch;
- backhaul opportunities;
- cargo handoff;
- incident/recovery events.

A truck that is stationary is still part of the movement system: it may be waiting, staging, loading, resting, recovering or preparing for its next movement.

## 5. Government participation model

Government participation is represented by actual authority and capability, not by a generic `government` flag.

Relevant roles may include:

**Authority**
- regulation;
- licensing;
- inspection;
- enforcement;
- permits;
- restrictions;
- public safety;
- corridor control.

**Operator**
- public fleet;
- public transport;
- public terminals;
- public infrastructure;
- emergency movement.

**Planner**
- corridor planning;
- transport demand planning;
- infrastructure planning;
- congestion management;
- public mobility programs.

**Purchaser / Sponsor**
- school movement;
- institutional movement;
- public-service transport;
- emergency/humanitarian movement;
- event/cultural movement.

**Emergency actor**
- rescue;
- evacuation;
- medical response;
- incident management;
- disaster response.

**Data authority/provider**
- official restrictions;
- infrastructure status;
- permits;
- inspection results;
- public transport information;
- official incident information.

Each assertion remains subject to the existing OMNII source-of-truth, authority and evidence rules.

## 6. Public + private + association interoperability

Charter must not encode an assumption that private platforms replace existing transport institutions.

The ecosystem must support:

```text
PUBLIC AUTHORITY
      ↕
PUBLIC OPERATOR
      ↕
ASSOCIATION / UNION
      ↕
PRIVATE OPERATOR
      ↕
DRIVER / AGENT
      ↕
VEHICLE / ASSET
      ↕
PASSENGER / CARGO
```

The relationship may differ by corridor and jurisdiction.

Charter records the actual relationship rather than imposing one universal commercial model.

## 7. Along and participation fairness

Along must be designed as **participation enablement**, not circumvention of existing transport operations.

Where commercial shared transport is regulated or organized through a park, route, association or other operating structure, an Along capability may require participation/eligibility before a vehicle can commercially carry Along passengers on that corridor.

This supports:

- existing operator economics;
- fair participation;
- corridor governance;
- passenger convenience;
- transparent eligibility;
- demand distribution;
- reduced idle time;
- better utilization of existing capacity.

Hitch remains distinct: a conditional/social/adventure movement relationship where commercial transport is not the defining purpose.

## 8. Government transport is also a movement customer

Charter must support government and institutional movement requests such as:

- civil-service relocation;
- official travel;
- school transport;
- NYSC deployment and camp movement;
- public examinations;
- election logistics where lawfully authorized;
- cultural events;
- parades and ceremonies;
- emergency evacuation;
- humanitarian movement;
- public works movement;
- equipment deployment;
- inter-state transfers;
- disaster response;
- public fleet dispatch.

The system must distinguish ordinary commercial movement from movements requiring elevated authority, security, privacy, chain-of-command or evidence controls.

## 9. Enforcement and inspection are movement states

Checks must not be represented only as locations.

A regulatory interaction can change the state of:

- person;
- vehicle;
- trailer;
- cargo;
- route;
- journey;
- permit;
- inspection;
- compliance record;
- node access.

Examples:

```text
INSPECTION REQUIRED
→ INSPECTION IN PROGRESS
→ CLEARED
→ RESTRICTED
→ FAILED
→ CORRECTIVE ACTION
→ REINSPECTION
→ CLEARED
```

This preserves evidence and prevents an informal status from becoming a canonical fact without support.

## 10. Roadside and corridor economy

The movement graph includes the economic ecosystem surrounding movement:

- filling stations;
- charging;
- mechanics;
- vulcanizers/tyre services;
- food vendors;
- water;
- pharmacies/medical services;
- accommodation;
- markets;
- farms;
- village producers;
- artisans;
- repairers;
- parking;
- sanitation;
- security services;
- parcel collection;
- local commerce.

These capabilities may be discovered, verified, consumed and measured through movement journeys without being made into artificial transport entities.

## 11. Traffic, construction and corridor operations

Government, private operators and community participants may contribute movement-state signals.

Relevant events include:

- traffic congestion;
- road construction;
- lane closures;
- diversions;
- accidents;
- flooding;
- bridge restrictions;
- checkpoints/inspection activity;
- public events;
- market-day effects;
- truck restrictions;
- emergency closures;
- road maintenance;
- weather-related disruption.

A route therefore has a changing **Road Pulse** and not merely a static geometry.

## 12. Connectivity as public/private infrastructure

Movement intelligence must represent connectivity availability along routes and nodes.

The model supports:

- network availability;
- weak-signal segments;
- complete black zones;
- carrier-specific observations;
- last-connected position;
- expected recovery point;
- offline journey state;
- alternative communication capability;
- future satellite/mesh/V2X channels.

A journey must remain operational when connectivity disappears.

## 13. Security and sensitive movement

Security information must be permissioned and evidence-based.

Charter may model risk states and operational precautions without exposing sensitive operational information publicly.

Risk can incorporate:

- current verified advisories;
- historical incidents;
- road isolation;
- connectivity loss;
- unusual stoppage;
- time of day;
- route condition;
- current incidents;
- authorized security information;
- emergency response availability.

Public-facing, operator-facing and authorized institutional views may therefore differ while referencing the same canonical evidence model.

## 14. Government integration boundary

Charter should integrate with government systems through adapters and explicit authority contracts.

Examples of integration categories:

- licensing/registration;
- inspection;
- permits;
- public transport;
- road and traffic information;
- emergency response;
- infrastructure status;
- tolling/fees where applicable;
- ports/airports/rail/water transport;
- public procurement;
- institutional movement requests.

Charter does not silently become the source of truth for facts owned by an external authority.

It stores references, projections, evidence and operational state as appropriate.

## 15. Revenue and public economics

Public transport economics must remain distinct from private fare economics.

A movement may involve:

- fare;
- permit fee;
- park fee;
- staging fee;
- toll;
- inspection fee;
- public subsidy;
- procurement contract;
- concession;
- service charge;
- association contribution;
- operator settlement.

These are value movements and therefore remain subject to the canonical IO/economic boundary rather than creating a second Charter settlement primitive.

## 16. Emergency and recovery network

Every significant movement should be able to discover recovery capabilities appropriate to its context:

- roadside assistance;
- towing;
- mechanic;
- tyre service;
- medical response;
- police/security response;
- fire/rescue;
- replacement vehicle;
- passenger accommodation;
- cargo recovery;
- alternative route;
- alternative operator;
- evacuation.

Recovery is part of the journey lifecycle, not an afterthought.

## 17. Capacity exchange across institutions

The same movement capacity may be exposed by:

- private operators;
- public fleets;
- associations;
- rental fleets;
- logistics operators;
- school fleets;
- institutional fleets;
- autonomous fleets.

Charter may discover and compose capacity without requiring all participants to use the same front-end product.

This supports the ecosystem principle:

> **Find suitable available capacity, not merely a particular vehicle.**

## 18. Universal node/edge model

The transport graph is:

```text
NODE
  ↓
MOVEMENT EDGE
  ↓
NODE
```

Where:

**Node** = a place/capability/state boundary.

**Edge** = a possible movement relationship between nodes.

Both can have:

- authority;
- capacity;
- availability;
- state;
- cost/value;
- risk;
- restrictions;
- evidence;
- connectivity;
- temporal validity;
- Pulse.

This allows road, rail, water, air, walking, autonomous and multimodal movement to share one model.

## 19. No public/private fork

The constitutional invariant is:

> **Public, private, community, cooperative, association and autonomous transport are different participants in the same movement ecosystem, not separate universes.**

The architecture must not duplicate the movement primitive merely because the operator is governmental or private.

## 20. Positioning

Charter is therefore positioned as:

> **The universal movement operating and composition layer for people, goods, vehicles, infrastructure, institutions and autonomous agents.**

It can serve:

- passengers;
- drivers;
- operators;
- unions/associations;
- businesses;
- logistics providers;
- government;
- emergency services;
- communities;
- infrastructure operators;
- autonomous systems;
- ecosystem products.

The product layer remains composable:

```text
CHARTER
├── Transport
├── Charter / Group Movement
├── Rental
├── Along
├── Hitch
├── Fleet
├── Logistics
├── Delivery
├── Government/Public Transport
├── Parks & Terminals
├── Trailer/Freight Infrastructure
├── Road & Traffic Intelligence
├── Recovery
├── Autonomous Movement
└── Pilgrim / Event / Specialist Movement compositions
```

These are product compositions, not new constitutional primitives.

## 21. Completion invariant

Charter is not complete merely because private passenger transport works.

Structural completeness requires that the same movement model can represent and compose:

- public transport;
- private transport;
- commercial associations;
- parks and terminals;
- trailer parks and freight staging;
- government fleets and institutional movement;
- regulated corridors;
- infrastructure operators;
- enforcement and inspection;
- emergency response;
- logistics and delivery;
- roadside economic capabilities;
- traffic and construction state;
- connectivity state;
- autonomous movement;
- multimodal movement;
- recovery and disruption;
- future movement capabilities.

## Final invariant

> **Government, parks, trailer parks, unions, private operators, infrastructure, logistics networks and autonomous systems are all participants in the same universal movement field. Charter connects them through canonical movement, authority, capability, state, evidence, capacity and Pulse without replacing the legitimate source of truth of any participant.**
