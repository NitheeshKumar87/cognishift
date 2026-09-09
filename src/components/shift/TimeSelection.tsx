'use client';

import React from 'react';
import { AvailableTime } from '@/types/activity';

interface TimeSelectionProps {
  selectedTime?: AvailableTime;
  onSelect: (time: AvailableTime) => void;
  onContinue: () => void;
  onBack: () => void;
}

const TIME_OPTIONS: { time: AvailableTime; label: string; desc: string }[] = [
  { time: 2, label: '2 Minutes', desc: 'A quick 120-second breathing or desk stretch reset.' },
  { time: 5, label: '5 Minutes', desc: 'Ideal for grounding, sensory awareness, or micro-journaling.' },
  { time: 10, label: '10 Minutes', desc: 'Sufficient for a physical walk or restorative stretch.' },
  { time: 20, label: '20 Minutes', desc: 'Deep cognitive pause before starting a major task.' },
];

export default function TimeSelection({
  selectedTime,
  onSelect,
  onContinue,
  onBack,
}: TimeSelectionProps) {
  return (
    <div className="max-w-2xl w-full mx-auto my-auto p-6 md:p-8 glass-card rounded-3xl flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
          Step 1 of 3
        </span>
        <button
          onClick={onBack}
          className="text-xs text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
        >
          Cancel Shift
        </button>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl md:text-3xl font-extrabold text-white">
          How much time do you have?
        </h2>
        <p className="text-sm text-slate-400">
          Select an available window for your break. Activities will be tailored to fit within this time.
        </p>
      </div>

      {/* Selectable Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-2">
        {TIME_OPTIONS.map((opt) => {
          const isSelected = selectedTime === opt.time;
          return (
            <button
              key={opt.time}
              type="button"
              onClick={() => onSelect(opt.time)}
              className={`p-4 rounded-2xl text-left border transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400/50 ${
                isSelected
                  ? 'bg-amber-500/15 border-amber-400 text-white shadow-lg shadow-amber-500/10'
                  : 'bg-slate-800/40 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
              }`}
            >
              <div className="flex items-center justify-between font-bold text-lg mb-1">
                <span>{opt.label}</span>
                {isSelected && (
                  <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center text-xs font-bold">
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
          disabled={!selectedTime}
          onClick={onContinue}
          className={`px-7 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
            selectedTime
              ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
