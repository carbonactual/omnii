import { readFileSync } from 'node:fs';

const path = new URL('../data/canonical/omnii-control-plane-registry.json', import.meta.url);
const registry = JSON.parse(readFileSync(path, 'utf8'));

const REQUIRED = new Set(registry.required_fields ?? []);
const PROMOTION = new Set(registry.promotion_ladder ?? []);
const AUTHORITY = new Set(registry.authority_precedence ?? []);
const errors = [];

if (registry.status !== 'canonical-seed') errors.push(`registry status must remain canonical-seed, got ${registry.status}`);
if (!registry.authority) errors.push('authority is required');
if (REQUIRED.size === 0) errors.push('required_fields cannot be empty');
if (PROMOTION.size < 3) errors.push('promotion_ladder is unexpectedly incomplete');
if (AUTHORITY.size < 3) errors.push('authority_precedence is unexpectedly incomplete');

const domains = registry.control_domains;
if (!Array.isArray(domains) || domains.length === 0) {
  errors.push('control_domains must contain at least one control');
}

const seen = new Set();
for (const control of domains ?? []) {
  for (const field of REQUIRED) {
    const value = control?.[field];
    if (typeof value !== 'string' || value.trim() === '') {
      errors.push(`${control?.canonical_id ?? '<unknown>'}: missing required field ${field}`);
    }
  }

  if (control?.canonical_id && seen.has(control.canonical_id)) {
    errors.push(`duplicate canonical_id: ${control.canonical_id}`);
  }
  if (control?.canonical_id) seen.add(control.canonical_id);

  if (control?.conformance_status && !new Set(['specified', 'implemented', 'tested', 'conformant', 'staged', 'verified', 'production', 'deprecated', 'retired']).has(control.conformance_status)) {
    errors.push(`${control.canonical_id}: invalid conformance_status ${control.conformance_status}`);
  }

  if (control?.authority_class && !AUTHORITY.has(control.authority_class)) {
    errors.push(`${control.canonical_id}: authority_class ${control.authority_class} is not in authority_precedence`);
  }
}

const ids = new Set((domains ?? []).map((item) => item.canonical_id).filter(Boolean));
for (const requiredId of [
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
]) {
  if (!ids.has(requiredId)) errors.push(`missing required canonical control: ${requiredId}`);
}

if (errors.length) {
  console.error(JSON.stringify({ status: 'invalid', errors }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  status: 'valid',
  version: registry.version,
  controlCount: domains.length,
  requiredFieldCount: REQUIRED.size,
  promotionStates: registry.promotion_ladder,
  authorityPrecedence: registry.authority_precedence,
}, null, 2));
