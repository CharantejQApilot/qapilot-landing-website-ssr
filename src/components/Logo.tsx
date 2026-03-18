import React from 'react';
import logoImg from '@/assets/qapilot-logo-main.png';

interface LogoProps {
  className?: string;
  alt?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  className = "h-7 sm:h-8 w-auto",
  alt = "QApilot - AI-Powered Mobile App Testing"
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
      className={`${className} max-h-9 object-contain object-left`}
      style={{ objectFit: 'contain' }}
    />
  );
};

export default Logo;
