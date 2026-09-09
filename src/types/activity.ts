export type Category = 'mind' | 'body' | 'creative' | 'reflection';

export type AvailableTime = 2 | 5 | 10 | 20;

export type CurrentState = 
  | 'bored'
  | 'restless'
  | 'mentally_tired'
  | 'overwhelmed'
  | 'low_energy';

export type Intention = 
  | 'reset'
  | 'move'
  | 'focus'
  | 'create'
  | 'reflect';

export type ExperienceType = 
  | 'interactive'
  | 'guided-steps'
  | 'timed'
  | 'writing-prompt'
  | 'guided-reflection';

export interface Activity {
  id: string;
  title: string;
  description: string;
  category: Category;
  duration_minutes: AvailableTime;
  supported_moods: CurrentState[];
  supported_intentions: Intention[];
  why_it_helps: string;
  experience_type: ExperienceType;
  instructions?: string[];
  prompt_question?: string;
  reflection_questions?: string[];
  is_interactive?: boolean;
}

export type ShiftStep = 
  | 'landing'
  | 'time'
  | 'state'
  | 'intention'
  | 'recommendations'
  | 'activity'
  | 'completion';

export interface ShiftState {
  step: ShiftStep;
  selectedTime?: AvailableTime;
  selectedState?: CurrentState;
  selectedIntention?: Intention;
  selectedActivity?: Activity;
  completedMood?: string;
  reflectionInsight?: string;
}
