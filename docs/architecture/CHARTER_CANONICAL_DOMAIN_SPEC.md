# CHARTER — Canonical Domain Specification

**Status: CANONICAL DOMAIN SPECIFICATION — OMNII composition**  
**Architecture position:** Domain composition; not a new constitutional kernel, universal object model, graph, authority system, registry primitive, economic system, or runtime.

## 0. Purpose

Charter is OMNII's transport and mobility domain composition. It represents the complete world of movement and the people, organizations, assets, infrastructure, information, evidence, culture and workflows surrounding movement.

Charter does **not** redefine OMNII primitives. It composes the canonical OMNII object envelope, universal graph, identity, authority, provenance, lifecycle, state, events, registries, capability, resource, motion, relationship, intent, execution, continuity and integration semantics.

Charter is therefore a **domain view and workflow composition over OMNII**, not a parallel architecture.

## 1. Constitutional placement

```text
OMNII
  ↓
Canonical Object + Universal Graph + Authority + Runtime
  ↓
CHARTER DOMAIN
  ├── Movement
  ├── Assets
  ├── Fleets
  ├── People
  ├── Organizations
  ├── Infrastructure
  ├── Events
  ├── Media / Culture
  ├── Collections / Provenance
  ├── Knowledge / Evidence
  └── Workflows
```

Charter primarily composes the foundational kernels:

`MOTION + IDENTITY + KNOWLEDGE + TRUST + RELATIONSHIP + INTENT + EXECUTION + CAPABILITY + RESOURCE + COMPOSITION + CONTINUITY + INTEGRATION`

It does not create a new kernel called Transport, Fleet, Vehicle, Garage, Media, Collection or similar.

## 2. Scope

Charter covers movement across:

- walking and human-powered movement;
- roads and trails;
- bicycles, mobility aids and micro-mobility;
- motorcycles and automobiles;
- buses and passenger systems;
- trucks, trailers and freight systems;
- rail and guided transport;
- pipelines, conveyors and other infrastructure-mediated movement;
- rivers, lakes and maritime transport;
- fishing, leisure and specialist vessels;
- underwater/submersible systems;
- aircraft, helicopters and autonomous aerial systems;
- drones and drone fleets;
- high-altitude and near-space systems;
- satellites as moving infrastructure/assets;
- rockets and spacecraft;
- orbital, lunar and future transportation concepts;
- animal-assisted movement and biological migration as applicable knowledge/observation domains;
- unknown or hypothetical movement entities, represented with explicit epistemic status.

Charter can also represent the movement or operational context of ordinary objects such as shopping trolleys, child walkers, wheelchairs, luggage carts, warehouse vehicles, sports equipment and other movable assets. This is a test of ontology coverage, not a requirement to create separate products for each category.

## 3. Canonical object composition

Every Charter object is an OMNII canonical object. Charter adds domain attributes and relationship types through the existing extension mechanism.

```text
Charter Object
├── OMNII identity / #
├── type / version
├── lifecycle
├── provenance
├── authority context / SEAL where applicable
├── attributes
├── relationships
├── dependencies
├── capabilities
├── resources
├── timestamps
└── Charter extension
```

Typical Charter object types include:

- person;
- vehicle;
- vessel;
- aircraft;
- drone;
- spacecraft;
- satellite;
- fleet;
- route;
- corridor;
- station;
- port;
- airport;
- garage/workshop;
- infrastructure asset;
- cargo/load;
- journey/mission;
- incident/accident;
- maintenance activity;
- collection;
- exhibition/show;
- production/media work;
- award/competition;
- organization/company/government;
- specialist/service provider;
- evidence/source;
- unknown/hypothetical entity.

These are **domain types**, not new universal primitives.

## 4. Movement object

A movement object is any governed object that moves, enables movement, controls movement, observes movement, supports movement, or is materially affected by movement.

The Charter extension may express:

```text
identity
classification
manufacturer / creator
model / variant
serial or external registry references
owner
operator
custodian
current location
origin
planned destination
temporal position/history
state
condition
capability
capacity
availability
energy state
configuration
modifications
personnel
cargo/payload
certifications
restrictions
maintenance
incidents
provenance
media/history
```

## 5. State, condition, location and time

These are separate canonical dimensions. Charter must never collapse them into one status field.

### State

State is the OMNII state concept applied to the movement object or workflow. Examples include discovered, identified, reserved, assigned, authorized, active, interrupted, recovering, completed and archived where the applicable lifecycle permits them.

### Condition

Condition describes the physical, technical, operational or regulatory condition of an object. It may include:

