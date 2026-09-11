import type { Metadata } from "next";
import Link from "next/link";
import { HashScrollOnMount } from "@/components/marketing/HashScrollOnMount";
import {
  MarketingCloseCta,
  MarketingPageShell,
  MarketingSection,
  MarketingThesisHero,
} from "@/components/marketing";
import { McpGuideBody } from "@/components/mcp-guide";
import { McpGuideInstallSlider } from "@/components/mcp-guide/McpGuideInstallSlider";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import {
  buildMcpGuideJsonLd,
  MCP_GUIDE_CHIPS,
  MCP_GUIDE_DESCRIPTION,
  MCP_GUIDE_TITLE,
} from "@/lib/mcp-guide";
import { PATHS } from "@/lib/routes";
import { buildStaticPageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

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

const CHIP_DOT: Record<(typeof MCP_GUIDE_CHIPS)[number]["tone"], string> = {
  blue: "bg-primary",
  green: "bg-emerald-500",
  amber: "bg-orange",
};

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
        <div id="overview" data-guide-section="overview" className="scroll-mt-8">
          <MarketingThesisHero
            titleId="mcp-guide-hero"
            eyebrow="AI-Native Android Automation"
            title={
              <>
                QApilot <span className="text-hero-here">MCP CLI</span>
                <br />
                User Guide
              </>
            }
            paddingClassName="py-12 sm:py-16 md:py-20 lg:py-24"
            lead="Automate real Android devices and emulators by talking to Claude, Cursor, or any MCP-compatible AI client. Describe test flows in plain English — no Appium code required."
            cta={<McpGuideInstallSlider />}
          >
            <div className="mb-8 flex flex-wrap gap-2 sm:mb-10">
              {MCP_GUIDE_CHIPS.map((chip) => (
                <span
                  key={chip.label}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-sm",
                  )}
                >
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      CHIP_DOT[chip.tone],
                    )}
                    aria-hidden
                  />
                  {chip.label}
                </span>
              ))}
            </div>
          </MarketingThesisHero>
        </div>

        <MarketingSection
          surface="canvas"
          paddingClassName="py-10 md:py-14 lg:pb-20"
          aria-label="MCP CLI guide"
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
          lead="Join the QApilot MCP early access list. Local device, your agent, a report it can read."
          cta={
            <Link
              href={PATHS.MCP}
              className="inline-flex h-12 items-center justify-center rounded-md bg-white px-8 text-base font-semibold text-[hsl(var(--navy))] hover:bg-white/90 sm:h-14 sm:px-9 lg:text-lg"
            >
              Request Access
            </Link>
          }
        />
      </main>
    </MarketingPageShell>
  );
}
