/**
 * HubSpot field names for the MCP early-access form.
 * Embed: portal `47284450`, form `25c6b568-c68d-44d5-9f6a-4ce78aab6842`.
 *
 * Visible on `/mcp` hero UI; attribution properties are hidden and filled on submit.
 */
export const MCP_WAITLIST_HUBSPOT_AGENT_PROPERTY =
  "span_style__background_color__rgba_249__249__251__0_7___font_weight__500__color___151923__font_size";

export const MCP_WAITLIST_HUBSPOT_FIELDS = {
  email: "email",
  phone: "phone",
  company: "company",
  agent: MCP_WAITLIST_HUBSPOT_AGENT_PROPERTY,
  framework: "framework",
} as const;

export const MCP_WAITLIST_HUBSPOT_FIELD_NAMES = Object.values(
  MCP_WAITLIST_HUBSPOT_FIELDS,
);
