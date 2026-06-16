import { HOME_TRUST_LOGOS, type HomeTrustLogo } from "@/lib/home-trust-logos";
import { marketingEyebrowClass } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";

const BOOK_DEMO_TRUST_LOGO_NAMES = ["Royal Enfield", "WIO Bank", "Orange Group"] as const;

const BOOK_DEMO_TRUST_LOGOS: HomeTrustLogo[] = BOOK_DEMO_TRUST_LOGO_NAMES.map((name) => {
  const logo = HOME_TRUST_LOGOS.find((entry) => entry.name === name);
  if (!logo) throw new Error(`Missing trust logo: ${name}`);
  return logo;
});

function TrustLogoCell({ logo }: { logo: HomeTrustLogo }) {
  const image = (
    <img
      src={logo.logo}
      alt={`${logo.name} logo`}
      width={180}
      height={56}
      loading="lazy"
      decoding="async"
      className="h-auto max-h-11 w-auto max-w-full object-contain opacity-90 transition-opacity duration-200 group-hover:opacity-100 sm:max-h-12 md:max-h-14 lg:max-h-[3.75rem]"
      style={{ transform: `scale(${logo.visualScale})`, transformOrigin: "center" }}
    />
  );

  const cellClassName = cn(
    "group flex min-h-[4.5rem] items-center justify-center px-3 py-2 sm:min-h-[5rem] sm:px-4 md:min-h-[5.25rem]",
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
};

export function BookDemoTrustLogos({ className }: BookDemoTrustLogosProps) {
  return (
    <div className={cn("w-full", className)}>
      <p className={cn(marketingEyebrowClass, "mb-5 sm:mb-6")}>
        Trusted By The Industry Leaders
      </p>

      {/*
        Mobile: Royal Enfield full width, then WIO + Orange side by side.
        sm+: single balanced row of three equal columns.
      */}
      <ul
        className={cn(
          "grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:gap-5",
          "list-none p-0 m-0",
        )}
        aria-label="Trusted by industry leaders"
      >
        <li className="col-span-2 sm:col-span-1">
          <TrustLogoCell logo={BOOK_DEMO_TRUST_LOGOS[0]} />
        </li>
        <li>
          <TrustLogoCell logo={BOOK_DEMO_TRUST_LOGOS[1]} />
        </li>
        <li>
          <TrustLogoCell logo={BOOK_DEMO_TRUST_LOGOS[2]} />
        </li>
      </ul>
      <p className={cn(marketingEyebrowClass, "mt-4 mb-0 normal-case sm:mt-5")}>And More...</p>
    </div>
  );
}
