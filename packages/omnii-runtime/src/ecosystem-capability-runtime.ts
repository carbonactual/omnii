import { randomUUID } from "node:crypto";
import { PersistencePort, MemoryPersistenceAdapter } from "./persistence";

export type CapabilityKind =
  | "analysis" | "research" | "documentation" | "modeling" | "design"
  | "planning" | "consulting" | "audit" | "assessment" | "forecasting"
  | "feasibility" | "strategy" | "standardization" | "certification"
  | "compliance" | "verification" | "workflow" | "delivery";

export interface CapabilityDefinition {
  id: string;
  name: string;
  kind: CapabilityKind;
  outputs: string[];
  dependencies?: string[];
  evidenceRequired?: boolean;
  metadata?: Record<string, unknown>;
}

export interface RequirementDefinition {
  id: string;
  name: string;
  requiredCapabilities: string[];
  requiredArtifacts?: string[];
  requiredEvidence?: string[];
  requiredStandards?: string[];
  metadata?: Record<string, unknown>;
}

export interface CompletenessAssessment {
  id: string;
  subject: string;
  requirementId: string;
  presentCapabilities: string[];
  presentArtifacts: string[];
  presentEvidence: string[];
  presentStandards: string[];
  missingCapabilities: string[];
  missingArtifacts: string[];
  missingEvidence: string[];
  missingStandards: string[];
  complete: boolean;
  score: number;
  createdAt: string;
}

export interface WorkflowRecipe {
  id: string;
  name: string;
  capabilityIds: string[];
  inputs: string[];
  outputs: string[];
  validationRules: string[];
  metadata?: Record<string, unknown>;
}

export interface ArtifactRecord {
  id: string;
  type: string;
  title: string;
  sourceWorkflowId?: string;
  sourceRequirementId?: string;
  version: string;
  status: "draft" | "review" | "approved" | "superseded" | "archived";
  evidenceRefs: string[];
  metadata?: Record<string, unknown>;
}

export interface StandardRecord {
  id: string;
  name: string;
  version: string;
  requirements: string[];
  assessmentMethod?: string;
  certificationPath?: string;
  status: "draft" | "active" | "retired";
  metadata?: Record<string, unknown>;
}

export interface PulseRecord {
  id: string;
  subject: string;
  outcome: string;
  valueCreated?: number;
  valuePreserved?: number;
  valueDestroyed?: number;
  valueTransferred?: number;
  moneyAmount?: number;
  evidenceRefs: string[];
  recordedAt: string;
}

export class EcosystemCapabilityRuntime {
  constructor(private readonly persistence: PersistencePort = new MemoryPersistenceAdapter()) {}

  async registerCapability(input: CapabilityDefinition): Promise<CapabilityDefinition> {
    const existing = await this.persistence.read("registries", `capability:${input.id}`);
    if (existing) throw new Error(`Capability already registered: ${input.id}`);
    const record = { id: `capability:${input.id}`, value: input, created_at: new Date().toISOString() };
    await this.persistence.create("registries", record);
    return structuredClone(input);
  }

  async registerRequirement(input: RequirementDefinition): Promise<RequirementDefinition> {
    const existing = await this.persistence.read("registries", `requirement:${input.id}`);
    if (existing) throw new Error(`Requirement already registered: ${input.id}`);
    await this.persistence.create("registries", { id: `requirement:${input.id}`, value: input, created_at: new Date().toISOString() });
    return structuredClone(input);
  }

  async registerWorkflowRecipe(input: WorkflowRecipe): Promise<WorkflowRecipe> {
    const existing = await this.persistence.read("workflows", input.id);
    if (existing) throw new Error(`Workflow recipe already registered: ${input.id}`);
    await this.persistence.create("workflows", { id: input.id, version: "1", state: "registered", value: input, created_at: new Date().toISOString() });
    return structuredClone(input);
  }

