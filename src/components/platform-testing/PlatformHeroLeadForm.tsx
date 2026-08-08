"use client";

import { MarketingLeadForm } from "@/components/MarketingLeadForm";

type PlatformHeroLeadFormProps = {
  pageName: string;
  fieldIdPrefix: string;
};

export function PlatformHeroLeadForm({ pageName, fieldIdPrefix }: PlatformHeroLeadFormProps) {
  return (
    <MarketingLeadForm
      apiPath="/api/hubspot/flutter-hero"
      pageName={pageName}
      submitButtonLabel="Get started with QApilot"
      fieldIdPrefix={fieldIdPrefix}
    />
  );
}
