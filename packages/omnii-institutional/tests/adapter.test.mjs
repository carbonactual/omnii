import test from 'node:test';
import assert from 'node:assert/strict';
import { toCanonicalRegistry, toCanonicalRequest, toCanonicalWorkflowEvent, toCanonicalEvidence } from '../src/adapter.mjs';

test('maps NASC registry definitions to canonical institutional registries', () => {
  const result = toCanonicalRegistry({ id: 'r1', slug: 'institution', name: 'Institution', status: 'active', created_at: '2026-01-01' });
  assert.equal(result.type, 'registry');
  assert.equal(result.record_type, 'institution');
});

test('maps institutional requests to intent/workflow objects without granting authority', () => {
  const result = toCanonicalRequest({ id: 'q1', title: 'permit', description: 'request', requester: { id: 'h1' }, registry_id: 'r1', payload: {}, status: 'authority_review' });
  assert.equal(result.type, 'intent');
  assert.equal(result.workflow_state, 'authority_review');
  assert.equal(result.authority, null);
});

test('maps workflow events and evidence into canonical event/provenance records', () => {
  const event = toCanonicalWorkflowEvent({ id: 'e1', request_id: 'q1', event_type: 'decision', from_state: 'authority_review', to_state: 'decision', actor: { type: 'human', id: 'h1' }, metadata: {}, occurred_at: '2026-01-01' });
  const evidence = toCanonicalEvidence({ id: 'ev1', request_id: 'q1', source_type: 'document', source_ref: 'doc:1', provenance: { source: 'registry' }, created_at: '2026-01-01' });
  assert.equal(event.type, 'event');
  assert.equal(event.actor.type, 'human');
  assert.equal(evidence.type, 'evidence');
  assert.deepEqual(evidence.provenance, { source: 'registry' });
});
