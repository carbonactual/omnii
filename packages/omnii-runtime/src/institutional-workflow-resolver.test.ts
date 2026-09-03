import { describe, expect, it } from "vitest";
import { resolveInstitutionalWorkflow } from "./institutional-workflow-resolver";

describe("institutional workflow resolver", () => {
  const signal = {
    id: "signal-1",
    receivedAt: "2026-09-03T00:00:00Z",
    source: "nasc",
    eventType: "application.submitted",
    payload: { formId: "form-1" },
    correlationId: "corr-1",
    idempotencyKey: "idem-1",
  };
  const authority = {
    id: "auth-1",
    subject: "user-1",
    scope: ["application.review"],
    capabilities: ["application.review"],
    issued_at: signal.receivedAt,
    revocable: true,
  };

  it("pins a form binding to the exact workflow version", async () => {
    const result = await resolveInstitutionalWorkflow(signal, authority, {
      findWorkflows: async () => [
        { id: "wf-1", version: "1", lifecycle: "active", name: "old" },
        { id: "wf-1", version: "2", lifecycle: "active", name: "current" },
      ],
      findBinding: async () => ({ formId: "form-1", workflowId: "wf-1", workflowVersion: "2", evidenceRequired: [], authorityGates: [] }),
    });
    expect(result.workflow?.version).toBe("2");
    expect(result.workflow?.name).toBe("current");
  });

  it("requires approval when a workflow gate is not satisfied", async () => {
    const result = await resolveInstitutionalWorkflow(signal, { ...authority, capabilities: ["read"] }, {
      findWorkflows: async () => [{ id: "wf-1", version: "1", lifecycle: "active", approval_gates: [{ capability: "application.review" }] }],
    });
    expect(result.requiresApproval).toBe(true);
    expect(result.approvalReason).toBe("workflow_approval_gate_unsatisfied");
  });
});
