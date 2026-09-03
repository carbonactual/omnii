import assert from "node:assert/strict";
import test from "node:test";
import { EventStore } from "../src/event-runtime";
import { MemoryPersistenceAdapter } from "../src/persistence";
import { TaskQueueRuntime } from "../src/task-queue-runtime";
import { ProcessProgressionRuntime } from "../src/process-progression-runtime";

test("completed task advances process, creates next task, and respects approval gate", async () => {
  const persistence = new MemoryPersistenceAdapter();
  const events = new EventStore(persistence);
  const queue = new TaskQueueRuntime(persistence, events);

  await persistence.create("process_instances", {
    id: "process-1",
    process_type: "licence",
    status: "running",
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
    states: ["submitted", "validated", "approved"],
    transitions: {
      submitted: [{ event: "validate", to: "validated", task_type: "validation" }],
      validated: [{ event: "approve", to: "approved", task_type: "approval", approval_required: true }],
    },
    approval_gates: ["licensing-authority"],
  });

  const initialTask = await queue.enqueue({
    processId: "process-1",
    stage: "submitted",
    taskType: "validation",
    payload: { applicant_id: "app-1" },
    requirements: {},
  });

  const runtime = new ProcessProgressionRuntime(persistence, events, queue);
  const claimed = await queue.claim({ workerId: "worker-1" });
  assert.equal(claimed?.status, "in_progress");

  await queue.complete({ taskId: initialTask.id, workerId: "worker-1", outcome: { event: "validate" } });

  const result = await runtime.progress("process-1", initialTask.id, "worker-1");
  assert.equal(result.process.status, "waiting_approval");
  assert.equal(result.process.current_stage, "validated");
  assert.equal(result.nextTasks.length, 1);
  assert.equal(result.nextTasks[0].status, "blocked");
  assert.equal(result.nextTasks[0].task_type, "approval");
});
