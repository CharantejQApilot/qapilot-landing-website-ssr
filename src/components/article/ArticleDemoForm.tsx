"use client";

import { MarketingLeadForm } from "@/components/MarketingLeadForm";
import { ARTICLE_DEMO_FORM_ID } from "@/components/article/article-demo-form-id";
import { GOOGLE_ADS_BOOK_DEMO_SEND_TO } from "@/lib/constants";
import {
  marketingFormIntroClass,
  marketingFormTitleClass,
  marketingHeroFormCardClass,
  marketingHeroFormInnerClass,
} from "@/lib/forms/marketing-form-classes";
import { cn } from "@/lib/utils";

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

type ArticleDemoFormProps = {
  /** HubSpot `context.pageName`, including the article title. */
  pageName: string;
  fieldIdPrefix: string;
};

/** Same HubSpot lead form as /book-demo, sized for the article rail. */
export function ArticleDemoForm({ pageName, fieldIdPrefix }: ArticleDemoFormProps) {
  return (
    <div
      id={ARTICLE_DEMO_FORM_ID}
      data-nosnippet=""
      className={cn(marketingHeroFormCardClass, "scroll-mt-28 p-4 sm:p-5 md:p-5")}
    >
      <div className="relative z-[1] space-y-1.5 pb-4">
        <h2 className={marketingFormTitleClass}>Book a demo</h2>
        <p className={marketingFormIntroClass}>
          Share a few details and we&apos;ll reach out to schedule a session.
        </p>
      </div>
      <div className={cn(marketingHeroFormInnerClass, "p-3 sm:p-3 md:p-4")}>
        <MarketingLeadForm
          apiPath="/api/hubspot/get-access"
          pageName={pageName}
          submitButtonLabel="Book my demo"
          fieldIdPrefix={fieldIdPrefix}
          onSuccess={reportBookDemoConversion}
        />
      </div>
    </div>
  );
}
