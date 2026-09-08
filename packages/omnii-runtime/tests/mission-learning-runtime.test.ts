import assert from "node:assert/strict";
import test from "node:test";
import { MissionLearningRuntime } from "../src/mission-learning-runtime";

const runtime = new MissionLearningRuntime();

test("MissionLearningRuntime scores successful capabilities and members deterministically", () => {
  const result = runtime.learn({
    missionId: "m1",
    successful: true,
    capabilityOutcomes: [
      { capability: "dispatch", success: true },
      { capability: "observe", success: true },
    ],
    memberOutcomes: [
      { memberId: "b", success: true },
      { memberId: "a", success: true },
    ],
  });

  assert.deepEqual(result.capabilitySignals, [
    { capability: "dispatch", attempts: 1, successes: 1, successRate: 1 },
    { capability: "observe", attempts: 1, successes: 1, successRate: 1 },
  ]);
  assert.deepEqual(result.memberSignals, [
    { memberId: "a", attempts: 1, successes: 1, successRate: 1 },
    { memberId: "b", attempts: 1, successes: 1, successRate: 1 },
  ]);
});

test("MissionLearningRuntime merges prior history without treating warnings as success", () => {
  const result = runtime.learn(
    {
      missionId: "m2",
      successful: false,
      capabilityOutcomes: [{ capability: "dispatch", success: false }],
      memberOutcomes: [{ memberId: "a", success: false }],
    },
    {
      capabilities: { dispatch: { attempts: 3, successes: 2 } },
      members: { a: { attempts: 2, successes: 2 } },
    },
  );

  assert.deepEqual(result.capabilitySignals[0], { capability: "dispatch", attempts: 4, successes: 2, successRate: 0.5 });
  assert.deepEqual(result.memberSignals[0], { memberId: "a", attempts: 3, successes: 2, successRate: 2 / 3 });
  assert.equal(result.warnings.includes("outcome_unsuccessful"), true);
});

test("MissionLearningRuntime produces selection hints but cannot grant authority", () => {
  const result = runtime.learn({
    missionId: "m3",
    successful: true,
    capabilityOutcomes: [{ capability: "dispatch", success: true }],
    memberOutcomes: [{ memberId: "trusted", success: true }],
  });

  assert.deepEqual(result.selectionHints, { dispatch: 1, trusted: 1 });
  assert.equal(result.authorityGranted, false);
});

test("MissionLearningRuntime deduplicates repeated outcome rows before scoring", () => {
  const result = runtime.learn({
    missionId: "m4",
    successful: true,
    capabilityOutcomes: [
      { capability: "dispatch", success: true },
      { capability: "dispatch", success: true },
    ],
    memberOutcomes: [
      { memberId: "a", success: true },
      { memberId: "a", success: true },
    ],
  });

  assert.deepEqual(result.capabilitySignals[0], { capability: "dispatch", attempts: 1, successes: 1, successRate: 1 });
  assert.deepEqual(result.memberSignals[0], { memberId: "a", attempts: 1, successes: 1, successRate: 1 });
});
