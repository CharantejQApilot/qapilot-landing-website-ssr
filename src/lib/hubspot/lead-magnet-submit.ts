import type { LeadMagnetEmailWithAttributionInput } from "@/lib/forms/lead-magnet-email";
import { ATTRIBUTION_PAYLOAD_FIELD_NAMES } from "@/lib/attribution";

const hubspotSubmitUrl = (portalId: string, formGuid: string) =>
  `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`;

export function leadMagnetHubSpotPayload(data: LeadMagnetEmailWithAttributionInput) {
  const fields: { name: string; value: string }[] = [
    { name: "email", value: data.email },
  ];

  for (const key of ATTRIBUTION_PAYLOAD_FIELD_NAMES) {
    const v = data[key as keyof LeadMagnetEmailWithAttributionInput];
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

export async function submitLeadMagnetEmailToHubSpot(
  portalId: string,
  formGuid: string,
  data: LeadMagnetEmailWithAttributionInput,
): Promise<Response> {
  return fetch(hubspotSubmitUrl(portalId, formGuid), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(leadMagnetHubSpotPayload(data)),
  });
}
