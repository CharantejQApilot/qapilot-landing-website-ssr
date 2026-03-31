import { NextResponse } from "next/server";
import { marketingLeadSchema } from "@/lib/forms/marketing-lead";
import { submitMarketingLeadToHubSpot } from "@/lib/hubspot/marketing-lead-submit";
import { HUBSPOT_MAIN_GET_ACCESS_FORM_ID, HUBSPOT_NA1_PORTAL_ID } from "@/lib/constants";

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = marketingLeadSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", fields: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const portalId = process.env.HUBSPOT_PORTAL_ID ?? HUBSPOT_NA1_PORTAL_ID;
  const formGuid = process.env.HUBSPOT_MAIN_GET_ACCESS_FORM_GUID ?? HUBSPOT_MAIN_GET_ACCESS_FORM_ID;

  const res = await submitMarketingLeadToHubSpot(portalId, formGuid, parsed.data);

  if (!res.ok) {
    let detail: string | undefined;
    try {
      const errBody = (await res.json()) as { message?: string; errors?: unknown };
      detail = errBody.message ?? (errBody.errors ? JSON.stringify(errBody.errors) : undefined);
    } catch {
      /* ignore */
    }
    return NextResponse.json(
      { error: "HubSpot rejected the submission", detail },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
