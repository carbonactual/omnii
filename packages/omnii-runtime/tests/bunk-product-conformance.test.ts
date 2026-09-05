import assert from "node:assert/strict";
import test from "node:test";
import { BUNK_PROPERTY_CATEGORIES, validateBunkPropertyClassification } from "../src/bunk-property-ontology";
import { BUNK_PROPERTY_LIFECYCLE_STAGES } from "../src/bunk-property-lifecycle";
import { BUNK_TIP_ECONOMIC_INTENTS, validateBunkTipEconomicRequest } from "../src/bunk-economic-boundary";
import { BUNK_PROPERTY_INTELLIGENCE_DIMENSIONS, validateBunkPropertyIntelligenceObservation } from "../src/bunk-property-intelligence";

test("BUNK is a universal property product composition, not a foundation", () => {
  assert.equal(BUNK_PROPERTY_CATEGORIES.includes("LAND"), true);
  assert.equal(BUNK_PROPERTY_CATEGORIES.includes("BURIAL_RIGHT"), true);
  assert.equal(BUNK_PROPERTY_CATEGORIES.includes("SPACE_ASSET"), true);
  assert.equal(BUNK_PROPERTY_CATEGORIES.includes("UNKNOWN_PROPERTY_CANDIDATE"), true);
  assert.equal(BUNK_PROPERTY_LIFECYCLE_STAGES.includes("RETIRE_PRESERVE_ARCHIVE"), true);
  assert.equal(BUNK_TIP_ECONOMIC_INTENTS.includes("PROPERTY_FRACTIONALIZATION"), true);
  assert.equal(BUNK_PROPERTY_INTELLIGENCE_DIMENSIONS.includes("TITLE_TENURE_RIGHTS"), true);
});

test("frontier classification does not grant economic eligibility", () => {
  const errors = validateBunkPropertyClassification({
    category: "EXTRATERRESTRIAL_RESOURCE",
    status: {
      maturity: "frontier",
      legalStatus: "unknown",
      authorityStatus: "unverified",
      evidenceStatus: "partial",
      eligibilityStatus: "unknown",
      marketStatus: "unknown",
    },
  });
  assert.deepEqual(errors, []);
});

test("TIP routing is mandatory for BUNK economic actions", () => {
  const valid = validateBunkTipEconomicRequest({
    propertyId: "property-1",
    intent: "PROPERTY_INVESTMENT",
    tipCapability: "TIP:INVESTMENT",
    authorityId: "authority-1",
    jurisdiction: "NG",
    policyReference: "policy-1",
    provenanceReference: "root-1",
  });
  assert.deepEqual(valid, []);

  const invalid = validateBunkTipEconomicRequest({
    propertyId: "property-1",
    intent: "PROPERTY_INVESTMENT",
    tipCapability: "BUNK:INVESTMENT",
    authorityId: "authority-1",
    jurisdiction: "NG",
    policyReference: "policy-1",
    provenanceReference: "root-1",
  });
  assert.ok(invalid.some((error) => /TIP/.test(error)));
});

test("property intelligence cannot omit evidence provenance", () => {
  const errors = validateBunkPropertyIntelligenceObservation({
    propertyId: "property-1",
    dimension: "MARKET",
    claim: "market demand observation",
    sourceReference: "",
    observedAt: "2026-09-05T00:00:00Z",
    confidence: 0.7,
  });
  assert.ok(errors.includes("sourceReference is required"));
});
