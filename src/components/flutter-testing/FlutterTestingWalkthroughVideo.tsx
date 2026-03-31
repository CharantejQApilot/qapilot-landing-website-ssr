"use client";

import { ScenicYoutubeVideo } from "@/components/marketing/ScenicYoutubeVideo";
import { FLUTTER_TESTING_VIDEO_SCENIC_URL } from "@/lib/core-advantage-scenic-urls.mjs";

const VIDEO_ID = "q33CaqaFy6A";

export function FlutterTestingWalkthroughVideo() {
  return (
    <ScenicYoutubeVideo
      videoId={VIDEO_ID}
      scenicUrl={FLUTTER_TESTING_VIDEO_SCENIC_URL}
      ariaLabel="Walkthrough: Flutter testing on QApilot"
    />
  );
}
