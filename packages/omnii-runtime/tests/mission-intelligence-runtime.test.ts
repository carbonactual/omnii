import assert from "node:assert/strict";
import test from "node:test";
import { MissionIntelligenceRuntime, MissionTeamMember } from "../src/mission-intelligence-runtime";

const member = (id: string, swirm: string, capabilities: string[], extra: Partial<MissionTeamMember> = {}): MissionTeamMember => ({ id, swirm, capabilities, status: "selected", ...extra });

test("ready mission requires complete capability and swirm coverage", () => {
  const runtime = new MissionIntelligenceRuntime();
  const result = runtime.assess(
    { objective: "research", requiredCapabilities: ["research", "analysis"], requiredSwirms: ["knowledge", "reasoning"] },
    [member("m1", "knowledge", ["research"]), member("m2", "reasoning", ["analysis"], { dependsOn: ["m1"] })]
  );
  assert.equal(result.readiness, "ready");
  assert.deepEqual(result.executionOrder, ["m1", "m2"]);
  assert.deepEqual(result.missingCapabilities, []);
  assert.deepEqual(result.missingSwirms, []);
});

test("missing capability blocks mission", () => {
  const result = new MissionIntelligenceRuntime().assess(
    { objective: "build", requiredCapabilities: ["coding", "review"] },
    [member("m1", "engineering", ["coding"])]
  );
  assert.equal(result.readiness, "blocked");
  assert.deepEqual(result.missingCapabilities, ["review"]);
  assert.ok(result.blockingReasons.includes("missing_capabilities:review"));
});

test("missing swirm is surfaced independently", () => {
  const result = new MissionIntelligenceRuntime().assess(
    { objective: "mission", requiredSwirms: ["knowledge", "field"] },
    [member("m1", "knowledge", ["research"])]
  );
  assert.equal(result.readiness, "blocked");
  assert.deepEqual(result.missingSwirms, ["field"]);
});

test("dependency order is deterministic", () => {
  const result = new MissionIntelligenceRuntime().assess(
    { objective: "ordered work" },
    [member("c", "swirm-c", ["c"], { dependsOn: ["b"] }), member("a", "swirm-a", ["a"]), member("b", "swirm-b", ["b"], { dependsOn: ["a"] })]
  );
  assert.deepEqual(result.executionOrder, ["a", "b", "c"]);
});

test("missing dependency blocks execution", () => {
  const result = new MissionIntelligenceRuntime().assess(
    { objective: "dependency" },
    [member("m1", "swirm", ["work"], { dependsOn: ["missing"] })]
  );
  assert.equal(result.readiness, "blocked");
  assert.deepEqual(result.missingDependencies, [{ memberId: "m1", dependencyId: "missing" }]);
});

test("dependency cycle blocks execution", () => {
  const result = new MissionIntelligenceRuntime().assess(
    { objective: "cycle" },
    [member("a", "s1", ["a"], { dependsOn: ["b"] }), member("b", "s2", ["b"], { dependsOn: ["a"] })]
  );
  assert.equal(result.readiness, "blocked");
  assert.equal(result.dependencyCycles.length, 1);
});

test("explicit member conflicts block execution", () => {
  const result = new MissionIntelligenceRuntime().assess(
    { objective: "conflict" },
    [member("a", "s1", ["work"], { conflictsWith: ["b"] }), member("b", "s2", ["work"], { conflictsWith: ["a"] })]
  );
  assert.equal(result.readiness, "blocked");
  assert.equal(result.conflicts.length, 1);
});

test("authority requirements fail closed when no authority reference exists", () => {
  const result = new MissionIntelligenceRuntime().assess(
    { objective: "controlled work" },
    [member("a", "s1", ["work"], { authorityRequired: true })]
  );
  assert.equal(result.readiness, "blocked");
  assert.equal(result.authorityRequirements[0].satisfied, false);
});

test("human approval produces incomplete rather than falsely ready", () => {
  const result = new MissionIntelligenceRuntime().assess(
    { objective: "consequential work", humanApprovalRequired: true },
    [member("a", "s1", ["work"])]
  );
  assert.equal(result.readiness, "incomplete");
  assert.equal(result.humanApprovalRequired, true);
  assert.ok(result.warnings.includes("human_approval_required_before_consequential_execution"));
});

test("suspended or unavailable members cannot satisfy coverage", () => {
  const result = new MissionIntelligenceRuntime().assess(
    { objective: "resilient work", requiredCapabilities: ["work"] },
    [member("a", "s1", ["work"], { status: "suspended" })]
  );
  assert.equal(result.readiness, "blocked");
  assert.deepEqual(result.missingCapabilities, ["work"]);
});
