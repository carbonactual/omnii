const REQUIRED_FIELDS = Object.freeze(['productKey', 'capabilities', 'sourceLineage']);

export function defineProductAdapter({
  productKey,
  productVersion = '1',
  capabilities = [],
  domains = [],
  sourceLineage = [],
  implementationEvidence = false,
  ...extension
} = {}) {
  if (!productKey) throw new Error('productKey is required');
  if (!Array.isArray(capabilities)) throw new Error('capabilities must be an array');
  if (!Array.isArray(sourceLineage) || sourceLineage.length === 0) {
    throw new Error('sourceLineage is required');
  }
  if (!Array.isArray(domains)) throw new Error('domains must be an array');

  const adapter = {
    productKey,
    productVersion: String(productVersion),
    capabilities: [...capabilities],
    domains: [...domains],
    sourceLineage: [...sourceLineage],
    implementationEvidence: Boolean(implementationEvidence),
    ...extension,
  };

  for (const field of REQUIRED_FIELDS) {
    if (adapter[field] === undefined || adapter[field] === null) {
      throw new Error(`${field} is required`);
    }
  }

  return Object.freeze(adapter);
}

export function isImplementedProduct(product = {}) {
  return product.status === 'conforming' && product.implementationEvidence === true;
}
