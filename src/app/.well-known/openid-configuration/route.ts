import { NextResponse } from "next/server";
import {
  getLocalFallbackOpenIdConfiguration,
  getSupabaseOpenIdConfigurationUrl,
} from "@/lib/agent-readiness/oidc-discovery";

export async function GET() {
  const upstream = getSupabaseOpenIdConfigurationUrl();
  if (upstream) {
    try {
      const res = await fetch(upstream, { next: { revalidate: 3600 } });
      if (res.ok) {
        const body = await res.text();
        return new NextResponse(body, {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "public, max-age=3600",
          },
        });
      }
    } catch {
      /* fall through */
    }
  }

  return NextResponse.json(getLocalFallbackOpenIdConfiguration(), {
    headers: { "Cache-Control": "public, max-age=3600" },
  });
}
