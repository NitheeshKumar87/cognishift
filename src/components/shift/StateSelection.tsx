'use client';

import React from 'react';
import { CurrentState } from '@/types/activity';

interface StateSelectionProps {
  selectedState?: CurrentState;
  onSelect: (state: CurrentState) => void;
  onContinue: () => void;
  onBack: () => void;
}

const STATE_OPTIONS: { id: CurrentState; label: string; icon: string; desc: string }[] = [
  { id: 'bored', label: 'Bored', icon: '🥱', desc: 'Seeking engaging, constructive stimulus.' },
  { id: 'restless', label: 'Restless', icon: '⚡', desc: 'Feeling fidgety or needing physical movement.' },
  { id: 'mentally_tired', label: 'Mentally Tired', icon: '🧠', desc: 'Brain feels heavy after sustained task focus.' },
  { id: 'overwhelmed', label: 'Overwhelmed', icon: '🌊', desc: 'Too many competing inputs demanding attention.' },
  { id: 'low_energy', label: 'Low Energy', icon: '🔋', desc: 'Feeling sluggish or needing a gentle pulse reset.' },
];

export default function StateSelection({
  selectedState,
  onSelect,
  onContinue,
  onBack,
}: StateSelectionProps) {
  return (
    <div className="max-w-2xl w-full mx-auto my-auto p-6 md:p-8 glass-card rounded-3xl flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          Step 2 of 3
        </span>
        <button
          onClick={onBack}
          className="text-xs text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
        >
          Back to Time
        </button>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl md:text-3xl font-extrabold text-white">
          How are you feeling right now?
        </h2>
        <p className="text-sm text-slate-400">
          Acknowledge your current state without judgment. This helps recommend an activity that fits your momentum.
        </p>
      </div>

      {/* Selectable Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-2">
        {STATE_OPTIONS.map((opt) => {
          const isSelected = selectedState === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onSelect(opt.id)}
              className={`p-4 rounded-2xl text-left border transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-400/50 ${
                isSelected
                  ? 'bg-emerald-500/15 border-emerald-400 text-white shadow-lg shadow-emerald-500/10'
                  : 'bg-slate-800/40 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
              }`}
            >
              <div className="flex items-center justify-between font-bold text-base mb-1">
                <span className="flex items-center gap-2">
                  <span>{opt.icon}</span>
                  <span>{opt.label}</span>
                </span>
                {isSelected && (
                  <span className="w-5 h-5 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center text-xs font-bold">
                    ✓
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{opt.desc}</p>
            </button>
          );
        })}
      </div>

      {/* Footer Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-800">
        <button
          onClick={onBack}
          className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          Back
        </button>
        <button
          disabled={!selectedState}
          onClick={onContinue}
          className={`px-7 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
            selectedState
              ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
