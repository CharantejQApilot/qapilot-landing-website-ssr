"use client";

import { type ReactNode, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Network } from "lucide-react";
import { MarketingBackground } from "@/components/marketing/MarketingBackground";
import { marketingSectionH2Class, marketingSectionIntroClass } from "@/lib/marketing-typography";
import { PATHS } from "@/lib/routes";
import { cn } from "@/lib/utils";

function CapHighlight({ children }: { children: ReactNode }) {
  return <strong className="font-semibold text-primary">{children}</strong>;
}

type TabItem = {
  id: string;
  label: string;
  description: ReactNode;
  knowMoreHref: string;
  imageAlt: string;
  imageSrc?: string;
  /** Full-bleed scenic photo behind the product shot (Unsplash or same-origin). */
  scenicBackgroundSrc: string;
  /** Lighter scrims so the photo stays visible (e.g. very light UI screenshots). */
  scenicScrim?: "light";
};

const TABS: TabItem[] = [
  {
    id: "autonomous",
    label: "Autonomous Testing",
    description: (
      <>
        Automatically validates <CapHighlight>critical app flows</CapHighlight> without any scripts or setup. From the
        moment you upload your app, QApilot explores it like a <CapHighlight>real user</CapHighlight> and generates
        meaningful test coverage, giving <CapHighlight>instant visibility into app health</CapHighlight>.
      </>
    ),
    knowMoreHref: PATHS.AUTONOMOUS_TESTING,
    imageSrc: "/lovable-uploads/core-advantage-autonomous-testing.png",
    imageAlt:
      "QApilot crawler flow showing an app knowledge graph with connected screens, playback controls, and state details for autonomous mobile testing",
    scenicBackgroundSrc:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2400&q=80",
  },
  {
    id: "bug-detection",
    label: "Intelligent Bug Detection",
    description: (
      <>
        Autonomously detects <CapHighlight>accessibility gaps</CapHighlight>,{" "}
        <CapHighlight>action latency issues</CapHighlight>, and <CapHighlight>page load failures</CapHighlight> during
        execution. It surfaces real user-impacting problems without manual effort, helping teams{" "}
        <CapHighlight>catch issues early</CapHighlight> and continuously.
      </>
    ),
    knowMoreHref: PATHS.INTELLIGENT_BUG_DETECTION,
    imageSrc: "/lovable-uploads/core-advantage-intelligent-bug-detection.png",
    imageAlt:
      "QApilot Intelligent Bug Detection: mobile emulator with highlighted issues, pages list, and accessibility details including touch targets, contrast, and content descriptions",
    scenicBackgroundSrc:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=2400&q=80",
  },
  {
    id: "flutter",
    label: "Flutter Testing",
    description: (
      <>
        Built to handle <CapHighlight>Flutter&apos;s hybrid nature</CapHighlight>, QApilot seamlessly switches between{" "}
        <CapHighlight>native</CapHighlight> and <CapHighlight>Flutter contexts</CapHighlight>. This ensures reliable,
        end-to-end testing across platforms without breaking flows or requiring custom handling.
      </>
    ),
    knowMoreHref: PATHS.FOR_FLUTTER,
    imageSrc: "/lovable-uploads/core-advantage-flutter-testing.png",
    imageAlt:
      "QApilot Flutter testing workspace: NATIVE_APP context, emulator showing Urgent Care app with Schedule visit, step authoring with Create Step, identifiers, and Page Elements tree with OCR search",
    scenicBackgroundSrc:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=80",
  },
  {
    id: "security",
    label: "Security Reports",
    description: (
      <>
        Continuously analyzes your app for <CapHighlight>vulnerabilities</CapHighlight> like insecure requests, tracker
        risks, and configuration issues. Provides <CapHighlight>clear, actionable insights</CapHighlight> to strengthen
        security before every release.
      </>
    ),
    knowMoreHref: PATHS.SECURITY_REPORTS,
    imageSrc: "/lovable-uploads/core-advantage-security-reports.png",
    imageAlt:
      "QApilot security dashboard: app risk score, severity distribution, tracker detection, manifest and code vulnerability summaries, certificate issues, and dangerous permissions such as fine location",
    scenicBackgroundSrc:
      "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=2400&q=80",
    scenicScrim: "light",
  },
  {
    id: "self-healing",
    label: "AI Self Healing",
    description: (
      <>
        Adapts automatically to UI changes by intelligently updating element references during execution. This reduces{" "}
        <CapHighlight>flaky tests</CapHighlight> and eliminates the need for constant{" "}
        <CapHighlight>maintenance</CapHighlight>, keeping your <CapHighlight>test suite stable</CapHighlight> over time.
      </>
    ),
    knowMoreHref: PATHS.AI_SELF_HEALING,
    imageSrc: "/lovable-uploads/core-advantage-self-healing.png",
    imageAlt:
      "QApilot AI self-healing in a completed sanity suite run: AI-assisted step, dialog to update healed XPath for Enter your destination, execution vs recorded phone screenshots, element screenshot, and find-element timeline",
    scenicBackgroundSrc:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=2400&q=80",
  },
];

