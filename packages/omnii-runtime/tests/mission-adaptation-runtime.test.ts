import { describe, expect, it } from "vitest";
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

describe("MissionAdaptationRuntime", () => {
  it("replaces an unavailable member with the safest deterministic candidate", () => {
    const result = new MissionAdaptationRuntime().adapt(
      mission,
      original,
      [{ memberId: "a", reason: "node_failure" }],
      [
        { id: "z", swirm: "ops", capabilities: ["dispatch"], status: "available" },
        { id: "c", swirm: "other", capabilities: ["dispatch"], status: "available" },
      ],
    );

    expect(result.status).toBe("adapted");
    expect(result.changes).toEqual([
      {
        failedMemberId: "a",
        replacementMemberId: "c",
        recoveredCapabilities: ["dispatch"],
        replacementSwirm: "other",
      },
    ]);
    expect(result.assessment.readiness).toBe("ready");
  });

  it("prefers higher capability coverage and then deterministic id order", () => {
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

    expect(result.status).toBe("adapted");
    expect(result.changes[0]?.replacementMemberId).toBe("c");
  });

  it("does not widen authority during recovery", () => {
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

    expect(result.status).toBe("adapted");
    expect(result.changes[0]?.replacementMemberId).toBe("safe");
  });

  it("halts when no safe replacement exists", () => {
    const result = new MissionAdaptationRuntime().adapt(
      mission,
      original,
      [{ memberId: "a", reason: "revoked" }],
      [{ id: "unsafe", swirm: "ops", capabilities: ["dispatch"], status: "suspended" }],
    );

    expect(result.status).toBe("halted");
    expect(result.haltedReason).toBe("no_safe_replacement:a");
    expect(result.assessment.readiness).toBe("blocked");
  });

  it("tolerates a failure when redundant coverage remains", () => {
    const redundant: MissionTeamMember[] = [
      { id: "a", swirm: "ops", capabilities: ["dispatch"], status: "selected" },
      { id: "b", swirm: "ops", capabilities: ["dispatch"], status: "selected" },
      { id: "c", swirm: "intel", capabilities: ["observe"], status: "selected" },
    ];
    const result = new MissionAdaptationRuntime().adapt(
      mission,
      redundant,
      [{ memberId: "a", reason: "network_loss" }],
      [],
    );

    expect(result.status).toBe("adapted");
    expect(result.changes).toEqual([]);
    expect(result.assessment.readiness).toBe("ready");
  });

  it("keeps human approval as incomplete rather than turning recovery into authorization", () => {
    const result = new MissionAdaptationRuntime().adapt(
      { ...mission, humanApprovalRequired: true },
      original,
      [{ memberId: "a", reason: "failure" }],
      [{ id: "replacement", swirm: "ops", capabilities: ["dispatch"], status: "available" }],
    );

    expect(result.status).toBe("adapted");
    expect(result.assessment.readiness).toBe("incomplete");
    expect(result.assessment.humanApprovalRequired).toBe(true);
  });
});
