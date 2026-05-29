"use client";

import { useEffect } from "react";
import { HUBSPOT_NA1_PORTAL_ID } from "@/lib/constants";

const REB2B_KEY = "9NMMZHRD91NW";

function loadReb2b() {
  if (typeof window === "undefined" || window.reb2b) return;
  window.reb2b = { loaded: true };
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://ddwl4m2hdecbv.cloudfront.net/b/${REB2B_KEY}/${REB2B_KEY}.js.gz`;
  document.head.appendChild(s);
}

function loadHubSpotTracking() {
  if (typeof document === "undefined") return;
  if (document.querySelector('script[src*="js.hs-scripts.com"]')) return;
  const s = document.createElement("script");
  s.id = "hs-script-loader";
  s.async = true;
  s.src = `https://js.hs-scripts.com/${HUBSPOT_NA1_PORTAL_ID}.js`;
  document.head.appendChild(s);
}

declare global {
  interface Window {
    reb2b?: { loaded: boolean };
  }
}

/**
 * Loads non-critical marketing trackers after first user interaction (or a long idle fallback)
 * so they stay out of the Lighthouse TBT measurement window on desktop.
 */
export default function DeferredMarketingScripts() {
  useEffect(() => {
    let loaded = false;

    const load = () => {
      if (loaded) return;
      loaded = true;
      loadReb2b();
      loadHubSpotTracking();
    };

    const events = ["scroll", "click", "touchstart", "keydown"] as const;
    for (const event of events) {
      window.addEventListener(event, load, { once: true, passive: true });
    }

    const fallback = window.setTimeout(load, 12_000);

    return () => {
      window.clearTimeout(fallback);
    };
  }, []);

  return null;
}
