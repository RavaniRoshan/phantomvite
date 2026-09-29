import React, { useState } from 'react';
import { StageFrame } from './StageFrame';
import { DitherField } from './DitherField';

interface TerminalLog {
  type: 'prompt' | 'plan' | 'thinking' | 'action' | 'result' | 'success';
  text: string;
}

const SAMPLE_TASKS = [
  {
    label: 'Invoice Extraction',
    cmd: 'Extract total invoice amounts from dropped PDFs in ~/Phantom/Inbox',
    logs: [
      { type: 'prompt', text: '> phantom: Extract total invoice amounts from dropped PDFs in ~/Phantom/Inbox' },
      { type: 'plan', text: 'PlanTask RPC -> Decomposed into 3 SubTasks:\n  [✓] 1. Scan filesystem inbox for new .pdf files\n  [▶] 2. Open off-screen viewer and extract tabular data\n  [ ] 3. Append row to ~/Phantom/Invoices_2026.csv' },
      { type: 'thinking', text: 'StreamThinking: Found 2 files (inv_1042.pdf, inv_1043.pdf). Launching hidden desktop reader via UI Automation.' },
      { type: 'action', text: 'DecideAction: { action: "read_pdf_table", target: "inv_1042.pdf", confidence: 0.94 }' },
      { type: 'result', text: 'Verified extracted total: $14,250.00 USD (vendor: TechCorp)' },
      { type: 'success', text: '✓ Task completed in background in 3.4s with 0.00s host interruption.' },
    ],
  },
  {
    label: 'Competitor Scraping',
    cmd: 'Navigate to pricing page, capture screenshot, and extract plan comparison',
    logs: [
      { type: 'prompt', text: '> phantom: Navigate to pricing page, capture screenshot, and extract plan comparison' },
      { type: 'plan', text: 'PlanTask RPC -> Decomposed into 2 SubTasks:\n  [✓] 1. Headless Chromium CDP navigate to target\n  [▶] 2. Query DOM table structure & extract tiers' },
      { type: 'thinking', text: 'StreamThinking: Page rendered in headless browser. Capturing viewport snapshot.' },
      { type: 'action', text: 'DecideAction: { action: "cdp_eval", expr: "document.querySelectorAll(\'.tier-price\')", confidence: 0.98 }' },
      { type: 'result', text: 'Found 3 tiers: Starter ($29), Pro ($79), Enterprise ($299)' },
      { type: 'success', text: '✓ Written to ~/Phantom/competitor_pricing.json. Zero popups shown.' },
    ],
  },
  {
    label: 'Master Swarm Task',
    cmd: 'cargo run -p phantom-core --example swarm_task --release',
    logs: [
      { type: 'prompt', text: '> phantom-swarm: Parallel audit of 4 regional endpoint status pages' },
      { type: 'plan', text: 'MasterPlanner::run -> Sub-task graph partitioned into 4 worker agents:\n  • Worker 1 (Desktop #1): US-East probe\n  • Worker 2 (Desktop #2): US-West probe\n  • Worker 3 (Desktop #3): EU-Central probe\n  • Worker 4 (Desktop #4): AP-South probe' },
      { type: 'thinking', text: 'Allocated 4 hidden Win32 desktops (~1.8 GiB RAM total). Running in parallel.' },
      { type: 'action', text: 'Concurrent workers evaluating endpoints across background threads...' },
      { type: 'result', text: 'All 4 probes returned HTTP 200 with latency < 45ms.' },
      { type: 'success', text: '✓ Swarm synthesis complete. Output written to swarm_summary.md.' },
    ],
  },
];

