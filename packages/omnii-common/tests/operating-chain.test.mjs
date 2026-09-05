import test from 'node:test';
import assert from 'node:assert/strict';
import { operatingChain, assertCapabilityNotAuthority, assertEvidenceNotAuthority, assertMatchNotAuthorization } from '../src/index.mjs';

test('operatingChain returns the canonical interoperable stage order', () => {
  assert.deepEqual(operatingChain(), [
    'identity', 'relationship', 'intent', 'capability', 'discovery', 'match',
    'context', 'availability', 'authority', 'workflow', 'execution', 'evidence',
    'outcome', 'settlement', 'pulse'
  ]);
});

test('capability and evidence cannot be promoted into authority', () => {
  assert.throws(() => assertCapabilityNotAuthority({ kind: 'authority' }));
  assert.throws(() => assertEvidenceNotAuthority({ kind: 'authority' }));
  assert.doesNotThrow(() => assertCapabilityNotAuthority({ kind: 'capability' }));
  assert.doesNotThrow(() => assertEvidenceNotAuthority({ kind: 'evidence' }));
});

test('a discovery match cannot imply authorization', () => {
  assert.throws(() => assertMatchNotAuthorization({ matched: true, authorized: true }));
  assert.doesNotThrow(() => assertMatchNotAuthorization({ matched: true, authorized: false }));
});
