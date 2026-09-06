import assert from 'node:assert/strict';
import {
  createLearningIntent,
  createLearningRecord,
  createAiLearningRecord,
  classifyCredentialAuthority,
} from './contracts.mjs';

const intent = createLearningIntent({
  subjectRef: '#human-1',
  mode: 'how_to',
  context: { domain: 'transport' },
});
assert.equal(intent.type, 'learning_intent');
assert.equal(intent.subjectRef, '#human-1');
assert.equal(intent.mode, 'how_to');
assert.equal(intent.context.domain, 'transport');

const humanRecord = createLearningRecord({
  subjectRef: '#human-1',
  learningRef: 'course:driving-safety',
  evidenceRefs: ['evidence:1'],
  credentialRefs: ['credential:1'],
});
assert.equal(humanRecord.type, 'human_learning_record');
assert.deepEqual(humanRecord.credentialRefs, ['credential:1']);
assert.deepEqual(humanRecord.evidenceRefs, ['evidence:1']);

const aiRecord = createAiLearningRecord({
  subjectRef: '#human-1',
  aiRef: '#human-1:ai',
  knowledgePackageRefs: ['knowledge:road-safety:v1'],
  supervision: 'human_required',
});
assert.equal(aiRecord.type, 'ai_learning_record');
assert.equal(aiRecord.aiRef, '#human-1:ai');
assert.equal(aiRecord.supervision, 'human_required');

assert.equal(classifyCredentialAuthority({ issuerType: 'external_authority' }), 'external_authority');
assert.equal(classifyCredentialAuthority({ issuerType: 'ecosystem_native' }), 'ecosystem_native');
assert.equal(classifyCredentialAuthority({ issuerType: 'unknown' }), 'unresolved');

console.log('InstituteGPT contract tests: 14 assertions passed');
