export function authorityContext(ref, scope = []) {
  if (!ref) throw new Error('authority reference is required');
  return { ref, scope: Array.isArray(scope) ? scope : [scope] };
}

export function authorizationDecision(authority, capability, allowed = false) {
  if (!authority || !capability) throw new Error('authorization requires authority and capability');
  return { authority, capability, allowed: Boolean(allowed) };
}
