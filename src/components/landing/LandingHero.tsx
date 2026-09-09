'use client';

import React from 'react';

interface LandingHeroProps {
  onStartShift: () => void;
}

export default function LandingHero({ onStartShift }: LandingHeroProps) {
  return (
    <main className="min-h-screen bg-[#0F172A] text-slate-100 flex flex-col justify-between p-6 md:p-12 font-sans">
      {/* Navbar */}
      <header className="max-w-6xl w-full mx-auto flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-emerald-400 flex items-center justify-center font-bold text-slate-950 text-xl shadow-lg shadow-amber-500/20">
            C
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-100">
            Cogni<span className="text-amber-400">Shift</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700 font-medium">
            Public Try Mode
          </span>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-3xl w-full mx-auto text-center my-auto py-16 flex flex-col items-center gap-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-amber-300 text-sm font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Mindful Micro-Break Companion
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-white">
          Interrupt passive browsing. <br />
          <span className="bg-gradient-to-r from-amber-400 via-emerald-400 to-indigo-400 bg-clip-text text-transparent">
            Shift into intention.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-400 max-w-xl leading-relaxed">
          Shift away from endless feeds into 2, 5, 10, or 20-minute intentional activities designed to refresh your focus and energy.
        </p>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto">
          <button
            onClick={onStartShift}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-lg shadow-xl shadow-amber-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            Take a Shift
          </button>
        </div>

        {/* Feature Grid Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-12 text-left">
          <div className="glass-card p-5 rounded-2xl">
            <div className="text-amber-400 font-semibold mb-1">⏱️ Standard Time Slots</div>
            <p className="text-xs text-slate-400 leading-normal">
              Tailored 2, 5, 10, or 20-minute activities that fit right into your break.
            </p>
          </div>
          <div className="glass-card p-5 rounded-2xl">
            <div className="text-emerald-400 font-semibold mb-1">🧘 Guided Mind & Body</div>
            <p className="text-xs text-slate-400 leading-normal">
              Box breathing, desk stretches, and simple focus resets.
            </p>
          </div>
          <div className="glass-card p-5 rounded-2xl">
            <div className="text-indigo-400 font-semibold mb-1">💭 Personal Reflection</div>
            <p className="text-xs text-slate-400 leading-normal">
              Neutral reflection prompts to stay conscious of your screen time.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-6xl w-full mx-auto text-center py-6 text-xs text-slate-500 border-t border-slate-800">
        CogniShift Digital Wellbeing &bull; Built with Next.js & Tailwind CSS
      </footer>
    </main>
  );
}
