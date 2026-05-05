import { MarketingBackground } from "@/components/marketing/MarketingBackground";
import HomeHeroInteractive from "@/components/HomeHeroInteractive";
import { PARTNER_LOGOS_PATH_PREFIX } from "@/lib/seo";

const HERO_LOGOS = [
  {
    name: "WIO Bank",
    logo: `${PARTNER_LOGOS_PATH_PREFIX}wio-bank-logo.png`,
    url: "https://wio.io/",
  },
  {
    name: "Orange Group",
    logo: `${PARTNER_LOGOS_PATH_PREFIX}orange-group-logo.png`,
    url: "https://www.orange.com/en",
  },
  {
    name: "Royal Enfield",
    logo: `${PARTNER_LOGOS_PATH_PREFIX}royal-enfield-logo.png`,
    url: "https://www.royalenfield.com/in/en/home/",
  },
];

export default function HeroSection() {
  return (
    <section
      className="hero-prominent relative section-edge w-full overflow-x-hidden overflow-y-visible"
      aria-label="Hero"
    >
      <MarketingBackground
        variant="hero"
        showDiagonalGrid={false}
        showPixelRipple
        progressiveBlur={false}
      />

      <div className="relative z-10 w-full section-full py-16 sm:py-20 md:py-24 lg:py-28 2xl:py-32">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center px-1 sm:px-0">
          <HomeHeroInteractive />

          <div className="w-full max-w-2xl border-t border-border/80 pt-7 sm:max-w-3xl sm:pt-9 md:pt-11">
            <div className="mx-auto grid w-full grid-cols-3 items-center justify-items-center gap-3 px-2 py-3 sm:gap-6 sm:px-4 sm:py-4">
              {HERO_LOGOS.map((logo) => (
                <a
                  key={logo.name}
                  href={logo.url}
                  target="_blank"
                  rel="noopener"
                  className="flex w-full max-w-[210px] items-center justify-center py-2 transition-opacity hover:opacity-90"
                >
                  <img
                    src={logo.logo}
                    alt={`${logo.name} logo`}
                    width={248}
                    height={80}
                    loading="lazy"
                    decoding="async"
                    className="h-12 w-auto max-h-[56px] max-w-[min(100%,182px)] object-contain sm:h-16 sm:max-h-[72px] sm:max-w-[198px]"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
