import assert from "node:assert/strict";
import test from "node:test";
import { MissionAdaptationRuntime } from "../src/mission-adaptation-runtime";
import type { MissionTeamMember, MissionDefinition } from "../src/mission-intelligence-runtime";

const mission: MissionDefinition = {
  objective: "operate safely",
  requiredCapabilities: ["dispatch", "observe"],
};

const original: MissionTeamMember[] = [
  { id: "a", swirm: "ops", capabilities: ["dispatch"], status: "selected" },
  { id: "b", swirm: "intel", capabilities: ["observe"], status: "selected" },
];

test("MissionAdaptationRuntime replaces an unavailable member with the safest deterministic candidate", () => {
  const result = new MissionAdaptationRuntime().adapt(
    mission,
    original,
    [{ memberId: "a", reason: "node_failure" }],
    [
      { id: "z", swirm: "ops", capabilities: ["dispatch"], status: "available" },
      { id: "c", swirm: "other", capabilities: ["dispatch"], status: "available" },
    ],
  );

  assert.equal(result.status, "adapted");
  assert.deepEqual(result.changes, [{
    failedMemberId: "a",
    replacementMemberId: "c",
    recoveredCapabilities: ["dispatch"],
    replacementSwirm: "other",
  }]);
  assert.equal(result.assessment.readiness, "ready");
});

test("MissionAdaptationRuntime prefers higher capability coverage and then deterministic id order", () => {
  const result = new MissionAdaptationRuntime().adapt(
    { ...mission, requiredCapabilities: ["dispatch", "observe"] },
    original,
    [{ memberId: "a", reason: "unavailable" }],
    [
      { id: "z", swirm: "ops", capabilities: ["dispatch"], status: "available" },
      { id: "c", swirm: "other", capabilities: ["dispatch", "observe"], status: "available" },
      { id: "d", swirm: "other", capabilities: ["dispatch", "observe"], status: "available" },
    ],
  );

  assert.equal(result.status, "adapted");
  assert.equal(result.changes[0]?.replacementMemberId, "c");
});

test("MissionAdaptationRuntime does not widen authority during recovery", () => {
  const restrictedMission: MissionDefinition = {
    ...mission,
    authorityRefs: ["authority:ops"],
  };
  const result = new MissionAdaptationRuntime().adapt(
    restrictedMission,
    [{ id: "a", swirm: "ops", capabilities: ["dispatch"], status: "selected" }],
    [{ memberId: "a", reason: "revoked" }],
    [
      { id: "unsafe", swirm: "ops", capabilities: ["dispatch"], authorityRequired: true, authorityRef: "authority:other", status: "available" },
      { id: "safe", swirm: "ops", capabilities: ["dispatch"], authorityRequired: true, authorityRef: "authority:ops", status: "available" },
    ],
  );

  assert.equal(result.status, "adapted");
  assert.equal(result.changes[0]?.replacementMemberId, "safe");
});

test("MissionAdaptationRuntime halts when no safe replacement exists", () => {
  const result = new MissionAdaptationRuntime().adapt(
    mission,
    original,
    [{ memberId: "a", reason: "revoked" }],
    [{ id: "unsafe", swirm: "ops", capabilities: ["dispatch"], status: "suspended" }],
  );

  assert.equal(result.status, "halted");
  assert.equal(result.haltedReason, "no_safe_replacement:a");
  assert.equal(result.assessment.readiness, "blocked");
});

test("MissionAdaptationRuntime tolerates a failure when redundant coverage remains", () => {
  const redundant: MissionTeamMember[] = [
    { id: "a", swirm: "ops", capabilities: ["dispatch"], status: "selected" },
    { id: "b", swirm: "ops", capabilities: ["dispatch"], status: "selected" },
    { id: "c", swirm: "intel", capabilities: ["observe"], status: "selected" },
  ];
  const result = new MissionAdaptationRuntime().adapt(mission, redundant, [{ memberId: "a", reason: "network_loss" }], []);

  assert.equal(result.status, "adapted");
  assert.deepEqual(result.changes, []);
  assert.equal(result.assessment.readiness, "ready");
});

test("MissionAdaptationRuntime keeps human approval as incomplete rather than turning recovery into authorization", () => {
  const result = new MissionAdaptationRuntime().adapt(
    { ...mission, humanApprovalRequired: true },
    original,
    [{ memberId: "a", reason: "failure" }],
    [{ id: "replacement", swirm: "ops", capabilities: ["dispatch"], status: "available" }],
  );

  assert.equal(result.status, "adapted");
  assert.equal(result.assessment.readiness, "incomplete");
  assert.equal(result.assessment.humanApprovalRequired, true);
});
