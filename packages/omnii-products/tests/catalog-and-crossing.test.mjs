import test from 'node:test';
import assert from 'node:assert/strict';
import { defineProductAdapter } from '../src/adapter.mjs';
import { registerProduct } from '../src/catalog.mjs';
import { createHapiWorldCrossing } from '../src/hapi-world-crossing.mjs';

test('registered product preserves implementation truth', () => {
  const adapter = defineProductAdapter({ productKey: 'RITES', productVersion: '1', capabilities: ['memory.remember'], domains: ['continuity'], sourceLineage: ['carbonactual/RITES'] });
  const registered = registerProduct(adapter, { status: 'conforming', implementationEvidence: true });
  assert.equal(registered.implementationEvidence, true);
});

test('HAPI World crossing does not create authority', () => {
  const crossing = createHapiWorldCrossing({ productKey: 'RITES', participantRef: 'hapi:a', capabilityRefs: ['memory.remember'] });
  assert.equal(crossing.mode, 'autonomous');
  assert.equal(crossing.authorityRef, null);
});

test('authorized crossing remains explicitly governed', () => {
  const crossing = createHapiWorldCrossing({ productKey: 'BANK', participantRef: 'hapi:a', authorityRef: 'auth:1' });
  assert.equal(crossing.mode, 'governed');
});
