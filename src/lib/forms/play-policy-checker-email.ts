import { z } from "zod";
import { ATTRIBUTION_PAYLOAD_FIELD_NAMES } from "@/lib/attribution";

/** Any email. Indie and Product Hunt visitors often use a personal inbox. */
export const playPolicyEmailSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters"),
  pageUri: z.string().trim().max(2000).optional(),
  hutk: z.string().trim().max(200).optional(),
});

const attributionFieldShape = Object.fromEntries(
  ATTRIBUTION_PAYLOAD_FIELD_NAMES.map((name) => [
    name,
    z.string().trim().max(4000).optional(),
  ]),
) as Record<string, z.ZodOptional<z.ZodString>>;

export const playPolicyEmailWithAttributionSchema = playPolicyEmailSchema.merge(
  z.object(attributionFieldShape),
);

export type PlayPolicyEmailWithAttributionInput = z.infer<
  typeof playPolicyEmailWithAttributionSchema
>;

export const playPolicyEmailClientSchema = playPolicyEmailSchema.pick({
  email: true,
});
