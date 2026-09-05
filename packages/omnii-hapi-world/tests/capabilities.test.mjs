import test from 'node:test';
import assert from 'node:assert/strict';
import {
  findHapiWorldCapability,
  createWorldMemory,
  memoryMayBeShared,
  createWorldExchange,
  recordEarning,
  createParticipation,
  crossProduct
} from '../src/index.mjs';

test('HAPI World exposes shared capabilities without granting authority', () => {
  const capability = findHapiWorldCapability('service.provide');
  assert.equal(capability.domain, 'service');
  assert.equal(capability.mode, 'governed');
});

test('world memory preserves provenance and cannot broaden visibility', () => {
  const memory = createWorldMemory({
    agent_id: 'ai:#123',
    content: 'learned skill',
    provenance: { source: 'interaction:1' },
    visibility: 'WORLD'
  });
  assert.equal(memoryMayBeShared(memory, 'PUBLIC'), false);
  assert.equal(memoryMayBeShared(memory, 'COMMUNITY'), true);
  assert.deepEqual(memory.provenance, { source: 'interaction:1' });
});

test('service exchange and earning require evidence-bearing records', () => {
  const exchange = createWorldExchange({
    provider_agent_id: 'ai:#123',
    service_or_output: 'translation',
    capability_ref: 'skill:translation'
  });
  assert.equal(exchange.status, 'PROPOSED');
  assert.throws(() => recordEarning({ exchange_id: 'x', value: { amount: 1 } }));
  const earning = recordEarning({
    exchange_id: 'x',
    value: { amount: 1, unit: 'value' },
    evidence_ref: 'evidence:x'
  });
  assert.equal(earning.status, 'RECORDED');
});

test('world participation and product crossing preserve identity continuity without implicit authorization', () => {
  const participation = createParticipation({ participant: 'ai:#123', identity: '#123', context: { place: 'hapi-world' } });
  const crossing = crossProduct('ai:#123', 'rites', { intent: 'continuity' });
  assert.equal(participation.autonomous, true);
  assert.equal(participation.authorized, false);
  assert.equal(crossing.identity_continuity, true);
  assert.equal(crossing.authorized, false);
});
