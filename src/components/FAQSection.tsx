import React, { useState } from 'react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  links?: { label: string; href: string }[];
}

const FAQS: FAQItem[] = [
  {
    id: 'faq-0',
    question: 'How does the invisible desktop work without stealing my mouse or focus?',
    answer:
      'Phantom creates an isolated Windows station via the Win32 CreateDesktopW API and assigns worker threads to it with SetThreadDesktop. It captures viewport frames off-screen using PrintWindow and injects clicks and typing via UI Automation APIs targeting the hidden HWND. Because this desktop is detached from the active interactive input session, your primary mouse pointer and keyboard focus never move.',
    links: [{ label: 'View Win32 desktop source', href: 'https://github.com/RavaniRoshan/phantom' }],
  },
  {
    id: 'faq-1',
    question: 'What is the difference between Safe mode and Hero mode?',
    answer:
      'In Safe mode (default), Phantom has read-only access across the filesystem, and write operations are strictly restricted to your allowed_folders configured in ~/.phantom/config.toml. In Hero mode, full unrestricted system access is permitted with zero permission pauses. You can toggle live in the TUI using /safe or /hero.',
  },
  {
    id: 'faq-2',
    question: 'How does the Confidence Gate and Approval Queue work?',
    answer:
      'Every LLM decision returns a confidence score (0.0 to 1.0). If an action\'s confidence is below your confidence_gate setting (default 0.70), Phantom pauses execution and queues the action in the Approval Queue. If you have the TUI open, you can approve, edit, or reject the step. In headless daemon mode, uncertain steps are skipped safely to prevent unintended side effects.',
  },
  {
    id: 'faq-3',
    question: 'How do I run Phantom for free using NVIDIA NIM?',
    answer:
      'Phantom includes an adapter for NVIDIA NIM\'s free-tier vision endpoints (such as meta/llama-3.2-90b-vision-instruct). Simply set $env:PHANTOM_PROVIDER = "nvidia" and provide an NVIDIA API key. Phantom translates screenshot inputs and formats model tool calls into its canonical schema, allowing you to test full computer-use perception with $0 in API charges.',
    links: [{ label: 'NVIDIA NIM Adapter Docs', href: 'https://github.com/RavaniRoshan/phantom#nvidia-nim-free-vision' }],
  },
  {
    id: 'faq-4',
    question: 'Can I run Phantom completely offline with local models?',
    answer:
      'Yes. Phantom supports Ollama, vLLM, and any self-hosted OpenAI-compatible endpoint. You can also run the built-in mock provider ($env:PHANTOM_PROVIDER = "mock") which operates 100% offline with zero external network access, ideal for CI and air-gapped security environments.',
  },
  {
    id: 'faq-5',
    question: 'What is the Master Planner swarm?',
    answer:
      'The Master Planner decomposes complex instructions into a dependency graph of sub-tasks. It fans out execution across concurrent worker agents, each operating on its own hidden virtual desktop. Concurrency is strictly bounded by max_parallel_workers and available system RAM (~2 GiB per worker) so the system never oversubscribes memory.',
    links: [{ label: 'Swarm Task Example', href: 'https://github.com/RavaniRoshan/phantom#master-planner-swarm' }],
  },
  {
    id: 'faq-6',
    question: 'What platforms and operating systems are supported?',
    answer:
      'Phantom is Windows-first for the invisible desktop backend (which leverages Win32 CreateDesktopW). However, the core orchestration engine (phantom-core), filesystem layer (phantom-fs), protobuf definitions (phantom-proto), and the headless Chromium CDP browser backend are cross-platform and compile cleanly on Linux and macOS.',
  },
];

export const FAQSection: React.FC = () => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'faq-0': true,
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section id="faq" className="faq" aria-label="Frequently Asked Questions">
      <header className="faq-head">
        <h2 className="faq-title">Everything you'd ask before running Phantom.</h2>
      </header>

      <div className="faq-body">
        <dl className="faq-list">
          {FAQS.map((item) => {
            const isOpen = !!openItems[item.id];
            return (
              <div
                key={item.id}
                className={`faq-row ${isOpen ? 'is-open' : ''}`}
              >
                <dt className="faq-term">
                  <button
                    type="button"
                    className="faq-trigger cursor-pointer"
                    aria-expanded={isOpen}
                    aria-controls={`${item.id}-answer`}
                    onClick={() => toggleItem(item.id)}
                  >
                    <span className="faq-q">{item.question}</span>
                    <svg
                      className="faq-mark"
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                    >
                      <path d="M8 2.5 V13.5 M2.5 8 H13.5" />
                    </svg>
                  </button>
                </dt>
                <dd id={`${item.id}-answer`} className="faq-def">
                  <div className="faq-clip">
                    <div className="faq-answer">
                      <p>{item.answer}</p>
                      {item.links && item.links.length > 0 && (
                        <p className="faq-links">
                          {item.links.map((link, idx) => (
                            <a
                              key={idx}
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {link.label}
                            </a>
                          ))}
                        </p>
                      )}
                    </div>
                  </div>
                </dd>
              </div>
            );
          })}
        </dl>

        <aside className="faq-aside">
          <p className="faq-aside-line">Looking for architecture details or to contribute?</p>
          <a
            className="faq-mail"
            href="https://github.com/RavaniRoshan/phantom/issues"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open an issue on GitHub →
          </a>
        </aside>
      </div>
    </section>
  );
};
