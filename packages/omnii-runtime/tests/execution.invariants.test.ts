import assert from "node:assert/strict";
import test from "node:test";
import { ExecutionRuntime } from "../src/execution-runtime";
import { EventStore } from "../src/event-runtime";
import { MemoryPersistenceAdapter } from "../src/persistence";
import type { Authority } from "../src/types";

const authority = (): Authority => ({
  id: crypto.randomUUID(),
  subject: "human-1",
  scope: ["execute"],
  capabilities: ["execute"],
  issued_at: new Date().toISOString(),
  revocable: true,
  provenance: { source: "test" },
});

const input = () => ({
  intentReference: "intent-1",
  actorIdentity: "human-1",
  authorityContext: authority(),
  capability: "execute",
  resources: [],
  dependencies: [],
  input: { ok: true },
  provenance: { source: "test" },
});

test("execution validation is single-entry and terminal states cannot be mutated", async () => {
  const persistence = new MemoryPersistenceAdapter();
  const runtime = new ExecutionRuntime(new EventStore(persistence), persistence);
  const execution = await runtime.create(input());

  await runtime.validate(execution.id);
  await assert.rejects(() => runtime.validate(execution.id), /must be created before validation/);

  await runtime.authorize(execution.id);
  const completed = await runtime.run(execution.id, () => ({ done: true }));
  assert.equal(completed.state, "completed");

  await assert.rejects(() => runtime.fail(execution.id, "late failure"), /Terminal execution cannot fail/);
  await assert.rejects(() => runtime.cancel(execution.id), /Terminal execution cannot be cancelled/);
  assert.equal((await runtime.read(execution.id))?.state, "completed");
});
