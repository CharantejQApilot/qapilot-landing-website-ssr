import Image from "next/image";
import Link from "next/link";
import { HomeDarkAtmosphere } from "@/components/home/HomeDarkAtmosphere";
import { HomeEyebrow } from "@/components/home/HomeEyebrow";
import { HomeSeam } from "@/components/home/HomeSeam";
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

/** S12 ecosystem stack. Light chapter, dark logo table. */
const IntegrationsSection = () => {
  return (
    <section className="relative overflow-hidden home-canvas section-edge w-full">
      <HomeSeam />
      <div className="section-full relative py-16 md:py-20 lg:py-24">
        <HomeEyebrow>Ecosystem</HomeEyebrow>
        <h2
          id="integrations-heading"
          className={cn(marketingSectionH2Class, "mb-4 text-left md:mb-5")}
        >
          Works With Your Existing Testing Stack
        </h2>
        <p className="mb-10 w-full min-w-0 max-w-none text-left text-base leading-relaxed text-muted-foreground md:mb-12 md:text-lg 2xl:text-xl">
          Connect QApilot with the tools your team already uses for planning,
          communication, and device execution.
        </p>

        <div className="relative overflow-hidden rounded-md border border-[hsl(var(--navy))] bg-[hsl(var(--navy))]">
          <HomeDarkAtmosphere glow="bottom-left" />
          <ul
            className="relative z-[1] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
            aria-label="Integration partners"
          >
            {integrations.map((integration) => (
              <li
                key={integration.name}
                className="flex h-24 items-center justify-center border-b border-r border-white/10 px-4 sm:h-28"
              >
              <Image
                src={integration.logo}
                alt={`${integration.name} integration with QApilot`}
                width={160}
                height={48}
                loading="lazy"
                decoding="async"
                className="h-8 w-auto max-w-[7.5rem] object-contain sm:h-10 sm:max-w-[9rem]"
              />
            </li>
          ))}
          </ul>
        </div>

        <p className="mt-10 text-left text-sm text-muted-foreground md:mt-12 2xl:text-base">
          And many more... QApilot integrates with your entire testing ecosystem.{" "}
          <Link
            href={PATHS.INTEGRATIONS}
            className="font-medium text-primary hover:underline"
          >
            See all integrations
          </Link>
          .
        </p>
      </div>
    </section>
  );
};

export default IntegrationsSection;
