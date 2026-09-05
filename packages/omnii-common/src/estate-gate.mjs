export function validateEstateBoundary(boundary) {
  const errors = [];
  if (!boundary || typeof boundary !== 'object') return { valid: false, errors: ['boundary-required'] };
  if (!boundary.product) errors.push('product-required');
  if (!boundary.class) errors.push('class-required');
  if (boundary.definesConstitution === true) errors.push('product-cannot-define-constitution');
  if (boundary.issuesAuthority === true) errors.push('product-cannot-issue-authority');
  if (!boundary.consequential_gate) errors.push('consequential-gate-required');
  return { valid: errors.length === 0, errors };
}
