import { HOME_TRUST_LOGOS, type HomeTrustLogo } from "@/lib/home-trust-logos";
import { cn } from "@/lib/utils";

type HomeHeroTrustMarqueeProps = {
  className?: string;
};

function TrustLogoLink({ logo, decorative }: { logo: HomeTrustLogo; decorative?: boolean }) {
  const wrapperClassName = cn(
    "flex shrink-0 items-center justify-center",
    "mx-4 sm:mx-8 md:mx-12 lg:mx-12 xl:mx-14 2xl:mx-16",
    "h-12 sm:h-16 md:h-[4.25rem] lg:h-[4.75rem] xl:h-20 2xl:h-[5.25rem]",
    "w-24 sm:w-32 md:w-40 lg:w-44 xl:w-48 2xl:w-52",
  );

  const logoImage = (
    <img
      src={logo.logo}
      alt={decorative ? "" : `${logo.name} logo`}
      width={160}
      height={48}
      loading="lazy"
      decoding="async"
      className={cn(
        "h-auto w-auto max-h-full object-contain opacity-90",
        "max-w-[5.5rem] sm:max-w-[7.5rem] md:max-w-[9.5rem] lg:max-w-[11rem] xl:max-w-[12.5rem] 2xl:max-w-[14rem]",
        "h-6 sm:h-8 md:h-10 lg:h-12 xl:h-14 2xl:h-16",
      )}
      style={{ transform: `scale(${logo.visualScale})`, transformOrigin: "center" }}
    />
  );

  if (!logo.url) {
    return (
      <div aria-hidden={decorative ? true : undefined} className={wrapperClassName}>
        {logoImage}
      </div>
    );
  }

  return (
    <a
      href={logo.url}
      target="_blank"
      rel="noopener"
      aria-hidden={decorative ? true : undefined}
      tabIndex={decorative ? -1 : undefined}
      className={wrapperClassName}
    >
      {logoImage}
    </a>
  );
}

export function HomeHeroTrustMarquee({ className }: HomeHeroTrustMarqueeProps) {
  const marqueeItems = [...HOME_TRUST_LOGOS, ...HOME_TRUST_LOGOS];

  return (
    <div
      className={cn(
        "relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2",
        "pb-2 sm:pb-3 md:pb-2 lg:pb-0 xl:pb-0 2xl:pb-0",
        className,
      )}
      aria-label="Trusted by industry leaders"
    >
      {/* Mobile: static wrapped grid — no animation, half the DOM nodes */}
      <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-4 px-4 md:hidden">
        {HOME_TRUST_LOGOS.map((logo) => (
          <TrustLogoLink key={logo.name} logo={logo} />
        ))}
      </div>

      {/* Desktop: infinite scroll marquee */}
      <div className="hidden md:block">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r from-background to-transparent sm:w-24 md:w-40"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-background to-transparent sm:w-24 md:w-40"
          aria-hidden
        />

        <div className="flex w-max animate-infinite-scroll pt-1 hover:[animation-play-state:paused] motion-reduce:animate-none">
          {marqueeItems.map((logo, index) => (
            <TrustLogoLink
              key={`${logo.name}-${index}`}
              logo={logo}
              decorative={index >= HOME_TRUST_LOGOS.length}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
