const CONSEQUENTIAL_CAPABILITIES = new Set([
  'authority.issue',
  'authority.approve',
  'authority.override',
  'execution.commit',
  'execution.deploy',
  'execution.send',
  'execution.transfer',
  'execution.settle',
  'execution.mint',
  'execution.delete',
  'product.publish',
  'institution.submit',
  'official.communicate',
  'continuity.transition',
  'continuity.recover',
  'legal.handoff',
  'official.submit',
])

export function authorityContext(ref, scope = []) {
  if (!ref) throw new Error('authority reference is required');
  return { ref, scope: Array.isArray(scope) ? scope : [scope] };
}

export function authorizationDecision(authority, capability, allowed = false) {
  if (!authority || !capability) throw new Error('authorization requires authority and capability');
  return { authority, capability, allowed: Boolean(allowed) };
}

export function isConsequentialCapability(capabilityRef = '') {
  return CONSEQUENTIAL_CAPABILITIES.has(String(capabilityRef).trim().toLowerCase());
}

export function canonicalActionGate({ capabilityRef, authorityRef = null, requiresHuman = false } = {}) {
  if (!capabilityRef) throw new Error('capabilityRef is required');
  const normalizedCapability = String(capabilityRef).trim().toLowerCase();
  const consequential = Boolean(requiresHuman) || isConsequentialCapability(normalizedCapability);
  const allowed = !consequential || Boolean(authorityRef);
  return {
    capabilityRef: normalizedCapability,
    authorityRef: authorityRef || null,
    consequential,
    allowed,
    reason: allowed ? (consequential ? 'authority-supplied' : 'non-consequential') : 'authority-required',
    authorityChanged: false,
    ownershipChanged: false,
  };
}
