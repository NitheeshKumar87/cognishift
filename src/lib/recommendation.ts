import { Activity, AvailableTime, CurrentState, Intention } from '@/types/activity';
import { MOCK_ACTIVITIES } from './mockActivities';

export function getRecommendations(
  availableTime: AvailableTime,
  currentState?: CurrentState,
  intention?: Intention
): Activity[] {
  // Filter activities that fit within available time window
  const timeCompatible = MOCK_ACTIVITIES.filter(
    (act) => act.duration_minutes <= availableTime
  );

  if (timeCompatible.length === 0) {
    return MOCK_ACTIVITIES.slice(0, 3);
  }

  // Tier 1: Exact Match (Matches both state and intention)
  if (currentState && intention) {
    const exactMatches = timeCompatible.filter(
      (act) =>
        act.supported_moods.includes(currentState) &&
        act.supported_intentions.includes(intention)
    );
    if (exactMatches.length > 0) {
      return fillRecommendations(exactMatches, timeCompatible);
    }
  }

  // Tier 2: Partial Match (Matches state OR intention)
  const partialMatches = timeCompatible.filter((act) => {
    const matchesState = currentState ? act.supported_moods.includes(currentState) : false;
    const matchesIntention = intention ? act.supported_intentions.includes(intention) : false;
    return matchesState || matchesIntention;
  });

  if (partialMatches.length > 0) {
    return fillRecommendations(partialMatches, timeCompatible);
  }

  // Tier 3: Compatible Activities (Any activity fitting within available time)
  if (timeCompatible.length > 0) {
    return fillRecommendations(timeCompatible, MOCK_ACTIVITIES);
  }

  // Tier 4: Universal Fallback
  return MOCK_ACTIVITIES.slice(0, 3);
}

function fillRecommendations(primaryList: Activity[], fallbackPool: Activity[]): Activity[] {
  const result: Activity[] = [...primaryList];
  
  for (const item of fallbackPool) {
    if (result.length >= 3) break;
    if (!result.some((existing) => existing.id === item.id)) {
      result.push(item);
    }
  }
  
  return result.slice(0, 3);
}
