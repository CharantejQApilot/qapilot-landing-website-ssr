import { APP_URL, DOCS_URL, SITE_BASE_URL, STATUS_URL } from "@/lib/constants";
import { HOME_PAGE_DESCRIPTION, HOME_PAGE_TITLE } from "@/lib/home-page-seo";
import { PATHS, QE_GUIDE_DISPLAY_NAME } from "@/lib/routes";

function url(path: string): string {
  return `${SITE_BASE_URL}${path}`;
}

/** Markdown representation of the homepage for `Accept: text/markdown` (Markdown for Agents). */
export function getHomePageMarkdown(): string {
  return `# ${HOME_PAGE_TITLE}

${HOME_PAGE_DESCRIPTION}

QApilot is an AI-native autonomous mobile app testing platform for iOS and Android. It discovers app journeys, generates and executes tests, self-heals UI changes, detects bugs and accessibility issues, and surfaces security and release-readiness signals. Without manual scripting.

## Canonical URL

${url("/")}

## Product

| Page | URL |
|------|-----|
| Platform overview | ${url(PATHS.PRODUCT)} |
| Autonomous testing | ${url(PATHS.AUTONOMOUS_TESTING)} |
| Dual Device Testing | ${url(PATHS.DUAL_DEVICE_TESTING)} |
| Release Readiness Suite | ${url(PATHS.RELEASE_READINESS_SUITE)} |
| Intelligent bug detection | ${url(PATHS.INTELLIGENT_BUG_DETECTION)} |
| AI self-healing | ${url(PATHS.AI_SELF_HEALING)} |
| Security reports | ${url(PATHS.SECURITY_REPORTS)} |
| Flutter testing | ${url(PATHS.FOR_FLUTTER)} |
| Agentic architecture | ${url(PATHS.AGENTIC_ARCHITECTURE)} |
| Bring your own agent | ${url(PATHS.BRING_YOUR_OWN_AGENT)} |
| Enterprise | ${url(PATHS.ENTERPRISE)} |

## Platform by role

| Role | URL |
|------|-----|
| QE Leader | ${url(PATHS.FOR_QA_LEADER)} |
| Release Manager | ${url(PATHS.FOR_RELEASE_MANAGER)} |
| Quality Assurance Engineer | ${url(PATHS.FOR_QA_ENGINEER)} |
| Product Manager | ${url(PATHS.FOR_PRODUCT_OWNER)} |
| Site Reliability Engineer | ${url(PATHS.FOR_SRE)} |

## Compare (alternatives)

| Comparison | URL |
|------------|-----|
| vs Web-first automation tools | ${url(PATHS.COMPARE_WEB_FIRST)} |
| vs Appium | ${url(PATHS.COMPARE_APPIUM)} |
| vs Visual testing tools | ${url(PATHS.COMPARE_VISUAL_TESTING)} |
| vs Testsigma | ${url(PATHS.COMPARE_TESTSIGMA)} |
| vs Maestro | ${url(PATHS.COMPARE_MAESTRO)} |
| BrowserStack alternative | ${url(PATHS.ALTERNATIVES_BROWSERSTACK)} |
| Sauce Labs alternative | ${url(PATHS.ALTERNATIVES_SAUCE_LABS)} |

## Integrations

| Page | URL |
|------|-----|
| Integrations hub | ${url(PATHS.INTEGRATIONS)} |

## Resources

| Resource | URL |
|----------|-----|
| Blogs | ${url(PATHS.BLOGS)} |
| ${QE_GUIDE_DISPLAY_NAME} | ${url(PATHS.QA_GUIDE)} |
| Labs | ${url(PATHS.LABS)} |
| FAQs | ${url(PATHS.FAQS)} |
| News | ${url(PATHS.NEWS)} |
| Events | ${url(PATHS.EVENTS)} |
| Partners | ${url(PATHS.PARTNERS)} |
| Case studies | ${url(PATHS.CASE_STUDIES)} |
| About | ${url(PATHS.ABOUT)} |
| Careers | ${url(PATHS.CAREERS)} |

## External services

| Resource | URL |
|----------|-----|
| Documentation | ${DOCS_URL} |
| Product app | ${APP_URL} |
| Status | ${STATUS_URL} |

## Agent & API discovery

| Resource | URL |
|----------|-----|
| llms.txt | ${url("/llms.txt")} |
| ai.txt | ${url("/ai.txt")} |
| OpenAPI | ${url("/openapi.json")} |
| API catalog (RFC 9727) | ${url("/.well-known/api-catalog")} |
| Agent skills index | ${url("/.well-known/agent-skills/index.json")} |
| Sitemap index | ${url("/sitemap-index.xml")} |
| Robots | ${url("/robots.txt")} |
`;
}
