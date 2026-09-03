# OMNII Runtime Activation Layer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Activate a domain-neutral OMNII runtime loop from intake through governed execution, evidence, reconciliation and feedback using the existing canonical persistence layer.

**Architecture:** Extend `packages/omnii-runtime` with small, composable runtime contracts. Persist durable process/execution/evidence/reconciliation state in `omnii-canonical`; use Edge Functions only as server-side entry/dispatch boundaries; keep domain applications as consumers of the runtime rather than owners of its semantics.

**Tech Stack:** TypeScript, existing `packages/omnii-runtime`, Supabase PostgreSQL 17, Supabase Edge Functions/Deno, existing OMNII schema and tests.

**Spec:** `docs/superpowers/specs/2026-09-03-omnii-runtime-activation-design.md`

## Global Constraints

- Preserve the canonical distinction between command, execution, outcome, evidence, event and state.
- Preserve explicit identity/authority boundaries; an AI recommendation never creates authority.
- Reuse existing canonical tables before adding new persistence.
- Every new application-facing table/function must be RLS-protected or exposed only through controlled server-side execution.
- All consequential operations require correlation and idempotency identifiers.
- Failed or incomplete execution must never silently project authoritative completion state.
- Changes must remain domain-neutral and reusable by NASC, transport, culture, media and future institutional deployments.

---

### Task 1: Runtime Contract Inventory

**Files:**
- Read/modify: `packages/omnii-runtime/src/index.ts`
- Read: `packages/omnii-runtime/src/operating-context-runtime.ts`
- Read: existing runtime contract/type files discovered under `packages/omnii-runtime/src/`
- Test: existing runtime test locations discovered under `packages/omnii-runtime/`

**Interfaces:**
- Consumes: existing `OperatingContextRuntime` and exported runtime contracts.
- Produces: a documented list of reusable runtime interfaces and stable import paths for `RuntimeSignal`, `AuthorityResolution`, `DispatchDecision`, `ExecutionRequest`, `ExecutionResult`, `EvidenceRecord`, `ReconciliationResult`, and `FeedbackObservation`.

- [ ] **Step 1: Inspect runtime exports and existing tests**

```bash
git grep -n "export.*Runtime\|interface.*Context\|type.*Context" packages/omnii-runtime/src packages/omnii-runtime/tests || true
```

- [ ] **Step 2: Identify existing contracts that already represent the planned objects**

```bash
git grep -n "Execution\|Evidence\|Reconciliation\|Feedback\|Automation\|Authority\|Correlation\|Idempot" packages/omnii-runtime/src
```

- [ ] **Step 3: Record gaps in the implementation notes**

Create `packages/omnii-runtime/docs/runtime-contract-inventory.md` containing a table with columns `Concept`, `Existing Contract`, `Reuse`, `New Contract`, `Persistence` and populate it from the codebase inspection.

- [ ] **Step 4: Run the package test suite**

Run:

```bash
pnpm --filter omnii-runtime test
```

Expected: PASS or an accurately documented existing failure that is unrelated to this build.

- [ ] **Step 5: Commit**

```bash
git add packages/omnii-runtime/docs/runtime-contract-inventory.md
git commit -m "docs(runtime): inventory activation contracts"
```

### Task 2: Canonical Signal Envelope

**Files:**
- Create: `packages/omnii-runtime/src/runtime-signal.ts`
- Modify: `packages/omnii-runtime/src/index.ts`
- Test: `packages/omnii-runtime/src/__tests__/runtime-signal.test.ts`

**Interfaces:**
- Consumes: existing operating-context identifiers and canonical event conventions.
- Produces: `RuntimeSignal`, `createRuntimeSignal(input)`, and `signalIdempotencyKey(signal)`.

- [ ] **Step 1: Write failing tests**

