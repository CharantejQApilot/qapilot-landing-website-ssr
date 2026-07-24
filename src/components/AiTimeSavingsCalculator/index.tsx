"use client";

import { useState } from "react";
import { computeEffortModel } from "@/lib/ai-time-savings/effort-model";
import CalculatorForm from "./CalculatorForm";
import CalculatorResults from "./CalculatorResults";
import CalculatorShell from "./CalculatorShell";

export default function AiTimeSavingsCalculator() {
  const [accuracy, setAccuracy] = useState(70);
  const [verifyRatio, setVerifyRatio] = useState(30);

  const model = computeEffortModel({ accuracy, verifyRatio });

  return (
    <CalculatorShell
      controls={
        <CalculatorForm
          accuracy={accuracy}
          verifyRatio={verifyRatio}
          onAccuracyChange={setAccuracy}
          onVerifyRatioChange={setVerifyRatio}
        />
      }
      contentClassName="pb-1 sm:pb-2 md:pb-2"
    >
      <CalculatorResults accuracy={accuracy} verifyRatio={verifyRatio} model={model} />
    </CalculatorShell>
  );
}
