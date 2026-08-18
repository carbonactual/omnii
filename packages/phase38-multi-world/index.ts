export interface World { id: string; name: string; territories: string[]; metadata: Record<string, unknown>; }
export interface WorldRelation { from: string; to: string; relation: string; }
export class MultiWorldGraph {
  readonly worlds = new Map<string, World>();
  readonly relations: WorldRelation[] = [];
  register(world: World): void { this.worlds.set(world.id, world); }
  relate(relation: WorldRelation): void { if (!this.worlds.has(relation.from) || !this.worlds.has(relation.to)) throw new Error('world endpoints must exist'); this.relations.push(relation); }
  get(id: string): World | undefined { return this.worlds.get(id); }
}
