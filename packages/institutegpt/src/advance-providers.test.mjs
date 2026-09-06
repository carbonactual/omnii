import assert from 'node:assert/strict';
import { ADVANCE_PROVIDER_PROFILES, getAdvanceProviderProfile, listAdvanceProviders } from './advance-providers.mjs';

const requiredProviders = [
  'GITHUB_EDUCATION', 'OPENAI_EDUCATION', 'ANTHROPIC_EDUCATION', 'MICROSOFT_LEARN',
  'AWS_EDUCATE', 'NVIDIA_DLI', 'GOOGLE_LEARNING', 'IBM_SKILLSBUILD',
  'CISCO_NETWORKING_ACADEMY', 'SALESFORCE_TRAILHEAD', 'COURSERA', 'UDEMY',
  'ALISON', 'COURSIV', 'EDX', 'FUTURELEARN', 'LINKEDIN_LEARNING', 'KHAN_ACADEMY',
  'DATACAMP', 'PLURALSIGHT', 'CODECADEMY', 'FREECODECAMP', 'PROFESSIONAL_BODY',
  'EMPLOYER_ACADEMY',
];

assert.ok(ADVANCE_PROVIDER_PROFILES.length >= requiredProviders.length);
for (const key of requiredProviders) {
  const provider = getAdvanceProviderProfile(key);
  assert.ok(provider, `${key} profile exists`);
  assert.ok(provider.category);
  assert.ok(provider.integrationModes.length > 0);
  assert.ok(provider.capabilities.length > 0);
}

assert.equal(getAdvanceProviderProfile('missing'), null);
assert.equal(getAdvanceProviderProfile('GITHUB_EDUCATION').ageConstraints.minimumAge, 13);
assert.ok(getAdvanceProviderProfile('KHAN_ACADEMY').ageConstraints.childMode);
assert.ok(getAdvanceProviderProfile('COURSIV').capabilities.includes('ai_mastery'));
assert.ok(getAdvanceProviderProfile('SALESFORCE_TRAILHEAD').capabilities.includes('superbadges'));
assert.ok(getAdvanceProviderProfile('NVIDIA_DLI').capabilities.includes('hands_on_labs'));
assert.ok(getAdvanceProviderProfile('MICROSOFT_LEARN').capabilities.includes('certifications'));
assert.ok(getAdvanceProviderProfile('EDX').capabilities.includes('professional_certificates'));
assert.equal(listAdvanceProviders().length, ADVANCE_PROVIDER_PROFILES.length);

console.log(`InstituteGPT Advance providers: ${ADVANCE_PROVIDER_PROFILES.length} profiles validated`);
