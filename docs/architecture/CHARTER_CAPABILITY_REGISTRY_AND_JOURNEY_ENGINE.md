# CHARTER — Capability Registry & Journey Engine Foundation

**Status:** Canonical Charter build specification
**Domain:** Universal transport / movement
**Boundary:** Charter owns movement context and orchestration. IO owns value movement.

## 1. Objective

Turn Charter's broad capability surface into a composable operating substrate. Capabilities are registered once, referenced by products, composed into journeys, and packaged for handoff without creating competing primitives.

## 2. Capability Registry

Every Charter capability is represented through the existing OMNII canonical object/capability model.

A capability registration may describe:

- capability identity and canonical source;
- capability type/category;
- inputs and outputs;
- dependencies;
- actors/personnel requirements;
- authority requirements;
- evidence requirements;
- lifecycle and state;
- location/position;
- availability window;
- capacity and constraints;
- interfaces/adapters;
- handoff contract;
- provenance and version.

The registry is descriptive and extensible, not a closed catalogue.

## 3. Capability state

A capability may expose operational state such as:

```text
DISCOVERABLE
AVAILABLE
RESERVED
ASSIGNED
ACTIVE
DEGRADED
RESTRICTED
UNAVAILABLE
MAINTENANCE
RECOVERY
RETIRED
UNKNOWN
```

State transitions must use canonical OMNII lifecycle/event semantics rather than a Charter-specific lifecycle primitive.

## 4. Universal movement graph

```text
INTENT
  ↓
ORIGIN
  ↓
ACCESS
  ↓
MOVEMENT CAPABILITY
  ↓
OPERATOR / PERSONNEL
  ↓
ROUTE / WAYPOINT
  ↓
INFRASTRUCTURE
  ↓
HANDOFF
  ↓
NEXT MOVEMENT CAPABILITY
  ↓
DESTINATION
  ↓
OUTCOME / EVIDENCE
```

A journey can contain any number of legs and can mix human-powered, animal-assisted, mechanical, road, rail, vertical, marine, aerial, autonomous and future movement capabilities.

## 5. Journey composition

A journey request is composed from existing capabilities rather than creating a journey-specific transport primitive.

Conceptual flow:

```text
REQUEST
 → DISCOVER
 → MATCH CAPABILITIES
 → CHECK AVAILABILITY
 → CHECK CAPABILITY
 → CHECK PERSONNEL
 → CHECK AUTHORITY
 → COMPOSE LEGS
 → PLAN HANDOFFS
 → ASSIGN / RESERVE
 → EXECUTE
 → MONITOR
 → HANDLE EXCEPTION
 → COMPLETE
 → RECORD
```

## 6. Door-to-door composition

The engine must support:

```text
DOOR
 → ACCESS
 → PICKUP
 → LOCAL MODE
 → INTERCHANGE
 → PRIMARY MODE
 → INTERCHANGE
 → LAST MILE
 → DOOR
```

No fixed maximum number of modes is imposed by the architecture.

## 7. Matching

Matching can consider:

- capability;
- location;
- availability;
- condition;
- capacity;
- passenger/cargo requirements;
- accessibility;
- personnel qualifications;
- authority;
- route constraints;
- environmental conditions;
- timing;
- handoff compatibility;
- evidence confidence.

Matching is a composition function, not a new canonical identity or economic primitive.

## 8. Exception handling

A journey remains executable when a leg fails, subject to authority and safety constraints.

Examples:

```text
DELAY
 → REPLAN

CANCELLATION
 → SUBSTITUTE CAPABILITY

BREAKDOWN
 → RECOVERY + SUBSTITUTE MOVEMENT

MISSED CONNECTION
 → RECOMPOSE NEXT LEGS

WEATHER / INFRASTRUCTURE INTERRUPTION
 → REROUTE / HOLD / SUBSTITUTE
```

The original event and resulting decisions remain part of the canonical evidence/history graph.

## 9. Workforce composition

A movement capability may require one or more qualified actors:

- driver;
- chauffeur;
- pilot;
- captain;
- engineer;
- mechanic;
- dispatcher;
- marshal;
- instructor;
- inspector;
- rescue/recovery specialist;
- other domain-qualified personnel.

Qualifications, identity, authority and workforce records remain canonical OMNII relationships.

## 10. Infrastructure composition

Movement legs may require infrastructure capabilities including:

- road;
- bridge;
- station;
- terminal;
- gate;
- platform;
- port/berth;
- airport/stand;
- garage;
- charging/fueling;
- maintenance;
- accessibility;
- emergency facilities.

Infrastructure ownership remains with its canonical source.

## 11. Product extraction

A product can be created by selecting a coherent capability bundle:

```text
CANONICAL CAPABILITIES
        ↓
CHARTER COMPOSITION
        ↓
PRODUCT / WORKFLOW / SERVICE
        ↓
HANDOFF CONTRACT
```

Examples include door-to-door mobility, fleet operations, recovery, executive movement, cargo movement, pilgrimage transport, accessible mobility and government transport workflows.

The product receives references/contracts, not a forked copy of the canonical ontology.

## 12. External integration

Government systems, public transport, private operators, fleet platforms, registries, infrastructure systems, telemetry and other providers are integrated through adapters/contracts.

External integration must not become a hidden canonical dependency. Provider-specific identifiers remain mapped to canonical OMNII objects and relationships.

## 13. Value boundary

Charter may carry movement requirements and workflow references to economic activity, but it does not implement a parallel payment, settlement, pricing or money primitive. Value movement is delegated to **IO**.

## 14. Evidence and future openness

The registry can represent verified, reported, inferred, unknown, hypothetical and future capabilities while preserving evidence status. The ability to represent a future or extraterrestrial movement capability is not evidence that such a capability currently exists.

## 15. Architectural invariant

> **Register once. Compose many times. Execute through canonical state and events. Hand off through contracts. Never duplicate the source of truth.**
