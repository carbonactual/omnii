export function createMintRecord({
  objectRef,
  issuerRef,
  authorityRef = null,
  sourceRefs = [],
  pulseRef = null,
  feedbackRef = null,
  valuationRef = null,
  classification = 'unknown',
  rightsRefs = [],
  provenanceRefs = [],
  antiDuplicationRef = null,
  metadata = {},
} = {}) {
  if (!objectRef) throw new Error('objectRef is required');
  if (!issuerRef) throw new Error('issuerRef is required');
  return {
    id: `mint:${crypto.randomUUID()}`,
    kind: 'mint',
    objectRef,
    issuerRef,
    authorityRef,
    sourceRefs: Array.isArray(sourceRefs) ? [...sourceRefs] : [],
    pulseRef,
    feedbackRef,
    valuationRef,
    classification,
    rightsRefs: Array.isArray(rightsRefs) ? [...rightsRefs] : [],
    provenanceRefs: Array.isArray(provenanceRefs) ? [...provenanceRefs] : [],
    antiDuplicationRef,
    status: 'active',
    metadata: { ...metadata },
  };
}
