import Image from "next/image";
import Link from "next/link";
import { marketingSectionH2Class } from "@/lib/marketing-typography";
import { PATHS } from "@/lib/routes";
import { PARTNER_LOGOS_PATH_PREFIX } from "@/lib/seo";
import { cn } from "@/lib/utils";

const integrations = [
  {
    name: "TestRail",
    logo: `${PARTNER_LOGOS_PATH_PREFIX}e9abab36-d809-4b15-8fd2-134b7e1d473e.png`,
  },
  { name: "Jira", logo: `${PARTNER_LOGOS_PATH_PREFIX}jira-software-logo.png` },
  {
    name: "Teams",
    logo: `${PARTNER_LOGOS_PATH_PREFIX}bcb4526d-637b-49ba-a92d-b437d33a0516.png`,
  },
  {
    name: "Slack",
    logo: `${PARTNER_LOGOS_PATH_PREFIX}f9ca9bd8-d74c-4852-8fa6-34c1be76aea3.png`,
  },
  {
    name: "BrowserStack",
    logo: `${PARTNER_LOGOS_PATH_PREFIX}962197a9-5e99-40b8-8f8c-794b50520d5e.png`,
  },
  {
    name: "LambdaTest",
    logo: `${PARTNER_LOGOS_PATH_PREFIX}9f5ef4eb-33b0-4852-a38a-61a25aaebe56.png`,
  },
  {
    name: "Sauce Labs",
    logo: `${PARTNER_LOGOS_PATH_PREFIX}445698aa-1a01-42ef-9a78-96903c80c41f.png`,
  },
  {
    name: "Jenkins",
    logo: `${PARTNER_LOGOS_PATH_PREFIX}7cbcd4d0-466c-4693-8d02-87a5f30f712b.png`,
  },
  {
    name: "Integration Tool",
    logo: `${PARTNER_LOGOS_PATH_PREFIX}70464805.png`,
  },
  {
    name: "Development Platform",
    logo: `${PARTNER_LOGOS_PATH_PREFIX}cropped-MicrosoftTeams-image-5-1.png`,
  },
  {
    name: "XRAY",
    logo: `${PARTNER_LOGOS_PATH_PREFIX}k3huxfe9vfbic6vuvurwtsvu5ggz.png`,
  },
] as const;

function IntegrationLogo({
  integration,
  decorative,
}: {
  integration: (typeof integrations)[number];
  decorative?: boolean;
}) {
  return (
    <div
      aria-hidden={decorative ? true : undefined}
      className="mx-4 flex h-12 w-24 shrink-0 items-center justify-center sm:mx-8 sm:h-16 sm:w-32 md:mx-12 md:h-[4.25rem] md:w-40 lg:mx-12 lg:h-[4.75rem] lg:w-44 xl:mx-14 xl:h-20 xl:w-48 2xl:mx-16 2xl:h-[5.25rem] 2xl:w-52"
    >
      <Image
        src={integration.logo}
        alt={decorative ? "" : `${integration.name} integration with QApilot`}
        width={160}
        height={48}
        loading="lazy"
        decoding="async"
        className="h-6 w-auto max-w-[5.5rem] object-contain opacity-90 sm:h-8 sm:max-w-[7.5rem] md:h-10 md:max-w-[9.5rem] lg:h-12 lg:max-w-[11rem] xl:h-14 xl:max-w-[12.5rem] 2xl:h-16 2xl:max-w-[14rem]"
      />
    </div>
  );
}

/** S12 ecosystem stack. Same infinite-scroll marquee pattern as Trusted by industry leaders. */
const IntegrationsSection = () => {
  const marqueeItems = [...integrations, ...integrations];

  return (
    <section className="relative overflow-hidden border-t border-border bg-background section-edge w-full pt-7 md:pt-[2.45rem] 2xl:pt-[2.8rem]">
      <div className="section-navy w-full">
        <div className="section-full relative py-8 sm:py-10 md:py-12 2xl:py-16">
          <div
            className="absolute inset-0 bg-structured-grid opacity-10 pointer-events-none"
            aria-hidden
          />
          <p className="relative z-10 mb-3 text-left text-xs font-semibold uppercase tracking-[0.22em] text-primary-foreground/60 md:mb-4">
            Ecosystem
          </p>
          <h2
            id="integrations-heading"
            className={cn(
              marketingSectionH2Class,
              "relative z-10 mb-4 px-3 text-left md:mb-5",
            )}
          >
            Works With Your Existing Testing Stack
          </h2>
          <p className="relative z-10 w-full min-w-0 max-w-none px-3 text-left text-base leading-relaxed md:text-lg 2xl:text-xl">
            Connect QApilot with the tools your team already uses for planning,
            communication, and device execution.
          </p>
        </div>
      </div>

      <div className="relative section-cream overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 bg-dot-pattern-subtle"
          aria-hidden
        />

        <div className="relative z-10 py-12 md:py-16 2xl:py-20">
          <div
            className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2"
            aria-label="Integration partners"
          >
            <div className="relative overflow-hidden">
              <div
                className="pointer-events-none absolute inset-y-0 left-0 z-20 w-10 bg-gradient-to-r from-[hsl(var(--cream))] to-transparent sm:w-16 md:w-24 lg:w-40"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-y-0 right-0 z-20 w-10 bg-gradient-to-l from-[hsl(var(--cream))] to-transparent sm:w-16 md:w-24 lg:w-40"
                aria-hidden
              />

              <div className="flex w-max animate-infinite-scroll pt-1 hover:[animation-play-state:paused] motion-reduce:animate-none">
                {marqueeItems.map((integration, index) => (
                  <IntegrationLogo
                    key={`${integration.name}-${index}`}
                    integration={integration}
                    decorative={index >= integrations.length}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="section-full mt-12 text-left md:mt-14">
            <p className="text-sm text-muted-foreground/60 2xl:text-base">
              And many more... QApilot integrates with your entire testing
              ecosystem.{" "}
              <Link
                href={PATHS.INTEGRATIONS}
                className="font-medium text-primary hover:underline"
              >
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
