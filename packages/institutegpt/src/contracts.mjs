const LEARNING_MODES = new Set([
  'learn',
  'explain',
  'how_to',
  'practice',
  'simulate',
  'test',
  'prepare',
  'qualify',
  'continue_learning',
]);

const SUPERVISION_LEVELS = new Set([
  'none',
  'recommended',
  'human_required',
]);

function nonEmpty(value, field) {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new TypeError(`${field} must be a non-empty string`);
  }
  return value.trim();
}

function arrayOfStrings(value, field) {
  if (value === undefined) return [];
  if (!Array.isArray(value) || value.some((item) => typeof item !== 'string' || item.trim() === '')) {
    throw new TypeError(`${field} must contain non-empty strings`);
  }
  return value.map((item) => item.trim());
}

function now() {
  return new Date().toISOString();
}

export function createLearningIntent({ subjectRef, mode, context = {}, sourceRef = null }) {
  const subject = nonEmpty(subjectRef, 'subjectRef');
  const normalizedMode = nonEmpty(mode, 'mode');
  if (!LEARNING_MODES.has(normalizedMode)) {
    throw new TypeError(`Unsupported learning mode: ${normalizedMode}`);
  }
  if (context === null || typeof context !== 'object' || Array.isArray(context)) {
    throw new TypeError('context must be an object');
  }

  return {
    type: 'learning_intent',
    subjectRef: subject,
    mode: normalizedMode,
    context: { ...context },
    sourceRef: sourceRef === null ? null : nonEmpty(sourceRef, 'sourceRef'),
    createdAt: now(),
  };
}

export function createLearningRecord({
  subjectRef,
  learningRef,
  evidenceRefs = [],
  credentialRefs = [],
  competencyRefs = [],
  status = 'active',
}) {
  return {
    type: 'human_learning_record',
    subjectRef: nonEmpty(subjectRef, 'subjectRef'),
    learningRef: nonEmpty(learningRef, 'learningRef'),
    evidenceRefs: arrayOfStrings(evidenceRefs, 'evidenceRefs'),
    credentialRefs: arrayOfStrings(credentialRefs, 'credentialRefs'),
    competencyRefs: arrayOfStrings(competencyRefs, 'competencyRefs'),
    status: nonEmpty(status, 'status'),
    createdAt: now(),
  };
}

export function createAiLearningRecord({
  subjectRef,
  aiRef,
  knowledgePackageRefs = [],
  evidenceRefs = [],
  assessmentRefs = [],
  supervision = 'recommended',
  version = '1',
}) {
  const normalizedSupervision = nonEmpty(supervision, 'supervision');
  if (!SUPERVISION_LEVELS.has(normalizedSupervision)) {
    throw new TypeError(`Unsupported supervision level: ${normalizedSupervision}`);
  }

  return {
    type: 'ai_learning_record',
    subjectRef: nonEmpty(subjectRef, 'subjectRef'),
    aiRef: nonEmpty(aiRef, 'aiRef'),
    knowledgePackageRefs: arrayOfStrings(knowledgePackageRefs, 'knowledgePackageRefs'),
    evidenceRefs: arrayOfStrings(evidenceRefs, 'evidenceRefs'),
    assessmentRefs: arrayOfStrings(assessmentRefs, 'assessmentRefs'),
    supervision: normalizedSupervision,
    version: nonEmpty(version, 'version'),
    humanProfessionalAuthorization: false,
    createdAt: now(),
  };
}

export function classifyCredentialAuthority({ issuerType }) {
  if (issuerType === 'external_authority') return 'external_authority';
  if (issuerType === 'ecosystem_native') return 'ecosystem_native';
  return 'unresolved';
}

export { LEARNING_MODES, SUPERVISION_LEVELS };
