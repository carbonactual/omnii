import { randomUUID } from "node:crypto";
import { Authority, JsonObject } from "./types";
import { authorize, EventStore } from "./event-runtime";
import { Execution, ExecutionRuntime } from "./execution-runtime";

export type AgentState = "registered" | "verified" | "active" | "suspended" | "revoked";

export interface AgentContract {
  id: string;
  identity: string;
  authority: Authority;
  capabilities: string[];
  tools: string[];
  context: JsonObject;
  memory: JsonObject;
  policyConstraints: JsonObject;
  executionBoundary: JsonObject;
  state: AgentState;
}

export class AgentRuntime {
  private readonly agents = new Map<string, AgentContract>();

  constructor(private readonly executions: ExecutionRuntime, private readonly events: EventStore) {}

  register(input: Omit<AgentContract, "id" | "state">): AgentContract {
    const agent: AgentContract = { ...input, id: randomUUID(), state: "registered" };
    if (this.agents.has(agent.identity)) throw new Error(`Agent identity already registered: ${agent.identity}`);
    this.agents.set(agent.identity, structuredClone(agent));
    this.events.append({ type: "AGENT_REGISTERED", actor: agent.identity, subject: agent.id, outcome: "success", provenance: { authority_id: agent.authority.id }, payload: { capabilities: agent.capabilities } });
    return structuredClone(agent);
  }

  verify(identity: string): AgentContract {
    const agent = this.require(identity);
    if (!agent.authority.id || !agent.identity) throw new Error("Agent verification failed");
    agent.state = "verified";
    this.agents.set(identity, structuredClone(agent));
    return structuredClone(agent);
  }

  authorizeAgent(identity: string, capability: string): AgentContract {
    const agent = this.require(identity);
    if (!["verified", "active"].includes(agent.state)) throw new Error("Agent is not eligible for authorization");
    authorize(agent.authority, capability);
    if (!agent.capabilities.includes(capability) && !agent.capabilities.includes("*")) throw new Error(`Agent capability not declared: ${capability}`);
    agent.state = "active";
    this.agents.set(identity, structuredClone(agent));
    return structuredClone(agent);
  }

  execute(identity: string, capability: string, intentReference: string, input: JsonObject, handler: (input: JsonObject) => JsonObject): Execution {
    const agent = this.require(identity);
    if (agent.state !== "active") throw new Error("Agent is not active");
    authorize(agent.authority, capability);
    if (!agent.capabilities.includes(capability) && !agent.capabilities.includes("*")) throw new Error(`Agent capability not declared: ${capability}`);
    const execution = this.executions.create({ intentReference, actorIdentity: agent.identity, authorityContext: agent.authority, capability, resources: [], dependencies: [], input, provenance: { agent_id: agent.id } });
    this.executions.validate(execution.id);
    this.executions.authorize(execution.id);
    return this.executions.run(execution.id, handler);
  }

  report(identity: string, subject: string, payload: JsonObject): void {
    const agent = this.require(identity);
    this.events.append({ type: "AGENT_REPORT", actor: agent.identity, subject, outcome: "reported", provenance: { agent_id: agent.id, authority_id: agent.authority.id }, payload });
  }

  escalate(identity: string, subject: string, reason: string): void {
    const agent = this.require(identity);
    this.events.append({ type: "AGENT_ESCALATED", actor: agent.identity, subject, outcome: "escalated", provenance: { agent_id: agent.id }, payload: { reason } });
  }

  suspend(identity: string): AgentContract {
    return this.setState(identity, "suspended");
  }

  revoke(identity: string): AgentContract {
    const agent = this.require(identity);
    agent.state = "revoked";
    agent.authority.revoked_at = new Date().toISOString();
    this.agents.set(identity, structuredClone(agent));
    this.events.append({ type: "AGENT_REVOKED", actor: identity, subject: agent.id, outcome: "revoked", provenance: { authority_id: agent.authority.id } });
    return structuredClone(agent);
  }

  read(identity: string): AgentContract | undefined {
    const agent = this.agents.get(identity);
    return agent ? structuredClone(agent) : undefined;
  }

  private setState(identity: string, state: AgentState): AgentContract {
    const agent = this.require(identity);
    agent.state = state;
    this.agents.set(identity, structuredClone(agent));
    return structuredClone(agent);
  }

  private require(identity: string): AgentContract {
    const agent = this.agents.get(identity);
    if (!agent) throw new Error(`Agent not found: ${identity}`);
    return structuredClone(agent);
  }
}
