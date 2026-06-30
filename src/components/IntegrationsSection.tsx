import { marketingSectionH2Class } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";
import { PATHS } from "@/lib/routes";
import Link from "next/link";
import { PARTNER_LOGOS_PATH_PREFIX } from "@/lib/seo";
import { IntegrationsMarqueeDesktop } from "@/components/integrations/IntegrationsMarqueeDesktop";

const integrations = [
  { name: "TestRail", logo: `${PARTNER_LOGOS_PATH_PREFIX}962197a9-5e99-40b8-8f8c-794b50520d5e.png` },
  { name: "Jira", logo: `${PARTNER_LOGOS_PATH_PREFIX}jira-software-logo.png` },
  { name: "Teams", logo: `${PARTNER_LOGOS_PATH_PREFIX}bcb4526d-637b-49ba-a92d-b437d33a0516.png` },
  { name: "Slack", logo: `${PARTNER_LOGOS_PATH_PREFIX}f9ca9bd8-d74c-4852-8fa6-34c1be76aea3.png` },
  { name: "BrowserStack", logo: `${PARTNER_LOGOS_PATH_PREFIX}445698aa-1a01-42ef-9a78-96903c80c41f.png` },
  { name: "LambdaTest", logo: `${PARTNER_LOGOS_PATH_PREFIX}9f5ef4eb-33b0-4852-a38a-61a25aaebe56.png` },
  { name: "Sauce Labs", logo: `${PARTNER_LOGOS_PATH_PREFIX}e9abab36-d809-4b15-8fd2-134b7e1d473e.png` },
  { name: "Jenkins", logo: `${PARTNER_LOGOS_PATH_PREFIX}7cbcd4d0-466c-4693-8d02-87a5f30f712b.png` },
  { name: "Integration Tool", logo: `${PARTNER_LOGOS_PATH_PREFIX}70464805.png` },
  { name: "Development Platform", logo: `${PARTNER_LOGOS_PATH_PREFIX}cropped-MicrosoftTeams-image-5-1.png` },
  { name: "XRAY", logo: `${PARTNER_LOGOS_PATH_PREFIX}k3huxfe9vfbic6vuvurwtsvu5ggz.png` },
];

function IntegrationTile({ compact }: { compact?: boolean }) {
  return (
    <>
      {integrations.map((integration) => (
        <div
          key={integration.name}
          className={cn(
            "flex items-center justify-center rounded-xl border border-border bg-background",
            compact
              ? "h-[4.5rem] p-3"
              : "h-24 w-36 flex-shrink-0 p-4 sm:h-28 sm:w-44 lg:h-32 lg:w-52 lg:p-6 2xl:h-36 2xl:w-60 2xl:p-8",
          )}
        >
          <img
            src={integration.logo}
            alt={`${integration.name} integration with QApilot`}
            width={80}
            height={64}
            loading="lazy"
            decoding="async"
            className="object-contain"
            style={{
              maxWidth: compact ? "64px" : "80px",
              maxHeight: compact ? "48px" : "64px",
            }}
          />
        </div>
      ))}
    </>
  );
}

function IntegrationRow() {
  return (
    <div className="flex items-center gap-6 pr-6">
      <IntegrationTile />
    </div>
  );
}

const IntegrationsSection = () => {
  return (
    <section className="relative overflow-hidden border-t border-border bg-background section-edge w-full pt-7 md:pt-[2.45rem] 2xl:pt-[2.8rem]">
      <div className="section-navy w-full">
        <div className="section-full relative py-8 sm:py-10 md:py-12 2xl:py-16">
          <div className="absolute inset-0 bg-structured-grid opacity-10 pointer-events-none" aria-hidden />
          <p className="relative z-10 mb-3 text-center text-xs font-semibold uppercase tracking-[0.22em] text-primary-foreground/60 md:mb-4">
            Ecosystem
          </p>
          <h2
            id="integrations-heading"
            className={cn(marketingSectionH2Class, "relative z-10 mb-4 px-3 text-center md:mb-5")}
          >
            Works With Your Existing Testing Stack
          </h2>
          <p className="relative z-10 mx-auto w-full min-w-0 max-w-none px-3 text-center text-base leading-relaxed md:text-lg 2xl:text-xl">
            Connect QApilot with the tools your team already uses for planning, communication, and device execution.
          </p>
        </div>
      </div>

      <div className="relative section-cream overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-dot-pattern-subtle" aria-hidden />

        <div className="relative z-10 py-12 md:py-16 2xl:py-20">
          {/* Mobile: static grid — no animation, single set of logos */}
          <div
            className="section-full grid grid-cols-2 gap-3 px-4 xs:grid-cols-3 sm:gap-4 md:hidden"
            aria-label="Integration partners"
          >
            <IntegrationTile compact />
          </div>

          {/* Desktop: infinite scroll marquee — animation starts when near viewport */}
          <IntegrationsMarqueeDesktop>
            <IntegrationRow />
          </IntegrationsMarqueeDesktop>

          <div className="section-full mt-12 text-center md:mt-14">
            <p className="text-sm text-muted-foreground/60 2xl:text-base">
              And many more... QApilot integrates with your entire testing ecosystem.{" "}
              <Link href={PATHS.INTEGRATIONS} className="font-medium text-primary hover:underline">
                See all integrations
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationsSection;
