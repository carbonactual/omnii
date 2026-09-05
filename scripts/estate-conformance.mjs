import { readFileSync } from 'node:fs';

const FORBIDDEN = ['identity-authority','capability-authority','match-authorization','evidence-authority','token-ownership','plan-execution','product-constitution','provider-constitution'];

const map = JSON.parse(readFileSync(new URL('../config/omnii-product-capability-map.json', import.meta.url), 'utf8'));
const boundaryRegistry = JSON.parse(readFileSync(new URL('../data/canonical/product-boundary-registry.json', import.meta.url), 'utf8'));
const capabilityHarvest = JSON.parse(readFileSync(new URL('../data/canonical/agent-tooling-capability-harvest.json', import.meta.url), 'utf8'));
const tradeInventory = JSON.parse(readFileSync(new URL('../data/canonical/universal-trade-investment-inventory.json', import.meta.url), 'utf8'));
const sharedCapabilities = new Set(Object.values(map.products).flat());

export function validateEstateProduct(product) {
  const errors = [];
  if (!product?.product) errors.push('product is required');
  if (!Array.isArray(product?.capabilities)) errors.push('capabilities must be an array');
  if (product?.defines_constitution === true) errors.push('product cannot define constitution');
  if (product?.issues_authority === true) errors.push('product cannot issue authority');
  for (const capability of product?.capabilities ?? []) {
    if (!sharedCapabilities.has(capability)) errors.push(`unknown capability: ${capability}`);
  }
  return { valid: errors.length === 0, errors, forbiddenSemantics: [...FORBIDDEN] };
}

export function validateEstateMap() {
  const errors = [];

  for (const [product, capabilities] of Object.entries(map.products)) {
    if (!Array.isArray(capabilities)) errors.push(`${product}: capabilities must be an array`);
    for (const capability of capabilities ?? []) {
      if (!sharedCapabilities.has(capability)) errors.push(`${product}: unknown capability ${capability}`);
    }
  }

  const boundaryProducts = boundaryRegistry.products ?? {};
  for (const [product, boundary] of Object.entries(boundaryProducts)) {
    if (!boundary.class) errors.push(`${product}: boundary class is required`);
    if (!boundary.runtime) errors.push(`${product}: boundary runtime is required`);
    if (!boundary.consequential_gate) errors.push(`${product}: consequential_gate is required`);
  }

  if (boundaryRegistry.rules?.products_cannot_define_constitution !== true) errors.push('constitutional definition boundary is not enabled');
  if (boundaryRegistry.rules?.products_cannot_issue_authority !== true) errors.push('authority issuance boundary is not enabled');
  if (boundaryRegistry.rules?.capability_does_not_imply_authority !== true) errors.push('capability/authority boundary is not enabled');
  if (boundaryRegistry.rules?.evidence_does_not_imply_authority !== true) errors.push('evidence/authority boundary is not enabled');
  if (boundaryRegistry.rules?.match_does_not_imply_authorization !== true) errors.push('match/authorization boundary is not enabled');
  if (boundaryRegistry.rules?.plan_does_not_imply_execution !== true) errors.push('plan/execution boundary is not enabled');
  if (boundaryRegistry.rules?.tokenization_does_not_imply_ownership !== true) errors.push('tokenization/ownership boundary is not enabled');
  if (boundaryRegistry.rules?.atlas_is_not_operational_truth !== true) errors.push('Atlas truth boundary is not enabled');

  for (const item of capabilityHarvest.capability_harvest ?? []) {
    if (!item.capability) errors.push('capability harvest entry missing capability');
    if (!item.disposition) errors.push(`${item.capability}: disposition is required`);
    if (!item.target_package) errors.push(`${item.capability}: target_package is required`);
  }

  if (!Array.isArray(tradeInventory.trade) || tradeInventory.trade.length === 0) errors.push('trade inventory is empty');
  if (!Array.isArray(tradeInventory.investment) || tradeInventory.investment.length === 0) errors.push('investment inventory is empty');

  return {
    valid: errors.length === 0,
    errors,
    productCount: Object.keys(map.products).length,
    boundaryCount: Object.keys(boundaryProducts).length,
    sharedCapabilityCount: sharedCapabilities.size,
    capabilityHarvestCount: capabilityHarvest.capability_harvest?.length ?? 0,
    tradeClassCount: tradeInventory.trade?.length ?? 0,
    investmentClassCount: tradeInventory.investment?.length ?? 0,
    forbiddenSemantics: [...FORBIDDEN]
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const result = validateEstateMap();
  if (!result.valid) { console.error(JSON.stringify(result, null, 2)); process.exit(1); }
  console.log(JSON.stringify({ status: 'valid', ...result }, null, 2));
}
