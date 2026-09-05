# CHARTER Canonical Journey Runtime Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the approved CHARTER Journey design into a durable executable lifecycle with explicit persisted events, multimodal handoffs, disruption/recovery, evidence references, and compatibility with the existing OMNII runtime.

**Architecture:** Extend the existing `packages/omnii-runtime` primitives rather than creating a competing movement model. `CharterJourneyExecutionRuntime` owns journey execution semantics; OMNII object/relationship/persistence runtimes remain canonical for objects, relationships and persistence. Events/evidence are represented as canonical runtime objects/references, and recovery recomposes a journey without erasing its event history.

**Tech Stack:** TypeScript, Node test runner, existing OMNII runtime, existing persistence adapter, existing object/relationship runtimes.

**Spec:** `docs/superpowers/specs/2026-09-01-charter-canonical-journey-runtime-design.md`

## Global Constraints

- CHARTER owns journey composition, movement execution and recovery semantics; it does not own identity, regulatory authority, money, payment, settlement, financing or token issuance.
- Reuse existing OMNII object, relationship and persistence primitives; do not create a competing universal evidence store.
- Every material journey transition is explicit, attributable and persisted as an append-only event.
- Invalid lifecycle transitions must be rejected.
- Multimodal journeys preserve ordered legs and explicit handoffs.
- Recovery must preserve history and make replacement/recomposition explicit.
- Offline-first transport is enabled by the event/persistence contract but full provider integrations are out of scope for this slice.
- Existing capability registration and journey planning behavior must remain compatible.

---

### Task 1: Define canonical journey execution types and transition table

**Files:**
- Modify: `packages/omnii-runtime/src/charter-journey-execution-runtime.ts`
- Test: `packages/omnii-runtime/src/charter-journey-execution-runtime.test.ts`

**Interfaces:**
- Consumes: existing `ObjectRuntime`, `RelationshipRuntime`.
- Produces: `JourneyExecutionState`, `JourneyExecution`, transition validation, and execution methods for each lifecycle state.

- [ ] **Step 1: Write failing tests for the canonical state graph**

Test the allowed path `intent → discovery → eligibility → availability → reservation → assignment → preparation → pickup → active → handoff → completion → evidence → reconciliation → closed` and explicit exception states `cancelled`, `denied`, `delayed`, `disrupted`, `incident`, `abandoned`, `recovery`.

- [ ] **Step 2: Run the focused test and confirm failure**

Run: `npm test -- --test-name-pattern="canonical state graph"`
Expected: FAIL because the current runtime only exposes `planned|ready|active|delayed|blocked|completed|cancelled`.

- [ ] **Step 3: Implement the state union and transition guard**

Add a single transition table and reject any source/target pair not explicitly listed. Preserve the existing `start`, `progress`, `completeLeg`, `delay`, `block`, `cancel`, and `finish` methods as compatibility shims where their old semantics remain valid.

- [ ] **Step 4: Run focused tests**

Run: `npm test -- --test-name-pattern="canonical state graph"`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add packages/omnii-runtime/src/charter-journey-execution-runtime.ts packages/omnii-runtime/src/charter-journey-execution-runtime.test.ts
git commit -m "feat(charter): define canonical journey state graph"
```

### Task 2: Add append-only journey event persistence

**Files:**
- Create: `packages/omnii-runtime/src/charter-journey-events.ts`
- Test: `packages/omnii-runtime/src/charter-journey-events.test.ts`
- Modify: `packages/omnii-runtime/src/charter-journey-execution-runtime.ts`

**Interfaces:**
- Consumes: `ObjectRuntime`, `PersistencePort`, `JourneyExecutionState`.
- Produces: `CharterJourneyEvent`, `recordEvent()`, and `listJourneyEvents()`.

- [ ] **Step 1: Write failing event tests**

Verify each event contains `eventId`, `journeyId`, `eventType`, `actor/source`, `timestamp`, `priorState`, `resultingState`, `payload`, `provenance`, and optional `authorityRef`/`evidenceRefs`. Verify returned history is ordered and earlier events cannot be overwritten.

- [ ] **Step 2: Run focused test**

Run: `npm test -- --test-name-pattern="journey event persistence"`
Expected: FAIL because the event module does not exist.

- [ ] **Step 3: Implement canonical event object and append semantics**

Persist events through the existing object/persistence layer using a dedicated `charter:journey-event` object type. `recordEvent()` must reject a missing journey and must never mutate an existing event.

- [ ] **Step 4: Wire lifecycle methods to emit events**

Every successful state transition in the execution runtime must call `recordEvent()` with the previous and resulting state.

- [ ] **Step 5: Run focused tests**

Run: `npm test -- --test-name-pattern="journey event persistence"`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add packages/omnii-runtime/src/charter-journey-events.ts packages/omnii-runtime/src/charter-journey-events.test.ts packages/omnii-runtime/src/charter-journey-execution-runtime.ts
git commit -m "feat(charter): persist append-only journey events"
```

### Task 3: Add multimodal leg and handoff execution

**Files:**
- Create: `packages/omnii-runtime/src/charter-journey-handoff-runtime.ts`
- Test: `packages/omnii-runtime/src/charter-journey-handoff-runtime.test.ts`
- Modify: `packages/omnii-runtime/src/charter-journey-execution-runtime.ts`

**Interfaces:**
- Consumes: journey legs from the existing Charter planner, journey events.
- Produces: handoff validation and execution records that preserve `sequence`, `from`, `to`, `capabilityId`, and handoff state.

- [ ] **Step 1: Write failing tests for ordered legs and handoffs**

