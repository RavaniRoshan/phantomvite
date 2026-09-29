import React, { useState } from 'react';

interface TuiSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrandModal: React.FC<{ brandId: any; onClose: () => void }> = ({
  brandId,
  onClose,
}) => {
  const [commandInput, setCommandInput] = useState('');
  const [mode, setMode] = useState<'safe' | 'hero'>('safe');
  const [provider, setProvider] = useState<'claude' | 'openai' | 'gemini' | 'nvidia' | 'ollama'>('claude');
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    'Phantom TUI v0.3.0 · Mode: SAFE · Provider: CLAUDE · Confidence Gate: 0.70',
    'Type a task in natural language, or try slash commands: /help, /safe, /hero, /provider <name>, /clear',
    'Connected to python_llm gRPC service on 127.0.0.1:50051 (Loopback OK)',
  ]);

  if (!brandId) return null;

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = commandInput.trim();
    if (!cmd) return;

    const newLogs = [...terminalHistory, `> ${cmd}`];

    if (cmd === '/help') {
      newLogs.push(
        'Available slash commands:',
        '  /safe              Switch to Safe mode (restricted file writes)',
        '  /hero              Switch to Hero mode (unrestricted autonomous access)',
        '  /provider <name>   Switch provider (claude | openai | gemini | nvidia | ollama)',
        '  /clear             Clear transcript',
        '  /settings          Inspect active ~/.phantom/config.toml'
      );
    } else if (cmd === '/safe') {
      setMode('safe');
      newLogs.push('✓ Switched to SAFE mode. Writes restricted to allowed_folders.');
    } else if (cmd === '/hero') {
      setMode('hero');
      newLogs.push('⚡ Switched to HERO mode. Unrestricted system access active.');
    } else if (cmd.startsWith('/provider')) {
      const parts = cmd.split(' ');
      const p = parts[1]?.toLowerCase();
      if (['claude', 'openai', 'gemini', 'nvidia', 'ollama'].includes(p)) {
        setProvider(p as any);
        newLogs.push(`✓ Provider switched to: ${p.toUpperCase()}`);
      } else {
        newLogs.push('Usage: /provider <claude | openai | gemini | nvidia | ollama>');
      }
    } else if (cmd === '/clear') {
      setTerminalHistory(['Transcript cleared. Phantom ready for instructions.']);
      setCommandInput('');
      return;
    } else if (cmd === '/settings') {
      newLogs.push(
        `Active Configuration:\n  provider = "${provider}"\n  mode = "${mode}"\n  confidence_gate = 0.70\n  max_parallel_workers = 4\n  grpc_endpoint = "http://127.0.0.1:50051"`
      );
    } else {
      // Simulate plan & execution
      newLogs.push(
        `[PlanTask RPC] Decomposing: "${cmd}"`,
        `  [✓] Step 1: Query off-screen HWND viewport via PrintWindow`,
        `  [▶] Step 2: StreamThinking -> ActionDecision { action: "ui_automation", confidence: 0.94 }`,
        `  [✓] Step 3: Verified outcome in background desktop without focus theft.`,
        `✓ Task successfully executed in background.`
      );
    }

    setTerminalHistory(newLogs);
    setCommandInput('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#101216]/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#101216] border border-[#3F434B] w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col font-mono text-xs max-h-[90vh]">
        {/* Terminal Header */}
        <div className="bg-[#1c212a] px-5 py-3 border-b border-[#3F434B] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#E96359]" />
            <span className="w-3 h-3 rounded-full bg-[#F59E0B]" />
            <span className="w-3 h-3 rounded-full bg-[#15803D]" />
            <span className="font-bold text-white tracking-wider ml-1">
              PHANTOM TERMINAL SIMULATOR
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] px-2 py-0.5 rounded bg-[#2b313d] text-white">
              provider: <strong className="text-white font-semibold">{provider}</strong>
            </span>
            <span
              className={`text-[11px] px-2 py-0.5 rounded uppercase font-bold ${
                mode === 'safe'
                  ? 'bg-[#15803D]/20 text-[#15803D] border border-[#15803D]/40'
                  : 'bg-[#E96359]/20 text-[#E96359] border border-[#E96359]/40'
              }`}
            >
              mode: {mode}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="text-[#A2A3A5] hover:text-white p-1 text-sm font-sans cursor-pointer"
              aria-label="Close terminal"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Quick Command Chips */}
        <div className="bg-[#14171d] px-4 py-2 border-b border-[#3F434B]/60 flex items-center gap-2 overflow-x-auto text-[11px]">
          <span className="text-[#676D78] uppercase text-[10px] shrink-0">Quick Click:</span>
          <button
            type="button"
            onClick={() => setCommandInput('/safe')}
            className="px-2 py-0.5 rounded bg-[#232833] hover:bg-[#2e3544] text-[#EEF0F3] shrink-0 font-medium"
          >
            /safe
          </button>
          <button
            type="button"
            onClick={() => setCommandInput('/hero')}
            className="px-2 py-0.5 rounded bg-[#232833] hover:bg-[#2e3544] text-[#E96359] shrink-0"
          >
            /hero
          </button>
          <button
            type="button"
            onClick={() => setCommandInput('/provider nvidia')}
            className="px-2 py-0.5 rounded bg-[#232833] hover:bg-[#2e3544] text-[#15803D] shrink-0"
          >
            /provider nvidia
          </button>
          <button
            type="button"
            onClick={() => setCommandInput('/provider claude')}
            className="px-2 py-0.5 rounded bg-[#232833] hover:bg-[#2e3544] text-white shrink-0"
          >
            /provider claude
          </button>
          <button
            type="button"
            onClick={() => setCommandInput('Summarize unread vendor statements in ~/Phantom/Inbox')}
            className="px-2 py-0.5 rounded bg-[#232833] hover:bg-[#2e3544] text-white/80 shrink-0 truncate max-w-xs"
          >
            Sample: Summarize Invoices
          </button>
        </div>

        {/* Terminal Screen */}
        <div className="p-5 flex-1 overflow-y-auto space-y-2 text-[#EEF0F3] min-h-[340px] leading-relaxed text-[11.5px]">
          {terminalHistory.map((line, i) => (
            <div
              key={i}
              className={`${
                line.startsWith('>')
                  ? 'text-white font-bold'
                  : line.startsWith('✓')
                  ? 'text-[#15803D] font-bold'
                  : line.startsWith('⚡')
                  ? 'text-[#E96359] font-bold'
                  : 'text-[#D3D7DE]'
              } whitespace-pre-wrap`}
            >
              {line}
            </div>
          ))}
        </div>

        {/* Terminal Input Form */}
        <form onSubmit={handleCommandSubmit} className="bg-[#181c24] p-3 border-t border-[#3F434B] flex items-center gap-2">
          <span className="text-white/70 font-bold text-sm">$</span>
          <input
            type="text"
            value={commandInput}
            onChange={(e) => setCommandInput(e.target.value)}
            placeholder="Type a task or slash command (e.g. /help, /provider nvidia, scrape competitor pricing)..."
            className="flex-1 bg-transparent border-none text-[#EEF0F3] outline-none text-xs font-mono placeholder:text-[#676D78]"
            autoFocus
          />
          <button
            type="submit"
            className="px-3 py-1.5 rounded bg-[#0A0B0E] hover:bg-[#202530] text-white text-xs font-bold transition-colors cursor-pointer border border-[#3F434B]"
          >
            Run
          </button>
        </form>
      </div>
    </div>
  );
};
