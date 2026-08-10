/** Static FAQs when CMS is empty or Supabase is unavailable (SSR + JSON-LD). */
export interface FallbackFAQ {
  id: string;
  question: string;
  answer: string;
  category: string | null;
  display_order: number;
}

export const FALLBACK_FAQS: FallbackFAQ[] = [
  {
    id: "fallback-what-is-qapilot",
    question: "What is QApilot?",
    answer:
      "<p>QApilot is an AI-native autonomous testing platform built for mobile applications. It explores your app, generates and maintains tests, runs them on real devices, and surfaces release-ready quality signals for iOS and Android teams.</p>",
    category: "General",
    display_order: 1,
  },
  {
    id: "fallback-platforms",
    question: "Which platforms does QApilot support?",
    answer:
      "<p>QApilot supports native iOS and Android apps, hybrid apps, and Flutter. Tests run on real devices and emulators with coverage across screens, journeys, and app states.</p>",
    category: "General",
    display_order: 2,
  },
  {
    id: "fallback-vs-scripted",
    question: "How is QApilot different from scripted automation tools?",
    answer:
      "<p>Traditional tools rely on manually written or recorded scripts. QApilot uses autonomous exploration, a mobile app knowledge graph, and AI-native generation and self-healing so teams spend less time maintaining brittle locators and more time shipping with confidence.</p>",
    category: "Product",
    display_order: 3,
  },
  {
    id: "fallback-ci-cd",
    question: "Does QApilot integrate with CI/CD?",
    answer:
      "<p>Yes. QApilot integrates with common CI/CD pipelines so teams can run mobile tests on every build, gate releases with quality signals, and share actionable reports with engineering and product stakeholders.</p>",
    category: "Product",
    display_order: 4,
  },
  {
    id: "fallback-pricing",
    question: "How does pricing work?",
    answer:
      "<p>QApilot offers plans for teams of different sizes, including options to get started quickly. Contact us for a demo to discuss your mobile testing needs and the right plan for your organization.</p>",
    category: "Pricing",
    display_order: 5,
  },
  {
    id: "fallback-trial",
    question: "Can I try QApilot before buying?",
    answer:
      "<p>Yes. Book a demo to see QApilot on your app, explore autonomous coverage, and understand how it fits your release workflow. We will walk through setup, execution, and reporting with your team.</p>",
    category: "Pricing",
    display_order: 6,
  },
  {
    id: "fallback-support",
    question: "What support does QApilot provide?",
    answer:
      '<p>QApilot customers receive onboarding guidance, platform support, and access to documentation and best practices for mobile test automation. Reach out to <a href="mailto:support@qapilot.com">support@qapilot.com</a> for help.</p>',
    category: "Support",
    display_order: 7,
  },
  {
    id: "fallback-flutter",
    question: "Does QApilot support Flutter testing?",
    answer:
      "<p>Yes. QApilot is built for Flutter complexity. Including cross-context flows across Flutter, native, and webviews. With AI-assisted element discovery and lower-maintenance execution on real devices.</p>",
    category: "Product",
    display_order: 8,
  },
];
