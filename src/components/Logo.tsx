import React from "react";
import logoImg from "@/assets/qapilot-wordmark.svg";

interface LogoProps {
  className?: string;
  alt?: string;
}

/**
 * Width/height attrs MUST match the SVG viewBox (250×35) so the browser
 * computes `aspect-ratio` correctly for `width: auto` + fixed-height callers.
 */
const Logo: React.FC<LogoProps> = ({
  className = "h-6 w-auto sm:h-7 md:h-8",
  alt = "QApilot - AI-Powered Mobile App Testing",
}) => {
  const src = typeof logoImg === "string" ? logoImg : (logoImg as { src: string }).src;
  return (
    <img
      src={src}
      alt={alt}
      width={250}
      height={35}
      loading="eager"
      decoding="async"
      fetchPriority="high"
      className={`${className} max-h-full max-w-full w-auto object-contain object-left`}
      style={{ objectFit: "contain" }}
    />
  );
};

export default Logo;
