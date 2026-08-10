import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";
import { FlutterTestingWalkthroughVideo } from "./FlutterTestingWalkthroughVideo";

export function FlutterTestingVideoSection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-gradient-to-b from-muted/20 via-background to-background"
      aria-labelledby="flutter-video-heading"
    >
      <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
        <MarketingSectionHeader
          id="flutter-video-heading"
          title={
            <>
              The Best <span className="text-primary">AI-Native</span> Platform
              for <span className="text-primary">Flutter Testing</span>
            </>
          }
          description="Watch how QApilot explores, maps, and stress-tests real mobile flows. Including Flutter, native, and webview in one continuous run."
          marginBottomClassName="mb-12 md:mb-14 2xl:mb-16"
        />

        <div className="mx-auto w-full max-w-6xl 2xl:max-w-7xl">
          <FlutterTestingWalkthroughVideo />
        </div>
      </div>
    </section>
  );
}
