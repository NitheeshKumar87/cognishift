'use client';

import React from 'react';
import { Intention } from '@/types/activity';

interface IntentionSelectionProps {
  selectedIntention?: Intention;
  onSelect: (intention: Intention) => void;
  onContinue: () => void;
  onSkip: () => void;
  onBack: () => void;
}

const INTENTION_OPTIONS: { id: Intention; label: string; icon: string; desc: string }[] = [
  { id: 'reset', label: 'Reset', icon: '🌀', desc: 'Clear mental RAM and feel grounded.' },
  { id: 'move', label: 'Move', icon: '🚶', desc: 'Engage physical movement and stretch.' },
  { id: 'focus', label: 'Focus', icon: '🎯', desc: 'Restore sharp concentration for your next task.' },
  { id: 'create', label: 'Create', icon: '🎨', desc: 'Spark open curiosity or creative thought.' },
  { id: 'reflect', label: 'Reflect', icon: '🪞', desc: 'Pause and process your thoughts gently.' },
];

export default function IntentionSelection({
  selectedIntention,
  onSelect,
  onContinue,
  onSkip,
  onBack,
}: IntentionSelectionProps) {
  return (
    <div className="max-w-2xl w-full mx-auto my-auto p-6 md:p-8 glass-card rounded-3xl flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          Step 3 of 3 (Optional)
        </span>
        <button
          onClick={onSkip}
          className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
        >
          Skip this step &rarr;
        </button>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl md:text-3xl font-extrabold text-white">
          What would help right now?
        </h2>
        <p className="text-sm text-slate-400">
          Choose an outcome you would like to cultivate during this break, or skip to see immediate recommendations.
        </p>
      </div>

      {/* Selectable Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-2">
        {INTENTION_OPTIONS.map((opt) => {
          const isSelected = selectedIntention === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onSelect(opt.id)}
              className={`p-4 rounded-2xl text-left border transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-400/50 ${
                isSelected
                  ? 'bg-indigo-500/15 border-indigo-400 text-white shadow-lg shadow-indigo-500/10'
                  : 'bg-slate-800/40 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
              }`}
            >
              <div className="flex items-center justify-between font-bold text-base mb-1">
                <span className="flex items-center gap-2">
                  <span>{opt.icon}</span>
                  <span>{opt.label}</span>
                </span>
                {isSelected && (
                  <span className="w-5 h-5 rounded-full bg-indigo-400 text-slate-950 flex items-center justify-center text-xs font-bold">
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

        <div className="flex items-center gap-3">
          <button
            onClick={onSkip}
            className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            Skip
          </button>
          <button
            onClick={onContinue}
            className="px-7 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-400 hover:to-indigo-500 text-white shadow-lg shadow-indigo-500/20 transition-all cursor-pointer"
          >
            See Recommendations
          </button>
        </div>
      </div>
    </div>
  );
}
