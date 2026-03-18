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

export const HubSpotFormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("Get Access to QApilot");
  const [description, setDescription] = useState("Fill out the form below and we'll get back to you shortly.");

  const openForm = (customTitle?: string, customDescription?: string) => {
    if (customTitle) setTitle(customTitle);
    if (customDescription) setDescription(customDescription);
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
  title: "Get Access to QApilot",
  description: "Fill out the form below and we'll get back to you shortly.",
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