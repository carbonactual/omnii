export type PlanetaryDomain = 'energy' | 'food' | 'water' | 'transport' | 'climate' | 'health' | 'communication' | 'resources' | 'trade' | 'population' | 'infrastructure';
export interface SystemNode { id: string; domain: PlanetaryDomain; state: Record<string, unknown>; }
export interface SystemDependency { from: string; to: string; relation: string; }
export class PlanetarySystemsGraph {
  readonly nodes = new Map<string, SystemNode>();
  readonly dependencies: SystemDependency[] = [];
  add(node: SystemNode): void { this.nodes.set(node.id, node); }
  link(dependency: SystemDependency): void { if (!this.nodes.has(dependency.from) || !this.nodes.has(dependency.to)) throw new Error('system endpoints must exist'); this.dependencies.push(dependency); }
  byDomain(domain: PlanetaryDomain): SystemNode[] { return [...this.nodes.values()].filter(n => n.domain === domain); }
}
