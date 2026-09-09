'use client';

import React from 'react';
import { Activity } from '@/types/activity';

interface RecommendationsProps {
  recommendations: Activity[];
  onSelectActivity: (activity: Activity) => void;
  onBack: () => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  mind: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  body: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  creative: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  reflection: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
};

export default function Recommendations({
  recommendations,
  onSelectActivity,
  onBack,
}: RecommendationsProps) {
  return (
    <div className="max-w-3xl w-full mx-auto my-auto p-6 md:p-8 glass-card rounded-3xl flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">Recommended Shifts</h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Tailored activities based on your available time and current state.
          </p>
        </div>
        <button
          onClick={onBack}
          className="text-xs text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
        >
          Change Choices
        </button>
      </div>

      {/* Activity Cards List */}
      <div className="grid grid-cols-1 gap-4 my-2">
        {recommendations.map((activity) => (
          <div
            key={activity.id}
            className="p-5 md:p-6 rounded-2xl bg-slate-800/40 border border-slate-700/60 hover:border-slate-600 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full border font-semibold uppercase tracking-wider ${
                    CATEGORY_COLORS[activity.category] || 'bg-slate-700 text-slate-300'
                  }`}
                >
                  {activity.category}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-medium">
                  ⏱️ {activity.duration_minutes} min
                </span>
                {activity.is_interactive && (
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 font-medium">
                    ⚡ Interactive
                  </span>
                )}
              </div>

              <h3 className="text-xl font-bold text-white">{activity.title}</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{activity.description}</p>
              
              <div className="text-xs text-slate-400 bg-slate-900/40 p-3 rounded-xl border border-slate-800/80">
                <strong className="text-slate-300">Why it helps:</strong> {activity.why_it_helps}
              </div>
            </div>

            <button
              onClick={() => onSelectActivity(activity)}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all transform hover:-translate-y-0.5 cursor-pointer whitespace-nowrap self-stretch sm:self-center flex items-center justify-center gap-2"
            >
              <span>Start Activity</span>
              <span>&rarr;</span>
            </button>
          </div>
        ))}
      </div>

      {/* Footer Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-800">
        <button
          onClick={onBack}
          className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          Back
        </button>
      </div>
    </div>
  );
}
