import assert from "node:assert/strict";
import test from "node:test";
import { EcosystemConformanceRuntime } from "../src/ecosystem-conformance-runtime";
import { MemoryPersistenceAdapter } from "../src/persistence";

test("ideas compose existing products as reusable ingredients", async () => {
  const runtime = new EcosystemConformanceRuntime(new MemoryPersistenceAdapter());
  await runtime.registerIngredient({ id: "charter", name: "Charter", kind: "product", capabilities: ["movement", "coordination"] });
  await runtime.registerIngredient({ id: "pilgrim", name: "Pilgrim", kind: "product", capabilities: ["journey", "discovery"] });
  await runtime.registerIngredient({ id: "nab", name: "NAB", kind: "registry", capabilities: ["identity", "state-evidence"] });

  const composition = await runtime.compose("guided cross-domain journey", ["charter", "pilgrim", "nab"]);

  assert.deepEqual(composition.ingredientIds, ["charter", "pilgrim", "nab"]);
  assert.deepEqual(composition.capabilities, ["coordination", "discovery", "identity", "journey", "movement", "state-evidence"]);
});

test("every action must conform to the composed capability set", async () => {
  const runtime = new EcosystemConformanceRuntime(new MemoryPersistenceAdapter());
  await runtime.registerIngredient({ id: "charter", name: "Charter", kind: "product", capabilities: ["movement"] });
  const composition = await runtime.compose("move subject", ["charter"]);

  await assert.rejects(
    () => runtime.conform({ intent: "move subject", actor: "person", authority: "authority", capability: "health", ingredientIds: ["charter"], idempotencyKey: "move-1" }, composition),
    /capability is not provided/,
  );
});

test("idempotency prevents duplicate state-changing actions", async () => {
  const runtime = new EcosystemConformanceRuntime(new MemoryPersistenceAdapter());
  await runtime.registerIngredient({ id: "charter", name: "Charter", kind: "product", capabilities: ["movement"] });
  const composition = await runtime.compose("move subject", ["charter"]);
  const input = { intent: "move subject", actor: "person", authority: "authority", capability: "movement", ingredientIds: ["charter"], idempotencyKey: "move-unique" };

  const first = await runtime.conform(input, composition);
  const second = await runtime.conform(input, composition);

  assert.equal(first.id, second.id);
});

test("successful execution requires an outcome and becomes reconciled", async () => {
  const runtime = new EcosystemConformanceRuntime(new MemoryPersistenceAdapter());
  await runtime.registerIngredient({ id: "charter", name: "Charter", kind: "product", capabilities: ["movement"] });
  const composition = await runtime.compose("move subject", ["charter"]);
  const action = await runtime.conform({ intent: "move subject", actor: "person", authority: "authority", capability: "movement", ingredientIds: ["charter"], idempotencyKey: "move-success", before: { location: "A" } }, composition);

  const result = await runtime.execute(action.id, async () => ({ outcome: "arrived", after: { location: "B" }, evidence: [{ source: "operator" }] }));

  assert.equal(result.state, "reconciled");
  assert.equal(result.reconciliation, "matched");
  assert.deepEqual(result.after, { location: "B" });
});

test("failed execution is preserved as a recoverable exception, not lost", async () => {
  const runtime = new EcosystemConformanceRuntime(new MemoryPersistenceAdapter());
  await runtime.registerIngredient({ id: "charter", name: "Charter", kind: "product", capabilities: ["movement"] });
  const composition = await runtime.compose("move subject", ["charter"]);
  const action = await runtime.conform({ intent: "move subject", actor: "person", authority: "authority", capability: "movement", ingredientIds: ["charter"], idempotencyKey: "move-failure" }, composition);

  const result = await runtime.execute(action.id, async () => { throw new Error("route unavailable"); });

  assert.equal(result.state, "exception");
  assert.equal(result.reconciliation, "exception");
  assert.match(result.outcome ?? "", /route unavailable/);
  assert.equal(result.evidence.some((entry) => entry.type === "execution-exception"), true);
});

test("recovery is an explicit workflow state and remains auditable", async () => {
  const runtime = new EcosystemConformanceRuntime(new MemoryPersistenceAdapter());
  await runtime.registerIngredient({ id: "charter", name: "Charter", kind: "product", capabilities: ["movement"] });
  const composition = await runtime.compose("move subject", ["charter"]);
  const action = await runtime.conform({ intent: "move subject", actor: "person", authority: "authority", capability: "movement", ingredientIds: ["charter"], idempotencyKey: "move-recover" }, composition);
  await runtime.execute(action.id, async () => { throw new Error("temporary failure"); });

  const recovering = await runtime.recover(action.id, "operator", "route restored; retry permitted");
  const reconciled = await runtime.reconcile(action.id, "completed after recovery", { actor: "operator" });

  assert.equal(recovering.state, "recovering");
  assert.equal(reconciled.state, "reconciled");
  assert.equal(reconciled.reconciliation, "matched");
  assert.equal(reconciled.evidence.some((entry) => entry.type === "recovery-started"), true);
});

test("action cannot smuggle an ingredient outside its declared composition", async () => {
  const runtime = new EcosystemConformanceRuntime(new MemoryPersistenceAdapter());
  await runtime.registerIngredient({ id: "charter", name: "Charter", kind: "product", capabilities: ["movement"] });
  await runtime.registerIngredient({ id: "nab", name: "NAB", kind: "registry", capabilities: ["state-evidence"] });
  const composition = await runtime.compose("move subject", ["charter"]);

  await assert.rejects(
    () => runtime.conform({ intent: "move subject", actor: "person", authority: "authority", capability: "movement", ingredientIds: ["charter", "nab"], idempotencyKey: "move-foreign" }, composition),
    /outside composition/,
  );
});

test("unknown ideas fail safely until their required ingredients are registered", async () => {
  const runtime = new EcosystemConformanceRuntime(new MemoryPersistenceAdapter());

  await assert.rejects(
    () => runtime.compose("unknown future product", ["not-yet-in-ecosystem"]),
    /Unknown ecosystem ingredients/,
  );
});
