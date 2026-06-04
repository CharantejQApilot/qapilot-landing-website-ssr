import type { StoredAttribution } from "../lib/attribution";

declare global {
  interface Window {
    /** QA: full parsed attribution state from localStorage */
    __qapilotAttribution?: StoredAttribution;
    /** QA: flat payload shape used for future form submits */
    __qapilotAttributionPayload?: Record<string, string>;
    /** Microsoft Clarity behavior analytics API */
    clarity?: (...args: unknown[]) => void;
  }
}

export {};
