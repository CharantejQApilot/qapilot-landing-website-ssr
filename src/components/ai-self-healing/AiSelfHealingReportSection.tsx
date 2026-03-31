import { ScenicFramedImage } from "@/components/marketing/ScenicFramedImage";
import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";
import {
  AI_SELF_HEALING_EXECUTION_REPORT_IMAGE_PATH,
  AI_SELF_HEALING_REPORT_SCENIC_URL,
} from "@/lib/core-advantage-scenic-urls.mjs";

const IMG_W = 1024;
const IMG_H = 595;

export function AiSelfHealingReportSection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-gradient-to-b from-muted/10 via-background to-background"
      aria-labelledby="ash-report-heading"
    >
      <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
        <MarketingSectionHeader
          id="ash-report-heading"
          title={
            <>
              See Exactly What Was <span className="text-primary">Healed</span>
            </>
          }
          description="Execution reports show which steps recovered, how, and what changed—no black box."
          marginBottomClassName="mb-12 md:mb-14 2xl:mb-16"
        />

        <div className="mx-auto max-w-6xl">
          <ScenicFramedImage
            src={AI_SELF_HEALING_EXECUTION_REPORT_IMAGE_PATH}
            width={IMG_W}
            height={IMG_H}
            alt="Execution report showing healed steps and AI-assisted markers in QApilot"
            scenicUrl={AI_SELF_HEALING_REPORT_SCENIC_URL}
            ariaLabel="Product screenshot: self-healing execution report"
            priority
          />
        </div>
      </div>
    </section>
  );
}
