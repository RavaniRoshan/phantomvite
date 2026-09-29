import React, { useState, useEffect } from 'react';
import { VLogo } from './VLogo';
import { CTAButton } from './CTAButton';

interface HeaderProps {
  onOpenQuickstart: () => void;
  onOpenTerminal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenQuickstart,
  onOpenTerminal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`m-header ${isScrolled ? 'is-scrolled' : ''}`}>
        <div className="m-header-row">
          <div className="m-header-lead">
            <a href="#" className="m-header-home group" aria-label="Phantom home">
              <VLogo className="m-header-logo" />
            </a>
          </div>

          <nav className="m-header-nav" aria-label="Main">
            <a href="#features">Features</a>
            <a href="#how-it-works">How it works</a>
            <a href="#architecture">Architecture</a>
            <a href="#providers">Providers</a>
            <a href="#faq">FAQ</a>
            <a
              href="https://github.com/RavaniRoshan/phantom"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </a>
          </nav>

          <div className="m-header-actions">
            <button
              type="button"
              className="m-header-signin cursor-pointer flex items-center gap-1.5"
              onClick={onOpenTerminal}
              title="Open Interactive TUI Simulator"
            >
              <span className="w-2 h-2 rounded-full bg-[#15803d]" />
              Live TUI
            </button>
            <CTAButton
              variant="accent"
              className="m-header-cta"
              onClick={onOpenQuickstart}
            >
              Get Started
            </CTAButton>

            <button
              type="button"
              className="m-header-burger"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg viewBox="0 0 256 256" width="20" height="20" fill="currentColor">
                  <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#101216]/50 backdrop-blur-sm md:hidden flex justify-end"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="w-full max-w-xs bg-[#eef0f3] h-full shadow-2xl m-drawer-body"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#d3d7de]">
              <span className="m-drawer-title">PHANTOM</span>
              <button
                type="button"
                className="text-[#676d78] hover:text-[#101216] cursor-pointer"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            <nav className="m-drawer-nav">
              <a href="#features" onClick={() => setIsMobileMenuOpen(false)}>
                Features
              </a>
              <a href="#how-it-works" onClick={() => setIsMobileMenuOpen(false)}>
                How it works
              </a>
              <a href="#architecture" onClick={() => setIsMobileMenuOpen(false)}>
                Architecture
              </a>
              <a href="#providers" onClick={() => setIsMobileMenuOpen(false)}>
                Providers
              </a>
              <a href="#faq" onClick={() => setIsMobileMenuOpen(false)}>
                FAQ
              </a>
              <a
                href="https://github.com/RavaniRoshan/phantom"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                GitHub Repository
              </a>
            </nav>

            <div className="m-drawer-actions">
              <button
                type="button"
                className="m-drawer-signin cursor-pointer"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenTerminal();
                }}
              >
                Try Live TUI
              </button>
              <CTAButton
                variant="accent"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenQuickstart();
                }}
              >
                Get Started
              </CTAButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
