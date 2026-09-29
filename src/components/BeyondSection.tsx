import React from 'react';

export const BeyondSection: React.FC = () => {
  return (
    <section className="beyond" aria-label="Beyond interactive execution">
      <div className="beyond-proof">
        <span className="stage-line stage-line--top" aria-hidden="true" />
        <span className="stage-line stage-line--bottom" aria-hidden="true" />
        <span className="stage-node stage-node--tl" aria-hidden="true" />
        <span className="stage-node stage-node--tr" aria-hidden="true" />
        <span className="stage-node stage-node--bl" aria-hidden="true" />
        <span className="stage-node stage-node--br" aria-hidden="true" />

        <div className="beyond-copy">
          <p className="beyond-body">
            Computer use shouldn't require you to sit in a terminal waiting. Real workflows trigger
            from webhooks, calendar changes, emails, and dropped files.
          </p>
          <p className="beyond-turn">
            Phantom turns computer use into background infrastructure. Fully automated, fully
            observable, and always operating off-screen.
          </p>
        </div>

        <div className="proof-cell bg-white border border-[#A2A3A5] rounded-xl p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-[#676D78]">
            <span className="font-semibold text-[#101216]">Daemon Webhook Receiver</span>
            <span className="text-[#15803D]">● PORT 4545</span>
          </div>
          <p className="text-xs text-[#3F434B] leading-relaxed">
            POST /event triggers tasks directly from your backend, Zapier, or email processor with zero
            human input needed.
          </p>
          <div className="bg-[#101216] text-[#EEF0F3] p-2.5 rounded font-mono text-[11px]">
            <code>POST /event &#123; "event_type": "new_invoice" &#125;</code>
          </div>
          <span className="proof-caption text-[11px] text-[#0A0B0E]">
            Proactive Daemon Pipeline
          </span>
        </div>

        <div className="proof-cell bg-white border border-[#A2A3A5] rounded-xl p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-[#676D78]">
            <span className="font-semibold text-[#101216]">Filesystem Inbox Watcher</span>
            <span className="text-[#0A0B0E]">~/Phantom/Inbox</span>
          </div>
          <p className="text-xs text-[#3F434B] leading-relaxed">
            Drop any file into your local inbox folder. The filesystem watcher boots an agent task
            immediately to process it.
          </p>
          <div className="bg-[#101216] text-[#EEF0F3] p-2.5 rounded font-mono text-[11px]">
            <code>watcher: detected "Q3_Summary.xlsx" &rarr; dispatch()</code>
          </div>
          <span className="proof-caption text-[11px] text-[#0A0B0E]">
            Zero-Config Local Automation
          </span>
        </div>
      </div>
    </section>
  );
};
