import assert from "node:assert/strict";
import test from "node:test";
import { TRANSPORT_CERTIFICATION_PROFILES } from "../src/transport-certification-profiles";

test("transport certification profiles cover identity, passports, autonomy and tokenization", () => {
  const ids = new Set(TRANSPORT_CERTIFICATION_PROFILES.map((profile) => profile.id));

  for (const required of [
    "person-digital-credential",
    "vehicle-digital-product-passport",
    "software-defined-vehicle",
    "drone-rpas",
    "evtol-aam",
    "autonomous-road-system",
    "autonomous-maritime",
    "autonomous-underwater",
    "off-world-mobility",
    "tokenized-transport-right",
  ]) {
    assert.equal(ids.has(required), true, `missing certification profile: ${required}`);
  }

  const token = TRANSPORT_CERTIFICATION_PROFILES.find((profile) => profile.id === "tokenized-transport-right");
  assert.deepEqual(token?.tokenization, "regulated-path");
  assert.equal(token?.legalAuthority, "external-authority-required");
});
