import { MovementGraphEdge, MovementGraphNode, MultimodalJourneyGraph } from "./charter-multimodal-graph-runtime";

export interface MovementRoute {
  nodes: string[];
  edges: MovementGraphEdge[];
  feasible: boolean;
  reason?: string;
}

export class CharterNetworkRuntime {
  route(graph: MultimodalJourneyGraph, origin: string, destination: string): MovementRoute {
    const adjacency = new Map<string, MovementGraphEdge[]>();
    for (const edge of graph.edges) {
      if (edge.status === "blocked") continue;
      const list = adjacency.get(edge.from) ?? [];
      list.push(edge);
      adjacency.set(edge.from, list);
    }
    const queue: Array<{ node: string; nodes: string[]; edges: MovementGraphEdge[] }> = [{ node: origin, nodes: [origin], edges: [] }];
    const visited = new Set<string>();
    while (queue.length) {
      const current = queue.shift()!;
      if (current.node === destination) return { nodes: current.nodes, edges: current.edges, feasible: true };
      if (visited.has(current.node)) continue;
      visited.add(current.node);
      for (const edge of adjacency.get(current.node) ?? []) {
        if (!visited.has(edge.to)) queue.push({ node: edge.to, nodes: [...current.nodes, edge.to], edges: [...current.edges, edge] });
      }
    }
    return { nodes: [], edges: [], feasible: false, reason: `No feasible movement path from ${origin} to ${destination}` };
  }

  fallback(graph: MultimodalJourneyGraph, origin: string, destination: string, blockedEdge: MovementGraphEdge): MovementRoute {
    const filtered: MultimodalJourneyGraph = { ...graph, edges: graph.edges.map((edge) => edge === blockedEdge ? { ...edge, status: "blocked" } : edge) };
    return this.route(filtered, origin, destination);
  }
}
