import React, { useState, useEffect, useRef } from 'react';
import { DitherField } from './DitherField';

interface Step {
  key: string;
  label: string;
  title: string;
  body: string;
}

const STEPS: Step[] = [
  {
    key: 'plan',
    label: '1. Plan & Route',
    title: 'Decomposes the objective into sub-tasks.',
    body: 'Phantom calls PlanTask on the neutral LLM service. The model breaks the goal into discrete steps and routes each to the optimal backend: headless Chromium, invisible Win32 desktop, or local filesystem.',
  },
  {
    key: 'decide',
    label: '2. Observe & Decide',
    title: 'Perceives off-screen visual state.',
    body: 'Captures the hidden desktop via PrintWindow without showing a window. Packages the screenshot and history, invokes DecideAction over loopback gRPC, and streams real-time reasoning tokens to the TUI.',
  },
  {
    key: 'execute',
    label: '3. Execute & Verify',
    title: 'Injects actions without stealing your mouse.',
    body: 'Delivers clicks and keystrokes through UI Automation directly to the target off-screen HWND. Evaluates model confidence against the gate (0.70) to prevent unintended side-effects.',
  },
];

const AUTOPLAY_DURATION = 5500;
const CIRCLE_CIRCUMFERENCE = 119.38;

export const MakeSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInViewRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting;
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const loop = (now: number) => {
      const dt = now - lastTime;
      lastTime = now;

      if (!isPaused && isInViewRef.current) {
        setProgress((prev) => {
          const next = prev + dt / AUTOPLAY_DURATION;
          if (next >= 1) {
            setActiveStep((idx) => (idx + 1) % STEPS.length);
            return 0;
          }
          return next;
        });
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isPaused]);

  const handleNext = () => {
    setActiveStep((prev) => (prev + 1) % STEPS.length);
    setProgress(0);
  };

  const handleTabClick = (index: number) => {
    setActiveStep(index);
    setProgress(0);
  };

  const step = STEPS[activeStep];
  const strokeDashoffset = CIRCLE_CIRCUMFERENCE * (1 - progress);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="make"
      aria-label="How Phantom executes background tasks"
    >
      <header className="make-head">
        <h2 className="make-title">From natural language to verified execution.</h2>
        <p className="make-lead">
          Type an instruction into the TUI or post an event to the daemon webhook. Phantom's Rust core
          plans the task graph, queries the neutral LLM service over high-speed gRPC, and executes
          across background backends.
        </p>
      </header>

      <div
        className="make-cols"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="make-stage">
          <DitherField fill className="make-field" cell={2.5} bias={0.66} interactive="window" />

          <div className="make-card">
            {/* Step 0: Plan & Route */}
            <div className={`gfx ${activeStep === 0 ? 'on' : ''}`} aria-hidden="true">
              <div className="mini mini--site font-mono">
                <span className="site-chrome">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="site-url text-[10px] text-[#0A0B0E] font-semibold">task.prompt</span>
                <div className="text-[10px] text-[#101216] font-sans leading-tight mt-1">
                  "Download Q3 audit CSV from vendor portal and verify totals"
                </div>
                <div className="flex gap-1 mt-2">
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#0A0B0E]/10 text-[#0A0B0E]">browser</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#101216]/10 text-[#101216]">desktop</span>
                </div>
              </div>

              <svg className="wire" viewBox="0 0 120 60" preserveAspectRatio="none" aria-hidden="true">
                <path d="M4 12 C 70 12, 56 30, 116 30" />
                <path d="M4 30 C 70 30, 56 30, 116 30" />
                <path d="M4 48 C 70 48, 56 30, 116 30" />
                <path className="wire-pulse animate-pulse" pathLength="100" d="M4 12 C 70 12, 56 30, 116 30" />
                <path className="wire-pulse animate-pulse" pathLength="100" d="M4 30 C 70 30, 56 30, 116 30" />
                <path className="wire-pulse animate-pulse" pathLength="100" d="M4 48 C 70 48, 56 30, 116 30" />
              </svg>

              <div className="mini mini--pull font-mono text-[10px]">
                <span className="text-[#676D78] uppercase text-[9px] font-semibold">SubTasks [3]</span>
                <div className="space-y-1 mt-1">
                  <div className="text-[#101216] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#15803D]" />
                    <span>1. CDP navigate</span>
                  </div>
                  <div className="text-[#101216] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#15803D]" />
                    <span>2. Win32 export</span>
                  </div>
                  <div className="text-[#101216] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0A0B0E]" />
                    <span>3. In-memory check</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 1: Observe & Decide */}
            <div className={`gfx gfx--run ${activeStep === 1 ? 'on' : ''}`} aria-hidden="true">
              <p className="run-head font-mono text-[11px] text-[#676D78]">Perception Pipeline (gRPC 50051)</p>
              <ul className="run-list font-mono text-xs">
                <li className="run-row" data-state="done">
                  <span className="run-mark">
                    <svg viewBox="0 0 16 16">
                      <path d="M3 8.5l3.5 3.5L13 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="run-name">PrintWindow Capture</span>
                  <span className="run-state">1920x1080</span>
                </li>
                <li className="run-row" data-state="done">
                  <span className="run-mark">
                    <svg viewBox="0 0 16 16">
                      <path d="M3 8.5l3.5 3.5L13 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="run-name">Normalize Schema</span>
                  <span className="run-state">neutral.json</span>
                </li>
                <li className="run-row" data-state="writing">
                  <span className="run-mark">
                    <span className="run-pulse" />
                  </span>
                  <span className="run-name">StreamThinking</span>
                  <span className="run-state">tokens...</span>
                </li>
                <li className="run-row" data-state="queued">
                  <span className="run-mark">
                    <span className="run-wait" />
                  </span>
                  <span className="run-name">DecideAction RPC</span>
                  <span className="run-state" />
                </li>
              </ul>
            </div>

            {/* Step 2: Execute & Verify */}
            <div className={`gfx ${activeStep === 2 ? 'on' : ''}`} aria-hidden="true">
              <div className="mini mini--field font-mono text-[10px]">
                <span className="field-label text-[#676D78] uppercase text-[9px]">Decision Output</span>
                <div className="bg-[#101216] text-[#EEF0F3] p-2 rounded text-[10px] space-y-0.5">
                  <div>action: "click_ui"</div>
                  <div>target: "Export Button"</div>
                  <div className="text-[#15803D]">confidence: 0.94</div>
                </div>
              </div>

              <svg className="wire wire--single" viewBox="0 0 120 40" preserveAspectRatio="none" aria-hidden="true">
                <path d="M4 20 C 64 20, 56 20, 116 20" />
                <path className="wire-pulse animate-pulse" pathLength="100" d="M4 20 C 64 20, 56 20, 116 20" />
              </svg>

              <div className="mini mini--page font-mono text-[10px]">
                <span className="page-chip">
                  <i className="page-dot" />
                  UIAutomationCore
                </span>
                <div className="text-[#15803D] font-bold text-xs mt-1">
                  ✓ Action Executed
                </div>
                <div className="text-[10px] text-[#676D78]">
                  Zero mouse takeover
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="make-copy">
          <div className="make-timeline">
            <div className="m-tabbar" role="group" aria-label="Agent execution loop">
              <span className="m-tabbar-field" aria-hidden="true" />
              {STEPS.map((s, idx) => (
                <button
                  key={s.key}
                  type="button"
                  className="m-tabbar-btn"
                  data-active={idx === activeStep}
                  aria-pressed={idx === activeStep}
                  onClick={() => handleTabClick(idx)}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              className="make-next cursor-pointer"
              aria-label="Next step"
              onClick={handleNext}
            >
              <svg className="make-ring" viewBox="0 0 40 40" aria-hidden="true">
                <circle
                  className="make-ring-fill"
                  cx="20"
                  cy="20"
                  r="19"
                  style={{
                    strokeDasharray: CIRCLE_CIRCUMFERENCE,
                    strokeDashoffset,
                  }}
                />
              </svg>
              <svg className="make-arrow" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3 8 H12 M8.5 4.5 L12 8 L8.5 11.5" />
              </svg>
            </button>
          </div>

          <div className="make-copy-text">
            <h3 className="copy-title">{step.title}</h3>
            <p className="copy-body">{step.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
