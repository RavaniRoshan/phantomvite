import React, { useState, useEffect, useRef } from 'react';
import { DitherField } from './DitherField';

interface CapabilityTab {
  id: string;
  label: string;
  badge: string;
  title: string;
  description: string;
  specs: { label: string; value: string }[];
  codeSnippet?: string;
  diagramType: 'desktop' | 'loop' | 'tui' | 'swarm' | 'daemon' | 'gate' | 'neutral' | 'nvidia';
}

const TABS: CapabilityTab[] = [
  {
    id: 'desktop',
    label: 'Invisible Desktop',
    badge: 'Win32 System Architecture',
    title: 'Off-screen execution via Win32 CreateDesktopW',
    description:
      'Unlike tools that take over your visible display, Phantom launches a separate, hidden Windows desktop station. It captures frames with PrintWindow and injects input via UI-Automation-first APIs, so your cursor never jumps and windows never pop into view.',
    specs: [
      { label: 'Isolation', value: 'CreateDesktopW API' },
      { label: 'Capture', value: 'PrintWindow DC Blit' },
      { label: 'Input', value: 'UIAutomation (No Focus Theft)' },
      { label: 'Browser', value: 'Chromium CDP Headless' },
    ],
    codeSnippet: `// phantom-desktop/src/desktop.rs
let hdesk = CreateDesktopW(
    w!("PhantomHiddenDesktop"),
    null(), null(), 0,
    DESKTOP_CREATEWINDOW | DESKTOP_WRITEOBJECTS,
    null()
);
SetThreadDesktop(hdesk); // runs off-screen`,
    diagramType: 'desktop',
  },
  {
    id: 'loop',
    label: 'Observe · Decide · Execute',
    badge: 'Core Runtime Engine',
    title: 'The deterministic closed perception loop',
    description:
      'Every step takes an off-screen screenshot, packages surrounding terminal context, and asks the neutral LLM service for the next discrete action. The result is verified before the next step commences.',
    specs: [
      { label: 'Orchestrator', value: 'phantom-core (Rust)' },
      { label: 'RPC Transport', value: 'Loopback gRPC (50051)' },
      { label: 'Perception', value: 'High-res Screenshot + History' },
      { label: 'Stream', value: 'StreamThinking real-time RPC' },
    ],
    codeSnippet: `loop {
    let frame = backend.capture_screenshot().await?;
    let action = llm_client.decide_action(frame, &history).await?;
    if action.confidence < confidence_gate {
        approval_queue.enqueue(action).await?;
    } else {
        backend.execute(action).await?;
    }
}`,
    diagramType: 'loop',
  },
  {
    id: 'tui',
    label: 'Interactive TUI',
    badge: 'Ratatui Terminal Interface',
    title: 'Live task planner, streamed reasoning, and settings',
    description:
      'Type tasks directly into a rich terminal interface. Watch the LLM decompose tasks into hierarchical sub-plans, inspect streamed reasoning tokens in real time, and toggle settings live with slash commands.',
    specs: [
      { label: 'Engine', value: 'Ratatui + Crossterm' },
      { label: 'Live Commands', value: '/safe, /hero, /provider, /settings' },
      { label: 'Telemetry', value: 'Token speed, latency, steps' },
      { label: 'Form', value: 'In-terminal editable TOML form' },
    ],
    codeSnippet: `┌─ Phantom TUI ─────────────────────────────────┐
│ Task: "Summarize Q3 financial filings in PDF" │
│ [✓] 1. Open hidden chromium instance          │
│ [✓] 2. Download filing from investor portal   │
│ [▶] 3. Extract balance sheet & cash flow table│
│ [ ] 4. Write summary to ~/Phantom/Reports.md   │
└───────────────────────────────────────────────┘`,
    diagramType: 'tui',
  },
  {
    id: 'swarm',
    label: 'Master Swarm',
    badge: 'Distributed Sub-Task Graph',
    title: 'Fan out tasks across isolated virtual workers',
    description:
      'The Master Planner decomposes large instructions into a dependency graph. Each sub-task is fanned out to an independent worker on its own isolated hidden desktop, bounded by RAM and max parallel workers.',
    specs: [
      { label: 'Orchestrator', value: 'MasterPlanner::run' },
      { label: 'Concurrency', value: 'Bounded by RAM (~2GiB/worker)' },
      { label: 'Isolation', value: 'Per-worker hidden desktop' },
      { label: 'Synthesis', value: 'Automated graph reduction' },
    ],
    codeSnippet: `let planner = MasterPlanner::new(config);
let graph = planner.decompose("Audit 4 vendor portals").await?;
let results = swarm.execute_graph(graph, max_workers: 4).await?;
let final_report = planner.synthesize(results).await?;`,
    diagramType: 'swarm',
  },
  {
    id: 'daemon',
    label: 'Proactive Daemon',
    badge: 'Autonomous Background Daemon',
    title: 'Trigger workflows via webhooks and dropped files',
    description:
      'phantom-daemon runs continuously in the background without needing a terminal open. It listens for HTTP webhooks (POST /event) from email or calendar integrations and watches an Inbox folder for dropped documents.',
    specs: [
      { label: 'Webhook', value: 'POST 127.0.0.1:4545/event' },
      { label: 'Inbox', value: '~/Phantom/Inbox Watcher' },
      { label: 'Health Probe', value: 'GET /health (Liveness)' },
      { label: 'Headless Mode', value: 'Zero user interaction' },
    ],
    codeSnippet: `// Webhook payload example:
curl -X POST http://127.0.0.1:4545/event \\
  -H "Content-Type: application/json" \\
  -d '{
    "event_type": "email_received",
    "source": "gmail",
    "context": "Prepare competitor pricing brief"
  }'`,
    diagramType: 'daemon',
  },
  {
    id: 'gate',
    label: 'Confidence Gate',
    badge: 'Autonomy & Human-in-the-Loop',
    title: 'Confidence-gated autonomy with Approval Queue',
    description:
      'Every LLM decision carries a confidence score. In Safe mode, actions below your confidence_gate threshold (default 0.70) are paused in an Approval Queue for operator review instead of running blindly.',
    specs: [
      { label: 'Default Gate', value: '0.70 (Tunable 0.0 - 1.0)' },
      { label: 'Operator UI', value: 'Interactive Approval Queue' },
      { label: 'Safe Mode', value: 'Restricted write directories' },
      { label: 'Hero Mode', value: 'Unrestricted automated access' },
    ],
    codeSnippet: `if action.confidence < config.confidence_gate {
    // Pauses execution and asks operator in TUI:
    // [A]pprove / [R]eject / [E]dit / [V]iew Screenshot
    return approval_queue.await_operator(action).await;
}`,
    diagramType: 'gate',
  },
  {
    id: 'neutral',
    label: 'Provider Neutrality',
    badge: 'Unified Action Contract',
    title: 'One schema to rule all frontier vision models',
    description:
      'Claude, OpenAI, Gemini, Ollama, and NVIDIA NIM all map their native tool calling mechanisms onto a single canonical schema in python/phantom_llm/schema.py. Swap models instantly without touching Rust code.',
    specs: [
      { label: 'Schema File', value: 'phantom_llm/schema.py' },
      { label: 'Supported', value: 'Claude, OpenAI, Gemini, Ollama, NIM' },
      { label: 'Normalization', value: 'normalize_action_dict()' },
      { label: 'Lock-in', value: 'Zero vendor lock-in' },
    ],
    codeSnippet: `// Canonical schema emitted by all providers:
{
  "action_type": "click_element" | "type_text" | "scroll" | "key_press",
  "coordinates": [x, y],
  "reasoning": "Clicking login button on off-screen viewport",
  "confidence": 0.94
}`,
    diagramType: 'neutral',
  },
  {
    id: 'nvidia',
    label: 'NVIDIA NIM (Free Vision)',
    badge: 'Zero-Cost Computer Use',
    title: 'Test full desktop vision loops at $0 API cost',
    description:
      'Phantom includes an adapter for NVIDIA NIM free-tier models like meta/llama-3.2-90b-vision-instruct. Prove the entire observe → decide → execute loop on real desktop screenshots without spending a cent.',
    specs: [
      { label: 'Provider', value: 'nvidia (integrate.api.nvidia.com)' },
      { label: 'Model', value: 'meta/llama-3.2-90b-vision-instruct' },
      { label: 'Cost', value: '$0.00 / free API tier' },
      { label: 'Verification', value: 'Offline test suite included' },
    ],
    codeSnippet: `$env:PHANTOM_PROVIDER = "nvidia"
$env:NVIDIA_API_KEY    = "nvapi-..."
$env:PHANTOM_NVIDIA_MODEL = "meta/llama-3.2-90b-vision-instruct"
python -m phantom_llm.server # zero-cost vision server!`,
    diagramType: 'nvidia',
  },
];

