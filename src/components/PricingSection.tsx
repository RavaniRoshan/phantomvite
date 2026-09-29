import React from 'react';
import { CTAButton } from './CTAButton';

interface PricingSectionProps {
  onOpenQuickstart: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenQuickstart }) => {
  return (
    <section id="pricing" className="pricing" aria-label="Open Source & Licensing">
      <header className="pricing-head">
        <h2 className="pricing-title">100% Open Source. Apache 2.0.</h2>
        <p className="pricing-lead">
          Phantom is free software. Run it on your local workstation, fork the codebase, embed the
          Rust crates into your own applications, or scale across headless worker clusters.
        </p>
      </header>

      <div className="plans">
        {/* Open Source Community */}
        <article className="is-featured plan">
          <p className="plan-name">
            <span className="plan-dot" aria-hidden="true" /> Community Open Source
          </p>
          <p className="plan-price">$0</p>
          <p className="plan-unit">Forever · Apache 2.0 License</p>
          <p className="plan-line">
            Complete autonomous agent stack for individuals, researchers, and engineers.
          </p>
          <ul className="plan-list" role="list">
            <li>
              <svg className="plan-tick" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3.5 8.5 L6.5 11.5 L12.5 4.5" />
              </svg>
              Full Rust core & interactive Ratatui TUI
            </li>
            <li>
              <svg className="plan-tick" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3.5 8.5 L6.5 11.5 L12.5 4.5" />
              </svg>
              All 5 providers: Claude, OpenAI, Gemini, Ollama, NIM
            </li>
            <li>
              <svg className="plan-tick" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3.5 8.5 L6.5 11.5 L12.5 4.5" />
              </svg>
              Invisible Win32 desktop & headless Chromium CDP
            </li>
            <li>
              <svg className="plan-tick" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3.5 8.5 L6.5 11.5 L12.5 4.5" />
              </svg>
              Confidence Gate (0.70) & Approval Queue
            </li>
            <li>
              <svg className="plan-tick" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3.5 8.5 L6.5 11.5 L12.5 4.5" />
              </svg>
              Master Planner swarm & proactive daemon
            </li>
          </ul>
        </article>

        {/* Enterprise & Custom */}
        <article className="plan">
          <p className="plan-name">Enterprise & Custom Deployments</p>
          <p className="plan-price">Custom</p>
          <p className="plan-unit">Dedicated infrastructure & support</p>
          <p className="plan-line">
            For organizations scaling computer use across private VM pools and air-gapped networks.
          </p>
          <ul className="plan-list" role="list">
            <li>
              <svg className="plan-tick" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3.5 8.5 L6.5 11.5 L12.5 4.5" />
              </svg>
              On-premise self-hosted NVIDIA NIM clusters
            </li>
            <li>
              <svg className="plan-tick" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3.5 8.5 L6.5 11.5 L12.5 4.5" />
              </svg>
              Custom legacy Windows UI Automation drivers
            </li>
            <li>
              <svg className="plan-tick" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3.5 8.5 L6.5 11.5 L12.5 4.5" />
              </svg>
              Multi-node virtual desktop pool orchestration
            </li>
            <li>
              <svg className="plan-tick" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3.5 8.5 L6.5 11.5 L12.5 4.5" />
              </svg>
              Hardened audit logging & compliance policies
            </li>
          </ul>
        </article>
      </div>

      <footer className="pricing-foot">
        <div className="pricing-notes">
          <p className="pricing-note">
            No telemetry, no hidden cloud subscriptions, no lock-in.
          </p>
          <p className="pricing-note">
            Clone the repository, compile with cargo, and run completely on your terms.
          </p>
        </div>
        <div className="pricing-act">
          <CTAButton
            variant="accent"
            onClick={onOpenQuickstart}
          >
            Launch Quickstart
          </CTAButton>
          <a
            href="https://github.com/RavaniRoshan/phantom"
            target="_blank"
            rel="noopener noreferrer"
            className="pricing-proof text-[#0A0B0E] hover:underline font-semibold"
          >
            <span className="pricing-proof-pill">Apache 2.0</span> Star on GitHub
          </a>
        </div>
      </footer>
    </section>
  );
};
