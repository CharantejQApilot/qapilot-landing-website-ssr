"use client";

import { X } from "lucide-react";
import { useState } from "react";

const PromoBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative text-white" style={{ background: 'linear-gradient(to right, #f97316, #fb923c, #f97316)' }}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-center text-center pr-8">
          <span className="text-xl mr-2">🚀</span>
          <span className="text-sm md:text-base font-medium">
            We just launched Heal My Prompt on Product Hunt,{" "}
            <a
              href="https://www.producthunt.com/products/healmyprompt?launch=heal-my-prompt"
              target="_blank"
              rel="noopener"
              className="underline hover:no-underline font-semibold"
            >
              check it out
            </a>
            !
          </span>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded-full transition-colors"
          aria-label="Dismiss banner"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default PromoBanner;