- mechanical;
- electrical;
- structural;
- software;
- safety;
- environmental;
- cosmetic;
- legal/regulatory;
- energy;
- operational;
- human/crew readiness.

Example condition states include new, used, refurbished, operational, degraded, restricted, damaged, under inspection, under maintenance, awaiting parts, immobilized, salvage, retired and unknown.

### Location

Location describes where an object is or was in space. Charter distinguishes:

- origin;
- planned location;
- current location;
- last-known location;
- estimated location;
- expected location;
- actual location;
- destination;
- operating area;
- restricted area.

### Time

Every location/trajectory observation that requires temporal meaning carries time and applicable source/evidence. Charter preserves position history rather than overwriting it.

## 6. Position and trajectory

A position observation is an event/evidence composition, not a new universal primitive.

```text
Object
  ↓
Position Observation
  ├── time
  ├── location
  ├── source
  ├── accuracy
  ├── confidence
  ├── sensor/report origin
  └── evidence reference
```

Charter distinguishes planned, expected and actual movement:

`PLANNED → EXPECTED → ACTUAL → DEVIATION → OUTCOME`

This supports tracking, dispatch, investigation, route optimization and historical reconstruction without creating a second event model.

## 7. Fleet composition

A fleet is a domain composition representing a managed population of movement assets.

Fleet attributes may include:

- fleet identity;
- owner;
- operator;
- manager/custodian;
- members/sub-fleets;
- mission or purpose;
- operating geography;
- aggregate capacity;
- utilization;
- availability;
- condition distribution;
- maintenance state;
- personnel;
- infrastructure dependencies;
- energy dependencies;
- certifications/restrictions;
- agreements;
- incidents;
- performance/history.

A fleet may contain fleets or sub-fleets through canonical composition relationships.

## 8. Capability, capacity, availability and authority

These concepts remain distinct.

```text
CAPABILITY  = what the object/person can do
CAPACITY    = how much it can carry/support/perform
AVAILABILITY = whether it can be used now/within a window
AUTHORITY   = whether the actor/object is permitted to act
CONDITION   = whether it is fit for the intended operation
```

A Charter workflow may compose these dimensions into an executable match:

`Capability + Capacity + Availability + Authority + Condition → executable candidate`

No match may imply permission merely because a technical capability exists.

## 9. Actors and institutional responsibility

Charter uses OMNII's universal person/organization/institution semantics.

Relevant actors include:

- persons;
- companies;
- organizations;
- associations;
- governments;
- public agencies;
- regulators;
- manufacturers;
- operators;
- owners;
- custodians;
- drivers/pilots/captains/crew;
- mechanics and specialists;
- collectors and curators;
- creators, journalists and historians;
- event organizers;
- emergency responders.

Relationships must distinguish, where applicable:

`owner ≠ operator ≠ custodian ≠ manufacturer ≠ regulator ≠ responder ≠ authorizer ≠ responsible party`

Responsibility is a typed relationship with temporal and authority context where required. It is not inferred from ownership alone.

## 10. Authority and jurisdiction

Charter does not create an independent authority model.

It composes OMNII identity, authorization, policy, SEAL and governance semantics to represent:

- operating permissions;
- certification/inspection authority;
- jurisdiction;
- route/airspace/waterway restrictions;
- emergency authority;
- delegated responsibility;
- revocation/expiry;
- audit and review.

`Capability ≠ Authority` remains binding.

## 11. Infrastructure

Infrastructure is represented as canonical objects with domain classifications and condition/state.

Examples include:

- roads;
- bridges;
- rail lines;
- trails;
- stations;
- ports;
- airports;
- garages;
- workshops;
- charging/fueling infrastructure;
- rest and service locations;
- emergency facilities;
- communications infrastructure;
- launch/space infrastructure;
- temporary/deployable infrastructure.

Infrastructure may be stationary or deployable. Condition is represented using the same canonical state/condition semantics as other objects.

## 12. Maintenance, repair and roadside assistance

Maintenance is a workflow composition over canonical objects and events.

```text
Signal
 ↓
Assessment / Diagnosis
 ↓
Required Capability / Resource
 ↓
Location Match
 ↓
Assignment / Authorization
 ↓
Repair / Recovery
 ↓
Test / Inspection
 ↓
Return-to-service state transition
 ↓
Evidence / History
```

It supports scheduled, preventive, predictive, corrective, emergency, inspection, recall, modification and refurbishment workflows.

Roadside workflows may compose:

