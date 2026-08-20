export type ParticipantClassification = "human" | "animal" | "plant" | "fungal" | "microbial" | "ai" | "robot" | "collective" | "institution" | "civilization" | "extraterrestrial" | "unknown" | "hypothetical";
export type Embodiment = "biological" | "mechanical" | "digital" | "hybrid" | "collective" | "distributed" | "non_local" | "unknown";

export interface ParticipantProfile {
  id: string;
  classification: ParticipantClassification;
  speciesOrClass?: string;
  embodiment: Embodiment;
  cognition?: string;
  sensoryModalities?: string[];
  communication?: string[];
  habitat?: Record<string, unknown>;
  authorityModel?: Record<string, unknown>;
  rightsOrWelfare?: Record<string, unknown>;
  provenance: Record<string, unknown>;
  confidence: number;
}

export interface InterparticipantProtocol {
  id: string;
  participantA: string;
  participantB: string;
  protocolType: string;
  communicationMethod: Record<string, unknown>;
  translation?: Record<string, unknown>;
  authority: Record<string, unknown>;
  rightsObligations: Record<string, unknown>;
  risks: Record<string, unknown>;
  conditions?: Record<string, unknown>;
}

export function validateParticipant(profile: ParticipantProfile): void {
  if (!profile.id || !profile.classification) throw new Error("participant identity and classification are required");
  if (!profile.provenance || Object.keys(profile.provenance).length === 0) throw new Error("participant provenance is required");
  if (profile.confidence < 0 || profile.confidence > 1) throw new Error("participant confidence must be between 0 and 1");
}

export function validateInterparticipantProtocol(protocol: InterparticipantProtocol): void {
  if (!protocol.participantA || !protocol.participantB) throw new Error("protocol participants are required");
  if (protocol.participantA === protocol.participantB) throw new Error("protocol requires distinct participants");
  if (!protocol.protocolType) throw new Error("protocol type is required");
  if (!protocol.authority || Object.keys(protocol.authority).length === 0) throw new Error("protocol authority is required");
}

export function preserveUnknownParticipant(input: Omit<ParticipantProfile, "classification">): ParticipantProfile {
  return { ...input, classification: "unknown" };
}
