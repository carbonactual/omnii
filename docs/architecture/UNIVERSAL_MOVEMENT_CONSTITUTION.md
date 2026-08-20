# OMNII Universal Movement Constitution

## Status

**CANONICAL RUNTIME CONNECTION**

Universal Movement is the permanent movement abstraction. This document locks how the existing movement implementations connect without creating parallel movement primitives.

## Constitutional Graph

```text
Need / Want / Purpose
        │
        ▼
Universal Movement
        │
        ├──────────────► NAB
        │                  │
        │                  ├─ identity / registry
        │                  ├─ capability / availability
        │                  ├─ state / compliance
        │                  ├─ biography / evidence
        │                  └─ signals / provenance
        │
        ▼
     Charter
        │
        ├─ curate executable capability set
        ├─ compose legs and handoffs
        ├─ reserve / assign / execute
        ├─ adapt / recover
        └─ complete journey
        │
        ▼
Verified outcome
        │
        ├──────────────► NAB biography + state
        └──────────────► Pulse / ecosystem feedback
```

## One Journey Identity

A movement request produces one `charter:journey` object. Universal Movement adds the movement mode and purpose semantics to that object instead of creating a second journey object for each product.

The same journey identity is therefore used by Charter for execution and by NAB for biography, state assertions and evidence.

## Product Modes

The runtime recognizes product intent as configuration:

- `charter` — organised and coordinated movement;
- `pilgrim` — purpose-driven, multi-stage journey;
- `social` — non-commercial or community-oriented movement;
- `commercial` — commercial movement service;
- `emergency` — urgent specialised movement;
- `logistics` — goods/freight movement.

These modes do not define separate movement substrates. They constrain or enrich the same Universal Movement request with purpose, need, want, services and stages.

## Pilgrim Boundary

Pilgrim is not another transport engine.

Pilgrim expresses a journey purpose and composition over Universal Movement. Charter supplies executable movement capabilities and handoffs when transport is required. NAB supplies reusable actor, capability, state and evidence context. A pilgrimage may therefore combine walking, vehicles, guides, accommodation, emergency support, community services and other compatible capabilities within one journey identity.

## NAB Boundary

NAB is the trusted movement knowledge layer. It can be queried for reusable context and can receive verified movement outcomes. A feed or observation does not become legal authority merely because it is present in NAB; authority remains explicit in the canonical object and policy model.

## Runtime Boundary

`MovementConstitutionRuntime` is the seam that prevents product fragmentation:

```text
MovementConstitutionRuntime
├── CharterRuntime
└── NABRuntime
    └── shared ObjectRuntime / RelationshipRuntime / PersistencePort
```

The runtime deliberately does not duplicate Charter planning or NAB storage logic. It composes both over one persistence boundary.

## Outcome Loop

```text
plan → execute → observe → record event/state → biography → Pulse
```

Movement history is therefore not an isolated transport log. It becomes reusable ecosystem memory attached to the journey and its participating entities.

## Architectural Lock

New movement products must compose the Universal Movement substrate. They may introduce a new mode or capability vocabulary when constitutionally justified, but they must not introduce an incompatible journey identity, parallel routing primitive, or product-specific registry that duplicates NAB.
