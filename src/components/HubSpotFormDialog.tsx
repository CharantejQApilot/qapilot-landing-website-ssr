"use client";

import React, { useEffect, useRef, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Extend the Window interface to include hbspt and dataLayer
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

// Load HubSpot script once globally
let hubspotScriptLoaded = false;
let hubspotScriptLoading = false;
const hubspotLoadCallbacks: (() => void)[] = [];

const loadHubSpotScript = (): Promise<void> => {
  return new Promise((resolve) => {
    // Already loaded
    if (window.hbspt?.forms) {
      resolve();
      return;
    }

    // Already loading, queue callback
    if (hubspotScriptLoading) {
      hubspotLoadCallbacks.push(resolve);
      return;
    }

    // Check for existing script
    const existingScript = document.querySelector('script[src*="js.hsforms.net/forms/v2.js"]');
    if (existingScript) {
      // Poll for hbspt to be ready
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

    // Load new script
    hubspotScriptLoading = true;
    const script = document.createElement('script');
    script.src = 'https://js.hsforms.net/forms/v2.js';
    script.async = true;
    
    script.onload = () => {
      // Poll until hbspt is available (script loads async)
      const poll = setInterval(() => {
        if (window.hbspt?.forms) {
          clearInterval(poll);
          hubspotScriptLoaded = true;
          hubspotScriptLoading = false;
          resolve();
          // Resolve all queued callbacks
          hubspotLoadCallbacks.forEach(cb => cb());
          hubspotLoadCallbacks.length = 0;
        }
      }, 50);
      setTimeout(() => clearInterval(poll), 10000);
    };
    
    script.onerror = () => {
      hubspotScriptLoading = false;
      console.error('Failed to load HubSpot script');
    };
    
    document.head.appendChild(script);
  });
};

const HubSpotFormDialog: React.FC<HubSpotFormDialogProps> = ({
  isOpen,
  onClose,
  title = "Get Access to QApilot",
  description = "Fill out the form below and we'll get back to you shortly.",
  formId = "9e1f8740-75cc-4924-a4bd-6b687bd6f6c6",
  formName = "Contact Us Dialog"
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const formInstanceRef = useRef<string | null>(null);
  const isCreatingFormRef = useRef(false);

  const createForm = useCallback(async () => {
    // Prevent duplicate form creation
    if (isCreatingFormRef.current) return;
    if (formInstanceRef.current === formId) return;
    if (!containerRef.current) return;

    isCreatingFormRef.current = true;

    try {
      await loadHubSpotScript();

      // Double-check container still exists and form not already created
      if (!containerRef.current || formInstanceRef.current === formId) {
        isCreatingFormRef.current = false;
        return;
      }

      // Clear container safely
      while (containerRef.current.firstChild) {
        containerRef.current.removeChild(containerRef.current.firstChild);
      }

      // Generate unique ID for this form instance
      const uniqueId = `hs-form-${formId.slice(0, 8)}-${Date.now()}`;
      containerRef.current.id = uniqueId;

      if (window.hbspt?.forms) {
        window.hbspt.forms.create({
          region: 'na1',
          portalId: '47284450',
          formId: formId,
          target: `#${uniqueId}`,
          onFormReady: () => {
            formInstanceRef.current = formId;
            isCreatingFormRef.current = false;
          },
          onFormSubmit: () => {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              event: "hubspotFormSubmit",
              formId: formId,
              formName: formName
            });
          }
        });
      }
    } catch (error) {
      console.error('Error creating HubSpot form:', error);
      isCreatingFormRef.current = false;
    }
  }, [formId, formName]);

  // Handle form creation when dialog opens
  useEffect(() => {
    if (!isOpen) {
      // Reset state when dialog closes
      formInstanceRef.current = null;
      isCreatingFormRef.current = false;
      return;
    }

    // Small delay to ensure dialog DOM is ready
    const timer = setTimeout(createForm, 100);
    return () => clearTimeout(timer);
  }, [isOpen, createForm]);

  // Handle dialog state change
  const handleOpenChange = useCallback((open: boolean) => {
    if (!open) {
      onClose();
    }
  }, [onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] max-h-[85dvh] overflow-y-auto bg-background border border-border/20 shadow-2xl">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-bold text-foreground text-center">
            {title}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-center text-base">
            {description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-2">
          <div 
            ref={containerRef}
            className="hs-form-frame"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HubSpotFormDialog;
