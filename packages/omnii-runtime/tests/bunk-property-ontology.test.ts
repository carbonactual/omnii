import assert from "node:assert/strict";
import test from "node:test";
import {
  BUNK_PROPERTY_CATEGORIES,
  assertBunkPropertyClassification,
  validateBunkPropertyClassification,
} from "../src/bunk-property-ontology";

test("BUNK ontology covers core, burial, digital and frontier property families", () => {
  for (const category of ["LAND", "BUILDING", "BURIAL_RIGHT", "DIGITAL_PROPERTY", "SPACE_ASSET", "UNKNOWN_PROPERTY_CANDIDATE"] as const) {
    assert.equal(BUNK_PROPERTY_CATEGORIES.includes(category), true);
  }
});

test("ordinary recognized property may be eligible and traded when separately authorized", () => {
  const classification = {
    category: "LAND" as const,
    status: {
      maturity: "current" as const,
      legalStatus: "recognized" as const,
      authorityStatus: "authorized" as const,
      evidenceStatus: "complete" as const,
      eligibilityStatus: "eligible" as const,
      marketStatus: "trading" as const,
    },
  };

  assert.deepEqual(validateBunkPropertyClassification(classification), []);
  assert.deepEqual(assertBunkPropertyClassification(classification), classification);
});

test("unknown property cannot infer authorization or tradeability", () => {
  assert.throws(
    () => assertBunkPropertyClassification({
      category: "UNKNOWN_PROPERTY_CANDIDATE",
      status: {
        maturity: "unknown",
        legalStatus: "unknown",
        authorityStatus: "authorized",
        evidenceStatus: "partial",
        eligibilityStatus: "eligible",
        marketStatus: "trading",
      },
    }),
    /cannot be treated as inherently authorized/,
  );
});

test("cemetery and burial interests remain property-right classifications, not automatic land ownership", () => {
  const classification = {
    category: "BURIAL_RIGHT" as const,
    status: {
      maturity: "historical" as const,
      legalStatus: "recognized" as const,
      authorityStatus: "authorized" as const,
      evidenceStatus: "complete" as const,
      eligibilityStatus: "restricted" as const,
      marketStatus: "not_listed" as const,
    },
  };

  assert.deepEqual(validateBunkPropertyClassification(classification), []);
});