```ts
import { describe, expect, it } from "vitest";
import { createRuntimeSignal, signalIdempotencyKey } from "../runtime-signal";

describe("runtime signal", () => {
  it("normalizes required routing and provenance fields", () => {
    const signal = createRuntimeSignal({
      source: "test",
      eventType: "test.requested",
      payload: { value: 1 },
      correlationId: "corr-1",
      idempotencyKey: "idem-1",
    });

    expect(signal.source).toBe("test");
    expect(signal.eventType).toBe("test.requested");
    expect(signal.correlationId).toBe("corr-1");
    expect(signal.idempotencyKey).toBe("idem-1");
    expect(signal.receivedAt).toBeTypeOf("string");
  });

  it("uses the supplied idempotency key unchanged", () => {
    const signal = createRuntimeSignal({
      source: "test",
      eventType: "test.requested",
      payload: {},
      correlationId: "corr-2",
      idempotencyKey: "idem-2",
    });

    expect(signalIdempotencyKey(signal)).toBe("idem-2");
  });
});
```

- [ ] **Step 2: Run the test and verify it fails**

```bash
pnpm --filter omnii-runtime vitest run src/__tests__/runtime-signal.test.ts
```

Expected: FAIL because the module does not yet exist.

- [ ] **Step 3: Implement the minimal contract**

```ts
export interface RuntimeSignal<T = unknown> {
  id: string;
  receivedAt: string;
  source: string;
  eventType: string;
  payload: T;
  correlationId: string;
  idempotencyKey: string;
  operatingContextId?: string;
  actorId?: string;
  subjectId?: string;
  institutionId?: string;
  domain?: string;
  location?: Record<string, unknown>;
  provenance?: Record<string, unknown>;
}

export function createRuntimeSignal<T>(input: Omit<RuntimeSignal<T>, "id" | "receivedAt">): RuntimeSignal<T> {
  return { ...input, id: crypto.randomUUID(), receivedAt: new Date().toISOString() };
}

export function signalIdempotencyKey(signal: RuntimeSignal): string {
  return signal.idempotencyKey;
}
```

- [ ] **Step 4: Run the test and verify it passes**

```bash
pnpm --filter omnii-runtime vitest run src/__tests__/runtime-signal.test.ts
```

Expected: PASS.

- [ ] **Step 5: Export the contract**

```ts
export * from "./runtime-signal";
```

- [ ] **Step 6: Commit**

```bash
git add packages/omnii-runtime/src/runtime-signal.ts packages/omnii-runtime/src/index.ts packages/omnii-runtime/src/__tests__/runtime-signal.test.ts
git commit -m "feat(runtime): add canonical signal envelope"
```

### Task 3: Governed Resolver Pipeline

**Files:**
- Create: `packages/omnii-runtime/src/runtime-resolver.ts`
- Modify: `packages/omnii-runtime/src/index.ts`
- Test: `packages/omnii-runtime/src/__tests__/runtime-resolver.test.ts`

**Interfaces:**
- Consumes: `RuntimeSignal`, existing operating-context runtime.
- Produces: `AuthorityResolution`, `DispatchDecision`, `resolveRuntimeSignal(signal, dependencies)`.

- [ ] **Step 1: Write failing tests for missing authority and successful resolution**

```ts
import { describe, expect, it } from "vitest";
import { resolveRuntimeSignal } from "../runtime-resolver";

describe("runtime resolver", () => {
  it("blocks consequential execution when authority is unresolved", async () => {
    const result = await resolveRuntimeSignal(
      { id: "s1", receivedAt: "2026-09-03T00:00:00Z", source: "t", eventType: "x", payload: {}, correlationId: "c", idempotencyKey: "i" },
      { resolveContext: async () => null, resolveAuthority: async () => null, matchRoute: async () => ({ routeId: "r1" }) },
    );

    expect(result.dispatch.allowed).toBe(false);
    expect(result.dispatch.reason).toBe("authority_unresolved");
  });

  it("returns an executable route when context and authority resolve", async () => {
    const result = await resolveRuntimeSignal(
      { id: "s2", receivedAt: "2026-09-03T00:00:00Z", source: "t", eventType: "x", payload: {}, correlationId: "c2", idempotencyKey: "i2" },
      {
        resolveContext: async () => ({ id: "ctx-1" }),
        resolveAuthority: async () => ({ id: "auth-1", scope: ["x"] }),
        matchRoute: async () => ({ routeId: "r2", workflowVersion: "v1" }),
      },
    );

    expect(result.dispatch.allowed).toBe(true);
    expect(result.dispatch.routeId).toBe("r2");
  });
});
```

