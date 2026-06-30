import { HOME_TRUST_LOGOS, type HomeTrustLogo } from "@/lib/home-trust-logos";
import { marketingEyebrowClass } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";

const BOOK_DEMO_TRUST_LOGO_NAMES = ["Royal Enfield", "WIO Bank", "Orange Group"] as const;

const BOOK_DEMO_TRUST_LOGOS: HomeTrustLogo[] = BOOK_DEMO_TRUST_LOGO_NAMES.map((name) => {
  const logo = HOME_TRUST_LOGOS.find((entry) => entry.name === name);
  if (!logo) throw new Error(`Missing trust logo: ${name}`);
  return logo;
});

function TrustLogoCell({ logo, compact }: { logo: HomeTrustLogo; compact?: boolean }) {
  const image = (
    <img
      src={logo.logo}
      alt={`${logo.name} logo`}
      width={180}
      height={56}
      loading="lazy"
      decoding="async"
      className={cn(
        "h-auto w-auto max-w-full object-contain opacity-90 transition-opacity duration-200 group-hover:opacity-100",
        compact
          ? "max-h-8 sm:max-h-9"
          : "max-h-11 sm:max-h-12 md:max-h-14 lg:max-h-[3.75rem]",
      )}
      style={{ transform: `scale(${logo.visualScale})`, transformOrigin: "center" }}
    />
  );

  const cellClassName = cn(
    "group flex items-center justify-center",
    compact ? "min-h-0 px-1 py-1" : "min-h-[4.5rem] px-3 py-2 sm:min-h-[5rem] sm:px-4 md:min-h-[5.25rem]",
  );

  if (!logo.url) {
    return <div className={cellClassName}>{image}</div>;
  }

  return (
    <a href={logo.url} target="_blank" rel="noopener" className={cellClassName}>
      {image}
    </a>
  );
}

type BookDemoTrustLogosProps = {
  className?: string;
  compact?: boolean;
};

export function BookDemoTrustLogos({ className, compact = false }: BookDemoTrustLogosProps) {
  return (
    <div className={cn("w-full", className)}>
      {!compact ? (
        <p className={cn(marketingEyebrowClass, "mb-5 sm:mb-6")}>
          Trusted By The Industry Leaders
        </p>
      ) : null}

      <ul
        className={cn(
          "grid w-full list-none p-0 m-0",
          compact
            ? "grid-cols-1 gap-2"
            : "grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:gap-5",
        )}
        aria-label="Trusted by industry leaders"
      >
        <li className={compact ? undefined : "col-span-2 sm:col-span-1"}>
          <TrustLogoCell logo={BOOK_DEMO_TRUST_LOGOS[0]} compact={compact} />
        </li>
        <li>
          <TrustLogoCell logo={BOOK_DEMO_TRUST_LOGOS[1]} compact={compact} />
        </li>
        <li>
          <TrustLogoCell logo={BOOK_DEMO_TRUST_LOGOS[2]} compact={compact} />
        </li>
      </ul>
      {!compact ? (
        <p className={cn(marketingEyebrowClass, "mt-4 mb-0 normal-case sm:mt-5")}>And More...</p>
      ) : null}
    </div>
  );
}
