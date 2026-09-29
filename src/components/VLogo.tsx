import React from 'react';

interface VLogoProps {
  className?: string;
  isAccent?: boolean;
  withText?: boolean;
}

export const VLogo: React.FC<VLogoProps> = ({
  className = '',
  isAccent = false,
  withText = true,
}) => {
  return (
    <span
      className={`v-logo flex items-center gap-2.5 font-bold tracking-tight select-none ${
        isAccent ? 'is-accent text-[#0A0B0E]' : 'text-[#101216]'
      } ${className}`}
    >
      <svg
        className="w-6 h-6 shrink-0 transition-transform duration-300 group-hover:scale-105"
        viewBox="0 0 100 100"
        fill="currentColor"
        role="img"
        aria-label="Phantom"
      >
        <path
          d="M50 8 C28 8 12 24 12 46 L12 72 L20 64 L28 72 L36 64 L44 72 L50 64 L56 72 L64 64 L72 72 L80 64 L88 72 L88 46 C88 24 72 8 50 8Z"
          fill="currentColor"
        />
        <circle cx="38" cy="42" r="5" fill="#ffffff" />
        <circle cx="62" cy="42" r="5" fill="#ffffff" />
      </svg>
      {withText && (
        <span className="font-semibold text-lg tracking-[-0.03em] uppercase">
          Phantom
        </span>
      )}
    </span>
  );
};
