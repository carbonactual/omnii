# CHARTER — Operational Service Completeness

**Status:** Canonical Charter composition supplement  
**Domain:** Universal transport / movement  
**Economic boundary:** IO owns value movement.

## Purpose

This supplement closes operational gaps identified through review of aviation, airport handling, maritime safety, road regulation, fleet operations and transport-service workflows. These are Charter compositions over existing OMNII primitives, not new constitutional primitives.

IATA's current airport-handling framework explicitly separates passenger handling, baggage, cargo/mail, aircraft handling/loading, load control, safety/management, aircraft movement control, ground support equipment, agreements and training. citeturn985800search4turn985800search10 Aviation's wider value chain also includes OEMs, lessors, airports, air-navigation providers, ground handlers, MRO, catering, airlines, distribution and freight forwarding. citeturn985800search1 Maritime operations likewise use voyage data recorders for accident investigation. citeturn985800search3

## 1. Passenger movement lifecycle

Charter can compose the full passenger journey:

```text
DISCOVER
 ↓
REQUEST
 ↓
BOOK / RESERVE
 ↓
TRAVEL DOCUMENT / TICKET
 ↓
CHECK-IN
 ↓
IDENTITY / DOCUMENT CHECK
 ↓
BAG DROP / BAGGAGE ACCEPTANCE
 ↓
SECURITY / REQUIRED SCREENING
 ↓
WAIT / LOUNGE / TRANSFER
 ↓
BOARDING
 ↓
DEPARTURE
 ↓
IN-TRANSIT SERVICE
 ↓
CONNECTION / TRANSFER
 ↓
ARRIVAL
 ↓
BAGGAGE RECLAIM
 ↓
EXIT / HANDOFF
 ↓
DESTINATION
```

A **ticket** is a transport entitlement/access record, not a money primitive. Any financial issuance, payment or settlement remains in IO.

## 2. Booking, reservation and access

Charter may compose:

- trip request;
- reservation;
- booking;
- itinerary;
- seat/space assignment;
- boarding entitlement;
- standby/waitlist;
- check-in state;
- boarding state;
- transfer state;
- cancellation state;
- rebooking/rerouting workflow;
- no-show handling;
- journey completion.

The exact implementation may vary by transport mode while preserving common journey semantics.

## 3. Delay, cancellation, disruption and recovery

Disruption is a first-class workflow, not an afterthought.

```text
DELAY / CANCELLATION / INTERRUPTION
 ↓
DETECT
 ↓
CLASSIFY
 ↓
IDENTIFY AFFECTED PEOPLE / CARGO / ASSETS
 ↓
ASSESS DOWNSTREAM EFFECT
 ↓
FIND ALTERNATIVES
 ↓
PROPOSE / AUTHORIZE
 ↓
REBOOK / REROUTE / HOLD / RECOVER
 ↓
UPDATE ALL AFFECTED LEGS
 ↓
NOTIFY
 ↓
VERIFY
 ↓
RECORD EVENT + EVIDENCE
```

Charter should preserve the original plan and the adapted plan rather than overwriting history.

## 4. Baggage and carried property

Baggage is a transport-domain carried-object relationship.

Charter can represent:

- checked baggage;
- cabin baggage;
- oversized baggage;
- special equipment;
- sports equipment;
- mobility devices;
- child equipment;
- fragile items;
- lost baggage;
- delayed baggage;
- damaged baggage;
- baggage handoff;
- baggage tracking;
- baggage recovery.

The underlying property/object remains canonical; Charter represents the movement, custody, routing and handoff context.

## 5. Cabin crew / air hostesses and service personnel

Cabin crew are canonical people/agents with transport roles and capabilities. Charter may represent:

- role;
- training;
- certification;
- assignment;
- aircraft/vessel compatibility;
- shift/duty state;
- availability;
- crew composition;
- safety responsibilities;
- service responsibilities;
- emergency procedures;
- operational handoffs.

The terminology may differ by jurisdiction/operator; the canonical role is transport personnel/crew.

## 6. Human resources and workforce operations

Charter can compose the workforce lifecycle where movement personnel are involved:

```text
ROLE NEED
 ↓
SOURCE / RECRUIT
 ↓
IDENTIFY
 ↓
QUALIFY
 ↓
TRAIN
 ↓
TEST
 ↓
CERTIFY / AUTHORIZE
 ↓
ASSIGN
 ↓
ROSTER / DUTY
 ↓
OPERATE
 ↓
PERFORMANCE / INCIDENT
 ↓
RECERTIFY / DEVELOP / RELEASE
```

