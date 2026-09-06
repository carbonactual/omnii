const freeze = (value) => Object.freeze(value);
const freezeArray = (value = []) => freeze([...value]);
const requireId = (value, field = 'id') => {
  if (!String(value ?? '').trim()) throw new Error(`${field} is required`);
  return String(value).trim();
};
const optionalText = (value) => value == null ? null : String(value);
const enumValue = (value, allowed, field) => {
  if (value == null) return null;
  if (!allowed.includes(value)) throw new Error(`invalid ${field}`);
  return value;
};

export const INSTITUTEGPT_LEARNING_SURFACE = freeze({
  owner: 'INSTITUTEGPT',
  role: 'universal_learning_skills_certification_and_advancement',
  firstClassProduct: 'INSTITUTEGPT',
  subCapabilities: freezeArray([
    'learning', 'courses_programmes', 'learning_paths', 'skills_competencies',
    'labs_practice_projects', 'cpd_professional_learning',
    'badges_certificates_credentials', 'learning_wallet', 'skills_passport',
    'pathway_builder', 'education_marketplace', 'provider_integrations',
  ]),
});

export const INSTITUTEGPT_LEARNING_STAGES = freeze([
  'early_childhood', 'primary', 'secondary', 'youth_exploration',
  'post_secondary', 'vocational_technical', 'undergraduate', 'postgraduate',
  'doctoral_research', 'professional_entry', 'workplace_learning',
  'professional_development', 'career_transition', 'entrepreneurial_learning',
  'community_learning', 'lifelong_learning', 'ai_agent_learning',
]);

export const INSTITUTEGPT_LEARNING_FORMATS = freeze([
  'lesson', 'module', 'course', 'programme', 'microlearning', 'cohort', 'live',
  'self_paced', 'hybrid', 'tutoring', 'mentoring', 'coaching', 'lab',
  'simulation', 'project', 'fieldwork', 'apprenticeship', 'internship',
  'workplace', 'research', 'workshop', 'community', 'assessment',
]);

export const INSTITUTEGPT_PROVIDER_TYPES = freeze([
  'institute_native', 'school', 'university', 'tvet', 'professional_body',
  'employer', 'government', 'nonprofit', 'technology_provider',
  'ai_provider', 'open_education_provider', 'marketplace_provider',
  'independent_instructor', 'community_provider', 'international_provider',
]);

export const INSTITUTEGPT_LEARNER_TYPES = freeze([
  'child', 'student', 'adult', 'professional', 'researcher', 'educator',
  'job_seeker', 'entrepreneur', 'organization', 'institution', 'government',
  'ai', 'ai_agent',
]);

export const INSTITUTEGPT_CREDENTIAL_TYPES = freeze([
  'participation', 'completion', 'open_badge', 'microcredential', 'certificate',
  'professional_certificate', 'diploma', 'degree_reference', 'qualification',
  'professional_certification', 'regulated_authorization', 'cpd_recognition',
]);

export const INSTITUTEGPT_SKILL_STATES = freeze([
  'self_declared', 'learning', 'practiced', 'assessed', 'demonstrated',
  'externally_verified', 'expired', 'superseded',
]);

export const INSTITUTEGPT_CAPABILITY_GROUPS = freeze([
  'learning', 'courses_programmes', 'learning_paths', 'skills_competencies',
  'labs_practice_projects', 'cpd_professional_learning',
  'badges_certificates_credentials', 'learning_wallet', 'skills_passport',
  'pathway_builder', 'education_marketplace', 'provider_integrations',
]);

export function createLearningExperience({
  id,
  title,
  description = null,
  formats = [],
  learnerTypes = [],
  outcomes = [],
  prerequisites = [],
  evidenceRequirements = [],
  providerId = null,
  version = '1.0.0',
} = {}) {
  return freeze({
    type: 'learning_experience',
    id: requireId(id),
    title: requireId(title, 'title'),
    description: optionalText(description),
    formats: freezeArray(formats.map((value) => enumValue(value, INSTITUTEGPT_LEARNING_FORMATS, 'format'))),
    learnerTypes: freezeArray(learnerTypes.map((value) => enumValue(value, INSTITUTEGPT_LEARNER_TYPES, 'learnerType'))),
    outcomes: freezeArray(outcomes),
    prerequisites: freezeArray(prerequisites),
    evidenceRequirements: freezeArray(evidenceRequirements),
    providerId: optionalText(providerId),
    version: requireId(version, 'version'),
  });
}

