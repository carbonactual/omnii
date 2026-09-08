import assert from "node:assert/strict";
import test from "node:test";
import { executeGoverned, type ExecutionRequest } from "../src/execution-controller";
import type { DispatchDecision } from "../src/runtime-resolver";
import type { MissionAssessment } from "../src/mission-intelligence-runtime";

const request: ExecutionRequest = {
  id: "exec-1",
  action: "do-work",
  capability: "work",
  actorIdentity: "agent-1",
  correlationId: "corr-1",
  idempotencyKey: "idem-1",
  input: {},
};

const dispatch: DispatchDecision = { allowed: true, reason: "allowed" };

const readyAssessment: MissionAssessment = {
  readiness: "ready",
  objective: "do work",
  coverage: [],
  missingCapabilities: [],
  missingSwirms: [],
  missingDependencies: [],
  dependencyCycles: [],
  conflicts: [],
  authorityRequirements: [],
  humanApprovalRequired: false,
  executionOrder: [],
  blockingReasons: [],
  warnings: [],
  explainability: ["readiness=ready"],
};

const blockedAssessment: MissionAssessment = {
  ...readyAssessment,
  readiness: "blocked",
  blockingReasons: ["missing_capabilities:work"],
};

test("executeGoverned blocks when mission readiness is not supplied", async () => {
  let executed = false;
  const result = await executeGoverned(request, dispatch, {
    async execute() {
      executed = true;
      return { success: true };
    },
  });

  assert.equal(result.status, "blocked");
  assert.equal(result.error, "mission_readiness_required");
  assert.equal(executed, false);
});

test("executeGoverned blocks incomplete missions", async () => {
  const result = await executeGoverned(
    { ...request, missionAssessment: { ...readyAssessment, readiness: "incomplete" } },
    dispatch,
    { async execute() { return { success: true }; } },
  );

  assert.equal(result.status, "blocked");
  assert.equal(result.error, "mission_not_ready:incomplete");
});

test("executeGoverned blocks blocked missions", async () => {
  const result = await executeGoverned(
    { ...request, missionAssessment: blockedAssessment },
    dispatch,
    { async execute() { return { success: true }; } },
  );

  assert.equal(result.status, "blocked");
  assert.equal(result.error, "mission_not_ready:blocked");
});

test("executeGoverned executes only when mission is ready", async () => {
  const result = await executeGoverned(
    { ...request, missionAssessment: readyAssessment },
    dispatch,
    { async execute() { return { success: true, output: { ok: true } }; } },
  );

  assert.equal(result.status, "completed");
  assert.deepEqual(result.output, { ok: true });
});
