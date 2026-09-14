import assert from 'node:assert/strict';
import test from 'node:test';
import { canonicalExecutionGate } from './authority.mjs';

test('consequential execution requires every gate', () => {
  const result = canonicalExecutionGate({
    capabilityRef: 'execution.transfer',
    identityRef: 'hash:human:1',
    authorityRef: 'seal:human:1',
    policyAllowed: true,
    capabilityReady: true,
    resourceReady: false,
  });
  assert.equal(result.allowed, false);
  assert.equal(result.checks.identity, true);
  assert.equal(result.checks.authority, true);
  assert.equal(result.checks.policy, true);
  assert.equal(result.checks.capability, true);
  assert.equal(result.checks.resource, false);
});

test('consequential execution becomes ready only when all gates pass', () => {
  const result = canonicalExecutionGate({
    capabilityRef: 'execution.transfer',
    identityRef: 'hash:human:1',
    authorityRef: 'seal:human:1',
    policyAllowed: true,
    capabilityReady: true,
    resourceReady: true,
  });
  assert.equal(result.allowed, true);
  assert.equal(result.reason, 'execution-ready');
});

test('non-consequential execution still requires capability readiness', () => {
  assert.equal(canonicalExecutionGate({ capabilityRef: 'world.learn', capabilityReady: false }).allowed, false);
  assert.equal(canonicalExecutionGate({ capabilityRef: 'world.learn', capabilityReady: true }).allowed, true);
});

test('authority cannot change ownership through the execution gate', () => {
  const result = canonicalExecutionGate({
    capabilityRef: 'execution.transfer',
    identityRef: 'hash:human:1',
    authorityRef: 'seal:human:1',
    policyAllowed: true,
    capabilityReady: true,
    resourceReady: true,
  });
  assert.equal('ownershipChanged' in result, false);
  assert.equal('authorityChanged' in result, false);
});
