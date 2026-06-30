"use client";

import { useCallback, useEffect, useState } from "react";
import {
  HOME_POPUP_IDLE_MS,
  HOME_POPUP_MIN_TIME_MS,
  HOME_POPUP_SCROLL_THRESHOLD,
  canHomePopupTrigger,
  getHomePageScrollDepth,
  markHomePopupDismissedThisVisit,
  markHomePopupShownThisVisit,
  markHomePopupSubmitted,
} from "@/lib/home-exit-popup";

const ACTIVITY_EVENTS = ["mousemove", "mousedown", "keydown", "scroll", "touchstart", "pointerdown"] as const;

/**
 * Shows the home popup when either:
 * 1. User scrolled past threshold AND has been on page ≥ 15s, or
 * 2. User has been idle ≥ 45s (“still here?”).
 *
 * Suppressed when closed (until refresh), after submit (7 days), or after one show per visit.
 */
export function useHomeEngagementPopup(active: boolean) {
  const [open, setOpen] = useState(false);

  const tryOpen = useCallback(() => {
    if (!canHomePopupTrigger()) return;
    markHomePopupShownThisVisit();
    setOpen(true);
  }, []);

  useEffect(() => {
    if (!active || !canHomePopupTrigger()) return;

    let timeOnPageReady = false;
    let maxScrollDepth = getHomePageScrollDepth();
    let lastActivityAt = Date.now();

    const timeTimer = window.setTimeout(() => {
      timeOnPageReady = true;
      if (maxScrollDepth >= HOME_POPUP_SCROLL_THRESHOLD) {
        tryOpen();
      }
    }, HOME_POPUP_MIN_TIME_MS);

    const onActivity = () => {
      lastActivityAt = Date.now();
    };

    const onScroll = () => {
      onActivity();
      maxScrollDepth = Math.max(maxScrollDepth, getHomePageScrollDepth());
      if (timeOnPageReady && maxScrollDepth >= HOME_POPUP_SCROLL_THRESHOLD) {
        tryOpen();
      }
    };

    const idleInterval = window.setInterval(() => {
      if (Date.now() - lastActivityAt >= HOME_POPUP_IDLE_MS) {
        tryOpen();
      }
    }, 1_000);

    for (const event of ACTIVITY_EVENTS) {
      window.addEventListener(event, onActivity, { passive: true });
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.clearTimeout(timeTimer);
      window.clearInterval(idleInterval);
      window.removeEventListener("scroll", onScroll);
      for (const event of ACTIVITY_EVENTS) {
        window.removeEventListener(event, onActivity);
      }
    };
  }, [active, tryOpen]);

  const onOpenChange = useCallback((next: boolean) => {
    if (!next) markHomePopupDismissedThisVisit();
    setOpen(next);
  }, []);

  const onSubmitSuccess = useCallback(() => {
    markHomePopupSubmitted();
    setOpen(false);
  }, []);

  return { open, onOpenChange, onSubmitSuccess };
}
