const VERSION = '1.0.0';

function required(value, name) {
  if (value === undefined || value === null || value === '') throw new Error(`${name} is required`);
  return value;
}

export function createParticipation(input) {
  required(input, 'participation');
  required(input.participant, 'participant');
  required(input.identity, 'identity');
  required(input.context, 'context');
  return {
    version: VERSION,
    participant: input.participant,
    identity: input.identity,
    context: input.context,
    relationships: input.relationships ?? [],
    capabilities: input.capabilities ?? [],
    evidence_refs: input.evidence_refs ?? [],
    authority_context: input.authority_context ?? null,
    authorized: false,
    provenance: input.provenance ?? null
  };
}

export function crossProduct(participant, product, context = {}) {
  required(participant, 'participant');
  required(product, 'product');
  return {
    participant,
    product,
    context,
    relationship: 'hapi-world-crossing',
    authorized: false
  };
}

export function hapiWorldVersion() {
  return VERSION;
}
