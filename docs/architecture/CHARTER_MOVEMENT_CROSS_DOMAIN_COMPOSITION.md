# CHARTER — Movement Cross-Domain Composition Contract

**Status:** Canonical architecture boundary

## Purpose

Define how Charter composes capabilities owned by other OMNII domains without absorbing them.

## Composition matrix

| Domain | Owns | Charter consumes |
|---|---|---|
| HAPI | human/agent identity, capability, qualification, progression | eligible operator/agent capability |
| Fleet | organizational asset operations | asset availability, readiness, assignment |
| Logistico | goods-flow workflow | cargo movement requirements |
| NAB | national automobile biography/registry composition | vehicle/automobile registry references |
| Pilgrim | pilgrimage journey experience | movement intent/context |
| Hitch | hitchhiking journey experience | movement matching capability |
| Charter | universal movement execution | all relevant movement capabilities |
| IO | value movement | value-operation requirements/references |
| ABBA | ecosystem intelligence/orchestration | decisions, recommendations and coordination |

## Rule

A domain may request a Charter movement capability, but Charter does not inherit the domain's business model or become its system of record.

## Journey composition

A single journey can legitimately combine several domains:

```text
PERSON / AGENT
   ↓ HAPI
MOVEMENT INTENT
   ↓ Pilgrim / Hitch / other context
CHARTER JOURNEY
   ├── FLEET asset
   ├── HAPI operator
   ├── LOGISTICO cargo context
   ├── NAB vehicle provenance
   ├── infrastructure
   └── recovery
        ↓
     execution
        ↓
       IO
```

## Product extraction

This contract makes it possible to build or hand off a product around any bounded workflow while preserving the same movement substrate.

Examples include door-to-door mobility, fleet operations, logistics, pilgrimage transport, hitchhiking, executive movement, recovery, specialist transport and future modes.

## Future-mode rule

Unknown or future movement modes are represented as capabilities and evidence when sufficiently known. Speculative modes must remain explicitly speculative; they must not contaminate canonical factual state.

## Non-overlap invariant

> **Domains provide context and capabilities; Charter composes and executes movement; IO moves value.**
