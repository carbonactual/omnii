import { JsonObject } from "./types";
import { ProcessProgressionResult, ProcessProgressionRuntime } from "./process-progression-runtime";
import { ProcessTask, ProcessTaskStatus, TaskQueuePolicy, TaskQueueRuntime, TaskTerminalStatus } from "./task-queue-runtime";

export interface ProcessTaskHandlerResult {
  outcome?: JsonObject;
  evidence?: JsonObject[];
  status?: TaskTerminalStatus;
}

export interface ProcessTaskHandlerContext {
  workerId: string;
  signal?: AbortSignal;
}

export interface ProcessTaskHandler {
  taskType: string;
  canHandle?: (task: ProcessTask) => boolean | Promise<boolean>;
  execute: (task: ProcessTask, context: ProcessTaskHandlerContext) => Promise<ProcessTaskHandlerResult>;
}

export interface ProcessWorkerRuntimeDependencies {
  queue: TaskQueueRuntime;
  progression?: ProcessProgressionRuntime;
  handlers: ProcessTaskHandler[];
  policy?: TaskQueuePolicy;
}

export type ProcessWorkerRunStatus = "idle" | "completed" | "blocked" | "failed" | "rejected" | "skipped";

export interface ProcessWorkerRunResult {
  status: ProcessWorkerRunStatus;
  task?: ProcessTask;
  progression?: ProcessProgressionResult;
  error?: string;
}

export class ProcessWorkerRuntime {
  private readonly queue: TaskQueueRuntime;
  private readonly progression?: ProcessProgressionRuntime;
  private readonly handlers: ProcessTaskHandler[];
  private readonly policy: TaskQueuePolicy;

  constructor(deps: ProcessWorkerRuntimeDependencies) {
    this.queue = deps.queue;
    this.progression = deps.progression;
    this.handlers = deps.handlers;
    this.policy = deps.policy ?? { maxAttempts: 3, leaseSeconds: 300 };
  }

  async runOnce(workerId: string, signal?: AbortSignal): Promise<ProcessWorkerRunResult> {
    const task = await this.queue.claim({ workerId, leaseSeconds: this.policy.leaseSeconds });
    if (!task) return { status: "idle" };

    const handler = await this.resolveHandler(task);
    if (!handler) {
      const blocked = await this.queue.escalate(task.id, "runtime-worker", `No eligible handler registered for task type: ${task.task_type}`);
      return { status: "blocked", task: blocked, error: "No eligible task handler" };
    }

    try {
      const result = await handler.execute(task, { workerId, signal });
      const completion = await this.queue.complete({
        taskId: task.id,
        workerId,
        outcome: result.outcome ?? {},
        evidence: result.evidence ?? [],
        status: result.status ?? "completed",
      });

      if (completion.status !== "completed") {
        return { status: completion.status as "rejected" | "skipped", task: completion };
      }

      const progression = this.progression
        ? await this.progression.progress(task.process_id, task.id, workerId)
        : undefined;
      return { status: "completed", task: completion, progression };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      const failed = await this.queue.fail({ taskId: task.id, workerId, error: message }, this.policy);
      const status: ProcessWorkerRunStatus = failed.status === "blocked" ? "blocked" : "failed";
      return { status, task: failed, error: message };
    }
  }

  async run(workerId: string, options: { maxTasks?: number; signal?: AbortSignal } = {}): Promise<ProcessWorkerRunResult[]> {
    const limit = Math.max(1, options.maxTasks ?? 1);
    const results: ProcessWorkerRunResult[] = [];
    for (let index = 0; index < limit; index += 1) {
      if (options.signal?.aborted) break;
      const result = await this.runOnce(workerId, options.signal);
      results.push(result);
      if (result.status === "idle") break;
    }
    return results;
  }

  private async resolveHandler(task: ProcessTask): Promise<ProcessTaskHandler | undefined> {
    for (const handler of this.handlers) {
      if (handler.taskType !== task.task_type) continue;
      if (!handler.canHandle || await handler.canHandle(task)) return handler;
    }
    return undefined;
  }
}
