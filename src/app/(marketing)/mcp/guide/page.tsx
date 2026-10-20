import type { Metadata } from "next";
import Link from "next/link";
import { HashScrollOnMount } from "@/components/marketing/HashScrollOnMount";
import {
  MarketingCloseCta,
  MarketingPageShell,
  MarketingSection,
} from "@/components/marketing";
import { McpGuideBody } from "@/components/mcp-guide";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import {
  buildMcpGuideJsonLd,
  MCP_GUIDE_DESCRIPTION,
  MCP_GUIDE_TITLE,
} from "@/lib/mcp-guide";
import { PATHS } from "@/lib/routes";
import { buildStaticPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildStaticPageMetadata({
  title: MCP_GUIDE_TITLE,
  description: MCP_GUIDE_DESCRIPTION,
  path: PATHS.MCP_GUIDE,
  ogDescription:
    "Install the QApilot MCP CLI, connect Claude, Cursor, or Codex, and automate Android tests in plain English.",
  twitterDescription:
    "Android automation through Claude, Cursor, or Codex. No Appium code required.",
});

export const revalidate = 300;

export default function McpGuidePage() {
  return (
    <MarketingPageShell>
      <HashScrollOnMount />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildBreadcrumbList([
              { name: "Home", path: PATHS.HOME },
              { name: "Platform overview", path: PATHS.PRODUCT },
              { name: "QApilot MCP", path: PATHS.MCP },
              { name: "MCP CLI Guide", path: PATHS.MCP_GUIDE },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildMcpGuideJsonLd()),
        }}
      />

      <main>
        <MarketingSection
          id="overview"
          surface="canvas"
          paddingClassName="py-10 md:py-14 lg:pb-20"
          aria-label="MCP CLI guide"
          className="scroll-mt-24"
        >
          <McpGuideBody />
        </MarketingSection>

        <MarketingCloseCta
          headingId="mcp-guide-close"
          title={
            <>
              Ready to run tests from{" "}
              <span className="text-hero-here">your editor</span>?
            </>
          }
          lead="Want a live walkthrough of MCP on your stack? We’ll set it up with you."
          cta={
            <Link
              href={PATHS.MCP}
              className="inline-flex h-12 items-center justify-center rounded-md bg-white px-8 text-base font-semibold text-[hsl(var(--navy))] hover:bg-white/90 sm:h-14 sm:px-9 lg:text-lg"
            >
              Request Walkthrough
            </Link>
          }
        />
      </main>
    </MarketingPageShell>
  );
}
