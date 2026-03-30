"use client";

import { ScenicYoutubeVideo } from "@/components/marketing/ScenicYoutubeVideo";
import { AUTONOMOUS_WALKTHROUGH_SCENIC_URL } from "@/lib/core-advantage-scenic-urls.mjs";

const VIDEO_ID = "0rFUbrdW_fc";

export function AutonomousTestingWalkthroughVideo() {
  return (
    <ScenicYoutubeVideo
      videoId={VIDEO_ID}
      scenicUrl={AUTONOMOUS_WALKTHROUGH_SCENIC_URL}
      ariaLabel="Autonomous testing walkthrough video"
    />
  );
}
