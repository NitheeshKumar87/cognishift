'use client';

import React, { useState, useEffect } from 'react';

interface BoxBreathingProps {
  onComplete: () => void;
  onExit: () => void;
}

type Phase = 'Inhale' | 'Hold (Full)' | 'Exhale' | 'Hold (Empty)';

const PHASES: { name: Phase; duration: number; instruction: string }[] = [
  { name: 'Inhale', duration: 4, instruction: 'Breathe in slowly through your nose...' },
  { name: 'Hold (Full)', duration: 4, instruction: 'Hold your lungs gently full...' },
  { name: 'Exhale', duration: 4, instruction: 'Release breath slowly through your mouth...' },
  { name: 'Hold (Empty)', duration: 4, instruction: 'Rest silently with lungs relaxed...' },
];

export default function BoxBreathing({ onComplete, onExit }: BoxBreathingProps) {
  const [phaseIndex, setPhaseIndex] = useState<number>(0);
  const [secondsInPhase, setSecondsInPhase] = useState<number>(4);
  const [completedCycles, setCompletedCycles] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(true);

  const currentPhase = PHASES[phaseIndex];

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setSecondsInPhase((prev) => {
        if (prev > 1) {
          return prev - 1;
        } else {
          // Move to next phase
          setPhaseIndex((prevPhase) => {
            const nextPhase = (prevPhase + 1) % PHASES.length;
            if (nextPhase === 0) {
              setCompletedCycles((c) => c + 1);
            }
            return nextPhase;
          });
          return 4;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive]);

  // Circle scaling class based on phase
  const getScaleClass = () => {
    switch (currentPhase.name) {
      case 'Inhale':
        return 'scale-125 bg-amber-400/30 border-amber-400 text-amber-300 shadow-2xl shadow-amber-500/30';
      case 'Hold (Full)':
        return 'scale-125 bg-emerald-400/30 border-emerald-400 text-emerald-300 shadow-2xl shadow-emerald-500/30';
      case 'Exhale':
        return 'scale-90 bg-indigo-400/30 border-indigo-400 text-indigo-300 shadow-2xl shadow-indigo-500/30';
      case 'Hold (Empty)':
        return 'scale-90 bg-slate-700/40 border-slate-500 text-slate-400 shadow-none';
      default:
        return 'scale-100 bg-slate-800 border-slate-600';
    }
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-[480px] w-full max-w-xl mx-auto p-6 glass-card rounded-3xl text-center">
      {/* Top Header */}
      <div className="w-full flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white">Box Breathing</h2>
          <p className="text-xs text-slate-400">2-Minute Respiration Reset</p>
        </div>
        <button
          onClick={onExit}
          className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
        >
          Exit Activity
        </button>
      </div>

      {/* Main Breathing Circle Animation */}
      <div className="my-8 flex flex-col items-center justify-center relative">
        <div
          className={`w-48 h-48 rounded-full border-4 flex flex-col items-center justify-center transition-all duration-[1000ms] ease-in-out ${getScaleClass()}`}
        >
          <span className="text-3xl font-extrabold tracking-tight">{secondsInPhase}s</span>
          <span className="text-sm font-semibold uppercase tracking-wider mt-1">
            {currentPhase.name}
          </span>
        </div>

        <p className="mt-8 text-base font-medium text-slate-200 max-w-sm">
          {currentPhase.instruction}
        </p>

        <div className="mt-4 text-xs text-slate-400">
          Completed Cycles: <span className="font-semibold text-amber-400">{completedCycles}</span>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="w-full flex items-center justify-between pt-4 border-t border-slate-800">
        <button
          onClick={() => setIsActive(!isActive)}
          className="px-4 py-2 text-sm rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-colors cursor-pointer"
        >
          {isActive ? 'Pause' : 'Resume'}
        </button>

        <button
          onClick={onComplete}
          className="px-6 py-2.5 text-sm rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
        >
          Complete Shift
        </button>
      </div>
    </div>
  );
}
