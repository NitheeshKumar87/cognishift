'use client';

import React, { useState } from 'react';

interface CompletionProps {
  onRestart: () => void;
  onHome: () => void;
}

const MOOD_AFTER_OPTIONS = [
  { label: 'Refreshed', icon: '🌱' },
  { label: 'Calmer', icon: '🌊' },
  { label: 'Focused', icon: '🎯' },
  { label: 'Energized', icon: '⚡' },
  { label: 'Same as before', icon: '😐' },
];

export default function Completion({ onRestart, onHome }: CompletionProps) {
  const [selectedMood, setSelectedMood] = useState<string | undefined>();
  const [insight, setInsight] = useState<string>('');

  return (
    <div className="max-w-2xl w-full mx-auto my-auto p-6 md:p-8 glass-card rounded-3xl flex flex-col gap-6 text-center">
      {/* Celebration Icon */}
      <div className="mx-auto w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-3xl text-emerald-400 shadow-lg shadow-emerald-500/20">
        ✓
      </div>

      <div className="space-y-2">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white">Shift Complete</h2>
        <p className="text-sm text-slate-400">
          You successfully paused and took an intentional break.
        </p>
      </div>

      {/* Optional Post-Mood Selection */}
      <div className="space-y-3 text-left my-2 bg-slate-900/40 p-4 md:p-5 rounded-2xl border border-slate-800">
        <label className="text-sm font-semibold text-slate-200 block">
          How do you feel now? <span className="text-xs font-normal text-slate-400">(Optional)</span>
        </label>

        <div className="flex flex-wrap gap-2">
          {MOOD_AFTER_OPTIONS.map((opt) => {
            const isSelected = selectedMood === opt.label;
            return (
              <button
                key={opt.label}
                type="button"
                onClick={() => setSelectedMood(opt.label)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                    : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <span className="mr-1.5">{opt.icon}</span>
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Optional Insight Input */}
      <div className="space-y-2 text-left bg-slate-900/40 p-4 md:p-5 rounded-2xl border border-slate-800">
        <label htmlFor="insight" className="text-sm font-semibold text-slate-200 block">
          Anything you noticed? <span className="text-xs font-normal text-slate-400">(Optional)</span>
        </label>
        <textarea
          id="insight"
          rows={2}
          value={insight}
          onChange={(e) => setInsight(e.target.value)}
          placeholder="Briefly note any thoughts, tightness released, or calm restored..."
          className="w-full p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-amber-400/60 transition-all resize-none"
        />
      </div>

      {/* Explanatory Note */}
      <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 text-xs text-slate-400 flex items-center justify-between">
        <span>💡 Sign in later to save your shift history and personal insights.</span>
        <button
          disabled
          className="text-xs px-3 py-1 rounded-lg bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed opacity-60"
        >
          Sign In (Coming Soon)
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <button
          onClick={onRestart}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
        >
          Try Another Shift
        </button>
        <button
          onClick={onHome}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-sm border border-slate-700 transition-all cursor-pointer"
        >
          Return Home
        </button>
      </div>
    </div>
  );
}
