"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  getAttributionPayload,
  getStoredAttribution,
  saveAttribution,
} from "@/lib/attribution";

/**
 * Runs on mount and on App Router navigations (path / query) to refresh last-touch
 * attribution and sync localStorage.
 */
export default function AttributionTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();

  useEffect(() => {
    saveAttribution();
    window.__qapilotAttribution = getStoredAttribution();
    window.__qapilotAttributionPayload = getAttributionPayload();
  }, [pathname, search]);

  return null;
}
