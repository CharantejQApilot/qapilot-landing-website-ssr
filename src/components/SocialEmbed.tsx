"use client";

import { useState, useEffect } from "react";
import { ExternalLink, Twitter } from "lucide-react";

interface SocialEmbedProps {
  url: string;
  image?: string;
  description?: string;
}

type EmbedType = "twitter" | "linkedin" | "unknown";

const SocialEmbed = ({ url, image, description }: SocialEmbedProps) => {
  const [embedType, setEmbedType] = useState<EmbedType>("unknown");
  const [tweetId, setTweetId] = useState<string | null>(null);

  useEffect(() => {
    // Detect platform and extract IDs
    if (url.includes("twitter.com") || url.includes("x.com")) {
      setEmbedType("twitter");
      // Extract tweet ID from URL
      const match = url.match(/status\/(\d+)/);
      if (match) {
        setTweetId(match[1]);
      }
    } else if (url.includes("linkedin.com")) {
      setEmbedType("linkedin");
    } else {
      setEmbedType("unknown");
    }
  }, [url]);

  // Load Twitter widget script
  useEffect(() => {
    if (embedType === "twitter" && tweetId) {
      // Load Twitter widget script if not already loaded
      if (!document.getElementById("twitter-widget-script")) {
        const script = document.createElement("script");
        script.id = "twitter-widget-script";
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        document.body.appendChild(script);
      } else {
        // If script already exists, re-render widgets
        (window as any).twttr?.widgets?.load();
      }
    }
  }, [embedType, tweetId]);

  if (embedType === "twitter" && tweetId) {
    return (
      <div className="mt-12 pt-8 border-t">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Twitter className="h-5 w-5" />
          Related Post
        </h3>
        <div className="flex justify-center">
          <blockquote className="twitter-tweet" data-theme="dark">
            <a href={url}>Loading tweet...</a>
          </blockquote>
        </div>
      </div>
    );
  }

  if (embedType === "linkedin") {
    return (
      <div className="mt-12 pt-8 border-t">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          Related Post
        </h3>
        
        {/* Rich embed with uploaded image */}
        <a
          href={url}
          target="_blank"
          rel="noopener"
          className="block rounded-xl border border-border/50 bg-muted/30 hover:bg-muted/50 transition-colors overflow-hidden group"
        >
          {image && (
            <div className="w-full overflow-hidden bg-muted">
              <img 
                src={image} 
                alt="LinkedIn post" 
                className="w-full h-auto max-h-[500px] object-contain group-hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
          )}
          <div className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 rounded-lg bg-[#0A66C2]/10">
                    <svg className="h-4 w-4 text-[#0A66C2]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-[#0A66C2]">
                    LinkedIn
                  </span>
                </div>
                {description && (
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-3">
                    {description}
                  </p>
                )}
                <p className="text-sm text-primary font-medium">
                  View full post on LinkedIn →
                </p>
              </div>
              <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
            </div>
          </div>
        </a>
      </div>
    );
  }

  // Unknown/unsupported platform - show as link
  return (
    <div className="mt-12 pt-8 border-t">
      <h3 className="text-lg font-semibold mb-4">Related Post</h3>
      <a
        href={url}
        target="_blank"
        rel="noopener"
        className="inline-flex items-center gap-2 text-primary hover:underline"
      >
        View original post <ExternalLink className="h-4 w-4" />
      </a>
    </div>
  );
};

export default SocialEmbed;
