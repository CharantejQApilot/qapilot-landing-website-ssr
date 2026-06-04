"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { getStoredAttribution } from "@/lib/attribution";

function clarity(...args: unknown[]) {
  if (typeof window.clarity === "function") {
    window.clarity(...args);
  }
}

/**
 * Keeps Clarity in sync with App Router navigations and attaches attribution tags
 * so sessions can be filtered by landing page, channel, and campaign in Clarity.
 */
export default function ClarityTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();

  useEffect(() => {
    const page = search ? `${pathname}?${search}` : pathname;
    clarity("set", "page", page);

    const attribution = getStoredAttribution();
    const touch = attribution.lastTouch ?? attribution.firstTouch;
    if (touch?.source) clarity("set", "utm_source", touch.source);
    if (touch?.medium) clarity("set", "utm_medium", touch.medium);
    if (touch?.campaign) clarity("set", "utm_campaign", touch.campaign);
    if (attribution.sessionEntryChannel) {
      clarity("set", "entry_channel", attribution.sessionEntryChannel);
    }
    if (attribution.sessionEntryPlatform) {
      clarity("set", "entry_platform", attribution.sessionEntryPlatform);
    }
  }, [pathname, search]);

  return null;
}
