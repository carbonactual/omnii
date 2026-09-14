import assert from 'node:assert/strict';
import {
  canonicalActionGate,
  canonicalExecutionGate,
  isConsequentialCapability,
} from './authority.mjs';

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

const fullBlocked = canonicalExecutionGate({
  capabilityRef: 'execution.transfer',
  authorityRef: 'seal:human:1',
  identityRef: 'hash:human:1',
  policyAllowed: true,
  capabilityReady: true,
  resourceReady: false,
});
assert.equal(fullBlocked.allowed, false);
assert.equal(fullBlocked.checks.resource, false);

const fullAllowed = canonicalExecutionGate({
  capabilityRef: 'execution.transfer',
  authorityRef: 'seal:human:1',
  identityRef: 'hash:human:1',
  policyAllowed: true,
  capabilityReady: true,
  resourceReady: true,
});
assert.equal(fullAllowed.allowed, true);
assert.equal(fullAllowed.reason, 'execution-ready');

const policyBlocked = canonicalExecutionGate({
  capabilityRef: 'execution.transfer',
  authorityRef: 'seal:human:1',
  identityRef: 'hash:human:1',
  policyAllowed: false,
  capabilityReady: true,
  resourceReady: true,
});
assert.equal(policyBlocked.allowed, false);
assert.equal(policyBlocked.checks.policy, false);

assert.equal(isConsequentialCapability(' EXECUTION.SEND '), true);
console.log('canonical authority gate tests: 8/8 assertions passed');
