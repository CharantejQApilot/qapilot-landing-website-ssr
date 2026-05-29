"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const VercelAnalytics = dynamic(
  () => import("@vercel/analytics/next").then((m) => ({ default: m.Analytics })),
  { ssr: false },
);

/** Mount Vercel Analytics after the main thread settles. */
export default function DeferredAnalytics() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mount = () => setReady(true);
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(mount, { timeout: 4000 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(mount, 2000);
    return () => clearTimeout(t);
  }, []);

  return ready ? <VercelAnalytics /> : null;
}
