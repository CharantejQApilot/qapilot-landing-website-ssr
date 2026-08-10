"use client";

import { ScenicYoutubeVideo } from "@/components/marketing/ScenicYoutubeVideo";

const VIDEO_ID = "q33CaqaFy6A";

export function FlutterTestingWalkthroughVideo() {
  return (
    <ScenicYoutubeVideo
      videoId={VIDEO_ID}
      ariaLabel="Walkthrough: Flutter testing on QApilot"
    />
  );
}
