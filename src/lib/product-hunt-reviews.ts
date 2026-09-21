/** Short paraphrases of Product Hunt reviews for the home hero. Source: /products/qapilot/reviews. */
export const PRODUCT_HUNT_REVIEWS_URL =
  "https://www.producthunt.com/products/qapilot/reviews";

export const PRODUCT_HUNT_REVIEW_RATING = "4.9";
export const PRODUCT_HUNT_REVIEW_COUNT = 8;

/** Dwell time per rotating hero quote (ms). */
export const HOME_HERO_QUOTE_ROTATE_MS = 5500;

export const HOME_HERO_PRODUCT_HUNT_QUOTES = [
  "Fails honestly instead of faking a pass when it cannot proceed.",
  "Handles mobile UI changes without breaking the pipeline.",
  "Give it the app and start checking real user flows.",
  "Feed in the Excel cases you already have, instead of starting from scratch.",
  "Upload existing test cases and it runs them on a real device.",
  "Upload the app and Crawler starts covering flows on its own.",
  "Converts natural-language test cases into executable mobile tests.",
  "Test two apps together in real time instead of connecting the dots later.",
] as const;
