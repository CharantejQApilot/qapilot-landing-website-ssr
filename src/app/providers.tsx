"use client";

import { Suspense, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HubSpotFormProvider, useHubSpotForm } from "@/hooks/useHubSpotForm";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import HubSpotFormDialog from "@/components/HubSpotFormDialog";
import { useWebVitals } from "@/hooks/useWebVitals";
import {
  HUBSPOT_MAIN_GET_ACCESS_FORM_ID,
  HUBSPOT_MAIN_GET_ACCESS_FORM_NAME,
} from "@/lib/constants";
import AttributionTracker from "@/components/AttributionTracker";

function AppShell({ children }: { children: React.ReactNode }) {
  const { isOpen, title, description, closeForm } = useHubSpotForm();
  useWebVitals();

  return (
    <>
      {children}
      <HubSpotFormDialog
        isOpen={isOpen}
        onClose={closeForm}
        title={title}
        description={description}
        formId={HUBSPOT_MAIN_GET_ACCESS_FORM_ID}
        formName={HUBSPOT_MAIN_GET_ACCESS_FORM_NAME}
      />
    </>
  );
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5,
            gcTime: 1000 * 60 * 10,
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={null}>
        <AttributionTracker />
      </Suspense>
      <TooltipProvider>
        <HubSpotFormProvider>
          <Toaster />
          <Sonner />
          <AppShell>{children}</AppShell>
        </HubSpotFormProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
