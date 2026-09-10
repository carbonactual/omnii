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

/**
 * Full gate for consequential execution. Identity, authority, policy,
 * capability and resource readiness remain separate inputs. Supplying a
 * matching candidate or interpretation alone cannot satisfy this gate.
 */
export function canonicalExecutionGate({
  identityRef = null,
  authorityRef = null,
  capabilityRef,
  policyAllowed = false,
  capabilityReady = false,
  resourceReady = false,
  requiresHuman = false,
} = {}) {
  if (!capabilityRef) throw new Error('capabilityRef is required');

  const action = canonicalActionGate({ capabilityRef, authorityRef, requiresHuman });
  const normalizedCapability = String(capabilityRef).trim().toLowerCase();
  const consequential = action.consequential;
  const identitySatisfied = Boolean(identityRef);
  const authoritySatisfied = Boolean(authorityRef);
  const requirements = consequential
    ? identitySatisfied && authoritySatisfied && Boolean(policyAllowed) && Boolean(capabilityReady) && Boolean(resourceReady)
    : Boolean(capabilityReady);

  return {
    capabilityRef: normalizedCapability,
    consequential,
    allowed: requirements,
    checks: {
      identity: identitySatisfied,
      authority: authoritySatisfied,
      policy: Boolean(policyAllowed),
      capability: Boolean(capabilityReady),
      resource: Boolean(resourceReady),
    },
    reason: requirements ? 'execution-ready' : 'execution-gate-failed',
  };
}
