export function createEvidenceRecord({ sourceRef, summary, verificationStatus = 'unverified', provenance = {}, integrity = null } = {}) {
  if (!sourceRef) throw new Error('sourceRef is required');
  if (!summary) throw new Error('summary is required');
  return {
    id: `evidence:${crypto.randomUUID()}`,
    kind: 'evidence',
    sourceRef,
    summary,
    verificationStatus,
    provenance,
    integrity,
    authorityRef: null,
    createdAt: new Date().toISOString(),
  };
}
