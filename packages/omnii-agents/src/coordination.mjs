export function coordinateAgents(agents = [], request = {}) {
  const requiredCapability = request.requiredCapability ?? null;
  const candidates = agents.filter((agent) => !requiredCapability || agent.capabilities?.includes(requiredCapability));
  return {
    candidates: candidates.map((agent) => ({ id: agent.id, capability: requiredCapability, role: agent.role ?? null })),
    authorityGranted: false,
    executionRequiresCanonicalAuthority: true,
  };
}
