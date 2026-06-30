/** Min time on home before engagement trigger can fire. */
export const HOME_POPUP_MIN_TIME_MS = 15_000;

/** Scroll depth (0–1) required for engagement trigger. */
export const HOME_POPUP_SCROLL_THRESHOLD = 0.25;

/** Idle duration before “still here?” trigger fires. */
export const HOME_POPUP_IDLE_MS = 45_000;

export const HOME_POPUP_SUBMIT_STORAGE_KEY = "qapilot-home-popup-submitted-at";

const SUBMIT_SUPPRESS_MS = 7 * 24 * 60 * 60 * 1000;

/** Closed popup — in-memory until full page refresh. */
let dismissedThisVisit = false;

/** Popup already shown this visit — only one show per load. */
let shownThisVisit = false;

export function isHomePopupDismissedThisVisit(): boolean {
  return dismissedThisVisit;
}

export function markHomePopupDismissedThisVisit(): void {
  dismissedThisVisit = true;
}

export function hasHomePopupShownThisVisit(): boolean {
  return shownThisVisit;
}

export function markHomePopupShownThisVisit(): void {
  shownThisVisit = true;
}

export function isHomePopupSubmitSuppressed(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem(HOME_POPUP_SUBMIT_STORAGE_KEY);
    if (!raw) return false;
    const submittedAt = Number(raw);
    if (!Number.isFinite(submittedAt)) return false;
    return Date.now() - submittedAt < SUBMIT_SUPPRESS_MS;
  } catch {
    return false;
  }
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
    !isHomePopupSubmitSuppressed()
  );
}
