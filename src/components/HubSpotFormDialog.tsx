"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MarketingLeadForm } from "@/components/MarketingLeadForm";
import {
  HUBSPOT_MAIN_GET_ACCESS_FORM_ID,
  HUBSPOT_MAIN_GET_ACCESS_FORM_NAME,
} from "@/lib/constants";

interface HubSpotFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  formId?: string;
  formName?: string;
  /** API route used for the in-house Forms API submission flow. */
  apiPath?: string;
}

const HubSpotFormDialog: React.FC<HubSpotFormDialogProps> = ({
  isOpen,
  onClose,
  title = "Book a Demo",
  description = "Fill out the form below and we'll get back to you shortly.",
  formId = HUBSPOT_MAIN_GET_ACCESS_FORM_ID,
  formName = HUBSPOT_MAIN_GET_ACCESS_FORM_NAME,
  apiPath = "/api/hubspot/get-access",
}) => {
  const [dialogSession, setDialogSession] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setDialogSession((n) => n + 1);
    }
  }, [isOpen]);

  const pushFormSubmitAnalytics = useCallback(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "hubspotFormSubmit",
      formId,
      formName,
    });
  }, [formId, formName]);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        onClose();
      }
    },
    [onClose],
  );

  const pageTitle =
    typeof document !== "undefined" ? document.title || "QApilot" : "QApilot";

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] max-h-[85dvh] overflow-y-auto bg-background border border-border/20 shadow-2xl font-sans antialiased">
        <DialogHeader className="space-y-3">
          <DialogTitle className="font-heading text-2xl font-bold text-foreground text-center tracking-tight">
            {title}
          </DialogTitle>
          <DialogDescription className="font-sans text-muted-foreground text-center text-base">
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2">
          <MarketingLeadForm
            key={dialogSession}
            apiPath={apiPath}
            pageName={pageTitle}
            submitButtonLabel="Submit"
            fieldIdPrefix="hs-dialog-lead"
            onSuccess={pushFormSubmitAnalytics}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HubSpotFormDialog;
