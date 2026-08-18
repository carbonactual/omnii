export interface ContinuityNode { id: string; kind: 'life'|'family'|'relationship'|'work'|'asset'|'knowledge'|'identity'|'legacy'; }
export interface ContinuityLink { from: string; to: string; relation: string; }
export interface ContinuityGraph { nodes: ContinuityNode[]; links: ContinuityLink[]; }

export class HumanContinuityLayer {
  create(nodes: ContinuityNode[], links: ContinuityLink[]): ContinuityGraph {
    const ids = new Set(nodes.map((n) => n.id));
    const validLinks = links.filter((l) => ids.has(l.from) && ids.has(l.to));
    return { nodes, links: validLinks };
  }
}
