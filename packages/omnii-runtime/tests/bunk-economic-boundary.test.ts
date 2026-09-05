import assert from "node:assert/strict";
import test from "node:test";
import {
  assertBunkTipEconomicRequest,
  validateBunkTipEconomicRequest,
} from "../src/bunk-economic-boundary";

test("BUNK economic actions resolve to TIP capability references", () => {
  const request = {
    propertyId: "property-1",
    intent: "PROPERTY_POOLING" as const,
    tipCapability: "TIP:INVESTMENT:POOLING:1",
    authorityId: "authority-1",
    jurisdiction: "NG",
    policyReference: "policy-property-investment-1",
    provenanceReference: "root-1",
  };
  assert.deepEqual(validateBunkTipEconomicRequest(request), []);
  assert.deepEqual(assertBunkTipEconomicRequest(request), request);
});

test("BUNK cannot silently invent a parallel economic foundation", () => {
  const request = {
    propertyId: "property-1",
    intent: "PROPERTY_SALE" as const,
    tipCapability: "BUNK:MARKET:SALE",
    authorityId: "authority-1",
    jurisdiction: "NG",
    policyReference: "policy-1",
    provenanceReference: "root-1",
  };
  assert.throws(() => assertBunkTipEconomicRequest(request), /must resolve through TIP/);
});
