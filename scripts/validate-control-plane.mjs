import fs from 'node:fs';

const path = 'data/canonical/omnii-control-plane-registry.json';
const doc = JSON.parse(fs.readFileSync(path, 'utf8'));
const canonPath = 'CANON.md';

const required = new Set(doc.required_fields ?? []);
const errors = [];

if (doc.registry !== 'omnii-control-plane') errors.push('registry must be omnii-control-plane');
if (doc.status !== 'canonical-seed') errors.push('status must be canonical-seed');
if (!Array.isArray(doc.promotion_ladder) || doc.promotion_ladder.length < 5) errors.push('promotion_ladder is incomplete');
if (!Array.isArray(doc.authority_precedence) || doc.authority_precedence.length < 5) errors.push('authority_precedence is incomplete');

for (const [index, entry] of (doc.control_domains ?? []).entries()) {
  for (const field of required) {
    if (entry[field] === undefined || entry[field] === null || entry[field] === '') {
      errors.push(`control_domains[${index}] missing ${field}`);
    }
  }
}

const ids = new Set();
for (const entry of doc.control_domains ?? []) {
  if (ids.has(entry.canonical_id)) errors.push(`duplicate canonical_id: ${entry.canonical_id}`);
  ids.add(entry.canonical_id);
}

if (!fs.existsSync(canonPath)) {
  errors.push('CANON.md is required at repository root');
} else {
  const canon = fs.readFileSync(canonPath, 'utf8');
  const requiredCanonTerms = [
    'Know Before Use',
    'Human Authority',
    'Single Canonical Object',
    'No Waste',
    'HAPi Bank',
    'Execution Law',
    'Contradictions and Change',
  ];
  for (const term of requiredCanonTerms) {
    if (!canon.includes(term)) errors.push(`CANON.md missing required section: ${term}`);
  }
}

if (errors.length) {
  console.error('CONTROL_PLANE_CONFORMANCE_FAILED');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`CONTROL_PLANE_CONFORMANCE_OK entries=${doc.control_domains.length}`);
