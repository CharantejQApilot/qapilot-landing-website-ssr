"use client";

import { MarketingLeadForm } from "@/components/MarketingLeadForm";
import { GOOGLE_ADS_BOOK_DEMO_SEND_TO } from "@/lib/constants";

function reportBookDemoConversion() {
  const gtag = (
    window as Window & { gtag?: (...args: unknown[]) => void }
  ).gtag;
  gtag?.("event", "conversion", {
    send_to: GOOGLE_ADS_BOOK_DEMO_SEND_TO,
    value: 1.0,
    currency: "INR",
  });
}

export function BookDemoLeadForm() {
  return (
    <MarketingLeadForm
      apiPath="/api/hubspot/get-access"
      pageName="Book a Demo. QApilot"
      submitButtonLabel="Book my demo"
      fieldIdPrefix="book-demo"
      onSuccess={reportBookDemoConversion}
    />
  );
}
