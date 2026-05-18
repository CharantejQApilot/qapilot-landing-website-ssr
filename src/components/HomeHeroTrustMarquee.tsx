import { HOME_TRUST_LOGOS, type HomeTrustLogo } from "@/lib/home-trust-logos";
import { cn } from "@/lib/utils";

type HomeHeroTrustMarqueeProps = {
  className?: string;
};

function TrustLogoLink({ logo, decorative }: { logo: HomeTrustLogo; decorative?: boolean }) {
  return (
    <a
      href={logo.url}
      target="_blank"
      rel="noopener"
      aria-hidden={decorative ? true : undefined}
      tabIndex={decorative ? -1 : undefined}
      className={cn(
        "flex shrink-0 items-center justify-center",
        "mx-7 h-[4.2rem] w-[8.4rem] sm:mx-9 sm:h-[4.8rem] sm:w-[9.6rem] md:mx-14 md:h-24 md:w-48",
        "lg:mx-6 lg:h-14 lg:w-28 lg:sm:mx-8 lg:sm:h-16 lg:sm:w-32 lg:md:mx-12 lg:md:h-20 lg:md:w-40 lg:2xl:mx-16 lg:2xl:w-48",
      )}
    >
      <img
        src={logo.logo}
        alt={decorative ? "" : `${logo.name} logo`}
        width={160}
        height={48}
        loading="lazy"
        decoding="async"
        className={cn(
          "w-auto object-contain opacity-90",
          "h-[2.1rem] max-w-[132px] sm:h-[2.4rem] sm:max-w-[144px] md:h-[3.6rem] md:max-w-[192px]",
          "lg:h-7 lg:max-w-[110px] lg:sm:h-8 lg:sm:max-w-[120px] lg:md:h-12 lg:md:max-w-[160px]",
        )}
        style={{ transform: `scale(${logo.visualScale})`, transformOrigin: "center" }}
      />
    </a>
  );
}

export function HomeHeroTrustMarquee({ className }: HomeHeroTrustMarqueeProps) {
  const marqueeItems = [...HOME_TRUST_LOGOS, ...HOME_TRUST_LOGOS];

  return (
    <div
      className={cn(
        "relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2",
        "pb-16 sm:pb-20 md:pb-24 lg:pb-8 xl:pb-10 2xl:pb-12",
        className,
      )}
      aria-label="Trusted by industry leaders"
    >
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
  );
}
