import React, { useState } from 'react';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTerminal?: () => void;
}

export const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onClose, onOpenTerminal }) => {
  const [activeTab, setActiveTab] = useState<'tui' | 'daemon' | 'swarm' | 'nim'>('tui');
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyText = (text: string, id: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#101216]/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#EEF0F3] border border-[#D3D7DE] w-full max-w-2xl rounded-2xl shadow-2xl p-6 sm:p-8 relative my-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white hover:bg-[#E5E8EC] text-[#101216] flex items-center justify-center transition-colors cursor-pointer border border-[#D3D7DE]"
          aria-label="Close"
        >
          ✕
        </button>

        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded text-xs font-mono uppercase bg-[#0A0B0E]/10 text-[#0A0B0E] font-semibold">
          Phantom Setup Guide
        </div>

        <h2 className="text-2xl font-bold tracking-tight text-[#101216] mt-2 mb-1">
          Get Started with Phantom
        </h2>
        <p className="text-sm text-[#3F434B] mb-5">
          Requires Rust stable, Python 3.11+, and Windows 10/11 for invisible desktop mode.
        </p>

        {/* Tab selection */}
        <div className="flex gap-1.5 p-1 bg-[#E5E8EC] rounded-lg border border-[#D3D7DE] mb-5 overflow-x-auto text-xs font-mono">
          <button
            type="button"
            onClick={() => setActiveTab('tui')}
            className={`px-3 py-1.5 rounded-md transition-colors shrink-0 cursor-pointer ${
              activeTab === 'tui' ? 'bg-[#101216] text-white font-bold' : 'text-[#676D78] hover:text-[#101216]'
            }`}
          >
            1. Interactive TUI
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('daemon')}
            className={`px-3 py-1.5 rounded-md transition-colors shrink-0 cursor-pointer ${
              activeTab === 'daemon' ? 'bg-[#101216] text-white font-bold' : 'text-[#676D78] hover:text-[#101216]'
            }`}
          >
            2. Headless Daemon
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('swarm')}
            className={`px-3 py-1.5 rounded-md transition-colors shrink-0 cursor-pointer ${
              activeTab === 'swarm' ? 'bg-[#101216] text-white font-bold' : 'text-[#676D78] hover:text-[#101216]'
            }`}
          >
            3. Master Swarm
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('nim')}
            className={`px-3 py-1.5 rounded-md transition-colors shrink-0 cursor-pointer ${
              activeTab === 'nim' ? 'bg-[#101216] text-white font-bold' : 'text-[#676D78] hover:text-[#101216]'
            }`}
          >
            4. Free NVIDIA NIM
          </button>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'tui' && (
          <div className="space-y-4 text-xs">
            <div className="bg-white p-4 rounded-xl border border-[#D3D7DE] space-y-2">
              <p className="font-semibold text-[#101216] text-sm">Step 1: Clone and Start Python LLM Service</p>
              <div className="bg-[#101216] text-[#EEF0F3] p-3 rounded font-mono text-[11px] flex items-center justify-between">
                <code>
                  git clone https://github.com/RavaniRoshan/phantom<br />
                  cd phantom/python<br />
                  pip install -r requirements.txt<br />
                  python -m phantom_llm.server
                </code>
                <button
                  type="button"
                  onClick={() =>
                    copyText(
                      'git clone https://github.com/RavaniRoshan/phantom && cd phantom/python && pip install -r requirements.txt && python -m phantom_llm.server',
                      'step1'
                    )
                  }
                  className="px-2 py-1 rounded bg-[#2b313d] hover:bg-[#3F434B] text-white text-[10px] shrink-0 ml-2"
                >
                  {copiedCmd === 'step1' ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-[#D3D7DE] space-y-2">
              <p className="font-semibold text-[#101216] text-sm">Step 2: Launch the Terminal UI</p>
              <div className="bg-[#101216] text-[#EEF0F3] p-3 rounded font-mono text-[11px] flex items-center justify-between">
                <code>cargo run -p phantom-cli --release</code>
                <button
                  type="button"
                  onClick={() => copyText('cargo run -p phantom-cli --release', 'step2')}
                  className="px-2 py-1 rounded bg-[#2b313d] hover:bg-[#3F434B] text-white text-[10px] shrink-0 ml-2"
                >
                  {copiedCmd === 'step2' ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'daemon' && (
          <div className="space-y-4 text-xs">
            <div className="bg-white p-4 rounded-xl border border-[#D3D7DE] space-y-2">
              <p className="font-semibold text-[#101216] text-sm">Run Proactive Background Daemon</p>
              <p className="text-[#3F434B] text-xs">
                Listens on loopback port 4545 for webhooks and watches <code>~/Phantom/Inbox</code> for dropped files.
              </p>
              <div className="bg-[#101216] text-[#EEF0F3] p-3 rounded font-mono text-[11px] flex items-center justify-between">
                <code>phantom-daemon --port 4545 --mode safe</code>
                <button
                  type="button"
                  onClick={() => copyText('phantom-daemon --port 4545 --mode safe', 'daemon_cmd')}
                  className="px-2 py-1 rounded bg-[#2b313d] hover:bg-[#3F434B] text-white text-[10px] shrink-0 ml-2"
                >
                  {copiedCmd === 'daemon_cmd' ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'swarm' && (
          <div className="space-y-4 text-xs">
            <div className="bg-white p-4 rounded-xl border border-[#D3D7DE] space-y-2">
              <p className="font-semibold text-[#101216] text-sm">Run Master Planner Swarm Task</p>
              <p className="text-[#3F434B] text-xs">
                Decomposes tasks into sub-tasks and fans out across isolated worker desktops concurrently.
              </p>
              <div className="bg-[#101216] text-[#EEF0F3] p-3 rounded font-mono text-[11px] flex items-center justify-between">
                <code>cargo run -p phantom-core --example swarm_task --release</code>
                <button
                  type="button"
                  onClick={() => copyText('cargo run -p phantom-core --example swarm_task --release', 'swarm_cmd')}
                  className="px-2 py-1 rounded bg-[#2b313d] hover:bg-[#3F434B] text-white text-[10px] shrink-0 ml-2"
                >
                  {copiedCmd === 'swarm_cmd' ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'nim' && (
          <div className="space-y-4 text-xs">
            <div className="bg-white p-4 rounded-xl border border-[#D3D7DE] space-y-2">
              <p className="font-semibold text-[#101216] text-sm">Zero-Cost Vision via NVIDIA NIM</p>
              <p className="text-[#3F434B] text-xs">
                Exercise real screenshot vision loops using free-tier Llama 3.2 90B Vision Instruct:
              </p>
              <div className="bg-[#101216] text-[#EEF0F3] p-3 rounded font-mono text-[11px] flex items-center justify-between">
                <code>
                  $env:PHANTOM_PROVIDER = "nvidia"<br />
                  $env:NVIDIA_API_KEY = "nvapi-..."<br />
                  python -m phantom_llm.server
                </code>
                <button
                  type="button"
                  onClick={() =>
                    copyText('$env:PHANTOM_PROVIDER = "nvidia"\n$env:NVIDIA_API_KEY = "nvapi-..."\npython -m phantom_llm.server', 'nim_cmd')
                  }
                  className="px-2 py-1 rounded bg-[#2b313d] hover:bg-[#3F434B] text-white text-[10px] shrink-0 ml-2"
                >
                  {copiedCmd === 'nim_cmd' ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-[#D3D7DE] flex items-center justify-between">
          <a
            href="https://github.com/RavaniRoshan/phantom"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-[#0A0B0E] hover:underline flex items-center gap-1"
          >
            Read Full Documentation on GitHub →
          </a>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#101216] hover:bg-[#252830] text-white font-medium text-xs cursor-pointer transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
