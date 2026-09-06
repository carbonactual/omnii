import test from 'node:test';
import assert from 'node:assert/strict';
import { ioRecord, isIoRecord } from './io.mjs';

test('creates a canonical interaction IO occurrence', () => {
  const record = ioRecord({
    id: 'io-test-1',
    kind: 'exchange',
    action: 'exchange_value',
    actor: { id: 'person-1', kind: 'person' },
    subject: { id: 'value-1', kind: 'value' },
    source: 'desk',
    product: { id: 'desk', kind: 'product' },
    status: 'completed',
    idempotency_key: 'desk:order-1',
    value: { direction: 'outbound', amount: '100', unit: 'NGN' },
    provenance: { adapter: 'api' }
  });

  assert.equal(record.id, 'io-test-1');
  assert.equal(record.kind, 'exchange');
  assert.equal(record.actor.id, 'person-1');
  assert.equal(record.idempotency_key, 'desk:order-1');
  assert.equal(record.schema_version, 1);
  assert.equal(isIoRecord(record), true);
  assert(Object.isFrozen(record));
});

test('accepts domain-specific IO kinds without changing the contract vocabulary', () => {
  const record = ioRecord({
    kind: 'movement',
    action: 'board',
    actor: { id: 'traveller-1' },
    source: 'charter',
    metadata: { mode: 'rail' }
  });
  assert.equal(record.kind, 'movement');
  assert.equal(record.metadata.mode, 'rail');
});

test('does not turn authorization into authority', () => {
  const record = ioRecord({
    kind: 'authorization',
    action: 'authorize_payment',
    actor: { id: 'approver-1' },
    source: 'runtime',
    authority: { id: 'authority-1', kind: 'authority' },
    authorization: { id: 'decision-1', kind: 'authorization' }
  });
  assert.equal(record.authority.id, 'authority-1');
  assert.equal(record.authorization.id, 'decision-1');
});

test('rejects incomplete or unsupported IO', () => {
  assert.throws(() => ioRecord({ kind: 'exchange', action: 'x', source: 'test' }), /actor is required/);
  assert.throws(() => ioRecord({ kind: 'made_up', action: 'x', actor: { id: 'a' }, source: 'test' }), /unsupported IO kind/);
  assert.equal(isIoRecord({}), false);
});
