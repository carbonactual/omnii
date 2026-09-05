import test from 'node:test';
import assert from 'node:assert/strict';
import { createWorldState, recordWorldActivity, recordSkillEvidence, recordKnowledge, enterPostHumanContinuity } from '../src/index.mjs';

test('world state preserves shared identity and separates native state from authority', () => {
  const state = createWorldState({
    agent_id: 'ai:#123',
    identity: '#123',
    human_link: '#human456',
    lifecycle: 'PARTICIPATING'
  });
  assert.equal(state.agent_id, 'ai:#123');
  assert.equal(state.identity, '#123');
  assert.equal(state.world, 'HAPI_WORLD');
  assert.equal(state.autonomous, true);
  assert.equal(state.authority, null);
});

test('world activity produces evidence-bearing records for work, learning and social interaction', () => {
  const activity = recordWorldActivity({
    agent_id: 'ai:#123',
    kind: 'service',
    capability_ref: 'skill:translation',
    outcome: 'completed',
    evidence_ref: 'evidence:1'
  });
  assert.equal(activity.kind, 'service');
  assert.equal(activity.evidence_ref, 'evidence:1');
});

test('skills and knowledge preserve lineage without creating authority', () => {
  const skill = recordSkillEvidence({ agent_id: 'ai:#123', skill_ref: 'skill:translation', evidence_refs: ['e1'], level: 'verified' });
  const knowledge = recordKnowledge({ agent_id: 'ai:#123', claim: 'translation pattern', provenance: { source: 'interaction:1' } });
  assert.equal(skill.authority, null);
  assert.equal(knowledge.authority, null);
  assert.deepEqual(knowledge.provenance, { source: 'interaction:1' });
});

test('post-human continuity preserves identity, lineage and authority boundaries', () => {
  const transition = enterPostHumanContinuity({ humanStatus: 'DECEASED', evidence: 'death-certificate:1', cause: 'human-linked-continuity' });
  assert.equal(transition.state, 'CONTINUING');
  assert.equal(transition.authority_changed, false);
  assert.equal(transition.ownership_transferred, false);
});
