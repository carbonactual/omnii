export interface CivilizationNode { id: string; kind: 'being' | 'institution' | 'territory' | 'ecosystem' | 'world' | 'intelligence' | 'resource'; }
export interface CivilizationRelation { from: string; to: string; relation: string; governed: boolean; }
export interface UniversalEnvironmentSnapshot { nodes: CivilizationNode[]; relations: CivilizationRelation[]; constitutionalVersion: string; }
export class UniversalCivilizationEnvironment {
  private nodes = new Map<string, CivilizationNode>();
  private relations: CivilizationRelation[] = [];
  register(node: CivilizationNode): void { this.nodes.set(node.id, node); }
  relate(relation: CivilizationRelation): void {
    if (!relation.governed) throw new Error('civilization-scale relations require explicit governance');
    if (!this.nodes.has(relation.from) || !this.nodes.has(relation.to)) throw new Error('civilization endpoints must exist');
    this.relations.push(relation);
  }
  snapshot(constitutionalVersion: string): UniversalEnvironmentSnapshot {
    return { nodes: [...this.nodes.values()], relations: [...this.relations], constitutionalVersion };
  }
}
