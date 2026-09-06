import { randomUUID } from "node:crypto";
import { EcosystemCapabilityRuntime, PulseRecord } from "./ecosystem-capability-runtime";
import { MemoryPersistenceAdapter, PersistencePort, PersistenceRecord } from "./persistence";

export interface ManagementMandate {
  id: string;
  subjectId: string;
  objective: string;
  authorityRef: string;
  managerRef: string;
  scope: string;
  state: "active" | "paused" | "closed";
  createdAt: string;
}

export interface ManagementPlan {
  id: string;
  mandateId: string;
  steps: Array<{ action: string; owner: string; dependsOn?: string[] }>;
  state: "draft" | "active" | "completed" | "superseded";
  createdAt: string;
}

export interface ManagementDecision {
  id: string;
  mandateId: string;
  decision: string;
  rationale: string[];
  authorizedBy: string;
  createdAt: string;
}

export interface ManagementWork {
  id: string;
  mandateId: string;
  title: string;
  assignee: string;
  capabilityIds: string[];
  dependencyIds: string[];
  authorityRef: string;
  state: "planned" | "active" | "completed" | "blocked" | "cancelled";
  result?: unknown;
  createdAt: string;
}

export interface ManagementSnapshot {
  mandate: ManagementMandate;
  baseline?: Record<string, unknown>;
  latestObservation?: Record<string, unknown>;
  latestPulse?: PulseRecord;
  work: ManagementWork[];
  decisions: ManagementDecision[];
  plans: ManagementPlan[];
}

export class ManagementRuntime {
  private readonly ecosystem: EcosystemCapabilityRuntime;

  constructor(private readonly persistence: PersistencePort = new MemoryPersistenceAdapter()) {
    this.ecosystem = new EcosystemCapabilityRuntime(persistence);
  }

  async createMandate(input: Omit<ManagementMandate, "id" | "state" | "createdAt">): Promise<ManagementMandate> {
    if (!input.subjectId.trim()) throw new Error("Management subject is required");
    if (!input.objective.trim()) throw new Error("Management objective is required");
    if (!input.authorityRef.trim()) throw new Error("Management authority is required");
    const mandate: ManagementMandate = { ...input, id: randomUUID(), state: "active", createdAt: new Date().toISOString() };
    await this.persistence.create("management", { id: `mandate:${mandate.id}`, type: "management:mandate", value: mandate, created_at: mandate.createdAt });
    return structuredClone(mandate);
  }

  async getMandate(id: string): Promise<ManagementMandate> {
    const record = await this.persistence.read("management", `mandate:${id}`);
    if (!record) throw new Error(`Management mandate not found: ${id}`);
    return structuredClone(record.value as ManagementMandate);
  }

  async setBaseline(mandateId: string, baseline: Record<string, unknown>): Promise<Record<string, unknown>> {
    await this.getMandate(mandateId);
    const value = structuredClone(baseline);
    await this.persistence.create("management", { id: `baseline:${mandateId}:${randomUUID()}`, type: "management:baseline", mandate_id: mandateId, value, created_at: new Date().toISOString() });
    return value;
  }

  async createPlan(mandateId: string, steps: ManagementPlan["steps"]): Promise<ManagementPlan> {
    await this.getMandate(mandateId);
    if (!steps.length) throw new Error("Management plan requires at least one step");
    const plan: ManagementPlan = { id: randomUUID(), mandateId, steps: structuredClone(steps), state: "active", createdAt: new Date().toISOString() };
    await this.persistence.create("management", { id: `plan:${plan.id}`, type: "management:plan", mandate_id: mandateId, value: plan, created_at: plan.createdAt });
    return structuredClone(plan);
  }

