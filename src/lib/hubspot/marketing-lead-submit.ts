import type { MarketingLeadWithAttributionInput } from "@/lib/forms/marketing-lead";
import { ATTRIBUTION_PAYLOAD_FIELD_NAMES } from "@/lib/attribution";

const hubspotSubmitUrl = (portalId: string, formGuid: string) =>
  `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`;

export function marketingLeadHubSpotPayload(data: MarketingLeadWithAttributionInput) {
  const fields: { name: string; value: string }[] = [
    { name: "firstname", value: data.firstname },
    { name: "email", value: data.email },
    { name: "phone", value: data.phone },
    { name: "company", value: data.company },
    { name: "designation", value: data.designation },
  ];

  for (const key of ATTRIBUTION_PAYLOAD_FIELD_NAMES) {
    const v = data[key as keyof MarketingLeadWithAttributionInput];
    if (typeof v === "string" && v.trim() !== "") {
      fields.push({ name: key, value: v.trim() });
    }
  }

  return {
    fields,
    context: {
      pageUri: data.pageUri ?? "",
      pageName: data.pageName ?? "",
      ...(data.hutk ? { hutk: data.hutk } : {}),
    },
  };
}

export async function submitMarketingLeadToHubSpot(
  portalId: string,
  formGuid: string,
  data: MarketingLeadWithAttributionInput,
): Promise<Response> {
  return fetch(hubspotSubmitUrl(portalId, formGuid), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(marketingLeadHubSpotPayload(data)),
  });
}
