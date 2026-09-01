import { randomUUID } from "node:crypto";
import { PersistencePort } from "./persistence";

export type CertificationPresence = "present" | "partial" | "planned" | "unknown";

export interface TransportSurfaceInput {
  id: string;
  name: string;
  role: string;
  architecture: CertificationPresence;
  runtime: CertificationPresence;
  product: CertificationPresence;
  integration: string;
  sourceRefs: string[];
}

export interface TransportSurfaceRecord extends TransportSurfaceInput {
  recordId: string;
  createdAt: string;
}

export interface TransportCertificationRecord {
  id: string;
  status: "certified" | "needs-integration" | "not-ready";
  architecture: CertificationPresence;
  runtime: CertificationPresence;
  product: CertificationPresence;
  integration: string;
  sourceRefs: string[];
}

/**
 * Small registry over the existing OMNII persistence boundary.
 * It certifies implementation state; it does not create transport semantics.
 */
export class TransportCertificationRuntime {
  private readonly records = new Map<string, TransportSurfaceRecord>();

  constructor(private readonly persistence: PersistencePort) {}

  async registerSurface(input: TransportSurfaceInput): Promise<TransportSurfaceRecord> {
    if (this.records.has(input.id)) {
      throw new Error(`Transport surface ${input.id} already registered`);
    }

    const record: TransportSurfaceRecord = {
      ...input,
      recordId: randomUUID(),
      createdAt: new Date().toISOString(),
    };
    this.records.set(input.id, record);
    await this.persistence.write(`transport-certification:${input.id}`, record);
    return record;
  }

  async getSurface(id: string): Promise<TransportSurfaceRecord | null> {
    const existing = this.records.get(id);
    if (existing) return existing;
    const persisted = await this.persistence.read<TransportSurfaceRecord>(`transport-certification:${id}`);
    if (persisted) this.records.set(id, persisted);
    return persisted ?? null;
  }

  async certify(ids: string[]): Promise<TransportCertificationRecord[]> {
    const result: TransportCertificationRecord[] = [];
    for (const id of ids) {
      const surface = await this.getSurface(id);
      if (!surface) continue;

      const fullyPresent =
        surface.architecture === "present" &&
        surface.runtime === "present" &&
        surface.product === "present" &&
        surface.integration.trim().toLowerCase() === "none";

      const status = fullyPresent
        ? "certified"
        : surface.architecture === "present"
          ? "needs-integration"
          : "not-ready";

      result.push({
        id: surface.id,
        status,
        architecture: surface.architecture,
        runtime: surface.runtime,
        product: surface.product,
        integration: surface.integration,
        sourceRefs: [...surface.sourceRefs],
      });
    }
    return result;
  }
}
