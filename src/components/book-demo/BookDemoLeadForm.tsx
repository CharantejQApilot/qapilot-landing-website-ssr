"use client";

import { MarketingLeadForm } from "@/components/MarketingLeadForm";

export function BookDemoLeadForm() {
  return (
    <MarketingLeadForm
      apiPath="/api/hubspot/get-access"
      pageName="Book a Demo — QApilot"
      submitButtonLabel="Book my demo"
      fieldIdPrefix="book-demo"
    />
  );
}
