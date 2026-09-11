import type { Metadata } from "next";
import {
  McpCompatibilityBand,
  McpDifferentiatorsSection,
  McpFaqSection,
  McpGapSection,
  McpHero,
  McpPrinciplesSection,
  McpProblemOutcomeSection,
  McpRoadmapSection,
  McpScopeSection,
  McpStepsSection,
  McpWorkflowSection,
} from "@/components/mcp";
import { HashScrollOnMount } from "@/components/marketing/HashScrollOnMount";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import { buildFaqPageJsonLd } from "@/lib/faq-jsonld";
import { MCP_FAQS } from "@/lib/mcp-page";
import { PATHS } from "@/lib/routes";
import { buildStaticPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildStaticPageMetadata({
  title: "QApilot MCP. Mobile Tests for Coding Agents",
  description:
    "Say what needs to hold in your editor. QApilot MCP builds the mobile test, runs it on your device, and returns a report your agent can read.",
  path: PATHS.MCP,
  ogDescription:
    "Local-first mobile verification for coding agents. Follow the guide or request a walkthrough.",
  twitterDescription:
    "Your coding agent writes mobile code faster than anyone can check it. QApilot MCP checks it on your device.",
});

export const revalidate = 300;

export default function McpWaitlistPage() {
  return (
    <div className="relative z-0 min-h-screen w-full section-edge home-canvas">
      <HashScrollOnMount />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildBreadcrumbList([
              { name: "Home", path: PATHS.HOME },
              { name: "Platform overview", path: PATHS.PRODUCT },
              { name: "QApilot MCP", path: PATHS.MCP },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildFaqPageJsonLd(MCP_FAQS)),
        }}
      />
      <main>
        <McpHero />
        <McpCompatibilityBand />
        <McpGapSection />
        <McpProblemOutcomeSection />
        <McpStepsSection />
        <McpWorkflowSection />
        <McpDifferentiatorsSection />
        <McpPrinciplesSection />
        <McpRoadmapSection />
        <McpScopeSection />
        <McpFaqSection />
      </main>
    </div>
  );
}
