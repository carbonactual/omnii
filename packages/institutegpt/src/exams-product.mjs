const NON_EMPTY = (value, field) => {
  if (typeof value !== 'string' || value.trim() === '') throw new TypeError(`${field} must be a non-empty string`);
  return value.trim();
};

export const EXAM_FAMILIES = Object.freeze([
  'school_leaving',
  'common_entrance',
  'tertiary_admissions',
  'postgraduate_admissions',
  'professional',
  'licensing_support',
  'certification',
  'continuing_professional_development',
  'workplace_job',
  'promotion',
  'confirmation',
  'language_proficiency',
  'placement',
  'qualifying',
  'competitive_selection',
  'scholarship_selection',
  'internal_institutional',
  'diagnostic',
  'mastery',
  'practical_performance',
  'oral_viva',
  'research_defense',
  'national_assessment',
  'international_assessment',
  'simulation',
]);

export const EXAM_LIFECYCLE = Object.freeze([
  'discover',
  'eligibility',
  'register',
  'verify_identity',
  'submit_evidence',
  'pay_or_confirm_funding',
  'schedule',
  'allocate_centre_or_remote_slot',
  'prepare',
  'authenticate',
  'deliver',
  'invigilate_or_proctor',
  'capture_responses_and_process_evidence',
  'mark',
  'moderate',
  'standard_set',
  'score',
  'quality_assure',
  'approve_result',
  'publish_result',
  'verify_result',
  'appeal_or_review',
  'remark_or_regrade',
  'retake',
  'issue_or_reference_credential',
  'feed_admission_progression_or_employment',
  'archive',
]);

export const EXAM_DELIVERY_MODES = Object.freeze([
  'paper',
  'computer_based',
  'computer_adaptive',
  'hybrid',
  'remote_online',
  'test_centre',
  'oral_live',
  'practical_centre',
  'field',
  'simulation',
]);

export const EXAM_ROLES = Object.freeze([
  'candidate',
  'exam_body',
  'institution',
  'admissions_body',
  'professional_body',
  'employer',
  'regulator',
  'examiner',
  'marker',
  'second_marker',
  'moderator',
  'invigilator',
  'proctor',
  'test_centre',
  'administrator',
  'counsellor',
  'appeal_reviewer',
  'quality_assurer',
  'credential_issuer',
]);

export const EXAM_PROVIDER_PROFILES = Object.freeze({
  JAMB: Object.freeze({
    providerKey: 'JAMB',
    country: 'NG',
    examFamilies: ['tertiary_admissions', 'competitive_selection'],
    examples: ['UTME', 'Direct Entry'],
  }),
  WAEC: Object.freeze({
    providerKey: 'WAEC',
    country: 'NG',
    examFamilies: ['school_leaving', 'international_assessment'],
    examples: ['WASSCE'],
  }),
  NECO: Object.freeze({
    providerKey: 'NECO',
    country: 'NG',
    examFamilies: ['school_leaving', 'common_entrance', 'national_assessment'],
    examples: ['SSCE Internal', 'SSCE External', 'NCEE', 'BECE'],
  }),
  IELTS: Object.freeze({
    providerKey: 'IELTS',
    country: 'GLOBAL',
    examFamilies: ['language_proficiency'],
    examples: ['IELTS Academic', 'IELTS General Training'],
  }),
});

export function createExamDefinition({
  id,
  name,
  providerRef,
  family,
  purpose,
  deliveryModes = ['test_centre'],
  subjectRefs = [],
  competencyRefs = [],
  credentialRef = null,
  authorityRefs = [],
  rules = {},
  metadata = {},
}) {
  const examFamily = NON_EMPTY(family, 'family');
  if (!EXAM_FAMILIES.includes(examFamily)) throw new TypeError(`unsupported exam family: ${examFamily}`);
  if (!Array.isArray(deliveryModes) || deliveryModes.some((mode) => !EXAM_DELIVERY_MODES.includes(mode))) {
    throw new TypeError('deliveryModes contains an unsupported delivery mode');
  }
  return Object.freeze({
    type: 'exam_definition',
    id: NON_EMPTY(id, 'id'),
    name: NON_EMPTY(name, 'name'),
    providerRef: NON_EMPTY(providerRef, 'providerRef'),
    family: examFamily,
    purpose: NON_EMPTY(purpose, 'purpose'),
    deliveryModes: [...deliveryModes],
    subjectRefs: [...subjectRefs],
    competencyRefs: [...competencyRefs],
    credentialRef: credentialRef === null ? null : NON_EMPTY(credentialRef, 'credentialRef'),
    authorityRefs: [...authorityRefs],
    rules: { ...rules },
    metadata: { ...metadata },
    schemaVersion: '1.0',
  });
}

export function createExamRegistration({ id, candidateRef, examRef, sessionRef, identityEvidenceRefs = [], applicationRef = null, ioRef = null }) {
  return Object.freeze({
    type: 'exam_registration',
    id: NON_EMPTY(id, 'id'),
    candidateRef: NON_EMPTY(candidateRef, 'candidateRef'),
    examRef: NON_EMPTY(examRef, 'examRef'),
    sessionRef: NON_EMPTY(sessionRef, 'sessionRef'),
    identityEvidenceRefs: [...identityEvidenceRefs],
    applicationRef: applicationRef === null ? null : NON_EMPTY(applicationRef, 'applicationRef'),
    ioRef: ioRef === null ? null : NON_EMPTY(ioRef, 'ioRef'),
    status: 'registered',
    schemaVersion: '1.0',
  });
}

export function createExamResult({
  id,
  registrationRef,
  outcome,
  score = null,
  grade = null,
  evidenceRefs = [],
  integrityRefs = [],
  authorityDecisionRef = null,
  credentialRef = null,
  ioRef = null,
}) {
  const normalizedOutcome = NON_EMPTY(outcome, 'outcome');
  return Object.freeze({
    type: 'exam_result',
    id: NON_EMPTY(id, 'id'),
    registrationRef: NON_EMPTY(registrationRef, 'registrationRef'),
    outcome: normalizedOutcome,
    score,
    grade,
    evidenceRefs: [...evidenceRefs],
    integrityRefs: [...integrityRefs],
    authorityDecisionRef: authorityDecisionRef === null ? null : NON_EMPTY(authorityDecisionRef, 'authorityDecisionRef'),
    credentialRef: credentialRef === null ? null : NON_EMPTY(credentialRef, 'credentialRef'),
    ioRef: ioRef === null ? null : NON_EMPTY(ioRef, 'ioRef'),
    credentialIssuedByExamResult: false,
    schemaVersion: '1.0',
  });
}

export function createExamProviderDeployment({ id, providerKey, institutionRef = null, overrides = {} }) {
  const provider = EXAM_PROVIDER_PROFILES[providerKey];
  if (!provider) throw new TypeError(`unknown exam provider: ${providerKey}`);
  return Object.freeze({
    type: 'exam_provider_deployment',
    id: NON_EMPTY(id, 'id'),
    baseProviderKey: providerKey,
    institutionRef: institutionRef === null ? null : NON_EMPTY(institutionRef, 'institutionRef'),
    inheritance: ['INSTITUTEGPT', 'EXAMS'],
    profile: provider,
    overrides: { ...overrides },
    schemaVersion: '1.0',
  });
}

export function isAssessmentForProgression(examFamily) {
  return ['tertiary_admissions', 'postgraduate_admissions', 'professional', 'promotion', 'confirmation', 'competitive_selection', 'placement', 'qualifying'].includes(examFamily);
}
