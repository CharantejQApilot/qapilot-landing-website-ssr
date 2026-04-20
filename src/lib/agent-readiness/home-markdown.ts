import { APP_URL, DOCS_URL, SITE_BASE_URL, STATUS_URL } from "@/lib/constants";
import { HOME_PAGE_DESCRIPTION, HOME_PAGE_TITLE } from "@/lib/home-page-seo";

/** Markdown representation of the homepage for `Accept: text/markdown` (Markdown for Agents). */
export function getHomePageMarkdown(): string {
  return `# ${HOME_PAGE_TITLE}

${HOME_PAGE_DESCRIPTION}

## Canonical URL

${SITE_BASE_URL}/

## Useful links

| Resource | URL |
|----------|-----|
| Documentation | ${DOCS_URL} |
| Product app | ${APP_URL} |
| Status | ${STATUS_URL} |
| API catalog (RFC 9727) | ${SITE_BASE_URL}/.well-known/api-catalog |
| OpenAPI | ${SITE_BASE_URL}/openapi.json |
| Agent skills index | ${SITE_BASE_URL}/.well-known/agent-skills/index.json |
`;
}
