import assert from "node:assert/strict";
import test from "node:test";
import { MemoryPersistenceAdapter } from "../src/persistence";
import { TransportCertificationRuntime } from "../src/transport-certification-runtime";

test("TransportCertificationRuntime records bounded transport surfaces without redefining them", async () => {
  const runtime = new TransportCertificationRuntime(new MemoryPersistenceAdapter());
  const record = await runtime.registerSurface({
    id: "charter",
    name: "CHARTER",
    role: "universal movement layer",
    architecture: "present",
    runtime: "present",
    product: "present",
    integration: "live adapters required",
    sourceRefs: ["docs/architecture/CHARTER_TRANSPORT_BUILD_CLOSURE.md"],
  });

  assert.equal(record.id, "charter");
  assert.equal(record.architecture, "present");
  assert.equal(record.runtime, "present");
});

test("TransportCertificationRuntime rejects duplicate surface identifiers", async () => {
  const runtime = new TransportCertificationRuntime(new MemoryPersistenceAdapter());
  const input = {
    id: "nab",
    name: "NAB",
    role: "automobile biography and registry",
    architecture: "present" as const,
    runtime: "present" as const,
    product: "present" as const,
    integration: "registry adapters required",
    sourceRefs: ["docs/architecture/NAB_CONSTITUTION.md"],
  };

  await runtime.registerSurface(input);
  await assert.rejects(() => runtime.registerSurface(input), /already registered/);
});

test("TransportCertificationRuntime reports implementation gaps separately from architecture", async () => {
  const runtime = new TransportCertificationRuntime(new MemoryPersistenceAdapter());
  await runtime.registerSurface({
    id: "fleet",
    name: "Fleet",
    role: "organizational asset operations",
    architecture: "present",
    runtime: "partial",
    product: "present",
    integration: "telemetry and dispatch adapters required",
    sourceRefs: ["docs/architecture/CHARTER_LOGISTICO_FLEET_BOUNDARY.md"],
  });

  const report = await runtime.certify(["fleet"]);
  assert.equal(report[0]?.status, "needs-integration");
  assert.equal(report[0]?.architecture, "present");
  assert.equal(report[0]?.runtime, "partial");
});
