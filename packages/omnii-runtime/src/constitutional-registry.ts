import type {
  ConstitutionalDoctrine,
  ConstitutionalValidationResult,
  ConstitutionalViolation,
} from "./constitutional";

export const CORE_CONSTITUTIONAL_DOCTRINES: readonly ConstitutionalDoctrine[] = [
  { id: "architecture", title: "OMNII Canonical Architecture", layer: "foundation", dependsOn: [], status: "materialized" },
  { id: "ecosystem", title: "OMNII Universal Ecosystem Model", layer: "foundation", dependsOn: ["architecture"], status: "materialized" },
  { id: "semantics", title: "OMNII Constitutional Semantics", layer: "foundation", dependsOn: ["architecture", "ecosystem"], status: "materialized" },
  { id: "mathematics", title: "OMNII Constitutional Mathematics", layer: "behavioral", dependsOn: ["semantics"], status: "materialized" },
  { id: "economics", title: "OMNII Constitutional Economics", layer: "behavioral", dependsOn: ["mathematics"], status: "materialized" },
  { id: "intelligence", title: "OMNII Constitutional Intelligence", layer: "behavioral", dependsOn: ["semantics", "mathematics"], status: "materialized" },
  { id: "continuity", title: "OMNII Constitutional Continuity", layer: "behavioral", dependsOn: ["economics", "intelligence"], status: "materialized" },
  { id: "territory", title: "OMNII Constitutional Territory", layer: "reality", dependsOn: ["continuity"], status: "materialized" },
  { id: "ecology", title: "OMNII Constitutional Ecology", layer: "reality", dependsOn: ["territory"], status: "materialized" },
  { id: "relationship", title: "OMNII Constitutional Relationship", layer: "connection", dependsOn: ["ecology", "continuity"], status: "materialized" },
  { id: "governance", title: "OMNII Constitutional Governance", layer: "coordination", dependsOn: ["intelligence", "territory", "relationship"], status: "materialized" },
  { id: "authority", title: "OMNII Constitutional Authority", layer: "coordination", dependsOn: ["governance"], status: "materialized" },
  { id: "consent", title: "OMNII Constitutional Consent", layer: "coordination", dependsOn: ["authority"], status: "materialized" },
  { id: "being", title: "OMNII Constitutional Being", layer: "becoming", dependsOn: ["semantics", "continuity", "relationship"], status: "materialized" },
  { id: "becoming", title: "OMNII Constitutional Becoming", layer: "becoming", dependsOn: ["being", "continuity", "intelligence"], status: "materialized" },
  { id: "civilization", title: "OMNII Constitutional Civilization", layer: "civilization", dependsOn: ["becoming", "governance", "ecology"], status: "materialized" },
];

export class ConstitutionalRegistry {
  private readonly doctrines = new Map<string, ConstitutionalDoctrine>();

  constructor(doctrines: readonly ConstitutionalDoctrine[] = CORE_CONSTITUTIONAL_DOCTRINES) {
    for (const doctrine of doctrines) this.register(doctrine);
  }

  register(doctrine: ConstitutionalDoctrine): void {
    if (!doctrine.id.trim()) throw new Error("Constitutional doctrine id is required");
    this.doctrines.set(doctrine.id, doctrine);
  }

  get(id: string): ConstitutionalDoctrine | undefined {
    return this.doctrines.get(id);
  }

  list(): readonly ConstitutionalDoctrine[] {
    return [...this.doctrines.values()];
  }

  validate(): ConstitutionalValidationResult {
    const violations: ConstitutionalViolation[] = [];
    const visiting = new Set<string>();
    const visited = new Set<string>();
    const order: string[] = [];

    const visit = (id: string): void => {
      if (visited.has(id)) return;
      if (visiting.has(id)) {
        violations.push({ code: "DEPENDENCY_CYCLE", doctrineId: id, message: `Constitutional dependency cycle detected at ${id}` });
        return;
      }
      const doctrine = this.doctrines.get(id);
      if (!doctrine) return;
      visiting.add(id);
      for (const dependencyId of doctrine.dependsOn) {
        if (!this.doctrines.has(dependencyId)) {
          violations.push({ code: "UNKNOWN_DEPENDENCY", doctrineId: id, dependencyId, message: `${id} depends on unknown doctrine ${dependencyId}` });
          continue;
        }
        visit(dependencyId);
      }
      visiting.delete(id);
      visited.add(id);
      order.push(id);
    };

    for (const doctrine of this.doctrines.values()) visit(doctrine.id);
    return { valid: violations.length === 0, violations, order };
  }
}
