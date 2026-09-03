import { describe, expect, it } from "vitest";
import { AuthorityRecord, AuthorityRuntime } from "./authority-runtime";
import { EventStore } from "./event-runtime";
import { ExecutionRuntime } from "./execution-runtime";
import { MemoryPersistenceAdapter } from "./persistence";
import { OperatingContext } from "./operating-context-runtime";
import { createRuntimeSignal } from "./runtime-signal";
import { RuntimeActivation } from "./runtime-activation";

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
  return { persistence, events, authorities, executions };
}

describe("RuntimeActivation", () => {
  it("runs the complete governed loop and is replay-safe", async () => {
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

    expect(first.resolution.status).toBe("accepted");
    expect(first.execution?.execution.state).toBe("completed");
    expect(first.reconciliation?.matched).toBe(true);
    expect(first.feedback?.kind).toBe("completion");
    expect(handlerCalls).toBe(1);
    expect(second.execution?.evidence.replayed).toBe(true);
    expect(second.execution?.execution.id).toBe(first.execution?.execution.id);
  });

  it("blocks consequential work when authority is absent", async () => {
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

    expect(result.resolution.status).toBe("blocked");
    expect(result.resolution.reason).toBe("authority_unresolved");
    expect(handlerCalls).toBe(0);
  });
});
