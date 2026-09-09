'use client';

import React, { useState } from 'react';
import {
  Activity,
  AvailableTime,
  CurrentState,
  Intention,
  ShiftStep,
} from '@/types/activity';
import { getRecommendations } from '@/lib/recommendation';
import LandingHero from '@/components/landing/LandingHero';
import TimeSelection from '@/components/shift/TimeSelection';
import StateSelection from '@/components/shift/StateSelection';
import IntentionSelection from '@/components/shift/IntentionSelection';
import Recommendations from '@/components/shift/Recommendations';
import ActivityRunner from '@/components/shift/ActivityRunner';
import Completion from '@/components/shift/Completion';

export default function Home() {
  const [step, setStep] = useState<ShiftStep>('landing');
  const [selectedTime, setSelectedTime] = useState<AvailableTime | undefined>();
  const [selectedState, setSelectedState] = useState<CurrentState | undefined>();
  const [selectedIntention, setSelectedIntention] = useState<Intention | undefined>();
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>();

  const handleStartShift = () => {
    setStep('time');
  };

  const handleResetShift = () => {
    setSelectedTime(undefined);
    setSelectedState(undefined);
    setSelectedIntention(undefined);
    setSelectedActivity(undefined);
    setStep('time');
  };

  const handleReturnHome = () => {
    setSelectedTime(undefined);
    setSelectedState(undefined);
    setSelectedIntention(undefined);
    setSelectedActivity(undefined);
    setStep('landing');
  };

  // Get recommendations based on current selections
  const recommendations = selectedTime
    ? getRecommendations(selectedTime, selectedState, selectedIntention)
    : [];

  return (
    <main className="min-h-screen bg-[#0F172A] text-slate-100 flex flex-col justify-between p-4 md:p-8 font-sans">
      {step === 'landing' && <LandingHero onStartShift={handleStartShift} />}

      {step === 'time' && (
        <TimeSelection
          selectedTime={selectedTime}
          onSelect={setSelectedTime}
          onContinue={() => setStep('state')}
          onBack={handleReturnHome}
        />
      )}

      {step === 'state' && (
        <StateSelection
          selectedState={selectedState}
          onSelect={setSelectedState}
          onContinue={() => setStep('intention')}
          onBack={() => setStep('time')}
        />
      )}

      {step === 'intention' && (
        <IntentionSelection
          selectedIntention={selectedIntention}
          onSelect={setSelectedIntention}
          onContinue={() => setStep('recommendations')}
          onSkip={() => setStep('recommendations')}
          onBack={() => setStep('state')}
        />
      )}

      {step === 'recommendations' && (
        <Recommendations
          recommendations={recommendations}
          onSelectActivity={(act) => {
            setSelectedActivity(act);
            setStep('activity');
          }}
          onBack={() => setStep('intention')}
        />
      )}

      {step === 'activity' && selectedActivity && (
        <ActivityRunner
          activity={selectedActivity}
          onComplete={() => setStep('completion')}
          onExit={() => setStep('recommendations')}
        />
      )}

      {step === 'completion' && (
        <Completion onRestart={handleResetShift} onHome={handleReturnHome} />
      )}
    </main>
  );
}
