import { randomUUID } from "node:crypto";
import { MemoryPersistenceAdapter, PersistencePort } from "./persistence";
import { CanonicalObject } from "./types";

export type EcosystemIngredientKind =
  | "constitutional"
  | "capability"
  | "resource"
  | "service"
  | "product"
  | "workflow"
  | "registry"
  | "rule"
  | "evidence"
  | "actor";

export type EcosystemActionState =
  | "proposed"
  | "composed"
  | "conforming"
  | "authorized"
  | "executing"
  | "completed"
  | "reconciled"
  | "exception"
  | "recovering"
  | "escalated";

export interface EcosystemIngredientInput {
  id: string;
  name: string;
  kind: EcosystemIngredientKind;
  capabilities?: string[];
  metadata?: Record<string, unknown>;
}

export interface EcosystemComposition {
  id: string;
  intent: string;
  ingredientIds: string[];
  capabilities: string[];
  provenance: Record<string, unknown>;
  createdAt: string;
}

export interface EcosystemActionInput {
  intent: string;
  actor: string;
  authority: string;
  capability: string;
  ingredientIds: string[];
  idempotencyKey: string;
  before?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface EcosystemAction extends EcosystemActionInput {
  id: string;
  compositionId: string;
  state: EcosystemActionState;
  after?: Record<string, unknown>;
  outcome?: string;
  evidence: Array<Record<string, unknown>>;
  reconciliation: "pending" | "matched" | "exception";
  createdAt: string;
  updatedAt: string;
}

export interface EcosystemExecutionResult {
  outcome: string;
  after?: Record<string, unknown>;
  evidence?: Array<Record<string, unknown>>;
}

export type EcosystemExecutor = (action: EcosystemAction) => Promise<EcosystemExecutionResult>;

/**
 * Shared ecosystem layer: ideas compose existing ingredients, every state-changing
 * action is conformed, idempotent and recoverable, and every completed action is
 * reconciled against an explicit outcome/evidence trail.
 */
export class EcosystemConformanceRuntime {
  constructor(private readonly persistence: PersistencePort = new MemoryPersistenceAdapter()) {}

  async registerIngredient(input: EcosystemIngredientInput): Promise<CanonicalObject> {
    const now = new Date().toISOString();
    const existing = await this.persistence.read("objects", input.id);
    if (existing) throw new Error(`Ingredient already registered: ${input.id}`);
    return this.persistence.create("objects", {
      id: input.id,
      version: "1",
      type: `ecosystem:${input.kind}`,
      status: "active",
      identity: { name: input.name },
      provenance: { source: "ecosystem-conformance-runtime" },
      authority: {},
      attributes: { capabilities: input.capabilities ?? [] },
      relationships: [],
      dependencies: [],
      capabilities: input.capabilities ?? [],
      resources: [],
      metadata: input.metadata ?? {},
      timestamps: { created_at: now, updated_at: now },
    } as unknown as CanonicalObject) as unknown as CanonicalObject;
  }

  async compose(intent: string, ingredientIds: string[]): Promise<EcosystemComposition> {
    if (!intent.trim()) throw new Error("Composition intent is required");
    if (!ingredientIds.length) throw new Error("Composition requires at least one ingredient");

    const ingredients = await Promise.all(ingredientIds.map((id) => this.persistence.read("objects", id)));
    const missing = ingredientIds.filter((_, index) => !ingredients[index]);
    if (missing.length) throw new Error(`Unknown ecosystem ingredients: ${missing.join(", ")}`);

    const capabilities = [...new Set(
      ingredients.flatMap((ingredient) => (Array.isArray(ingredient?.capabilities) ? ingredient.capabilities : []))
        .filter((capability): capability is string => typeof capability === "string"),
    )].sort();

    return {
      id: randomUUID(),
      intent,
      ingredientIds: [...ingredientIds],
      capabilities,
      provenance: {
        source: "ecosystem-conformance-runtime",
        ingredients: ingredients.map((ingredient) => ({
          id: ingredient?.id,
          version: ingredient?.version ?? "1",
        })),
      },
      createdAt: new Date().toISOString(),
    };
  }