  async registerArtifact(input: ArtifactRecord): Promise<ArtifactRecord> {
    const existing = await this.persistence.read("objects", input.id);
    if (existing) throw new Error(`Artifact already registered: ${input.id}`);
    await this.persistence.create("objects", { id: input.id, version: input.version, type: "ecosystem:artifact", status: input.status, value: input, created_at: new Date().toISOString() });
    return structuredClone(input);
  }

  async registerStandard(input: StandardRecord): Promise<StandardRecord> {
    const existing = await this.persistence.read("registries", `standard:${input.id}`);
    if (existing) throw new Error(`Standard already registered: ${input.id}`);
    await this.persistence.create("registries", { id: `standard:${input.id}`, value: input, created_at: new Date().toISOString() });
    return structuredClone(input);
  }

  async assessCompleteness(
    subject: string,
    requirementId: string,
    present: { capabilities?: string[]; artifacts?: string[]; evidence?: string[]; standards?: string[] },
  ): Promise<CompletenessAssessment> {
    const requirementRecord = await this.persistence.read("registries", `requirement:${requirementId}`);
    if (!requirementRecord) throw new Error(`Requirement not found: ${requirementId}`);
    const requirement = requirementRecord.value as RequirementDefinition;
    const presentCapabilities = [...new Set(present.capabilities ?? [])];
    const presentArtifacts = [...new Set(present.artifacts ?? [])];
    const presentEvidence = [...new Set(present.evidence ?? [])];
    const presentStandards = [...new Set(present.standards ?? [])];
    const missingCapabilities = requirement.requiredCapabilities.filter((id) => !presentCapabilities.includes(id));
    const missingArtifacts = (requirement.requiredArtifacts ?? []).filter((id) => !presentArtifacts.includes(id));
    const missingEvidence = (requirement.requiredEvidence ?? []).filter((id) => !presentEvidence.includes(id));
    const missingStandards = (requirement.requiredStandards ?? []).filter((id) => !presentStandards.includes(id));
    const total = requirement.requiredCapabilities.length + (requirement.requiredArtifacts?.length ?? 0) + (requirement.requiredEvidence?.length ?? 0) + (requirement.requiredStandards?.length ?? 0);
    const missing = missingCapabilities.length + missingArtifacts.length + missingEvidence.length + missingStandards.length;
    const assessment: CompletenessAssessment = {
      id: randomUUID(), subject, requirementId, presentCapabilities, presentArtifacts, presentEvidence, presentStandards,
      missingCapabilities, missingArtifacts, missingEvidence, missingStandards,
      complete: missing === 0,
      score: total === 0 ? 1 : Number(((total - missing) / total).toFixed(4)),
      createdAt: new Date().toISOString(),
    };
    await this.persistence.create("audit", { id: assessment.id, type: "completeness-assessment", value: assessment, created_at: assessment.createdAt });
    return assessment;
  }

  async recordPulse(input: Omit<PulseRecord, "id" | "recordedAt">): Promise<PulseRecord> {
    const pulse: PulseRecord = { ...input, id: randomUUID(), recordedAt: new Date().toISOString() };
    await this.persistence.create("ledger", { id: pulse.id, type: "pulse", value: pulse, transactionReference: `pulse:${pulse.subject}`, recorded_at: pulse.recordedAt });
    return pulse;
  }

  async reconcileValue(subject: string): Promise<{ subject: string; totals: Record<string, number>; pulseCount: number }> {
    const records = await this.persistence.query("ledger", (record) => record["type"] === "pulse" && (record["value"] as Record<string, unknown> | undefined)?.["subject"] === subject);
    const totals = { valueCreated: 0, valuePreserved: 0, valueDestroyed: 0, valueTransferred: 0, moneyAmount: 0 };
    for (const record of records) {
      const value = record["value"] as Partial<PulseRecord>;
      totals.valueCreated += Number(value.valueCreated ?? 0);
      totals.valuePreserved += Number(value.valuePreserved ?? 0);
      totals.valueDestroyed += Number(value.valueDestroyed ?? 0);
      totals.valueTransferred += Number(value.valueTransferred ?? 0);
      totals.moneyAmount += Number(value.moneyAmount ?? 0);
    }
    return { subject, totals, pulseCount: records.length };
  }
}
