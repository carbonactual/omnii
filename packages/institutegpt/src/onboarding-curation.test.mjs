import assert from 'node:assert/strict';
import {
  ONBOARDING_CURRICULUM_DIMENSIONS,
  createEducationOnboardingProfile,
  curateInstituteGPTLearning,
} from './onboarding-curation.mjs';

assert.ok(ONBOARDING_CURRICULUM_DIMENSIONS.includes('interests'));
assert.ok(ONBOARDING_CURRICULUM_DIMENSIONS.includes('credential_goals'));
assert.ok(ONBOARDING_CURRICULUM_DIMENSIONS.includes('privacy_and_safeguarding'));

const profile = createEducationOnboardingProfile({
  subjectId: 'learner-1',
  learnerType: 'professional',
  educationStage: 'professional_development',
  interests: ['ai'],
  goals: ['career_transition'],
  preferredFormats: ['lab', 'self_paced'],
  credentialGoals: ['certificate'],
  providerPreferences: ['GITHUB_EDUCATION'],
  accessibility: ['captions'],
});
assert.ok(Object.isFrozen(profile));
assert.equal(profile.subjectId, 'learner-1');
assert.ok(profile.interests.includes('ai'));

const result = curateInstituteGPTLearning(profile, [
  { id: 'course-1', title: 'AI Lab', tags: ['ai', 'career_transition'], skills: ['ai'] },
  { id: 'course-2', title: 'History', tags: ['history'] },
]);
assert.equal(result.subjectId, 'learner-1');
assert.equal(result.recommendations[0].id, 'course-1');
assert.equal(result.recommendations[0].curationScore, 3);
assert.equal(result.humanReviewRequired, true);

assert.throws(() => createEducationOnboardingProfile(), /subjectId is required/);
assert.throws(() => curateInstituteGPTLearning(null), /education onboarding profile is required/);

console.log('InstituteGPT onboarding curation contracts: PASS');
