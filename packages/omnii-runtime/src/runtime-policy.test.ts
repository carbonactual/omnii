import assert from "node:assert/strict";
import { defaultRuntimePolicy } from "./runtime-policy";

const route = { routeId: "r1", capability: "service.execute" };
const authority = { id: "a1", subject: "human-1", scope: ["service.execute"], capabilities: ["service.execute"], issued_at: "2026-09-05T00:00:00Z", revocable: true };

const blocked = defaultRuntimePolicy({ route, authority: null });
assert.equal(blocked.requiresAuthority, true);
assert.equal(blocked.allowed, false);

const allowed = defaultRuntimePolicy({ route, authority });
assert.equal(allowed.allowed, true);

const autonomous = defaultRuntimePolicy({ route: { ...route, capability: "world.learn", requiresAuthority: false }, authority: null });
assert.equal(autonomous.requiresAuthority, false);
assert.equal(autonomous.allowed, true);

console.log("runtime policy tests: 3/3 assertions passed");
