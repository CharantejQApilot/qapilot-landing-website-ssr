import type { McpWaitlistWithAttributionInput } from "@/lib/forms/mcp-waitlist";
import { ATTRIBUTION_PAYLOAD_FIELD_NAMES } from "@/lib/attribution";
import { MCP_WAITLIST_HUBSPOT_FIELDS } from "@/lib/hubspot/mcp-waitlist-fields";

const hubspotSubmitUrl = (portalId: string, formGuid: string) =>
  `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`;

export function mcpWaitlistHubSpotPayload(data: McpWaitlistWithAttributionInput) {
  const fields: { name: string; value: string }[] = [
    { name: MCP_WAITLIST_HUBSPOT_FIELDS.email, value: data.email },
    { name: MCP_WAITLIST_HUBSPOT_FIELDS.phone, value: data.phone },
    { name: MCP_WAITLIST_HUBSPOT_FIELDS.company, value: data.company },
    { name: MCP_WAITLIST_HUBSPOT_FIELDS.agent, value: data.agent },
    { name: MCP_WAITLIST_HUBSPOT_FIELDS.framework, value: data.framework },
  ];

  for (const key of ATTRIBUTION_PAYLOAD_FIELD_NAMES) {
    const v = data[key as keyof McpWaitlistWithAttributionInput];
    if (typeof v === "string" && v.trim() !== "") {
      fields.push({ name: key, value: v.trim() });
    }
  }

  return {
    fields,
    context: {
      pageUri: data.pageUri ?? "",
      pageName: data.pageName?.trim() || "QApilot MCP. Early Access",
      ...(data.hutk ? { hutk: data.hutk } : {}),
    },
  };
}

export async function submitMcpWaitlistToHubSpot(
  portalId: string,
  formGuid: string,
  data: McpWaitlistWithAttributionInput,
): Promise<Response> {
  return fetch(hubspotSubmitUrl(portalId, formGuid), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(mcpWaitlistHubSpotPayload(data)),
  });
}
