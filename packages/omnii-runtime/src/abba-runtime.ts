import { Authority, JsonObject } from "./types";
import { AgentRuntime } from "./agent-runtime";
import { EventStore } from "./event-runtime";
import { MissionDefinition, MissionAssessment, MissionIntelligenceRuntime, MissionTeamMember } from "./mission-intelligence-runtime";
import { AbbaCommandRequest, AbbaCommandResult, AbbaOrchestrationRuntime } from "./abba-orchestration-runtime";

export interface DelegationRequest { subject: string; capability: string; purpose: string; resourceIds: string[]; context: JsonObject; }
export interface AuthorityBroker { request(request: DelegationRequest): Authority | null | Promise<Authority | null>; }
export interface AbbaCapabilityRecord { id: string; name: string; version: string; status: string; authority: JsonObject; provenance: JsonObject; constraints: JsonObject; }
export interface CapabilityCatalog { lookup(predicate: (record: AbbaCapabilityRecord) => boolean, actor?: string): Promise<AbbaCapabilityRecord[]>; }
export interface AbbaPlan { purpose: string; capability: string; targetAgent: string; input: JsonObject; mode: "recommend" | "confirm" | "delegate" | "execute" | "simulate" | "defer" | "escalate"; approvalRequired: boolean; }
export interface AbbaBoundary {
  perceive(input: JsonObject): JsonObject;
  contextualize(perception: JsonObject): JsonObject;
  reason(context: JsonObject): JsonObject;
  plan(reasoning: JsonObject): AbbaPlan;
  requestAuthority(request: DelegationRequest): Promise<Authority>;
  selectCapability(plan: AbbaPlan): string;
  delegate(plan: AbbaPlan, authority: Authority): Promise<void>;
  command(request: AbbaCommandRequest): Promise<AbbaCommandResult>;
  assessMission(mission: MissionDefinition, members: MissionTeamMember[]): MissionAssessment;
  observe(subject: string): Promise<JsonObject>;
  report(subject: string, result: JsonObject): Promise<void>;
  escalate(subject: string, reason: string): Promise<void>;
}

const MODES = new Set<AbbaPlan["mode"]>(["recommend", "confirm", "delegate", "execute", "simulate", "defer", "escalate"]);

export class AbbaRuntime implements AbbaBoundary {
  constructor(private readonly broker: AuthorityBroker, private readonly agents: AgentRuntime, private readonly events: EventStore, private readonly abbaIdentity = "ABBA", private readonly capabilities?: CapabilityCatalog, private readonly missionIntelligence = new MissionIntelligenceRuntime(), private readonly orchestration?: AbbaOrchestrationRuntime) {}

  perceive(input: JsonObject): JsonObject { return structuredClone(input); }

  contextualize(perception: JsonObject): JsonObject {
    return {
      perception: structuredClone(perception),
      orchestrator: this.abbaIdentity,
      common_layer: {
        identity: "IDENTITY",
        intent: "INTENT",
        capability: "CAPABILITY",
        authority: "AUTHORITY",
        resource: "RESOURCE",
        state: "STATE",
        evidence: "EVIDENCE",
        provenance: "PROVENANCE",
        time: "TIME",
        place: "PLACE",
        mission_intelligence: "MISSION_INTELLIGENCE"
      }
    };
  }

  reason(context: JsonObject): JsonObject {
    const perception = context["perception"];
    const requested = perception && typeof perception === "object" && "requested" in perception
      ? (perception["requested"] as unknown)
      : perception;
    return {
      context: structuredClone(context),
      decision: "reuse-common-capability-before-specialization",
      authority_boundary: "ABBA-cannot-self-authorize",
      requested: requested && typeof requested === "object" ? structuredClone(requested as JsonObject) : {}
    };
  }

  plan(reasoning: JsonObject): AbbaPlan {
    const requested = reasoning["requested"];
    if (!requested || typeof requested !== "object") throw new Error("ABBA plan requires explicit requested work");
    const request = requested as Record<string, unknown>;
    if (typeof request.capability !== "string" || typeof request.targetAgent !== "string") throw new Error("ABBA plan requires capability and target agent");
    const mode = typeof request.mode === "string" && MODES.has(request.mode as AbbaPlan["mode"]) ? request.mode as AbbaPlan["mode"] : "delegate";
    return {
      purpose: typeof request.purpose === "string" ? request.purpose : "orchestration",
      capability: request.capability,
      targetAgent: request.targetAgent,
      input: (request.input as JsonObject | undefined) ?? {},
      mode,
      approvalRequired: request.approvalRequired === true || mode === "confirm" || mode === "escalate"
    };
  }

  async requestAuthority(request: DelegationRequest): Promise<Authority> {
    const authority = await this.broker.request(request);
    if (!authority) throw new Error("ABBA authority request denied");
    return structuredClone(authority);
  }

  selectCapability(plan: AbbaPlan): string {
    if (!plan.capability) throw new Error("ABBA cannot select an empty capability");
    return plan.capability;
  }

  async discoverCapability(name: string): Promise<AbbaCapabilityRecord[]> {
    if (!this.capabilities) return [];
    return this.capabilities.lookup((record) => record.name === name && ["verified", "available"].includes(record.status), this.abbaIdentity);
  }

  async command(request: AbbaCommandRequest): Promise<AbbaCommandResult> {
    if (!this.orchestration) throw new Error("ABBA orchestration runtime is not configured");
    return this.orchestration.command(request);
  }

  assessMission(mission: MissionDefinition, members: MissionTeamMember[]): MissionAssessment {
    return this.missionIntelligence.assess(mission, members);
  }

  async delegate(plan: AbbaPlan, authority: Authority): Promise<void> {
    if (plan.approvalRequired && plan.mode !== "delegate") throw new Error("ABBA plan requires approval before delegation");
    if (authority.subject !== plan.targetAgent) throw new Error("Delegated authority subject must match the target agent");
    await this.agents.authorizeAgent(plan.targetAgent, plan.capability, authority);
    await this.events.append({
      type: "ABBA_DELEGATION",
      actor: this.abbaIdentity,
      subject: plan.targetAgent,
      outcome: "delegated",
      provenance: { authority_id: authority.id, orchestrator: this.abbaIdentity },
      payload: { capability: plan.capability, purpose: plan.purpose, mode: plan.mode, approval_required: plan.approvalRequired },
      idempotency_key: `abba:delegation:${authority.id}:${plan.targetAgent}:${plan.capability}`
    });
  }

  async observe(subject: string): Promise<JsonObject> { return { subject, events: await this.events.bySubject(subject) }; }

  async report(subject: string, result: JsonObject): Promise<void> {
    await this.events.append({ type: "ABBA_REPORT", actor: this.abbaIdentity, subject, outcome: "reported", provenance: { orchestrator: this.abbaIdentity }, payload: result });
  }

  async escalate(subject: string, reason: string): Promise<void> {
    await this.events.append({ type: "ABBA_ESCALATION", actor: this.abbaIdentity, subject, outcome: "escalated", provenance: { orchestrator: this.abbaIdentity }, payload: { reason } });
  }
}
