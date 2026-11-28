"use client";

import { LeadMagnetEmailCapture } from "@/components/lead-magnet";

export function DesignTestingLeadForm() {
  return (
    <LeadMagnetEmailCapture
      layout="inline"
      className="rounded-none border-0 bg-transparent bg-none p-0 shadow-none sm:p-0"
      pageName="Design Testing. QApilot"
      fieldId="design-testing-lead-email"
      emailLabel="Work email"
      emailPlaceholder="you@company.com"
      successMessages={{
        walkthrough: "Thanks. We'll be in touch about Design Testing.",
      }}
      actions={[
        {
          id: "walkthrough",
          label: "Request a walkthrough",
          variant: "default",
          hubspotActionLabel: ". Request a walkthrough",
          onAfterCapture: () => {},
        },
      ]}
    />
  );
}
