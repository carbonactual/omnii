export const AGENT_DECISIONS = Object.freeze(['allow', 'deny', 'escalate']);

export function createAgentAuthority({
  agentRef,
  principalRef,
  authorityRef = null,
  scope = [],
  capabilities = [],
  resourceLimits = {},
  toolPermissions = [],
  dataPermissions = [],
  escalationRequiredFor = [],
  revocable = true,
  metadata = {},
} = {}) {
  if (!agentRef) throw new Error('agentRef is required');
  if (!principalRef) throw new Error('principalRef is required');
  if (!Array.isArray(scope)) throw new Error('scope must be an array');
  return {
    id: `agent-authority:${crypto.randomUUID()}`,
    kind: 'agent-authority',
    agentRef,
    principalRef,
    authorityRef,
    scope: [...scope],
    capabilities: Array.isArray(capabilities) ? [...capabilities] : [],
    resourceLimits: { ...resourceLimits },
    toolPermissions: Array.isArray(toolPermissions) ? [...toolPermissions] : [],
    dataPermissions: Array.isArray(dataPermissions) ? [...dataPermissions] : [],
    escalationRequiredFor: Array.isArray(escalationRequiredFor) ? [...escalationRequiredFor] : [],
    revocable: Boolean(revocable),
    status: 'active',
    metadata: { ...metadata },
  };
}

export function authorizeAgentAction(authority, { action, capability = null, tool = null, resourceCost = 0 } = {}) {
  if (authority?.kind !== 'agent-authority') throw new Error('authority must be an agent-authority record');
  if (!action) throw new Error('action is required');
  const inScope = authority.scope.length === 0 || authority.scope.includes(action) || authority.scope.includes('*');
  const capabilityAllowed = !capability || authority.capabilities.includes(capability) || authority.capabilities.includes('*');
  const toolAllowed = !tool || authority.toolPermissions.includes(tool) || authority.toolPermissions.includes('*');
  const maxCost = Number(authority.resourceLimits.maxActionCost);
  const withinLimit = Number.isFinite(maxCost) ? Number(resourceCost) <= maxCost : true;
  const escalation = authority.escalationRequiredFor.includes(action) || authority.escalationRequiredFor.includes('*');
  if (!inScope || !capabilityAllowed || !toolAllowed || !withinLimit) return { decision: 'deny', principalRef: authority.principalRef, agentRef: authority.agentRef };
  return { decision: escalation ? 'escalate' : 'allow', principalRef: authority.principalRef, agentRef: authority.agentRef };
}

export function revokeAgentAuthority(authority, reason) {
  if (authority?.kind !== 'agent-authority') throw new Error('authority must be an agent-authority record');
  if (!reason) throw new Error('reason is required');
  return { ...authority, status: 'revoked', revokedAt: new Date().toISOString(), revocationReason: reason };
}
