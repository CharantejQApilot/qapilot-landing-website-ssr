"use client";

import React, { useEffect, useRef, useCallback, useState } from "react";
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
  HUBSPOT_NA1_PORTAL_ID,
  HUBSPOT_NA1_REGION,
} from "@/lib/constants";

/** Careers “general application” dialog — still uses HubSpot v2 embed (different fields). */
const HUBSPOT_EMBED_ONLY_CAREERS_FORM_ID = "702b653d-94c3-4949-b431-45f7a6d035c4";

declare global {
  interface Window {
    hbspt?: {
      forms: {
        create: (options: {
          region: string;
          portalId: string;
          formId: string;
          target: string;
          onFormReady?: (form: HTMLFormElement) => void;
          onFormSubmit?: (form: HTMLFormElement) => void;
        }) => void;
      };
    };
    dataLayer?: any[];
  }
}

interface HubSpotFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  formId?: string;
  formName?: string;
}

let hubspotScriptLoaded = false;
let hubspotScriptLoading = false;
const hubspotLoadCallbacks: (() => void)[] = [];

const loadHubSpotScript = (): Promise<void> => {
  return new Promise((resolve) => {
    if (window.hbspt?.forms) {
      resolve();
      return;
    }

    if (hubspotScriptLoading) {
      hubspotLoadCallbacks.push(resolve);
      return;
    }

    const existingScript = document.querySelector('script[src*="js.hsforms.net/forms/v2.js"]');
    if (existingScript) {
      const poll = setInterval(() => {
        if (window.hbspt?.forms) {
          clearInterval(poll);
          hubspotScriptLoaded = true;
          resolve();
        }
      }, 50);
      setTimeout(() => clearInterval(poll), 10000);
      return;
    }

    hubspotScriptLoading = true;
    const script = document.createElement("script");
    script.src = "https://js.hsforms.net/forms/v2.js";
    script.async = true;

    script.onload = () => {
      const poll = setInterval(() => {
        if (window.hbspt?.forms) {
          clearInterval(poll);
          hubspotScriptLoaded = true;
          hubspotScriptLoading = false;
          resolve();
          hubspotLoadCallbacks.forEach((cb) => cb());
          hubspotLoadCallbacks.length = 0;
        }
      }, 50);
      setTimeout(() => clearInterval(poll), 10000);
    };

    script.onerror = () => {
      hubspotScriptLoading = false;
      console.error("Failed to load HubSpot script");
    };

    document.head.appendChild(script);
  });
};

const HubSpotFormDialog: React.FC<HubSpotFormDialogProps> = ({
  isOpen,
  onClose,
  title = "Get Access to QApilot",
  description = "Fill out the form below and we'll get back to you shortly.",
  formId = HUBSPOT_MAIN_GET_ACCESS_FORM_ID,
  formName = HUBSPOT_MAIN_GET_ACCESS_FORM_NAME,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const formInstanceRef = useRef<string | null>(null);
  const isCreatingFormRef = useRef(false);
  const [dialogSession, setDialogSession] = useState(0);

  const useEmbed = formId === HUBSPOT_EMBED_ONLY_CAREERS_FORM_ID;

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

  const createForm = useCallback(async () => {
    if (isCreatingFormRef.current) return;
    if (formInstanceRef.current === formId) return;
    if (!containerRef.current) return;

    isCreatingFormRef.current = true;

    try {
      await loadHubSpotScript();

      if (!containerRef.current || formInstanceRef.current === formId) {
        isCreatingFormRef.current = false;
        return;
      }

      while (containerRef.current.firstChild) {
        containerRef.current.removeChild(containerRef.current.firstChild);
      }

      const uniqueId = `hs-form-${formId.slice(0, 8)}-${Date.now()}`;
      containerRef.current.id = uniqueId;

      if (window.hbspt?.forms) {
        window.hbspt.forms.create({
          region: HUBSPOT_NA1_REGION,
          portalId: HUBSPOT_NA1_PORTAL_ID,
          formId: formId,
          target: `#${uniqueId}`,
          onFormReady: () => {
            formInstanceRef.current = formId;
            isCreatingFormRef.current = false;
          },
          onFormSubmit: () => {
            pushFormSubmitAnalytics();
          },
        });
      }
    } catch (error) {
      console.error("Error creating HubSpot form:", error);
      isCreatingFormRef.current = false;
    }
  }, [formId, pushFormSubmitAnalytics]);

  useEffect(() => {
    if (!useEmbed || !isOpen) {
      formInstanceRef.current = null;
      isCreatingFormRef.current = false;
      return;
    }

    const timer = setTimeout(createForm, 100);
    return () => clearTimeout(timer);
  }, [isOpen, createForm, useEmbed]);

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
      <DialogContent className="max-w-2xl max-h-[85vh] max-h-[85dvh] overflow-y-auto bg-background border border-border/20 shadow-2xl">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-bold text-foreground text-center">{title}</DialogTitle>
          <DialogDescription className="text-muted-foreground text-center text-base">
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2">
          {useEmbed ? (
            <div ref={containerRef} className="hubspot-form-container hs-form-frame" />
          ) : (
            <MarketingLeadForm
              key={dialogSession}
              apiPath="/api/hubspot/get-access"
              pageName={pageTitle}
              submitButtonLabel="Submit"
              fieldIdPrefix="hs-dialog-lead"
              onSuccess={pushFormSubmitAnalytics}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HubSpotFormDialog;
