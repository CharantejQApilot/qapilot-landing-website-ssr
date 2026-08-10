import { Check } from "lucide-react";
import { BookDemoScrollToFormButton } from "@/components/book-demo/BookDemoScrollToFormButton";
import { MarketingLedger, MarketingLedgerCell } from "@/components/marketing/MarketingLedger";
import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";
import { BOOK_DEMO_BEYOND_QA, BOOK_DEMO_TESTING_MODES, type BookDemoTestingMode } from "@/lib/book-demo-what-to-expect";
import { cn } from "@/lib/utils";

function TestingModeBlock({ mode, outcomesFirst }: { mode: BookDemoTestingMode; outcomesFirst: boolean }) {
  return (
    <article className="sig-split w-full items-start gap-8 lg:items-center lg:gap-x-14 xl:gap-x-16 2xl:gap-x-20">
      <div className={cn("min-w-0 lg:flex lg:flex-col lg:justify-center", outcomesFirst && "lg:order-2")}>
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-primary/80 lg:text-sm lg:tracking-[0.14em]">
          {mode.eyebrow}
        </p>
        <h3 className="font-heading text-2xl font-semibold tracking-tight text-foreground md:text-3xl lg:text-[2rem] lg:leading-tight xl:text-4xl 2xl:text-[2.75rem]">
          {mode.title}
        </h3>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg lg:mt-5 lg:max-w-none lg:text-xl lg:leading-relaxed 2xl:text-[1.375rem]">
          {mode.description}
        </p>
        <MarketingLedger cols={2} className="mt-8 lg:mt-10" aria-label={`${mode.title} metrics`}>
          <MarketingLedgerCell as="div" className="bg-primary/[0.06]">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground lg:text-sm">Test Coverage</p>
            <p className="mt-1 font-heading text-xl font-semibold text-primary md:text-2xl lg:text-3xl xl:text-[2rem]">
              {mode.coverageValue}
            </p>
          </MarketingLedgerCell>
          <MarketingLedgerCell as="div" className="bg-muted/30">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground lg:text-sm">Est. Cost Savings</p>
            <p className="mt-1 font-heading text-xl font-semibold text-foreground md:text-2xl lg:text-3xl xl:text-[2rem]">
              {mode.savingsValue}
            </p>
          </MarketingLedgerCell>
        </MarketingLedger>
      </div>

      <div className={cn("min-w-0 lg:flex lg:items-center", outcomesFirst && "lg:order-1")}>
        <div className="w-full rounded-2xl border border-border/70 bg-card/80 px-6 py-7 backdrop-blur-sm sm:px-8 sm:py-8 lg:px-9 lg:py-9 xl:px-10 xl:py-10 2xl:px-12 2xl:py-11">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground lg:text-sm">Outcomes</p>
          <ul className="mt-4 space-y-3 lg:mt-5 lg:space-y-3.5 xl:space-y-4">
            {mode.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3 text-sm text-foreground md:text-base lg:text-lg xl:text-[1.125rem]">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary lg:h-6 lg:w-6">
                  <Check className="h-3 w-3 lg:h-3.5 lg:w-3.5" aria-hidden />
                </span>
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

export function BookDemoWhatToExpectSection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-dot-pattern-subtle"
      aria-labelledby="book-demo-expect-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-muted/[0.35] via-muted/[0.08] to-background"
        aria-hidden
      />
      <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
        <MarketingSectionHeader
          id="book-demo-expect-heading"
          title={
            <>
              What You&apos;ll <span className="text-primary">See</span>
            </>
          }
          description="Every demo is tailored to your mobile stack and release goals. Here's what to expect in the demo."
          marginBottomClassName="mb-12 md:mb-14 2xl:mb-16"
        />

        <div className="mx-auto w-full max-w-7xl space-y-16 md:space-y-20 lg:space-y-24 2xl:max-w-[84rem]">
          {BOOK_DEMO_TESTING_MODES.map((mode, index) => (
            <TestingModeBlock key={mode.id} mode={mode} outcomesFirst={index % 2 === 1} />
          ))}
        </div>

        <div className="mx-auto mt-16 w-full max-w-7xl md:mt-20 lg:mt-24 2xl:max-w-[84rem]">
          <div className="rounded-2xl border border-border/70 bg-card/80 px-6 py-8 backdrop-blur-sm sm:px-8 sm:py-10 md:px-10 lg:px-12 lg:py-12 xl:px-14">
            <h3 className="font-heading text-xl font-semibold tracking-tight text-foreground md:text-2xl lg:text-3xl">
              {BOOK_DEMO_BEYOND_QA.title}
            </h3>
            <p className="mt-3 max-w-4xl text-base leading-relaxed text-muted-foreground md:text-lg lg:mt-4 lg:text-xl 2xl:text-[1.375rem]">
              {BOOK_DEMO_BEYOND_QA.description}
            </p>
          </div>
        </div>

        <div className="mt-12 flex justify-center md:mt-16">
          <BookDemoScrollToFormButton />
        </div>
      </div>
    </section>
  );
}
