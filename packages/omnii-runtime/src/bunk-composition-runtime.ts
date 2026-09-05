import {
  assertBunkPropertyLifecycleTransition,
  type BunkPropertyLifecycleTransition,
} from "./bunk-property-lifecycle";
import {
  assertBunkTipEconomicRequest,
  type BunkTipEconomicRequest,
} from "./bunk-economic-boundary";
import {
  assertBunkPropertyIntelligenceObservation,
  type BunkPropertyIntelligenceObservation,
} from "./bunk-property-intelligence";

export interface BunkCompositionRequest {
  propertyId: string;
  lifecycle: BunkPropertyLifecycleTransition;
  economic?: BunkTipEconomicRequest;
  intelligence?: BunkPropertyIntelligenceObservation;
}

export const validateBunkCompositionRequest = (request: BunkCompositionRequest): string[] => {
  const errors: string[] = [];

  if (!request.propertyId?.trim()) errors.push("propertyId is required");
  if (request.lifecycle) {
    errors.push(...validateSafely(() => assertBunkPropertyLifecycleTransition(request.lifecycle)));
  } else {
    errors.push("lifecycle is required");
  }

  if (request.economic) {
    if (request.economic.propertyId !== request.propertyId) {
      errors.push("economic propertyId must match composition propertyId");
    }
    errors.push(...validateSafely(() => assertBunkTipEconomicRequest(request.economic!)));
  }

  if (request.intelligence) {
    if (request.intelligence.propertyId !== request.propertyId) {
      errors.push("intelligence propertyId must match composition propertyId");
    }
    errors.push(...validateSafely(() => assertBunkPropertyIntelligenceObservation(request.intelligence!)));
  }

  return errors;
};

const validateSafely = (assertion: () => unknown): string[] => {
  try {
    assertion();
    return [];
  } catch (error) {
    return [error instanceof Error ? error.message : String(error)];
  }
};

export const assertBunkCompositionRequest = (request: BunkCompositionRequest): BunkCompositionRequest => {
  const errors = validateBunkCompositionRequest(request);
  if (errors.length > 0) throw new Error(errors.join("; "));
  return request;
};
