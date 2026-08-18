import { randomUUID } from "node:crypto";
import { Authority, JsonObject } from "./types";
import { authorize, EventStore, OmniiEvent } from "./event-runtime";

export type ExecutionState = "created" | "validated" | "authorized" | "running" | "completed" | "failed" | "cancelled";

export interface Execution {
  id: string;
  intentReference: string;
  actorIdentity: string;
  authorityContext: Authority;
  capability: string;
  resources: string[];
  dependencies: string[];
  input: JsonObject;
  output?: JsonObject;
  state: ExecutionState;
  createdAt: string;
  updatedAt: string;
  provenance: JsonObject;
  auditReference?: string;
}

export type ExecutionHandler = (input: JsonObject) => JsonObject;

export class ExecutionRuntime {
  private readonly executions = new Map<string, Execution>();

  constructor(private readonly events: EventStore) {}

  create(input: Omit<Execution, "id" | "state" | "createdAt" | "updatedAt">): Execution {
    const now = new Date().toISOString();
    const execution: Execution = { ...input, id: randomUUID(), state: "created", createdAt: now, updatedAt: now };
    this.executions.set(execution.id, structuredClone(execution));
    return structuredClone(execution);
  }

  validate(id: string): Execution {
    const execution = this.require(id);
    if (!execution.intentReference || !execution.actorIdentity || !execution.capability) throw new Error("Execution contract is incomplete");
    return this.setState(execution, "validated");
  }

  authorize(id: string): Execution {
    const execution = this.require(id);
    if (execution.state !== "validated") throw new Error("Execution must be validated before authorization");
    authorize(execution.authorityContext, execution.capability);
    return this.setState(execution, "authorized");
  }

  run(id: string, handler: ExecutionHandler): Execution {
    const execution = this.require(id);
    if (execution.state !== "authorized") throw new Error("Execution must be authorized before run");
    const running = this.setState(execution, "running");
    try {
      const output = handler(structuredClone(running.input));
      const completed = this.setState({ ...running, output }, "completed");
      const event = this.record(completed, "EXECUTION_COMPLETED", "success");
      return { ...completed, auditReference: event.id };
    } catch (error) {
      const failed = this.setState({ ...running, output: { error: error instanceof Error ? error.message : String(error) } }, "failed");
      this.record(failed, "EXECUTION_FAILED", "failure");
      return failed;
    }
  }

  fail(id: string, reason: string): Execution {
    const execution = this.require(id);
    const failed = this.setState({ ...execution, output: { error: reason } }, "failed");
    this.record(failed, "EXECUTION_FAILED", "failure");
    return failed;
  }

  cancel(id: string): Execution {
    const execution = this.require(id);
    if (["completed", "failed", "cancelled"].includes(execution.state)) throw new Error("Terminal execution cannot be cancelled");
    return this.setState(execution, "cancelled");
  }

  complete(id: string, output: JsonObject = {}): Execution {
    const execution = this.require(id);
    if (execution.state !== "running") throw new Error("Only running executions can complete");
    const completed = this.setState({ ...execution, output }, "completed");
    const event = this.record(completed, "EXECUTION_COMPLETED", "success");
    return { ...completed, auditReference: event.id };
  }

  audit(id: string): OmniiEvent[] {
    return this.events.bySubject(id);
  }

  read(id: string): Execution | undefined {
    const execution = this.executions.get(id);
    return execution ? structuredClone(execution) : undefined;
  }

  private require(id: string): Execution {
    const execution = this.executions.get(id);
    if (!execution) throw new Error(`Execution not found: ${id}`);
    return structuredClone(execution);
  }

  private setState(execution: Execution, state: ExecutionState): Execution {
    const updated = { ...execution, state, updatedAt: new Date().toISOString() };
    this.executions.set(updated.id, structuredClone(updated));
    return structuredClone(updated);
  }

  private record(execution: Execution, type: string, outcome: string): OmniiEvent {
    return this.events.append({
      type,
      actor: execution.actorIdentity,
      subject: execution.id,
      outcome,
      provenance: { authority_id: execution.authorityContext.id, capability: execution.capability },
      payload: { state: execution.state },
    });
  }
}
