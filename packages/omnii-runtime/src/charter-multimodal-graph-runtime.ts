import { ObjectRuntime } from "./object-runtime";
import { RelationshipRuntime } from "./relationship-runtime";

export type MovementNodeKind = "origin" | "destination" | "station" | "terminal" | "handoff" | "capability" | "infrastructure" | "service";

export interface MovementGraphNode {
  id: string;
  kind: MovementNodeKind;
  name?: string;
  capabilityIds?: string[];
  metadata?: Record<string, unknown>;
}

export interface MovementGraphEdge {
  from: string;
  to: string;
  mode: string;
  capabilityId?: string;
  sequence: number;
  status: "planned" | "ready" | "blocked" | "completed";
  metadata?: Record<string, unknown>;
}

export interface MultimodalJourneyGraph {
  journeyId: string;
  nodes: MovementGraphNode[];
  edges: MovementGraphEdge[];
}

export class CharterMultimodalGraphRuntime {
  constructor(readonly objects: ObjectRuntime, readonly relationships: RelationshipRuntime) {}

  async compose(journeyId: string, nodes: MovementGraphNode[], edges: MovementGraphEdge[]): Promise<MultimodalJourneyGraph> {
    if (!(await this.objects.read(journeyId))) throw new Error(`Journey not found: ${journeyId}`);
    for (const edge of edges) {
      if (!nodes.some((node) => node.id === edge.from)) throw new Error(`Unknown graph source: ${edge.from}`);
      if (!nodes.some((node) => node.id === edge.to)) throw new Error(`Unknown graph destination: ${edge.to}`);
      if (edge.capabilityId && !(await this.objects.read(edge.capabilityId))) throw new Error(`Capability not found: ${edge.capabilityId}`);
    }
    const ordered = [...edges].sort((a, b) => a.sequence - b.sequence);
    for (const edge of ordered) {
      await this.relationships.create({
        type: "movement_graph_edge",
        source: journeyId,
        target: edge.capabilityId ?? edge.to,
        direction: "directed",
        status: "active",
        provenance: { source: "charter-multimodal-graph-runtime" },
        metadata: { from: edge.from, to: edge.to, mode: edge.mode, sequence: edge.sequence, edgeStatus: edge.status },
      });
    }
    return { journeyId, nodes, edges: ordered };
  }

  validateContinuity(graph: MultimodalJourneyGraph): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    if (!graph.nodes.length) errors.push("Journey graph has no nodes");
    if (!graph.edges.length) errors.push("Journey graph has no movement edges");
    const ordered = [...graph.edges].sort((a, b) => a.sequence - b.sequence);
    for (let i = 1; i < ordered.length; i += 1) {
      if (ordered[i - 1].to !== ordered[i].from) errors.push(`Journey discontinuity between sequence ${ordered[i - 1].sequence} and ${ordered[i].sequence}`);
    }
    if (ordered.some((edge) => edge.status === "blocked")) errors.push("Journey contains a blocked movement edge");
    return { valid: errors.length === 0, errors };
  }
}