/** Scenic photography + soft scrims so the product screenshot reads clearly (TestMu-style sections). */
function CoreCapabilityScenicBackdrop({
  src,
  panelKey,
  scrim = "default",
}: {
  src: string;
  panelKey: string;
  scrim?: "default" | "light";
}) {
  const isLight = scrim === "light";
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-background"
      aria-hidden
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-[-10%] motion-safe:animate-scenic-ken-burns">
          <Image
            key={panelKey}
            src={src}
            alt=""
            fill
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="object-cover object-center"
            priority={false}
          />
        </div>
      </div>
      {/* Scrims: “light” keeps more of the photo visible for pale, full-width UI shots */}
      <div
        className={
          isLight
            ? "absolute inset-0 bg-gradient-to-b from-background/[0.02] via-transparent to-background/22"
            : "absolute inset-0 bg-gradient-to-b from-background/5 via-transparent to-background/40"
        }
      />
      <div
        className={
          isLight
            ? "absolute inset-0 bg-gradient-to-r from-background/[0.04] via-transparent to-background/[0.04]"
            : "absolute inset-0 bg-gradient-to-r from-background/10 via-transparent to-background/10"
        }
      />
      <div
        className={isLight ? "absolute inset-0 bg-primary/[0.01]" : "absolute inset-0 bg-primary/[0.02]"}
      />
    </div>
  );
}

/** Cream section atmosphere aligned with hero: gradients, grid, corner orbs, rings. */
function DeliverSectionBackgroundDecor() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[1] min-h-full overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-deliver-section-gradient" />
      <div className="absolute inset-0 bg-deliver-diagonal-grid" />
      <div className="absolute inset-0 bg-dot-pattern-subtle opacity-[0.2] [mask-image:radial-gradient(ellipse_68%_70%_at_50%_48%,transparent_30%,black_100%)] [-webkit-mask-image:radial-gradient(ellipse_68%_70%_at_50%_48%,transparent_30%,black_100%)]" />
      <div className="absolute inset-0 bg-deliver-section-grain" />
      <div className="deliver-section-vignette" />

      {/* Corner orbs — kept to edges so center stays clean cream */}
      <span
        className="hero-corner-orb absolute -left-10 top-0 h-56 w-56 rounded-full bg-primary/5 sm:left-0 sm:h-52 sm:w-52"
        style={{ boxShadow: "0 0 100px 70px hsl(218 65% 28% / 0.09)" }}
      />
      <span
        className="hero-corner-orb absolute -right-8 bottom-0 h-52 w-52 rounded-full bg-primary/[0.07] sm:right-0 sm:bottom-0"
        style={{
          boxShadow: "0 0 90px 60px hsl(218 65% 28% / 0.14)",
          animationDelay: "-6s",
        }}
      />

      <svg
        className="absolute right-0 top-[4%] h-auto w-[min(42vw,360px)] max-w-none text-primary opacity-[0.13] sm:w-[min(38vw,320px)]"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="280" cy="120" r="160" stroke="currentColor" strokeWidth="1.15" />
        <circle cx="280" cy="120" r="120" stroke="currentColor" strokeWidth="0.95" opacity="0.85" />
        <circle cx="280" cy="120" r="85" stroke="currentColor" strokeWidth="0.8" opacity="0.72" />
        <circle cx="280" cy="120" r="52" stroke="currentColor" strokeWidth="0.65" opacity="0.58" />
      </svg>

      <svg
        className="absolute bottom-[6%] left-0 w-[min(46vw,380px)] text-foreground opacity-[0.09]"
        viewBox="0 0 360 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 220 Q 100 80 320 20" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
        <path
          d="M20 260 Q 130 130 340 70"
          stroke="currentColor"
          strokeWidth="0.85"
          strokeLinecap="round"
          opacity="0.8"
        />
      </svg>

      <svg
        className="absolute left-[2%] top-[34%] hidden h-36 w-36 text-primary opacity-[0.11] md:block lg:left-[4%]"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50" cy="18" r="4" fill="currentColor" />
        <circle cx="82" cy="50" r="3.5" fill="currentColor" opacity="0.88" />
        <circle cx="50" cy="82" r="4" fill="currentColor" opacity="0.75" />
        <circle cx="18" cy="50" r="3" fill="currentColor" opacity="0.82" />
        <path
          d="M50 22 L79 47 M50 78 L79 53 M50 22 L21 47 M50 78 L21 53"
          stroke="currentColor"
          strokeWidth="0.6"
          opacity="0.65"
        />
      </svg>

      <svg
        className="absolute right-[3%] top-[38%] hidden h-32 w-32 text-primary opacity-[0.085] lg:block"
        viewBox="0 0 88 88"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="10"
          y="10"
          width="68"
          height="68"
          rx="10"
          stroke="currentColor"
          strokeWidth="1"
          transform="rotate(14 44 44)"
        />
        <rect
          x="22"
          y="22"
          width="44"
          height="44"
          rx="7"
          stroke="currentColor"
          strokeWidth="0.72"
          opacity="0.75"
          transform="rotate(14 44 44)"
        />
      </svg>
    </div>
  );
}

