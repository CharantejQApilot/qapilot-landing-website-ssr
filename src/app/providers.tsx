"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HubSpotFormProvider, useHubSpotForm } from "@/hooks/useHubSpotForm";
import { Toaster } from "@/components/ui/toaster";
import { useWebVitals } from "@/hooks/useWebVitals";
import {
  HUBSPOT_MAIN_GET_ACCESS_FORM_ID,
  HUBSPOT_MAIN_GET_ACCESS_FORM_NAME,
} from "@/lib/constants";
import AttributionTracker from "@/components/AttributionTracker";
import ClarityTracker from "@/components/ClarityTracker";

const HubSpotFormDialog = dynamic(() => import("@/components/HubSpotFormDialog"), {
  ssr: false,
});

function AppShell({
  children,
  trackAnalytics,
}: {
  children: React.ReactNode;
  trackAnalytics: boolean;
}) {
  const { isOpen, title, description, closeForm } = useHubSpotForm();
  useWebVitals(trackAnalytics);

  return (
    <>
      {children}
      {isOpen ? (
        <HubSpotFormDialog
          isOpen={isOpen}
          onClose={closeForm}
          title={title}
          description={description}
          formId={HUBSPOT_MAIN_GET_ACCESS_FORM_ID}
          formName={HUBSPOT_MAIN_GET_ACCESS_FORM_NAME}
        />
      ) : null}
    </>
  );
}

export default function Providers({
  children,
  trackAnalytics = true,
}: {
  children: React.ReactNode;
  trackAnalytics?: boolean;
}) {
  return (
    <>
      {trackAnalytics ? (
        <Suspense fallback={null}>
          <AttributionTracker />
          <ClarityTracker />
        </Suspense>
      ) : null}
      <TooltipProvider>
        <HubSpotFormProvider>
          <Toaster />
          <AppShell trackAnalytics={trackAnalytics}>{children}</AppShell>
        </HubSpotFormProvider>
      </TooltipProvider>
    </>
  );
}
