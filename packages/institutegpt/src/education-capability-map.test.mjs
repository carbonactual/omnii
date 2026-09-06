import assert from 'node:assert/strict';
import { EDUCATION_CAPABILITY_DOMAINS, EDUCATION_PROGRESSION_STAGES, findEducationCapabilities } from './education-capability-map.mjs';

assert.ok(EDUCATION_CAPABILITY_DOMAINS.length >= 20);
assert.ok(EDUCATION_PROGRESSION_STAGES.includes('lifelong_learning'));
assert.ok(EDUCATION_CAPABILITY_DOMAINS.some((d) => d.id === 'tutoring_mentoring_coaching'));
assert.ok(EDUCATION_CAPABILITY_DOMAINS.some((d) => d.id === 'assessment_integrity'));
assert.ok(EDUCATION_CAPABILITY_DOMAINS.some((d) => d.id === 'institution_operations'));
assert.ok(EDUCATION_CAPABILITY_DOMAINS.some((d) => d.id === 'career_workforce_transition'));
assert.ok(EDUCATION_CAPABILITY_DOMAINS.some((d) => d.id === 'ai_as_learner'));
assert.ok(EDUCATION_CAPABILITY_DOMAINS.some((d) => d.id === 'government_systems'));
assert.ok(EDUCATION_CAPABILITY_DOMAINS.every((d) => Array.isArray(d.capabilities) && d.capabilities.length > 0));
assert.ok(findEducationCapabilities('laboratory_learning').length > 0);
assert.ok(findEducationCapabilities('competency_assessment').length > 0);
assert.ok(findEducationCapabilities('stackable_credentials').length > 0);
assert.ok(findEducationCapabilities('offline_learning').length > 0);
assert.ok(findEducationCapabilities('ai_use_policy').length > 0);

console.log(`InstituteGPT capability map tests: ${EDUCATION_CAPABILITY_DOMAINS.length} domains validated`);
