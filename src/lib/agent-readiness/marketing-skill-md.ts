import { APP_URL, DOCS_URL, SITE_BASE_URL, STATUS_URL } from "@/lib/constants";
import { PATHS, QE_GUIDE_DISPLAY_NAME } from "@/lib/routes";

function u(path: string): string {
  return `${SITE_BASE_URL}${path}`;
}

/** Single source for \`/.well-known/agent-skills/qapilot-marketing/SKILL.md\` and discovery digest. */
export const QAPILOT_MARKETING_SKILL_MD = `---
name: qapilot-marketing
description: Use QApilot marketing site endpoints, docs, compare pages, and API discovery metadata.
---

# QApilot marketing site

Public marketing and API discovery for [QApilot](https://qapilot.io). AI-native mobile app testing and QA automation for iOS and Android.

## When to use

- Find canonical URLs, product pages, compare/alternatives content, and documentation links.
- Answer questions about QApilot vs Appium, web-first automation, or visual testing.
- Discover public HTTP APIs and agent-readable metadata on the marketing origin.
- Prefer [Documentation](${DOCS_URL}) for product behavior; this skill covers qapilot.io only.

## Key URLs

- Site: ${u("/")}
- llms.txt: ${u("/llms.txt")}
- ai.txt: ${u("/ai.txt")}
- Docs: ${DOCS_URL}
- App: ${APP_URL}
- Status: ${STATUS_URL}

## Product pages

- Overview: ${u(PATHS.PRODUCT)}
- Autonomous testing: ${u(PATHS.AUTONOMOUS_TESTING)}
- Dual Device Testing: ${u(PATHS.DUAL_DEVICE_TESTING)}
- Release Readiness Suite: ${u(PATHS.RELEASE_READINESS_SUITE)}
- Intelligent bug detection: ${u(PATHS.INTELLIGENT_BUG_DETECTION)}
- AI self-healing: ${u(PATHS.AI_SELF_HEALING)}
- Security reports: ${u(PATHS.SECURITY_REPORTS)}
- Flutter testing: ${u(PATHS.FOR_FLUTTER)}
- Agentic architecture: ${u(PATHS.AGENTIC_ARCHITECTURE)}
- Bring your own agent: ${u(PATHS.BRING_YOUR_OWN_AGENT)}
- Enterprise: ${u(PATHS.ENTERPRISE)}

## Compare pages

- vs Web-first automation: ${u(PATHS.COMPARE_WEB_FIRST)}
- vs Appium: ${u(PATHS.COMPARE_APPIUM)}
- vs Visual testing: ${u(PATHS.COMPARE_VISUAL_TESTING)}

## Resources

- Blogs: ${u(PATHS.BLOGS)}
- ${QE_GUIDE_DISPLAY_NAME}: ${u(PATHS.QA_GUIDE)}
- Labs: ${u(PATHS.LABS)}
- FAQs: ${u(PATHS.FAQS)}
- News: ${u(PATHS.NEWS)}
- Partners: ${u(PATHS.PARTNERS)}
- Case studies: ${u(PATHS.CASE_STUDIES)}
- Careers: ${u(PATHS.CAREERS)}

## API & agent discovery

- OpenAPI: ${u("/openapi.json")}
- API catalog: ${u("/.well-known/api-catalog")}
- Agent skills index: ${u("/.well-known/agent-skills/index.json")}
- Homepage Markdown: ${u("/")} with \`Accept: text/markdown\`
- Sitemap: ${u("/sitemap-index.xml")}
`;