export function createLearningPath({
  id,
  title,
  description = null,
  learnerType = null,
  goal = null,
  stage = null,
  experiences = [],
  skills = [],
  competencies = [],
  labs = [],
  projects = [],
  assessments = [],
  credentialOutcomes = [],
  opportunityTargets = [],
  prerequisites = [],
  renewalPaths = [],
  source = 'institute_native',
  version = '1.0.0',
} = {}) {
  return freeze({
    type: 'learning_path',
    id: requireId(id),
    title: requireId(title, 'title'),
    description: optionalText(description),
    learnerType: enumValue(learnerType, INSTITUTEGPT_LEARNER_TYPES, 'learnerType'),
    goal: optionalText(goal),
    stage: enumValue(stage, INSTITUTEGPT_LEARNING_STAGES, 'stage'),
    experiences: freezeArray(experiences),
    skills: freezeArray(skills),
    competencies: freezeArray(competencies),
    labs: freezeArray(labs),
    projects: freezeArray(projects),
    assessments: freezeArray(assessments),
    credentialOutcomes: freezeArray(credentialOutcomes),
    opportunityTargets: freezeArray(opportunityTargets),
    prerequisites: freezeArray(prerequisites),
    renewalPaths: freezeArray(renewalPaths),
    source: requireId(source, 'source'),
    version: requireId(version, 'version'),
  });
}

export function createLabDefinition({
  id,
  title,
  description = null,
  type,
  environment,
  prerequisites = [],
  inputs = [],
  tasks = [],
  evidenceOutputs = [],
  assessmentMode = null,
  providerId = null,
} = {}) {
  return freeze({
    type: 'lab_definition',
    id: requireId(id),
    title: requireId(title, 'title'),
    description: optionalText(description),
    labType: requireId(type, 'type'),
    environment: requireId(environment, 'environment'),
    prerequisites: freezeArray(prerequisites),
    inputs: freezeArray(inputs),
    tasks: freezeArray(tasks),
    evidenceOutputs: freezeArray(evidenceOutputs),
    assessmentMode: optionalText(assessmentMode),
    providerId: optionalText(providerId),
  });
}

function normalizeSkillEntry(entry) {
  if (!entry || typeof entry !== 'object') throw new Error('skill entry must be an object');
  const skill = requireId(entry.skill, 'skill');
  const state = enumValue(entry.state, INSTITUTEGPT_SKILL_STATES, 'skill state') ?? 'self_declared';
  return freeze({ skill, state, evidence: freezeArray(entry.evidence ?? []), source: optionalText(entry.source) });
}

export function createSkillsPassport({
  id,
  subjectId,
  skills = [],
  frameworks = [],
  experienceReferences = [],
  generatedAt = null,
} = {}) {
  return freeze({
    type: 'skills_passport',
    id: requireId(id),
    subjectId: requireId(subjectId, 'subjectId'),
    skills: freezeArray(skills.map(normalizeSkillEntry)),
    frameworks: freezeArray(frameworks),
    experienceReferences: freezeArray(experienceReferences),
    generatedAt: optionalText(generatedAt),
  });
}

function normalizeAchievement(entry) {
  if (!entry || typeof entry !== 'object') throw new Error('achievement must be an object');
  return freeze({
    type: enumValue(entry.type, INSTITUTEGPT_CREDENTIAL_TYPES, 'credential type') ?? 'completion',
    id: requireId(entry.id, 'achievement id'),
    issuer: requireId(entry.issuer, 'issuer'),
    verification: optionalText(entry.verification),
  });
}

export function createLearningWallet({
  id,
  subjectId,
  achievements = [],
  learningRecords = [],
  evidence = [],
  portableFormat = 'credential_agnostic',
} = {}) {
  return freeze({
    type: 'learning_wallet',
    id: requireId(id),
    subjectId: requireId(subjectId, 'subjectId'),
    achievements: freezeArray(achievements.map(normalizeAchievement)),
    learningRecords: freezeArray(learningRecords),
    evidence: freezeArray(evidence),
    portableFormat: requireId(portableFormat, 'portableFormat'),
  });
}

export function createCpdActivity({
  id,
  title,
  providerId,
  competencies = [],
  learningOutcomes = [],
  evidenceRequirements = [],
  hours = null,
  credits = null,
  frameworkId = null,
  expiry = null,
  mandatory = false,
} = {}) {
  return freeze({
    type: 'cpd_activity',
    id: requireId(id),
    title: requireId(title, 'title'),
    providerId: requireId(providerId, 'providerId'),
    competencies: freezeArray(competencies),
    learningOutcomes: freezeArray(learningOutcomes),
    evidenceRequirements: freezeArray(evidenceRequirements),
    hours: hours == null ? null : Number(hours),
    credits: credits == null ? null : Number(credits),
    frameworkId: optionalText(frameworkId),
    expiry: optionalText(expiry),
    mandatory: Boolean(mandatory),
  });
}

export function createProviderAdapterProfile({
  providerKey,
  category,
  integrationModes = [],
  capabilities = [],
  authorityModel = 'external_provider',
  ageConstraints = null,
  standards = [],
} = {}) {
  return freeze({
    type: 'institutegpt_provider_adapter',
    providerKey: requireId(providerKey, 'providerKey'),
    category: enumValue(category, INSTITUTEGPT_PROVIDER_TYPES, 'category') ?? category,
    integrationModes: freezeArray(integrationModes),
    capabilities: freezeArray(capabilities),
    authorityModel: requireId(authorityModel, 'authorityModel'),
    ageConstraints: ageConstraints == null ? null : freeze({ ...ageConstraints }),
    standards: freezeArray(standards),
  });
}
