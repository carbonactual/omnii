# OMNII — Transport Network Certification Map

**Status:** Implementation certification layer  
**Date:** 2026-09-01  
**Scope:** CHARTER, NAB, Fleet, Logistico, Hitch, Pilgrim, Along, Green Mobility / Energy Bridge and CNGNEERS integration surfaces.

## Purpose

This document certifies what already exists in the Carbon Actual / OMNII ecosystem and separates:

1. canonical architecture;
2. executable runtime;
3. product composition;
4. agent definitions;
5. external integrations still required.

The objective is to prevent duplicate products or competing primitives.

## Existing architecture

### CHARTER

CHARTER is the universal movement layer. The repository already declares the transport architecture source-complete for product composition, including movement capability representation, multimodal journeys, graph continuity, routing/fallback, availability/assignment, execution/exception states, recovery, HAPI/Fleet/Logistico boundaries, NAB/Pilgrim/Hitch boundaries, service integrity, future-mode extensibility, product handoff and the IO value boundary.

### NAB

NAB is the automobile biography/registry composition. It should remain the authoritative vehicle/automobile record where applicable, while CHARTER references it rather than duplicating canonical automotive records.

### Fleet

Fleet is the organizational asset-operations layer over CHARTER capabilities: readiness, availability, assignment, maintenance, telemetry and operational movement.

### Logistico

Logistico owns goods/cargo movement workflow and custody over CHARTER journeys. Value movement remains an IO concern.

### Hitch / Pilgrim / Along

These are bounded product compositions over universal movement capabilities, not new movement primitives.

## Existing executable evidence

The OMNII repository contains an executable CHARTER runtime composition at:

`packages/omnii-runtime/src/charter-runtime.ts`

It also contains runtime tests for movement constitution and NAB biography/state behavior.

## Existing ecosystem evidence outside OMNII

The wider ecosystem contains product, agent and automation definitions for:

- Logistics / Transport / AfCFTA;
- Fleet;
- Green mobility and fleet energy;
- CNGNEERS technical workforce;
- SPARE for vehicle parts, workshops, EVs, robotics, drones and advanced mobility systems;
- HAPI identity/capability routing;
- ABBA orchestration and agent routing.

These should be integrated by reference and adapters rather than copied into CHARTER.

## Certification matrix

| Surface | Architecture | Runtime evidence | Product composition | Integration gap |
|---|---|---|---|---|
| CHARTER | Present | Present | Present | Live provider adapters, production interfaces |
| NAB | Present | Present/tests | Present | Government/registry integrations |
| Fleet | Present | Partial/shared | Present | Live telemetry, dispatch, maintenance providers |
| Logistico | Present | Agent/architecture evidence | Present | Live cargo/operator integrations |
| Hitch | Present | Composition/runtime target | Present | Discovery, availability and safety providers |
| Pilgrim | Present | Composition/runtime target | Present | Route/service provider integrations |
| Along | Present | Composition/runtime target | Present | Live corridor/availability data |
| Green Mobility / Energy Bridge | Present across ecosystem | Integration target | Present | Stations, charging, fuel/CNG provider integrations |
| CNGNEERS | Present in product canon | Workforce integration target | Present | Credential/booking/service execution integrations |
| SPARE | Present across ABBA ecosystem | Product implementation evidence | Present | Parts/vendor/service network integrations |

## Immediate implementation rule

Do not create another transport repository merely because a surface is not fully live. Implement missing functionality as:

- OMNII runtime capability;
- adapter;
- connector;
- registry;
- workflow;
- product interface;
- observability/evidence pipeline.

## Priority execution order

1. certify existing CHARTER runtime and tests;
2. connect NAB identity/biography references;
3. connect Fleet readiness/telemetry/maintenance;
4. connect Logistico cargo custody;
5. expose Hitch/Pilgrim/Along compositions;
6. connect Green Mobility / Energy Bridge station and energy data;
7. connect CNGNEERS workforce capability and SPARE maintenance flows;
8. wire evidence, observability and production external-provider adapters;
9. expose the complete transport network through OMNII/Actual without duplicating domain ownership.

## Non-duplication invariant

> OMNII is the constitutional and runtime composition layer. CHARTER supplies universal movement; NAB supplies automobile biography/registry; Fleet supplies organizational asset operations; Logistico supplies goods-flow workflow; HAPI supplies human/agent capability; IO supplies value movement. Products compose these capabilities.
