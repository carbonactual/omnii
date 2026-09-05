export const PRODUCT_STATUS = Object.freeze(['conforming','specified','composed','reference']);

export function registerProduct(adapter, {status='specified', implementationEvidence=false} = {}) {
  if (!adapter?.productKey) throw new Error('adapter is required');
  if (!PRODUCT_STATUS.includes(status)) throw new Error('invalid product status');
  return Object.freeze({...adapter, status, implementationEvidence});
}
