import { randomUUID } from "node:crypto";
import { Authority, JsonObject } from "./types";
import { Execution, ExecutionHandler, ExecutionRuntime } from "./execution-runtime";
import { EventStore } from "./event-runtime";
import { authorize } from "./event-runtime";

export type WorkflowState = "created" | "validated" | "planned" | "authorized" | "executing" | "completed" | "failed" | "escalated";

export interface WorkflowDefinition {
  id: string;
  trigger: string;
  validate: (context: JsonObject) => boolean;
  plan: (context: JsonObject) => JsonObject;
  capability: string;
  authority: Authority;
  execute: ExecutionHandler;
  retry?: { maxAttempts: number };
}

export interface WorkflowInstance {
  id: string;
  definitionId: string;
  state: WorkflowState;
  context: JsonObject;
  attempts: number;
  executionId?: string;
  createdAt: string;
  updatedAt: string;
}

export class WorkflowRuntime {
  private readonly definitions = new Map<string, WorkflowDefinition>();
  private readonly instances = new Map<string, WorkflowInstance>();

  constructor(private readonly executions: ExecutionRuntime, private readonly events: EventStore) {}

  register(definition: WorkflowDefinition): WorkflowDefinition {
    if (this.definitions.has(definition.id)) throw new Error(`Workflow already exists: ${definition.id}`);
    this.definitions.set(definition.id, definition);
    return definition;
  }

  start(definitionId: string, context: JsonObject): WorkflowInstance {
    const definition = this.requireDefinition(definitionId);
    const instance: WorkflowInstance = { id: randomUUID(), definitionId, state: "created", context, attempts: 0, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    if (!definition.validate(context)) throw new Error("Workflow validation failed");
    instance.state = "validated";
    instance.context = definition.plan(context);
    instance.state = "planned";
    authorize(definition.authority, definition.capability);
    instance.state = "authorized";
    this.instances.set(instance.id, structuredClone(instance));
    this.events.append({ type: "WORKFLOW_AUTHORIZED", actor: definition.authority.subject, subject: instance.id, outcome: "success", provenance: { authority_id: definition.authority.id }, payload: { definition_id: definition.id } });
    return structuredClone(instance);
  }

  run(id: string, actorIdentity: string): WorkflowInstance {
    const instance = this.requireInstance(id);
    const definition = this.requireDefinition(instance.definitionId);
    if (instance.state !== "authorized" && instance.state !== "executing") throw new Error("Workflow is not authorized");
    instance.state = "executing";
    instance.attempts += 1;
    const execution: Execution = this.executions.create({
      intentReference: definition.id,
      actorIdentity,
      authorityContext: definition.authority,
      capability: definition.capability,
      resources: [],
      dependencies: [],
      input: instance.context,
      provenance: { workflow_id: instance.id },
    });
    this.executions.validate(execution.id);
    this.executions.authorize(execution.id);
    const result = this.executions.run(execution.id, definition.execute);
    instance.executionId = result.id;
    if (result.state === "completed") instance.state = "completed";
    else if ((definition.retry?.maxAttempts ?? 0) >= instance.attempts) instance.state = "executing";
    else instance.state = "failed";
    instance.updatedAt = new Date().toISOString();
    this.instances.set(id, structuredClone(instance));
    this.events.append({ type: "WORKFLOW_STATE_CHANGED", actor: actorIdentity, subject: id, outcome: instance.state, provenance: { execution_id: result.id }, payload: { state: instance.state, attempts: instance.attempts } });
    return structuredClone(instance);
  }

  escalate(id: string, actorIdentity: string, reason: string): WorkflowInstance {
    const instance = this.requireInstance(id);
    instance.state = "escalated";
    instance.updatedAt = new Date().toISOString();
    this.instances.set(id, structuredClone(instance));
    this.events.append({ type: "WORKFLOW_ESCALATED", actor: actorIdentity, subject: id, outcome: "escalated", provenance: { workflow_id: id }, payload: { reason } });
    return structuredClone(instance);
  }

  read(id: string): WorkflowInstance | undefined {
    const instance = this.instances.get(id);
    return instance ? structuredClone(instance) : undefined;
  }

  private requireDefinition(id: string): WorkflowDefinition {
    const definition = this.definitions.get(id);
    if (!definition) throw new Error(`Workflow definition not found: ${id}`);
    return definition;
  }

  private requireInstance(id: string): WorkflowInstance {
    const instance = this.instances.get(id);
    if (!instance) throw new Error(`Workflow instance not found: ${id}`);
    return structuredClone(instance);
  }
}
