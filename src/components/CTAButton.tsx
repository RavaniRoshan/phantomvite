import React, { useState } from 'react';

interface CTAButtonProps {
  href?: string;
  onClick?: () => void;
  children: string;
  className?: string;
  variant?: 'accent' | 'inverted';
  ariaLabel?: string;
}

export const CTAButton: React.FC<CTAButtonProps> = ({
  href,
  onClick,
  children,
  className = '',
  variant = 'accent',
  ariaLabel,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const text = children;
  const chars = text.split('');

  const content = (
    <>
      <svg
        className="cta-dither"
        viewBox="0 0 128 16"
        width="320"
        height="40"
        shapeRendering="crispEdges"
        aria-hidden="true"
        focusable="false"
      >
        <path
          className="cta-band"
          d="M0 7h1v1h-1zM8 7h1v1h-1zM36 7h1v1h-1zM40 7h1v1h-1zM64 7h1v1h-1zM68 7h1v1h-1zM72 7h1v1h-1zM96 7h1v1h-1zM104 7h1v1h-1z"
          fill="currentColor"
          fillOpacity="0.12"
          style={{ '--r': 8 } as React.CSSProperties}
        />
        <path
          className="cta-band"
          d="M2 9h1v1h-1zM38 9h1v1h-1zM40 9h1v1h-1zM42 9h1v1h-1zM66 9h1v1h-1zM70 9h1v1h-1z"
          fill="currentColor"
          fillOpacity="0.28"
          style={{ '--r': 6 } as React.CSSProperties}
        />
        <path
          className="cta-band"
          d="M6 9h1v1h-1zM10 9h1v1h-1zM78 9h1v1h-1zM94 9h1v1h-1zM102 9h1v1h-1zM106 9h1v1h-1zM110 9h1v1h-1z"
          fill="currentColor"
          fillOpacity="0.12"
          style={{ '--r': 6 } as React.CSSProperties}
        />
        <path
          className="cta-band"
          d="M1 10h1v1h-1zM37 10h1v1h-1zM39 10h1v1h-1zM41 10h1v1h-1z"
          fill="currentColor"
          fillOpacity="0.28"
          style={{ '--r': 5 } as React.CSSProperties}
        />
        <path
          className="cta-band"
          d="M0 11h1v1h-1zM2 11h1v1h-1zM4 11h1v1h-1zM38 11h1v1h-1zM40 11h1v1h-1z"
          fill="currentColor"
          fillOpacity="0.5"
          style={{ '--r': 4 } as React.CSSProperties}
        />
        <path
          className="cta-band"
          d="M6 11h1v1h-1zM8 11h1v1h-1zM10 11h1v1h-1zM12 11h1v1h-1zM14 11h1v1h-1zM16 11h1v1h-1zM24 11h1v1h-1zM26 11h1v1h-1zM28 11h1v1h-1zM30 11h1v1h-1zM32 11h1v1h-1zM34 11h1v1h-1zM36 11h1v1h-1zM42 11h1v1h-1zM44 11h1v1h-1zM46 11h1v1h-1zM50 11h1v1h-1zM52 11h1v1h-1zM54 11h1v1h-1zM56 11h1v1h-1zM62 11h1v1h-1zM64 11h1v1h-1zM66 11h1v1h-1zM68 11h1v1h-1zM70 11h1v1h-1zM72 11h1v1h-1zM74 11h1v1h-1zM76 11h1v1h-1zM78 11h1v1h-1zM80 11h1v1h-1zM82 11h1v1h-1zM84 11h1v1h-1zM92 11h1v1h-1zM94 11h1v1h-1zM96 11h1v1h-1zM98 11h1v1h-1zM100 11h1v1h-1zM102 11h1v1h-1zM104 11h1v1h-1zM106 11h1v1h-1zM108 11h1v1h-1zM110 11h1v1h-1zM112 11h1v1h-1zM120 11h1v1h-1zM122 11h1v1h-1zM124 11h1v1h-1zM126 11h1v1h-1z"
          fill="currentColor"
          fillOpacity="0.28"
          style={{ '--r': 4 } as React.CSSProperties}
        />
        <path
          className="cta-band"
          d="M1 12h1v1h-1zM3 12h1v1h-1zM39 12h1v1h-1z"
          fill="currentColor"
          fillOpacity="0.5"
          style={{ '--r': 3 } as React.CSSProperties}
        />
        <path
          className="cta-band"
          d="M0 13h1v1h-1zM2 13h3v1h-3zM6 13h1v1h-1zM8 13h1v1h-1zM10 13h3v1h-3zM14 13h1v1h-1zM36 13h1v1h-1zM38 13h1v1h-1zM40 13h1v1h-1zM42 13h3v1h-3zM46 13h1v1h-1zM50 13h1v1h-1zM52 13h1v1h-1zM54 13h1v1h-1zM64 13h1v1h-1zM66 13h1v1h-1zM76 13h1v1h-1zM78 13h1v1h-1zM80 13h1v1h-1zM82 13h1v1h-1zM86 13h1v1h-1zM88 13h1v1h-1zM90 13h1v1h-1zM92 13h1v1h-1zM94 13h1v1h-1zM98 13h1v1h-1zM100 13h1v1h-1zM102 13h1v1h-1zM122 13h1v1h-1zM124 13h1v1h-1zM126 13h1v1h-1z"
          fill="currentColor"
          fillOpacity="0.5"
          style={{ '--r': 2 } as React.CSSProperties}
        />
        <path
          className="cta-band"
          d="M0 15h7v1h-7zM8 15h11v1h-11zM20 15h1v1h-1zM22 15h1v1h-1zM24 15h1v1h-1zM26 15h1v1h-1zM28 15h1v1h-1zM30 15h1v1h-1zM32 15h1v1h-1zM38 15h1v1h-1zM40 15h7v1h-7zM48 15h11v1h-11zM60 15h1v1h-1zM62 15h1v1h-1zM64 15h3v1h-3zM68 15h1v1h-1zM74 15h1v1h-1zM76 15h3v1h-3zM80 15h3v1h-3zM84 15h11v1h-11zM96 15h3v1h-3zM100 15h3v1h-3zM104 15h3v1h-3zM108 15h1v1h-1zM112 15h1v1h-1zM114 15h1v1h-1zM116 15h3v1h-3zM120 15h3v1h-3zM124 15h4v1h-4z"
          fill="currentColor"
          fillOpacity="0.5"
          style={{ '--r': 0 } as React.CSSProperties}
        />
      </svg>
      <span className="cta-clip" aria-hidden="true">
        <span className="cta-line">
          {chars.map((c, i) => (
            <span
              key={i}
              className="cta-char"
              style={{
                '--i': i,
                '--y': isHovered ? '-100%' : '0%',
              } as React.CSSProperties}
            >
              {c === ' ' ? '\u00A0' : c}
            </span>
          ))}
        </span>
        <span className="cta-line">
          {chars.map((c, i) => (
            <span
              key={i}
              className="cta-char"
              style={{
                '--i': i,
                '--y': isHovered ? '0%' : '100%',
              } as React.CSSProperties}
            >
              {c === ' ' ? '\u00A0' : c}
            </span>
          ))}
        </span>
      </span>
    </>
  );

  const buttonClass = `cta is-${variant} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={buttonClass}
        aria-label={ariaLabel || text}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={buttonClass}
      aria-label={ariaLabel || text}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {content}
    </button>
  );
};
