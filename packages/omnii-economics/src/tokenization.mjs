export function classifyTokenization({ underlyingRef, representation = 'unit', eligible = false, rights = [] } = {}) {
  if (!underlyingRef) throw new Error('underlyingRef is required');
  return {
    kind: 'tokenization',
    underlyingRef,
    representation,
    rights: [...rights],
    status: eligible ? 'eligible' : 'not-eligible',
    createsOwnership: false,
    createsAuthority: false,
  };
}
