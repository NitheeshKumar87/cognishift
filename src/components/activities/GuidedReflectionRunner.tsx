'use client';

import React, { useState } from 'react';
import { Activity } from '@/types/activity';

interface GuidedReflectionRunnerProps {
  activity: Activity;
  onComplete: () => void;
  onExit: () => void;
}

export default function GuidedReflectionRunner({
  activity,
  onComplete,
  onExit,
}: GuidedReflectionRunnerProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const questions = activity.reflection_questions || [
    'What is one physical sensation you notice right now?',
    'What is one thought you can set aside for the rest of today?',
  ];

  const totalQuestions = questions.length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  const currentAnswer = answers[currentQuestionIndex] || '';

  const handleAnswerChange = (val: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestionIndex]: val }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      onComplete();
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="max-w-2xl w-full mx-auto my-auto p-6 md:p-8 glass-card rounded-3xl flex flex-col justify-between min-h-[480px]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 font-semibold uppercase tracking-wider">
            {activity.category} &bull; Guided Reflection
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

      {/* Progress Line */}
      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden my-4">
        <div
          className="bg-gradient-to-r from-purple-400 to-indigo-400 h-full transition-all duration-300 ease-out"
          style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
        />
      </div>

      {/* Main Question & Answer */}
      <div className="my-auto py-4 space-y-4">
        <div className="text-xs font-semibold text-purple-400 tracking-wider uppercase">
          Reflection Question {currentQuestionIndex + 1} of {totalQuestions}
        </div>

        <h3 className="text-lg md:text-xl font-semibold text-purple-200 leading-relaxed">
          {questions[currentQuestionIndex]}
        </h3>

        <textarea
          rows={3}
          value={currentAnswer}
          onChange={(e) => handleAnswerChange(e.target.value)}
          placeholder="Reflect gently... (Optional)"
          className="w-full p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-purple-400/60 transition-all resize-none"
        />

        <div className="text-xs text-slate-400 bg-slate-900/50 p-3 rounded-xl border border-slate-800">
          💡 <strong className="text-slate-300">Why it helps:</strong> {activity.why_it_helps}
        </div>
      </div>

      {/* Footer Controls */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-800">
        <button
          onClick={handlePrev}
          disabled={currentQuestionIndex === 0}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
            currentQuestionIndex === 0
              ? 'text-slate-600 cursor-not-allowed'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Previous Question
        </button>

        <button
          onClick={handleNext}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-purple-500/20 transition-all cursor-pointer"
        >
          {isLastQuestion ? 'Complete Shift ✓' : 'Next Question →'}
        </button>
      </div>
    </div>
  );
}