export const WalkthroughSection: React.FC = () => {
  const [activeTaskIdx, setActiveTaskIdx] = useState(0);
  const [currentMode, setCurrentMode] = useState<'safe' | 'hero'>('safe');
  const activeTask = SAMPLE_TASKS[activeTaskIdx];

  return (
    <section id="daemon" className="walk" aria-label="Interactive Terminal Walkthrough">
      <header className="walk-head">
        <h2 className="walk-title">Watch Phantom work in the background.</h2>
      </header>

      <StageFrame className="walk-stage">
        <DitherField className="stage-mat" cell={2.5} bias={0.66} interactive="window">
          <div className="stage-content">
            <div className="bg-[#101216] border border-[#3F434B] rounded-xl shadow-2xl overflow-hidden font-mono text-xs">
              {/* Terminal Titlebar */}
              <div className="bg-[#1c1f26] px-4 py-3 border-b border-[#3F434B] flex flex-wrap items-center justify-between gap-3 text-[#A2A3A5]">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#E96359]" />
                  <span className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                  <span className="w-3 h-3 rounded-full bg-[#15803D]" />
                  <span className="ml-2 font-bold text-white tracking-wide">
                    phantom-cli — ratatui TUI v0.3.0
                  </span>
                </div>

                <div className="flex items-center gap-3 text-[11px]">
                  <span className="bg-[#2a2f3a] px-2 py-0.5 rounded text-white/80">
                    provider: <strong className="text-white">claude</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => setCurrentMode(currentMode === 'safe' ? 'hero' : 'safe')}
                    className={`px-2 py-0.5 rounded uppercase font-bold cursor-pointer transition-colors ${
                      currentMode === 'safe'
                        ? 'bg-[#15803D]/20 text-[#15803D] border border-[#15803D]/40'
                        : 'bg-[#E96359]/20 text-[#E96359] border border-[#E96359]/40'
                    }`}
                  >
                    MODE: {currentMode}
                  </button>
                  <span className="text-[#15803D] hidden sm:inline">● gRPC:50051 CONNECTED</span>
                </div>
              </div>

              {/* Sample Task Selector */}
              <div className="bg-[#14171d] px-4 py-2 border-b border-[#3F434B]/50 flex items-center gap-2 overflow-x-auto text-[11px]">
                <span className="text-[#676D78] uppercase text-[10px] tracking-wider shrink-0 font-bold">
                  Preset Tasks:
                </span>
                {SAMPLE_TASKS.map((task, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveTaskIdx(i)}
                    className={`px-2.5 py-1 rounded text-xs transition-colors shrink-0 cursor-pointer ${
                      activeTaskIdx === i
                        ? 'bg-[#0A0B0E] text-white font-semibold border border-[#3F434B]'
                        : 'bg-[#1c212a] text-[#A2A3A5] hover:text-white'
                    }`}
                  >
                    {task.label}
                  </button>
                ))}
              </div>

              {/* Terminal Body */}
              <div className="p-5 sm:p-6 space-y-3 min-h-[300px] text-[#EEF0F3] leading-relaxed">
                {activeTask.logs.map((log, index) => (
                  <div key={index} className="space-y-1">
                    {log.type === 'prompt' && (
                      <div className="text-white font-bold flex items-start gap-2">
                        <span className="text-white/60">$</span>
                        <span>{log.text.replace('> phantom: ', '')}</span>
                      </div>
                    )}
                    {log.type === 'plan' && (
                      <div className="bg-[#181c23] p-3 rounded border border-[#2b313d] text-white/90 whitespace-pre font-mono text-[11.5px]">
                        {log.text}
                      </div>
                    )}
                    {log.type === 'thinking' && (
                      <div className="text-[#A2A3A5] italic text-[11px] flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                        {log.text}
                      </div>
                    )}
                    {log.type === 'action' && (
                      <div className="text-white bg-[#0A0B0E]/80 p-2 rounded border border-[#3F434B] text-[11px]">
                        {log.text}
                      </div>
                    )}
                    {log.type === 'result' && (
                      <div className="text-white/80 text-[11px] pl-3 border-l-2 border-[#15803D]">
                        {log.text}
                      </div>
                    )}
                    {log.type === 'success' && (
                      <div className="text-[#15803D] font-bold text-xs pt-1 flex items-center gap-1.5">
                        <span>{log.text}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Terminal Status Footer */}
              <div className="bg-[#14171d] px-4 py-2.5 border-t border-[#3F434B] flex flex-wrap items-center justify-between gap-3 text-[11px] text-[#A2A3A5]">
                <div className="flex items-center gap-4">
                  <span>
                    Status: <strong className="text-white">Idle</strong>
                  </span>
                  <span>
                    Confidence Gate: <strong className="text-white">0.70</strong>
                  </span>
                  <span>
                    Max Workers: <strong className="text-white">4</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[10px]">
                  <span>Commands:</span>
                  <code className="text-[#EEF0F3] bg-[#232833] px-1 rounded">/safe</code>
                  <code className="text-[#EEF0F3] bg-[#232833] px-1 rounded">/hero</code>
                  <code className="text-[#EEF0F3] bg-[#232833] px-1 rounded">/provider</code>
                  <code className="text-[#EEF0F3] bg-[#232833] px-1 rounded">/settings</code>
                </div>
              </div>
            </div>
          </div>
        </DitherField>
      </StageFrame>
    </section>
  );
};
