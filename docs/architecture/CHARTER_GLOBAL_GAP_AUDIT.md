# CHARTER — Global Transport Gap Audit & Completeness

**Status:** Canonical architecture supplement  
**Domain:** Universal transport / movement  
**Boundary:** Charter owns movement context/orchestration; IO owns value movement.

## Audit basis

This audit expands Charter against aviation, airport/ground handling, maritime, multimodal logistics, UAS, safety management and transport-data interoperability. Current industry/governance material confirms that transport is a network of operators, infrastructure, authorities, data exchanges, ground services, maintenance, training, safety and cargo/passenger processes—not merely vehicles or booking. IATA's aviation value-chain work includes OEMs, lessors, airports, air-navigation providers, ground handlers, MRO, catering, airlines, distribution and freight forwarding. citeturn0search0

ICAO ground-handling material covers passenger services, baggage, cargo, aircraft handling/loading, load control, safety, GSE and training, reinforcing that ground operations are first-class movement workflows. citeturn0search3turn0search4 IMO similarly treats passenger safety, crew training, cargo securing, port interaction, environmental requirements and maritime digital information exchange as integral to transport. citeturn0search5turn0search11turn0search18 UNECE's 2026 intermodal-data framework highlights interoperability, trusted data sharing, access control and incremental onboarding across fragmented transport systems. citeturn0search95 UAS operations add remote identification, registration, traffic-management, airspace constraints and regulator/operator interfaces. citeturn0search1turn0search14

## Gap classes incorporated

### 1. Journey intent and passenger lifecycle

Charter must support the full movement lifecycle:

`INTENT → DISCOVER → PLAN → RESERVE/ASSIGN → DOCUMENT → CHECK-IN/READY → BOARD → MOVE → TRANSFER → ARRIVE → DISembark → CLAIM/HANDOFF → COMPLETE`

Capabilities include:

- tickets and journey credentials;
- reservations and assignments;
- passenger profiles and movement requirements;
- check-in/readiness;
- boarding and disembarkation;
- connection management;
- missed connections;
- no-show handling;
- delay, cancellation, diversion and rerouting;
- rebooking and alternative movement;
- passenger assistance;
- accessibility and special assistance;
- child/guardian and dependent movement workflows where lawful;
- travel-document and eligibility checks as authority-controlled workflows.

### 2. Baggage, cargo, mail and payload

Movement is not complete without what is being carried.

Charter supports:

- baggage registration and tracking;
- baggage transfer and reconciliation;
- lost/delayed/damaged baggage workflows;
- cargo acceptance;
- loading/unloading;
- weight, dimensions and load constraints;
- stowage and securing;
- dangerous/special cargo handling under applicable authority;
- mail and parcel movement;
- containers and unit-load devices;
- cargo handoffs across modes;
- proof/evidence of custody and transfer.

Maritime and intermodal guidance confirms the importance of cargo packing, securing, documentation and multimodal data exchange. citeturn0search11turn0search15turn0search6

### 3. Ground, station, terminal and turnaround operations

Add explicit movement workflows for:

- gates;
- platforms;
- berths;
- stands;
- boarding zones;
- marshalling;
- ramp operations;
- baggage areas;
- cargo areas;
- passenger assistance;
- loading bridges;
- ground-support equipment;
- turnaround coordination;
- cleaning;
- catering;
- fueling/energy servicing;
- de-icing where applicable;
- waste and sanitation servicing;
- vehicle staging;
- parking and depot operations.

IATA's handling standards explicitly include GSE management, ground-handling agreements, training, passenger/cargo/aircraft handling and load control. citeturn0search4turn0search17

### 4. Network and infrastructure operations

Charter must represent movement through infrastructure states:

- open/closed;
- available/unavailable;
- capacity-constrained;
- restricted;
- congested;
- under maintenance;
- disrupted;
- emergency-only;
- weather-affected;
- authority-controlled.

Infrastructure includes roads, bridges, tunnels, rail, stations, airports, airspace interfaces, ports, waterways, marinas, depots, garages, charging/fueling, rest areas, lifts, escalators, moving walkways and specialized movement infrastructure.

### 5. Operations control and dispatch

Add:

