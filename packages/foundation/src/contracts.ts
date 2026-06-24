import { z } from "zod";

export const foundationRoleSchema = z.enum([
  "human",
  "organization_member",
  "seal_approver",
  "auditor"
]);

export const productScopeSchema = z.object({
  product: z.literal("BUNK"),
  permissions: z.array(z.string()),
  issuedAt: z.string().datetime(),
  expiresAt: z.string().datetime().optional(),
  sealReference: z.string().uuid()
});

export const foundationSessionSchema = z.object({
  sessionId: z.string().uuid(),
  humanId: z.string().uuid(),
  humanReference: z.string().min(1),
  hapiReference: z.string().uuid(),
  mintedAiReference: z.string().uuid(),
  foundationRoles: z.array(foundationRoleSchema),
  productScopes: z.array(productScopeSchema),
  issuedAt: z.string().datetime(),
  expiresAt: z.string().datetime(),
  correlationId: z.string().uuid()
});

export type FoundationSession = z.infer<typeof foundationSessionSchema>;
export type ProductScope = z.infer<typeof productScopeSchema>;
