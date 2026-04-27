import React from 'react';
import logoImg from '@/assets/qapilot-logo-main.png';

interface LogoProps {
  className?: string;
  alt?: string;
}

const Logo: React.FC<LogoProps> = ({
  className = "h-6 w-auto sm:h-7 md:h-8",
  alt = "QApilot - AI-Powered Mobile App Testing",
}) => {
  const src = typeof logoImg === "string" ? logoImg : (logoImg as { src: string }).src;
  return (
    <img
      src={src}
      alt={alt}
      width={140}
      height={36}
      loading="eager"
      decoding="sync"
      fetchPriority="high"
      className={`${className} max-h-full object-contain object-left`}
      style={{ objectFit: "contain" }}
    />
  );
};

export default Logo;
