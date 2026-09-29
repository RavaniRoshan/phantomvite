import React from 'react';
import { VLogo } from './VLogo';

interface FooterProps {
  onOpenQuickstart?: () => void;
  onOpenTerminal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenQuickstart, onOpenTerminal }) => {
  return (
    <footer className="v-footer is-flush">
      <div className="v-footer-inner">
        <div className="v-footer-brand">
          <VLogo />
          <p className="v-footer-tag">
            The background-mode computer-use agent that works while you don't watch.
          </p>
          <a
            className="v-footer-maker"
            href="https://github.com/RavaniRoshan/phantom"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/RavaniRoshan/phantom →
          </a>
        </div>

        <nav className="v-footer-col" aria-label="Architecture">
          <p className="v-footer-heading">Architecture</p>
          <a href="#how-it-works" className="v-footer-link">
            Rust Core Engine
          </a>
          <a href="#architecture" className="v-footer-link">
            Win32 Hidden Desktop
          </a>
          <a href="#architecture" className="v-footer-link">
            gRPC Neutral Schema
          </a>
          <a href="#architecture" className="v-footer-link">
            Chromium CDP Headless
          </a>
        </nav>

        <nav className="v-footer-col" aria-label="Autonomy">
          <p className="v-footer-heading">Autonomy</p>
          <a href="#features" className="v-footer-link">
            Confidence Gate (0.70)
          </a>
          <a href="#features" className="v-footer-link">
            Approval Queue
          </a>
          <a href="#architecture" className="v-footer-link">
            Master Planner Swarm
          </a>
          <a href="#daemon" className="v-footer-link">
            Proactive Daemon
          </a>
        </nav>

        <nav className="v-footer-col" aria-label="Providers">
          <p className="v-footer-heading">Providers</p>
          <a href="#providers" className="v-footer-link">
            NVIDIA NIM (Free Vision)
          </a>
          <a href="#providers" className="v-footer-link">
            Anthropic Claude
          </a>
          <a href="#providers" className="v-footer-link">
            OpenAI GPT-4o
          </a>
          <a href="#providers" className="v-footer-link">
            Ollama / Local
          </a>
        </nav>

        <nav className="v-footer-col" aria-label="Repository">
          <p className="v-footer-heading">Repository</p>
          <a
            href="https://github.com/RavaniRoshan/phantom"
            target="_blank"
            rel="noopener noreferrer"
            className="v-footer-link"
          >
            GitHub Source
          </a>
          <a
            href="https://github.com/RavaniRoshan/phantom/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="v-footer-link"
          >
            Issues & Bugs
          </a>
          <a
            href="https://github.com/RavaniRoshan/phantom/blob/main/LICENSE"
            target="_blank"
            rel="noopener noreferrer"
            className="v-footer-link"
          >
            Apache 2.0 License
          </a>
        </nav>

        <nav className="v-footer-col" aria-label="Quick Links">
          <p className="v-footer-heading">Quick Links</p>
          <button
            type="button"
            className="v-footer-link text-left bg-transparent border-0 p-0 cursor-pointer"
            onClick={onOpenTerminal}
          >
            Live TUI Demo
          </button>
          <button
            type="button"
            className="v-footer-link text-left bg-transparent border-0 p-0 cursor-pointer"
            onClick={onOpenQuickstart}
          >
            Quickstart Guide
          </button>
        </nav>
      </div>

      <div className="v-footer-strip">
        <span>Phantom Agent</span>
        <span>Created by Roshan Ravani & Open Source Community</span>
        <span>Apache License 2.0</span>
      </div>
    </footer>
  );
};
