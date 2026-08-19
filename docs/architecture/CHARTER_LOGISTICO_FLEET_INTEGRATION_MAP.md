# CHARTER — Logistico & Fleet Integration Map

## Shared movement substrate

All three layers compose the same Charter capabilities:

- capability registry;
- availability;
- location/position;
- capacity;
- condition;
- assignment;
- workforce;
- infrastructure;
- journey legs;
- handoffs;
- monitoring;
- incidents;
- recovery.

## Logistico consumes

- cargo requirements;
- pickup/delivery intent;
- custody/handoff context;
- shipment legs;
- loading/handling requirements;
- destination and waypoint requirements.

## Fleet consumes

- asset identity references;
- capability requirements;
- assignment requests;
- maintenance/inspection requirements;
- operator requirements;
- utilization and readiness state.

## Charter provides

The movement execution context connecting people, assets, infrastructure and journeys.

## Product extraction

A future Logistico or Fleet product can be handed off independently because its boundary is explicit. Neither needs to recreate Charter's identity, lifecycle, authority or relationship primitives.

## Economic separation

No economic implementation is introduced here. Value-related workflows remain IO compositions.
