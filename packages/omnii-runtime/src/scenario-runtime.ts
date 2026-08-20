export type ScenarioReality = "actual" | "planned" | "hypothetical" | "simulated" | "counterfactual";
export interface ScenarioNode { id: string; kind: string; reality: ScenarioReality; state: "proposed" | "active" | "completed" | "failed" | "superseded"; payload?: Record<string, unknown>; }
export interface ScenarioEdge { from: string; to: string; relation: "sequence" | "branch" | "merge" | "reversal" | "dependency" | "feedback"; condition?: Record<string, unknown>; }

export function createScenarioBranch(nodes: ScenarioNode[], edges: ScenarioEdge[], branchFrom: string): { nodes: ScenarioNode[]; edges: ScenarioEdge[] } {
  if (!nodes.some(n => n.id === branchFrom)) throw new Error("branch origin does not exist");
  if (!validateScenarioPath(nodes, edges)) throw new Error("scenario edge references an unknown node");
  return { nodes: [...nodes], edges: [...edges] };
}

export function validateScenarioPath(nodes: ScenarioNode[], edges: ScenarioEdge[]): boolean {
  const ids = new Set(nodes.map(n => n.id));
  return edges.every(e => ids.has(e.from) && ids.has(e.to));
}
