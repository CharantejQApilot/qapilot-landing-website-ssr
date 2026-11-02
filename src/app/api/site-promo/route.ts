import { NextResponse } from "next/server";
import { fetchSitePromoBanner } from "@/lib/site-promo-banner";

/** Fresh within a minute. Avoid Cache-Control: no-store so back/forward cache can keep the page. */
export const revalidate = 60;

export async function GET() {
  try {
    const payload = await fetchSitePromoBanner();
    return NextResponse.json(payload, {
      headers: {
        "Cache-Control": "private, no-cache, max-age=0, must-revalidate",
      },
    });
  } catch {
    return NextResponse.json(null, {
      headers: {
        "Cache-Control": "private, no-cache, max-age=0, must-revalidate",
      },
    });
  }
}
