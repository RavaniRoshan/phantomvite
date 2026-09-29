/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ShowcaseSection } from './components/ShowcaseSection';
import { StakesSection } from './components/StakesSection';
import { MakeSection } from './components/MakeSection';
import { BentoSection } from './components/BentoSection';
import { WalkthroughSection } from './components/WalkthroughSection';
import { BrandsSection } from './components/BrandsSection';
import { BeyondSection } from './components/BeyondSection';
import { PricingSection } from './components/PricingSection';
import { UpdatesSection } from './components/UpdatesSection';
import { FAQSection } from './components/FAQSection';
import { CloseSection } from './components/CloseSection';
import { Footer } from './components/Footer';
import { DitherTrail } from './components/DitherTrail';
import { DitherField } from './components/DitherField';
import { BrandModal } from './components/BrandModal';
import { SignupModal } from './components/SignupModal';

export default function App() {
  const [isQuickstartOpen, setIsQuickstartOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  return (
    <div className="landing">
      {/* Ambient Top Glow with authentic obsidian-black dither field */}
      <div className="top-glow" aria-hidden="true">
        <DitherField
          className="top-glow-field"
          fill
          bare
          cell={2.5}
          bias={0.45}
          interactive="window"
        />
      </div>

      {/* Vertical Guide Rails */}
      <div className="guides" aria-hidden="true">
        <span className="rail rail--l" />
        <span className="rail rail--r" />
      </div>

      {/* Subtle Mouse Dither Trail */}
      <DitherTrail />

      {/* Fixed Sticky Header */}
      <Header
        onOpenQuickstart={() => setIsQuickstartOpen(true)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
      />

      {/* Main Landing Page Sections */}
      <main className="landing-main">
        <HeroSection
          onOpenQuickstart={() => setIsQuickstartOpen(true)}
          onOpenTerminal={() => setIsTerminalOpen(true)}
        />
        <ShowcaseSection />
        <StakesSection />
        <MakeSection />
        <BentoSection />
        <WalkthroughSection />
        <BrandsSection onOpenQuickstart={() => setIsQuickstartOpen(true)} />
        <BeyondSection />
        <PricingSection onOpenQuickstart={() => setIsQuickstartOpen(true)} />
        <UpdatesSection />
        <FAQSection />
        <CloseSection onOpenQuickstart={() => setIsQuickstartOpen(true)} />
      </main>

      {/* Footer */}
      <Footer
        onOpenQuickstart={() => setIsQuickstartOpen(true)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
      />

      {/* Floating GitHub Star Badge at bottom-right */}
      <a
        className="v-ph is-floating bg-[#101216] text-[#EEF0F3] border border-[#3F434B] hover:border-[#0A0B0E] px-3.5 py-2 rounded-lg flex items-center gap-2.5 transition-colors shadow-2xl no-underline"
        href="https://github.com/RavaniRoshan/phantom"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Star Phantom on GitHub"
      >
        <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
        <span className="font-mono text-xs text-white/90">Star on GitHub</span>
        <span className="text-[10px] font-mono text-[#A2A3A5] bg-[#252a35] px-1.5 py-0.5 rounded">
          Apache 2.0
        </span>
      </a>

      {/* Interactive Terminal Simulator Modal */}
      <BrandModal
        brandId={isTerminalOpen ? 'phantom-tui' : null}
        onClose={() => setIsTerminalOpen(false)}
      />

      {/* Quickstart / Installation Guide Modal */}
      <SignupModal
        isOpen={isQuickstartOpen}
        onClose={() => setIsQuickstartOpen(false)}
        onOpenTerminal={() => {
          setIsQuickstartOpen(false);
          setIsTerminalOpen(true);
        }}
      />
    </div>
  );
}
