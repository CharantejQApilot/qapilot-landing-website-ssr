import { NextResponse } from "next/server";
import { SITE_BASE_URL } from "@/lib/constants";
import { getSupabaseOpenIdConfigurationUrl } from "@/lib/agent-readiness/oidc-discovery";

/** RFC 9728 OAuth Protected Resource Metadata. */
export async function GET() {
  let authorizationServerIssuer = SITE_BASE_URL;

  const upstream = getSupabaseOpenIdConfigurationUrl();
  if (upstream) {
    try {
      const res = await fetch(upstream, { next: { revalidate: 3600 } });
      if (res.ok) {
        const doc = (await res.json()) as { issuer?: string };
        if (typeof doc.issuer === "string" && doc.issuer.length > 0) {
          authorizationServerIssuer = doc.issuer;
        }
      }
    } catch {
      /* keep default */
    }
  }

  return NextResponse.json(
    {
      resource: SITE_BASE_URL,
      authorization_servers: [authorizationServerIssuer],
      scopes_supported: ["openid", "profile", "email"],
    },
    {
      headers: { "Cache-Control": "public, max-age=3600" },
    },
  );
}