  async conform(action: EcosystemActionInput, composition: EcosystemComposition): Promise<EcosystemAction> {
    if (!action.idempotencyKey.trim()) throw new Error("Idempotency key is required");
    if (!action.actor.trim()) throw new Error("Actor is required");
    if (!action.authority.trim()) throw new Error("Authority is required");
    if (!action.capability.trim()) throw new Error("Capability is required");

    const compositionSet = new Set(composition.ingredientIds);
    const foreignIngredients = action.ingredientIds.filter((id) => !compositionSet.has(id));
    if (foreignIngredients.length) throw new Error(`Action uses ingredients outside composition: ${foreignIngredients.join(", ")}`);
    if (!composition.capabilities.includes(action.capability)) {
      throw new Error(`Action capability is not provided by composition: ${action.capability}`);
    }

    const existing = await this.persistence.query("executions", (record) => record["idempotencyKey"] === action.idempotencyKey);
    if (existing.length) return structuredClone(existing[0] as unknown as EcosystemAction);

    const now = new Date().toISOString();
    const record: EcosystemAction = {
      ...action,
      id: randomUUID(),
      compositionId: composition.id,
      state: "authorized",
      evidence: [],
      reconciliation: "pending",
      createdAt: now,
      updatedAt: now,
    };

    await this.persistence.create("executions", record);
    return structuredClone(record);
  }

  async execute(actionId: string, executor: EcosystemExecutor): Promise<EcosystemAction> {
    const current = await this.persistence.read("executions", actionId);
    if (!current) throw new Error(`Ecosystem action not found: ${actionId}`);
    const action = structuredClone(current as unknown as EcosystemAction);

    if (action.state === "reconciled") return action;
    if (action.state === "completed" || action.state === "recovering" || action.state === "exception") {
      throw new Error(`Ecosystem action requires explicit recovery handling: ${action.state}`);
    }

    action.state = "executing";
    action.updatedAt = new Date().toISOString();
    await this.persistence.update("executions", action.id, action);

    try {
      const result = await executor(action);
      action.state = "completed";
      action.outcome = result.outcome;
      action.after = result.after;
      action.evidence = [...action.evidence, ...(result.evidence ?? [])];
      action.updatedAt = new Date().toISOString();
      await this.persistence.update("executions", action.id, action);

      if (!result.outcome.trim()) throw new Error("Execution outcome is required for reconciliation");
      action.state = "reconciled";
      action.reconciliation = "matched";
      action.updatedAt = new Date().toISOString();
      await this.persistence.update("executions", action.id, action);
      return structuredClone(action);
    } catch (error) {
      action.state = "exception";
      action.reconciliation = "exception";
      action.outcome = error instanceof Error ? error.message : "Unknown execution exception";
      action.evidence = [
        ...action.evidence,
        {
          type: "execution-exception",
          at: new Date().toISOString(),
          recoverable: true,
        },
      ];
      action.updatedAt = new Date().toISOString();
      await this.persistence.update("executions", action.id, action);
      return structuredClone(action);
    }
  }

  async recover(actionId: string, actor: string, reason: string): Promise<EcosystemAction> {
    if (!actor.trim()) throw new Error("Recovery actor is required");
    if (!reason.trim()) throw new Error("Recovery reason is required");
    const current = await this.persistence.read("executions", actionId);
    if (!current) throw new Error(`Ecosystem action not found: ${actionId}`);
    const action = structuredClone(current as unknown as EcosystemAction);
    if (action.state !== "exception") throw new Error("Only exception actions can enter recovery");
    action.state = "recovering";
    action.reconciliation = "pending";
    action.evidence = [
      ...action.evidence,
      { type: "recovery-started", actor, reason, at: new Date().toISOString() },
    ];
    action.updatedAt = new Date().toISOString();
    const updated = await this.persistence.update("executions", action.id, action);
    return structuredClone(updated as unknown as EcosystemAction);
  }

  async reconcile(actionId: string, outcome: string, evidence: Record<string, unknown> = {}): Promise<EcosystemAction> {
    if (!outcome.trim()) throw new Error("Reconciliation outcome is required");
    const current = await this.persistence.read("executions", actionId);
    if (!current) throw new Error(`Ecosystem action not found: ${actionId}`);
    const action = structuredClone(current as unknown as EcosystemAction);
    if (!["completed", "recovering", "exception"].includes(action.state)) {
      throw new Error(`Action cannot be reconciled from state: ${action.state}`);
    }
    action.state = "reconciled";
    action.reconciliation = "matched";
    action.outcome = outcome;
    action.evidence = [...action.evidence, { type: "reconciliation", ...evidence, at: new Date().toISOString() }];
    action.updatedAt = new Date().toISOString();
    const updated = await this.persistence.update("executions", action.id, action);
    return structuredClone(updated as unknown as EcosystemAction);
  }

  async findByIdempotencyKey(idempotencyKey: string): Promise<EcosystemAction | undefined> {
    const records = await this.persistence.query("executions", (record) => record["idempotencyKey"] === idempotencyKey);
    return records.length ? structuredClone(records[0] as unknown as EcosystemAction) : undefined;
  }
}
