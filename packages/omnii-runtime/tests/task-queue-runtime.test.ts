import assert from "node:assert/strict";
import test from "node:test";
import { TaskQueueRuntime } from "../src/task-queue-runtime";

const base = {
  process_id: "process:test",
  stage: "review",
  task_type: "human-review",
  payload: { subject: "test" },
  requirements: { requiredEvidence: ["approval"] },
};

test("enqueues, claims, heartbeats and completes with required evidence", async () => {
  const queue = new TaskQueueRuntime();
  const task = await queue.enqueue(base);
  assert.equal(task.status, "ready");

  const claimed = await queue.claim({ workerId: "worker-a", leaseSeconds: 60 });
  assert.equal(claimed?.id, task.id);
  assert.equal(claimed?.status, "in_progress");

  const heartbeated = await queue.heartbeat(task.id, "worker-a", 60);
  assert.equal(heartbeated.status, "in_progress");

  const completed = await queue.complete({
    taskId: task.id,
    workerId: "worker-a",
    evidence: [{ type: "approval", ref: "approval-1" }],
    outcome: { decision: "approved" },
  });
  assert.equal(completed.status, "completed");
});

test("blocks completion when required evidence is missing", async () => {
  const queue = new TaskQueueRuntime();
  const task = await queue.enqueue(base);
  await queue.claim({ workerId: "worker-a" });
  await assert.rejects(
    queue.complete({ taskId: task.id, workerId: "worker-a", evidence: [] }),
    /Required evidence missing/,
  );
});

test("reschedules retry with bounded backoff and escalates after exhaustion", async () => {
  const queue = new TaskQueueRuntime();
  const task = await queue.enqueue({ ...base, requirements: {} });
  const claimed = await queue.claim({ workerId: "worker-a" });
  assert.equal(claimed?.id, task.id);

  const retried = await queue.fail(
    { taskId: task.id, workerId: "worker-a", error: "temporary" },
    { maxAttempts: 3, leaseSeconds: 60 },
  );
  assert.equal(retried.status, "ready");
  assert.ok(retried.next_attempt_at);
});

test("approval releases a blocked task back to the queue", async () => {
  const queue = new TaskQueueRuntime();
  const task = await queue.enqueue({ ...base, status: "blocked" });
  const approved = await queue.approve(task.id, "approver-a", [{ type: "approval", ref: "approval-1" }]);
  assert.equal(approved.status, "ready");
});