- mechanic;
- tow/recovery resource;
- spare component;
- tyre/tool;
- charging/fueling resource;
- alternative transport;
- medical/emergency support;
- authorized security/emergency response.

## 13. Components and configuration

Components are canonical objects in relationships to parent assets. Charter does not create a separate parts ontology.

A component can have its own:

- identity;
- compatibility;
- condition;
- location;
- provenance;
- lifecycle;
- installation/removal history;
- maintenance history.

Vehicle configuration distinguishes original/factory configuration from later modifications.

## 14. Build, modification and customization history

Charter records lifecycle/provenance through existing events and relationships.

Relevant domain classifications include:

- concept;
- prototype;
- pre-production;
- production;
- limited production;
- numbered series;
- coachbuilt;
- bespoke;
- one-off;
- replica/reconstruction.

Appearance/configuration may include:

- color;
- paint;
- wrap;
- livery;
- decals/markings;
- interior;
- body configuration;
- accessibility configuration;
- conversion;
- performance/sport configuration.

A modification is represented as a governed lifecycle/evidence composition so original identity and historical configuration are preserved.

## 15. Provenance, rarity and collections

Charter uses OMNII provenance and evidence semantics to represent why an object is considered rare, unique, historic or significant.

Rarity may derive from:

- production quantity;
- surviving examples;
- unique configuration;
- prototype status;
- historical use;
- competition history;
- documented ownership/association;
- engineering significance;
- cultural significance;
- geographic scarcity;
- specialist knowledge/parts scarcity.

A collection is a domain composition of canonical objects and relationships. It may contain vehicles, vessels, aircraft, equipment, memorabilia and other movable/historic objects.

Collection attributes may include owner/custodian, curator, theme, location, storage, condition, provenance, acquisition history, restoration, exhibition history, loans and publications.

## 16. Garage, workshop and specialist ecosystem

Garage/workshop is a domain classification of an organization, facility or place composition. It may provide:

- maintenance;
- restoration;
- fabrication;
- tuning;
- coachbuilding;
- painting/wrapping;
- detailing;
- conversion;
- inspection;
- specialist services;
- storage;
- exhibition.

Specialists are canonical people/organizations with capability, certification, experience and availability. Charter may match a specialist to an asset/problem without creating a separate specialist identity system.

## 17. Discovery, media and creator layer

Charter includes transport culture and discovery because media, documentation and access create durable knowledge about movement objects.

Creators may include:

- journalists;
- presenters;
- filmmakers;
- photographers;
- reviewers;
- historians;
- engineers;
- designers;
- mechanics;
- collectors;
- racers;
- educators;
- other documented contributors.

A creator-to-object relationship must carry relationship type and evidence where appropriate, such as:

`reviewed, filmed, photographed, documented, designed, built, restored, raced, owned, discovered, exhibited, interviewed.`

Charter does not treat social/media claims as authoritative merely because they are published. Epistemic status and evidence remain explicit.

## 18. Productions, films, television and credits

A film, television programme, documentary, advertisement, music video or other production is represented as a canonical event/content/organization composition, not as a new transport primitive.

Charter may represent:

```text
VEHICLE
  └── appeared_in → PRODUCTION
                         ├── credits
                         ├── people
                         ├── characters
                         ├── scenes
                         ├── locations
                         ├── vehicles/assets
                         └── evidence
```

Relationships may include:

- appeared in;
- driven/used in;
- featured in;
- filmed at;
- owned by a production/participant;
- represented by a production;
- credited contribution.

Credits remain provenance-bearing records. A film appearance does not imply ownership, endorsement or real-world use outside the documented production context.

This supports automotive television/documentary formats, collector/garage media, film cars and historically significant screen appearances without creating a separate media architecture.

## 19. Shows, exhibitions, competitions and awards

Events use the canonical OMNII event model.

Charter event compositions may include:

- car shows;
- concours;
- exhibitions;
- racing;
- sporting competitions;
- drone competitions;
- maritime events;
- aviation events;
- space/science missions;
- pilgrimages;
- ceremonies;
- public events;
- educational events.

Judging/awards are event/result/evidence compositions. They can preserve category, criteria, judges, result, ranking, record and award without creating a separate universal competition primitive.

## 20. Accident and incident lifecycle

Accident and incident are domain classifications over canonical events, state transitions and evidence.

```text
Detection
 ↓
Incident classification
 ↓
Objects / people involved
 ↓
Location + time
 ↓
Condition
 ↓
Response
 ↓
Evidence preservation
 ↓
Investigation
 ↓
Findings / contributing factors
 ↓
Responsibility / authority review
 ↓
Recovery / repair
 ↓
Return-to-service or retirement
 ↓
Learning / history
```

