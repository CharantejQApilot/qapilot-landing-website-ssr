/** Curated authoritative external URLs for mobile app testing articles. */

export type ExternalLinkPick = { anchor: string; target_url: string };

const CATALOG: ExternalLinkPick[] = [
  {
    anchor: "Apple TestFlight documentation",
    target_url: "https://developer.apple.com/testflight/",
  },
  {
    anchor: "XCTest documentation",
    target_url: "https://developer.apple.com/documentation/xctest",
  },
  {
    anchor: "Android app testing fundamentals",
    target_url: "https://developer.android.com/training/testing",
  },
  {
    anchor: "Espresso testing framework",
    target_url: "https://developer.android.com/training/testing/espresso",
  },
  {
    anchor: "Google Play Console",
    target_url: "https://developer.android.com/distribute/console",
  },
  {
    anchor: "Appium documentation",
    target_url: "https://appium.io/docs/en/latest/",
  },
  {
    anchor: "Maestro mobile testing",
    target_url: "https://maestro.mobile.dev/",
  },
  {
    anchor: "Detox end-to-end testing",
    target_url: "https://wix.github.io/Detox/",
  },
  {
    anchor: "OWASP Mobile Application Security",
    target_url: "https://owasp.org/www-project-mobile-app-security/",
  },
  {
    anchor: "Android vitals and release quality",
    target_url: "https://developer.android.com/topic/performance/vitals",
  },
  {
    anchor: "Flutter testing overview",
    target_url: "https://docs.flutter.dev/testing",
  },
  {
    anchor: "Apple App Store review guidelines",
    target_url: "https://developer.apple.com/app-store/review/guidelines/",
  },
];

function scoreLink(
  link: ExternalLinkPick,
  haystack: string,
): number {
  const url = link.target_url.toLowerCase();
  let score = 0;
  if (haystack.includes("ios") || haystack.includes("xctest") || haystack.includes("testflight")) {
    if (url.includes("apple.com")) score += 3;
  }
  if (haystack.includes("android") || haystack.includes("espresso") || haystack.includes("play")) {
    if (url.includes("android.com")) score += 3;
  }
  if (haystack.includes("appium")) {
    if (url.includes("appium.io")) score += 5;
  }
  if (haystack.includes("maestro")) {
    if (url.includes("maestro")) score += 5;
  }
  if (haystack.includes("detox")) {
    if (url.includes("detox")) score += 5;
  }
  if (haystack.includes("flutter")) {
    if (url.includes("flutter.dev")) score += 5;
  }
  if (haystack.includes("security") || haystack.includes("owasp")) {
    if (url.includes("owasp")) score += 5;
  }
  if (haystack.includes("release") || haystack.includes("store")) {
    if (url.includes("review/guidelines") || url.includes("console") || url.includes("vitals"))
      score += 2;
  }
  return score;
}

/** Pick 3 external links ranked for the brief (deterministic, no LLM). */
export function pickExternalLinksForBrief(
  topicCluster: string,
  primaryKeyword: string,
  intent: string,
): ExternalLinkPick[] {
  const haystack = `${topicCluster} ${primaryKeyword} ${intent}`.toLowerCase();
  const ranked = [...CATALOG]
    .map((link) => ({ link, score: scoreLink(link, haystack) }))
    .sort((a, b) => b.score - a.score);

  const picked: ExternalLinkPick[] = [];
  const seenHosts = new Set<string>();

  for (const { link } of ranked) {
    if (picked.length >= 3) break;
    try {
      const host = new URL(link.target_url).hostname;
      if (seenHosts.has(host) && picked.length >= 2) continue;
      seenHosts.add(host);
      picked.push(link);
    } catch {
      picked.push(link);
    }
  }

  while (picked.length < 3) {
    const next = CATALOG.find((l) => !picked.some((p) => p.target_url === l.target_url));
    if (!next) break;
    picked.push(next);
  }

  return picked.slice(0, 3);
}
