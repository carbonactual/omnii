export type ScenarioReality = "actual" | "planned" | "hypothetical" | "simulated" | "counterfactual";
export interface ScenarioNode { id: string; kind: string; reality: ScenarioReality; state: "proposed" | "active" | "completed" | "failed" | "superseded"; payload?: Record<string, unknown>; }
export interface ScenarioEdge { from: string; to: string; relation: "sequence" | "branch" | "merge" | "reversal" | "dependency" | "feedback"; condition?: Record<string, unknown>; }

export function createScenarioBranch(nodes: ScenarioNode[], edges: ScenarioEdge[], branchFrom: string, branchTo: string): { nodes: ScenarioNode[]; edges: ScenarioEdge[] } {
  if (!nodes.some(n => n.id === branchFrom) || !nodes.some(n => n.id === branchTo)) throw new Error("branch endpoints do not exist");
  if (!validateScenarioPath(nodes, edges)) throw new Error("scenario edge references an unknown node");
  if (branchFrom === branchTo) throw new Error("branch endpoints must differ");
  return { nodes: [...nodes], edges: [...edges, { from: branchFrom, to: branchTo, relation: "branch" }] };
}

export function validateScenarioPath(nodes: ScenarioNode[], edges: ScenarioEdge[]): boolean {
  const ids = new Set(nodes.map(n => n.id));
  return edges.every(e => ids.has(e.from) && ids.has(e.to));
}
