import { JsonObject } from "./types";
import { RuntimeSignal } from "./runtime-signal";
import { Authority } from "./types";

export interface InstitutionalWorkflowRecord {
  id: string;
  version: string;
  lifecycle: string;
  category?: string;
  name?: string;
  description?: string;
  states?: unknown;
  transitions?: unknown;
  approval_gates?: unknown;
  sla_rules?: unknown;
  exception_rules?: unknown;
  provenance?: JsonObject;
}

export interface InstitutionalWorkflowBinding {
  formId?: string;
  workflowId: string;
  workflowVersion: string;
  agentClass?: string;
  evidenceRequired: unknown[];
  authorityGates: unknown[];
}

export interface InstitutionalWorkflowResolverDependencies {
  findWorkflows: (signal: RuntimeSignal) => Promise<InstitutionalWorkflowRecord[]>;
  findBinding?: (signal: RuntimeSignal, workflows: InstitutionalWorkflowRecord[]) => Promise<InstitutionalWorkflowBinding | null>;
}

export interface InstitutionalWorkflowResolution {
  workflow: InstitutionalWorkflowRecord | null;
  binding: InstitutionalWorkflowBinding | null;
  requiresApproval: boolean;
  approvalReason?: string;
}

export async function resolveInstitutionalWorkflow(
  signal: RuntimeSignal,
  authority: Authority,
  dependencies: InstitutionalWorkflowResolverDependencies,
): Promise<InstitutionalWorkflowResolution> {
  const workflows = (await dependencies.findWorkflows(signal)).filter((workflow) => workflow.lifecycle === "active");
  if (workflows.length === 0) return { workflow: null, binding: null, requiresApproval: false };

  const binding = dependencies.findBinding ? await dependencies.findBinding(signal, workflows) : null;
  const workflow = binding
    ? workflows.find((candidate) => candidate.id === binding.workflowId && candidate.version === binding.workflowVersion) ?? null
    : workflows[0];
  if (!workflow) return { workflow: null, binding: null, requiresApproval: false };

  const gates = binding?.authorityGates ?? workflow.approval_gates;
  const gateList = Array.isArray(gates) ? gates : [];
  const matchingGate = gateList.find((gate) => {
    if (typeof gate !== "object" || gate === null) return true;
    const requirement = (gate as Record<string, unknown>)["capability"] ?? (gate as Record<string, unknown>)["authority"];
    return typeof requirement !== "string" || authority.capabilities.includes(requirement) || authority.capabilities.includes("*");
  });
  const requiresApproval = gateList.length > 0 && !matchingGate;
  return {
    workflow,
    binding,
    requiresApproval,
    approvalReason: requiresApproval ? "workflow_approval_gate_unsatisfied" : undefined,
  };
}
