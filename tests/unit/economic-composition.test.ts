import { describe, expect, it } from "vitest";
import {
  aggregateEcosystemVectors,
  calculateEconomicComposition,
  classifyAssetLiability,
  deriveEcosystemProfile,
  validateFraction,
  validateMintInstruction,
  validateResolution,
} from "../../packages/omnii-runtime/src";

describe("OMNII economic composition", () => {
  const vector = (dimension: string, valuation: number) => ({
    entries: [{ dimension, quantity: valuation, unit: "u", valuation, method: "test", provenance: { source: "test" } }],
    total: valuation,
  });

  it("keeps fraction and decimalization distinct", () => {
    validateFraction({ numerator: 25, denominator: 100, scope: "transport", semantics: "use" });
    validateResolution({ value: 0.25, unit: "capacity", level: "standard", precision: 2 });
    expect(() => validateFraction({ numerator: 101, denominator: 100, scope: "x", semantics: "use" })).toThrow();
  });

  it("calculates value independently then applies the inverted asset/liability rule", () => {
    expect(classifyAssetLiability(vector("time", 60), vector("access", 40))).toBe("asset");
    expect(classifyAssetLiability(vector("time", 60), vector("knowledge", 90))).toBe("liability");
    expect(calculateEconomicComposition({ id: "x", underlyingObject: "vehicle-1", given: vector("energy", 10), pulse: vector("mobility", 7) }).classification).toBe("asset");
  });

  it("aggregates individual vectors without erasing dimensions", () => {
    const result = aggregateEcosystemVectors([vector("time", 10), vector("time", 5), vector("energy", 7)]);
    expect(result.entries.find((entry) => entry.dimension === "time")?.valuation).toBe(15);
    expect(result.entries.find((entry) => entry.dimension === "energy")?.valuation).toBe(7);
    expect(result.total).toBe(22);
  });

  it("derives ecosystem average, floor and safe haven separately", () => {
    const profile = deriveEcosystemProfile([vector("capacity", 100), vector("capacity", 60)], 40, 30);
    expect(profile.vector.total).toBe(160);
    expect(profile.average).toBe(80);
    expect(profile.floor).toBe(40);
    expect(profile.safeHaven).toBe(30);
  });

  it("requires authority, provenance linkage and idempotency for minting", () => {
    validateMintInstruction({ idempotencyKey: "mint-1", issuer: "issuer-1", authority: "seal-1", underlyingObject: "asset-1", quantity: 10, tokenType: "access", settlementRail: "hybrid" });
    expect(() => validateMintInstruction({ idempotencyKey: "", issuer: "issuer-1", authority: "seal-1", underlyingObject: "asset-1", quantity: 10, tokenType: "access", settlementRail: "hybrid" })).toThrow();
  });
});
