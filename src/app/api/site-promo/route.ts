import { NextResponse } from "next/server";
import { fetchSitePromoBanner } from "@/lib/site-promo-banner";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const payload = await fetchSitePromoBanner();
    return NextResponse.json(payload);
  } catch {
    return NextResponse.json(null);
  }
}
