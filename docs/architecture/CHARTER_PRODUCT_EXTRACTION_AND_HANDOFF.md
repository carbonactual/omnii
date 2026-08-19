# CHARTER — Product Extraction & Handoff Contract

**Status:** Canonical Charter build specification
**Domain:** Universal transport / movement

## Principle

> Build the capability once; compose it into products; hand off the composition without forking the canonical source.

## Extraction

A product is extracted from a coherent set of Charter capabilities and existing OMNII primitives.

```text
CANONICAL CAPABILITIES
        ↓
MOVEMENT COMPOSITION
        ↓
WORKFLOW / PRODUCT
        ↓
CONTRACT
        ↓
HANDOFF / DEPLOYMENT
```

## Handoff package

A handoff package should identify:

- purpose;
- scope;
- canonical references;
- inputs/outputs;
- interfaces;
- dependencies;
- authority requirements;
- evidence requirements;
- lifecycle/state requirements;
- events;
- security/privacy constraints;
- operational responsibilities;
- failure/recovery behavior;
- version/provenance.

## No fork rule

A receiving product, team or institution must not copy and redefine a canonical OMNII primitive merely to consume a Charter capability. It references the canonical source and owns its permitted implementation boundary.

## Example compositions

### Door-to-door mobility

`intent + discovery + availability + journey + route + movement + operator + infrastructure + monitoring + recovery`

### Recovery

`incident + location + diagnosis + recovery capability + specialist + equipment + dispatch + substitute movement`

### Fleet operations

`fleet + assets + condition + availability + operators + assignment + maintenance + journeys`

### Executive/private movement

`journey + access + premium movement capability + chauffeur/crew + infrastructure + itinerary`

### Cargo movement

`cargo + custody + capacity + route + transport + handling + interchange + delivery`

## Handoff safety

Handoff does not transfer authority, ownership or canonical truth unless an explicit canonical relationship says so. Responsibility for execution must be explicit.

## IO boundary

Any economic/value movement required by a product is delegated to IO. Charter may expose transport requirements and references but does not create payment, pricing, settlement or money primitives.

## Completion criterion

A Charter composition is handoff-ready when its purpose, canonical dependencies, interfaces, authority, evidence, lifecycle, events, responsibilities and recovery behavior are explicit.
