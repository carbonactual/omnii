import test from "node:test";
import assert from "node:assert/strict";
import { validateAssistanceCirculation, type AssistanceCirculationInput } from "../src/assistance-resource-runtime.js";

test("resource availability cannot satisfy an assistance need without authority", () => {
  const input: AssistanceCirculationInput = {
    need: { id: "need-1", description: "tow", urgency: "urgent" },
    capability: { id: "cap-1", kind: "tow" },
    resource: { id: "resource-1", kind: "tow-truck" },
    availability: { available: true, startsAt: "2026-08-19T20:00:00Z", endsAt: "2026-08-19T22:00:00Z" },
    authority: { present: false },
    terms: { mode: "free" },
    fulfilment: { status: "proposed" },
  };

  const result = validateAssistanceCirculation(input);

  assert.equal(result.valid, false);
  assert.equal(result.errors.includes("authority is required before fulfilment"), true);
});

test("free assistance may fulfil with explicit authority and return elsewhere", () => {
  const input: AssistanceCirculationInput = {
    need: { id: "need-2", description: "battery", urgency: "normal" },
    capability: { id: "cap-2", kind: "battery-service" },
    resource: { id: "resource-2", kind: "battery" },
    availability: { available: true, startsAt: "2026-08-19T20:00:00Z", endsAt: "2026-08-19T22:00:00Z" },
    authority: { present: true, scope: ["battery-service"] },
    terms: { mode: "free" },
    fulfilment: { status: "accepted" },
    returnObligation: { required: true, destination: "Lagos", dueAt: "2026-08-20T20:00:00Z" },
  };

  const result = validateAssistanceCirculation(input);

  assert.deepEqual(result, { valid: true, errors: [] });
});
