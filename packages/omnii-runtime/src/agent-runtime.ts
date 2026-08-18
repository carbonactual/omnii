import { randomUUID } from "node:crypto";
import { Authority, JsonObject } from "./types";
import { authorize, EventStore } from "./event-runtime";
import { Execution, ExecutionRuntime } from "./execution-runtime";
import { MemoryPersistenceAdapter, PersistencePort } from "./persistence";

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
  constructor(private readonly executions: ExecutionRuntime, private readonly events: EventStore, private readonly persistence: PersistencePort = new MemoryPersistenceAdapter()) {}

  async register(input: Omit<AgentContract, "id" | "state">): Promise<AgentContract> {
    const agent: AgentContract = { ...input, id: randomUUID(), state: "registered" };
    const existing = await this.persistence.query("agents", (record) => record["identity"] === agent.identity);
    if (existing.length) throw new Error(`Agent identity already registered: ${agent.identity}`);
    const created = await this.persistence.create("agents", agent);
    await this.events.append({ type: "AGENT_REGISTERED", actor: agent.identity, subject: agent.id, outcome: "success", provenance: { authority_id: agent.authority.id }, payload: { capabilities: agent.capabilities }, idempotency_key: `agent:register:${agent.identity}` });
    return structuredClone(created as unknown as AgentContract);
  }

  async verify(identity: string): Promise<AgentContract> {
    const agent = await this.require(identity);
    if (!agent.authority.id || !agent.identity) throw new Error("Agent verification failed");
    agent.state = "verified";
    const updated = await this.persistence.update("agents", agent.id, agent);
    return structuredClone(updated as unknown as AgentContract);
  }

  async authorizeAgent(identity: string, capability: string, delegatedAuthority?: Authority): Promise<AgentContract> {
    const agent = await this.require(identity);
    if (!["verified", "active"].includes(agent.state)) throw new Error("Agent is not eligible for authorization");
    const authority = delegatedAuthority ?? agent.authority;
    if (delegatedAuthority && delegatedAuthority.subject !== agent.identity) throw new Error("Delegated authority subject must match the agent identity");
    authorize(authority, capability);
    if (!agent.capabilities.includes(capability) && !agent.capabilities.includes("*")) throw new Error(`Agent capability not declared: ${capability}`);
    agent.state = "active";
    const updated = await this.persistence.update("agents", agent.id, agent);
    return structuredClone(updated as unknown as AgentContract);
  }

  async execute(identity: string, capability: string, intentReference: string, input: JsonObject, handler: (input: JsonObject) => JsonObject | Promise<JsonObject>, delegatedAuthority?: Authority): Promise<Execution> {
    const agent = await this.require(identity);
    if (agent.state !== "active") throw new Error("Agent is not active");
    const authority = delegatedAuthority ?? agent.authority;
    if (delegatedAuthority && delegatedAuthority.subject !== agent.identity) throw new Error("Delegated authority subject must match the agent identity");
    authorize(authority, capability);
    if (!agent.capabilities.includes(capability) && !agent.capabilities.includes("*")) throw new Error(`Agent capability not declared: ${capability}`);
    const execution = await this.executions.create({ intentReference, actorIdentity: agent.identity, authorityContext: authority, capability, resources: [], dependencies: [], input, provenance: { agent_id: agent.id, delegated_authority_id: delegatedAuthority?.id ?? null } });
    await this.executions.validate(execution.id);
    await this.executions.authorize(execution.id);
    return this.executions.run(execution.id, handler);
  }

  async report(identity: string, subject: string, payload: JsonObject): Promise<void> {
    const agent = await this.require(identity);
    await this.events.append({ type: "AGENT_REPORT", actor: agent.identity, subject, outcome: "reported", provenance: { agent_id: agent.id, authority_id: agent.authority.id }, payload });
  }

  async escalate(identity: string, subject: string, reason: string): Promise<void> {
    const agent = await this.require(identity);
    await this.events.append({ type: "AGENT_ESCALATED", actor: agent.identity, subject, outcome: "escalated", provenance: { agent_id: agent.id }, payload: { reason } });
  }

  async suspend(identity: string): Promise<AgentContract> { return this.setState(identity, "suspended"); }

  async revoke(identity: string): Promise<AgentContract> {
    const agent = await this.require(identity);
    agent.state = "revoked";
    agent.authority.revoked_at = new Date().toISOString();
    const updated = await this.persistence.update("agents", agent.id, agent);
    await this.events.append({ type: "AGENT_REVOKED", actor: identity, subject: agent.id, outcome: "revoked", provenance: { authority_id: agent.authority.id }, idempotency_key: `agent:revoke:${agent.id}` });
    return structuredClone(updated as unknown as AgentContract);
  }

  async read(identity: string): Promise<AgentContract | undefined> {
    const records = await this.persistence.query("agents", (record) => record["identity"] === identity);
    return records.length ? structuredClone(records[0] as unknown as AgentContract) : undefined;
  }

  private async setState(identity: string, state: AgentState): Promise<AgentContract> {
    const agent = await this.require(identity);
    agent.state = state;
    const updated = await this.persistence.update("agents", agent.id, agent);
    return structuredClone(updated as unknown as AgentContract);
  }

  private async require(identity: string): Promise<AgentContract> {
    const agent = await this.read(identity);
    if (!agent) throw new Error(`Agent not found: ${identity}`);
    return agent;
  }
}
