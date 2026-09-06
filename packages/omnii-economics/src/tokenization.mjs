export const TRANSFORMATION_LAYERS = Object.freeze([
  'democratization',
  'decentralization',
  'decimalization',
  'fractionalization',
  'tokenization',
  'ledgers',
  'blockchain',
]);

export const TOKEN_CLASSES = Object.freeze([
  'unique',
  'fungible',
  'fractional',
  'decimalized',
  'dynamic',
  'composite',
  'credential',
  'attestation',
  'non-transferable',
  'access',
  'usage',
  'claim',
  'obligation',
  'liability',
  'reward',
  'governance',
  'reputation',
  'time',
  'capacity',
  'capability',
]);

export function classifyTokenization({
  underlyingRef,
  representation = 'unit',
  tokenClass = 'unique',
  eligible = false,
  mintRef = null,
  quantity = 1,
  decimals = 0,
  transferable = true,
  rights = [],
  metadata = {},
} = {}) {
  if (!underlyingRef) throw new Error('underlyingRef is required');
  if (!TOKEN_CLASSES.includes(tokenClass)) throw new Error(`unsupported tokenClass: ${tokenClass}`);
  if (!(Number(quantity) > 0)) throw new Error('quantity must be positive');
  if (!Number.isInteger(Number(decimals)) || Number(decimals) < 0) throw new Error('decimals must be a non-negative integer');
  return {
    id: `token:${crypto.randomUUID()}`,
    kind: 'tokenization',
    underlyingRef,
    mintRef,
    representation,
    tokenClass,
    quantity: Number(quantity),
    decimals: Number(decimals),
    transferable: Boolean(transferable),
    rights: Array.isArray(rights) ? [...rights] : [],
    status: eligible ? 'eligible' : 'not-eligible',
    createsOwnership: false,
    createsAuthority: false,
    metadata: { ...metadata },
  };
}
