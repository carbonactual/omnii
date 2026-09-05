export const FORBIDDEN_PRODUCT_REDEFINITIONS = Object.freeze([
  'identity-authority',
  'capability-authority',
  'match-authorization',
  'evidence-authority',
  'token-ownership',
  'plan-execution',
  'product-constitution',
  'provider-constitution'
]);

export function validateProductContract(contract, sharedCapabilityIds = []) {
  if (!contract || typeof contract !== 'object') return { valid: false, errors: ['contract is required'] };
  const errors = [];
  if (!contract.product) errors.push('product is required');
  if (!Array.isArray(contract.capabilities)) errors.push('capabilities must be an array');
  if (!contract.architectural_class) errors.push('architectural_class is required');
  if (contract.defines_constitution === true) errors.push('product cannot define constitution');
  if (contract.issues_authority === true) errors.push('product cannot issue authority');
  if (contract.capabilities?.some((id) => !sharedCapabilityIds.includes(id))) errors.push('unknown capability reference');
  return { valid: errors.length === 0, errors };
}

export function validateSourceDisposition(record) {
  if (!record || typeof record !== 'object') return { valid: false, errors: ['record is required'] };
  const errors = [];
  if (!record.source_repository) errors.push('source_repository is required');
  if (!record.source_path) errors.push('source_path is required');
  if (!record.disposition) errors.push('disposition is required');
  if (!['ABSORB', 'COMPOSE', 'ADAPT', 'REFERENCE', 'REJECT_SUPERSEDE'].includes(record.disposition)) errors.push('invalid disposition');
  if (!record.target) errors.push('target is required');
  return { valid: errors.length === 0, errors };
}
