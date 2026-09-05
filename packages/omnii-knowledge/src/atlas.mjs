const ATLAS_STATES = new Set(['draft', 'submitted', 'review', 'approval', 'scheduled', 'active']);

export function createAtlasEntry({ objectRef, title = '', summary = '', status = 'draft', provenanceRefs = [], geography = null, rights = null } = {}) {
  if (!objectRef) throw new Error('objectRef is required');
  if (!ATLAS_STATES.has(status)) throw new Error('invalid atlas status');
  return {
    id: `atlas:${crypto.randomUUID()}`,
    kind: 'atlas-entry',
    objectRef,
    title,
    summary,
    status,
    provenanceRefs: [...provenanceRefs],
    geography,
    rights,
    operationalTruth: false,
  };
}

export function canPublishAtlasEntry(entry, { verified = false, authorityRef = null } = {}) {
  return Boolean(entry && verified && authorityRef && ['approval', 'scheduled', 'active'].includes(entry.status));
}