  async recordDecision(mandateId: string, input: Omit<ManagementDecision, "id" | "mandateId" | "createdAt">): Promise<ManagementDecision> {
    await this.getMandate(mandateId);
    if (!input.decision.trim()) throw new Error("Management decision is required");
    if (!input.authorizedBy.trim()) throw new Error("Management decision authority is required");
    const decision: ManagementDecision = { ...input, id: randomUUID(), mandateId, createdAt: new Date().toISOString() };
    await this.persistence.create("management", { id: `decision:${decision.id}`, type: "management:decision", mandate_id: mandateId, value: decision, created_at: decision.createdAt });
    return structuredClone(decision);
  }

  async createWork(mandateId: string, input: Omit<ManagementWork, "id" | "mandateId" | "state" | "createdAt">): Promise<ManagementWork> {
    await this.getMandate(mandateId);
    if (!input.title.trim()) throw new Error("Management work title is required");
    if (!input.assignee.trim()) throw new Error("Management work assignee is required");
    if (!input.authorityRef.trim()) throw new Error("Management work authority is required");
    const work: ManagementWork = { ...input, id: randomUUID(), mandateId, state: "planned", createdAt: new Date().toISOString() };
    await this.persistence.create("management", { id: `work:${work.id}`, type: "management:work", mandate_id: mandateId, value: work, created_at: work.createdAt });
    return structuredClone(work);
  }

  async completeWork(mandateId: string, workId: string, result: unknown): Promise<ManagementWork> {
    await this.getMandate(mandateId);
    const record = await this.persistence.read("management", `work:${workId}`);
    if (!record || (record["mandate_id"] as string | undefined) !== mandateId) throw new Error(`Management work not found: ${workId}`);
    const work = structuredClone(record.value as ManagementWork);
    work.state = "completed";
    work.result = structuredClone(result);
    await this.persistence.update("management", `work:${workId}`, { value: work, state: work.state, updated_at: new Date().toISOString() });
    return work;
  }

  async observe(mandateId: string, observation: Record<string, unknown>): Promise<Record<string, unknown>> {
    await this.getMandate(mandateId);
    const value = structuredClone(observation);
    await this.persistence.create("management", { id: `observation:${mandateId}:${randomUUID()}`, type: "management:observation", mandate_id: mandateId, value, created_at: new Date().toISOString() });
    return value;
  }

  async recordOutcome(mandateId: string, input: Omit<PulseRecord, "id" | "subject" | "recordedAt">): Promise<PulseRecord> {
    const mandate = await this.getMandate(mandateId);
    return this.ecosystem.recordPulse({ ...input, subject: mandate.subjectId });
  }

  async snapshot(mandateId: string): Promise<ManagementSnapshot> {
    const mandate = await this.getMandate(mandateId);
    const records = await this.persistence.query("management", (record) => record["mandate_id"] === mandateId);
    const baselines = records.filter((r) => r["type"] === "management:baseline");
    const observations = records.filter((r) => r["type"] === "management:observation");
    const plans = records.filter((r) => r["type"] === "management:plan").map((r) => r.value as ManagementPlan);
    const decisions = records.filter((r) => r["type"] === "management:decision").map((r) => r.value as ManagementDecision);
    const work = records.filter((r) => r["type"] === "management:work").map((r) => r.value as ManagementWork);
    const pulseRecords = await this.persistence.query("ledger", (record) => record["type"] === "pulse" && (record["value"] as Record<string, unknown> | undefined)?.["subject"] === mandate.subjectId);
    const latestPulseRecord: PersistenceRecord | undefined = pulseRecords[pulseRecords.length - 1];
    return {
      mandate,
      baseline: baselines.length ? structuredClone(baselines[baselines.length - 1].value as Record<string, unknown>) : undefined,
      latestObservation: observations.length ? structuredClone(observations[observations.length - 1].value as Record<string, unknown>) : undefined,
      latestPulse: latestPulseRecord ? structuredClone(latestPulseRecord.value as PulseRecord) : undefined,
      work: structuredClone(work), decisions: structuredClone(decisions), plans: structuredClone(plans),
    };
  }
}
