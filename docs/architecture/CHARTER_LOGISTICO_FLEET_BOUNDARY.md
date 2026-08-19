# CHARTER — Logistico & Fleet Composition Boundary

**Status:** Canonical boundary specification
**Domain:** Transport / movement

## Principle

Charter remains the universal movement composition domain. **Logistico** and **Fleet** are specialized compositions built from Charter capabilities; they do not create competing movement primitives.

## Logistico

Logistico composes transport capabilities around goods and logistics workflows:

- shipment discovery and planning;
- pickup and delivery;
- cargo capacity and compatibility;
- loading, unloading and handling;
- custody and handoff;
- route and waypoint orchestration;
- warehousing/interchange references;
- fleet and operator assignment;
- tracking and exceptions;
- damage, delay and recovery workflows;
- specialist and heavy-haul movement;
- last-mile and door-to-door delivery.

Logistico owns the **logistics workflow context**. Charter remains the source of movement capabilities used by that workflow.

## Fleet

Fleet composes Charter capabilities around a collection of transport assets and their operational workforce:

- asset registry references;
- availability;
- location;
- condition/readiness;
- capacity;
- assignment;
- operator/crew requirements;
- maintenance scheduling;
- inspection;
- utilization;
- dispatch;
- incident/recovery;
- lifecycle and retirement references.

Fleet does not duplicate the canonical asset or identity system.

## Relationship

```text
                 OMNII CANONICAL OBJECTS
                         │
              ┌──────────┴──────────┐
              │                     │
           CHARTER               IO
        MOVEMENT DOMAIN       VALUE MOVEMENT
              │
       ┌──────┴──────┐
       │             │
   LOGISTICO       FLEET
       │             │
   goods flow    asset operations
       │             │
       └──────┬──────┘
              │
        shared Charter
        capabilities
```

## Example composition

A delivery can compose:

`cargo → pickup → vehicle capability → driver → route → depot → interchange → next vehicle → last mile → delivery`

Fleet supplies the operational asset/crew context. Logistico supplies the cargo movement workflow. Charter supplies the movement capabilities and journey execution substrate.

## Value boundary

Any pricing, payment, settlement, savings, ownership financing or other value movement is delegated to **IO**. Logistico and Fleet may express requirements and eligibility but must not implement a parallel money primitive.

## Handoff rule

Products can be extracted from these compositions independently. Each receives canonical references and explicit contracts rather than copied ontologies.

## Invariant

> **Charter moves; Logistico orchestrates goods movement; Fleet orchestrates asset operations; IO moves value.**
