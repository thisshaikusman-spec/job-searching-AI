import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: number;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ className = '', size = 36 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
      role="img"
      aria-label="Job Search AI Logo"
    >
      {/* Outer rounded moss tile */}
      <rect width="64" height="64" rx="16" fill="#335334" />
      
      {/* Letter R Path */}
      <path
        d="M21 46V19C21 19 33 19 38 19C42.5 19 45 22 45 26.5C45 31 42 34 37 34H21M34 34L44 46"
        stroke="#FFFFFF"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Sage accent dot at top shoulder of R */}
      <circle cx="43" cy="20" r="3.5" fill="#8cb284" />
    </svg>
  );
};
