import { BookDemoLeadForm } from "@/components/book-demo/BookDemoLeadForm";
import { BookDemoTrustLogos } from "@/components/book-demo/BookDemoTrustLogos";
import { BOOK_DEMO_FORM_ID } from "@/lib/book-demo";
import { MarketingBackground } from "@/components/marketing/MarketingBackground";
import {
  marketingFormIntroClass,
  marketingFormTitleClass,
} from "@/lib/forms/marketing-form-classes";
import { marketingHeroH1Class, marketingHeroLeadClass } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";

export function BookDemoHero() {
  return (
    <section
      className={cn(
        "hero-prominent relative section-edge w-full overflow-x-hidden overflow-y-visible",
        "lg:flex lg:min-h-[calc(100dvh-4.375rem)] lg:items-center",
      )}
      aria-label="Book A Demo"
    >
      <MarketingBackground variant="hero" showDiagonalGrid={false} showPixelRipple progressiveBlur={false} />

      <div className="relative z-10 w-full section-full py-10 sm:py-14 md:py-20 lg:py-24 2xl:py-28">
        <div
          className={cn(
            "mx-auto grid w-full max-w-7xl min-w-0 grid-cols-1 gap-10 sm:gap-12",
            "lg:max-w-none lg:grid-cols-2 lg:items-center lg:gap-x-12 lg:gap-y-0",
            "xl:gap-x-16 2xl:mx-auto 2xl:max-w-[min(100%,88rem)] 2xl:gap-x-20",
          )}
        >
          <div className="flex min-w-0 flex-col items-start text-left lg:max-w-none lg:pr-4 xl:pr-6">
            <p className="mb-4 w-full text-left text-sm font-semibold leading-snug tracking-tight text-primary sm:mb-5 sm:text-base md:text-lg">
              Transform Your Mobile App Testing Now
            </p>

            <h1
              className={cn(
                marketingHeroH1Class,
                "mb-5 w-full text-left text-balance sm:mb-6 md:mb-8",
                "max-lg:text-[clamp(1.75rem,5.5vw,3.25rem)] max-lg:leading-[1.1]",
              )}
            >
              Book A Demo Of{" "}
              <span className="text-hero-here">QApilot</span>
            </h1>

            <p
              className={cn(
                marketingHeroLeadClass,
                "mt-0 max-w-2xl text-left text-pretty sm:leading-relaxed",
                "lg:max-w-xl xl:max-w-2xl",
                "max-lg:text-base max-lg:sm:text-lg",
              )}
            >
              See how agentic and AI-assisted testing streamlines your mobile QA lifecycle. Ship
              faster, cut maintenance, and move toward{" "}
              <span className="font-semibold text-primary">3× coverage</span> with the QE team you already
              have.
            </p>

            <div
              className={cn(
                "mt-8 w-full border-t border-border/50 pt-8 sm:mt-10 sm:pt-10",
                "lg:mt-10 lg:max-w-xl lg:pt-10 xl:max-w-2xl",
              )}
            >
              <BookDemoTrustLogos />
            </div>
          </div>

          <div id={BOOK_DEMO_FORM_ID} className="min-w-0 w-full scroll-mt-28 lg:pl-2 xl:pl-4">
            <div
              className={cn(
                "relative flex h-full min-h-0 w-full min-w-0 flex-col overflow-hidden rounded-2xl",
                "border border-border/60 bg-card/90 p-5 shadow-[0_24px_80px_-24px_hsl(220_25%_8%/0.28)] backdrop-blur-md",
                "ring-1 ring-primary/[0.06] sm:p-7 md:p-8",
                "before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-primary/[0.08] before:via-transparent before:to-transparent",
                "after:pointer-events-none after:absolute after:-right-16 after:-top-16 after:h-48 after:w-48 after:rounded-full after:bg-primary/[0.07] after:blur-3xl",
              )}
            >
              <div className="relative z-[1] space-y-1.5 pb-5 sm:pb-6">
                <h2 className={marketingFormTitleClass}>Test Your Mobile App on QApilot</h2>
                <p className={marketingFormIntroClass}>
                  Share a few details and we&apos;ll reach out to schedule a session.
                </p>
              </div>
              <div className="relative z-[1] min-h-0 min-w-0 flex-1 rounded-xl border border-border/40 bg-background/80 p-3 shadow-inner shadow-primary/[0.03] sm:p-4 md:p-5">
                <BookDemoLeadForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
