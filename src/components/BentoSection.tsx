import React, { useState, useEffect, useRef } from 'react';
import { VLogo } from './VLogo';

const COUNT = 6;
const W_CONST = 0.85;
const G_CONST = 0.24;

export const BentoSection: React.FC = () => {
  const orbitRef = useRef<HTMLDivElement>(null);
  const [angles, setAngles] = useState<number[]>(() =>
    Array.from({ length: COUNT }, (_, i) => (i * 360) / COUNT)
  );
  const [simulatedConfidence, setSimulatedConfidence] = useState(0.88);
  const [currentMode, setCurrentMode] = useState<'safe' | 'hero'>('safe');

  useEffect(() => {
    let animTimer: ReturnType<typeof setTimeout>;
    let isMounted = true;
    const stepAngle = 360 / COUNT;
    const interval = 2200;

    const loop = () => {
      if (!isMounted) return;
      setAngles((prev) => prev.map((a) => a + stepAngle));
      animTimer = setTimeout(loop, interval);
    };

    animTimer = setTimeout(loop, interval);
    return () => {
      isMounted = false;
      clearTimeout(animTimer);
    };
  }, []);

  const getTileTransform = (angleDeg: number, baseRadius: number) => {
    const rad = (angleDeg * Math.PI) / 180;
    const cosVal = Math.cos(rad);
    const sinVal = Math.sin(rad);

    const a = baseRadius * sinVal * Math.cos(W_CONST);
    const o = baseRadius * sinVal * Math.sin(W_CONST);

    const x = baseRadius * cosVal * Math.cos(G_CONST) + o * Math.sin(G_CONST);
    const y = a;
    const z = -baseRadius * cosVal * Math.sin(G_CONST) + o * Math.cos(G_CONST);

    return `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, ${z.toFixed(2)}px)`;
  };

  const baseRadius = 68;
  const tileSize = 42;

  return (
    <section id="architecture" className="bento" aria-label="Phantom architecture and features">
      <h2 className="bento-title">Engineered for real production autonomy.</h2>

      <div className="bento-grid">
        {/* Card 1: One Neutral Action Schema (cell--wide) */}
        <article className="cell cell--wide">
          <div className="viz viz--solid viz--connect">
            <div className="connect-diagram" aria-hidden="true">
              <span className="connect-markwrap">
                <VLogo className="connect-mark" withText={false} />
              </span>

              <svg className="connect-drop" viewBox="0 0 2 40" width="2" height="40">
                <line className="c-line" x1="1" y1="0" x2="1" y2="40" />
                <line
                  className="c-pulse c-pulse--drop"
                  x1="1"
                  y1="0"
                  x2="1"
                  y2="40"
                  pathLength="100"
                />
              </svg>

              <span className="connect-node">Canonical Action Schema</span>

              <svg className="connect-fan" viewBox="0 0 736 56" style={{ height: '56px' }}>
                <path className="c-line" d="M 368 0 C 368 33.6, 74 22.4, 74 56" />
                <path className="c-line" d="M 368 0 C 368 33.6, 240 22.4, 240 56" />
                <path className="c-line" d="M 368 0 C 368 33.6, 388 22.4, 388 56" />
                <path className="c-line" d="M 368 0 C 368 33.6, 528 22.4, 528 56" />
                <path className="c-line" d="M 368 0 C 368 33.6, 662 22.4, 662 56" />

                <path className="c-pulse c-pulse--fan" d="M 368 0 C 368 33.6, 74 22.4, 74 56" pathLength="100" />
                <path className="c-pulse c-pulse--fan" d="M 368 0 C 368 33.6, 240 22.4, 240 56" pathLength="100" />
                <path className="c-pulse c-pulse--fan" d="M 368 0 C 368 33.6, 388 22.4, 388 56" pathLength="100" />
                <path className="c-pulse c-pulse--fan" d="M 368 0 C 368 33.6, 528 22.4, 528 56" pathLength="100" />
                <path className="c-pulse c-pulse--fan" d="M 368 0 C 368 33.6, 662 22.4, 662 56" pathLength="100" />
              </svg>

              <ul className="connect-clients">
                <li className="client-chip">
                  <span className="font-semibold text-xs">Anthropic Claude</span>
                </li>
                <li className="client-chip">
                  <span className="font-semibold text-xs">OpenAI GPT-4o</span>
                </li>
                <li className="client-chip">
                  <span className="font-semibold text-xs">Google Gemini</span>
                </li>
                <li className="client-chip">
                  <span className="font-semibold text-xs">Ollama / Local</span>
                </li>
                <li className="client-chip">
                  <span className="font-semibold text-xs text-[#0A0B0E]">NVIDIA NIM (Free)</span>
                </li>
              </ul>

              <p className="connect-any">All providers normalize into python/phantom_llm/schema.py</p>
            </div>
          </div>

          <div className="cell-copy">
            <h3 className="cell-title">One neutral action schema. Zero vendor lock-in.</h3>
            <p className="cell-body">
              Every LLM provider speaks a different dialect — tool_use, functionCalling, JSON schema.
              Phantom's Python service normalizes all outputs into one shared action contract. The Rust
              agent loop never knows which model is running, guaranteeing true model neutrality.
            </p>
          </div>
        </article>

        {/* Card 2: Master Planner Swarm (cell--l) */}
        <article className="cell cell--l">
          <div className="viz">
            <div className="orbit-stage">
              <div ref={orbitRef} className="orbit" aria-hidden="true">
                <div className="orbit-ring">
                  {angles.map((angle, i) => (
                    <div
                      key={i}
                      data-tile
                      className={`orbit-tile flex items-center justify-center font-mono text-[10px] font-bold ${
                        i === 0 ? 'is-accent text-white' : 'text-[#101216]'
                      }`}
                      style={{
                        width: `${tileSize}px`,
                        height: `${tileSize}px`,
                        marginTop: `${-tileSize / 2}px`,
                        marginLeft: `${-tileSize / 2}px`,
                        transform: getTileTransform(angle, baseRadius),
                        transition: 'transform 1.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    >
                      W{i + 1}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="cell-copy">
            <h3 className="cell-title">Master Planner swarm</h3>
            <p className="cell-body">
              Complex tasks are broken into sub-task graphs and executed across concurrent workers,
              each on its own isolated hidden desktop. Memory is strictly bounded to ~2 GiB per worker so
              your machine never runs out of RAM.
            </p>
          </div>
        </article>

        {/* Card 3: Confidence-Gated Autonomy (cell--r) */}
        <article className="cell cell--r">
          <div className="viz viz--solid pt-1 pb-2">
            <div className="w-full max-w-sm mx-auto font-mono text-xs bg-[#FBFBFC] rounded-xl border border-[#D3D7DE] shadow-sm p-4 space-y-3.5">
              {/* Interactive Scenario Buttons */}
              <div className="flex items-center justify-between gap-1.5 p-1 bg-[#E5E8EC] rounded-lg border border-[#D3D7DE]">
                <button
                  type="button"
                  onClick={() => setSimulatedConfidence(0.92)}
                  className={`flex-1 py-1 px-2 rounded text-[11px] font-bold transition-all cursor-pointer text-center ${
                    simulatedConfidence >= 0.70
                      ? 'bg-[#101216] text-white shadow-sm'
                      : 'text-[#676D78] hover:text-[#101216]'
                  }`}
                >
                  Auto-Approve (0.92)
                </button>
                <button
                  type="button"
                  onClick={() => setSimulatedConfidence(0.54)}
                  className={`flex-1 py-1 px-2 rounded text-[11px] font-bold transition-all cursor-pointer text-center ${
                    simulatedConfidence < 0.70
                      ? 'bg-[#101216] text-white shadow-sm'
                      : 'text-[#676D78] hover:text-[#101216]'
                  }`}
                >
                  Queue Review (0.54)
                </button>
              </div>

              {/* High-Contrast Score Cards */}
              <div className="grid grid-cols-2 gap-2.5 text-left">
                <div className="bg-white p-3 rounded-lg border border-[#D3D7DE] shadow-xs">
                  <span className="text-[10px] font-bold text-[#676D78] uppercase tracking-wider block">
                    Gate Threshold
                  </span>
                  <div className="text-xl font-bold text-[#101216] mt-1 font-mono">0.70</div>
                  <span className="text-[10px] text-[#676D78]">config.toml default</span>
                </div>
                <div
                  className={`p-3 rounded-lg border shadow-xs transition-colors ${
                    simulatedConfidence >= 0.70
                      ? 'bg-emerald-50/60 border-emerald-300/80'
                      : 'bg-amber-50/60 border-amber-300/80'
                  }`}
                >
                  <span className="text-[10px] font-bold text-[#676D78] uppercase tracking-wider block">
                    Model Score
                  </span>
                  <div
                    className={`text-xl font-bold mt-1 font-mono ${
                      simulatedConfidence >= 0.70 ? 'text-[#15803D]' : 'text-[#D97706]'
                    }`}
                  >
                    {simulatedConfidence.toFixed(2)}
                  </div>
                  <span className="text-[10px] text-[#676D78]">eval perception</span>
                </div>
              </div>

              {/* Progress Bar with Gate Marker */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-mono text-[#676D78]">
                  <span>0.00</span>
                  <span className="text-[#101216] font-bold flex items-center gap-1">
                    ▲ 0.70 Gate
                  </span>
                  <span>1.00</span>
                </div>
                <div className="h-3 w-full bg-[#E5E8EC] rounded-full relative overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      simulatedConfidence >= 0.70 ? 'bg-[#15803D]' : 'bg-[#D97706]'
                    }`}
                    style={{ width: `${simulatedConfidence * 100}%` }}
                  />
                  {/* Gate Marker Line */}
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-[#101216] z-10"
                    style={{ left: '70%' }}
                    title="0.70 Safety Gate Threshold"
                  />
                </div>
              </div>

              {/* Action Decision Console */}
              <div className="bg-[#101216] text-[#EEF0F3] p-3 rounded-lg text-left text-[11px] space-y-1 border border-[#3F434B]">
                {simulatedConfidence >= 0.70 ? (
                  <>
                    <div className="text-[#15803D] font-bold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#15803D] animate-ping" />
                      <span>✓ AUTO-APPROVED (0.92 ≥ 0.70)</span>
                    </div>
                    <p className="text-white/70 text-[10.5px] leading-tight m-0">
                      Dispatched instantly to background desktop without operator pause.
                    </p>
                  </>
                ) : (
                  <>
                    <div className="text-[#F59E0B] font-bold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-ping" />
                      <span>⏸ PAUSED: APPROVAL QUEUE (0.54 &lt; 0.70)</span>
                    </div>
                    <p className="text-white/70 text-[10.5px] leading-tight m-0">
                      Queued for human approval in TUI · Skips headlessly for safety.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="cell-copy">
            <h3 className="cell-title">Confidence-gated autonomy</h3>
            <p className="cell-body">
              Every action carries a confidence score. In Safe mode, steps below the threshold pause
              in the Approval Queue for operator review in the TUI, while headless daemon runs skip
              uncertain operations to prevent catastrophic mistakes.
            </p>
          </div>
        </article>

        {/* Card 4: Safe Mode vs Hero Mode (cell--l) */}
        <article className="cell cell--l">
          <div className="viz">
            <div className="frag frag--tokens font-mono text-xs">
              <div className="token-row flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="token-chip bg-[#15803D]" />
                  <span className="token-name font-bold">Safe Mode (Default)</span>
                </div>
                <span className="text-[11px] text-[#676D78]">writes: allowed_folders</span>
              </div>
              <div className="token-row flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="token-chip bg-[#0A0B0E]" />
                  <span className="token-name font-bold">Hero Mode</span>
                </div>
                <span className="text-[11px] text-[#0A0B0E]">unrestricted root access</span>
              </div>
              <div className="token-row flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="token-chip bg-[#101216]" />
                  <span className="token-name">Slash Switch</span>
                </div>
                <span className="token-hex text-[#101216]">/safe · /hero</span>
              </div>
            </div>
          </div>

          <div className="cell-copy">
            <h3 className="cell-title">Safe & Hero operational modes</h3>
            <p className="cell-body">
              Toggle security boundaries on the fly. Safe mode protects your system by constraining
              file writes strictly to allowed folders. Hero mode unleashes full unrestricted automation
              when speed is paramount.
            </p>
          </div>
        </article>

        {/* Card 5: Invisible Win32 Desktop (cell--r) */}
        <article className="cell cell--r">
          <div className="viz">
            <div className="gate-scene" aria-hidden="true">
              <div className="gate-behind font-mono text-xs">
                <div className="text-[11px] text-[#101216] font-bold">Visible Display (You)</div>
                <div className="text-[10px] text-[#676D78]">Your IDE, browser, Slack, meetings</div>
                <span className="skel" style={{ width: '60%' }} />
                <span className="skel" style={{ width: '45%' }} />
              </div>

              <div className="frag frag--gate font-mono text-xs border border-[#0A0B0E]/40 shadow-lg">
                <div className="flex items-center gap-2 text-[#0A0B0E] font-bold text-xs">
                  <span className="w-2 h-2 rounded-full bg-[#0A0B0E] animate-ping" />
                  Hidden Desktop (Phantom)
                </div>
                <p className="gate-line text-[11px] text-[#3F434B]">
                  Station: \\Default\\PhantomHiddenDesktop
                </p>
                <div className="w-full bg-[#101216] text-[#EEF0F3] p-2 rounded text-[10px] text-left space-y-0.5">
                  <div>status: ACTIVE_OFFSCREEN</div>
                  <div>focus_theft: 0.00%</div>
                  <div>mouse_pos: UNCHANGED</div>
                </div>
              </div>
            </div>
          </div>

          <div className="cell-copy">
            <h3 className="cell-title">Invisible desktop via CreateDesktopW</h3>
            <p className="cell-body">
              Unlike competitor frameworks that seize your primary cursor and flash windows across
              your taskbar, Phantom spawns an isolated Win32 desktop station. Automated workflows
              execute silently in the background while you stay in your flow.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
};
