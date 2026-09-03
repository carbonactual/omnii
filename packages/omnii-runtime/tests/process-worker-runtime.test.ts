import assert from "node:assert/strict";
import test from "node:test";
import { EventStore } from "../src/event-runtime";
import { MemoryPersistenceAdapter } from "../src/persistence";
import { ProcessProgressionRuntime } from "../src/process-progression-runtime";
import { ProcessWorkerRuntime } from "../src/process-worker-runtime";
import { TaskQueueRuntime } from "../src/task-queue-runtime";

test("worker claims an eligible task, records evidence, and advances the process", async () => {
  const persistence = new MemoryPersistenceAdapter();
  const events = new EventStore(persistence);
  const queue = new TaskQueueRuntime({ persistence, events });

  await persistence.create("process_instances", {
    id: "process-1",
    process_type: "licence",
    status: "active",
    current_stage: "submitted",
    context: { applicant_id: "app-1" },
    state: {},
    workflow_id: "licence-workflow",
    workflow_version: "1.0.0",
    authority: {},
    evidence: {},
    version: "1",
  });

  await persistence.create("workflows", {
    id: "licence-workflow",
    version: "1.0.0",
    states: ["submitted", "validated"],
    transitions: {
      submitted: [{ event: "validate", to: "validated", task_type: "validation" }],
      validated: [],
    },
  });

  const initialTask = await queue.enqueue({
    id: "task-1",
    process_id: "process-1",
    stage: "submitted",
    task_type: "validation",
    requirements: { requiredEvidence: ["validation"] },
  });

  const progression = new ProcessProgressionRuntime(persistence, events, queue);
  const worker = new ProcessWorkerRuntime({
    queue,
    progression,
    handlers: [{
      taskType: "validation",
      execute: async () => ({ outcome: { event: "validate", result: "validated" }, evidence: [{ type: "validation", source: "worker-test" }] }),
    }],
    policy: { maxAttempts: 3, leaseSeconds: 60 },
  });

  const result = await worker.runOnce("worker-1");
  assert.equal(result.status, "completed");
  assert.equal(result.task.id, initialTask.id);
  assert.equal(result.progression?.process.current_stage, "validated");
  assert.equal(result.progression?.process.status, "active");
});

test("worker refuses unregistered task types and leaves them governed", async () => {
  const persistence = new MemoryPersistenceAdapter();
  const queue = new TaskQueueRuntime({ persistence, events: new EventStore(persistence) });
  await queue.enqueue({ id: "task-unknown", process_id: "process-unknown", stage: "submitted", task_type: "unknown", requirements: {} });
  const worker = new ProcessWorkerRuntime({ queue, handlers: [], policy: { maxAttempts: 3, leaseSeconds: 60 } });
  const result = await worker.runOnce("worker-2");
  assert.equal(result.status, "blocked");
  assert.equal(result.task.status, "blocked");
});
