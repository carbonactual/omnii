import fs from 'node:fs';

const path = 'data/canonical/omnii-control-plane-registry.json';
const doc = JSON.parse(fs.readFileSync(path, 'utf8'));
const errors = [];
const required = new Set(doc.required_fields ?? []);
const promotionStates = new Set(doc.promotion_ladder ?? []);
const authorityClasses = new Set(doc.authority_precedence ?? []);

if (doc.registry !== 'omnii-control-plane') errors.push('registry must be omnii-control-plane');
if (doc.status !== 'canonical-seed') errors.push('status must be canonical-seed');
if (!doc.authority) errors.push('authority is required');
if (!Array.isArray(doc.promotion_ladder) || doc.promotion_ladder.length < 5) errors.push('promotion_ladder is incomplete');
if (!Array.isArray(doc.authority_precedence) || doc.authority_precedence.length < 5) errors.push('authority_precedence is incomplete');
if (required.size === 0) errors.push('required_fields cannot be empty');

const requiredControls = [
  'omnii.control.registry',
  'omnii.control.authority-gate',
  'omnii.control.workflow-reliability',
  'omnii.control.evidence-actual',
  'omnii.control.contradiction-resolution',
  'omnii.control.external-boundary',
  'omnii.control.agent-governance',
  'omnii.control.observability',
  'omnii.control.drift-detection',
  'omnii.control.security-posture',
  'omnii.control.repository-estate',
  'omnii.control.runtime-integration',
  'omnii.control.verification-evidence',
  'omnii.control.human-boundary',
];

const ids = new Set();
const validStatuses = new Set(['specified', 'implemented', 'tested', 'conformant', 'staged', 'verified', 'production', 'deprecated', 'retired']);

for (const [index, entry] of (doc.control_domains ?? []).entries()) {
  for (const field of required) {
    if (entry[field] === undefined || entry[field] === null || entry[field] === '') {
      errors.push(`control_domains[${index}] missing ${field}`);
    }
  }

  if (entry.canonical_id && ids.has(entry.canonical_id)) {
    errors.push(`duplicate canonical_id: ${entry.canonical_id}`);
  }
  if (entry.canonical_id) ids.add(entry.canonical_id);

  if (entry.authority_class && !authorityClasses.has(entry.authority_class)) {
    errors.push(`${entry.canonical_id}: authority_class is not declared in authority_precedence`);
  }
  if (entry.conformance_status && !validStatuses.has(entry.conformance_status)) {
    errors.push(`${entry.canonical_id}: invalid conformance_status ${entry.conformance_status}`);
  }
  if (entry.lifecycle && !promotionStates.has(entry.lifecycle)) {
    errors.push(`${entry.canonical_id}: lifecycle is not declared in promotion_ladder`);
  }
}

for (const id of requiredControls) {
  if (!ids.has(id)) errors.push(`missing required canonical control: ${id}`);
}

if (errors.length) {
  console.error('CONTROL_PLANE_CONFORMANCE_FAILED');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`CONTROL_PLANE_CONFORMANCE_OK entries=${doc.control_domains.length}`);