const AUTOPLAY_DURATION = 6500;
const CIRCLE_CIRCUMFERENCE = 119.38;

export const ShowcaseSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
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
            setActiveIndex((idx) => (idx + 1) % TABS.length);
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
    setActiveIndex((prev) => (prev + 1) % TABS.length);
    setProgress(0);
  };

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
    setProgress(0);
  };

  const currentTab = TABS[activeIndex];
  const strokeDashoffset = CIRCLE_CIRCUMFERENCE * (1 - progress);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="how"
      aria-label="Phantom Core Architecture & Capabilities"
    >
      <div
        className="how-stage-wrap"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="how-stage">
          <DitherField fill className="how-field" cell={2.5} bias={0.66} interactive="window" />

          {/* Navigation Bar */}
          <div className="how-bar">
            <div className="m-tabbar" role="group" aria-label="Phantom capabilities">
              <span className="m-tabbar-field" aria-hidden="true" />
              {TABS.map((tab, idx) => (
                <button
                  key={tab.id}
                  type="button"
                  className="m-tabbar-btn"
                  data-active={idx === activeIndex}
                  aria-pressed={idx === activeIndex}
                  onClick={() => handleTabClick(idx)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              className="how-next cursor-pointer"
              aria-label="Next capability"
              onClick={handleNext}
            >
              <svg className="how-ring" viewBox="0 0 40 40" aria-hidden="true">
                <circle
                  className="how-ring-fill"
                  cx="20"
                  cy="20"
                  r="19"
                  style={{
                    strokeDasharray: CIRCLE_CIRCUMFERENCE,
                    strokeDashoffset,
                  }}
                />
              </svg>
              <svg className="how-arrow" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3 8 H12 M8.5 4.5 L12 8 L8.5 11.5" />
              </svg>
            </button>
          </div>

          {/* Active Feature Display Card */}
          <div className="z-10 w-full max-w-5xl mx-auto mt-2">
            <div className="bg-[#EEF0F3] border border-[#D3D7DE] rounded-xl shadow-xl overflow-hidden p-6 sm:p-8 backdrop-blur-md">
              <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
                {/* Left Description */}
                <div className="flex-1 space-y-4 max-w-xl">
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-[11px] font-mono uppercase tracking-wider bg-[#0A0B0E]/10 text-[#0A0B0E]">
                    {currentTab.badge}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#101216] leading-tight">
                    {currentTab.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#3F434B] leading-relaxed">
                    {currentTab.description}
                  </p>

                  {/* Tech Specs Grid */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    {currentTab.specs.map((spec, i) => (
                      <div key={i} className="bg-white p-3 rounded-lg border border-[#D3D7DE]">
                        <p className="text-[11px] font-mono text-[#676D78] uppercase">{spec.label}</p>
                        <p className="text-xs sm:text-sm font-semibold text-[#101216] truncate mt-0.5">
                          {spec.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Interactive Visual Code Box */}
                <div className="w-full lg:w-[420px] shrink-0">
                  <div className="bg-[#101216] text-[#EEF0F3] rounded-lg border border-[#3F434B] p-4 font-mono text-xs shadow-2xl relative overflow-hidden">
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#3F434B]/60 text-[11px] text-[#A2A3A5]">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#E96359]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#15803D]" />
                        <span className="ml-2 text-white/70">phantom-kernel</span>
                      </div>
                      <span className="text-white/80 font-mono font-semibold">LIVE</span>
                    </div>

                    <pre className="overflow-x-auto text-[#EEF0F3] leading-relaxed text-[11.5px] whitespace-pre font-mono">
                      {currentTab.codeSnippet}
                    </pre>

                    <div className="mt-4 pt-3 border-t border-[#3F434B]/60 flex items-center justify-between text-[11px] text-[#A2A3A5]">
                      <span className="inline-flex items-center gap-1.5 text-[#15803D]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#15803D] animate-ping" />
                        Background Thread Active
                      </span>
                      <span>0.00ms Host Impact</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <span className="stage-line stage-line--top" aria-hidden="true" />
        <span className="stage-line stage-line--bottom" aria-hidden="true" />
        <span className="stage-node stage-node--tl" aria-hidden="true" />
        <span className="stage-node stage-node--tr" aria-hidden="true" />
        <span className="stage-node stage-node--bl" aria-hidden="true" />
        <span className="stage-node stage-node--br" aria-hidden="true" />
      </div>
    </section>
  );
};
