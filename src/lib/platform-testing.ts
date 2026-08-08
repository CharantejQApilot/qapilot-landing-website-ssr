import type { LucideIcon } from "lucide-react";
import { Brain, Compass, Crosshair, Gauge, Layers, Map, Radar, Sparkles, Unlink, Upload, Wand2, Wrench } from "lucide-react";
import { PATHS } from "@/lib/routes";

export type PlatformTestingSlug = "ios" | "android" | "react-native";

export type PlatformTestingContent = {
  slug: PlatformTestingSlug;
  path: string;
  navLabel: string;
  breadcrumbName: string;
  metaTitle: string;
  metaDescription: string;
  ogDescription: string;
  twitterDescription: string;
  eyebrow: string;
  h1Before: string;
  h1Accent: string;
  heroLead: string;
  heroSupport: string;
  formTitle: string;
  formPageName: string;
  formFieldPrefix: string;
  demoAnchorId: string;
  problemHeadingBefore: string;
  problemHeadingAccent: string;
  problemTiles: readonly { title: string; line: string; icon: LucideIcon }[];
  solutionHeadingBefore: string;
  solutionHeadingAccent: string;
  solutionCards: readonly { title: string; line: string; icon: LucideIcon }[];
  flowTestStepLine: string;
  videoHeadingPlatform: string;
  videoDescription: string;
  videoAriaLabel: string;
};

const SHARED_SOLUTION_CARDS = [
  {
    title: "Cross-Context Execution",
    line: "Native + hybrid + webview in one flow",
    icon: Layers,
  },
  {
    title: "AI Element Discovery",
    line: "Works even when selectors fail",
    icon: Brain,
  },
  {
    title: "Low-Maintenance Tests",
    line: "Adapts as UI changes",
    icon: Wrench,
  },
  {
    title: "Autonomous Risk Detection",
    line: "Finds latency and accessibility issues",
    icon: Radar,
  },
] as const;