This includes drivers, pilots, cabin crew, captains, engineers, mechanics, dispatchers, handlers, marshals, inspectors, instructors, rescue personnel and other specialists.

HR/payroll/employee economic records remain owned by their canonical organizational/economic sources; Charter carries the transport-role context.

## 7. Education, training and testing

Charter can compose transport education and capability progression:

- driving schools;
- flight schools;
- marine academies;
- engineering/MRO training;
- drone training;
- autonomous-system training;
- safety training;
- emergency-response training;
- simulator training;
- examination;
- type/class qualification;
- recurrent training;
- recertification;
- instructor capability.

Certificates are governed records, not merely badges. Charter references canonical credential/certification sources.

## 8. Hierarchy, roles and operating structure

Transport organizations often operate through explicit role hierarchies. Charter can represent role relationships such as:

```text
ORGANIZATION
 → DIVISION / UNIT
 → FLEET / STATION / OPERATION
 → MANAGEMENT
 → SUPERVISION
 → CREW / WORKFORCE
 → SPECIFIC ASSIGNMENT
```

Roles, reporting relationships and operational responsibility remain canonical organization/authority semantics. Charter uses them for movement execution.

## 9. Business and institutional operations

Charter can compose movement functions inside:

- airlines;
- airports;
- rail operators;
- bus companies;
- trucking companies;
- shipping companies;
- ports;
- manufacturers;
- MRO organizations;
- ground handlers;
- travel operators;
- logistics organizations;
- government agencies;
- emergency services;
- humanitarian organizations;
- sports/event organizations;
- research organizations;
- educational institutions;
- clubs and associations.

The organization itself remains an OMNII canonical organization object.

## 10. Safety, emergency and restraint/brace procedures

Charter can represent operational safety instructions and state transitions such as:

- boarding safety;
- seat/occupant readiness;
- seatbelt/restraint state;
- brace-position instruction;
- emergency-exit readiness;
- evacuation;
- emergency landing/docking/diversion;
- emergency equipment;
- first response;
- rescue and recovery.

Instructions and procedures are governed knowledge/workflow content; Charter does not create a new safety primitive.

## 11. Marshalling and movement control

Charter includes the movement-control context for personnel and systems that guide assets within regulated operating environments.

Examples include:

- aircraft marshalling;
- ramp coordination;
- tug/tractor coordination;
- berth/port movement control;
- rail yard movement;
- loading-bay coordination;
- convoy/staging coordination;
- station/platform movement control.

A **marshal** is a transport role/capability, not a new universal entity.

## 12. Aircraft, vessel and vehicle records

Charter can compose technical and operational records including:

- make/model/variant;
- specification;
- build/configuration;
- inspection;
- maintenance;
- modification;
- service history;
- utilization;
- condition;
- certification references;
- operational restrictions;
- incident history;
- position/history;
- crew/assignment history;
- carried passenger/cargo context.

## 13. Black boxes and operational recorders

Charter treats machine recorders as evidence-producing equipment/relationships, not as a new universal primitive.

For aircraft this can include flight data and cockpit voice recording systems. For ships, voyage data recorders serve a comparable accident-investigation function. IMO explicitly requires VDRs for specified passenger and larger ships to support accident investigation. citeturn985800search3

The pattern is:

```text
MOVING ASSET
 ↓
RECORDER / SENSOR
 ↓
RAW DATA
 ↓
PRESERVATION
 ↓
AUTHORIZED ACCESS
 ↓
INVESTIGATION / ANALYSIS
 ↓
FINDINGS / EVIDENCE
```

Charter does not treat derived interpretations as equivalent to raw evidence.

## 14. Maintenance, MRO, tools, machines and diagnosis

Charter supports the service chain around moving assets:

```text
OBSERVE
 ↓
DIAGNOSE
 ↓
IDENTIFY CAPABILITY
 ↓
IDENTIFY PART / TOOL / MACHINE
 ↓
CHECK AVAILABILITY
 ↓
ASSIGN SPECIALIST
 ↓
REPAIR / SERVICE
 ↓
TEST / INSPECT
 ↓
RETURN TO SERVICE
```