/**
 * Core advantage: heading, crawler card, and capability tabs (merged former Deliver section).
 */
const CoreAdvantageHeading = () => {
  const [active, setActive] = useState(0);
  const current = TABS[active];

  return (
    <section
      className="relative isolate overflow-hidden section-cream section-edge w-full"
      aria-labelledby="core-advantage-heading"
    >
      <DeliverSectionBackgroundDecor />

      <div className="section-full relative z-10 pt-10 md:pt-14 2xl:pt-16 pb-16 md:pb-20 2xl:pb-24">
        <header className="relative mb-8 w-full overflow-hidden rounded-2xl border border-border bg-section-header px-6 py-8 shadow-sm md:mb-10 md:px-10 md:py-10 2xl:mb-12 2xl:px-12 2xl:py-12">
          <span className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-2xl" aria-hidden="true" />
          <div className="relative z-[1] pl-4 md:pl-5">
            <h2
              id="core-advantage-heading"
              className={cn(marketingSectionH2Class, "text-foreground")}
            >
              Deliver Reliable <span className="text-primary">Mobile App</span> Testing
            </h2>
          </div>
        </header>

        {/* Crawler card — same navy as QApilot By The Numbers banner */}
        <article className="section-navy relative z-[1] w-full overflow-hidden rounded-xl border border-white/15 shadow-md">
          <div
            className="absolute inset-0 bg-structured-grid opacity-10 pointer-events-none"
            aria-hidden="true"
          />

          {/* White L-frames inset inside the card */}
          <svg
            className="pointer-events-none absolute left-3 top-3 z-[1] h-12 w-12 sm:left-4 sm:top-4 sm:h-14 sm:w-14"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M 8 52 L 8 8 L 52 8"
              stroke="white"
              strokeOpacity={0.45}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <svg
            className="pointer-events-none absolute bottom-3 right-3 z-[1] h-12 w-12 sm:bottom-4 sm:right-4 sm:h-14 sm:w-14"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M 56 12 L 56 56 L 12 56"
              stroke="white"
              strokeOpacity={0.45}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <div className="relative z-[2] flex flex-col gap-5 px-5 py-6 sm:px-6 sm:py-8 md:flex-row md:items-start md:gap-6 md:px-8 md:py-8 2xl:px-10 2xl:py-10">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white/10 text-primary-foreground md:h-14 md:w-14">
              <Network className="h-6 w-6 md:h-7 md:w-7" strokeWidth={1.5} aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-heading text-lg font-bold text-primary-foreground md:text-xl 2xl:text-2xl">
                Meet QApilot&apos;s Autonomous Mobile App Crawler
              </h3>
              <p className="mt-3 text-base leading-relaxed text-[hsl(var(--navy-muted))] md:mt-4 md:text-lg 2xl:text-xl">
                QApilot&apos;s mobile app crawler navigates even the trickiest app flows, building a live{" "}
                <strong className="font-semibold text-primary-foreground">Knowledge Graph</strong> that becomes
                the brain of QApilot&apos;s autonomous agent network.
              </p>
              <p className="mt-3 text-base leading-relaxed text-[hsl(var(--navy-muted))] md:mt-4 md:text-lg 2xl:text-xl">
                The result?{" "}
                <strong className="font-semibold text-primary-foreground">Zero-touch sanity testing</strong>{" "}
                of your app&apos;s critical flows — validated in minutes. No scripts, no setup.
              </p>
            </div>
          </div>
        </article>

        {/* Capability tabs + panel */}
        <div
          className="relative z-[1] mt-10 md:mt-12 2xl:mt-14 mb-8 md:mb-10 flex gap-2 overflow-x-auto pb-2 md:flex-wrap md:justify-center md:gap-3 md:overflow-visible md:pb-0 scrollbar-thin [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label="Product capabilities"
        >
          {TABS.map((tab, i) => {
            const isActive = i === active;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`deliver-panel-${tab.id}`}
                id={`deliver-tab-${tab.id}`}
                onClick={() => setActive(i)}
                className={`shrink-0 rounded-xl border px-4 py-2.5 text-left text-sm font-semibold transition-all duration-200 md:px-5 md:py-3 md:text-center ${
                  isActive
                    ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/15"
                    : "border-border bg-card text-muted-foreground shadow-sm hover:border-primary/35 hover:bg-muted hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id={`deliver-panel-${current.id}`}
          aria-labelledby={`deliver-tab-${current.id}`}
          className="relative z-[1] overflow-hidden rounded-2xl border border-border bg-card shadow-[0_24px_48px_-12px_hsl(220_20%_12%/0.08)]"
        >
          <div className="flex min-h-0 flex-col lg:min-h-[min(58vh,656px)] lg:flex-row">
            {/* Left (~62% lg): scenic + screenshot; image first on mobile */}
            <div className="relative isolate min-h-[420px] min-w-0 w-full overflow-hidden bg-background lg:flex-[0_0_62%] lg:min-h-0">
              <CoreCapabilityScenicBackdrop
                src={current.scenicBackgroundSrc}
                panelKey={current.id}
                scrim={current.scenicScrim}
              />
              <div
                key={`${current.id}-media`}
                className="relative z-[2] flex min-h-[420px] w-full items-center justify-center px-[7.5%] py-[6.5%] sm:px-[8%] sm:py-[7%] md:min-h-[520px] md:px-[8.25%] md:py-[7.5%] lg:min-h-full lg:px-[6%] lg:py-6 xl:py-7 animate-in fade-in duration-300"
              >
                {current.imageSrc ? (
                  <img
                    src={current.imageSrc}
                    alt={current.imageAlt}
                    className="relative h-auto max-h-[min(88vh,920px)] w-full max-w-full object-contain object-center outline outline-1 outline-white/55 [outline-offset:0] sm:max-h-[min(90vh,960px)] md:max-h-[min(88vh,900px)] lg:max-h-[min(54vh,576px)] xl:max-h-[min(56vh,608px)]"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className="flex w-full max-w-none flex-col items-center justify-center gap-4 py-4 text-center md:py-6">
                    <div className="w-full max-w-2xl border border-dashed border-white/35 bg-card/85 px-6 py-12 outline outline-1 outline-white/30 [outline-offset:0] backdrop-blur-sm md:px-8 md:py-16">
                      <p className="font-heading text-lg font-semibold text-foreground md:text-xl">
                        {current.imageAlt}
                      </p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Add <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono text-foreground">imageSrc</code>{" "}
                        on this tab
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right (~38% lg): hero-style patterns + section copy */}
            <div className="relative isolate flex min-w-0 flex-1 flex-col justify-center overflow-hidden border-t border-border bg-muted px-6 py-8 md:px-8 md:py-10 lg:border-l lg:border-t-0 lg:px-10 lg:py-10">
              {/* `soft` only — full `hero` stacks 8× backdrop-filter layers that read as fog over this copy */}
              <MarketingBackground variant="soft" />
              <div className="pointer-events-none absolute inset-0 bg-muted/88" aria-hidden />
              <div
                key={current.id}
                className="relative z-[1] flex flex-col gap-7 animate-in fade-in duration-300 md:gap-9 lg:gap-10"
              >
                <div className="relative pl-4 md:pl-5">
                  <span
                    className="absolute left-0 top-1 bottom-1 w-1 rounded-full bg-primary md:top-1.5 md:bottom-1.5"
                    aria-hidden="true"
                  />
                  <h3 className="font-heading text-xl font-bold tracking-tight text-foreground md:text-2xl 2xl:text-[1.65rem] leading-snug">
                    {current.label}
                  </h3>
                </div>
                <p className={marketingSectionIntroClass}>{current.description}</p>
                <Link
                  href={current.knowMoreHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                >
                  Know more
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreAdvantageHeading;