- [ ] **Step 2: Run the test and confirm failure**

```bash
pnpm --filter omnii-runtime vitest run src/__tests__/runtime-resolver.test.ts
```

Expected: FAIL because the resolver does not yet exist.

- [ ] **Step 3: Implement the resolver as pure orchestration around injected dependencies**

It must evaluate context first, then authority, then route; it must not perform execution itself. Return an explicit denial reason for unresolved context/authority and preserve the signal correlation id.

- [ ] **Step 4: Run focused tests**

```bash
pnpm --filter omnii-runtime vitest run src/__tests__/runtime-resolver.test.ts
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add packages/omnii-runtime/src/runtime-resolver.ts packages/omnii-runtime/src/index.ts packages/omnii-runtime/src/__tests__/runtime-resolver.test.ts
git commit -m "feat(runtime): add governed signal resolver"
```

### Task 4: Execution Controller Contract

**Files:**
- Create: `packages/omnii-runtime/src/execution-controller.ts`
- Modify: `packages/omnii-runtime/src/index.ts`
- Test: `packages/omnii-runtime/src/__tests__/execution-controller.test.ts`

**Interfaces:**
- Consumes: `DispatchDecision`, execution control policy, executor adapter.
- Produces: `ExecutionRequest`, `ExecutionResult`, `executeGoverned(request, adapter)`.

- [ ] **Step 1: Write failing tests**

Test that a disabled capability never reaches the executor and that a successful adapter result is wrapped with `startedAt`, `completedAt`, status, correlation id and evidence references.

- [ ] **Step 2: Run focused tests**

```bash
pnpm --filter omnii-runtime vitest run src/__tests__/execution-controller.test.ts
```

Expected: FAIL because the controller does not exist.

- [ ] **Step 3: Implement the controller**

Use an injected adapter interface:

```ts
export interface ExecutionAdapter {
  execute(request: ExecutionRequest): Promise<ExecutionAdapterResult>;
}
```

The controller must enforce `enabled`, `scope`, preconditions and idempotency before calling the adapter. It must never convert a failed adapter result into success.

- [ ] **Step 4: Run focused tests**

```bash
pnpm --filter omnii-runtime vitest run src/__tests__/execution-controller.test.ts
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add packages/omnii-runtime/src/execution-controller.ts packages/omnii-runtime/src/index.ts packages/omnii-runtime/src/__tests__/execution-controller.test.ts
git commit -m "feat(runtime): add governed execution controller"
```

### Task 5: Evidence and State Projection

**Files:**
- Create: `packages/omnii-runtime/src/evidence-projector.ts`
- Modify: `packages/omnii-runtime/src/index.ts`
- Test: `packages/omnii-runtime/src/__tests__/evidence-projector.test.ts`

**Interfaces:**
- Consumes: `ExecutionResult` and state projection policy.
- Produces: `EvidenceRecord`, `StateProjection`, `projectOutcome(result, policy)`.

- [ ] **Step 1: Write failing tests**

Verify success produces an evidence record and an allowed state projection, while failure produces evidence of failure but `canProjectCompletion=false`.

- [ ] **Step 2: Run focused tests and confirm failure**

```bash
pnpm --filter omnii-runtime vitest run src/__tests__/evidence-projector.test.ts
```

- [ ] **Step 3: Implement projection rules**

Never infer completion solely from command acceptance. Completion requires an execution outcome satisfying the configured completion predicate.

- [ ] **Step 4: Run focused tests**

