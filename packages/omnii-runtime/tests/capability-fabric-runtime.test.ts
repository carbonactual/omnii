import assert from "node:assert/strict";
import test from "node:test";
import { CapabilityRegistryRuntime, CapabilityDescriptor } from "../src/capability-fabric-runtime";

const descriptor = (overrides: Partial<CapabilityDescriptor> = {}): CapabilityDescriptor => ({
  id: "capability.source_control.repository_read",
  name: "repository_read",
  version: "1.0.0",
  providerId: "github",
  domain: "technology",
  operation: "read",
  status: "available",
  authorityClass: "provider-scoped",
  riskClass: "low",
  sideEffect: "none",
  identityScope: "organization",
  inputSchema: { type: "object" },
  outputSchema: { type: "object" },
  dependencies: [],
  costHint: 1,
  latencyHint: 1,
  reliabilityHint: 1,
  auditPolicy: "standard",
  provenance: { source: "connected-plugin" },
  ...overrides,
});

test("rejects duplicate canonical capability descriptors for the same provider", async () => {
  const registry = new CapabilityRegistryRuntime();
  await registry.register(descriptor(), "ABBA");
  await assert.rejects(() => registry.register(descriptor(), "ABBA"), /duplicate_capability_provider/);
});

test("permits multiple provider implementations of one canonical capability", async () => {
  const registry = new CapabilityRegistryRuntime();
  await registry.register(descriptor({ providerId: "github" }), "ABBA");
  await registry.register(descriptor({ providerId: "alternate-git" }), "ABBA");
  const matches = await registry.lookup((item) => item.id === descriptor().id);
  assert.deepEqual(matches.map((item) => item.providerId), ["alternate-git", "github"]);
});

test("excludes unavailable and deprecated descriptors from active lookup", async () => {
  const registry = new CapabilityRegistryRuntime();
  await registry.register(descriptor({ providerId: "available" }), "ABBA");
  await registry.register(descriptor({ providerId: "down", status: "unavailable" }), "ABBA");
  await registry.register(descriptor({ providerId: "old", status: "deprecated" }), "ABBA");
  const matches = await registry.active(descriptor().id);
  assert.deepEqual(matches.map((item) => item.providerId), ["available"]);
});

test("retains side effect and authority metadata for mutation capabilities", async () => {
  const registry = new CapabilityRegistryRuntime();
  const item = await registry.register(
    descriptor({
      id: "capability.deployment.create",
      providerId: "vercel",
      operation: "deploy",
      status: "verified",
      authorityClass: "delegated",
      riskClass: "high",
      sideEffect: "external-write",
    }),
    "ABBA",
  );
  assert.equal(item.authorityClass, "delegated");
  assert.equal(item.sideEffect, "external-write");
  assert.equal(item.riskClass, "high");
});

test("rejects credential material from descriptors", async () => {
  const registry = new CapabilityRegistryRuntime();
  await assert.rejects(
    () => registry.register(descriptor({ metadata: { authorization: "Bearer secret" } }), "ABBA"),
    /credential_material_forbidden/,
  );
});
