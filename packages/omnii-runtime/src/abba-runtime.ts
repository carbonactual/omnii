import { Authority, JsonObject } from "./types";
import { AgentRuntime } from "./agent-runtime";
import { EventStore } from "./event-runtime";

export interface DelegationRequest {
  subject: string;
  capability: string;
  purpose: string;
  resourceIds: string[];
  context: JsonObject;
}

export interface AuthorityBroker {
  request(request: DelegationRequest): Authority | null;
}

export interface AbbaPlan {
  purpose: string;
  capability: string;
  targetAgent: string;
  input: JsonObject;
}

export interface AbbaBoundary {
  perceive(input: JsonObject): JsonObject;
  contextualize(perception: JsonObject): JsonObject;
  reason(context: JsonObject): JsonObject;
  plan(reasoning: JsonObject): AbbaPlan;
  requestAuthority(request: DelegationRequest): Authority;
  selectCapability(plan: AbbaPlan): string;
  delegate(plan: AbbaPlan, authority: Authority): void;
  observe(subject: string): JsonObject;
  report(subject: string, result: JsonObject): void;
  escalate(subject: string, reason: string): void;
}

export class AbbaRuntime implements AbbaBoundary {
  constructor(
    private readonly broker: AuthorityBroker,
    private readonly agents: AgentRuntime,
    private readonly events: EventStore,
    private readonly abbaIdentity = "ABBA",
  ) {}

  perceive(input: JsonObject): JsonObject { return structuredClone(input); }

  contextualize(perception: JsonObject): JsonObject {
    return { perception: structuredClone(perception), orchestrator: this.abbaIdentity };
  }

  reason(context: JsonObject): JsonObject {
    return { context: structuredClone(context), decision: "delegate-through-authority-boundary" };
  }

  plan(reasoning: JsonObject): AbbaPlan {
    const requested = reasoning["requested"];
    if (!requested || typeof requested !== "object") throw new Error("ABBA plan requires explicit requested work");
    const request = requested as Record<string, unknown>;
    if (typeof request.capability !== "string" || typeof request.targetAgent !== "string") throw new Error("ABBA plan requires capability and target agent");
    return { purpose: typeof request.purpose === "string" ? request.purpose : "orchestration", capability: request.capability, targetAgent: request.targetAgent, input: (request.input as JsonObject | undefined) ?? {} };
  }

  requestAuthority(request: DelegationRequest): Authority {
    const authority = this.broker.request(request);
    if (!authority) throw new Error("ABBA authority request denied");
    return structuredClone(authority);
  }

  selectCapability(plan: AbbaPlan): string {
    if (!plan.capability) throw new Error("ABBA cannot select an empty capability");
    return plan.capability;
  }

  delegate(plan: AbbaPlan, authority: Authority): void {
    if (authority.subject !== this.abbaIdentity && authority.subject !== plan.targetAgent) throw new Error("Delegated authority subject does not match orchestration boundary");
    this.agents.authorizeAgent(plan.targetAgent, plan.capability);
    this.events.append({ type: "ABBA_DELEGATION", actor: this.abbaIdentity, subject: plan.targetAgent, outcome: "delegated", provenance: { authority_id: authority.id }, payload: { capability: plan.capability, purpose: plan.purpose } });
  }

  observe(subject: string): JsonObject {
    return { subject, events: this.events.bySubject(subject) };
  }

  report(subject: string, result: JsonObject): void {
    this.events.append({ type: "ABBA_REPORT", actor: this.abbaIdentity, subject, outcome: "reported", provenance: { orchestrator: this.abbaIdentity }, payload: result });
  }

  escalate(subject: string, reason: string): void {
    this.events.append({ type: "ABBA_ESCALATION", actor: this.abbaIdentity, subject, outcome: "escalated", provenance: { orchestrator: this.abbaIdentity }, payload: { reason } });
  }
}
