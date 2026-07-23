/** Normalize effort to 100 test cases (1 unit = write + record one case). */
export const EFFORT_CASE_COUNT = 100;

/** Fixed AI generation / setup overhead (~5% of baseline). */
export const GEN_EFFORT = 5;

export type EffortModelInput = {
  /** AI accuracy % of generated cases that are correct (10–99). */
  accuracy: number;
  /** Verification cost as % of writing one case manually (10–80). */
  verifyRatio: number;
};

export type EffortModelResult = {
  N: number;
  manualEffort: number;
  genEffort: number;
  verifyEffort: number;
  wrongCases: number;
  rerecordEffort: number;
  aiTotal: number;
  savings: number;
  savingsPct: number;
  naiveSavings: number;
  maxBar: number;
};

export function computeEffortModel({
  accuracy,
  verifyRatio,
}: EffortModelInput): EffortModelResult {
  const N = EFFORT_CASE_COUNT;
  const manualEffort = N;
  const genEffort = GEN_EFFORT;
  const verifyEffort = (verifyRatio / 100) * N;
  const wrongCases = N * (1 - accuracy / 100);
  const rerecordEffort = wrongCases * 1;
  const aiTotal = genEffort + verifyEffort + rerecordEffort;
  const savings = manualEffort - aiTotal;
  const savingsPct = Math.round((savings / manualEffort) * 100);
  const naiveSavings = accuracy;
  const maxBar = Math.max(manualEffort, aiTotal, 10);

  return {
    N,
    manualEffort,
    genEffort,
    verifyEffort,
    wrongCases,
    rerecordEffort,
    aiTotal,
    savings,
    savingsPct,
    naiveSavings,
    maxBar,
  };
}
