import { createProviderAdapterProfile } from './advance-product.mjs';

const profile = (providerKey, category, capabilities, integrationModes, extra = {}) =>
  createProviderAdapterProfile({
    providerKey,
    category,
    capabilities,
    integrationModes,
    ...extra,
  });

export const ADVANCE_PROVIDER_PROFILES = Object.freeze([
  profile('GITHUB_EDUCATION', 'technology_provider', ['student_resources', 'developer_learning', 'labs', 'projects', 'achievements'], ['catalog', 'deep_link', 'achievement_reference'], {
    authorityModel: 'external_provider',
    ageConstraints: { minimumAge: 13, source: 'provider_policy_reference' },
  }),
  profile('OPENAI_EDUCATION', 'ai_provider', ['ai_learning', 'courses', 'educator_resources', 'student_resources', 'career_learning'], ['catalog', 'deep_link', 'achievement_reference'], {
    authorityModel: 'external_provider',
  }),
  profile('ANTHROPIC_EDUCATION', 'ai_provider', ['ai_learning', 'student_resources', 'educator_resources', 'coding_learning', 'institutional_learning'], ['catalog', 'deep_link'], {
    authorityModel: 'external_provider',
  }),
  profile('MICROSOFT_LEARN', 'technology_provider', ['courses', 'learning_paths', 'labs', 'practice_assessments', 'certifications'], ['catalog', 'deep_link', 'progress_reference', 'credential_reference'], {
    authorityModel: 'external_issuer',
  }),
  profile('AWS_EDUCATE', 'technology_provider', ['courses', 'learning_paths', 'cloud_labs', 'badges', 'career_readiness'], ['catalog', 'deep_link', 'achievement_reference'], {
    authorityModel: 'external_provider',
  }),
  profile('NVIDIA_DLI', 'technology_provider', ['courses', 'learning_paths', 'hands_on_labs', 'workshops', 'certifications'], ['catalog', 'deep_link', 'credential_reference'], {
    authorityModel: 'external_issuer',
  }),
  profile('GOOGLE_LEARNING', 'technology_provider', ['courses', 'career_learning', 'projects', 'certifications'], ['catalog', 'deep_link', 'credential_reference'], {
    authorityModel: 'external_provider',
  }),
  profile('IBM_SKILLSBUILD', 'technology_provider', ['courses', 'skills', 'projects', 'badges', 'career_learning'], ['catalog', 'deep_link', 'achievement_reference'], {
    authorityModel: 'external_provider',
  }),
  profile('CISCO_NETWORKING_ACADEMY', 'technology_provider', ['courses', 'labs', 'skills', 'career_learning'], ['catalog', 'deep_link', 'achievement_reference'], {
    authorityModel: 'external_provider',
  }),
  profile('SALESFORCE_TRAILHEAD', 'technology_provider', ['modules', 'trails', 'badges', 'superbadges', 'certifications'], ['catalog', 'deep_link', 'achievement_reference', 'credential_reference'], {
    authorityModel: 'external_issuer',
  }),
  profile('COURSERA', 'marketplace_provider', ['courses', 'specializations', 'professional_certificates', 'degrees', 'projects'], ['catalog', 'deep_link', 'credential_reference'], {
    authorityModel: 'external_provider',
  }),
  profile('UDEMY', 'marketplace_provider', ['courses', 'learning_paths', 'assessments', 'labs', 'certificates'], ['catalog', 'deep_link', 'achievement_reference'], {
    authorityModel: 'external_provider',
  }),
  profile('ALISON', 'marketplace_provider', ['courses', 'certificates', 'diplomas', 'career_learning'], ['catalog', 'deep_link', 'credential_reference'], {
    authorityModel: 'external_provider',
  }),
  profile('COURSIV', 'marketplace_provider', ['ai_mastery', 'hands_on_guides', 'industry_use_cases', 'completion_certificates'], ['catalog', 'deep_link', 'credential_reference'], {
    authorityModel: 'external_provider',
  }),
  profile('EDX', 'marketplace_provider', ['courses', 'professional_certificates', 'microcredentials', 'degrees', 'projects'], ['catalog', 'deep_link', 'credential_reference'], {
    authorityModel: 'external_provider',
  }),
  profile('FUTURELEARN', 'marketplace_provider', ['courses', 'microcredentials', 'programmes', 'degrees'], ['catalog', 'deep_link', 'credential_reference'], {
    authorityModel: 'external_provider',
  }),
  profile('LINKEDIN_LEARNING', 'marketplace_provider', ['courses', 'role_guides', 'skill_evaluations', 'learning_paths', 'career_learning'], ['catalog', 'deep_link', 'progress_reference'], {
    authorityModel: 'external_provider',
  }),
  profile('KHAN_ACADEMY', 'open_education_provider', ['child_learning', 'school_learning', 'practice', 'teacher_resources'], ['catalog', 'deep_link', 'progress_reference'], {
    authorityModel: 'external_provider',
    ageConstraints: { childMode: true },
  }),
  profile('DATACAMP', 'marketplace_provider', ['courses', 'tracks', 'projects', 'practice', 'assessments'], ['catalog', 'deep_link', 'achievement_reference'], {
    authorityModel: 'external_provider',
  }),
  profile('PLURALSIGHT', 'marketplace_provider', ['courses', 'paths', 'skill_assessments', 'labs', 'certification_prep'], ['catalog', 'deep_link', 'assessment_reference'], {
    authorityModel: 'external_provider',
  }),
  profile('CODECADEMY', 'marketplace_provider', ['coding_courses', 'career_paths', 'projects', 'practice'], ['catalog', 'deep_link', 'achievement_reference'], {
    authorityModel: 'external_provider',
  }),
  profile('FREECODECAMP', 'open_education_provider', ['coding_courses', 'projects', 'certifications', 'practice'], ['catalog', 'deep_link', 'credential_reference'], {
    authorityModel: 'external_provider',
  }),
  profile('PROFESSIONAL_BODY', 'professional_body', ['professional_learning', 'cpd', 'competency_frameworks', 'certification', 'recertification'], ['catalog', 'credential_reference', 'verification'], {
    authorityModel: 'external_issuer',
  }),
  profile('EMPLOYER_ACADEMY', 'employer', ['onboarding', 'role_learning', 'mandatory_training', 'skills', 'professional_development'], ['catalog', 'progress_reference', 'achievement_reference'], {
    authorityModel: 'employer_recognition',
  }),
]);

export function getAdvanceProviderProfile(providerKey) {
  const key = String(providerKey ?? '').trim();
  return ADVANCE_PROVIDER_PROFILES.find((provider) => provider.providerKey === key) ?? null;
}

export function listAdvanceProviders() {
  return ADVANCE_PROVIDER_PROFILES.map((provider) => ({
    ...provider,
    integrationModes: [...provider.integrationModes],
    capabilities: [...provider.capabilities],
    standards: [...provider.standards],
  }));
}
