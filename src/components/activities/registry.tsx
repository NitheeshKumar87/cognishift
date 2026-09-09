import React from 'react';
import { Activity, ExperienceType } from '@/types/activity';
import BoxBreathing from './BoxBreathing';
import GuidedStepRunner from './GuidedStepRunner';
import TimedActivityRunner from './TimedActivityRunner';
import WritingPromptRunner from './WritingPromptRunner';
import GuidedReflectionRunner from './GuidedReflectionRunner';

export interface ActivityComponentProps {
  activity: Activity;
  onComplete: () => void;
  onExit: () => void;
}

export interface CustomInteractiveProps {
  onComplete: () => void;
  onExit: () => void;
}

// Interactive custom components registry mapped by activity ID
export const CUSTOM_INTERACTIVE_REGISTRY: Record<
  string,
  React.ComponentType<CustomInteractiveProps>
> = {
  'box-breathing': BoxBreathing,
};

// Experience Type runners mapping
export const EXPERIENCE_TYPE_REGISTRY: Record<
  ExperienceType,
  React.ComponentType<ActivityComponentProps>
> = {
  interactive: ({ onComplete, onExit }: ActivityComponentProps) => (
    <BoxBreathing onComplete={onComplete} onExit={onExit} />
  ),
  'guided-steps': GuidedStepRunner,
  timed: TimedActivityRunner,
  'writing-prompt': WritingPromptRunner,
  'guided-reflection': GuidedReflectionRunner,
};

export function getRunnerComponent(
  activity: Activity
): React.ComponentType<ActivityComponentProps> {
  if (CUSTOM_INTERACTIVE_REGISTRY[activity.id]) {
    const CustomComp = CUSTOM_INTERACTIVE_REGISTRY[activity.id];
    return function CustomRunner({ onComplete, onExit }: ActivityComponentProps) {
      return <CustomComp onComplete={onComplete} onExit={onExit} />;
    };
  }

  return EXPERIENCE_TYPE_REGISTRY[activity.experience_type] || GuidedStepRunner;
}
