'use client';

import React, { useState } from 'react';
import { Activity } from '@/types/activity';

interface GuidedStepRunnerProps {
  activity: Activity;
  onComplete: () => void;
  onExit: () => void;
}

export default function GuidedStepRunner({
  activity,
  onComplete,
  onExit,
}: GuidedStepRunnerProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  const instructions = activity.instructions || [
    'Take a comfortable position and pause your current task.',
    'Focus gently on your breath.',
    'Complete the shift when ready.',
  ];

  const totalSteps = instructions.length;
  const isLastStep = currentStepIndex === totalSteps - 1;

  const handleNext = () => {
    if (isLastStep) {
      onComplete();
    } else {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="max-w-2xl w-full mx-auto my-auto p-6 md:p-8 glass-card rounded-3xl flex flex-col justify-between min-h-[460px]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold uppercase tracking-wider">
            {activity.category} &bull; Guided Steps
          </span>
          <h2 className="text-xl font-bold text-white mt-1">{activity.title}</h2>
        </div>
        <button
          onClick={onExit}
          className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
        >
          Exit Activity
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden my-4">
        <div
          className="bg-gradient-to-r from-emerald-400 to-amber-400 h-full transition-all duration-300 ease-out"
          style={{ width: `${((currentStepIndex + 1) / totalSteps) * 100}%` }}
        />
      </div>

      {/* Main Step Content */}
      <div className="my-auto py-6 space-y-4">
        <div className="text-xs font-semibold text-emerald-400 tracking-wider uppercase">
          Step {currentStepIndex + 1} of {totalSteps}
        </div>

        <p className="text-lg md:text-xl font-medium text-slate-100 leading-relaxed min-h-[80px] flex items-center">
          {instructions[currentStepIndex]}
        </p>

        <div className="text-xs text-slate-400 bg-slate-900/50 p-3 rounded-xl border border-slate-800">
          💡 <strong className="text-slate-300">Why it helps:</strong> {activity.why_it_helps}
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-800">
        <button
          onClick={handlePrev}
          disabled={currentStepIndex === 0}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
            currentStepIndex === 0
              ? 'text-slate-600 cursor-not-allowed'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Previous Step
        </button>

        <button
          onClick={handleNext}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
        >
          {isLastStep ? 'Complete Shift ✓' : 'Next Step →'}
        </button>
      </div>
    </div>
  );
}
