export interface GovernanceNode { id: string; type: 'institution' | 'territory' | 'community'; authority: string; }
export interface GovernanceRelation { from: string; to: string; relation: 'governs' | 'coordinates' | 'reports-to' | 'delegates-to'; }
export class CivicGovernanceNetwork {
  readonly nodes = new Map<string, GovernanceNode>();
  readonly relations: GovernanceRelation[] = [];
  addNode(node: GovernanceNode): void { this.nodes.set(node.id, node); }
  connect(relation: GovernanceRelation): void {
    if (!this.nodes.has(relation.from) || !this.nodes.has(relation.to)) throw new Error('governance endpoints must exist');
    this.relations.push(relation);
  }
  authorityPath(from: string, to: string): GovernanceRelation[] {
    return this.relations.filter(r => r.from === from || r.to === to);
  }
}