Near-miss, breakdown, damage, collision, loss, environmental event and unknown-cause cases can be represented through the same model.

Charter does not independently adjudicate legal responsibility; it preserves authorized evidence, relationships, findings and references to authoritative determinations.

## 21. Sourcing and evidence

Every consequential Charter claim may reference a source/evidence object using canonical provenance semantics.

Possible sources include:

- manufacturer;
- government registry;
- owner/custodian;
- inspection/service record;
- specialist;
- museum/archive;
- auction/exhibition record;
- photograph/video;
- journalism;
- witness report;
- sensor/telemetry;
- research record.

Claims must distinguish, as applicable:

`verified fact | reported claim | observation | inference | prediction | simulation | hypothesis | unknown`

This is especially important for rare objects, celebrity associations, historic vehicles, unidentified objects and future/extraterrestrial scenarios.

## 22. Unknown, future and non-human movement

Charter may represent unknown, hypothetical or future movement entities using explicit epistemic status.

Examples include:

- unidentified objects;
- speculative future vehicles;
- hypothetical extraterrestrial craft;
- future autonomous systems;
- biological movement observations.

The model must never turn an unverified hypothesis into a verified fact merely because it is representable.

## 23. Human and biological mobility

Charter can represent human movement, migration, pilgrimage, carpooling, hitchhiking and other mobility patterns as compositions over people, routes, events, agreements and capabilities.

Animals and biological populations may be represented where movement itself is the relevant domain fact, including migration, observation, transport or environmental research. Biological entities do not require a separate universal ontology.

## 24. Passenger, cargo and payload

Passenger/cargo/payload are domain roles and relationships, not new constitutional primitives.

Charter can express:

- passenger assignment;
- accessibility requirements;
- child/guardian context where authorized;
- cargo/load identity;
- payload capability;
- capacity reservation;
- loading/unloading events;
- custody/hand-off;
- route and destination.

Sensitive personal information remains governed by OMNII privacy, identity, authority and data-protection contracts.

## 25. Workflow and automation

Charter workflows compose the canonical runtime:

`identity → authority → policy → capability → resource → dependency → execution → state transition → event → audit`

Examples include:

- discovery;
- booking/assignment;
- dispatch;
- route planning;
- fleet optimization;
- maintenance;
- roadside recovery;
- incident response;
- pilgrimage/event coordination;
- cargo movement;
- vehicle sourcing;
- collection management;
- exhibition logistics;
- production/film vehicle coordination;
- autonomous operation oversight;
- space/mission logistics.

Automation may propose, match, route and coordinate within delegated authority. It may not infer authority from optimization.

## 26. Transport and the economic boundary

Charter represents operational facts, relationships, states, capabilities, resources, availability, routes and workflows.

**Money is not a Charter primitive.**

Where a Charter workflow creates an economic interaction, the economic state is delegated to OMNII's canonical Value/Economy/IO compositions and applicable IO implementations.

Charter may reference an economic event or agreement when required for operational continuity, but it must not create a competing ledger, payment, pricing or monetary ontology.

## 27. IO boundary

OMNII's canonical architecture defines IO as the interaction boundary for governed inputs, outputs, signals and exchanges.

Charter is therefore a domain composition that can operate through IO. Charter does not replace or redefine IO.

The distinction is:

`Charter = transport/mobility domain composition`  
`IO = canonical interaction/exchange boundary`  
`Value/Economy = canonical economic semantics`

This preserves the user's requirement that monetary concerns remain outside the Charter domain model.

## 28. Registry composition

Charter may define domain registry views for:

- vehicles/assets;
- fleets;
- routes;
- infrastructure;
- capabilities;
- specialists;
- collections;
- events;
- media/provenance.

These are registry views/indexes over canonical OMNII objects. They must not create duplicate identity, authority, event, provenance or universal graph systems.

## 29. World model

The Charter world model answers:

```text
WHAT EXISTS?
WHERE IS IT?
WHEN IS IT THERE?
WHAT IS MOVING?
WHAT CAN MOVE?
WHAT CAN IT DO?
HOW MUCH CAN IT SUPPORT?
WHAT CONDITION IS IT IN?
IS IT AVAILABLE?
WHO OWNS/OPERATES/CUSTODIES IT?
WHO HAS AUTHORITY?
WHAT INFRASTRUCTURE SUPPORTS IT?
WHAT IS IT CARRYING?
WHAT HAPPENED TO IT?
WHAT EVIDENCE SUPPORTS THE CLAIM?
WHAT SHOULD HAPPEN NEXT?
```

