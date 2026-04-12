"use client";

import {
  Activity,
  AlertTriangle,
  Bot,
  Brain,
  Calendar,
  Cog,
  Compass,
  Handshake,
  Layers,
  Lightbulb,
  Megaphone,
  MessageSquare,
  Rocket,
  Shield,
  Sparkles,
  Target,
  TreePine,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import YouTubeVideoPlayer from "@/components/YouTubeVideoPlayer";
import { MarketingBackground, MarketingSectionHeader } from "@/components/marketing";
import { marketingHeroH1Class, marketingHeroLeadClass, marketingSectionIntroClass } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";

const originStoryBeats = [
  {
    step: "01",
    icon: AlertTriangle,
    title: "QApilot started with a very real problem.",
    titleEmphasis: "default" as const,
    body: "Testing mobile apps was slow, brittle, and frustrating. Test automation promised scale, but in reality it meant scripts that broke constantly, endless maintenance, and teams spending more time fixing tests than shipping features.",
  },
  {
    step: "02",
    icon: Layers,
    title: "We saw a clear gap.",
    titleEmphasis: "primary" as const,
    body: "AI was being added around testing, but not into its core. Most tools were AI-assisted at best—a little faster, maybe, but not fundamentally different.",
  },
  {
    step: "03",
    icon: Compass,
    title: "We saw an opportunity to rethink mobile testing from first principles.",
    titleEmphasis: "default" as const,
    body: "Less patchwork on legacy stacks—and more systems that reason about real apps, real users, and real change.",
  },
] as const;

const originFinale = {
  step: "04",
  icon: Rocket,
  title: "So we caught it with both hands.",
  body: "Instead of scripting flows, we built systems that understand apps, explore them like real users, and adapt as apps change. That belief became QApilot.",
} as const;

const cofounders = [
  {
    name: "Aditya Challa",
    designation: "Co-Founder",
    linkedin: "https://www.linkedin.com/in/adityachalla1831/",
    Icon: Rocket,
  },
  {
    name: "Chaitanya Devalapally",
    designation: "Co-Founder",
    linkedin: "https://www.linkedin.com/in/chaitanya-devalapally-41b41b2/",
    Icon: Rocket,
  },
] as const;

const leaders = [
  {
    name: "Surendranath Jillella",
    designation: "Head of AI",
    linkedin: "https://www.linkedin.com/in/jsurendranathreddy/",
    Icon: Brain,
  },
  {
    name: "Subrahmanyam Marella",
    designation: "Head of Engineering",
    linkedin: "https://www.linkedin.com/in/subrahmanyam-marella-a5640311a/",
    Icon: Cog,
  },
  {
    name: "Dinesh Reddy M",
    designation: "Customer Success Lead",
    linkedin: "https://www.linkedin.com/in/dinesh-reddy-m-329613140/",
    Icon: Handshake,
  },
  {
    name: "Charan Tej Kammara",
    designation: "Product Marketing Lead",
    linkedin: "https://www.linkedin.com/in/charan-tej-kammara/",
    Icon: Megaphone,
  },
] as const;

const valueTiles = [
  { label: "Innovation", Icon: Lightbulb },
  { label: "Quality", Icon: Shield },
  { label: "Focus", Icon: Target },
  { label: "Speed", Icon: Rocket },
  { label: "Growth", Icon: TrendingUp },
  { label: "Teamwork", Icon: Users },
  { label: "Excellence", Icon: Activity },
  { label: "AI-Native", Icon: Bot },
] as const;

const AboutClient = () => {
  const OriginFinaleIcon = originFinale.icon;

  return (
    <>
      <section
        className="hero-prominent relative section-edge w-full overflow-x-hidden overflow-y-visible"
        aria-label="About hero"
        aria-labelledby="about-hero-title"
      >
        <MarketingBackground variant="hero" showDiagonalGrid={false} showPixelRipple={false} progressiveBlur={false} />
        <div className="relative z-10 w-full section-full py-16 sm:py-20 md:py-24 lg:py-28 2xl:py-32">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-3 text-center sm:px-4 lg:max-w-7xl 2xl:max-w-[90rem]">
            <h1
              id="about-hero-title"
              className={cn(
                marketingHeroH1Class,
                "mb-5 w-full text-balance sm:mb-6 md:mb-8",
                "max-lg:text-[clamp(1.35rem,0.95rem+2.4vw,3.45rem)] max-lg:leading-[1.12]",
              )}
            >
              Building quality for an <span className="text-primary">AI-first world</span>
            </h1>
            <p
              className={cn(
                marketingHeroLeadClass,
                "mx-auto mb-10 max-w-3xl text-balance sm:mb-11 md:mb-12 lg:max-w-4xl",
              )}
            >
              A team united by the belief that testing should be intelligent, effortless, and built for the future.
            </p>

            <ul className="grid w-full max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              {valueTiles.map(({ label, Icon }) => (
                <li
                  key={label}
                  className="flex items-center gap-3 rounded-2xl border border-border/80 bg-card/80 p-3 shadow-sm backdrop-blur-sm sm:p-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border/80 bg-muted/30">
                    <Icon className="h-5 w-5 text-primary" aria-hidden />
                  </div>
                  <span className="text-left text-sm font-medium text-foreground">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        className="section-edge w-full border-t border-border/60 bg-gradient-to-b from-muted/[0.12] via-background to-background"
        aria-labelledby="about-origin-heading"
      >
        <div className="section-full py-14 md:py-20 2xl:py-24">
          <MarketingSectionHeader
            id="about-origin-heading"
            title={
              <>
                How <span className="text-primary">QApilot</span> started
              </>
            }
            description="From brittle scripts to systems that understand mobile apps—the path that shaped the product."
            marginBottomClassName="mb-10 md:mb-12 2xl:mb-14"
          />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-12 lg:gap-6">
            {originStoryBeats.map((beat, index) => {
              const Icon = beat.icon;
              const isLead = index === 0;
              const isWide = index === 2;
              return (
                <article
                  key={beat.step}
                  className={cn(
                    "relative flex min-h-0 flex-col overflow-hidden rounded-2xl border border-border/80 bg-card/80 p-6 shadow-sm backdrop-blur-sm md:p-8",
                    "motion-safe:hover:border-primary/25 motion-safe:hover:shadow-md",
                    "md:col-span-2",
                    !isWide ? "lg:col-span-6" : "lg:col-span-12",
                  )}
                >
                  <span className="absolute bottom-0 left-0 top-0 w-1 bg-primary/90" aria-hidden />
                  <div className={cn("relative flex h-full flex-col pl-4 md:pl-5", isLead && "lg:pr-4")}>
                    <div className="mb-5 flex items-start justify-between gap-4">
                      <span
                        className="font-heading text-4xl font-bold leading-none text-primary/15 tabular-nums md:text-5xl"
                        aria-hidden
                      >
                        {beat.step}
                      </span>
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary ring-1 ring-primary/10 md:h-14 md:w-14">
                        <Icon className="h-6 w-6 md:h-7 md:w-7" strokeWidth={2} aria-hidden />
                      </div>
                    </div>
                    <h3
                      className={cn(
                        "font-heading text-lg font-semibold leading-snug tracking-tight md:text-xl",
                        beat.titleEmphasis === "primary" ? "text-primary" : "text-foreground",
                        isLead && "md:text-2xl",
                      )}
                    >
                      {beat.title}
                    </h3>
                    <p className={cn(marketingSectionIntroClass, "mt-4 flex-1 text-pretty")}>{beat.body}</p>
                  </div>
                </article>
              );
            })}

            <article
              className={cn(
                "relative overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/[0.07] via-card/90 to-card/80 p-6 shadow-md backdrop-blur-sm md:col-span-2 md:p-10 lg:col-span-12",
                "motion-safe:hover:border-primary/35 motion-safe:hover:shadow-lg",
              )}
            >
              <span className="absolute bottom-0 left-0 top-0 w-1.5 bg-primary" aria-hidden />
              <div className="relative pl-4 md:grid md:grid-cols-12 md:gap-10 md:pl-6">
                <div className="mb-6 flex items-start justify-between gap-4 md:col-span-4 md:mb-0 md:flex-col md:justify-between">
                  <span
                    className="font-heading text-4xl font-bold leading-none text-primary/25 tabular-nums md:text-6xl"
                    aria-hidden
                  >
                    {originFinale.step}
                  </span>
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-primary ring-1 ring-primary/20 md:h-16 md:w-16">
                    <OriginFinaleIcon className="h-7 w-7 md:h-8 md:w-8" strokeWidth={2} aria-hidden />
                  </div>
                </div>
                <div className="md:col-span-8">
                  <h3 className="font-heading text-2xl font-bold leading-tight tracking-tight text-primary md:text-3xl lg:text-4xl">
                    {originFinale.title}
                  </h3>
                  <p className={cn(marketingSectionIntroClass, "mt-5 max-w-3xl text-pretty !text-foreground/90 md:text-lg")}>
                    {originFinale.body}
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section-edge w-full border-t border-border/60 bg-background" aria-labelledby="about-life-heading">
        <div className="section-full py-14 md:py-20 2xl:py-24">
          <MarketingSectionHeader
            id="about-life-heading"
            title={
              <>
                Life at <span className="text-primary">QApilot</span>
              </>
            }
            description="We build fast, learn in public, and show up for the community."
            marginBottomClassName="mb-10 md:mb-12 2xl:mb-14"
          />

          <div className="mb-12 md:mb-14">
            <YouTubeVideoPlayer
              videoId="qwNEigdExx4"
              title="Life at QApilot - Culture and Team"
              description="A glimpse into the culture and people at QApilot. From hackathons and conferences to building the future of mobile testing together."
              uploadDate="2024-12-01T00:00:00Z"
              duration="PT2M30S"
            />
          </div>

          <p className={cn(marketingSectionIntroClass, "mx-auto mb-10 max-w-3xl text-center md:text-lg")}>
            From hackathons and conferences to late-night prep before events, we value being present—not just online,
            but in real conversations with real people solving real problems.
          </p>

          <p className="mb-6 text-center font-heading text-lg font-semibold text-foreground md:text-xl">
            You&apos;ll find us:
          </p>
          <ul className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { text: "Shipping features", Icon: Zap },
              { text: "Attending & sponsoring QA events", Icon: Calendar },
              { text: "Participating in builder communities", Icon: MessageSquare },
              { text: "Touching grass occasionally", Icon: TreePine, italic: true },
            ].map(({ text, Icon, italic }) => (
              <li
                key={text}
                className="flex items-center gap-3 rounded-2xl border border-border/80 bg-card/80 p-4 shadow-sm backdrop-blur-sm transition-colors motion-safe:hover:border-primary/30"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" aria-hidden />
                </div>
                <span className={cn("text-base text-foreground", italic && "italic")}>{text}</span>
              </li>
            ))}
          </ul>

          <div className="flex justify-center">
            <div className="rounded-full border border-border/80 bg-card/80 px-8 py-4 shadow-sm backdrop-blur-sm">
              <p className="text-center text-base font-medium text-foreground md:text-lg">
                This mix keeps us <span className="font-bold text-primary">grounded</span> and{" "}
                <span className="font-bold text-primary">curious</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-gradient-to-b from-muted/15 via-background to-background"
        aria-labelledby="about-team-heading"
      >
        <div className="section-full py-14 md:py-20 2xl:py-24">
          <MarketingSectionHeader
            id="about-team-heading"
            title={
              <>
                Meet the <span className="text-primary">team</span>
              </>
            }
            marginBottomClassName="mb-10 md:mb-12 2xl:mb-14"
          />

          <div className="mb-10 flex flex-wrap justify-center gap-5 sm:gap-8 md:mb-12">
            {cofounders.map((member) => (
              <a
                key={member.linkedin}
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group flex w-[168px] flex-col items-center rounded-2xl border border-border/80 bg-card/80 p-6 text-center shadow-sm backdrop-blur-sm transition-colors sm:w-[188px]",
                  "motion-safe:hover:border-primary/30 motion-safe:hover:shadow-md",
                )}
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-border/80 bg-muted/30 transition-colors group-hover:border-primary/40 md:h-20 md:w-20">
                  <member.Icon className="h-8 w-8 text-primary md:h-10 md:w-10" aria-hidden />
                </div>
                <span className="text-sm font-semibold text-foreground transition-colors group-hover:text-primary md:text-base">
                  {member.name}
                </span>
                <span className="mt-1 text-xs text-muted-foreground md:text-sm">{member.designation}</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ))}
          </div>

          <div className="mb-12 flex flex-wrap justify-center gap-5 sm:gap-6 md:gap-8">
            {leaders.map((member) => (
              <a
                key={member.linkedin}
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group flex w-[168px] flex-col items-center rounded-2xl border border-border/80 bg-card/80 p-6 text-center shadow-sm backdrop-blur-sm transition-colors sm:w-[188px]",
                  "motion-safe:hover:border-primary/30 motion-safe:hover:shadow-md",
                )}
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-border/80 bg-muted/30 transition-colors group-hover:border-primary/40 md:h-20 md:w-20">
                  <member.Icon className="h-8 w-8 text-primary md:h-10 md:w-10" aria-hidden />
                </div>
                <span className="text-sm font-semibold text-foreground transition-colors group-hover:text-primary md:text-base">
                  {member.name}
                </span>
                <span className="mt-1 text-xs text-muted-foreground md:text-sm">{member.designation}</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2">
            <div className="flex -space-x-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted/30 md:h-10 md:w-10"
                >
                  <Sparkles className="h-3 w-3 text-muted-foreground/50 md:h-4 md:w-4" aria-hidden />
                </div>
              ))}
            </div>
            <span className="text-sm italic text-muted-foreground/80">…and more</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutClient;
