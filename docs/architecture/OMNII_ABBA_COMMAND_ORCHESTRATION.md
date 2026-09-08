# OMNII ABBA Command Orchestration

**Status:** Canonical architecture contract — 2026-09-08

## Position

ABBA is the single intelligence and orchestration boundary for Carbon Actual. There is no separate command-intelligence layer above or beside ABBA.

`Human / HAPI → ABBA → Common Context + Relationships → CACF → TEAM / MISSION → Authority / Approval → Governed Execution → Evidence / Actual / Pulse → Learning → ABBA`

## ABBA command responsibility

ABBA may:

- understand a request and preserve its principal, context, correlation and idempotency identity;
- inspect supplied relationship context;
- discover and rank canonical capabilities through CACF;
- compose provider implementations without making providers constitutional;
- identify capability gaps rather than inventing nonexistent services;
- hand a viable composition to TEAM, Mission Intelligence, authority and execution controls;
- observe outcomes and consume learning evidence.

ABBA command orchestration does not itself execute external mutations.

## Boundary invariant

The command result is explicitly non-executable. Provider selection is not authorization. A capability route is not a mission. Mission readiness is not permission. Learning evidence cannot widen authority.

## Relationships

Relationships are context for ABBA reasoning, not a substitute for canonical graph state. Product and institutional surfaces may supply relationship references; canonical relationship semantics remain owned by the Common Layer/graph runtime.

## Open-world behavior

An unknown capability produces a `CAPABILITY_GAP`. ABBA must not invent a provider, synthesize a credential, or silently reinterpret a missing capability as authorization to use another unrelated capability.

## Provider independence

CACF may expose multiple implementations of the same canonical capability. ABBA may select among them using static descriptor constraints and governed selection evidence. Provider outage, cost, latency, schema or policy changes remain runtime/provider facts.

## Product rule

OMNI/ACTUAL is the operational surface and current-state projection. ABBA is the intelligence/orchestration center. NAIRE, NGIN, RITES/continuity, HAPI World and domain products consume ABBA and common capabilities according to their boundaries; they do not create competing universal command-intelligence layers.
