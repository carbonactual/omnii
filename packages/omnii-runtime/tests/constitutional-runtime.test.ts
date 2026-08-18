import assert from "node:assert/strict";
import test from "node:test";
import { ConstitutionalRegistry } from "../src/constitutional-registry";
import { validateConstitutionalRuntime } from "../src/constitutional-validator";

test("canonical constitutional graph validates", () => {
  const result = new ConstitutionalRegistry().validate();
  assert.equal(result.valid, true);
  assert.equal(result.violations.length, 0);
  assert.equal(result.order[0], "architecture");
  assert.equal(result.order.at(-1), "civilization");
});

test("unknown constitutional dependencies are rejected", () => {
  const registry = new ConstitutionalRegistry();
  registry.register({
    id: "invalid",
    title: "Invalid Doctrine",
    layer: "foundation",
    dependsOn: ["does-not-exist"],
    status: "proposed",
  });
  const result = registry.validate();
  assert.equal(result.valid, false);
  assert.equal(result.violations.some((v) => v.code === "UNKNOWN_DEPENDENCY"), true);
});

test("OMNI cannot be redefined as a technical subsystem", () => {
  const result = validateConstitutionalRuntime({ declaredOmniRole: "runtime" });
  assert.equal(result.valid, false);
  assert.equal(result.violations.some((v) => v.code === "OMNI_ROLE_COLLISION"), true);
});