ABBA may interpret and coordinate this world model through the canonical OMNII runtime and authority boundaries.

## 30. Product projection rule

Products must be projections/workflows over this domain composition rather than competing ontologies.

Examples may include:

- Charter Transport;
- fleet management;
- roadside assistance;
- freight/logistics composition;
- Hitch;
- Pilgrim;
- travel/event transport;
- marine/aviation/space mobility;
- automotive culture/discovery;
- collections and provenance;
- specialist/garage services.

These may expose different user experiences and workflow contracts while sharing canonical OMNII objects and relationships.

## 31. Non-duplication law

Charter MUST NOT create competing primitives for:

- identity;
- person;
- organization;
- authority;
- consent;
- object;
- relationship;
- event;
- state;
- provenance;
- evidence;
- capability;
- resource;
- registry;
- value;
- ledger;
- IO;
- workflow;
- agent;
- audit.

Where Charter needs a concept, it must first compose an existing canonical primitive and add only domain-specific classification/attributes/relationship types through the permitted extension mechanisms.

## 32. Canonical relationship examples

The following are domain relationship types over the universal graph:

```text
PERSON ──operates──> VEHICLE
PERSON ──owns──> VEHICLE
ORGANIZATION ──operates──> FLEET
FLEET ──contains──> VEHICLE
VEHICLE ──has_component──> COMPONENT
VEHICLE ──located_at──> LOCATION
VEHICLE ──travels_on──> ROUTE
VEHICLE ──requires──> CAPABILITY/RESOURCE
VEHICLE ──maintained_by──> ORGANIZATION/PERSON
VEHICLE ──appeared_in──> PRODUCTION
VEHICLE ──member_of──> COLLECTION
COLLECTION ──exhibited_at──> EVENT
CREATOR ──documented──> VEHICLE
SPECIALIST ──capable_of──> SERVICE
INCIDENT ──involves──> OBJECT
AUTHORITY ──governs──> OBJECT/ACTIVITY
SOURCE ──supports──> CLAIM
```

All consequential edges use the canonical relationship metadata and temporal/authority/provenance semantics.

## 33. Reference lifecycle

A typical Charter asset lifecycle is:

```text
CONCEPT / ORIGIN
  ↓
BUILD / ACQUISITION
  ↓
IDENTIFICATION / REGISTRATION
  ↓
OPERATION
  ↓
MAINTENANCE / MODIFICATION
  ↓
INCIDENT / RECOVERY where applicable
  ↓
RESTORATION / REFURBISHMENT where applicable
  ↓
COLLECTION / EXHIBITION / MEDIA where applicable
  ↓
TRANSFER / RETIREMENT
  ↓
ARCHIVE / CONTINUITY
```

This is a domain lifecycle projection. The canonical lifecycle semantics remain those of OMNII.

## 34. Compliance and audit

Charter implementations must preserve:

- identity;
- authority;
- provenance;
- temporal validity;
- jurisdiction;
- consent where required;
- auditability;
- evidence;
- state transition history;
- separation of observed facts from inference.

Safety-critical operations must not be represented as automatically authorized merely because a route or capability match exists.

## 35. Compression statement

Charter intentionally compresses a large transportation universe into a small number of canonical OMNII compositions:

`Object + Relationship + State + Event + Capability + Resource + Location + Time + Authority + Provenance + Workflow`

Everything from a supermarket trolley to a spacecraft, from a local mechanic to a government fleet, and from a historic collection to a film vehicle can be represented without creating a new constitutional primitive.

## 36. Acceptance criteria

The Charter domain is architecturally conformant when:

1. all Charter objects use the OMNII canonical object envelope;
2. all relationships use the universal graph;
3. identity uses # and applicable canonical identity semantics;
4. authority/consent uses existing governance and SEAL semantics;
5. events and state use canonical event/state semantics;
6. provenance/evidence remain attributable;
7. registry views do not become alternate systems of record;
8. money/economic implementation remains outside Charter's domain ontology;
9. ABBA and agents operate only through delegated authority;
10. products project Charter workflows instead of redefining Charter primitives;
11. unknown/future entities retain explicit epistemic status;
12. historical continuity is preserved through canonical lifecycle, relationship, event and evidence mechanisms.

---

**Canonical rule:** Charter is a manifestation of OMNII's existing architecture. It is not another architecture inside OMNII.
