'use client';

import React, { useState } from 'react';
import { Activity } from '@/types/activity';

interface WritingPromptRunnerProps {
  activity: Activity;
  onComplete: () => void;
  onExit: () => void;
}

export default function WritingPromptRunner({
  activity,
  onComplete,
  onExit,
}: WritingPromptRunnerProps) {
  const [textInput, setTextInput] = useState<string>('');

  const promptText =
    activity.prompt_question ||
    'Take a moment to pause and write down what is on your mind.';

  return (
    <div className="max-w-2xl w-full mx-auto my-auto p-6 md:p-8 glass-card rounded-3xl flex flex-col justify-between min-h-[480px]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-semibold uppercase tracking-wider">
            {activity.category} &bull; Writing Prompt
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

      {/* Main Content & Input */}
      <div className="my-auto py-6 space-y-4">
        <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
          <p className="text-base md:text-lg font-semibold text-indigo-200 leading-relaxed">
            {promptText}
          </p>
        </div>

        <div className="space-y-1">
          <label htmlFor="writing-input" className="text-xs text-slate-400 block font-medium">
            Your Notes / Reflection <span className="text-slate-500">(Optional &bull; Kept local)</span>
          </label>
          <textarea
            id="writing-input"
            rows={5}
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Type your response here..."
            className="w-full p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-400/60 transition-all resize-none"
          />
          <div className="text-right text-[11px] text-slate-500">
            {textInput.length} characters
          </div>
        </div>

        <div className="text-xs text-slate-400 bg-slate-900/50 p-3 rounded-xl border border-slate-800">
          💡 <strong className="text-slate-300">Why it helps:</strong> {activity.why_it_helps}
        </div>
      </div>

      {/* Footer Controls */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-800">
        <button
          onClick={onExit}
          className="px-4 py-2 rounded-xl text-sm font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          Cancel
        </button>

        <button
          onClick={onComplete}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-400 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-500/20 transition-all cursor-pointer"
        >
          Complete Shift ✓
        </button>
      </div>
    </div>
  );
}
