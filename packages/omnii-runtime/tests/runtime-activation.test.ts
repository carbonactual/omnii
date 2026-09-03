import assert from "node:assert/strict";
import { test } from "node:test";
import { AuthorityRecord, AuthorityRuntime } from "../src/authority-runtime";
import { EventStore } from "../src/event-runtime";
import { ExecutionRuntime } from "../src/execution-runtime";
import { MemoryPersistenceAdapter } from "../src/persistence";
import { OperatingContext } from "../src/operating-context-runtime";
import { createRuntimeSignal } from "../src/runtime-signal";
import { RuntimeActivation } from "../src/runtime-activation";

const context: OperatingContext = {
  id: "ctx-1",
  subjectId: "operator-1",
  mode: "test",
  capacity: "operator",
  jurisdiction: "NG",
  validFrom: "2026-09-03T00:00:00Z",
};

async function fixture() {
  const persistence = new MemoryPersistenceAdapter();
  const events = new EventStore(persistence);
  const authorities = new AuthorityRuntime({ persistence, events });
  const executions = new ExecutionRuntime(events, persistence);
  const root: AuthorityRecord = {
    id: "auth-1",
    subject: "operator-1",
    issuer: "governance",
    scope: ["service.execute"],
    capabilities: ["service.execute"],
    constraints: {},
    context: {},
    issued_at: "2026-09-03T00:00:00Z",
    revocable: true,
    version: "1",
    status: "active",
  };
  await persistence.create("authorities", root);
  return { events, authorities, executions };
}

test("RuntimeActivation completes the governed loop and is replay-safe", async () => {
  const { events, authorities, executions } = await fixture();
  let handlerCalls = 0;
  const runtime = new RuntimeActivation({
    authorityRuntime: authorities,
    executionRuntime: executions,
    events,
    contextResolver: async () => context,
    routeResolver: async () => ({
      routeId: "route-1",
      capability: "service.execute",
      actorIdentity: "operator-1",
      workflowReference: "service-workflow",
      workflowVersion: "1",
    }),
    executionHandler: async (_route, signal) => {
      handlerCalls += 1;
      return { accepted: true, subjectId: signal.subjectId ?? "unknown" };
    },
  });

  const signal = createRuntimeSignal({
    source: "test",
    eventType: "service.requested",
    payload: { requestId: "r-1" },
    correlationId: "corr-1",
    idempotencyKey: "idem-1",
    actorId: "operator-1",
    subjectId: "subject-1",
    operatingContextId: "ctx-1",
    provenance: { authorityId: "auth-1" },
  });

  const first = await runtime.activate(signal);
  const second = await runtime.activate(signal);

  assert.equal(first.resolution.status, "accepted");
  assert.equal(first.execution?.execution.state, "completed");
  assert.equal(first.reconciliation?.matched, true);
  assert.equal(first.feedback?.kind, "completion");
  assert.equal(handlerCalls, 1);
  assert.equal(second.execution?.evidence.replayed, true);
  assert.equal(second.execution?.execution.id, first.execution?.execution.id);
});

test("RuntimeActivation blocks consequential work when authority is absent", async () => {
  const { events, authorities, executions } = await fixture();
  let handlerCalls = 0;
  const runtime = new RuntimeActivation({
    authorityRuntime: authorities,
    executionRuntime: executions,
    events,
    contextResolver: async () => context,
    routeResolver: async () => ({ routeId: "route-2", capability: "service.execute", actorIdentity: "operator-1" }),
    executionHandler: async () => {
      handlerCalls += 1;
      return { accepted: true };
    },
  });

  const result = await runtime.activate(createRuntimeSignal({
    source: "test",
    eventType: "service.requested",
    payload: { requestId: "r-2" },
    correlationId: "corr-2",
    idempotencyKey: "idem-2",
    actorId: "operator-1",
    subjectId: "subject-2",
    operatingContextId: "ctx-1",
  }));

  assert.equal(result.resolution.status, "blocked");
  assert.equal(result.resolution.reason, "authority_unresolved");
  assert.equal(handlerCalls, 0);
});
