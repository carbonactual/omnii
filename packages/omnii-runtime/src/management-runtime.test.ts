import assert from "node:assert/strict";
import test from "node:test";
import { MemoryPersistenceAdapter } from "./persistence";
import { ManagementRuntime } from "./management-runtime";

test("management runtime baselines, plans and tracks a governed objective", async () => {
  const runtime = new ManagementRuntime(new MemoryPersistenceAdapter());

  const mandate = await runtime.createMandate({
    subjectId: "enterprise-1",
    objective: "Reduce order fulfillment delay",
    authorityRef: "seal-1",
    managerRef: "human-1",
    scope: "operations",
  });

  await runtime.setBaseline(mandate.id, { openOrders: 100, averageDays: 8 });
  const plan = await runtime.createPlan(mandate.id, [{ action: "reroute", owner: "ops-1" }]);
  const decision = await runtime.recordDecision(mandate.id, { decision: "activate-reroute", rationale: ["delay above threshold"], authorizedBy: "seal-1" });

  assert.equal(mandate.subjectId, "enterprise-1");
  assert.deepEqual(plan.steps, [{ action: "reroute", owner: "ops-1" }]);
  assert.equal(decision.authorizedBy, "seal-1");
});

test("management runtime creates executable work with explicit dependencies and authority", async () => {
  const runtime = new ManagementRuntime(new MemoryPersistenceAdapter());
  const mandate = await runtime.createMandate({ subjectId: "project-1", objective: "Launch", authorityRef: "seal-2", managerRef: "manager-1", scope: "delivery" });

  const work = await runtime.createWork(mandate.id, {
    title: "Provision production environment",
    assignee: "agent-1",
    capabilityIds: ["deployment"],
    dependencyIds: ["evaluation-1"],
    authorityRef: "seal-2",
  });

  assert.equal(work.state, "planned");
  assert.deepEqual(work.dependencyIds, ["evaluation-1"]);
  assert.equal(work.authorityRef, "seal-2");
});

test("management runtime observes outcome, reconciles state and records Pulse", async () => {
  const runtime = new ManagementRuntime(new MemoryPersistenceAdapter());
  const mandate = await runtime.createMandate({ subjectId: "service-1", objective: "Improve uptime", authorityRef: "policy-1", managerRef: "manager-1", scope: "service" });

  await runtime.observe(mandate.id, { uptime: 99.5, incidents: 2 });
  await runtime.completeWork(mandate.id, "work-1", { result: "stabilized" });
  const pulse = await runtime.recordOutcome(mandate.id, { outcome: "uptime-improved", valueCreated: 40, valuePreserved: 10, moneyAmount: 5, evidenceRefs: ["obs-1"] });
  const summary = await runtime.snapshot(mandate.id);

  assert.equal(pulse.outcome, "uptime-improved");
  assert.equal(summary.latestObservation?.uptime, 99.5);
  assert.equal(summary.latestPulse?.valueCreated, 40);
});

test("management runtime rejects work when the mandate does not exist", async () => {
  const runtime = new ManagementRuntime(new MemoryPersistenceAdapter());
  await assert.rejects(
    () => runtime.createWork("missing", { title: "x", assignee: "a", capabilityIds: [], dependencyIds: [], authorityRef: "seal" }),
    /Management mandate not found/,
  );
});
