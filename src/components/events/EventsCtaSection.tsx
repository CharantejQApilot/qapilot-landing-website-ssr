import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PATHS } from "@/lib/routes";
import {
  marketingEyebrowClass,
  marketingSectionH2Class,
} from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";

export function EventsCtaSection() {
  return (
    <section
      className="relative section-navy overflow-hidden section-edge w-full border-t border-white/10"
      aria-labelledby="events-cta-heading"
    >
      <div className="absolute inset-0 bg-dot-pattern-subtle opacity-20 pointer-events-none" aria-hidden />
      <div className="section-full relative z-10 py-16 md:py-20 2xl:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className={cn(marketingEyebrowClass, "text-primary-foreground/50")}>
            Get started
          </p>
          <h2
            id="events-cta-heading"
            className={cn(marketingSectionH2Class, "text-white mb-5 md:mb-6 text-balance")}
          >
            Your mobile app ships weekly. Can your testing keep up?
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/50 md:text-lg">
            QApilot explores your app autonomously, so moving fast never means shipping broken.
            See it run on your own iOS, Android, or Flutter app in a 45-minute demo.
          </p>
          <div className="mt-8 flex justify-center md:mt-10">
            <Button
              size="lg"
              className="bg-white text-[hsl(var(--navy))] hover:bg-white/90 font-semibold text-base px-8 py-6 rounded-lg 2xl:text-lg 2xl:px-10 2xl:py-7"
              asChild
            >
              <Link href={PATHS.BOOK_DEMO}>Book a Demo →</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
