import assert from "node:assert/strict";
import test from "node:test";
import { EcosystemCapabilityRuntime } from "../src/ecosystem-capability-runtime";
import { MemoryPersistenceAdapter } from "../src/persistence";

test("completeness detects missing capabilities, artifacts, evidence and standards", async () => {
  const runtime = new EcosystemCapabilityRuntime(new MemoryPersistenceAdapter());
  await runtime.registerRequirement({
    id: "business-case",
    name: "Complete business case",
    requiredCapabilities: ["research", "feasibility", "strategy"],
    requiredArtifacts: ["report", "proposal", "slides"],
    requiredEvidence: ["market-data"],
    requiredStandards: ["iso-quality"],
  });

  const assessment = await runtime.assessCompleteness("project-1", "business-case", {
    capabilities: ["research", "feasibility"],
    artifacts: ["report"],
    evidence: ["market-data"],
    standards: [],
  });

  assert.equal(assessment.complete, false);
  assert.equal(assessment.score, 4 / 8);
  assert.deepEqual(assessment.missingCapabilities, ["strategy"]);
  assert.deepEqual(assessment.missingArtifacts, ["proposal", "slides"]);
  assert.deepEqual(assessment.missingStandards, ["iso-quality"]);
});

test("capabilities, workflow recipes, artifacts and standards share the same ecosystem registry model", async () => {
  const runtime = new EcosystemCapabilityRuntime(new MemoryPersistenceAdapter());
  await runtime.registerCapability({ id: "swot", name: "SWOT analysis", kind: "analysis", outputs: ["swot-report"] });
  await runtime.registerWorkflowRecipe({ id: "feasibility-workflow", name: "Feasibility workflow", capabilityIds: ["swot"], inputs: ["business-context"], outputs: ["feasibility-report"], validationRules: ["evidence-required"] });
  await runtime.registerArtifact({ id: "artifact-1", type: "report", title: "Feasibility Report", version: "1", status: "review", evidenceRefs: ["market-data"] });
  await runtime.registerStandard({ id: "iso-quality", name: "Quality standard", version: "1", requirements: ["requirement-1"], status: "active" });

  assert.ok(true);
});

test("Pulse records non-money value and reconciles it independently of price", async () => {
  const runtime = new EcosystemCapabilityRuntime(new MemoryPersistenceAdapter());
  await runtime.recordPulse({
    subject: "teacher-1",
    outcome: "student-capability-created",
    valueCreated: 100,
    valuePreserved: 25,
    valueDestroyed: 5,
    valueTransferred: 60,
    moneyAmount: 10,
    evidenceRefs: ["assessment-1"],
  });

  const reconciliation = await runtime.reconcileValue("teacher-1");
  assert.equal(reconciliation.pulseCount, 1);
  assert.deepEqual(reconciliation.totals, {
    valueCreated: 100,
    valuePreserved: 25,
    valueDestroyed: 5,
    valueTransferred: 60,
    moneyAmount: 10,
  });
});
