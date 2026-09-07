import assert from "node:assert/strict";
import test from "node:test";

import { rankIntegrationRoutes, type RouteCandidate } from "../../src/integration/routing.js";
import { supportsProtocolIntent } from "../../src/integration/routing.js";

const base = (protocol: RouteCandidate["protocol"]): RouteCandidate => ({
  routeId: `route:${protocol}`,
  capabilityId: "capability:search@1",
  protocol,
  providerId: `provider:${protocol}`,
  capabilityFit: 1,
  authoritySatisfied: true,
  privacyScore: 0.9,
  availability: 0.9,
  trustScore: 0.9,
  valueScore: 0.8,
  latencyScore: 0.8,
  costScore: 0.8,
  dataBoundaryScore: 0.9,
  jurisdictionScore: 0.9,
  safe: true,
});

test("uses the default protocol family for the requested intent", () => {
  const result = rankIntegrationRoutes(
    { intent: "structured-tool-data", requiredCapabilityId: "capability:search@1" },
    [base("API"), base("MCP")],
  );
  assert.equal(result.selected?.protocol, "MCP");
});

test("supports all constitutional protocol rails without coupling to providers", () => {
  assert.equal(supportsProtocolIntent("CLI", "deterministic"), true);
  assert.equal(supportsProtocolIntent("A2A", "agent-delegation"), true);
  assert.equal(supportsProtocolIntent("LOCAL", "private-edge"), true);
});

test("returns no-safe-route instead of selecting an unsafe candidate", () => {
  const result = rankIntegrationRoutes(
    { intent: "direct-service", requiredCapabilityId: "capability:search@1", authorityRequired: true },
    [{ ...base("API"), safe: false }],
  );
  assert.equal(result.outcome, "no-safe-route");
  assert.equal(result.selected, undefined);
});
