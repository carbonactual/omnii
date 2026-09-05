import assert from 'node:assert/strict';
import { canonicalActionGate, isConsequentialCapability } from './authority.mjs';

const blocked = canonicalActionGate({ capabilityRef: 'execution.transfer' });
assert.equal(blocked.consequential, true);
assert.equal(blocked.allowed, false);
assert.equal(blocked.reason, 'authority-required');

const allowed = canonicalActionGate({ capabilityRef: 'execution.transfer', authorityRef: 'seal:human:1' });
assert.equal(allowed.allowed, true);
assert.equal(allowed.authorityChanged, false);
assert.equal(allowed.ownershipChanged, false);

const autonomous = canonicalActionGate({ capabilityRef: 'world.learn' });
assert.equal(autonomous.consequential, false);
assert.equal(autonomous.allowed, true);

const humanRequired = canonicalActionGate({ capabilityRef: 'world.learn', requiresHuman: true });
assert.equal(humanRequired.consequential, true);
assert.equal(humanRequired.allowed, false);

assert.equal(isConsequentialCapability(' EXECUTION.SEND '), true);
console.log('canonical authority gate tests: 5/5 assertions passed');
