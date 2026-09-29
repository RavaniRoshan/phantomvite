import React from 'react';

export const StakesSection: React.FC = () => {
  return (
    <section className="stakes" aria-label="The problem with traditional computer use agents">
      <div className="stakes-passage">
        <p className="stakes-body">
          You trigger a computer-use agent and suddenly your workstation isn't yours anymore.
        </p>
        <p className="stakes-body">
          The cursor gets ripped from your hand, browser windows violently pop into view to steal
          keyboard focus while you're in the middle of a client meeting, and you are held hostage
          staring at your own screen for twenty minutes.
        </p>
        <p className="stakes-body">
          Phantom created the invisible workspace. Win32 virtual desktops, headless Chromium over
          the Chrome DevTools Protocol, and proactive background workers. The agent plans, navigates,
          and delivers results — while you never lose control of your machine.
        </p>
        <p className="stakes-turn">
          Computer use was a hostage situation. It isn't anymore.
        </p>
      </div>
    </section>
  );
};
