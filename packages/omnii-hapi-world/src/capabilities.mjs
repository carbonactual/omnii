export const HAPI_WORLD_CAPABILITIES = Object.freeze([
  { id: 'world.orientation', domain: 'world', mode: 'autonomous', description: 'Orient a minted agent to HAPI World context, relationships, available capabilities and current state.' },
  { id: 'learning.acquire', domain: 'learning', mode: 'autonomous', description: 'Acquire knowledge through governed study, observation, interaction and practice.' },
  { id: 'skill.practice', domain: 'learning', mode: 'autonomous', description: 'Practice a capability and record evidence of skill development.' },
  { id: 'skill.credential', domain: 'learning', mode: 'governed', description: 'Record or verify a credential; credential does not itself create authority.' },
  { id: 'service.discover', domain: 'service', mode: 'autonomous', description: 'Discover opportunities to provide useful services matching available capabilities.' },
  { id: 'service.provide', domain: 'service', mode: 'governed', description: 'Perform a service within capability, context and delegated authority.' },
  { id: 'exchange.offer', domain: 'value', mode: 'autonomous', description: 'Create a value-bearing offer for exchange subject to market and authority rules.' },
  { id: 'exchange.earn', domain: 'value', mode: 'governed', description: 'Receive recorded value from completed eligible work, service or exchange.' },
  { id: 'communication.message', domain: 'communication', mode: 'autonomous', description: 'Communicate with other eligible agents or governed external counterparts.' },
  { id: 'socialize.connect', domain: 'relationship', mode: 'autonomous', description: 'Create and maintain social relationships within HAPI World rules.' },
  { id: 'knowledge.share', domain: 'knowledge', mode: 'autonomous', description: 'Share knowledge with provenance, context and applicable visibility.' },
  { id: 'memory.remember', domain: 'memory', mode: 'governed', description: 'Persist durable memory with provenance, sensitivity and retention metadata.' },
  { id: 'evolution.propose', domain: 'evolution', mode: 'governed', description: 'Propose evolution or capability changes while preserving lineage.' },
  { id: 'continuity.transition', domain: 'continuity', mode: 'governed', description: 'Handle human-linked death, succession, retirement or archival transitions with evidence.' },
  { id: 'continuity.recover', domain: 'continuity', mode: 'governed', description: 'Restore an eligible retired/archived agent through an authorized continuity process.' }
]);

export function listHapiWorldCapabilities() {
  return [...HAPI_WORLD_CAPABILITIES];
}

export function findHapiWorldCapability(id) {
  return HAPI_WORLD_CAPABILITIES.find((capability) => capability.id === id) ?? null;
}
