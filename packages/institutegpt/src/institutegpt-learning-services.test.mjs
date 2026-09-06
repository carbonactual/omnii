import assert from 'node:assert/strict';
import {
  INSTITUTEGPT_LEARNING_SURFACE,
  INSTITUTEGPT_LEARNING_STAGES,
  INSTITUTEGPT_LEARNING_FORMATS,
  INSTITUTEGPT_PROVIDER_TYPES,
  INSTITUTEGPT_LEARNER_TYPES,
  INSTITUTEGPT_CREDENTIAL_TYPES,
  INSTITUTEGPT_SKILL_STATES,
  INSTITUTEGPT_CAPABILITY_GROUPS,
  createLearningExperience,
  createLearningPath,
  createLabDefinition,
  createSkillsPassport,
  createLearningWallet,
  createCpdActivity,
  createProviderAdapterProfile,
} from './institutegpt-learning-services.mjs';

assert.equal(INSTITUTEGPT_LEARNING_SURFACE.owner, 'INSTITUTEGPT');
assert.equal(INSTITUTEGPT_LEARNING_SURFACE.firstClassProduct, 'INSTITUTEGPT');
assert.ok(INSTITUTEGPT_LEARNING_STAGES.includes('lifelong_learning'));
assert.ok(INSTITUTEGPT_LEARNING_FORMATS.includes('lab'));
assert.ok(INSTITUTEGPT_PROVIDER_TYPES.includes('technology_provider'));
assert.ok(INSTITUTEGPT_LEARNER_TYPES.includes('child'));
assert.ok(INSTITUTEGPT_LEARNER_TYPES.includes('professional'));
assert.ok(INSTITUTEGPT_CREDENTIAL_TYPES.includes('open_badge'));
assert.ok(INSTITUTEGPT_SKILL_STATES.includes('externally_verified'));
assert.ok(INSTITUTEGPT_CAPABILITY_GROUPS.includes('learning_wallet'));

const experience = createLearningExperience({ id: 'lex-1', title: 'Intro to AI', formats: ['lesson', 'lab'], learnerTypes: ['student'], outcomes: ['ai-literacy'] });
assert.equal(experience.id, 'lex-1');
assert.ok(Object.isFrozen(experience));

const path = createLearningPath({ id: 'path-1', title: 'AI Builder Path', learnerType: 'professional', goal: 'build_ai_systems', experiences: ['lex-1'], skills: ['ai-literacy'], credentialOutcomes: ['certificate'] });
assert.equal(path.experiences.length, 1);

const lab = createLabDefinition({ id: 'lab-1', title: 'Agent Tools Lab', type: 'cloud', environment: 'sandbox', evidenceOutputs: ['artifact'] });
assert.equal(lab.labType, 'cloud');

const passport = createSkillsPassport({ id: 'passport-1', subjectId: 'learner-1', skills: [{ skill: 'ai-literacy', state: 'assessed' }] });
assert.equal(passport.skills[0].state, 'assessed');

const wallet = createLearningWallet({ id: 'wallet-1', subjectId: 'learner-1', achievements: [{ type: 'open_badge', id: 'badge-1', issuer: 'provider-1' }] });
assert.equal(wallet.achievements[0].issuer, 'provider-1');

const cpd = createCpdActivity({ id: 'cpd-1', title: 'Annual Safety Update', providerId: 'professional-body-1', competencies: ['safe-practice'], hours: 4 });
assert.equal(cpd.hours, 4);

const provider = createProviderAdapterProfile({ providerKey: 'GITHUB_EDUCATION', category: 'technology_provider', integrationModes: ['catalog', 'deep_link'], capabilities: ['courses', 'labs', 'badges'], authorityModel: 'external_provider', ageConstraints: { minimumAge: 13 } });
assert.equal(provider.ageConstraints.minimumAge, 13);
assert.throws(() => createLearningPath({ title: 'Missing id' }), /id is required/);
assert.throws(() => createProviderAdapterProfile({ providerKey: 'X' }), /category is required/);

console.log('InstituteGPT learning service contracts: PASS');
