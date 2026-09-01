export type OperatingContextLinkedArtifactType =
  | "form_submission"
  | "form_review"
  | "credential"
  | "compliance_case"
  | "evidence"
  | "token_representation"
  | "token_lifecycle_event"
  | "mint_issuance";

export interface OperatingContextLinkedArtifact {
  artifactType: OperatingContextLinkedArtifactType;
  artifactId: string;
  operatingContextId: string;
}

export interface OperatingContextQuery {
  operatingContextId?: string;
  fleetId?: string;
  mode?: string;
  operatingCapacity?: string;
  serviceId?: string;
  journeyId?: string;
  jurisdiction?: string;
  authorityRef?: string;
  status?: string;
}

export function assertOperatingContextLink(
  link: OperatingContextLinkedArtifact,
): OperatingContextLinkedArtifact {
  if (!link.artifactId || !link.operatingContextId) {
    throw new Error("artifactId and operatingContextId are required");
  }
  return link;
}
