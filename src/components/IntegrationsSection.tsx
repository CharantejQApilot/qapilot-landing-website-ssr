"use client";

import { useRef, useEffect, useState } from "react";

const IntegrationsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const contentWidthRef = useRef(0);

  const integrations = [
    { name: "TestRail", logo: "/lovable-uploads/962197a9-5e99-40b8-8f8c-794b50520d5e.png" },
    { name: "Jira", logo: "/lovable-uploads/jira-software-logo.png" },
    { name: "Teams", logo: "/lovable-uploads/bcb4526d-637b-49ba-a92d-b437d33a0516.png" },
    { name: "Slack", logo: "/lovable-uploads/f9ca9bd8-d74c-4852-8fa6-34c1be76aea3.png" },
    { name: "BrowserStack", logo: "/lovable-uploads/445698aa-1a01-42ef-9a78-96903c80c41f.png" },
    { name: "LambdaTest", logo: "/lovable-uploads/9f5ef4eb-33b0-4852-a38a-61a25aaebe56.png" },
    { name: "Sauce Labs", logo: "/lovable-uploads/e9abab36-d809-4b15-8fd2-134b7e1d473e.png" },
    { name: "Jenkins", logo: "/lovable-uploads/7cbcd4d0-466c-4693-8d02-87a5f30f712b.png" },
    { name: "Integration Tool", logo: "/lovable-uploads/70464805.png" },
    { name: "Development Platform", logo: "/lovable-uploads/cropped-MicrosoftTeams-image-5-1.png" },
    { name: "XRAY", logo: "/lovable-uploads/k3huxfe9vfbic6vuvurwtsvu5ggz.png" },
  ];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    const firstChild = scrollContainer.firstElementChild as HTMLElement;
    if (!firstChild) return;
    contentWidthRef.current = firstChild.offsetWidth;
    let animationId: number;
    let currentOffset = 0;
    const animate = () => {
      currentOffset += 0.5;
      if (currentOffset >= contentWidthRef.current) currentOffset = 0;
      setOffset(currentOffset);
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  const renderItems = () =>
    integrations.map((integration, index) => (
      <div key={index} className="flex-shrink-0">
        <div className="flex h-24 w-36 items-center justify-center rounded-xl border border-border bg-background p-4 sm:h-28 sm:w-44 lg:h-32 lg:w-52 lg:p-6 2xl:h-36 2xl:w-60 2xl:p-8">
          <img
            src={integration.logo}
            alt={`${integration.name} integration with QApilot`}
            width={80}
            height={64}
            loading="lazy"
            decoding="async"
            className="object-contain"
            style={{ maxWidth: "80px", maxHeight: "64px" }}
          />
        </div>
      </div>
    ));

  return (
    <section className="relative overflow-hidden border-t border-border bg-background section-edge w-full pt-7 md:pt-[2.45rem] 2xl:pt-[2.8rem]">
      <div className="section-navy w-full">
        <div className="section-full relative py-8 sm:py-10 md:py-12 2xl:py-16">
          <div className="absolute inset-0 bg-structured-grid opacity-10 pointer-events-none" aria-hidden />
          <h2
            id="integrations-heading"
            className="font-heading relative z-10 px-3 text-center text-xl font-semibold leading-snug tracking-tight sm:text-2xl md:text-3xl min-[1280px]:text-5xl 2xl:text-6xl"
          >
            Works With Your Existing Testing Stack
          </h2>
        </div>
      </div>

      <div className="relative section-cream overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-dot-pattern-subtle" aria-hidden />

        <div className="relative z-10 py-12 md:py-16 2xl:py-20">
          <p className="section-full mb-10 max-w-3xl mx-auto text-center text-base leading-relaxed text-muted-foreground md:mb-12 md:text-lg 2xl:text-xl">
            Connect QApilot with your existing workflow and tools.
          </p>

          <div className="relative w-full overflow-hidden">
            <div
              ref={scrollRef}
              className="flex whitespace-nowrap will-change-transform"
              style={{ transform: `translateX(-${offset}px)` }}
            >
              <div className="flex items-center gap-6 pr-6">{renderItems()}</div>
              <div className="flex items-center gap-6 pr-6">{renderItems()}</div>
            </div>
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-[hsl(30_20%_97%)] to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-[hsl(30_20%_97%)] to-transparent" />
          </div>

          <div className="section-full mt-12 text-center md:mt-14">
            <p className="text-sm text-muted-foreground/60 2xl:text-base">
              And many more... QApilot integrates with your entire testing ecosystem.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationsSection;
