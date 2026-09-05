export function createWorldMemory(input) {
  if (!input?.agent_id) throw new Error('agent_id is required');
  if (!input?.content) throw new Error('content is required');
  return {
    agent_id: input.agent_id,
    memory_type: input.memory_type ?? 'experience',
    content: input.content,
    provenance: input.provenance ?? null,
    relationship_refs: input.relationship_refs ?? [],
    evidence_refs: input.evidence_refs ?? [],
    visibility: input.visibility ?? 'RELATIONSHIP',
    sensitivity: input.sensitivity ?? 'NORMAL',
    retention: input.retention ?? 'CONTINUITY',
    created_at: input.created_at ?? new Date().toISOString()
  };
}

export function memoryMayBeShared(memory, targetVisibility) {
  const order = ['PRIVATE', 'RELATIONSHIP', 'COMMUNITY', 'WORLD', 'PUBLIC'];
  const current = order.indexOf(memory?.visibility ?? 'PRIVATE');
  const target = order.indexOf(targetVisibility ?? 'PRIVATE');
  return current >= 0 && target >= 0 && target <= current;
}
