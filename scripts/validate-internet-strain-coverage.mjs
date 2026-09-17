import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const requiredFiles = [
  'docs/canonical/OMNII_INTERNET_STRAIN_COVERAGE_LAW.md',
  'docs/architecture/OMNII_INTERNET_STRAIN_CATALOG.md',
  'docs/architecture/OMNII_INTERNET_STRAIN_CONFORMANCE_MATRIX.md',
  'docs/schema/OMNII_WATCH_CHECK_CONTRACT.md',
  'schemas/omnii-watch-check.schema.json'
];

const requiredDimensions = [
  'Entity', 'Identity', 'Authority', 'Relationship', 'Capability', 'Intent',
  'Policy', 'State', 'Event', 'Evidence', 'Provenance', 'Dependency',
  'Continuity', 'Portability', 'Trust', 'Settlement', 'Liability', 'Lifecycle'
];

const requiredDomains = [
  'Identity and Account Strain',
  'Authority, Permission, and Delegation Strain',
  'Subscription, Membership, License, and Recurring Obligation Strain',
  'Update, Patch, Version, and Change Strain',
  'Security and Exploitation Strain',
  'AI and Agent Strain',
  'Advertising and Attention-Economy Strain',
  'Payments, Billing, and Financial-Interaction Strain',
  'Portability, Switching, and Lock-In Strain',
  'Accessibility and Human-Usability Strain',
  'Recovery, Succession, Inheritance, and Exit Strain',
  'Temporal and Lifecycle Strain'
];

function read(relativePath) {
  const file = path.join(root, relativePath);
  if (!fs.existsSync(file)) throw new Error(`missing required file: ${relativePath}`);
  return fs.readFileSync(file, 'utf8');
}

const law = read(requiredFiles[0]);
const catalog = read(requiredFiles[1]);
const matrix = read(requiredFiles[2]);
const watchSchema = JSON.parse(read(requiredFiles[4]));

for (const dimension of requiredDimensions) {
  if (!law.includes(dimension)) throw new Error(`missing canonical dimension: ${dimension}`);
}

for (const domain of requiredDomains) {
  if (!law.includes(domain)) throw new Error(`missing strain domain: ${domain}`);
}

if (!law.includes('Internet strain is a coverage concept, not a new primitive.')) {
  throw new Error('coverage must explicitly remain non-primitive');
}

for (const phrase of [
  'subscriptions', 'renewals', 'advertising', 'updates', 'accessibility',
  'portability', 'recovery', 'agent', 'payments', 'DNS', 'APIs'
]) {
  if (!catalog.toLowerCase().includes(phrase.toLowerCase())) {
    throw new Error(`catalog missing coverage phrase: ${phrase}`);
  }
}

for (const field of ['id', 'subject', 'condition', 'trigger', 'severity', 'authority', 'evidence', 'response']) {
  if (!watchSchema.properties?.[field]) throw new Error(`watch schema missing field: ${field}`);
}

if (watchSchema.additionalProperties !== true) {
  throw new Error('watch schema must preserve extension/provider fields');
}

if (!matrix.includes('Conformance rule')) throw new Error('conformance matrix rule missing');

console.log(`internet strain coverage validated: ${requiredDomains.length} core domains, ${requiredDimensions.length} canonical dimensions`);
