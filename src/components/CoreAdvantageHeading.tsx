"use client";

import { useState } from "react";
import { Network } from "lucide-react";

type TabItem = {
  id: string;
  label: string;
  description: string;
  imageAlt: string;
  imageSrc?: string;
};

const TABS: TabItem[] = [
  {
    id: "autonomous",
    label: "Autonomous Testing",
    description:
      "Placeholder: Describe how QApilot runs critical flows without scripts — you’ll replace this with final copy.",
    imageAlt: "Autonomous testing",
  },
  {
    id: "bug-detection",
    label: "Intelligent Bug Detection",
    description:
      "Placeholder: Summarize AI-driven regression and anomaly detection — swap in your messaging.",
    imageAlt: "Intelligent bug detection",
  },
  {
    id: "flutter",
    label: "Flutter Testing",
    description:
      "Placeholder: Highlight cross-platform Flutter coverage — text to be provided.",
    imageAlt: "Flutter testing",
  },
  {
    id: "security",
    label: "Security Reports",
    description:
      "Placeholder: Outline security and compliance reporting — replace with real content.",
    imageAlt: "Security reports",
  },
  {
    id: "self-healing",
    label: "AI Self Healing",
    description:
      "Placeholder: Explain self-healing tests that adapt to UI changes — final copy coming soon.",
    imageAlt: "AI self-healing",
  },
];

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
              className="font-heading text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold text-foreground tracking-tight leading-snug"
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
          <div className="border-b border-border bg-muted px-6 py-8 md:px-10 md:py-10 lg:px-14 lg:py-12">
            <p
              key={current.id}
              className="max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl animate-in fade-in duration-300"
            >
              {current.description}
            </p>
          </div>

          <div className="relative bg-[hsl(240_85%_6%)]">
            <div
              key={current.id}
              className="relative flex min-h-[280px] w-full items-stretch justify-center md:min-h-[420px] lg:min-h-[min(58vw,680px)] animate-in fade-in duration-300"
            >
              {current.imageSrc ? (
                <img
                  src={current.imageSrc}
                  alt={current.imageAlt}
                  className="h-full w-full max-h-[min(70vh,680px)] object-contain object-center"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div className="flex w-full max-w-6xl flex-col items-center justify-center gap-4 p-6 text-center md:p-10 lg:p-14">
                  <div className="rounded-2xl border border-white/15 bg-[hsl(240_35%_11%)] px-8 py-14 md:py-20">
                    <p className="font-heading text-lg font-semibold text-white/90 md:text-xl">
                      {current.imageAlt}
                    </p>
                    <p className="mt-2 text-sm text-white/45">
                      Add <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">imageSrc</code> on this tab
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreAdvantageHeading;
