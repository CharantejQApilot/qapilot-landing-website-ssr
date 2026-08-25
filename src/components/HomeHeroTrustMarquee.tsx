import Image from "next/image";
import { HOME_TRUST_LOGOS, type HomeTrustLogo } from "@/lib/home-trust-logos";
import { cn } from "@/lib/utils";

type TrustMarqueeDensity = "hero" | "compact";

type HomeHeroTrustMarqueeProps = {
  className?: string;
  /** Home hero: full viewport width. Book demo: fits parent column. */
  layout?: "fullBleed" | "contained";
  density?: TrustMarqueeDensity;
  title?: string;
};

function TrustLogoLink({
  logo,
  decorative,
  density,
}: {
  logo: HomeTrustLogo;
  decorative?: boolean;
  density: TrustMarqueeDensity;
}) {
  const compact = density === "compact";

  const wrapperClassName = cn(
    "flex shrink-0 items-center justify-center",
    compact
      ? "mx-4 h-14 w-32 sm:mx-6 sm:h-16 sm:w-36 md:mx-8 md:h-[4.25rem] md:w-44 lg:h-[4.75rem] lg:w-48"
      : "mx-4 h-12 w-24 sm:mx-8 sm:h-16 sm:w-32 md:mx-12 md:h-[4.25rem] md:w-40 lg:mx-12 lg:h-[4.75rem] lg:w-44 xl:mx-14 xl:h-20 xl:w-48 2xl:mx-16 2xl:h-[5.25rem] 2xl:w-52",
  );

  const logoImage = (
    <Image
      src={logo.logo}
      alt={decorative ? "" : `${logo.name} logo`}
      width={160}
      height={48}
      loading="lazy"
      decoding="async"
      className={cn(
        "h-auto w-auto max-h-full object-contain opacity-90 transition-opacity hover:opacity-100",
        compact
          ? "h-8 max-w-[7rem] sm:h-10 sm:max-w-[8.5rem] md:h-11 md:max-w-[10rem] lg:h-12 lg:max-w-[11rem] xl:h-14 xl:max-w-[12.5rem]"
          : "h-6 max-w-[5.5rem] sm:h-8 sm:max-w-[7.5rem] md:h-10 md:max-w-[9.5rem] lg:h-12 lg:max-w-[11rem] xl:h-14 xl:max-w-[12.5rem] 2xl:h-16 2xl:max-w-[14rem]",
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

export function HomeHeroTrustMarquee({
  className,
  layout = "fullBleed",
  density = "hero",
  title,
}: HomeHeroTrustMarqueeProps) {
  // One track for all breakpoints + one aria-hidden duplicate for infinite scroll.
  const marqueeItems = [...HOME_TRUST_LOGOS, ...HOME_TRUST_LOGOS];
  const contained = layout === "contained";
  const ariaLabel = title ?? "Trusted by industry leaders";

  return (
    <div
      className={cn(
        contained
          ? "relative w-full"
          : "relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2",
        className,
      )}
    >
      {title ? (
        <p
          className={cn(
            "mb-4 text-left text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground",
          )}
        >
          {title}
        </p>
      ) : null}

      <div aria-label={ariaLabel}>
        <div
          className={cn(
            "relative overflow-hidden",
            contained && "rounded-xl",
          )}
        >
          <div
            className={cn(
              "pointer-events-none absolute inset-y-0 left-0 z-20 bg-gradient-to-r from-background to-transparent",
              contained ? "w-8 sm:w-12" : "w-10 sm:w-16 md:w-24 lg:w-40",
            )}
            aria-hidden
          />
          <div
            className={cn(
              "pointer-events-none absolute inset-y-0 right-0 z-20 bg-gradient-to-l from-background to-transparent",
              contained ? "w-8 sm:w-12" : "w-10 sm:w-16 md:w-24 lg:w-40",
            )}
            aria-hidden
          />

          <div className="flex w-max animate-infinite-scroll pt-1 hover:[animation-play-state:paused] motion-reduce:animate-none">
            {marqueeItems.map((logo, index) => (
              <TrustLogoLink
                key={`${logo.name}-${index}`}
                logo={logo}
                density={density}
                decorative={index >= HOME_TRUST_LOGOS.length}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
