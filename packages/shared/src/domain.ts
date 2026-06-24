import { z } from "zod";

export const verificationStates = ["unsubmitted","submitted","pending","partially_verified","verified","expired","rejected","disputed","suspended","archived"] as const;
export const occupancyStates = ["vacant","reserved","inspection_pending","offer_pending","occupied","notice_issued","renewal_pending","maintenance_hold","off_market"] as const;
export const riskStates = ["low","moderate","high","critical","unknown"] as const;

export const propertySchema = z.object({
  id: z.string().uuid(),
  publicReference: z.string().regex(/^BUNK-PROP-[0-9]{6,}$/),
  slug: z.string().min(3),
  name: z.string().min(2),
  propertyType: z.string().min(2),
  description: z.string().min(20),
  countryCode: z.string().length(2).default("NG"),
  state: z.string(),
  city: z.string(),
  district: z.string().optional(),
  neighbourhood: z.string().optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  verificationState: z.enum(verificationStates),
  occupancyState: z.enum(occupancyStates),
  riskState: z.enum(riskStates),
  publicVisibility: z.boolean().default(false),
  rootReference: z.string().uuid(),
  organizationId: z.string().uuid().optional()
});

export const listingSchema = z.object({
  id: z.string().uuid(),
  publicReference: z.string().regex(/^BUNK-LIST-[0-9]{6,}$/),
  propertyId: z.string().uuid(),
  unitId: z.string().uuid().optional(),
  listingType: z.enum(["rent","sale","shortlet","commercial_lease","rent_to_own","off_plan","joint_investment","pooled_investment","auction","wanted"]),
  headline: z.string().min(8),
  description: z.string().min(30),
  priceMinor: z.number().int().nonnegative(),
  currency: z.string().length(3).default("NGN"),
  billingFrequency: z.string().optional(),
  status: z.enum(["draft","awaiting_information","awaiting_verification","awaiting_human_approval","published","paused","reserved","closed","rejected","suspended","archived"]),
  verificationState: z.enum(verificationStates),
  authorityProofId: z.string().uuid().optional(),
  sealDecisionId: z.string().uuid().optional()
});

export const sealDecisionSchema = z.object({
  id: z.string().uuid(),
  requestId: z.string().uuid(),
  humanDecisionMakerId: z.string().uuid(),
  decision: z.enum(["approved","rejected","amended","revoked"]),
  scope: z.record(z.string(), z.unknown()),
  reason: z.string().min(3),
  evidenceReviewed: z.array(z.string().uuid()),
  validFrom: z.string().datetime(),
  validUntil: z.string().datetime().optional()
});

export type PropertyInput = z.infer<typeof propertySchema>;
export type ListingInput = z.infer<typeof listingSchema>;
