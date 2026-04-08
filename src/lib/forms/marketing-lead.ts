import { z } from "zod";
import { ATTRIBUTION_PAYLOAD_FIELD_NAMES } from "@/lib/attribution";

/** CRM values for HubSpot contact property `designation` (main + Flutter marketing forms). */
export const MARKETING_LEAD_DESIGNATIONS = [
  "Developer",
  "QA Analyst / Tester",
  "Automation Specialist",
  "Quality Engineer",
  "Team Lead / Manager",
  "Director / VP / CTO",
  "Independent / Consultant",
  "Others",
] as const;

export type MarketingLeadDesignation = (typeof MARKETING_LEAD_DESIGNATIONS)[number];

function phoneHasValidLength(raw: string): boolean {
  const digits = raw.replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15;
}

export const marketingLeadSchema = z.object({
  firstname: z
    .string()
    .trim()
    .min(1, "Full name is required")
    .max(100, "Name must be less than 100 characters"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters"),
  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .refine(phoneHasValidLength, "Please enter a valid phone number"),
  company: z
    .string()
    .trim()
    .min(1, "Company name is required")
    .max(100, "Company name must be less than 100 characters"),
  designation: z.enum(MARKETING_LEAD_DESIGNATIONS, {
    errorMap: () => ({ message: "Please select a designation" }),
  }),
  pageUri: z.string().trim().max(2000).optional(),
  pageName: z.string().trim().max(500).optional(),
  hutk: z.string().trim().max(200).optional(),
});

export type MarketingLeadInput = z.infer<typeof marketingLeadSchema>;

const attributionFieldShape = Object.fromEntries(
  ATTRIBUTION_PAYLOAD_FIELD_NAMES.map((name) => [
    name,
    z.string().trim().max(4000).optional(),
  ]),
) as Record<string, z.ZodOptional<z.ZodString>>;

/** Core lead fields plus optional HubSpot attribution properties (only non-empty sent from client). */
export const marketingLeadWithAttributionSchema = marketingLeadSchema.merge(
  z.object(attributionFieldShape),
);

export type MarketingLeadWithAttributionInput = z.infer<
  typeof marketingLeadWithAttributionSchema
>;
