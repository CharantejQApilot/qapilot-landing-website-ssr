import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";
import { PlatformTestingWalkthroughVideo } from "@/components/platform-testing/PlatformTestingWalkthroughVideo";
import type { PlatformTestingContent } from "@/lib/platform-testing";

export function PlatformTestingVideoSection({ content }: { content: PlatformTestingContent }) {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-gradient-to-b from-muted/20 via-background to-background"
      aria-labelledby={`${content.slug}-video-heading`}
    >
      <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
        <MarketingSectionHeader
          id={`${content.slug}-video-heading`}
          title={
            <>
              The Best <span className="text-primary">AI-Native</span> Platform for{" "}
              <span className="text-primary">{content.videoHeadingPlatform}</span>
            </>
          }
          description={content.videoDescription}
          marginBottomClassName="mb-12 md:mb-14 2xl:mb-16"
        />

        <div className="mx-auto w-full max-w-6xl 2xl:max-w-7xl">
          <PlatformTestingWalkthroughVideo content={content} />
        </div>
      </div>
    </section>
  );
}
