import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import BookDemoCtaButton from "@/components/compare/BookDemoCtaButton";
import { MarketingBackground } from "@/components/marketing/MarketingBackground";
import { marketingHeroH1Class, marketingHeroLeadClass } from "@/lib/marketing-typography";
import { PATHS } from "@/lib/routes";
import { cn } from "@/lib/utils";

const heroShellClass =
 "mx-auto flex w-full min-w-0 max-w-6xl flex-col items-center lg:max-w-7xl lg:items-stretch 2xl:max-w-[min(100%,88rem)]";

const HERO_PILLARS = [
 { href: PATHS.INTELLIGENT_BUG_DETECTION, label: "Intelligent Bug Detection", payoff: "Signals beyond pass/fail" },
 { href: PATHS.SECURITY_REPORTS, label: "Security Reports", payoff: "Risk that ships with the build" },
 { href: PATHS.AI_SELF_HEALING, label: "AI Self Healing", payoff: "Stable tests through UI change" },
 { href: PATHS.DEVICE_METRICS, label: "Device Metrics", payoff: "Runtime evidence on every run" },
] as const;

/** Suite hero. One-line title & lead, four pillar links, Book a Demo. */
export function ReleaseReadinessSuiteHero() {
 return (
 <section
 className="hero-prominent relative section-edge w-full overflow-x-clip"
 aria-labelledby="release-readiness-suite-hero-title"
 >
 <MarketingBackground
 variant="hero"
 showDiagonalGrid={false}
 showPixelRipple
 progressiveBlur={false}
 />

 <div className="relative z-10 w-full">
 <div className="section-full py-16 sm:py-20 md:py-24 lg:py-28">
 <div className={heroShellClass}>
 <div className="flex w-full min-w-0 flex-col items-center lg:items-start">
 <h1
 id="release-readiness-suite-hero-title"
 className={cn(
 marketingHeroH1Class,
 "mb-4 w-full text-center text-balance sm:mb-5 lg:text-left",
 "max-lg:text-[clamp(1.75rem,6vw,3.5rem)] max-lg:leading-[1.1]",
 )}
 >
 Release Readiness <span className="text-hero-here">Suite</span>
 </h1>

 <p
 className={cn(
 marketingHeroLeadClass,
 "w-full text-center lg:text-left",
 "max-lg:text-base max-lg:sm:text-lg",
 "md:whitespace-nowrap",
 )}
 >
 Bug signals, security, self-healing, and device metrics for every release.
 </p>

 <nav
 className="mt-10 w-full sm:mt-12 md:mt-14"
 aria-label="Release Readiness Suite pillars"
 >
 <ul className="grid w-full list-none grid-cols-1 gap-0 border-t border-border/50 sm:grid-cols-2 xl:grid-cols-4">
 {HERO_PILLARS.map((pillar, index) => (
 <li
 key={pillar.href}
 className={cn(
 "border-border/50 border-b",
 "sm:border-b xl:border-b-0",
 index % 2 === 0 ? "sm:border-r" : null,
 index < 3 ? "xl:border-r" : null,
 )}
 >
 <Link
 href={pillar.href}
 className={cn(
 "group flex h-full w-full items-center gap-3 px-1 py-5 text-left sm:gap-4 sm:px-4 sm:py-6",
 "rounded-sm transition-colors duration-200",
 "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
 )}
 >
 <span className="min-w-0 flex-1">
 <span className="font-heading block text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-primary sm:text-lg">
 {pillar.label}
 </span>
 <span className="mt-0.5 block text-sm text-muted-foreground">{pillar.payoff}</span>
 </span>
 <ArrowUpRight
 aria-hidden
 className="size-5 shrink-0 text-primary/40 transition-[opacity,transform,color] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
 />
 </Link>
 </li>
 ))}
 </ul>
 </nav>

 <div className="sig-cta-row mt-10 w-full justify-center sm:mt-12 lg:justify-start">
 <BookDemoCtaButton />
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>
 );
}
