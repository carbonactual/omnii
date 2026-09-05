import { Authority, JsonObject } from "./types";
import { OperatingContext } from "./operating-context-runtime";
import { RuntimeSignal } from "./runtime-signal";

export interface AuthorityResolution {
  authority: Authority | null;
  reason?: "authority_unresolved" | "authority_invalid";
}

export interface RuntimeRoute {
  routeId: string;
  workflowReference?: string;
  workflowVersion?: string;
  capability?: string;
  actorIdentity?: string;
  requiresAuthority?: boolean;
  metadata?: JsonObject;
}

export interface DispatchDecision {
  allowed: boolean;
  reason?: "context_unresolved" | "authority_unresolved" | "authority_invalid" | "route_unresolved" | "approval_required" | "capability_denied";
  routeId?: string;
  workflowReference?: string;
  workflowVersion?: string;
  correlationId: string;
}

export interface RuntimeResolution {
  context: OperatingContext | null;
  authority: Authority | null;
  route: RuntimeRoute | null;
  dispatch: DispatchDecision;
}

export interface RuntimeResolverDependencies {
  resolveContext: (signal: RuntimeSignal) => Promise<OperatingContext | null | undefined>;
  resolveAuthority: (signal: RuntimeSignal, context: OperatingContext) => Promise<Authority | null | undefined>;
  matchRoute: (signal: RuntimeSignal, context: OperatingContext, authority: Authority | null) => Promise<RuntimeRoute | null | undefined>;
  authorizeRoute?: (route: RuntimeRoute, authority: Authority, signal: RuntimeSignal) => Promise<boolean>;
}

export async function resolveRuntimeSignal(
  signal: RuntimeSignal,
  dependencies: RuntimeResolverDependencies,
): Promise<RuntimeResolution> {
  const context = (await dependencies.resolveContext(signal)) ?? null;
  if (!context) {
    return {
      context: null,
      authority: null,
      route: null,
      dispatch: {
        allowed: false,
        reason: "context_unresolved",
        correlationId: signal.correlationId,
      },
    };
  }

  const authority = (await dependencies.resolveAuthority(signal, context)) ?? null;
  const route = (await dependencies.matchRoute(signal, context, authority)) ?? null;
  if (!route) {
    return {
      context,
      authority,
      route: null,
      dispatch: {
        allowed: false,
        reason: "route_unresolved",
        correlationId: signal.correlationId,
      },
    };
  }

  const requiresAuthority = route.requiresAuthority !== false;
  if (requiresAuthority && !authority) {
    return {
      context,
      authority: null,
      route,
      dispatch: {
        allowed: false,
        reason: "authority_unresolved",
        routeId: route.routeId,
        workflowReference: route.workflowReference,
        workflowVersion: route.workflowVersion,
        correlationId: signal.correlationId,
      },
    };
  }

  if (requiresAuthority && authority && dependencies.authorizeRoute && !(await dependencies.authorizeRoute(route, authority, signal))) {
    return {
      context,
      authority,
      route,
      dispatch: {
        allowed: false,
        reason: "capability_denied",
        routeId: route.routeId,
        workflowReference: route.workflowReference,
        workflowVersion: route.workflowVersion,
        correlationId: signal.correlationId,
      },
    };
  }

  return {
    context,
    authority,
    route,
    dispatch: {
      allowed: true,
      routeId: route.routeId,
      workflowReference: route.workflowReference,
      workflowVersion: route.workflowVersion,
      correlationId: signal.correlationId,
    },
  };
}
