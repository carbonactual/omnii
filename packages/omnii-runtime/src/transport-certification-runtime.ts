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
 * Registry over the existing OMNII persistence boundary.
 * It certifies implementation state; it does not create transport semantics.
 */
export class TransportCertificationRuntime {
  constructor(private readonly persistence: PersistencePort) {}

  async registerSurface(input: TransportSurfaceInput): Promise<TransportSurfaceRecord> {
    const existing = await this.persistence.read("registries", `transport-certification:${input.id}`);
    if (existing) throw new Error(`Transport surface ${input.id} already registered`);

    const record: TransportSurfaceRecord = {
      ...input,
      recordId: randomUUID(),
      createdAt: new Date().toISOString(),
    };
    await this.persistence.create("registries", { id: `transport-certification:${input.id}`, ...record });
    return record;
  }

  async getSurface(id: string): Promise<TransportSurfaceRecord | null> {
    const record = await this.persistence.read("registries", `transport-certification:${id}`);
    if (!record) return null;
    return record as unknown as TransportSurfaceRecord;
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

      result.push({
        id: surface.id,
        status: fullyPresent
          ? "certified"
          : surface.architecture === "present"
            ? "needs-integration"
            : "not-ready",
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
