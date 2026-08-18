import assert from "node:assert/strict";
import test from "node:test";
import { ObjectRuntime } from "../src/object-runtime";
import { RelationshipRuntime } from "../src/relationship-runtime";
import { RegistryRuntime } from "../src/registry-runtime";
import { authorize } from "../src/event-runtime";

const baseObject = () => ({
  type: "test.object",
  status: "active",
  identity: { subject: "test" },
  provenance: { source: "test" },
  authority: { id: "auth" },
  attributes: {},
  relationships: [],
  dependencies: [],
  capabilities: [],
  resources: [],
});

test("object update changes only the requested semantic fields", () => {
  const runtime = new ObjectRuntime();
  const object = runtime.create(baseObject());
  const updated = runtime.update(object.id, { attributes: { name: "updated" } });
  assert.deepEqual(updated.attributes, { name: "updated" });
  assert.equal(updated.id, object.id);
  assert.equal(updated.type, object.type);
});

test("object archive is an explicit lifecycle operation", () => {
  const runtime = new ObjectRuntime();
  const object = runtime.create(baseObject());
  assert.equal(runtime.archive(object.id).status, "archived");
});

test("relationship retirement is observable in the relationship state", () => {
  const runtime = new RelationshipRuntime();
  const relationship = runtime.create({ type: "knows", source: "a", target: "b", direction: "directed", status: "active", authority: { id: "auth" }, provenance: { source: "test" } });
  assert.equal(runtime.retire(relationship.id).status, "retired");
});

test("dependency registry preserves source target and dependency type", () => {
  const registries = new RegistryRuntime();
  const record = { id: "dep-1", version: "1", status: "active", authority: { id: "auth" }, provenance: { source: "test" }, source: "object-a", target: "resource-b", dependencyType: "requires" };
  registries.dependencies.register(record, "human-1");
  assert.deepEqual(registries.dependencies.resolve("dep-1"), record);
});

test("expired authority is rejected", () => {
  const expired = { id: "auth", subject: "human-1", scope: ["execute"], capabilities: ["execute"], issued_at: new Date(Date.now() - 10_000).toISOString(), expires_at: new Date(Date.now() - 1_000).toISOString(), revocable: true };
  assert.throws(() => authorize(expired, "execute"));
});

test("revoked authority is rejected even when capability is present", () => {
  const revoked = { id: "auth", subject: "human-1", scope: ["execute"], capabilities: ["execute"], issued_at: new Date().toISOString(), revocable: true, revoked_at: new Date().toISOString() };
  assert.throws(() => authorize(revoked, "execute"));
});