- dispatch;
- movement-control centers;
- fleet allocation;
- crew/resource allocation;
- duty/shift context;
- turnaround management;
- route clearance/constraint evaluation;
- ETA and status propagation;
- handoff coordination;
- exception management;
- recovery planning;
- service restoration;
- continuity planning.

### 6. Workforce and professional lifecycle

Charter composes canonical people/organization capabilities for:

- recruitment;
- onboarding;
- training;
- qualification;
- certification;
- licensing;
- medical/fitness eligibility where required by the relevant authority;
- recurrent training;
- examination;
- rostering;
- assignment;
- fatigue/duty constraints;
- supervision;
- competency records;
- suspension/expiry/renewal;
- offboarding.

This covers drivers, pilots, cabin crew/air hostesses, captains, seafarers, engineers, mechanics, dispatchers, handlers, marshals, instructors, inspectors, rescue workers and other specialists. IMO's passenger-ship framework specifically links passenger safety to seafarer training, certification, watchkeeping and emergency responsibilities. citeturn0search5

### 7. Organization, hierarchy and institutional graph

Represent transport organizations as canonical entities with relationships such as:

`ORGANIZATION → DIVISION → UNIT → FACILITY → FLEET → RESOURCE → PERSON → ROLE → ASSIGNMENT`

Also model relationships to:

- government;
- regulators;
- transport authorities;
- airports/ports/stations;
- manufacturers;
- operators;
- owners;
- lessors;
- MRO providers;
- ground handlers;
- logistics providers;
- associations;
- training bodies;
- inspection/certification bodies;
- emergency services;
- insurers and other external institutions where applicable.

Canonical organizational identity remains outside Charter.

### 8. Safety management and assurance

Add explicit workflows for:

- hazard identification;
- risk assessment;
- operational controls;
- safety cases;
- safety management systems;
- incident reporting;
- near-miss reporting;
- investigation;
- corrective/preventive action;
- safety evidence;
- audit;
- inspection;
- compliance status;
- operational release/return-to-service.

ICAO's safety-management framework uses State Safety Programmes and service-provider Safety Management Systems to manage aviation risks. citeturn0search16

### 9. Black boxes, telemetry and operational evidence

Treat black boxes and equivalent systems as **evidence-producing equipment**, not merely vehicle features:

- flight data recorders;
- cockpit voice recorders;
- voyage data recorders;
- event data/logging systems;
- telemetry;
- remote identification;
- maintenance logs;
- inspection records;
- journey traces;
- sensor evidence.

Lifecycle:

`CAPTURE → PRESERVE → ACCESS-CONTROL → ANALYZE → CORRELATE → INVESTIGATE → FINDING → RETENTION/DISPOSITION`

### 10. Maintenance, diagnosis and repair ecosystem

Charter must support the operational chain:

`SYMPTOM → DIAGNOSIS → INSPECTION → PART/TOOL → REPAIR → TEST → VERIFY → RELEASE`

Including:

- DIY guidance where safe and appropriate;
- escalation to qualified professionals;
- mobile mechanics;
- garages/workshops;
- MRO;
- specialist machinery;
- diagnostic equipment;
- spare parts;
- tools;
- service manuals;
- inspection/testing;
- refurbishment;
- modification;
- conversion;
- customization;
- restoration.

### 11. Recovery and disruption

Add:

- roadside recovery;
- towing;
- marine recovery;
- aircraft recovery workflows;
- rescue;
- evacuation;
- breakdown assistance;
- stranded passenger support;
- substitute transport;
- spare-part dispatch;
- mobile workshop dispatch;
- route obstruction response;
- weather disruption;
- infrastructure failure;
- service interruption;
- disaster/humanitarian continuity.

### 12. Energy and environmental operations

Movement depends on energy and environmental state. Charter may compose:

- fuel availability;
- charging availability;
- battery state;
- refueling;
- energy handoff;
- emissions/environmental constraints;
- weather;
- sea state;
- visibility;
- wind;
- temperature;
- contamination/de-icing conditions;
- environmental restrictions.

The canonical energy/value semantics remain owned by their appropriate ecosystem source.

### 13. Digital transport interoperability

Charter must be designed for interoperable data exchange rather than one closed platform:

