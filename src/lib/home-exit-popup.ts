/** Min time on home before engagement trigger can fire. */
export const HOME_POPUP_MIN_TIME_MS = 60_000;

/** Scroll depth (0–1) required for engagement trigger. */
export const HOME_POPUP_SCROLL_THRESHOLD = 0.5;

/** Idle duration before “still here?” trigger fires. */
export const HOME_POPUP_IDLE_MS = 120_000;

export const HOME_POPUP_SUBMIT_STORAGE_KEY = "qapilot-home-popup-submitted-at";
export const HOME_POPUP_DISMISS_STORAGE_KEY = "qapilot-home-popup-dismissed-at";

const SUBMIT_SUPPRESS_MS = 7 * 24 * 60 * 60 * 1000;
/** After close without submit — stay quiet for a few hours (not just until refresh). */
const DISMISS_SUPPRESS_MS = 4 * 60 * 60 * 1000;

/** Closed popup — in-memory until full page refresh. */
let dismissedThisVisit = false;

/** Popup already shown this visit — only one show per load. */
let shownThisVisit = false;

function isTimestampSuppressed(storageKey: string, windowMs: number): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return false;
    const at = Number(raw);
    if (!Number.isFinite(at)) return false;
    return Date.now() - at < windowMs;
  } catch {
    return false;
  }
}

export function isHomePopupDismissedThisVisit(): boolean {
  return dismissedThisVisit;
}

export function markHomePopupDismissedThisVisit(): void {
  dismissedThisVisit = true;
  try {
    localStorage.setItem(HOME_POPUP_DISMISS_STORAGE_KEY, String(Date.now()));
  } catch {
    // Private browsing — in-memory flag still applies for this visit.
  }
}

export function isHomePopupDismissSuppressed(): boolean {
  return isTimestampSuppressed(HOME_POPUP_DISMISS_STORAGE_KEY, DISMISS_SUPPRESS_MS);
}

export function hasHomePopupShownThisVisit(): boolean {
  return shownThisVisit;
}

export function markHomePopupShownThisVisit(): void {
  shownThisVisit = true;
}

export function isHomePopupSubmitSuppressed(): boolean {
  return isTimestampSuppressed(HOME_POPUP_SUBMIT_STORAGE_KEY, SUBMIT_SUPPRESS_MS);
}

export function markHomePopupSubmitted(): void {
  try {
    localStorage.setItem(HOME_POPUP_SUBMIT_STORAGE_KEY, String(Date.now()));
  } catch {
    // Private browsing — suppress for this visit via dismiss flag instead.
    markHomePopupDismissedThisVisit();
  }
  markHomePopupDismissedThisVisit();
}

export function getHomePageScrollDepth(): number {
  if (typeof window === "undefined") return 0;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (scrollHeight <= 0) return 1;
  return Math.min(1, window.scrollY / scrollHeight);
}

export function canHomePopupTrigger(): boolean {
  return (
    !isHomePopupDismissedThisVisit() &&
    !hasHomePopupShownThisVisit() &&
    !isHomePopupSubmitSuppressed() &&
    !isHomePopupDismissSuppressed()
  );
}
