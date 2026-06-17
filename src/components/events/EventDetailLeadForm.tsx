"use client";

import { MarketingLeadForm } from "@/components/MarketingLeadForm";

export function EventDetailLeadForm({
  eventTitle,
  slug,
}: {
  eventTitle: string;
  slug: string;
}) {
  return (
    <MarketingLeadForm
      apiPath="/api/hubspot/get-access"
      pageName={`QApilot Event - ${eventTitle}`}
      submitButtonLabel="Book my demo"
      fieldIdPrefix={`event-${slug}`}
    />
  );
}
