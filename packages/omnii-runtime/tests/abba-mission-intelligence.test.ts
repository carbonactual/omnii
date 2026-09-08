import assert from "node:assert/strict";
import test from "node:test";
import { AbbaRuntime } from "../src/abba-runtime";
import { AgentRuntime } from "../src/agent-runtime";
import { EventStore } from "../src/event-runtime";
import { ExecutionRuntime } from "../src/execution-runtime";
import { MemoryPersistenceAdapter } from "../src/persistence";

const authority = {
  id: "auth-1",
  subject: "agent-1",
  scope: ["execute"],
  capabilities: ["execute"],
  issued_at: new Date().toISOString(),
  revocable: true,
};

test("ABBA exposes mission assessment as an orchestration gate", () => {
  const persistence = new MemoryPersistenceAdapter();
  const events = new EventStore(persistence);
  const executions = new ExecutionRuntime(events, persistence);
  const agents = new AgentRuntime(executions, events, persistence);
  const abba = new AbbaRuntime({ request: () => null }, agents, events);
  const assessment = abba.assessMission(
    { objective: "deliver result", requiredCapabilities: ["research", "analysis"] },
    [
      { id: "agent-1", swirm: "research", capabilities: ["research"], authorityRequired: true, authorityRef: authority.id },
      { id: "agent-2", swirm: "analysis", capabilities: ["analysis"], dependsOn: ["agent-1"] },
    ],
  );
  assert.equal(assessment.readiness, "ready");
  assert.deepEqual(assessment.executionOrder, ["agent-1", "agent-2"]);
});