```bash
pnpm --filter omnii-runtime vitest run src/__tests__/evidence-projector.test.ts
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add packages/omnii-runtime/src/evidence-projector.ts packages/omnii-runtime/src/index.ts packages/omnii-runtime/src/__tests__/evidence-projector.test.ts
git commit -m "feat(runtime): separate evidence from state projection"
```

### Task 6: Reconciliation and Feedback Pipeline

**Files:**
- Create: `packages/omnii-runtime/src/reconciliation-runtime.ts`
- Create: `packages/omnii-runtime/src/feedback-runtime.ts`
- Modify: `packages/omnii-runtime/src/index.ts`
- Test: `packages/omnii-runtime/src/__tests__/reconciliation-runtime.test.ts`
- Test: `packages/omnii-runtime/src/__tests__/feedback-runtime.test.ts`

**Interfaces:**
- Consumes: expected state, observed state, projected state, evidence.
- Produces: `ReconciliationResult`, `FeedbackObservation`.

- [ ] **Step 1: Write failing reconciliation tests**

Test equal expected/observed state returns `matched=true`, while a difference produces `matched=false` and a structured discrepancy suitable for persistence as `omnii_reconciliations` / `omnii_control_findings`.

- [ ] **Step 2: Write failing feedback tests**

Test that a completed outcome can emit feedback/value observations without assuming that the observation is monetary.

- [ ] **Step 3: Run focused tests and confirm failure**

```bash
pnpm --filter omnii-runtime vitest run src/__tests__/reconciliation-runtime.test.ts src/__tests__/feedback-runtime.test.ts
```

- [ ] **Step 4: Implement deterministic reconciliation and feedback builders**

Keep domain-specific valuation logic outside the generic runtime; emit normalized observations for downstream Pulse/value modules.

- [ ] **Step 5: Run focused tests**

```bash
pnpm --filter omnii-runtime vitest run src/__tests__/reconciliation-runtime.test.ts src/__tests__/feedback-runtime.test.ts
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add packages/omnii-runtime/src/reconciliation-runtime.ts packages/omnii-runtime/src/feedback-runtime.ts packages/omnii-runtime/src/index.ts packages/omnii-runtime/src/__tests__/reconciliation-runtime.test.ts packages/omnii-runtime/src/__tests__/feedback-runtime.test.ts
git commit -m "feat(runtime): add reconciliation and feedback pipeline"
```

### Task 7: Supabase Persistence Adapter

**Files:**
- Create/modify: existing Supabase adapter location discovered during Task 1, preferably `packages/omnii-runtime/src/adapters/supabase-runtime-adapter.ts`
- Test: `packages/omnii-runtime/src/__tests__/supabase-runtime-adapter.test.ts`
- Migrations: only if Task 1 proves an existing table cannot represent the required records; add the smallest additive migration under the repository's established migration path.

**Interfaces:**
- Consumes: runtime contracts from Tasks 2–6.
- Produces: persisted signal/execution/evidence/reconciliation/feedback records keyed by correlation and idempotency identifiers.

- [ ] **Step 1: Map each runtime record to existing tables**

Use the current `omnii-canonical` schema and prioritize `omnii_events`, `omnii_executions`, `omnii_audit`, `omnii_reconciliations`, `omnii_control_findings`, `omnii_economic_events`, `omnii_agent_runs`, and `omnii_operating_contexts`.

- [ ] **Step 2: Write adapter tests against mocked Supabase calls**

Verify insert/update payloads carry correlation id, idempotency key, operating context and provenance.

- [ ] **Step 3: Implement persistence with transactional/idempotent behavior**

Duplicate signal ids must return the existing persisted record rather than create a second execution chain.

- [ ] **Step 4: Run adapter tests**

```bash
pnpm --filter omnii-runtime vitest run src/__tests__/supabase-runtime-adapter.test.ts
```

Expected: PASS.

- [ ] **Step 5: Run database validation**

Use the Supabase project `fomkrgrsqakabftymbjn` to confirm the target tables, RLS state and required indexes/policies. Run the project's security and performance advisors after any migration.

- [ ] **Step 6: Commit**

