import { describe, expect, it } from "vitest";
import {
  assertBunkEcosystemCapabilityUse,
  BUNK_ECOSYSTEM_CAPABILITIES,
} from "../src/bunk-ecosystem-capability-map";

describe("BUNK whole-ecosystem capability map", () => {
  it("exposes OMNII capabilities beyond TIP", () => {
    expect(BUNK_ECOSYSTEM_CAPABILITIES.some((c) => c.family === "IDENTITY")).toBe(true);
    expect(BUNK_ECOSYSTEM_CAPABILITIES.some((c) => c.family === "WORKFLOW")).toBe(true);
    expect(BUNK_ECOSYSTEM_CAPABILITIES.some((c) => c.family === "EVIDENCE")).toBe(true);
    expect(BUNK_ECOSYSTEM_CAPABILITIES.some((c) => c.family === "ECONOMICS" && c.provider === "TIP")).toBe(true);
  });

  it("rejects BUNK from claiming universal primitives", () => {
    expect(() => assertBunkEcosystemCapabilityUse({
      capability: "universal-identity",
      provider: "BUNK",
    })).toThrow(/universal identity|cannot own/i);
  });
});
