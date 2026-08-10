"use client";

import { ScenicYoutubeVideo } from "@/components/marketing/ScenicYoutubeVideo";

const VIDEO_ID = "0rFUbrdW_fc";

export function AutonomousTestingWalkthroughVideo() {
  return (
    <ScenicYoutubeVideo
      videoId={VIDEO_ID}
      ariaLabel="Autonomous testing walkthrough video"
    />
  );
}
