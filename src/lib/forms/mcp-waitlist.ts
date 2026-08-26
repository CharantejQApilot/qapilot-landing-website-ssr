import { z } from "zod";
import { ATTRIBUTION_PAYLOAD_FIELD_NAMES } from "@/lib/attribution";
import { MCP_AGENTS, MCP_FRAMEWORKS } from "@/lib/mcp-page";
import { isWorkEmail, WORK_EMAIL_ERROR } from "@/lib/forms/work-email";

function phoneHasValidLength(raw: string): boolean {
  const digits = raw.replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15;
}

export const mcpWaitlistSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Work email is required")
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters")
    .refine(isWorkEmail, WORK_EMAIL_ERROR),
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
  agent: z.enum(MCP_AGENTS, {
    errorMap: () => ({ message: "Please select the agent you use" }),
  }),
  framework: z.enum(MCP_FRAMEWORKS, {
    errorMap: () => ({ message: "Please select what your app is built in" }),
  }),
  pageUri: z.string().trim().max(2000).optional(),
  pageName: z.string().trim().max(500).optional(),
  hutk: z.string().trim().max(200).optional(),
});

export type McpWaitlistInput = z.infer<typeof mcpWaitlistSchema>;

const attributionFieldShape = Object.fromEntries(
  ATTRIBUTION_PAYLOAD_FIELD_NAMES.map((name) => [
    name,
    z.string().trim().max(4000).optional(),
  ]),
) as Record<string, z.ZodOptional<z.ZodString>>;

export const mcpWaitlistWithAttributionSchema = mcpWaitlistSchema.merge(
  z.object(attributionFieldShape),
);

export type McpWaitlistWithAttributionInput = z.infer<
  typeof mcpWaitlistWithAttributionSchema
>;

export const mcpWaitlistClientSchema = mcpWaitlistSchema.pick({
  email: true,
  phone: true,
  company: true,
  agent: true,
  framework: true,
});
