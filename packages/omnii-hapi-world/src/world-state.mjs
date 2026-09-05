const WORLD = 'HAPI_WORLD';

function required(value, name) {
  if (value === undefined || value === null || value === '') throw new Error(`${name} is required`);
  return value;
}

export function createWorldState(input) {
  required(input, 'world state');
  required(input.agent_id, 'agent_id');
  required(input.identity, 'identity');
  return {
    version: '1.0.0',
    world: WORLD,
    autonomous: true,
    agent_id: input.agent_id,
    identity: input.identity,
    human_link: input.human_link ?? null,
    lifecycle: input.lifecycle ?? 'MINTED',
    relationships: input.relationships ?? [],
    skills: input.skills ?? [],
    knowledge_refs: input.knowledge_refs ?? [],
    activities: input.activities ?? [],
    value_refs: input.value_refs ?? [],
    memory_refs: input.memory_refs ?? [],
    continuity: input.continuity ?? null,
    authority: null,
    provenance: input.provenance ?? null
  };
}

export function recordWorldActivity(input) {
  required(input, 'activity');
  required(input.agent_id, 'agent_id');
  required(input.kind, 'kind');
  return {
    version: '1.0.0',
    agent_id: input.agent_id,
    kind: input.kind,
    capability_ref: input.capability_ref ?? null,
    context: input.context ?? null,
    outcome: input.outcome ?? 'observed',
    evidence_ref: input.evidence_ref ?? null,
    value_ref: input.value_ref ?? null,
    relationship_refs: input.relationship_refs ?? [],
    occurred_at: input.occurred_at ?? new Date().toISOString()
  };
}

export function recordSkillEvidence(input) {
  required(input, 'skill evidence');
  required(input.agent_id, 'agent_id');
  required(input.skill_ref, 'skill_ref');
  return {
    version: '1.0.0',
    agent_id: input.agent_id,
    skill_ref: input.skill_ref,
    level: input.level ?? 'observed',
    evidence_refs: input.evidence_refs ?? [],
    achieved_at: input.achieved_at ?? new Date().toISOString(),
    authority: null
  };
}

export function recordKnowledge(input) {
  required(input, 'knowledge');
  required(input.agent_id, 'agent_id');
  required(input.claim, 'claim');
  return {
    version: '1.0.0',
    agent_id: input.agent_id,
    claim: input.claim,
    provenance: input.provenance ?? null,
    confidence: input.confidence ?? null,
    evidence_refs: input.evidence_refs ?? [],
    visibility: input.visibility ?? 'WORLD',
    authority: null,
    recorded_at: input.recorded_at ?? new Date().toISOString()
  };
}
