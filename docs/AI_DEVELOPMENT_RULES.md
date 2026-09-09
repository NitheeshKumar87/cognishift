# CogniShift - AI Development Rules & Collaboration Guidelines

**Version:** 2.0.0  
**Date:** September 9, 2026

---

## 1. Core Principles & Boundaries

1. **No Unapproved Scope Expansion**:
   - Do not introduce streak-based gamification, point systems, or complex AI/ML models.
   - Do not add push notifications, background tracking, browser extensions, or OS-level integrations. All nudges must remain strictly inside the active CogniShift web app tab.
2. **Neutral Language Enforcement**: Always use respectful, neutral product language. Do not use negative terms like "doomscrolling" or "addiction". Use neutral concepts: *scrolling*, *passive browsing*, *lost track of time*, *wanted a break*.
3. **Public Try Mode Constraints**:
   - Unauthenticated users can try activities without mandatory login modals or paywalls.
   - Do **not** implement anonymous authentication, guest-to-permanent account conversion, or `sessionStorage` data migration in the MVP.
   - Persistent history and insights are strictly for authenticated users.

---

## 2. Recommendation Engine Rules

1. **TypeScript-First Ranking**: Implement ranking logic in TypeScript (`lib/recommendation.ts`), **not** via complex SQL queries.
2. **Strict 4-Tier Fallback Hierarchy**:
   1. *Exact match* (Mood, Intention, Time)
   2. *Partial match* (Mood OR Intention within Time)
   3. *Compatible activities* (Fits within Time window)
   4. *Universal fallback*
3. **Standardized Durations**: Time selection options must strictly be **2 minutes**, **5 minutes**, **10 minutes**, or **20 minutes**. Activities must fit within the selected duration.

---

## 3. Data & Component Architecture Rules

1. **Entity Independence**:
   - `scroll_reflections` and `shift_sessions` are strictly **independent entities**.
   - Do **not** add a `session_id` foreign key to `scroll_reflections`.
2. **Session Statuses**: `shift_sessions.status` accepts only `'in_progress'`, `'completed'`, or `'abandoned'`. Do not implement complex browser-tab-close detection logic in the MVP.
3. **Instruction-First Catalog**:
   - The MVP relies primarily on instruction-based activities (markdown/structured text).
   - Only 1–2 activities (e.g., Box Breathing) require dedicated interactive React components.
4. **Activity Registry Pattern**:
   - Use an Activity Registry map to safely resolve database `activity_id` values to React components.
   - Always provide a safe fallback component for unmapped or unknown activity IDs.
5. **Security & RLS**:
   - Never bypass PostgreSQL Row Level Security (RLS).
   - Use Supabase server client wrappers (`@supabase/ssr`) for Server Components and API routes. Never expose service role keys on the client.
