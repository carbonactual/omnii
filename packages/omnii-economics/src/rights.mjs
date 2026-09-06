const RIGHT_KINDS = Object.freeze([
  'ownership',
  'custody',
  'possession',
  'control',
  'access',
  'use',
  'claim',
  'obligation',
  'liability',
  'authority',
]);

export { RIGHT_KINDS };

export function createRightsRecord({
  subjectRef,
  kind,
  holderRef = null,
  issuerRef = null,
  sourceRef = null,
  scope = {},
  restrictions = {},
  validFrom = null,
  validUntil = null,
} = {}) {
  if (!subjectRef) throw new Error('subjectRef is required');
  if (!kind) throw new Error('kind is required');
  if (!RIGHT_KINDS.includes(kind)) throw new Error(`unsupported right kind: ${kind}`);
  return {
    id: `right:${crypto.randomUUID()}`,
    kind: 'right',
    subjectRef,
    rightKind: kind,
    holderRef,
    issuerRef,
    sourceRef,
    scope: { ...scope },
    restrictions: { ...restrictions },
    validFrom,
    validUntil,
    status: 'active',
  };
}
