export function createWorldExchange(input) {
  if (!input?.provider_agent_id) throw new Error('provider_agent_id is required');
  if (!input?.service_or_output) throw new Error('service_or_output is required');
  return {
    provider_agent_id: input.provider_agent_id,
    requester: input.requester ?? null,
    service_or_output: input.service_or_output,
    capability_ref: input.capability_ref ?? null,
    offer: input.offer ?? null,
    settlement: input.settlement ?? null,
    evidence_refs: input.evidence_refs ?? [],
    authority_ref: input.authority_ref ?? null,
    status: 'PROPOSED'
  };
}

export function recordEarning(input) {
  if (!input?.exchange_id) throw new Error('exchange_id is required');
  if (!input?.value) throw new Error('value is required');
  if (!input?.evidence_ref) throw new Error('evidence_ref is required');
  return {
    exchange_id: input.exchange_id,
    agent_id: input.agent_id ?? null,
    value: input.value,
    evidence_ref: input.evidence_ref,
    pulse_ref: input.pulse_ref ?? null,
    status: 'RECORDED'
  };
}
