import { NextResponse } from "next/server";
import { SITE_BASE_URL } from "@/lib/constants";
import { getLocalFallbackOpenIdConfiguration } from "@/lib/agent-readiness/oidc-discovery";

const OAUTH_AS_SUBPATH = "/.well-known/oauth-authorization-server";

/**
 * OAuth 2.0 Authorization Server Metadata (RFC 8414). Supabase exposes this under
 * \`/auth/v1/.well-known/oauth-authorization-server\` relative to the project URL.
 */
export async function GET() {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim().replace(/\/$/, "");
  if (base) {
    const upstream = `${base}/auth/v1${OAUTH_AS_SUBPATH}`;
    try {
      const res = await fetch(upstream, { next: { revalidate: 3600 } });
      if (res.ok) {
        return new NextResponse(await res.text(), {
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

  const fb = getLocalFallbackOpenIdConfiguration();
  const doc = {
    issuer: SITE_BASE_URL,
    authorization_endpoint: String(fb.authorization_endpoint),
    token_endpoint: String(fb.token_endpoint),
    jwks_uri: String(fb.jwks_uri),
    registration_endpoint: `${SITE_BASE_URL}/.well-known/oauth/register-unavailable`,
    grant_types_supported: fb.grant_types_supported,
    response_types_supported: fb.response_types_supported,
    scopes_supported: fb.scopes_supported,
  };

  return NextResponse.json(doc, {
    headers: { "Cache-Control": "public, max-age=3600" },
  });
}
