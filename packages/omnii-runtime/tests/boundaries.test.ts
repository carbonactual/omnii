

test("ABBA receives delegated authority and does not mint it", async () => {
  const persistence = new MemoryPersistenceAdapter(); const events = new EventStore(persistence); const executions = new ExecutionRuntime(events, persistence); const agents = new AgentRuntime(executions, events, persistence);
  const agentAuthority = { id: "agent-auth", subject: "agent-4", scope: [], capabilities: [], issued_at: new Date().toISOString(), revocable: true };
  const agent = await agents.register({ identity: "agent-4", authority: agentAuthority, capabilities: ["execute"], tools: [], context: {}, memory: {}, policyConstraints: {}, executionBoundary: {} }); await agents.verify(agent.identity);
  const delegated = { id: "delegated-auth", subject: agent.identity, scope: ["execute"], capabilities: ["execute"], issued_at: new Date().toISOString(), revocable: true, provenance: { issuer: "governance" } };
  const abba = new AbbaRuntime({ request: () => delegated }, agents, events); const requested = await abba.requestAuthority({ subject: agent.identity, capability: "execute", purpose: "authorized work", resourceIds: [], context: {} }); await abba.delegate({ purpose: "authorized work", capability: "execute", targetAgent: agent.identity, input: {}, mode: "delegate", approvalRequired: false }, requested);
  assert.equal((await agents.read(agent.identity))?.state, "active");
});

test("ABBA preserves common-layer context and explicit execution modes", () => {
  const persistence = new MemoryPersistenceAdapter(); const events = new EventStore(persistence); const executions = new ExecutionRuntime(events, persistence); const agents = new AgentRuntime(executions, events, persistence); const abba = new AbbaRuntime({ request: () => null }, agents, events);
  const requested = { capability: "execute", targetAgent: "agent-4", purpose: "test", mode: "confirm", approvalRequired: true };
  const context = abba.contextualize(requested);
  assert.equal((context.common_layer as Record<string, unknown>).authority, "AUTHORITY");
  const reasoning = abba.reason(context);
  assert.deepEqual(reasoning.requested, requested);
  const plan = abba.plan(reasoning);
  assert.equal(plan.mode, "confirm"); assert.equal(plan.approvalRequired, true);
});
