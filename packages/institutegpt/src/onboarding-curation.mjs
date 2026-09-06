const freeze = (value) => Object.freeze(value);
const freezeArray = (value = []) => freeze([...value]);
const text = (value) => value == null ? null : String(value).trim();

export const ONBOARDING_CURRICULUM_DIMENSIONS = freeze([
  'interests', 'goals', 'education_stage', 'skills', 'experience',
  'career_direction', 'preferred_subjects', 'preferred_formats', 'pace',
  'time_available', 'language', 'accessibility', 'device_connectivity',
  'location_context', 'budget', 'provider_preferences', 'credential_goals',
  'professional_body', 'cpd_requirements', 'learning_style_preferences',
  'support_preferences', 'lab_preferences', 'project_preferences',
  'assessment_preferences', 'privacy_and_safeguarding',
]);

export function createEducationOnboardingProfile({
  subjectId,
  learnerType = null,
  educationStage = null,
  interests = [],
  goals = [],
  skills = [],
  experience = [],
  careerDirection = [],
  preferredSubjects = [],
  preferredFormats = [],
  pace = null,
  timeAvailable = null,
  language = null,
  accessibility = [],
  deviceConnectivity = null,
  locationContext = null,
  budget = null,
  providerPreferences = [],
  credentialGoals = [],
  professionalBody = null,
  cpdRequirements = [],
  learningStylePreferences = [],
  supportPreferences = [],
  labPreferences = [],
  projectPreferences = [],
  assessmentPreferences = [],
  privacyAndSafeguarding = {},
} = {}) {
  if (!String(subjectId ?? '').trim()) throw new Error('subjectId is required');
  return freeze({
    type: 'education_onboarding_profile',
    subjectId: String(subjectId).trim(),
    learnerType: text(learnerType),
    educationStage: text(educationStage),
    interests: freezeArray(interests),
    goals: freezeArray(goals),
    skills: freezeArray(skills),
    experience: freezeArray(experience),
    careerDirection: freezeArray(careerDirection),
    preferredSubjects: freezeArray(preferredSubjects),
    preferredFormats: freezeArray(preferredFormats),
    pace: text(pace),
    timeAvailable: text(timeAvailable),
    language: text(language),
    accessibility: freezeArray(accessibility),
    deviceConnectivity: text(deviceConnectivity),
    locationContext: text(locationContext),
    budget: text(budget),
    providerPreferences: freezeArray(providerPreferences),
    credentialGoals: freezeArray(credentialGoals),
    professionalBody: text(professionalBody),
    cpdRequirements: freezeArray(cpdRequirements),
    learningStylePreferences: freezeArray(learningStylePreferences),
    supportPreferences: freezeArray(supportPreferences),
    labPreferences: freezeArray(labPreferences),
    projectPreferences: freezeArray(projectPreferences),
    assessmentPreferences: freezeArray(assessmentPreferences),
    privacyAndSafeguarding: freeze({ ...privacyAndSafeguarding }),
  });
}

export function curateInstituteGPTLearning(profile, catalog = []) {
  if (!profile || profile.type !== 'education_onboarding_profile') {
    throw new Error('education onboarding profile is required');
  }
  const preferences = new Set([
    ...profile.interests,
    ...profile.goals,
    ...profile.skills,
    ...profile.preferredSubjects,
    ...profile.careerDirection,
    ...profile.providerPreferences,
    ...profile.credentialGoals,
  ].map((value) => String(value).trim().toLowerCase()).filter(Boolean));

  const recommendations = catalog.map((item) => {
    const tags = [
      ...(item.tags ?? []),
      ...(item.skills ?? []),
      ...(item.subjects ?? []),
      ...(item.goals ?? []),
    ].map((value) => String(value).trim().toLowerCase());
    const matches = tags.filter((tag) => preferences.has(tag));
    return {
      ...item,
      curationScore: matches.length,
      matchedPreferences: [...new Set(matches)],
    };
  }).sort((a, b) => b.curationScore - a.curationScore);

  return freeze({
    type: 'institutegpt_learning_curation',
    subjectId: profile.subjectId,
    learnerType: profile.learnerType,
    educationStage: profile.educationStage,
    recommendedFormats: freezeArray(profile.preferredFormats),
    recommendedProviders: freezeArray(profile.providerPreferences),
    recommendedCredentials: freezeArray(profile.credentialGoals),
    recommendations: freezeArray(recommendations),
    basis: freezeArray([
      'interests', 'goals', 'stage', 'skills', 'career_direction',
      'format', 'time', 'language', 'accessibility', 'budget', 'credential_goals',
    ]),
    humanReviewRequired: true,
  });
}
