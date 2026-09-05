import { Authority } from "./types";
import { RuntimeRoute } from "./runtime-resolver";

export interface RuntimePolicyContext {
  capability?: string;
  route: RuntimeRoute;
  authority: Authority | null;
}

export interface RuntimePolicyDecision {
  requiresAuthority: boolean;
  allowed: boolean;
  reason?: "authority-required" | "authority-supplied" | "policy-denied";
}

export type RuntimePolicy = (context: RuntimePolicyContext) => Promise<RuntimePolicyDecision> | RuntimePolicyDecision;

export const defaultRuntimePolicy: RuntimePolicy = ({ route, authority }) => {
  const requiresAuthority = route.requiresAuthority !== false;
  if (requiresAuthority && !authority) {
    return { requiresAuthority, allowed: false, reason: "authority-required" };
  }
  return {
    requiresAuthority,
    allowed: true,
    reason: requiresAuthority ? "authority-supplied" : undefined,
  };
};
