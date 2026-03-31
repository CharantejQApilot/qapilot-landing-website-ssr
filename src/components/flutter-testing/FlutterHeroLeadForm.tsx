"use client";

import { MarketingLeadForm } from "@/components/MarketingLeadForm";

export function FlutterHeroLeadForm() {
  return (
    <MarketingLeadForm
      apiPath="/api/hubspot/flutter-hero"
      pageName="QAPilot Flutter Testing Platform"
      submitButtonLabel="Get started with QApilot"
      fieldIdPrefix="flutter-hero"
    />
  );
}
