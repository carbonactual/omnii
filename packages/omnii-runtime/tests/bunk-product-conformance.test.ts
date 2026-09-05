import assert from "node:assert/strict";
import test from "node:test";
import { BUNK_PROPERTY_CATEGORIES, validateBunkPropertyClassification } from "../src/bunk-property-ontology";
import { BUNK_PROPERTY_LIFECYCLE_STAGES } from "../src/bunk-property-lifecycle";
import { BUNK_TIP_ECONOMIC_INTENTS, validateBunkTipEconomicRequest } from "../src/bunk-economic-boundary";
import { BUNK_PROPERTY_INTELLIGENCE_DIMENSIONS, validateBunkPropertyIntelligenceObservation } from "../src/bunk-property-intelligence";
import {
  assertBunkProductConformance,
  validateBunkProductManifest,
  type BunkProductManifest,
} from "../src/bunk-product-manifest";

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

const validManifest: BunkProductManifest = {
  productId: "BUNK",
  ecosystemId: "OMNII",
  economicFoundationId: "TIP",
  status: "CANONICAL",
  capabilities: ["discovery", "listing", "matching", "property-operations"],
  requiredOmniiCapabilities: [
    "identity",
    "authority",
    "graph",
    "relationships",
    "evidence",
    "persistence",
    "events",
    "agents",
    "workflows",
  ],
  delegatedTipCapabilities: [
    "trade",
    "investment",
    "financing",
    "collateral",
    "settlement",
    "tokenization",
  ],
  ownedDomainCapabilities: [
    "property-discovery",
    "property-listings",
    "property-matching",
    "property-operations",
    "maintenance",
    "property-intelligence",
  ],
  prohibitedDuplicates: [
    "universal-identity",
    "universal-authority",
    "universal-graph",
    "universal-registry-ontology",
    "universal-persistence",
    "canonical-ledger",
    "canonical-economic-ontology",
  ],
};

test("valid BUNK manifest conforms to OMNII and TIP dependency direction", () => {
  assert.deepEqual(validateBunkProductManifest(validManifest), []);
  assert.deepEqual(assertBunkProductConformance(validManifest), validManifest);
});

test("rejects a BUNK manifest that declares a duplicate universal identity or economic ontology", () => {
  const invalid = {
    ...validManifest,
    capabilities: [...validManifest.capabilities, "universal-identity"],
  };

  assert.ok(
    validateBunkProductManifest(invalid).some((error) =>
      error.includes("must not duplicate universal capability"),
    ),
  );
});

test("rejects BUNK when TIP is absent from the economic boundary", () => {
  const invalid = { ...validManifest, economicFoundationId: "BUNK" };
  assert.ok(
    validateBunkProductManifest(invalid).some((error) =>
      error.includes("economicFoundationId must be TIP"),
    ),
  );
});

test("rejects BUNK when required OMNII dependencies are missing", () => {
  const invalid = {
    ...validManifest,
    requiredOmniiCapabilities: ["identity", "graph"],
  };
  const errors = validateBunkProductManifest(invalid);
  assert.ok(errors.some((error) => error.includes("missing required OMNII capability: authority")));
  assert.ok(errors.some((error) => error.includes("missing required OMNII capability: evidence")));
  assert.ok(errors.some((error) => error.includes("missing required OMNII capability: persistence")));
});
