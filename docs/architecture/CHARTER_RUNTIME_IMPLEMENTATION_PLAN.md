# CHARTER — Runtime Implementation & Product Extraction Plan

**Status:** Implementation-ready architecture plan
**Domain:** Universal transport / movement

## Objective

Move Charter from a complete compositional architecture into executable runtime capability while preserving OMNII's existing canonical primitives and persistence abstractions.

## Runtime modules

### 1. Capability Registry

Responsibilities:

- register and resolve movement capabilities;
- expose capability state, availability, capacity and constraints;
- preserve canonical object references;
- support version/provenance;
- resolve external-provider identifiers through adapters.

### 2. Journey Composer

Responsibilities:

- accept movement intent;
- discover candidate capabilities;
- compose legs and handoffs;
- validate dependencies;
- produce an executable journey plan;
- preserve the canonical journey/event graph.

### 3. Assignment & Dispatch

Responsibilities:

- assign assets and qualified personnel;
- reserve capabilities;
- track assignment state;
- handle cancellation and replacement;
- emit canonical events.

### 4. Availability & Capacity

Responsibilities:

- contextual availability;
- capacity constraints;
- location/position;
- readiness/condition;
- operator and authority requirements.

### 5. Recovery

Responsibilities:

- detect journey/asset exceptions;
- locate recovery capability;
- match specialists/equipment;
- substitute movement;
- recompose remaining journey legs;
- preserve incident and recovery evidence.

### 6. Infrastructure & Adapter Gateway

Responsibilities:

- integrate external transport systems;
- normalize provider identifiers;
- consume infrastructure/network state;
- isolate provider-specific protocols;
- prevent external systems becoming canonical dependencies.

## Canonical runtime rule

All runtime modules must use the existing OMNII object, identity, lifecycle, authority, relationship, event and persistence abstractions where applicable. No Charter-specific replacement primitive is permitted.

## Suggested implementation order

```text
CAPABILITY REGISTRY
        ↓
AVAILABILITY / CAPACITY
        ↓
JOURNEY COMPOSER
        ↓
ASSIGNMENT / DISPATCH
        ↓
RECOVERY
        ↓
INFRASTRUCTURE / ADAPTERS
        ↓
PRODUCT EXTRACTION
```

Each stage should be independently testable and composable.

## First executable composition

### Door-to-Door Mobility

Input:

- origin;
- destination;
- requested time/window;
- passenger/cargo requirements;
- accessibility/special requirements;
- authority constraints where relevant.

Output:

- composed movement legs;
- selected capabilities;
- required personnel;
- infrastructure dependencies;
- timing;
- handoffs;
- monitoring requirements;
- recovery plan;
- canonical journey/events.

## Product extraction

Once the first composition is stable, extract bounded products from the same substrate rather than creating independent implementations.

Initial candidates:

- door-to-door mobility;
- roadside recovery;
- fleet operations;
- specialist dispatch;
- accessible mobility;
- cargo movement;
- executive/private movement.

## Verification requirements

Before declaring a runtime capability complete:

- typecheck/build succeeds;
- unit tests cover state transitions;
- composition tests cover multimodal journeys;
- failure tests cover cancellation/delay/breakdown;
- authorization tests cover invalid authority;
- evidence tests cover provenance/state;
- adapter tests isolate provider-specific behavior;
- handoff tests prove canonical references survive extraction.

## Economic boundary

Transport workflows may expose requirements or references for economic activity, but runtime value movement remains delegated to IO.

## Completion invariant

> **Charter runtime is a set of independently testable movement capabilities that compose into journeys and products while retaining one canonical OMNII source of truth.**
