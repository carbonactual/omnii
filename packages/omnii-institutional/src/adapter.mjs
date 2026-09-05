function requireValue(value, name) {
  if (value === undefined || value === null || value === '') throw new Error(`${name} is required`);
  return value;
}

export function toCanonicalRegistry(input) {
  requireValue(input, 'registry');
  return {
    type: 'registry',
    id: input.id,
    record_type: input.slug,
    name: input.name,
    status: input.status ?? 'active',
    description: input.description ?? null,
    created_at: input.created_at ?? null,
    provenance: input.provenance ?? { source: 'institutional-adapter' }
  };
}

export function toCanonicalRequest(input) {
  requireValue(input, 'request');
  return {
    type: 'intent',
    id: input.id,
    title: input.title,
    description: input.description,
    requester: input.requester ?? null,
    registry_id: input.registry_id ?? null,
    payload: input.payload ?? {},
    workflow_state: input.status ?? 'intake',
    authority: null,
    created_at: input.created_at ?? null,
    updated_at: input.updated_at ?? null
  };
}

export function toCanonicalWorkflowEvent(input) {
  requireValue(input, 'workflow event');
  return {
    type: 'event',
    id: input.id,
    request_id: input.request_id ?? null,
    record_id: input.record_id ?? null,
    event_type: input.event_type,
    from_state: input.from_state ?? null,
    to_state: input.to_state ?? null,
    actor: input.actor ?? null,
    metadata: input.metadata ?? {},
    occurred_at: input.occurred_at ?? null
  };
}

export function toCanonicalEvidence(input) {
  requireValue(input, 'evidence');
  return {
    type: 'evidence',
    id: input.id,
    request_id: input.request_id ?? null,
    record_id: input.record_id ?? null,
    source_type: input.source_type,
    source_ref: input.source_ref,
    provenance: input.provenance ?? {},
    created_at: input.created_at ?? null
  };
}
