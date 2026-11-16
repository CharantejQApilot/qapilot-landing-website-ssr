import { getCleanAttributionPayloadForHubSpot } from "@/lib/attribution";
import { PLAY_POLICY_EMAIL_API_PATH } from "@/lib/play-policy-checker";

function readHubSpotUtk(): string | undefined {
  if (typeof document === "undefined") return undefined;
  const row = document.cookie
    .split("; ")
    .find((r) => r.startsWith("hubspotutk="));
  if (!row) return undefined;
  const v = row.slice("hubspotutk=".length);
  return v ? decodeURIComponent(v) : undefined;
}

/**
 * Fire-and-forget HubSpot lead capture. Errors are ignored so they never
 * block starting a scan.
 */
export function submitPlayPolicyLead(email: string): void {
  try {
    void fetch(PLAY_POLICY_EMAIL_API_PATH, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        email,
        pageUri: typeof window !== "undefined" ? window.location.href : "",
        hutk: readHubSpotUtk(),
        ...getCleanAttributionPayloadForHubSpot(),
      }),
    });
  } catch {
    /* ignore */
  }
}
