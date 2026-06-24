import { z } from "zod";
import { bunkRoles } from "./types";

export const registerSchema = z.object({
  email: z.string().email().optional(),
  phone: z.string().min(7).max(20).optional(),
  password: z.string().min(10).max(128),
  displayName: z.string().min(2).max(100),
  role: z.enum(bunkRoles),
  acceptedTerms: z.literal(true),
  acceptedPrivacy: z.literal(true)
}).refine((value) => Boolean(value.email || value.phone), {
  message: "Email or phone is required.",
  path: ["email"]
});

export const loginSchema = z.object({
  identifier: z.string().min(3),
  password: z.string().min(1),
  rememberDevice: z.boolean().default(false)
});

export const otpRequestSchema = z.object({
  channel: z.enum(["email", "sms"]),
  destination: z.string().min(3),
  purpose: z.enum(["sign_in", "verify_identity", "sensitive_action", "password_reset"])
});

export const otpVerifySchema = z.object({
  destination: z.string().min(3),
  token: z.string().min(4).max(10),
  purpose: z.enum(["sign_in", "verify_identity", "sensitive_action", "password_reset"])
});

export const activeRoleSchema = z.object({
  role: z.enum(bunkRoles)
});

export const profilePatchSchema = z.object({
  displayName: z.string().min(2).max(100).optional(),
  phone: z.string().min(7).max(20).optional(),
  activeRole: z.enum(bunkRoles).optional(),
  locale: z.string().max(20).optional(),
  timezone: z.string().max(80).optional()
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
