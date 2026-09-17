import assert from "node:assert/strict";
import test from "node:test";
import { AbbaRuntime, AbbaPlan } from "../src/abba-runtime";
import { AgentRuntime } from "../src/agent-runtime";
import { EventStore } from "../src/event-runtime";
import { ExecutionRuntime } from "../src/execution-runtime";
import { MemoryPersistenceAdapter } from "../src/persistence";
import { MissionIntelligenceRuntime } from "../src/mission-intelligence-runtime";

function makeRuntime() {
  const persistence = new MemoryPersistenceAdapter();
  const events = new EventStore(persistence);
  const executions = new ExecutionRuntime(events, persistence);
  const agents = new AgentRuntime(executions, events, persistence);
  const abba = new AbbaRuntime({ request: () => null }, agents, events, "ABBA", undefined, new MissionIntelligenceRuntime());
  return { persistence, events, executions, agents, abba };
}

test("ABBA cannot delegate a revoked authority", async () => {
  const { events, agents, abba } = makeRuntime();

  await agents.register({
    identity: "agent-1",
    authority: {
      id: "agent-authority",
      subject: "agent-1",
      scope: ["execute"],
      capabilities: ["execute"],
      issued_at: new Date().toISOString(),
      revocable: true,
    },
    capabilities: ["execute"],
    tools: [],
    context: {},
    memory: {},
    policyConstraints: {},
    executionBoundary: {},
  });
  await agents.verify("agent-1");

  const plan: AbbaPlan = {
    purpose: "execute governed work",
    capability: "execute",
    targetAgent: "agent-1",
    input: {},
    mode: "delegate",
    approvalRequired: false,
  };

  const revokedAuthority = {
    id: "revoked-delegation",
    subject: "agent-1",
    scope: ["execute"],
    capabilities: ["execute"],
    issued_at: new Date().toISOString(),
    revocable: true,
    revoked_at: new Date().toISOString(),
  };

  await assert.rejects(
    () => abba.delegate(plan, revokedAuthority),
    /Authority has been revoked/,
  );

  const delegationEvents = (await events.all()).filter((event) => event.type === "ABBA_DELEGATION");
  assert.equal(delegationEvents.length, 0);
});

test("mission readiness does not mutate authority or authorize execution", async () => {
  const { agents, abba } = makeRuntime();
  const assessment = abba.assessMission(
    { objective: "deliver result", requiredCapabilities: ["research"] },
    [{ id: "agent-1", swirm: "research", capabilities: ["research"], authorityRequired: true, authorityRef: "missing-authority" }],
  );

  assert.equal(assessment.readiness, "ready");
  const registered = await agents.register({
    identity: "agent-1",
    authority: {
      id: "agent-authority",
      subject: "agent-1",
      scope: ["execute"],
      capabilities: ["execute"],
      issued_at: new Date().toISOString(),
      revocable: true,
    },
    capabilities: ["execute"],
    tools: [],
    context: {},
    memory: {},
    policyConstraints: {},
    executionBoundary: {},
  });

  assert.equal(registered.state, "registered");
});
