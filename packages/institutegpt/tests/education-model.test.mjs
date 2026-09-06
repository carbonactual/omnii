import test from 'node:test';
import assert from 'node:assert/strict';

import {
  createInstitution,
  createProgramme,
  createCurriculum,
  createEnrollment,
  createAssessmentResult,
  createCredentialReference,
  createPlacement,
  createAiCapabilityAssessment,
  canAdvanceEnrollment,
} from '../src/education-model.mjs';

test('institution is required to own a programme', () => {
  assert.throws(() => createProgramme({ id: 'prog-1', title: 'Computer Science', institutionRef: '' }), /institutionRef/);
});

test('programme and curriculum can reference shared competencies without owning them', () => {
  const institution = createInstitution({ id: 'inst-1', name: 'Example Institute' });
  const programme = createProgramme({ id: 'prog-1', title: 'Computer Science', institutionRef: institution.id, competencyRefs: ['case:cs-1'] });
  const curriculum = createCurriculum({ id: 'cur-1', programmeRef: programme.id, version: '2026.1', competencyRefs: ['case:cs-1', 'case:math-1'] });

  assert.deepEqual(programme.competencyRefs, ['case:cs-1']);
  assert.deepEqual(curriculum.competencyRefs, ['case:cs-1', 'case:math-1']);
});

test('enrollment only advances after an admitted decision', () => {
  assert.equal(canAdvanceEnrollment({ admissionStatus: 'pending' }), false);
  assert.equal(canAdvanceEnrollment({ admissionStatus: 'admitted' }), true);
});

test('assessment result is evidence, not an automatic credential', () => {
  const result = createAssessmentResult({
    id: 'res-1',
    assessmentRef: 'exam-1',
    learnerRef: 'person-1',
    outcome: 'passed',
    evidenceRefs: ['io:assessment-1'],
  });

  assert.equal(result.credentialRef, null);

  const credential = createCredentialReference({
    id: 'cred-ref-1',
    holderRef: 'person-1',
    issuerRef: 'authority-1',
    issuerType: 'external_authority',
    sourceRef: 'vc:123',
  });
  assert.equal(credential.authorityClass, 'external_authority');
});

test('AI capability assessment never becomes human professional authorization', () => {
  const assessment = createAiCapabilityAssessment({
    id: 'ai-assess-1',
    aiRef: 'ai-1',
    capabilityRefs: ['cap:diagnostic-reasoning'],
    evidenceRefs: ['io:ai-assessment-1'],
  });

  assert.equal(assessment.humanProfessionalAuthorization, false);
});

test('placement composes an opportunity without duplicating opportunity ownership', () => {
  const placement = createPlacement({
    id: 'placement-1',
    learnerRef: 'person-1',
    opportunityRef: 'opportunity:siwes-42',
    hostRef: 'org-7',
    evidenceRefs: ['io:placement-1'],
  });

  assert.equal(placement.opportunityRef, 'opportunity:siwes-42');
  assert.equal(placement.ownsOpportunity, false);
});

assert.doesNotThrow(() => createEnrollment({
  id: 'enr-1',
  learnerRef: 'person-1',
  programmeRef: 'prog-1',
  admissionRef: 'admission-1',
  admissionStatus: 'admitted',
}));
