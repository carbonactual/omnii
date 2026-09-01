export type OperatingCapacity =
  | "owner"
  | "custodian"
  | "fleet_member"
  | "operator"
  | "driver"
  | "pilot"
  | "crew"
  | "passenger"
  | "rider"
  | "cargo_carrier"
  | "rental_provider"
  | "rental_user"
  | "technician"
  | "inspector"
  | "regulator"
  | "dispatcher"
  | "remote_operator"
  | "autonomous_system"
  | string;

export interface OperatingContext {
  id: string;
  subjectId: string;
  fleetId?: string;
  mode: string;
  capacity: OperatingCapacity;
  serviceId?: string;
  journeyId?: string;
  jurisdiction: string;
  authorityRef?: string;
  locationRef?: string;
  validFrom: string;
  validUntil?: string;
  metadata?: Record<string, unknown>;
}

export interface CreateOperatingContextInput extends Omit<OperatingContext, "id"> {
  id?: string;
}

export class OperatingContextRuntime {
  private readonly contexts = new Map<string, OperatingContext>();

  async create(input: CreateOperatingContextInput): Promise<OperatingContext> {
    if (!input.subjectId) throw new Error("subjectId is required");
    if (!input.mode) throw new Error("mode is required");
    if (!input.capacity) throw new Error("capacity is required");
    if (!input.jurisdiction) throw new Error("jurisdiction is required");
    if (!input.validFrom) throw new Error("validFrom is required");
    if (input.validUntil && input.validUntil <= input.validFrom) {
      throw new Error("validUntil must be after validFrom");
    }

    const id = input.id ?? `operating-context:${this.contexts.size + 1}`;
    if (this.contexts.has(id)) throw new Error(`Operating context already exists: ${id}`);

    const context: OperatingContext = { ...input, id };
    this.contexts.set(id, context);
    return context;
  }

  async resolve(subjectId: string, at: string): Promise<OperatingContext[]> {
    return [...this.contexts.values()]
      .filter((context) => context.subjectId === subjectId)
      .filter((context) => context.validFrom <= at)
      .filter((context) => !context.validUntil || at < context.validUntil)
      .sort((a, b) => a.validFrom.localeCompare(b.validFrom));
  }

  async all(subjectId?: string): Promise<OperatingContext[]> {
    const values = [...this.contexts.values()];
    return subjectId ? values.filter((context) => context.subjectId === subjectId) : values;
  }
}
