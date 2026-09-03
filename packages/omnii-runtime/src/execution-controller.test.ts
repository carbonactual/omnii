import { describe, expect, it } from "vitest";
import { executeGoverned } from "./execution-controller";

describe("execution controller", () => {
  const request = { id: "exec-1", action: "service.execute", capability: "service.execute", actorIdentity: "operator-1", correlationId: "corr-1", idempotencyKey: "idem-1", input: { value: 1 } };
  it("does not call a disabled executor", async () => {
    let calls = 0;
    const result = await executeGoverned({ ...request, enabled: false }, { allowed: true, routeId: "route-1", correlationId: request.correlationId }, { execute: async () => { calls += 1; return { success: true }; } });
    expect(result.status).toBe("blocked");
    expect(result.error).toBe("capability_disabled");
    expect(calls).toBe(0);
  });
  it("preserves failed adapter outcomes", async () => {
    const result = await executeGoverned(request, { allowed: true, routeId: "route-1", correlationId: request.correlationId }, { execute: async () => ({ success: false, error: "downstream_unavailable" }) });
    expect(result.status).toBe("failed");
    expect(result.error).toBe("downstream_unavailable");
  });
});
