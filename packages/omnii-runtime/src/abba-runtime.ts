import { Authority, JsonObject } from "./types";
import { AgentRuntime } from "./agent-runtime";
import { EventStore } from "./event-runtime";

export interface DelegationRequest { subject: string; capability: string; purpose: string; resourceIds: string[]; context: JsonObject; }
export interface AuthorityBroker { request(request: DelegationRequest): Authority | null | Promise<Authority | null>; }
export interface AbbaPlan { purpose: string; capability: string; targetAgent: string; input: JsonObject; }
export interface AbbaBoundary {
  perceive(input: JsonObject): JsonObject;
  contextualize(perception: JsonObject): JsonObject;
  reason(context: JsonObject): JsonObject;
  plan(reasoning: JsonObject): AbbaPlan;
  requestAuthority(request: DelegationRequest): Promise<Authority>;
  selectCapability(plan: AbbaPlan): string;
  delegate(plan: AbbaPlan, authority: Authority): Promise<void>;
  observe(subject: string): Promise<JsonObject>;
  report(subject: string, result: JsonObject): Promise<void>;
  escalate(subject: string, reason: string): Promise<void>;
}

export class AbbaRuntime implements AbbaBoundary {
  constructor(private readonly broker: AuthorityBroker, private readonly agents: AgentRuntime, private readonly events: EventStore, private readonly abbaIdentity = "ABBA") {}
  perceive(input: JsonObject): JsonObject { return structuredClone(input); }
  contextualize(perception: JsonObject): JsonObject { return { perception: structuredClone(perception), orchestrator: this.abbaIdentity }; }
  reason(context: JsonObject): JsonObject { return { context: structuredClone(context), decision: "delegate-through-authority-boundary" }; }
  plan(reasoning: JsonObject): AbbaPlan {
    const requested = reasoning["requested"];
    if (!requested || typeof requested !== "object") throw new Error("ABBA plan requires explicit requested work");
    const request = requested as Record<string, unknown>;
    if (typeof request.capability !== "string" || typeof request.targetAgent !== "string") throw new Error("ABBA plan requires capability and target agent");
    return { purpose: typeof request.purpose === "string" ? request.purpose : "orchestration", capability: request.capability, targetAgent: request.targetAgent, input: (request.input as JsonObject | undefined) ?? {} };
  }
  async requestAuthority(request: DelegationRequest): Promise<Authority> {
    const authority = await this.broker.request(request);
    if (!authority) throw new Error("ABBA authority request denied");
    return structuredClone(authority);
  }
  selectCapability(plan: AbbaPlan): string { if (!plan.capability) throw new Error("ABBA cannot select an empty capability"); return plan.capability; }
  async delegate(plan: AbbaPlan, authority: Authority): Promise<void> {
    if (authority.subject !== plan.targetAgent) throw new Error("Delegated authority subject must match the target agent");
    await this.agents.authorizeAgent(plan.targetAgent, plan.capability, authority);
    await this.events.append({ type: "ABBA_DELEGATION", actor: this.abbaIdentity, subject: plan.targetAgent, outcome: "delegated", provenance: { authority_id: authority.id }, payload: { capability: plan.capability, purpose: plan.purpose }, idempotency_key: `abba:delegation:${authority.id}:${plan.targetAgent}:${plan.capability}` });
  }
  async observe(subject: string): Promise<JsonObject> { return { subject, events: await this.events.bySubject(subject) }; }
  async report(subject: string, result: JsonObject): Promise<void> { await this.events.append({ type: "ABBA_REPORT", actor: this.abbaIdentity, subject, outcome: "reported", provenance: { orchestrator: this.abbaIdentity }, payload: result }); }
  async escalate(subject: string, reason: string): Promise<void> { await this.events.append({ type: "ABBA_ESCALATION", actor: this.abbaIdentity, subject, outcome: "escalated", provenance: { orchestrator: this.abbaIdentity }, payload: { reason } }); }
}
