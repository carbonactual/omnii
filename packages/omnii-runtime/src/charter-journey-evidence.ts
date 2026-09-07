import { randomUUID } from "node:crypto";
import { ObjectRuntime } from "./object-runtime";

export interface JourneyEvidenceReference {
  id: string;
  journeyId: string;
  type: string;
  sourceRef: string;
  capturedAt: string;
  provenance: Record<string, unknown>;
  attributes: Record<string, unknown>;
}

export class CharterJourneyEvidenceRuntime {
  constructor(private readonly objects: ObjectRuntime) {}

  async attach(input: Omit<JourneyEvidenceReference, "id" | "capturedAt">): Promise<JourneyEvidenceReference> {
    if (!(await this.objects.read(input.journeyId))) throw new Error(`Journey not found: ${input.journeyId}`);
    const capturedAt = new Date().toISOString();
    const id = randomUUID();
    await this.objects.create({
      id,
      type: "charter:journey-evidence-reference",
      status: "recorded",
      identity: { name: input.type },
      provenance: input.provenance,
      authority: {},
      attributes: {
        journey_id: input.journeyId,
        evidence_type: input.type,
        source_ref: input.sourceRef,
        captured_at: capturedAt,
        attributes: input.attributes,
      },
      relationships: [],
      dependencies: [],
      capabilities: [],
      resources: [],
      metadata: {},
    });
    return { ...input, id, capturedAt };
  }

  async list(journeyId: string): Promise<JourneyEvidenceReference[]> {
    const objects = await this.objects.list();
    return objects.filter((object) => object.type === "charter:journey-evidence-reference" && object.attributes.journey_id === journeyId).map((object) => ({
      id: object.id,
      journeyId,
      type: String(object.attributes.evidence_type ?? ""),
      sourceRef: String(object.attributes.source_ref ?? ""),
      capturedAt: String(object.attributes.captured_at ?? object.timestamps.created_at),
      provenance: object.provenance,
      attributes: (object.attributes.attributes ?? {}) as Record<string, unknown>,
    }));
  }
}
