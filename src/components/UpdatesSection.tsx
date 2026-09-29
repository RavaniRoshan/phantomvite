import React, { useState } from 'react';

export const UpdatesSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section id="updates" className="upd" aria-label="Project Releases & Updates">
      <div className="upd-grid">
        <div className="upd-cell upd-cell--empty" aria-hidden="true" />
        <div className="upd-cell upd-cell--main">
          <h2 className="upd-title">Stay in the loop with Phantom releases.</h2>

          {submitted ? (
            <p className="upd-done">
              Thanks for following! We'll notify you on major crate releases, new provider adapters, and runtime benchmarks.
            </p>
          ) : (
            <form className="upd-form" onSubmit={handleSubmit}>
              <label className="sr-only" htmlFor="upd-email">
                Email
              </label>
              <div className="upd-row">
                <input
                  id="upd-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="developer@company.com"
                  className="dl-input"
                  required
                />
                <button
                  type="submit"
                  className="dl-btn"
                  disabled={!email}
                >
                  Keep me posted
                </button>
              </div>
            </form>
          )}

          <p className="upd-proof">Join developers tracking autonomous computer use.</p>
          <p className="upd-consent">
            Release announcements, new LLM adapters, and architecture RFCs. Zero spam.
          </p>
        </div>
        <div className="upd-cell upd-cell--empty" aria-hidden="true" />
      </div>
    </section>
  );
};
