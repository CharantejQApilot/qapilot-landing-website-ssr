import { ScenicFramedImage } from "@/components/marketing/ScenicFramedImage";
import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";
import { SECURITY_REPORT_DASHBOARD_IMAGE_PATH } from "@/lib/core-advantage-scenic-urls.mjs";

const DASHBOARD_WIDTH = 1024;
const DASHBOARD_HEIGHT = 593;

export function SecurityReportsIssueDeepDiveSection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-gradient-to-b from-muted/10 via-background to-background"
      aria-labelledby="sr-deepdive-heading"
    >
      <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
        <MarketingSectionHeader
          id="sr-deepdive-heading"
          title={
            <>
              Every Issue,{" "}
              <span className="text-primary">Explained and Actionable</span>
            </>
          }
          description="See the finding, why it matters, and what to change. Without leaving your test workflow."
          marginBottomClassName="mb-12 md:mb-14 2xl:mb-16"
        />

        <div className="mx-auto max-w-6xl">
          <ScenicFramedImage
            src={SECURITY_REPORT_DASHBOARD_IMAGE_PATH}
            width={DASHBOARD_WIDTH}
            height={DASHBOARD_HEIGHT}
            alt="Security report overview in QApilot showing issues, severity, and context"
            ariaLabel="Product screenshot: security report overview"
            priority
          />
        </div>
      </div>
    </section>
  );
}
