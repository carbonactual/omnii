import test from 'node:test';
import assert from 'node:assert/strict';
import { toIoOccurrence, withIoOccurrence } from './io-boundary.mjs';

test('wraps success as one primary IO occurrence', async () => {
  const { result, io } = await withIoOccurrence(async () => 42, {
    kind: 'execution',
    action: 'run_task',
    actor: { id: 'agent-1', kind: 'agent' },
    source: 'runtime',
    idempotency_key: 'task:1'
  });
  assert.equal(result, 42);
  assert.equal(io.status, 'completed');
  assert.equal(io.idempotency_key, 'task:1');
});

test('failed actions carry the primary IO occurrence', async () => {
  await assert.rejects(
    () => withIoOccurrence(async () => { throw new Error('boom'); }, {
      kind: 'execution',
      action: 'run_task',
      actor: { id: 'agent-1' },
      source: 'runtime',
      id: 'io-failed-1'
    }),
    (error) => error.io?.id === 'io-failed-1' && error.io.status === 'failed'
  );
});

test('converts directly to the canonical IO contract', () => {
  const io = toIoOccurrence({
    kind: 'communication',
    action: 'send_message',
    actor: { id: 'system-1' },
    source: 'runtime'
  });
  assert.equal(io.kind, 'communication');
  assert.equal(io.status, 'completed');
});
