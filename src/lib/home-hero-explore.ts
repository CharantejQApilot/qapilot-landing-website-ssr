import { PATHS } from "@/lib/routes";

export type HomeHeroExploreIntent = {
  intent: string;
  payoff: string;
  href: string;
};

/** Destinations for the home hero explore panel (Panel 2). */
export const HOME_HERO_EXPLORE_INTENTS: HomeHeroExploreIntent[] = [
  {
    intent: "Check your device coverage",
    payoff: "Matrix by market & platform",
    href: PATHS.DEVICE_COVERAGE_MATRIX,
  },
  {
    intent: "Run tests you already have",
    payoff: "CoWork — 3× automation, same team",
    href: PATHS.COWORK,
  },
  {
    intent: "See what AI actually saves",
    payoff: "Calculator with the verification tax",
    href: PATHS.AI_TIME_SAVINGS,
  },
];

/** Idle time before auto-advancing to the explore panel (ms). */
export const HOME_HERO_EXPLORE_IDLE_MS = 8000;
