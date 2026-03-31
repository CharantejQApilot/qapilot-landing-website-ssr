import type { MarketingLeadInput } from "@/lib/forms/marketing-lead";

const hubspotSubmitUrl = (portalId: string, formGuid: string) =>
  `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`;

export function marketingLeadHubSpotPayload(data: MarketingLeadInput) {
  return {
    fields: [
      { name: "firstname", value: data.firstname },
      { name: "email", value: data.email },
      { name: "phone", value: data.phone },
      { name: "company", value: data.company },
      { name: "designation", value: data.designation },
    ],
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
  data: MarketingLeadInput,
): Promise<Response> {
  return fetch(hubspotSubmitUrl(portalId, formGuid), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(marketingLeadHubSpotPayload(data)),
  });
}
