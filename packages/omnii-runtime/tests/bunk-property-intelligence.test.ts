import assert from "node:assert/strict";
import test from "node:test";
import {
  assertBunkPropertyIntelligenceObservation,
  validateBunkPropertyIntelligenceObservation,
} from "../src/bunk-property-intelligence";

test("property intelligence requires provenance for material claims", () => {
  const observation = {
    propertyId: "property-1",
    dimension: "TITLE_TENURE_RIGHTS" as const,
    claim: "registered interest exists",
    sourceReference: "evidence-1",
    observedAt: "2026-09-05T00:00:00Z",
    confidence: 0.9,
  };
  assert.deepEqual(validateBunkPropertyIntelligenceObservation(observation), []);
  assert.deepEqual(assertBunkPropertyIntelligenceObservation(observation), observation);
});

test("invalid intelligence confidence is rejected", () => {
  assert.throws(() => assertBunkPropertyIntelligenceObservation({
    propertyId: "property-1",
    dimension: "MARKET",
    claim: "high demand",
    sourceReference: "source-1",
    observedAt: "2026-09-05T00:00:00Z",
    confidence: 2,
  }), /between 0 and 1/);
});
