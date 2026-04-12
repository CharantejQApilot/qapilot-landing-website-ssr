"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface HubSpotFormContextType {
  isOpen: boolean;
  title: string;
  description: string;
  openForm: (title?: string, description?: string) => void;
  closeForm: () => void;
}

const HubSpotFormContext = createContext<HubSpotFormContextType | undefined>(undefined);

const HUBSPOT_DIALOG_DEFAULT_TITLE = "Book a Demo";
const HUBSPOT_DIALOG_DEFAULT_DESCRIPTION =
  "Fill out the form below and we'll get back to you shortly.";

export const HubSpotFormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState(HUBSPOT_DIALOG_DEFAULT_TITLE);
  const [description, setDescription] = useState(HUBSPOT_DIALOG_DEFAULT_DESCRIPTION);

  const openForm = (customTitle?: string, customDescription?: string) => {
    setTitle(customTitle ?? HUBSPOT_DIALOG_DEFAULT_TITLE);
    setDescription(customDescription ?? HUBSPOT_DIALOG_DEFAULT_DESCRIPTION);
    setIsOpen(true);
  };

  const closeForm = () => {
    setIsOpen(false);
  };

  return (
    <HubSpotFormContext.Provider value={{ isOpen, title, description, openForm, closeForm }}>
      {children}
    </HubSpotFormContext.Provider>
  );
};

const noop = () => {};

/** Default for SSR when context may not be available (e.g. Next.js prerender). */
const SSR_DEFAULT: HubSpotFormContextType = {
  isOpen: false,
  title: HUBSPOT_DIALOG_DEFAULT_TITLE,
  description: HUBSPOT_DIALOG_DEFAULT_DESCRIPTION,
  openForm: noop,
  closeForm: noop,
};

export const useHubSpotForm = () => {
  const context = useContext(HubSpotFormContext);
  // During SSR (e.g. Next.js), context can be undefined in some render paths; return no-op so prerender succeeds.
  if (context === undefined) {
    if (typeof window !== "undefined") {
      console.error("useHubSpotForm must be used within a HubSpotFormProvider");
      throw new Error("useHubSpotForm must be used within a HubSpotFormProvider");
    }
    return SSR_DEFAULT;
  }
  return context;
};