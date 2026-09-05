export function createPlan(goal, steps = []) {
  if (!goal) throw new Error('goal is required');
  return { goal, steps: Array.isArray(steps) ? [...steps] : [], dependencies: [], satisfiedDependencies: [], state: 'planned', executed: false };
}

export function addDependency(plan, dependencyRef) {
  if (!plan || typeof plan !== 'object') throw new Error('plan is required');
  if (!dependencyRef) throw new Error('dependencyRef is required');
  return { ...plan, dependencies: [...new Set([...(plan.dependencies || []), dependencyRef])] };
}

export function canExecutePlan(plan) {
  if (!plan || plan.executed === true) return false;
  const dependencies = plan.dependencies || [];
  const satisfied = new Set(plan.satisfiedDependencies || []);
  return dependencies.every((dependency) => satisfied.has(dependency));
}
