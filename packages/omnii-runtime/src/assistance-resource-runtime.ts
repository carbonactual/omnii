export type AssistanceUrgency = "low" | "normal" | "urgent";

export type AssistanceTermMode =
  | "free"
  | "paid"
  | "rent"
  | "borrow"
  | "deposit"
  | "reciprocal"
  | "sponsored"
  | "insured"
  | "subsidized"
  | "return-elsewhere";

export interface AssistanceCirculationInput {
  need: { id: string; description: string; urgency: AssistanceUrgency };
  capability: { id: string; kind: string };
  resource: { id: string; kind: string };
  availability: { available: boolean; startsAt: string; endsAt: string };
  authority: { present: boolean; scope?: string[] };
  terms: { mode: AssistanceTermMode };
  fulfilment: { status: "proposed" | "accepted" | "fulfilled" | "rejected" };
  returnObligation?: { required: boolean; destination: string; dueAt: string };
  relay?: { from?: string; to?: string };
  settlement?: { status: "pending" | "settled" };
  feedback?: { recorded: boolean; provenance?: string };
}

export interface AssistanceCirculationResult {
  valid: boolean;
  errors: string[];
}

export const ASSISTANCE_ENTITIES = [
  "Need",
  "Capability",
  "Resource",
  "Availability",
  "Authority",
  "Terms",
  "Fulfilment",
  "Relay",
  "Return",
  "Settlement",
  "Feedback",
] as const;

export function validateAssistanceCirculation(
  input: AssistanceCirculationInput,
): AssistanceCirculationResult {
  const errors: string[] = [];

  if (!input.need.id || !input.need.description) errors.push("need is required");
  if (!input.capability.id || !input.capability.kind) errors.push("capability is required");
  if (!input.resource.id || !input.resource.kind) errors.push("resource is required");
  if (!input.availability.available) errors.push("resource is not available");
  if (!input.availability.startsAt || !input.availability.endsAt) errors.push("availability window is required");
  if (!input.authority.present && input.fulfilment.status !== "rejected") {
    errors.push("authority is required before fulfilment");
  }
  if (!input.terms.mode) errors.push("terms are required");
  if (input.returnObligation?.required && !input.returnObligation.destination) {
    errors.push("return destination is required when return is obligated");
  }
  if (input.fulfilment.status === "fulfilled" && input.terms.mode === "return-elsewhere" && !input.returnObligation) {
    errors.push("return obligation is required for return-elsewhere fulfilment");
  }
  if (input.feedback?.recorded && !input.feedback.provenance) {
    errors.push("feedback provenance is required when feedback is recorded");
  }

  return { valid: errors.length === 0, errors };
}

export function isAssistanceFulfillable(input: AssistanceCirculationInput): boolean {
  return validateAssistanceCirculation({
    ...input,
    fulfilment: { status: "accepted" },
  }).valid;
}