- canonical identifiers;
- event exchange;
- journey state;
- status updates;
- capacity/availability feeds;
- access control;
- purpose-limited data access;
- data provenance;
- audit trails;
- machine-readable documents;
- multimodal handoffs;
- incremental onboarding for small operators;
- adapters for legacy systems.

UNECE's 2026 framework specifically calls for shared semantics, trusted interoperable data sharing, access control and incremental integration across fragmented transport systems. citeturn0search95

### 14. Autonomous and unmanned movement

Add explicit lifecycle for autonomous/UAS systems:

`REGISTER → IDENTIFY → AUTHORIZE → PLAN → CHECK AIRSPACE/CONSTRAINTS → OPERATE → MONITOR → INCIDENT → RECOVER → LOG`

Include:

- remote identification;
- operator accountability;
- UAS registration;
- traffic-management interfaces;
- airspace constraints;
- remote pilot/operator roles;
- autonomous capability state;
- loss-of-link procedures;
- geofencing/operational restrictions where applicable;
- incident evidence.

ICAO identifies remote identification, operator accountability and UAS traffic-management information as core regulatory/operational concerns. citeturn0search1turn0search7turn0search14

### 15. Maritime and port operations

Add explicit maritime movement context:

- vessel arrival/departure;
- berth assignment;
- port call;
- pilotage relationships;
- crew/passenger movement;
- cargo operations;
- stowage/securing;
- ship/port information exchange;
- maritime single-window interfaces;
- safety/environmental status;
- emergency response;
- voyage history.

IMO's digital facilitation work covers standardized data exchange among ships, ports, Maritime Single Windows and public authorities. citeturn0search18

### 16. Media, culture, collections and discovery

Charter can compose non-operational cultural/history relationships for movement assets:

- vehicle/aircraft/vessel history;
- collections;
- garages;
- restoration;
- shows;
- races;
- records;
- creators;
- media appearances;
- documentaries;
- television programmes;
- films;
- credits;
- celebrity/collector associations;
- public exhibitions.

Examples such as Top Gear, Jay Leno-style collections and Supercar Blondie-style discovery are **content/discovery compositions**, not separate transport primitives.

### 17. Customer/service experience

Add:

- service discovery;
- preferences;
- accessibility;
- special requests;
- communication;
- notifications;
- wayfinding;
- waiting/queue state;
- estimated vs actual times;
- service recovery;
- feedback;
- complaints;
- lost-property workflows;
- post-journey records.

### 18. Commercial/legal relationships — without owning economics

Charter can reference:

- ownership;
- lease;
- charter agreement;
- operating agreement;
- ground-handling agreement;
- maintenance agreement;
- service-level agreement;
- subcontracting;
- custody/handoff;
- insurance/compliance relationship;
- procurement relationship.

**IO remains responsible for value movement, settlement and economic execution.**

### 19. Security, privacy and restricted operations

Add policy-controlled support for:

- identity verification;
- access control;
- restricted areas;
- security screening;
- credential checks;
- authorized personnel;
- sensitive route/resource handling;
- privacy-preserving data sharing;
- auditability;
- lawful disclosure;
- emergency override under defined authority.

No Charter capability grants authority by itself.

### 20. Accessibility and universal movement

Movement must account for:

- wheelchair users;
- reduced mobility;
- visual/hearing accessibility;
- children and dependents;
- elderly passengers;
- medical equipment;
- service animals;
- accessible boarding;
- accessible vehicles;
- assisted transfers;
- accessible infrastructure.

### 21. Future and unknown movement

Remain open to:

- new vehicle classes;
- novel propulsion;
- autonomous systems;
- new infrastructure;
- commercial space transport;
- extraterrestrial movement;
- speculative/hypothetical systems;
- systems not yet invented.

The schema must distinguish **verified, reported, inferred, simulated, hypothetical and unknown** rather than treating representation as proof of existence.

## Final completeness rule

> **Charter is not a catalogue of vehicles. It is the canonical transport/movement composition domain: people + organizations + authority + infrastructure + assets + capability + journey + service + safety + evidence + maintenance + logistics + operations + disruption + interoperability + future movement.**

The system remains modular: every capability can be composed into a product, workflow, agent, service or institutional handoff without creating a competing primitive or duplicating the canonical source of truth.
