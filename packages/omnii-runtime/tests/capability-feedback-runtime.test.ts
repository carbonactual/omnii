import assert from "node:assert/strict";
import test from "node:test";
import { CapabilityFeedbackRuntime } from "../src/capability-feedback-runtime";

test("produces provider-specific selection evidence without authority", () => {
  const result = new CapabilityFeedbackRuntime().learn({
    outcomes: [
      { capabilityId: "capability.build.application", providerId: "vercel", success: true, observedLatency: 10, observedCost: 2 },
      { capabilityId: "capability.build.application", providerId: "appdeploy", success: false, observedLatency: 20, observedCost: 1 },
    ],
    history: {
      "capability.build.application::vercel": { attempts: 1, successes: 1, latencyTotal: 10, costTotal: 2 },
    },
  });

  assert.equal(result.authorityGranted, false);
  assert.equal(result.signals.length, 2);
  assert.ok(result.selectionHints["capability.build.application::vercel"] > result.selectionHints["capability.build.application::appdeploy"]);
});

test("bounds invalid history and preserves failure evidence", () => {
  const result = new CapabilityFeedbackRuntime().learn({
    outcomes: [{ capabilityId: "capability.analytics.chart_query", providerId: "amplitude", success: false }],
    history: {
      "capability.analytics.chart_query::amplitude": { attempts: -4, successes: 9, latencyTotal: -1, costTotal: -1 },
    },
  });
  const signal = result.signals[0];
  assert.equal(signal.attempts, 1);
  assert.equal(signal.successes, 0);
  assert.equal(signal.successRate, 0);
  assert.ok(result.warnings.includes("provider_outcome_unsuccessful"));
});
