import { Compass, Map, Sparkles, Upload, Wand2 } from "lucide-react";
import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";

const STEPS = [
  { label: "Upload", icon: Upload, line: "Drop in your build." },
  { label: "Explore", icon: Compass, line: "Agents learn real paths." },
  { label: "Map", icon: Map, line: "Coverage from journeys." },
  { label: "Test", icon: Sparkles, line: "Flutter, native, webview." },
  { label: "Adapt", icon: Wand2, line: "UI moves; tests stay green." },
] as const;

export function FlutterTestingFlowSection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/50 bg-muted/[0.2]"
      aria-labelledby="flutter-flow-heading"
    >
      <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
        <MarketingSectionHeader
          id="flutter-flow-heading"
          title={
            <>
              From App to <span className="text-primary">Coverage</span>
            </>
          }
          marginBottomClassName="mb-12 md:mb-14 2xl:mb-16"
        />

        <ol className="flex flex-col gap-0 lg:hidden">
          {STEPS.map((step, index) => (
            <li key={step.label} className="group flex list-none gap-4">
              <div className="flex flex-col items-center">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-background bg-primary text-primary-foreground shadow-md ring-2 ring-primary/15 motion-safe:transition-transform motion-safe:group-hover:scale-110"
                  aria-hidden
                >
                  <step.icon className="h-4 w-4" strokeWidth={1.75} />
                </span>
                {index < STEPS.length - 1 ? (
                  <div
                    className="my-1 w-0.5 flex-1 min-h-[2.5rem] bg-gradient-to-b from-border to-border/40"
                    aria-hidden
                  />
                ) : null}
              </div>
              <div className="min-w-0 pb-10 pt-1">
                <h3 className="font-heading text-base font-semibold text-foreground">
                  {step.label}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{step.line}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="relative hidden lg:block">
          <div
            className="pointer-events-none absolute left-[8%] right-[8%] top-[1.375rem] h-0.5 bg-gradient-to-r from-transparent via-border to-transparent"
            aria-hidden
          />
          <ol className="relative grid grid-cols-5 gap-4">
            {STEPS.map((step) => (
              <li
                key={step.label}
                className="group flex list-none flex-col items-center text-center"
              >
                <span
                  className="relative z-[1] mb-5 flex h-11 w-11 items-center justify-center rounded-full border-2 border-background bg-primary text-primary-foreground shadow-lg shadow-primary/15 ring-4 ring-background motion-safe:transition-transform motion-safe:group-hover:scale-110"
                  aria-hidden
                >
                  <step.icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <h3 className="font-heading text-base font-semibold text-foreground xl:text-lg">
                  {step.label}
                </h3>
                <p className="mt-2 text-sm leading-snug text-muted-foreground">
                  {step.line}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
