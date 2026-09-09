'use client';

import React, { useState, useEffect } from 'react';
import { Activity } from '@/types/activity';

interface TimedActivityRunnerProps {
  activity: Activity;
  onComplete: () => void;
  onExit: () => void;
}

export default function TimedActivityRunner({
  activity,
  onComplete,
  onExit,
}: TimedActivityRunnerProps) {
  const totalSeconds = activity.duration_minutes * 60;
  const [secondsRemaining, setSecondsRemaining] = useState<number>(totalSeconds);
  const [isRunning, setIsRunning] = useState<boolean>(true);

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = ((totalSeconds - secondsRemaining) / totalSeconds) * 100;
  const isFinished = secondsRemaining === 0;

  return (
    <div className="max-w-2xl w-full mx-auto my-auto p-6 md:p-8 glass-card rounded-3xl flex flex-col justify-between min-h-[480px]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold uppercase tracking-wider">
            {activity.category} &bull; Timed Session ({activity.duration_minutes}m)
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

      {/* Main Countdown Timer Display */}
      <div className="my-auto py-6 flex flex-col items-center justify-center text-center">
        <div className="w-52 h-52 rounded-full border-4 border-amber-400/40 bg-amber-500/10 flex flex-col items-center justify-center shadow-2xl shadow-amber-500/20 my-4">
          <span className="text-5xl font-mono font-extrabold text-white tracking-tight">
            {formatTime(secondsRemaining)}
          </span>
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest mt-2">
            {isFinished ? 'Time Complete' : isRunning ? 'In Progress' : 'Paused'}
          </span>
        </div>

        {/* Progress Line */}
        <div className="w-full max-w-md bg-slate-800 h-2 rounded-full overflow-hidden my-4">
          <div
            className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full transition-all duration-1000 ease-linear"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Instructions */}
        <div className="max-w-md space-y-2 text-center mt-2">
          {activity.instructions?.map((inst, idx) => (
            <p key={idx} className="text-sm text-slate-300">
              &bull; {inst}
            </p>
          ))}
        </div>

        <div className="mt-4 text-xs text-slate-400 bg-slate-900/50 p-3 rounded-xl border border-slate-800 max-w-md">
          💡 <strong className="text-slate-300">Why it helps:</strong> {activity.why_it_helps}
        </div>
      </div>

      {/* Footer Controls */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-800">
        <button
          onClick={() => setIsRunning(!isRunning)}
          disabled={isFinished}
          className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
            isFinished
              ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
          }`}
        >
          {isRunning ? 'Pause Timer' : 'Resume Timer'}
        </button>

        <button
          onClick={onComplete}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
        >
          Complete Shift ✓
        </button>
      </div>
    </div>
  );
}
