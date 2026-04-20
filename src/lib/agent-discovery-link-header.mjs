/**
 * Agent discovery relations for the homepage `Link` header (RFC 8288, RFC 9727 §3).
 * Keep `SITE_BASE_URL` in sync with `src/lib/constants.ts` (`SITE_DOMAIN` / `SITE_BASE_URL`).
 */
const SITE_BASE_URL = "https://qapilot.io";
const DOCS_URL = "https://docs.qapilot.io";

export function buildAgentDiscoveryLinkHeader() {
  return [
    `<${SITE_BASE_URL}/.well-known/api-catalog>; rel="api-catalog"`,
    `<${SITE_BASE_URL}/openapi.json>; rel="service-desc"`,
    `<${DOCS_URL}/>; rel="service-doc"`,
    `<${SITE_BASE_URL}/.well-known/agent-skills/index.json>; rel="describedby"`,
  ].join(", ");
}
