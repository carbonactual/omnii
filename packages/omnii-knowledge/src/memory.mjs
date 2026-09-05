export function createMemoryRecord({ subjectRef, content, provenance = {}, relationshipRefs = [], visibility = 'private', sensitivity = 'restricted', retention = null } = {}) {
  if (!subjectRef) throw new Error('subjectRef is required');
  if (!content) throw new Error('content is required');
  return {
    id: `memory:${crypto.randomUUID()}`,
    kind: 'memory',
    subjectRef,
    content,
    provenance,
    relationshipRefs: [...relationshipRefs],
    visibility,
    sensitivity,
    retention,
    provenanceRequired: true,
    authorityRef: null,
    createdAt: new Date().toISOString(),
  };
}
