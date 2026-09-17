import assert from 'node:assert/strict';
import fs from 'node:fs';

const law = fs.readFileSync('docs/canonical/OMNII_INTERNET_STRAIN_COVERAGE_LAW.md', 'utf8');
const catalog = fs.readFileSync('docs/architecture/OMNII_INTERNET_STRAIN_CATALOG.md', 'utf8');
const matrix = fs.readFileSync('docs/architecture/OMNII_INTERNET_STRAIN_CONFORMANCE_MATRIX.md', 'utf8');

const dimensions = [
  'Entity', 'Identity', 'Authority', 'Relationship', 'Capability', 'Intent',
  'Policy', 'State', 'Event', 'Evidence', 'Provenance', 'Dependency',
  'Continuity', 'Portability', 'Trust', 'Settlement', 'Liability', 'Lifecycle'
];

for (const dimension of dimensions) {
  assert.ok(law.includes(dimension), `missing canonical dimension: ${dimension}`);
}

for (const domain of [
  'Identity and Account',
  'Subscription, Membership',
  'Update, Patch',
  'Security and Exploitation',
  'AI and Agent',
  'Advertising and Attention',
  'Payments, Billing',
  'Portability, Switching',
  'Accessibility',
  'Recovery, Succession'
]) {
  assert.ok(law.includes(domain), `missing domain: ${domain}`);
}

assert.match(law, /Internet strain is a coverage concept, not a new primitive\./);
assert.match(catalog, /Subscriptions & recurring obligations/);
assert.match(catalog, /Ads remain attributable interactions|Advertising/);
assert.match(matrix, /Conformance rule/);

console.log('internet strain coverage invariants passed');
