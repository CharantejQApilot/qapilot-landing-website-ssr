"use client";

import { ScenicYoutubeVideo } from "@/components/marketing/ScenicYoutubeVideo";
import { FLUTTER_TESTING_VIDEO_SCENIC_URL } from "@/lib/core-advantage-scenic-urls.mjs";
import type { PlatformTestingContent } from "@/lib/platform-testing";

const VIDEO_ID = "q33CaqaFy6A";

export function PlatformTestingWalkthroughVideo({ content }: { content: PlatformTestingContent }) {
  return (
    <ScenicYoutubeVideo
      videoId={VIDEO_ID}
      scenicUrl={FLUTTER_TESTING_VIDEO_SCENIC_URL}
      ariaLabel={content.videoAriaLabel}
    />
  );
}
