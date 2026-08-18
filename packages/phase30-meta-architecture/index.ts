export interface ArchitecturePrimitive { id: string; kind: string; constraints: string[]; }
export interface ArchitectureSpec { id: string; primitives: string[]; governance: string[]; capabilities: string[]; }

export class MetaArchitectureEngine {
  compose(id: string, primitives: ArchitecturePrimitive[], governance: string[]): ArchitectureSpec {
    return { id, primitives: primitives.map((p) => p.id), governance, capabilities: primitives.flatMap((p) => p.constraints) };
  }
}
