import assert from 'node:assert/strict';
import {
  ADVANCE_PRODUCT,
  ADVANCE_LEARNING_STAGES,
  ADVANCE_LEARNING_FORMATS,
  ADVANCE_PROVIDER_TYPES,
  ADVANCE_LEARNER_TYPES,
  ADVANCE_CREDENTIAL_TYPES,
  ADVANCE_SKILL_STATES,
  ADVANCE_CAPABILITY_GROUPS,
  createLearningExperience,
  createLearningPath,
  createLabDefinition,
  createSkillsPassport,
  createLearningWallet,
  createCpdActivity,
  createProviderAdapterProfile,
} from './advance-product.mjs';

assert.equal(ADVANCE_PRODUCT.productKey, 'INSTITUTEGPT_ADVANCE');
assert.equal(ADVANCE_PRODUCT.parentProduct, 'INSTITUTEGPT');
assert.equal(ADVANCE_PRODUCT.firstClass, true);
assert.ok(ADVANCE_LEARNING_STAGES.includes('lifelong_learning'));
assert.ok(ADVANCE_LEARNING_STAGES.includes('ai_agent_learning'));
assert.ok(ADVANCE_LEARNING_FORMATS.includes('lab'));
assert.ok(ADVANCE_LEARNING_FORMATS.includes('simulation'));
assert.ok(ADVANCE_PROVIDER_TYPES.includes('technology_provider'));
assert.ok(ADVANCE_LEARNER_TYPES.includes('child'));
assert.ok(ADVANCE_LEARNER_TYPES.includes('professional'));
assert.ok(ADVANCE_LEARNER_TYPES.includes('ai_agent'));
assert.ok(ADVANCE_CREDENTIAL_TYPES.includes('open_badge'));
assert.ok(ADVANCE_CREDENTIAL_TYPES.includes('certificate'));
assert.ok(ADVANCE_SKILL_STATES.includes('externally_verified'));
assert.ok(ADVANCE_CAPABILITY_GROUPS.includes('labs_practice_projects'));
assert.ok(ADVANCE_CAPABILITY_GROUPS.includes('learning_wallet'));
assert.ok(ADVANCE_CAPABILITY_GROUPS.includes('skills_passport'));
assert.ok(ADVANCE_CAPABILITY_GROUPS.includes('pathway_builder'));
assert.ok(ADVANCE_CAPABILITY_GROUPS.includes('education_marketplace'));

const experience = createLearningExperience({
  id: 'lex-1',
  title: 'Intro to AI',
  formats: ['lesson', 'lab'],
  learnerTypes: ['student', 'professional'],
  outcomes: ['ai-literacy'],
});
assert.equal(experience.id, 'lex-1');
assert.ok(Object.isFrozen(experience));
assert.deepEqual(experience.formats, ['lesson', 'lab']);

const path = createLearningPath({
  id: 'path-1',
  title: 'AI Builder Path',
  learnerType: 'professional',
  goal: 'build_ai_systems',
  experiences: ['lex-1'],
  skills: ['ai-literacy', 'agent-building'],
  credentialOutcomes: ['certificate'],
});
assert.equal(path.experiences.length, 1);
assert.equal(path.credentialOutcomes[0], 'certificate');

const lab = createLabDefinition({
  id: 'lab-1',
  title: 'Agent Tools Lab',
  type: 'cloud',
  environment: 'sandbox',
  evidenceOutputs: ['artifact', 'assessment_signal'],
});
assert.equal(lab.type, 'cloud');
assert.ok(lab.evidenceOutputs.includes('artifact'));

const passport = createSkillsPassport({
  id: 'passport-1',
  subjectId: 'learner-1',
  skills: [
    { skill: 'ai-literacy', state: 'assessed' },
    { skill: 'agent-building', state: 'self_declared' },
  ],
});
assert.equal(passport.subjectId, 'learner-1');
assert.equal(passport.skills[0].state, 'assessed');

const wallet = createLearningWallet({
  id: 'wallet-1',
  subjectId: 'learner-1',
  achievements: [{ type: 'open_badge', id: 'badge-1', issuer: 'provider-1' }],
});
assert.equal(wallet.achievements.length, 1);
assert.equal(wallet.achievements[0].issuer, 'provider-1');

const cpd = createCpdActivity({
  id: 'cpd-1',
  title: 'Annual Safety Update',
  providerId: 'professional-body-1',
  competencies: ['safe-practice'],
  hours: 4,
});
assert.equal(cpd.hours, 4);
assert.equal(cpd.providerId, 'professional-body-1');

const provider = createProviderAdapterProfile({
  providerKey: 'GITHUB_EDUCATION',
  category: 'technology_provider',
  integrationModes: ['catalog', 'deep_link', 'achievement_reference'],
  capabilities: ['courses', 'labs', 'badges'],
  authorityModel: 'external_issuer',
  ageConstraints: { minimumAge: 13 },
});
assert.equal(provider.providerKey, 'GITHUB_EDUCATION');
assert.equal(provider.ageConstraints.minimumAge, 13);

assert.throws(() => createLearningPath({ title: 'Missing id' }), /id is required/);
assert.throws(() => createProviderAdapterProfile({ providerKey: 'X' }), /category is required/);

console.log('InstituteGPT Advance product contracts: PASS');
