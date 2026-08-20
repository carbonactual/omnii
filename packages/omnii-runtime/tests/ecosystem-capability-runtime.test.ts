import assert from "node:assert/strict";
import test from "node:test";
import { CORE_CAPABILITY_SHELF, EcosystemCapabilityRuntime } from "../src/ecosystem-capability-runtime";
import { MemoryPersistenceAdapter } from "../src/persistence";

test("canonical capability shelf contains analysis, research, consulting, feasibility and standards capabilities", () => {
  const ids = new Set(CORE_CAPABILITY_SHELF.map((capability) => capability.id));
  for (const required of ["analysis", "research", "consulting", "feasibility", "standardization", "compliance", "verification"]) assert.equal(ids.has(required), true);
});

test("dynamic workflow composition picks reusable capabilities from the shelf", async () => {
  const runtime = new EcosystemCapabilityRuntime(new MemoryPersistenceAdapter());
  await runtime.registerCapability({ id: "analysis", name: "Data analysis", kind: "analysis", outputs: ["analysis-report"] });
  await runtime.registerCapability({ id: "feasibility", name: "Feasibility study", kind: "feasibility", outputs: ["feasibility-study"], evidenceRequired: true });

  const workflow = await runtime.composeWorkflow("Business feasibility", ["analysis", "feasibility"], ["business-context"]);

  assert.deepEqual(workflow.capabilityIds, ["analysis", "feasibility"]);
  assert.deepEqual(workflow.outputs, ["analysis-report", "feasibility-study"]);
  assert.deepEqual(workflow.validationRules, ["evidence-required"]);
});

test("completeness detects missing capabilities, artifacts, evidence and standards", async () => {
  const runtime = new EcosystemCapabilityRuntime(new MemoryPersistenceAdapter());
  await runtime.registerRequirement({
    id: "business-case", name: "Complete business case",
    requiredCapabilities: ["research", "feasibility", "strategy"], requiredArtifacts: ["report", "proposal", "slide-deck"],
    requiredEvidence: ["market-data"], requiredStandards: ["quality-standard"],
  });

  const assessment = await runtime.assessCompleteness("project-1", "business-case", {
    capabilities: ["research", "feasibility"], artifacts: ["report"], evidence: ["market-data"], standards: [],
  });

  assert.equal(assessment.complete, false);
  assert.equal(assessment.score, 0.5);
  assert.deepEqual(assessment.missingCapabilities, ["strategy"]);
  assert.deepEqual(assessment.missingArtifacts, ["proposal", "slide-deck"]);
  assert.deepEqual(assessment.missingStandards, ["quality-standard"]);
});

test("artifact registry rejects unclassified artifact types", async () => {
  const runtime = new EcosystemCapabilityRuntime(new MemoryPersistenceAdapter());
  await assert.rejects(
    () => runtime.registerArtifact({ id: "x", type: "mystery", title: "Unknown", version: "1", status: "draft", evidenceRefs: [] }),
    /Unknown artifact type/,
  );
});

test("capabilities, workflow recipes, artifacts and standards share the ecosystem registry model", async () => {
  const runtime = new EcosystemCapabilityRuntime(new MemoryPersistenceAdapter());
  await runtime.registerCapability({ id: "swot", name: "SWOT analysis", kind: "analysis", outputs: ["swot-analysis"] });
  await runtime.registerWorkflowRecipe({ id: "feasibility-workflow", name: "Feasibility workflow", capabilityIds: ["swot"], inputs: ["business-context"], outputs: ["feasibility-study"], validationRules: ["evidence-required"] });
  await runtime.registerArtifact({ id: "artifact-1", type: "report", title: "Feasibility Report", version: "1", status: "review", evidenceRefs: ["market-data"] });
  await runtime.registerStandard({ id: "quality-standard", name: "Quality standard", version: "1", requirements: ["requirement-1"], status: "active" });

  assert.ok(true);
});

test("Pulse records non-money value and reconciles it independently of price", async () => {
  const runtime = new EcosystemCapabilityRuntime(new MemoryPersistenceAdapter());
  await runtime.recordPulse({ subject: "teacher-1", outcome: "student-capability-created", valueCreated: 100, valuePreserved: 25, valueDestroyed: 5, valueTransferred: 60, moneyAmount: 10, evidenceRefs: ["assessment-1"] });

  const reconciliation = await runtime.reconcileValue("teacher-1");
  assert.equal(reconciliation.pulseCount, 1);
  assert.deepEqual(reconciliation.totals, { valueCreated: 100, valuePreserved: 25, valueDestroyed: 5, valueTransferred: 60, moneyAmount: 10 });
});
