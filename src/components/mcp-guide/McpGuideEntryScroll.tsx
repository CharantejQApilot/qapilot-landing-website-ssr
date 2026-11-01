"use client";

import { useLayoutEffect } from "react";
import { peekLastPath } from "@/components/route-memory";
import { PATHS } from "@/lib/routes";

const GUIDE_START_ID = "overview";

const ARRIVALS_THAT_SKIP_HERO = new Set<string>([PATHS.HOME, PATHS.MCP]);

function referrerPath(): string | null {
  if (!document.referrer) return null;
  try {
    const url = new URL(document.referrer);
    if (url.origin !== window.location.origin) return null;
    return url.pathname.replace(/\/$/, "") || "/";
  } catch {
    return null;
  }
}

/** Jump without the site-wide smooth scroll, which would pan across the hero. */
function jumpTo(top: number) {
  const root = document.documentElement;
  const previous = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  window.scrollTo(0, Math.max(0, top));
  root.style.scrollBehavior = previous;
}

function scrollToEntry() {
  const hash = window.location.hash.replace("#", "");
  if (hash) {
    const target = document.getElementById(hash);
    if (!target) return;
    const margin = Number.parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
    jumpTo(target.getBoundingClientRect().top + window.scrollY - margin);
    return;
  }

  const previous = peekLastPath();
  const cameFromHomeOrMcp =
    previous != null
      ? ARRIVALS_THAT_SKIP_HERO.has(previous)
      : ARRIVALS_THAT_SKIP_HERO.has(referrerPath() ?? "");

  if (!cameFromHomeOrMcp) {
    jumpTo(0);
    return;
  }

  const guide = document.getElementById(GUIDE_START_ID);
  if (!guide) return;
  jumpTo(guide.getBoundingClientRect().top + window.scrollY);
}

/**
 * Direct visits start at the hero. Visits from the homepage or the MCP
 * page skip it and open on the guide. A hash always wins.
 *
 * Next scrolls the new page to the top from the layout, after this
 * component's layout effect. The microtask runs once that scroll has
 * finished and before the browser paints.
 */
export function McpGuideEntryScroll() {
  useLayoutEffect(() => {
    let cancelled = false;
    let userMoved = false;
    let applying = false;
    let expected = window.scrollY;

    const apply = () => {
      if (userMoved) return;
      applying = true;
      scrollToEntry();
      expected = window.scrollY;
      applying = false;
    };

    const onScroll = () => {
      if (applying) return;
      if (Math.abs(window.scrollY - expected) > 2) userMoved = true;
    };

    // Attach after the first jump so Next's own scroll-to-top is ignored.
    queueMicrotask(() => {
      if (cancelled) return;
      apply();
      window.addEventListener("scroll", onScroll, { passive: true });
    });

    // The promo strip mounts after idle and would shove the guide downward.
    const chrome = document.querySelector("[data-site-header]")?.parentElement;
    const observer = new MutationObserver(() => apply());
    if (chrome) observer.observe(chrome, { childList: true });

    const stop = window.setTimeout(() => {
      userMoved = true;
      observer.disconnect();
    }, 4000);

    return () => {
      cancelled = true;
      userMoved = true;
      observer.disconnect();
      window.clearTimeout(stop);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}
