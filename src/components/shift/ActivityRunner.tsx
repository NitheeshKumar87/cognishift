'use client';

import React from 'react';
import { Activity } from '@/types/activity';
import BoxBreathing from '../activities/BoxBreathing';
import GuidedStepRunner from '../activities/GuidedStepRunner';
import TimedActivityRunner from '../activities/TimedActivityRunner';
import WritingPromptRunner from '../activities/WritingPromptRunner';
import GuidedReflectionRunner from '../activities/GuidedReflectionRunner';

interface ActivityRunnerProps {
  activity: Activity;
  onComplete: () => void;
  onExit: () => void;
}

export default function ActivityRunner({
  activity,
  onComplete,
  onExit,
}: ActivityRunnerProps) {
  // 1. Custom Interactive Component (by ID or interactive type)
  if (activity.id === 'box-breathing' || activity.experience_type === 'interactive') {
    return <BoxBreathing onComplete={onComplete} onExit={onExit} />;
  }

  // 2. Dispatch by Experience Type
  switch (activity.experience_type) {
    case 'guided-steps':
      return (
        <GuidedStepRunner
          activity={activity}
          onComplete={onComplete}
          onExit={onExit}
        />
      );

    case 'timed':
      return (
        <TimedActivityRunner
          activity={activity}
          onComplete={onComplete}
          onExit={onExit}
        />
      );

    case 'writing-prompt':
      return (
        <WritingPromptRunner
          activity={activity}
          onComplete={onComplete}
          onExit={onExit}
        />
      );

    case 'guided-reflection':
      return (
        <GuidedReflectionRunner
          activity={activity}
          onComplete={onComplete}
          onExit={onExit}
        />
      );

    default:
      return (
        <GuidedStepRunner
          activity={activity}
          onComplete={onComplete}
          onExit={onExit}
        />
      );
  }
}
