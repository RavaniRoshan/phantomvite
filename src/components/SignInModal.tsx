import React, { useState } from 'react';
import { CTAButton } from './CTAButton';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#101216]/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#EEF0F3] border border-[#D3D7DE] w-full max-w-md rounded-2xl shadow-2xl p-6 sm:p-8 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white hover:bg-[#E5E8EC] text-[#101216] flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold tracking-tight text-[#101216] mb-2">
          Sign in to Phantom
        </h2>
        <p className="text-sm text-[#3F434B] mb-6">
          Enter your email and we'll send you a passwordless magic sign-in link.
        </p>

        {submitted ? (
          <div className="bg-white p-4 rounded-xl border border-[#15803D]/30 text-center space-y-2">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto text-sm font-bold">
              ✓
            </div>
            <p className="text-sm font-medium text-[#101216]">Check your inbox</p>
            <p className="text-xs text-[#676D78]">
              We sent a sign-in link to <strong className="text-[#101216]">{email}</strong>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#101216] uppercase tracking-wider mb-1.5">
                Work Email
              </label>
              <input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-11 px-3.5 bg-white border border-[#B2B8C2] rounded-lg text-sm text-[#101216] placeholder:text-[#676D78] focus:outline-none focus:border-[#0A0B0E] transition-colors"
              />
            </div>

            <div className="pt-2">
              <CTAButton
                variant="accent"
                className="w-full justify-center h-12"
                onClick={() => {}}
              >
                Send Magic Link
              </CTAButton>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
