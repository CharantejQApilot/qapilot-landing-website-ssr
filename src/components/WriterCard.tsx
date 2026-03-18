"use client";

import { Linkedin } from "lucide-react";

interface WriterCardProps {
  name: string;
  designation?: string | null;
  description?: string | null;
  linkedinUrl?: string | null;
  profileImage?: string | null;
}

const WriterCard = ({ name, designation, description, linkedinUrl, profileImage }: WriterCardProps) => {
  return (
    <div className="mt-16 pt-8 border-t border-border">
      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6 font-medium">
        Written by
      </p>

      <div className="rounded-2xl bg-secondary/30 border border-border/50 p-6 sm:p-8">
        <div className="flex flex-col items-center sm:flex-row sm:items-center gap-6">
          {/* Avatar */}
          {profileImage ? (
            <img
              src={profileImage}
              alt={name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover ring-2 ring-primary/20 shrink-0"
              width={112}
              height={112}
            />
          ) : (
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-primary/10 ring-2 ring-primary/20 flex items-center justify-center shrink-0">
              <span className="text-2xl sm:text-3xl font-bold text-primary">
                {name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}

          {/* Content */}
          <div className="text-center sm:text-left min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
              <h3 className="text-xl font-semibold text-foreground">{name}</h3>
              {linkedinUrl && (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center justify-center sm:justify-start gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors"
                  title={`Connect with ${name} on LinkedIn`}
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              )}
            </div>
            {designation && (
              <p className="text-sm text-muted-foreground mt-1">{designation}</p>
            )}
            {description && (
              <p className="text-sm text-muted-foreground/80 mt-4 leading-relaxed">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriterCard;
