import test from 'node:test';
import assert from 'node:assert/strict';
import { createParticipation, crossProduct } from '../src/index.mjs';

test('HAPI World participation preserves shared identity across products', () => {
  const record = createParticipation({ participant: 'hapi:#123', identity: { hapi: '#123' }, context: { world: 'hapi-world' } });
  assert.equal(record.participant, 'hapi:#123');
  assert.equal(record.identity.hapi, '#123');
});

test('product crossings are relationships, not implied authority', () => {
  const crossing = crossProduct('hapi:#123', 'nasc', { intent: 'submit-form' });
  assert.equal(crossing.authorized, false);
  assert.equal(crossing.product, 'nasc');
});
