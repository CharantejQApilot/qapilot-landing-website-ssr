import { ArrowUpRight } from "lucide-react";
import Logo from "@/components/Logo";

const EVENT_PAGE = "https://www.thetesttribe.com/qonfx/hyderabad/";

/** Warm sponsorship band between the integrations and the key takeaways. */
export function HomeSponsorshipSection() {
  return (
    <section
      className="relative section-edge bg-[#FFF1EC]"
      aria-labelledby="home-sponsorship"
    >
      <div className="section-full grid grid-cols-1 items-center gap-5 py-8 sm:py-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-x-8 lg:py-11 xl:grid-cols-[auto_minmax(0,1fr)_auto] xl:gap-x-12">
        <div className="flex min-w-0 items-center gap-3 sm:gap-4 lg:col-start-1 lg:row-start-1">
          <span className="inline-flex max-w-[7.25rem] sm:max-w-none">
            <Logo className="h-8 sm:h-10 xl:h-11" alt="QApilot" />
          </span>
          <span className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#EE6F57]">
            sponsors
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/qonfx-logo.svg"
            alt="QonfX"
            width={400}
            height={115}
            className="h-7 w-auto max-w-[4.5rem] sm:h-9 sm:max-w-none xl:h-10"
          />
        </div>

        <div className="min-w-0 lg:col-span-2 xl:col-span-1 xl:col-start-2 xl:row-start-1 xl:justify-self-center xl:text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#EE6F57] sm:text-xs">
            Gold sponsor · Hyderabad
          </p>
          <h2
            id="home-sponsorship"
            className="mt-1 font-heading text-xl font-semibold tracking-tight text-[#1C1412] sm:text-2xl"
          >
            Invite-only conference for quality and AI leaders
          </h2>
          <p className="mt-1 text-sm text-[#1C1412]/70 sm:text-base">
            Thursday, 3 December 2026
          </p>
        </div>

        <a
          href={EVENT_PAGE}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 w-fit items-center justify-center gap-1.5 justify-self-start rounded-md bg-[#EE6F57] px-6 text-base font-semibold text-white transition-colors hover:bg-[#e25d44] lg:col-start-2 lg:row-start-1 lg:justify-self-end xl:col-start-3"
        >
          See the event
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </a>
      </div>
    </section>
  );
}
