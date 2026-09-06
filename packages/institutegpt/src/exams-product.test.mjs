import test from 'node:test';
import assert from 'node:assert/strict';
import {
  EXAM_FAMILIES,
  EXAM_LIFECYCLE,
  EXAM_PROVIDER_PROFILES,
  createExamDefinition,
  createExamRegistration,
  createExamResult,
  createExamProviderDeployment,
  isAssessmentForProgression,
} from './exams-product.mjs';

test('exam product exposes a full lifecycle', () => {
  assert.ok(EXAM_LIFECYCLE.includes('register'));
  assert.ok(EXAM_LIFECYCLE.includes('deliver'));
  assert.ok(EXAM_LIFECYCLE.includes('mark'));
  assert.ok(EXAM_LIFECYCLE.includes('publish_result'));
  assert.ok(EXAM_LIFECYCLE.includes('appeal_or_review'));
  assert.ok(EXAM_LIFECYCLE.includes('retake'));
});

test('national and international exam provider profiles are represented', () => {
  assert.ok(EXAM_PROVIDER_PROFILES.JAMB.examples.includes('UTME'));
  assert.ok(EXAM_PROVIDER_PROFILES.WAEC.examples.includes('WASSCE'));
  assert.ok(EXAM_PROVIDER_PROFILES.NECO.examples.includes('SSCE Internal'));
  assert.ok(EXAM_PROVIDER_PROFILES.IELTS.examples.includes('IELTS Academic'));
});

test('exam definitions remain configurable by provider and purpose', () => {
  const exam = createExamDefinition({
    id: 'utme-2026',
    name: 'Unified Tertiary Matriculation Examination',
    providerRef: 'authority:jamb',
    family: 'tertiary_admissions',
    purpose: 'tertiary admission selection',
    deliveryModes: ['computer_based'],
    competencyRefs: ['competency:secondary-core'],
  });

  assert.equal(exam.family, 'tertiary_admissions');
  assert.deepEqual(exam.deliveryModes, ['computer_based']);
});

test('registration is separate from the exam definition', () => {
  const registration = createExamRegistration({
    id: 'reg-1',
    candidateRef: 'person-1',
    examRef: 'utme-2026',
    sessionRef: '2026-main',
    identityEvidenceRefs: ['evidence:id-1'],
  });
  assert.equal(registration.status, 'registered');
  assert.equal(registration.examRef, 'utme-2026');
});

test('exam result does not itself issue a credential', () => {
  const result = createExamResult({
    id: 'result-1',
    registrationRef: 'reg-1',
    outcome: 'passed',
    score: 285,
    integrityRefs: ['integrity:event-1'],
  });
  assert.equal(result.credentialIssuedByExamResult, false);
  assert.equal(result.credentialRef, null);
});

test('institution deployments inherit EXAMS without redefining authority', () => {
  const deployment = createExamProviderDeployment({
    id: 'exam-deploy-jamb',
    providerKey: 'JAMB',
    institutionRef: 'institution:example-university',
  });
  assert.deepEqual(deployment.inheritance, ['INSTITUTEGPT', 'EXAMS']);
  assert.equal(deployment.profile.providerKey, 'JAMB');
});

test('progression-sensitive exam families are identified without granting authority', () => {
  assert.equal(isAssessmentForProgression('tertiary_admissions'), true);
  assert.equal(isAssessmentForProgression('professional'), true);
  assert.equal(isAssessmentForProgression('promotion'), true);
  assert.equal(isAssessmentForProgression('diagnostic'), false);
  assert.ok(EXAM_FAMILIES.includes('language_proficiency'));
});

console.log('InstituteGPT Exams tests: 6 tests passed');