```bash
git add packages/omnii-runtime/src/adapters packages/omnii-runtime/src/__tests__ migrations
git commit -m "feat(runtime): persist activation loop in canonical database"
```

### Task 8: Supabase Edge Function Runtime Entry Point

**Files:**
- Create/modify: existing Edge Function source path following the repository's current Supabase layout, `supabase/functions/omnii-runtime/index.ts`
- Test: Edge Function request/response tests using the repository's established Deno test conventions.

**Interfaces:**
- Consumes: HTTP/webhook runtime signals.
- Produces: accepted signal response with correlation id and durable execution-chain identifiers.

- [ ] **Step 1: Write request validation tests**

Cover missing event type, missing correlation/idempotency key, malformed payload and valid signal.

- [ ] **Step 2: Implement the intake handler**

Validate envelope, construct `RuntimeSignal`, persist it, resolve context/authority, and dispatch only when governed execution is allowed.

- [ ] **Step 3: Implement response semantics**

Return `202` for accepted asynchronous work, `200` for idempotently replayed completed work, `403` for authority denial, and `422` for invalid envelopes.

- [ ] **Step 4: Run the function tests**

Use the repository's established Deno test command and verify all branches.

- [ ] **Step 5: Deploy the Edge Function**

Deploy through the connected Supabase project and confirm the function is active.

- [ ] **Step 6: Commit**

```bash
git add supabase/functions/omnii-runtime
git commit -m "feat(runtime): add governed intake edge function"
```

### Task 9: End-to-End Runtime Probe

**Files:**
- Create: `packages/omnii-runtime/src/__tests__/activation-e2e.test.ts`
- Create: `docs/operations/OMNII_RUNTIME_ACTIVATION.md`

**Interfaces:**
- Consumes: all runtime components from Tasks 2–8.
- Produces: an executable proof of the complete chain and operator documentation.

- [ ] **Step 1: Write the end-to-end test around one synthetic institutional event**

The test must assert the persisted chain:

`signal → context → authority → route → execution → evidence → event/state → reconciliation → feedback`

and assert every record shares the expected correlation id.

- [ ] **Step 2: Run the E2E test and diagnose failures without weakening invariants**

```bash
pnpm --filter omnii-runtime vitest run src/__tests__/activation-e2e.test.ts
```

- [ ] **Step 3: Add operational runbook**

Document health checks, correlation-id lookup, replay behavior, failure/retry states, disable/kill behavior, and how NASC/transport/culture/media should bind to the runtime.

- [ ] **Step 4: Run the full runtime test suite**

```bash
pnpm --filter omnii-runtime test
```

Expected: PASS.

- [ ] **Step 5: Verify Supabase security/performance advisors**

Confirm no new high-severity findings were introduced. Record any accepted low-severity findings with rationale.

- [ ] **Step 6: Commit**

```bash
git add packages/omnii-runtime/src/__tests__/activation-e2e.test.ts docs/operations/OMNII_RUNTIME_ACTIVATION.md
git commit -m "test(runtime): prove end-to-end activation loop"
```

### Task 10: Bind the First Real Domain Adapter

**Files:**
- Modify: the first target domain integration selected from the existing projects; prefer NASC because `omnii_nasc_form_workflows` already exists.
- Test: corresponding integration tests.

**Interfaces:**
- Consumes: generic runtime intake and workflow contracts.
- Produces: one real domain flow that does not duplicate runtime logic.

- [ ] **Step 1: Select one existing NASC form/workflow that already exists in canonical persistence**
- [ ] **Step 2: Write failing integration test proving the domain event enters through the generic runtime**
- [ ] **Step 3: Implement only the adapter/binding needed to map the NASC event/form into `RuntimeSignal` and back into the existing workflow state**
- [ ] **Step 4: Run the integration test**
- [ ] **Step 5: Confirm no domain-specific branching was added to the generic runtime**
- [ ] **Step 6: Commit**

```bash
git add .
git commit -m "feat(nasc): bind first domain flow to omnii runtime"
```
