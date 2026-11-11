import type { FaqItem } from "@/lib/faq-jsonld";

/**
 * Play Policy Checker landing copy.
 * Working title "Prognosis" stays off the URL and the page.
 * Rule counts are the catalog in Google_Play_Developer_Content_Policies (134 rules,
 * 24 blockers). The page says 130+ so a later rule edit does not make the line false.
 * Coverage on the report is what tells a visitor how many of those rules ran.
 */
export const PLAY_POLICY_CHECKER_PAGE_NAME =
  "Play Policy Checker. Try it out" as const;

export const PLAY_POLICY_EMAIL_API_PATH =
  "/api/hubspot/play-policy-checker" as const;

export const PLAY_POLICY_ACCESS_ID = "play-policy-access" as const;

export const PLAY_POLICY_STAGES = [
  {
    n: "01",
    title: "You send the app",
    body: "An APK, or a published Play listing. We install it on an emulator and pull the build.",
  },
  {
    n: "02",
    title: "The crawler walks it",
    body: "Login, permission prompts, and account deletion. Screenshots and UI text are saved in order.",
  },
  {
    n: "03",
    title: "The build is scanned",
    body: "Manifest, permissions, target API, SDKs, libraries, and the network security config.",
  },
  {
    n: "04",
    title: "The report arrives",
    body: "Status, score, coverage, and every finding with the policy behind it. In your inbox.",
  },
] as const;

export const PLAY_POLICY_STATUSES = [
  {
    status: "BLOCKED",
    body: "One gated failure. The score cannot lift it.",
  },
  {
    status: "NEEDS REVIEW",
    body: "A content model flagged something. A person confirms it before it counts against you.",
  },
  {
    status: "READY",
    body: "No gated failure, and no model flag still open.",
  },
] as const;

export const PLAY_POLICY_FINDINGS = [
  {
    severity: "Blocker",
    title: "Privacy policy link, inside the app",
    body: "A link that exists only on the store listing does not count. The report names the screen where it is missing.",
  },
  {
    severity: "High",
    title: "A way to delete the account",
    body: "If the app creates an account, Play expects a deletion path. The crawler looks for it after login.",
  },
  {
    severity: "High",
    title: "Target API, current enough",
    body: "One version behind the requirement fails before a reviewer opens the app. The scan reads it from the manifest.",
  },
] as const;

export const PLAY_POLICY_EVIDENCE = [
  {
    source: "The build",
    items: [
      "Permissions declared against permissions used",
      "Target API level",
      "SDKs and libraries",
      "Network security config",
    ],
  },
  {
    source: "The crawl",
    items: [
      "Privacy link on a real screen",
      "Account deletion after login",
      "Permission prompts",
      "UI text and screenshots, in order",
    ],
  },
  {
    source: "The listing",
    items: [
      "Title and description",
      "Graphics against what the app shows",
      "Content that has to match the rating",
      "Metadata that disagrees with the build",
    ],
  },
] as const;

export const PLAY_POLICY_SAMPLE_FINDINGS = [
  {
    severity: "Blocker",
    label: "Privacy link missing on the account screen",
  },
  {
    severity: "High",
    label: "No account deletion after login",
  },
  {
    severity: "High",
    label: "Target API one version behind",
  },
] as const;

export const PLAY_POLICY_FAQS: readonly FaqItem[] = [
  {
    question: "What do you need from me?",
    answer:
      "An APK, or the app's Play listing, and an email. We install it on an Android emulator, crawl it, scan the build, and send the report to that inbox.",
  },
  {
    question: "What is in the report?",
    answer:
      "A status of BLOCKED, NEEDS REVIEW, or READY. A score. How many of the applicable rules actually ran. Each finding names the policy behind it and what to fix first.",
  },
  {
    question: "Does READY mean Play will approve it?",
    answer:
      "READY means no gated failure and no model flag still open. Google Play makes the approval decision. QApilot is not affiliated with Google.",
  },
];
