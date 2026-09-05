import assert from "node:assert/strict";
import test from "node:test";
import {
  validateBunkCompositionRequest,
  type BunkCompositionRequest,
} from "../src/bunk-composition-runtime";

test("BUNK composition requires OMNII authority, provenance and TIP for economic actions", () => {
  const request: BunkCompositionRequest = {
    propertyId: "property-1",
    lifecycle: {
      from: "DISCOVERY",
      to: "LISTING_MARKET",
      authorityId: "authority-1",
      evidenceIds: ["evidence-1"],
    },
    economic: {
      propertyId: "property-1",
      intent: "PROPERTY_SALE",
      tipCapability: "TIP:TRADE",
      authorityId: "authority-1",
      jurisdiction: "NG",
      policyReference: "policy-1",
      provenanceReference: "root-1",
    },
    intelligence: {
      propertyId: "property-1",
      dimension: "MARKET",
      claim: "market observation",
      sourceReference: "source-1",
      observedAt: "2026-09-05T00:00:00Z",
      confidence: 0.8,
    },
  };

  assert.deepEqual(validateBunkCompositionRequest(request), []);
});

test("BUNK composition rejects an economic route that bypasses TIP", () => {
  const request: BunkCompositionRequest = {
    propertyId: "property-1",
    lifecycle: {
      from: "DISCOVERY",
      to: "LISTING_MARKET",
      authorityId: "authority-1",
      evidenceIds: ["evidence-1"],
    },
    economic: {
      propertyId: "property-1",
      intent: "PROPERTY_SALE",
      tipCapability: "BUNK:TRADE",
      authorityId: "authority-1",
      jurisdiction: "NG",
      policyReference: "policy-1",
      provenanceReference: "root-1",
    },
    intelligence: {
      propertyId: "property-1",
      dimension: "MARKET",
      claim: "market observation",
      sourceReference: "source-1",
      observedAt: "2026-09-05T00:00:00Z",
      confidence: 0.8,
    },
  };

  assert.ok(validateBunkCompositionRequest(request).some((error) => /TIP/.test(error)));
});

test("BUNK composition rejects intelligence without provenance and lifecycle authority", () => {
  const request: BunkCompositionRequest = {
    propertyId: "property-1",
    lifecycle: {
      from: "DISCOVERY",
      to: "LISTING_MARKET",
      evidenceIds: [],
    },
    intelligence: {
      propertyId: "property-1",
      dimension: "TITLE_TENURE_RIGHTS",
      claim: "ownership claim",
      sourceReference: "",
      observedAt: "2026-09-05T00:00:00Z",
      confidence: 0.8,
    },
  };

  const errors = validateBunkCompositionRequest(request);
  assert.ok(errors.some((error) => /evidence|authority/i.test(error)));
  assert.ok(errors.includes("sourceReference is required"));
});
