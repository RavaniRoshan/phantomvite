import React from 'react';

interface BrandsSectionProps {
  onSelectBrand?: (brandId: 'vanta' | 'pythia') => void;
  onOpenQuickstart?: () => void;
}

const PROVIDERS = [
  {
    id: 'nvidia',
    name: 'NVIDIA NIM (Free Vision)',
    tagline: 'Zero-cost testing on real desktop screenshots',
    description:
      'Talks to NVIDIA NIM’s OpenAI-compatible endpoint driving free-tier vision models like meta/llama-3.2-90b-vision-instruct. Prove your entire observe → decide → execute loop before spending on paid APIs.',
    badge: 'Zero API Cost',
    badgeColor: 'bg-[#15803D]/10 text-[#15803D]',
    envKey: 'PHANTOM_PROVIDER="nvidia"',
    features: ['Llama-3.2-90B-Vision', 'OpenAI-compatible schema', 'Full screenshot perception'],
  },
  {
    id: 'claude',
    name: 'Anthropic Claude 3.7 / 3.5',
    tagline: 'Native tool use with deep visual comprehension',
    description:
      'High-precision spatial coordinate recognition and multi-step UI reasoning. Claude maps seamlessly into Phantom’s canonical action schema via python/phantom_llm/adapters/claude.py.',
    badge: 'Frontier Vision',
    badgeColor: 'bg-[#0A0B0E]/10 text-[#0A0B0E]',
    envKey: 'PHANTOM_PROVIDER="claude"',
    features: ['Tool use mapping', 'Sub-pixel accuracy', 'StreamThinking RPC'],
  },
  {
    id: 'openai',
    name: 'OpenAI GPT-4o & o3',
    tagline: 'Function-calling with structured JSON output',
    description:
      'Funneled through normalize_action_dict() so all tool parameters match Phantom’s exact Click, Type, and KeyPress types. Deterministic schema adherence with zero drift.',
    badge: 'High Throughput',
    badgeColor: 'bg-[#101216]/10 text-[#101216]',
    envKey: 'PHANTOM_PROVIDER="openai"',
    features: ['Function calling', 'Confidence normalization', 'Batch evaluation'],
  },
  {
    id: 'ollama',
    name: 'Ollama & Local Weights',
    tagline: '100% offline, private air-gapped execution',
    description:
      'Run completely offline on your own GPU. Perfect for confidential environments, classified networks, and zero-telemetry defense workloads.',
    badge: 'Air-Gapped & Local',
    badgeColor: 'bg-[#7C3AED]/10 text-[#7C3AED]',
    envKey: 'PHANTOM_PROVIDER="ollama"',
    features: ['Zero network required', 'Local VRAM inference', 'Mock provider for CI'],
  },
];

export const BrandsSection: React.FC<BrandsSectionProps> = ({ onOpenQuickstart }) => {
  return (
    <section id="providers" className="brands" aria-label="Supported LLM Providers">
      <header className="brands-head">
        <h2 className="brands-title">Bring any model. Switch without rewriting a line.</h2>
      </header>

      <div className="brands-grid">
        {PROVIDERS.map((provider) => (
          <div
            key={provider.id}
            className="brand bg-[#EEF0F3] border border-[#D3D7DE] rounded-xl p-6 flex flex-col justify-between hover:border-[#0A0B0E]/60 transition-colors shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-3">
                <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-medium ${provider.badgeColor}`}>
                  {provider.badge}
                </span>
                <code className="text-[11px] font-mono text-[#676D78] bg-white px-2 py-0.5 rounded border border-[#D3D7DE]">
                  {provider.envKey}
                </code>
              </div>

              <h3 className="brand-name text-xl font-semibold text-[#101216]">
                {provider.name}
              </h3>
              <p className="brand-line font-medium text-[#0A0B0E] text-xs mt-0.5 mb-2.5">
                {provider.tagline}
              </p>
              <p className="text-sm text-[#3F434B] leading-relaxed">
                {provider.description}
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-[#D3D7DE]/80 flex flex-wrap gap-2">
              {provider.features.map((feat, idx) => (
                <span
                  key={idx}
                  className="text-[11px] font-mono text-[#101216] bg-white px-2 py-1 rounded border border-[#D3D7DE]"
                >
                  ✓ {feat}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
