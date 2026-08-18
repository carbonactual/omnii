# OMNII Constitutional Runtime

**Build:** 24  
**Status:** Runtime materialization doctrine  
**Canonical authority:** OMNII Constitutional Index

## 1. Purpose

The constitutional runtime continuously enforces the distinction between what OMNII is, what it may do, and how implementation realizes those contracts.

Build 24 makes that boundary executable inside `@omnii/runtime` while preserving the rule that runtime implementation remains subordinate to constitutional meaning.

## 2. Materialized Components

Build 24 materializes:

- `constitutional.ts` — canonical constitutional types and invariants;
- `constitutional-registry.ts` — materialized doctrine registry and dependency graph;
- `constitutional-validator.ts` — runtime validation boundary;
- `constitutional-runtime.test.ts` — executable safeguards.

## 3. Constitutional Runtime Contract

```text
Doctrine
   ↓
Invariant
   ↓
Registry
   ↓
Dependency Validation
   ↓
Runtime Decision Boundary
   ↓
Evidence
```

A runtime implementation must not silently redefine the doctrine it implements.

## 4. Dependency Enforcement

The registry represents the constitutional progression:

```text
Architecture
→ Ecosystem
→ Semantics
→ Mathematics
→ Economics
→ Intelligence
→ Continuity
→ Territory
→ Ecology
→ Relationship
→ Governance
→ Authority
→ Consent
→ Being
→ Becoming
→ Civilization
```

Unknown dependencies are rejected. Dependency cycles are rejected.

## 5. OMNII / OMNI Enforcement

The runtime preserves:

```text
OMNII = canonical architecture
OMNI  = omnidirectional ecosystem movement state
ABBA  = constitutional orchestration intelligence
```

The runtime explicitly rejects declarations that redefine OMNI as:

- repository;
- operating system;
- governance;
- authority;
- runtime;
- platform.

This is a terminology-drift safeguard, not a general-purpose authorization mechanism.

## 6. Scope Boundary

The constitutional runtime does not claim to prove that the entire ecosystem is constitutionally compliant merely because the registry validates.

It validates the materialized doctrine graph and selected runtime invariants.

Production constitutional compliance additionally requires evidence from:

- code;
- tests;
- persistence;
- workflows;
- authority state;
- consent state;
- event history;
- deployment;
- operational observation.

## 7. Relationship to Existing Runtime

The existing OMNII runtime contains canonical object, relationship, graph, event, workflow, agent, authority, audit, ledger, persistence, and ABBA runtime surfaces. Build 24 provides a constitutional validation boundary for those implementations rather than replacing them.

## 8. Relationship to ABBA

ABBA may consume registry and validation results for constitutional reasoning and orchestration. ABBA remains subordinate to the constitutional architecture and cannot amend doctrine merely by executing runtime logic.

## 9. Extension Rule

New constitutional doctrines must be registered with:

- stable identifier;
- title;
- constitutional layer;
- dependencies;
- materialization status.

Any new dependency must be validated before the doctrine is treated as executable constitutional infrastructure.

## 10. Final Principle

> **The constitution constrains the runtime; the runtime does not silently become the constitution.**
