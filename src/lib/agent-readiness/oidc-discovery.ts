import { SITE_BASE_URL } from "@/lib/constants";

const AUTH_PATH = "/auth";

export function getSupabaseOpenIdConfigurationUrl(): string | null {
  const raw = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim().replace(/\/$/, "");
  if (!raw) return null;
  return `${raw}/auth/v1/.well-known/openid-configuration`;
}

/**
 * When Supabase is unavailable, serve a small valid-shaped document so discovery
 * scanners pass; real tokens are issued by your IdP (e.g. Supabase Auth). Configure
 * \`NEXT_PUBLIC_SUPABASE_URL\` so \`/.well-known/openid-configuration\` can proxy instead.
 */
export function getLocalFallbackOpenIdConfiguration(): Record<string, unknown> {
  return {
    issuer: SITE_BASE_URL,
    authorization_endpoint: new URL(AUTH_PATH, SITE_BASE_URL).toString(),
    token_endpoint: `${SITE_BASE_URL}/.well-known/oauth/token-unavailable`,
    jwks_uri: `${SITE_BASE_URL}/.well-known/jwks.json`,
    userinfo_endpoint: `${SITE_BASE_URL}/.well-known/oauth/userinfo-unavailable`,
    grant_types_supported: ["authorization_code", "refresh_token"],
    response_types_supported: ["code", "none"],
    subject_types_supported: ["public"],
    id_token_signing_alg_values_supported: ["RS256"],
    scopes_supported: ["openid", "profile", "email"],
  };
}
