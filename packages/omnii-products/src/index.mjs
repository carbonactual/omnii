function requiredString(value, name) {
  if (typeof value !== 'string' || value.trim().length === 0) throw new Error(`${name} is required`);
  return value.trim();
}

export function defineProductAdapter(input) {
  requiredString(input?.productKey, 'productKey');
  requiredString(input?.productVersion, 'productVersion');
  if (!Array.isArray(input.capabilities)) throw new Error('capabilities must be an array');
  if (!Array.isArray(input.domains)) throw new Error('domains must be an array');
  if (!Array.isArray(input.sourceLineage) || input.sourceLineage.length === 0) throw new Error('sourceLineage is required');
  return {
    productKey: input.productKey,
    productVersion: input.productVersion,
    capabilities: Object.freeze([...input.capabilities]),
    domains: Object.freeze([...input.domains]),
    hapiWorldCrossing: input.hapiWorldCrossing ?? null,
    sourceLineage: Object.freeze([...input.sourceLineage])
  };
}

export function isImplementedProduct(input) {
  return input?.status === 'conforming' && input?.implementationEvidence === true;
}