The tool/equipment can itself be a canonical object with identity, capability, condition and location.

Machine assistance may include mobile workshops, diagnostic devices, lifting equipment, recovery equipment, inspection equipment, fabrication tools and specialized maintenance machinery.

## 15. DIY and professional escalation

Charter can support a graded assistance workflow:

```text
PROBLEM
 ↓
SAFE DIY POSSIBLE?
 ├── YES → guided procedure → verification
 └── NO  → qualified person / machine / service
                    ↓
                 recovery/escalation if needed
```

DIY content must respect safety and authority boundaries; instructional content does not confer professional authorization.

## 16. Customization, builds and modifications

Charter supports asset configuration history including:

- factory build;
- bespoke build;
- coachbuilding;
- restoration;
- engine/powertrain conversion;
- electric/CNG or other lawful conversion;
- bodywork;
- paint;
- wrap/livery;
- interior;
- accessibility modification;
- competition configuration;
- special-purpose configuration.

Each change preserves original configuration, new configuration, responsible actor, evidence and applicable authorization.

## 17. Automotive culture, creators and media

Charter can represent the transport-cultural ecosystem around vehicles and movement, including the kind of discovery and documentation associated with automotive media, collector shows and garage culture.

Examples of content relationships include:

- vehicle featured in a programme;
- vehicle reviewed by a presenter/creator;
- vehicle documented by a journalist;
- collection toured or filmed;
- garage/build documented;
- vehicle used in a film/television production;
- scene/episode relationship;
- creator/collector/engineer contribution;
- historical story or archive reference.

This accommodates **Top Gear-type automotive television, Jay Leno-type collection/garage history and Supercar Blondie-type rare/exceptional vehicle discovery** as content/creator/provenance compositions. These examples do not create new product primitives.

## 18. Tickets, documents and credentials

Transport may require documents/credentials such as:

- tickets;
- boarding passes/boarding credentials;
- reservations;
- licences;
- permits;
- certificates;
- cargo documents;
- baggage records;
- inspection documents;
- crew credentials;
- passenger identity/travel documents.

The underlying document/identity/authority semantics remain canonical OMNII functions. Charter adds the transport context.

## 19. Compliance, audit and law

Charter can compose:

- regulatory requirements;
- operating rules;
- inspections;
- audits;
- certification status;
- permits;
- route restrictions;
- operator obligations;
- training requirements;
- incident investigations;
- corrective actions;
- evidence preservation.

Current UNECE work continues to develop harmonized vehicle regulations and approval requirements, including automated driving systems. citeturn985800search0turn985800search9

Charter records/apply these constraints through canonical authority and policy; it does not become a sovereign regulator.

## 20. Ground handling and transfer operations

The airport handling model demonstrates a broader transport pattern: passenger handling, baggage, cargo/mail, aircraft loading, load control, movement control, ground equipment, agreements, safety and training are connected operational functions. citeturn985800search4turn985800search10

Charter therefore supports equivalent patterns across other modes:

- port/berth handling;
- rail platform/yard operations;
- truck terminal operations;
- warehouse handoffs;
- ferry loading;
- event staging;
- cargo transfers;
- vehicle recovery/relocation.

## 21. Operational ecosystem principle

The full transport system is larger than the vehicle. A complete movement workflow can require:

`PERSON + ORGANIZATION + AUTHORITY + ASSET + CAPABILITY + CAPACITY + CONDITION + LOCATION + TIME + INFRASTRUCTURE + DOCUMENT + CREW + CARGO/PASSENGER + WORKFLOW + EVIDENCE`

Charter composes these from canonical OMNII sources.

## 22. Economic boundary

Ticket purchase, pricing, financial settlement, payroll and other value movement remain in IO or the applicable canonical economic source. A transport ticket may be represented by Charter as an entitlement/access object, but Charter does not become the money system.

## 23. Completion rule

Charter is complete enough to represent not only **getting there**, but the operational reality required to make movement possible and recoverable:

`DISCOVER → BOOK/RESERVE → DOCUMENT → CHECK-IN → PREPARE → BOARD/LOAD → MOVE → CONTROL → MONITOR → DELAY/ADAPT IF NEEDED → ARRIVE → HANDOFF → RECOVER/REPAIR IF NEEDED → RECORD → LEARN`

Its scope remains open to new transport modes and capabilities through canonical composition rather than a closed vehicle list.
