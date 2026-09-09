# CogniShift - Development Plan

**Version:** 2.0.0  
**Date:** September 9, 2026

---

## Development Milestones

### Phase 1: Project Foundation & Database Setup
- Initialize Next.js project with TypeScript, Tailwind CSS, and App Router.
- Set up Supabase project and execute database migrations (`profiles`, `activities`, `shift_sessions`, `scroll_reflections`, `session_reflections`).
- Ensure `scroll_reflections` is created as an independent entity (no `session_id` foreign key).
- Configure Row Level Security (RLS) policies for all 5 entities.
- Seed activity catalog supporting 2, 5, 10, and 20-minute durations.

### Phase 2: Design System, Activity Registry & Public Try Mode
- Establish Tailwind theme tokens (slate dark base, orange-coral highlight, mint green, glassmorphism cards).
- Build layout shell (navbar, footer, responsive containers).
- Implement **Activity Registry** with safe fallback for unmapped activity IDs.
- Build initial activity runner:
  - 1 interactive React component (Box Breathing).
  - Instruction-based activity layout component for text/markdown-driven activities.
- Implement Public Try Mode: allow unauthenticated visitors to try activities without guest persistence, anonymous auth, or `sessionStorage` migration.

### Phase 3: Authentication & Shift Persistence
- Integrate Supabase Auth (Magic Link & OAuth).
- Build auth state provider and protected route wrappers.
- Implement the complete authenticated Shift Flow:
  1. Scroll Reflection form (reasons: passive browsing, scrolling, lost track of time, wanted a break).
  2. Time Selection (2, 5, 10, or 20 minutes).
  3. Activity Execution (tracking `shift_sessions` status: `in_progress`, `completed`, `abandoned`).
  4. Post-Activity Reflection form (mood check, personal insights).
  5. Write independent records to `scroll_reflections`, `shift_sessions`, and `session_reflections`.

### Phase 4: Deterministic Recommendation Engine & Dashboard
- Implement 4-tier recommendation hierarchy in `lib/recommendation.ts`:
  1. *Exact match* (Mood, Intention, Time)
  2. *Partial match* (Mood OR Intention within Time)
  3. *Compatible activities* (Fits within Time window)
  4. *Universal fallback*
- Build active tab-only soft-nudge component (strictly inside the open web tab; no OS/browser extension/push notifications).
- Build `dashboard/` page:
  - Timeline of past shifts and personal insights.
  - Independent scroll reflections history view.

### Phase 5: Quality Assurance & Polish
- RLS Security Audit: Verify unauthenticated users cannot read/write private reflections or shift sessions.
- Verify safe fallback handling in Activity Registry for unknown activity IDs.
- Responsive UX testing across mobile and desktop breakpoints.
- Accessibility audit (keyboard navigation, ARIA labels for timers).
