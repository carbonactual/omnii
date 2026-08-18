export interface CoordinationScope {
  ecosystems: string[];
  actor: string;
  authority: string;
  capabilities: string[];
}

export interface CoordinationTask {
  id: string;
  objective: string;
  requiredCapabilities: string[];
  targetEcosystems: string[];
}

export interface CoordinationDecision {
  allowed: boolean;
  reason: string;
  assignments: string[];
}

export class UniversalCoordinator {
  coordinate(task: CoordinationTask, scope: CoordinationScope): CoordinationDecision {
    if (!scope.actor || !scope.authority) {
      return { allowed: false, reason: 'actor and authority are required', assignments: [] };
    }
    if (task.targetEcosystems.some((id) => !scope.ecosystems.includes(id))) {
      return { allowed: false, reason: 'coordination exceeds declared ecosystem scope', assignments: [] };
    }
    const missing = task.requiredCapabilities.filter((c) => !scope.capabilities.includes(c));
    if (missing.length) {
      return { allowed: false, reason: `missing capabilities: ${missing.join(', ')}`, assignments: [] };
    }
    return {
      allowed: true,
      reason: 'coordination is within declared authority and capability scope',
      assignments: task.requiredCapabilities,
    };
  }
}
