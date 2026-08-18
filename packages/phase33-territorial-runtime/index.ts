export interface TerritoryNode { id: string; kind: 'person'|'institution'|'infrastructure'|'resource'|'service'|'event'|'governance'|'economic-actor'; }
export interface TerritoryEdge { from: string; to: string; relation: string; }
export interface TerritoryGraph { territoryId: string; nodes: TerritoryNode[]; edges: TerritoryEdge[]; }

export class TerritorialRuntime {
  compose(territoryId: string, nodes: TerritoryNode[], edges: TerritoryEdge[]): TerritoryGraph {
    const ids = new Set(nodes.map((n) => n.id));
    return { territoryId, nodes, edges: edges.filter((e) => ids.has(e.from) && ids.has(e.to)) };
  }
}
