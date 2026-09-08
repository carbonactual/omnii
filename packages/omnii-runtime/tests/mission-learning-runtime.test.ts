import { describe, expect, it } from "vitest";
import { MissionLearningRuntime } from "../src/mission-learning-runtime";

const runtime = new MissionLearningRuntime();

describe("MissionLearningRuntime", () => {
  it("scores successful capabilities and members deterministically", () => {
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

    expect(result.capabilitySignals).toEqual([
      { capability: "dispatch", attempts: 1, successes: 1, successRate: 1 },
      { capability: "observe", attempts: 1, successes: 1, successRate: 1 },
    ]);
    expect(result.memberSignals).toEqual([
      { memberId: "a", attempts: 1, successes: 1, successRate: 1 },
      { memberId: "b", attempts: 1, successes: 1, successRate: 1 },
    ]);
  });

  it("merges prior history without treating warnings as success", () => {
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

    expect(result.capabilitySignals[0]).toEqual({ capability: "dispatch", attempts: 4, successes: 2, successRate: 0.5 });
    expect(result.memberSignals[0]).toEqual({ memberId: "a", attempts: 3, successes: 2, successRate: 2 / 3 });
    expect(result.warnings).toContain("outcome_unsuccessful");
  });

  it("produces selection hints but cannot grant authority", () => {
    const result = runtime.learn({
      missionId: "m3",
      successful: true,
      capabilityOutcomes: [{ capability: "dispatch", success: true }],
      memberOutcomes: [{ memberId: "trusted", success: true }],
    });

    expect(result.selectionHints).toEqual({ dispatch: 1, trusted: 1 });
    expect(result.authorityGranted).toBe(false);
  });

  it("deduplicates repeated outcome rows before scoring", () => {
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

    expect(result.capabilitySignals[0]).toEqual({ capability: "dispatch", attempts: 1, successes: 1, successRate: 1 });
    expect(result.memberSignals[0]).toEqual({ memberId: "a", attempts: 1, successes: 1, successRate: 1 });
  });
});
