import assert from 'node:assert/strict';
import { INSTITUTEGPT_PROVIDER_PROFILES, getInstituteGPTProviderProfile, listInstituteGPTProviders } from './institutegpt-providers.mjs';

const requiredProviders = [
  'GITHUB_EDUCATION', 'OPENAI_EDUCATION', 'ANTHROPIC_EDUCATION', 'MICROSOFT_LEARN',
  'AWS_EDUCATE', 'NVIDIA_DLI', 'GOOGLE_LEARNING', 'IBM_SKILLSBUILD',
  'CISCO_NETWORKING_ACADEMY', 'SALESFORCE_TRAILHEAD', 'COURSERA', 'UDEMY',
  'ALISON', 'COURSIV', 'EDX', 'FUTURELEARN', 'LINKEDIN_LEARNING', 'KHAN_ACADEMY',
  'DATACAMP', 'PLURALSIGHT', 'CODECADEMY', 'FREECODECAMP', 'PROFESSIONAL_BODY',
  'EMPLOYER_ACADEMY',
];

assert.ok(INSTITUTEGPT_PROVIDER_PROFILES.length >= requiredProviders.length);
for (const key of requiredProviders) {
  const provider = getInstituteGPTProviderProfile(key);
  assert.ok(provider, `${key} profile exists`);
  assert.ok(provider.category);
  assert.ok(provider.integrationModes.length > 0);
  assert.ok(provider.capabilities.length > 0);
}

assert.equal(getInstituteGPTProviderProfile('missing'), null);
assert.equal(getInstituteGPTProviderProfile('GITHUB_EDUCATION').ageConstraints.minimumAge, 13);
assert.ok(getInstituteGPTProviderProfile('KHAN_ACADEMY').ageConstraints.childMode);
assert.ok(getInstituteGPTProviderProfile('COURSIV').capabilities.includes('ai_mastery'));
assert.ok(getInstituteGPTProviderProfile('SALESFORCE_TRAILHEAD').capabilities.includes('superbadges'));
assert.ok(getInstituteGPTProviderProfile('NVIDIA_DLI').capabilities.includes('hands_on_labs'));
assert.ok(getInstituteGPTProviderProfile('MICROSOFT_LEARN').capabilities.includes('certifications'));
assert.ok(getInstituteGPTProviderProfile('EDX').capabilities.includes('professional_certificates'));
assert.equal(listInstituteGPTProviders().length, INSTITUTEGPT_PROVIDER_PROFILES.length);

console.log(`InstituteGPT provider adapters: ${INSTITUTEGPT_PROVIDER_PROFILES.length} profiles validated`);
