const NON_EMPTY = (value, field) => {
  if (typeof value !== 'string' || value.trim() === '') throw new TypeError(`${field} must be a non-empty string`);
  return value.trim();
};

const STRINGS = (value, field) => {
  if (value === undefined) return [];
  if (!Array.isArray(value) || value.some((item) => typeof item !== 'string' || item.trim() === '')) {
    throw new TypeError(`${field} must contain non-empty strings`);
  }
  return value.map((item) => item.trim());
};

const OBJECT = (value, field) => {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) throw new TypeError(`${field} must be an object`);
  return { ...value };
};

const timestamp = () => new Date().toISOString();

function base(type, id, fields = {}) {
  return { type, id: NON_EMPTY(id, 'id'), ...fields, schemaVersion: '1.0', createdAt: timestamp() };
}

export const EDUCATION_ENTITY_TYPES = Object.freeze([
  'institution',
  'programme',
  'curriculum',
  'course',
  'subject',
  'academic_session',
  'cohort',
  'class',
  'educator',
  'learner',
  'application',
  'admission',
  'enrollment',
  'learning_activity',
  'attendance_record',
  'assessment_plan',
  'assessment',
  'assessment_result',
  'placement',
  'credential_reference',
  'cpd_record',
  'facility',
  'schedule',
]);

export function createInstitution({ id, name, institutionType = 'institution', authorityRefs = [], locationRef = null, metadata = {} }) {
  return base('institution', id, {
    name: NON_EMPTY(name, 'name'),
    institutionType: NON_EMPTY(institutionType, 'institutionType'),
    authorityRefs: STRINGS(authorityRefs, 'authorityRefs'),
    locationRef: locationRef === null ? null : NON_EMPTY(locationRef, 'locationRef'),
    metadata: OBJECT(metadata, 'metadata'),
  });
}

export function createProgramme({ id, title, institutionRef, competencyRefs = [], credentialPathRefs = [], status = 'active' }) {
  return base('programme', id, {
    title: NON_EMPTY(title, 'title'),
    institutionRef: NON_EMPTY(institutionRef, 'institutionRef'),
    competencyRefs: STRINGS(competencyRefs, 'competencyRefs'),
    credentialPathRefs: STRINGS(credentialPathRefs, 'credentialPathRefs'),
    status: NON_EMPTY(status, 'status'),
  });
}

export function createCurriculum({ id, programmeRef, version, courseRefs = [], competencyRefs = [], standardsRefs = [], effectiveFrom = null }) {
  return base('curriculum', id, {
    programmeRef: NON_EMPTY(programmeRef, 'programmeRef'),
    version: NON_EMPTY(version, 'version'),
    courseRefs: STRINGS(courseRefs, 'courseRefs'),
    competencyRefs: STRINGS(competencyRefs, 'competencyRefs'),
    standardsRefs: STRINGS(standardsRefs, 'standardsRefs'),
    effectiveFrom,
  });
}

export function createCourse({ id, title, curriculumRef, subjectRefs = [], competencyRefs = [], creditValue = null }) {
  return base('course', id, {
    title: NON_EMPTY(title, 'title'),
    curriculumRef: NON_EMPTY(curriculumRef, 'curriculumRef'),
    subjectRefs: STRINGS(subjectRefs, 'subjectRefs'),
    competencyRefs: STRINGS(competencyRefs, 'competencyRefs'),
    creditValue,
  });
}

export function createCohort({ id, programmeRef, academicSessionRef, learnerRefs = [] }) {
  return base('cohort', id, {
    programmeRef: NON_EMPTY(programmeRef, 'programmeRef'),
    academicSessionRef: NON_EMPTY(academicSessionRef, 'academicSessionRef'),
    learnerRefs: STRINGS(learnerRefs, 'learnerRefs'),
  });
}

export function createEnrollment({ id, learnerRef, programmeRef, admissionRef, admissionStatus, cohortRef = null, ioRef = null }) {
  if (!canAdvanceEnrollment({ admissionStatus })) throw new TypeError('Enrollment requires an admitted decision');
  return base('enrollment', id, {
    learnerRef: NON_EMPTY(learnerRef, 'learnerRef'),
    programmeRef: NON_EMPTY(programmeRef, 'programmeRef'),
    admissionRef: NON_EMPTY(admissionRef, 'admissionRef'),
    admissionStatus: 'admitted',
    cohortRef: cohortRef === null ? null : NON_EMPTY(cohortRef, 'cohortRef'),
    ioRef: ioRef === null ? null : NON_EMPTY(ioRef, 'ioRef'),
    status: 'active',
  });
}

export function canAdvanceEnrollment({ admissionStatus }) {
  return admissionStatus === 'admitted';
}

export function createAssessmentResult({ id, assessmentRef, learnerRef, outcome, evidenceRefs = [], credentialRef = null, ioRef = null }) {
  return base('assessment_result', id, {
    assessmentRef: NON_EMPTY(assessmentRef, 'assessmentRef'),
    learnerRef: NON_EMPTY(learnerRef, 'learnerRef'),
    outcome: NON_EMPTY(outcome, 'outcome'),
    evidenceRefs: STRINGS(evidenceRefs, 'evidenceRefs'),
    credentialRef: credentialRef === null ? null : NON_EMPTY(credentialRef, 'credentialRef'),
    ioRef: ioRef === null ? null : NON_EMPTY(ioRef, 'ioRef'),
  });
}

export function createCredentialReference({ id, holderRef, issuerRef, issuerType, sourceRef, credentialType = 'credential', status = 'active' }) {
  const authorityClass = issuerType === 'external_authority'
    ? 'external_authority'
    : issuerType === 'ecosystem_native'
      ? 'ecosystem_native'
      : 'unresolved';

  return base('credential_reference', id, {
    holderRef: NON_EMPTY(holderRef, 'holderRef'),
    issuerRef: NON_EMPTY(issuerRef, 'issuerRef'),
    issuerType: NON_EMPTY(issuerType, 'issuerType'),
    authorityClass,
    sourceRef: NON_EMPTY(sourceRef, 'sourceRef'),
    credentialType: NON_EMPTY(credentialType, 'credentialType'),
    status: NON_EMPTY(status, 'status'),
  });
}

export function createPlacement({ id, learnerRef, opportunityRef, hostRef, evidenceRefs = [], ioRef = null }) {
  return base('placement', id, {
    learnerRef: NON_EMPTY(learnerRef, 'learnerRef'),
    opportunityRef: NON_EMPTY(opportunityRef, 'opportunityRef'),
    hostRef: NON_EMPTY(hostRef, 'hostRef'),
    evidenceRefs: STRINGS(evidenceRefs, 'evidenceRefs'),
    ioRef: ioRef === null ? null : NON_EMPTY(ioRef, 'ioRef'),
    ownsOpportunity: false,
  });
}

export function createAiCapabilityAssessment({ id, aiRef, capabilityRefs = [], evidenceRefs = [], supervision = 'recommended' }) {
  return base('ai_capability_assessment', id, {
    aiRef: NON_EMPTY(aiRef, 'aiRef'),
    capabilityRefs: STRINGS(capabilityRefs, 'capabilityRefs'),
    evidenceRefs: STRINGS(evidenceRefs, 'evidenceRefs'),
    supervision: NON_EMPTY(supervision, 'supervision'),
    humanProfessionalAuthorization: false,
  });
}
