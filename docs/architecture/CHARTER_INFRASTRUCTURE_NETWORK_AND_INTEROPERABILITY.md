# CHARTER — Infrastructure, Network & Interoperability Layer

**Status:** Canonical Charter build specification
**Domain:** Universal transport / movement
**Boundary:** Charter composes movement; canonical ownership remains with OMNII sources; IO owns value movement.

## Purpose

Connect movement capabilities to the physical and digital infrastructure that enables them, while allowing government, public, private and external transport systems to interoperate through adapters.

## Infrastructure graph

```text
PLACE / ORIGIN
  ↓
NETWORK
  ↓
NODE / STATION / TERMINAL / PORT / AIRPORT
  ↓
LINK / CORRIDOR / ROUTE
  ↓
MOVEMENT CAPABILITY
  ↓
NEXT NODE
```

Infrastructure can include roads, bridges, tunnels, rail, stations, terminals, airports, ports, marinas, waterways, airspace interfaces, depots, garages, parking, charging, fueling, maintenance, inspection, accessibility and emergency facilities.

## Network state

Infrastructure and network capabilities may expose:

- operational;
- restricted;
- congested;
- closed;
- maintenance;
- emergency;
- capacity-limited;
- weather-affected;
- unknown.

These states use canonical OMNII state/event semantics.

## Interoperability

External systems are connected through adapters and contracts rather than becoming hidden canonical dependencies.

Adapter categories may include:

- government/public transport systems;
- airport/port/terminal systems;
- fleet-management systems;
- reservation and ticketing systems;
- registry systems;
- mapping/routing systems;
- telemetry/IoT systems;
- autonomous-system interfaces;
- emergency/recovery systems;
- maintenance/MRO systems;
- external operator platforms.

Provider identifiers are mapped to canonical OMNII identities/objects/relationships where appropriate.

## Handoff

Interoperability must preserve:

- canonical identity;
- journey/leg relationship;
- authority context;
- state;
- evidence;
- responsibility/custody;
- timing;
- capability requirements.

An adapter translates an external system; it does not redefine OMNII.

## Government integration

Public infrastructure and government systems can participate through explicit interfaces and authority constraints. Charter does not infer permission merely from technical connectivity.

## Autonomous systems

Autonomous vehicles, aircraft, drones and future systems may expose capability, position, status, authority and operational constraints through adapters. Safety-critical authorization remains governed by the applicable canonical authority/policy layer.

## Data and event interoperability

Charter should consume and emit movement-domain events through existing OMNII event semantics, including changes to availability, location, assignment, incident, infrastructure state, journey progress and handoff.

## Boundary

Charter does not create a parallel identity, registry, authority, economic, payment or universal data primitive. It composes the existing architecture into a transport network context.

## Invariant

> **Connect systems at the boundary; keep the canonical truth inside the ecosystem.**