export const PLATFORM_TESTING: Record<PlatformTestingSlug, PlatformTestingContent> = {
  ios: {
    slug: "ios",
    path: PATHS.FOR_IOS,
    navLabel: "iOS Testing",
    breadcrumbName: "iOS Testing",
    metaTitle: "iOS Testing That Actually Works",
    metaDescription:
      "QApilot runs iOS apps on simulators and real devices—AI element discovery, low-maintenance tests, and release-ready coverage without brittle scripts.",
    ogDescription:
      "Built for real iOS apps, devices, and complexity. AI discovery, autonomous risk detection, and release-ready coverage.",
    twitterDescription:
      "iOS testing with AI discovery on simulators and real devices—lower maintenance, release-ready coverage.",
    eyebrow: "Platform · iOS",
    h1Before: "iOS Testing That",
    h1Accent: "Actually Works",
    heroLead:
      "iOS apps break traditional automation with dynamic views, system dialogs, and device fragmentation. QApilot brings reliable iOS test automation with AI-assisted element discovery, real-device execution, and lower-maintenance runs built for modern mobile teams.",
    heroSupport:
      "Built for teams shipping complex iOS apps across simulators, physical devices, real user journeys, and real release cycles.",
    formTitle: "Test Your iOS App on QApilot",
    formPageName: "QAPilot iOS Testing Platform",
    formFieldPrefix: "ios-hero",
    demoAnchorId: "ios-demo",
    problemHeadingBefore: "Why",
    problemHeadingAccent: "iOS Testing",
    problemTiles: [
      { title: "Fragile Locators", line: "Views and hierarchy shift every release", icon: Crosshair },
      { title: "Flaky Execution", line: "Passes locally, fails in CI", icon: Gauge },
      { title: "System Interruptions", line: "Permissions, alerts, and OS dialogs break flows", icon: Unlink },
    ],
    solutionHeadingBefore: "Built for",
    solutionHeadingAccent: "iOS",
    solutionCards: SHARED_SOLUTION_CARDS,
    flowTestStepLine: "Simulator and real devices.",
    videoHeadingPlatform: "iOS Testing",
    videoDescription:
      "Watch how QApilot explores, maps, and stress-tests real mobile flows on iOS—including native screens, system dialogs, and hybrid content in one continuous run.",
    videoAriaLabel: "Walkthrough: iOS testing on QApilot",
  },
  android: {
    slug: "android",
    path: PATHS.FOR_ANDROID,
    navLabel: "Android Testing",
    breadcrumbName: "Android Testing",
    metaTitle: "Android Testing That Actually Works",
    metaDescription:
      "QApilot runs Android APK and AAB builds—AI element discovery, low-maintenance tests, and release-ready coverage on real devices and emulators.",
    ogDescription:
      "Built for real Android apps, devices, and complexity. AI discovery, autonomous risk detection, and release-ready coverage.",
    twitterDescription:
      "Android testing with AI discovery on real devices and emulators—lower maintenance, release-ready coverage.",
    eyebrow: "Platform · Android",
    h1Before: "Android Testing That",
    h1Accent: "Actually Works",
    heroLead:
      "Android apps break traditional automation across OEMs, OS versions, and hybrid surfaces. QApilot brings reliable Android test automation with AI-assisted element discovery, real-device execution, and lower-maintenance runs built for modern mobile teams.",
    heroSupport:
      "Built for teams shipping complex Android apps across APK/AAB builds, real devices, real user journeys, and real release cycles.",
    formTitle: "Test Your Android App on QApilot",
    formPageName: "QAPilot Android Testing Platform",
    formFieldPrefix: "android-hero",
    demoAnchorId: "android-demo",
    problemHeadingBefore: "Why",
    problemHeadingAccent: "Android Testing",
    problemTiles: [
      { title: "Device Fragmentation", line: "OEMs and OS versions behave differently", icon: Crosshair },
      { title: "Flaky Execution", line: "Passes locally, fails in CI", icon: Gauge },
      { title: "Broken Transitions", line: "Native, hybrid, and webviews don’t sync", icon: Unlink },
    ],
    solutionHeadingBefore: "Built for",
    solutionHeadingAccent: "Android",
    solutionCards: SHARED_SOLUTION_CARDS,
    flowTestStepLine: "APK, AAB, real devices.",
    videoHeadingPlatform: "Android Testing",
    videoDescription:
      "Watch how QApilot explores, maps, and stress-tests real mobile flows on Android—including native screens, hybrid content, and webviews in one continuous run.",
    videoAriaLabel: "Walkthrough: Android testing on QApilot",
  },
  "react-native": {
    slug: "react-native",
    path: PATHS.FOR_REACT_NATIVE,
    navLabel: "React Native Testing",
    breadcrumbName: "React Native Testing",
    metaTitle: "React Native Testing That Actually Works",
    metaDescription:
      "QApilot runs React Native apps across iOS and Android—AI element discovery, low-maintenance tests, and release-ready coverage without brittle scripts.",
    ogDescription:
      "Built for real React Native apps, devices, and complexity. AI discovery, autonomous risk detection, and release-ready coverage.",
    twitterDescription:
      "React Native testing with AI discovery on real devices—lower maintenance, release-ready coverage.",
    eyebrow: "Platform · React Native",
    h1Before: "React Native Testing That",
    h1Accent: "Actually Works",
    heroLead:
      "React Native apps break traditional automation across JS bridges, native modules, and platform-specific UI. QApilot brings reliable React Native test automation with AI-assisted element discovery, cross-platform execution, and lower-maintenance runs built for modern mobile teams.",
    heroSupport:
      "Built for teams shipping complex React Native apps across iOS and Android, real user journeys, and real release cycles.",
    formTitle: "Test Your React Native App on QApilot",
    formPageName: "QAPilot React Native Testing Platform",
    formFieldPrefix: "react-native-hero",
    demoAnchorId: "react-native-demo",
    problemHeadingBefore: "Why",
    problemHeadingAccent: "React Native Testing",
    problemTiles: [
      { title: "Bridge Complexity", line: "JS and native layers don’t share locators", icon: Crosshair },
      { title: "Flaky Execution", line: "Passes locally, fails in CI", icon: Gauge },
      { title: "Broken Transitions", line: "Native modules and webviews don’t sync", icon: Unlink },
    ],
    solutionHeadingBefore: "Built for",
    solutionHeadingAccent: "React Native",
    solutionCards: [
      {
        title: "Cross-Platform Execution",
        line: "iOS + Android React Native in one flow",
        icon: Layers,
      },
      SHARED_SOLUTION_CARDS[1],
      SHARED_SOLUTION_CARDS[2],
      SHARED_SOLUTION_CARDS[3],
    ],
    flowTestStepLine: "iOS, Android, native modules.",
    videoHeadingPlatform: "React Native Testing",
    videoDescription:
      "Watch how QApilot explores, maps, and stress-tests real mobile flows in React Native—including JS-driven screens, native modules, and webviews in one continuous run.",
    videoAriaLabel: "Walkthrough: React Native testing on QApilot",
  },
};

export const PLATFORM_FLOW_BASE_STEPS = [
  { label: "Upload", icon: Upload, line: "Drop in your build." },
  { label: "Explore", icon: Compass, line: "Agents learn real paths." },
  { label: "Map", icon: Map, line: "Coverage from journeys." },
  { label: "Test", icon: Sparkles, line: "" },
  { label: "Adapt", icon: Wand2, line: "UI moves; tests stay green." },
] as const;
