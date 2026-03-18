"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HubSpotFormProvider, useHubSpotForm } from "@/hooks/useHubSpotForm";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import HubSpotFormDialog from "@/components/HubSpotFormDialog";
import { useWebVitals } from "@/hooks/useWebVitals";
import { useState } from "react";

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
