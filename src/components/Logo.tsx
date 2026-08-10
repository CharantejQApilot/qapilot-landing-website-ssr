import React from 'react';
import logoImg from '@/assets/qapilot-logo-main.png';

interface LogoProps {
  className?: string;
  alt?: string;
}

/**
 * Width/height attrs MUST match the actual image file (250x35) so the browser
 * computes `aspect-ratio` correctly for `width: auto` + fixed-height callers.
 * Mismatched attrs cause the layout box to size at the wrong ratio, which is
 * what created the header overlap on small screens.
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
      fetchPriority="auto"
      className={`${className} max-h-full max-w-full w-auto object-contain object-left`}
      style={{ objectFit: "contain" }}
    />
  );
};

export default Logo;
