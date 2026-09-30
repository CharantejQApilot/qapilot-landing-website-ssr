import type { FaqItem } from "@/lib/faq-jsonld";

export const BOOK_DEMO_HERO = {
  eyebrow: "Transform Your Mobile App Testing Now",
  titleLead: "Book A Demo Of",
  titleAccent: "QApilot",
  leadBefore:
    "See how agentic and AI-assisted testing streamlines your mobile QA lifecycle. Ship faster, cut maintenance, and move toward ",
  leadHighlight: "3× coverage",
  leadAfter: " with the QE team you already have.",
  formTitle: "Test Your Mobile App on QApilot",
  formIntro: "Share a few details and we'll reach out to schedule a session.",
} as const;

export function bookDemoHeroLead(): string {
  return `${BOOK_DEMO_HERO.leadBefore}${BOOK_DEMO_HERO.leadHighlight}${BOOK_DEMO_HERO.leadAfter}`;
}

export const BOOK_DEMO_EXPECT_TITLE = "What Sets QApilot Apart";

export const BOOK_DEMO_EXPECT_DESCRIPTION =
  "A platform purpose-built for mobile apps — autonomous by design, AI-native at the core.";

export const BOOK_DEMO_DIFFERENTIATORS = [
  {
    title: "Purpose-Built for Mobile",
    body: "Real devices, real sensors, real mobile complexity. Not a web tool retrofitted for apps.",
  },
  {
    title: "Autonomous",
    body: "spAIder explores the app like a real user and maps every journey.",
  },
  {
    title: "AI-Native",
    body: "Agents generate, maintain, and heal tests as the UI changes.",
  },
  {
    title: "Flutter, Where Selectors Go Blind",
    body: "OCR and vision for canvas-rendered apps, without Appium trade-offs.",
  },
  {
    title: "Author on Android. Run on iOS.",
    body: "One test intent across both platforms.",
  },
  {
    title: "Dual Device Testing",
    body: "Synchronized handoffs across users, roles, and devices — one continuous transaction.",
  },
] as const;

export const BOOK_DEMO_DIFFERENTIATOR_LINE =
  "Web QA is reversible. Mobile releases are not. QApilot is built for where a bad ship stays in the user’s pocket.";

export const BOOK_DEMO_FAQS: readonly FaqItem[] = [
  {
    question: "Can QApilot test a Flutter app?",
    answer:
      "Yes. Flutter draws to a canvas, so tools that need a native element tree lose the UI as soon as it shifts. QApilot records against the rendered widgets and uses OCR and vision where selectors go blind. On the demo we run that on your Flutter build.",
  },
  {
    question: "What does autonomous testing cover?",
    answer:
      "Autonomous testing is the sanity layer. spAIder explores the app like a real user and maps the journeys it finds, before anyone writes a script. Flows you need pinned exactly still come from CoWork or record and playback. The demo shows which layer fits which part of your suite.",
  },
  {
    question: "Do Android and iOS need separate test suites?",
    answer:
      "No. You author the test on Android and execute that same intent on iOS. One case, both platforms, on real devices rather than a desktop browser resized to look like a phone.",
  },
  {
    question: "What happens when a mobile UI change breaks a test?",
    answer:
      "When a control moves or a label changes, agents re-resolve the element and heal the test. A mobile regression run keeps going instead of stopping on the first shifted selector.",
  },
  {
    question: "Does this work for React Native as well as native apps?",
    answer:
      "Yes. Native Android, iOS, React Native, Flutter, and in-app WebViews share one locator layer. Bring the app you ship, and the demo runs on that stack.",
  },
  {
    question: "Is QApilot an Appium alternative?",
    answer:
      "Appium is a script-first framework. QApilot is the mobile test automation platform around the run: exploration, authoring, healing, and a release signal. Many teams keep a few custom scripts and move the regression suite onto QApilot. We can map that split on your app during the demo.",
  },
];

export function bookDemoFaqAnchor(question: string): string {
  const slug = question
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `book-demo-faq-${slug}`;
}
