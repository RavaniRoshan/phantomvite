import React, { useState } from 'react';
import { CTAButton } from './CTAButton';

interface HeroSectionProps {
  onOpenQuickstart: () => void;
  onOpenTerminal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenQuickstart,
  onOpenTerminal,
}) => {
  const [copied, setCopied] = useState(false);
  const installCmd = 'cargo run -p phantom-cli --release';

  const copyCommand = () => {
    navigator.clipboard?.writeText(installCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="hero" aria-label="Phantom - The background-mode computer-use agent">
      <div className="hero-copy">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A0B0E]/10 text-[#0A0B0E] text-xs font-mono font-medium tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0A0B0E] animate-pulse" />
          RUST CORE · PYTHON LLM SERVICE · APACHE 2.0
        </div>

        <h1 className="hero-title">
          The computer-use agent that works while you don't watch.
        </h1>

        <p className="hero-sub">
          Phantom turns natural language into completed workflows on an{' '}
          <strong className="hero-sub-strong">invisible Windows desktop and headless browser</strong>.
          No cursor hijacking, no focus theft. Powered by a provider-neutral schema that drives
          Claude, OpenAI, Gemini, Ollama, and NVIDIA NIM without vendor lock-in.
        </p>

        <div className="hero-cta flex flex-wrap items-center justify-center gap-3 mt-1">
          <CTAButton
            variant="accent"
            onClick={onOpenQuickstart}
          >
            Get Started Free
          </CTAButton>

          <button
            type="button"
            onClick={copyCommand}
            className="h-10 px-4 rounded-lg bg-[#E5E8EC] hover:bg-[#D3D7DE] text-[#101216] font-mono text-xs flex items-center gap-2 border border-[#A2A3A5]/40 transition-colors cursor-pointer group"
            title="Copy launch command"
          >
            <span className="text-[#676D78]">$</span>
            <span>{installCmd}</span>
            <span className="text-[#0A0B0E] ml-1 font-sans text-[11px] font-medium">
              {copied ? '✓ Copied' : 'Copy'}
            </span>
          </button>
        </div>

        <p className="hero-note">
          Open source & private. Runs completely locally on your hardware.
        </p>

        <div className="hero-proof flex flex-wrap items-center justify-center gap-4 text-xs text-[#3F434B] pt-1">
          <span className="inline-flex items-center gap-1.5 font-medium">
            <span className="w-2 h-2 rounded-full bg-[#15803D]" />
            Zero Focus Theft
          </span>
          <span className="text-[#A2A3A5]">·</span>
          <span className="inline-flex items-center gap-1.5 font-medium">
            <span className="w-2 h-2 rounded-full bg-[#0A0B0E]" />
            Win32 CreateDesktopW
          </span>
          <span className="text-[#A2A3A5]">·</span>
          <span className="inline-flex items-center gap-1.5 font-medium">
            <span className="w-2 h-2 rounded-full bg-[#101216]" />
            5 LLM Providers
          </span>
          <span className="text-[#A2A3A5]">·</span>
          <a
            href="https://github.com/RavaniRoshan/phantom"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0A0B0E] hover:underline font-medium"
          >
            GitHub ★ Open Source
          </a>
        </div>
      </div>
    </section>
  );
};
