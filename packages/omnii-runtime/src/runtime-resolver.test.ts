import { describe, expect, it } from "vitest";
import { resolveRuntimeSignal } from "./runtime-resolver";

describe("runtime resolver", () => {
  const signal = {
    id: "s1",
    receivedAt: "2026-09-03T00:00:00Z",
    source: "test",
    eventType: "service.requested",
    payload: {},
    correlationId: "corr-1",
    idempotencyKey: "idem-1",
  };

  const context = { id: "ctx-1", subjectId: "s1", mode: "test", capacity: "operator", jurisdiction: "NG", validFrom: signal.receivedAt };
  const authority = { id: "auth-1", subject: "operator-1", scope: ["service.execute"], capabilities: ["service.execute"], issued_at: signal.receivedAt, revocable: true };

  it("blocks authority-required routes when authority is unresolved", async () => {
    const result = await resolveRuntimeSignal(signal, {
      resolveContext: async () => context,
      resolveAuthority: async () => null,
      matchRoute: async () => ({ routeId: "route-1", capability: "service.execute" }),
    });
    expect(result.dispatch.allowed).toBe(false);
    expect(result.dispatch.reason).toBe("authority_unresolved");
  });

  it("permits explicitly autonomous routes without authority", async () => {
    const result = await resolveRuntimeSignal(signal, {
      resolveContext: async () => context,
      resolveAuthority: async () => null,
      matchRoute: async () => ({ routeId: "route-autonomous", capability: "world.learn", requiresAuthority: false }),
    });
    expect(result.dispatch.allowed).toBe(true);
    expect(result.authority).toBeNull();
    expect(result.dispatch.routeId).toBe("route-autonomous");
  });

  it("resolves an authority-required route and preserves correlation", async () => {
    const result = await resolveRuntimeSignal(signal, {
      resolveContext: async () => context,
      resolveAuthority: async () => authority,
      matchRoute: async () => ({ routeId: "route-1", workflowReference: "workflow-1", workflowVersion: "1", capability: "service.execute" }),
      authorizeRoute: async () => true,
    });
    expect(result.dispatch.allowed).toBe(true);
    expect(result.dispatch.routeId).toBe("route-1");
    expect(result.dispatch.correlationId).toBe("corr-1");
  });
});
