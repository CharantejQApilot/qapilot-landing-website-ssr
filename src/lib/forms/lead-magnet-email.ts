import { z } from "zod";
import { ATTRIBUTION_PAYLOAD_FIELD_NAMES } from "@/lib/attribution";

/** Email-only lead capture for downloadable content / gated actions (HubSpot lead magnet forms). */
export const leadMagnetEmailSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters"),
  pageUri: z.string().trim().max(2000).optional(),
  pageName: z.string().trim().max(500).optional(),
  hutk: z.string().trim().max(200).optional(),
});

export type LeadMagnetEmailInput = z.infer<typeof leadMagnetEmailSchema>;

const attributionFieldShape = Object.fromEntries(
  ATTRIBUTION_PAYLOAD_FIELD_NAMES.map((name) => [
    name,
    z.string().trim().max(4000).optional(),
  ]),
) as Record<string, z.ZodOptional<z.ZodString>>;

export const leadMagnetEmailWithAttributionSchema = leadMagnetEmailSchema.merge(
  z.object(attributionFieldShape),
);

export type LeadMagnetEmailWithAttributionInput = z.infer<
  typeof leadMagnetEmailWithAttributionSchema
>;

/** Client-side validation (email only). */
export const leadMagnetEmailClientSchema = leadMagnetEmailSchema.pick({ email: true });