Verify that legs execute in sequence, that a handoff cannot occur before the current leg is completed, and that the next leg cannot become active until the handoff is completed.

- [ ] **Step 2: Run focused test**

Run: `npm test -- --test-name-pattern="multimodal handoff"`
Expected: FAIL.

- [ ] **Step 3: Implement handoff state tracking**

Add explicit handoff records linked to the Journey and affected legs. Emit `handoff:started` and `handoff:completed` events.

- [ ] **Step 4: Run focused test**

Run: `npm test -- --test-name-pattern="multimodal handoff"`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add packages/omnii-runtime/src/charter-journey-handoff-runtime.ts packages/omnii-runtime/src/charter-journey-handoff-runtime.test.ts packages/omnii-runtime/src/charter-journey-execution-runtime.ts
git commit -m "feat(charter): execute multimodal journey handoffs"
```

### Task 4: Add evidence references and closure/reconciliation

**Files:**
- Create: `packages/omnii-runtime/src/charter-journey-evidence.ts`
- Test: `packages/omnii-runtime/src/charter-journey-evidence.test.ts`
- Modify: `packages/omnii-runtime/src/charter-journey-execution-runtime.ts`

**Interfaces:**
- Consumes: journey events and canonical evidence references.
- Produces: `JourneyEvidenceReference`, `attachEvidence()`, `listJourneyEvidence()`, and closure validation.

- [ ] **Step 1: Write failing evidence tests**

Verify evidence may reference position, time, vehicle state, operator qualification, infrastructure state, connectivity, maintenance, compliance, incident/recovery, custody/handoff and authority provenance without copying those canonical systems into CHARTER.

- [ ] **Step 2: Run focused test**

Run: `npm test -- --test-name-pattern="journey evidence"`
Expected: FAIL.

- [ ] **Step 3: Implement evidence references**

Store references, source, timestamp and provenance as journey-linked records. Do not duplicate the referenced evidence payload as a new universal store.

- [ ] **Step 4: Implement closure invariant**

A Journey may enter `closed` only after completion plus evidence plus reconciliation have been recorded. A failed reconciliation must leave the journey in an explicit exception state.

- [ ] **Step 5: Run focused tests**

Run: `npm test -- --test-name-pattern="journey evidence"`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add packages/omnii-runtime/src/charter-journey-evidence.ts packages/omnii-runtime/src/charter-journey-evidence.test.ts packages/omnii-runtime/src/charter-journey-execution-runtime.ts
git commit -m "feat(charter): add evidence references and closure rules"
```

### Task 5: Add disruption, recovery and capability reassignment

**Files:**
- Create: `packages/omnii-runtime/src/charter-journey-recovery-runtime.ts`
- Test: `packages/omnii-runtime/src/charter-journey-recovery-runtime.test.ts`
- Modify: `packages/omnii-runtime/src/charter-journey-execution-runtime.ts`

**Interfaces:**
- Consumes: Journey, active leg, alternative capability IDs.
- Produces: recovery execution that records cause, replacement capability, old/new leg references and outcome.

- [ ] **Step 1: Write failing recovery tests**

Cover breakdown, unavailable capability, route obstruction and operator refusal. Verify the original journey history remains intact and a replacement capability can be assigned without deleting the failed one.

- [ ] **Step 2: Run focused test**

Run: `npm test -- --test-name-pattern="journey recovery"`
Expected: FAIL.

- [ ] **Step 3: Implement recovery state and recomposition**

Transition to `recovery`, create an explicit recovery event, select a supplied available replacement capability, create replacement leg metadata, and resume execution from the replacement leg.

- [ ] **Step 4: Reject unsafe or invalid replacements**

Require the replacement capability to have an allowed executable state and preserve the Journey's original service context. Do not bypass authority/policy checks.

- [ ] **Step 5: Run focused tests**

Run: `npm test -- --test-name-pattern="journey recovery"`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add packages/omnii-runtime/src/charter-journey-recovery-runtime.ts packages/omnii-runtime/src/charter-journey-recovery-runtime.test.ts packages/omnii-runtime/src/charter-journey-execution-runtime.ts
git commit -m "feat(charter): support journey disruption and recovery"
```

### Task 6: Regression and persistence round-trip coverage

**Files:**
- Modify: `packages/omnii-runtime/tests/charter-runtime.test.ts`
- Modify: `packages/omnii-runtime/src/charter-journey-execution-runtime.test.ts`
- Create: `packages/omnii-runtime/tests/charter-journey-runtime-integration.test.ts`

**Interfaces:**
- Consumes: completed runtime APIs from Tasks 1–5.
- Produces: executable proof that existing Charter registration/planning behavior remains intact while the new Journey lifecycle is persistent and auditable.

- [ ] **Step 1: Add an end-to-end test**

Create a capability, plan a two-leg journey, execute both legs, perform a handoff, attach evidence, trigger a disruption, recover to a replacement capability, complete, reconcile and close. Verify event history and evidence references survive a fresh runtime instance over the same persistence adapter.

- [ ] **Step 2: Run the complete runtime test suite**

Run: `npm run test:runtime`
Expected: PASS with zero failures.

- [ ] **Step 3: Run type checking**

Run: `npm run typecheck`
Expected: PASS with zero TypeScript errors.

- [ ] **Step 4: Run production build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add packages/omnii-runtime/tests/charter-runtime.test.ts packages/omnii-runtime/src/charter-journey-execution-runtime.test.ts packages/omnii-runtime/tests/charter-journey-runtime-integration.test.ts
git commit -m "test(charter): certify journey lifecycle and persistence"
```
