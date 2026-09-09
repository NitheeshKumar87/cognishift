# CogniShift - System Architecture Document

**Version:** 2.0.0  
**Date:** September 9, 2026

---

## 1. Architecture Overview

CogniShift is structured as a modern full-stack web application designed for high developer productivity, type safety, and low operational complexity.

```text
+-------------------------------------------------------------------------+
|                          Next.js App Router                             |
|          (React / TypeScript / Tailwind CSS Client & Server)           |
+-------------------------------------------------------------------------+
       |                                                 |
       | Client / Server SDK                             | Direct SQL / RLS
       v                                                 v
+-------------------------------------------------------------------------+
|                               Supabase                                  |
|   +-------------------+  +-------------------+  +-------------------+   |
|   |   Supabase Auth   |  |   PostgreSQL DB   |  | Row Level Security|   |
|   +-------------------+  +-------------------+  +-------------------+   |
+-------------------------------------------------------------------------+
```

### Core Technology Stack
- **Framework**: Next.js (App Router, Server & Client Components)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database & Auth**: Supabase (Managed PostgreSQL + Supabase Auth + RLS)
- **Deployment Target**: Vercel / Static Edge Hosting

---

## 2. Authentication & Access Strategy

- **Public Experience**: Unauthenticated visitors can use the application and try activities directly. Public activity states are purely transient (held in React state during active use) and are not saved to the database.
- **No Guest Data Migration**: Public Try Mode does not implement anonymous authentication, guest-to-permanent account conversion, or `sessionStorage` data migration in the MVP.
- **Authenticated Experience**: Signing in via Supabase Auth (Magic Link or OAuth) unlocks persistent data logging for `scroll_reflections`, `shift_sessions`, `session_reflections`, and personal insight history.

---

## 3. Data Flow & Recommendation Architecture

### 3.1 Shift Flow Sequence
1. **Trigger / Entry**: User initiates a shift manually or via active tab-only soft-nudges (strictly confined to the open web app tab; no OS/browser extension/push notifications).
2. **Scroll Reflection**: User inputs context (e.g., passive browsing, lost track of time, wanted a break) and current mood.
3. **Time Selection**: User selects available time from standardized options: **2 minutes**, **5 minutes**, **10 minutes**, or **20 minutes**. Activities must fit within the chosen window.
4. **Deterministic Recommendation Engine**: Implemented in TypeScript (`lib/recommendation.ts`) using a 4-tier fallback hierarchy:
   - **Tier 1: Exact Match** — Matches `supported_moods`, `supported_intentions`, and fits within duration.
   - **Tier 2: Partial Match** — Matches either mood OR intention while fitting within duration.
   - **Tier 3: Compatible Activities** — Any activity in the catalog fitting within the selected time window.
   - **Tier 4: Universal Fallback** — Default foundational instruction activity.
5. **Activity Execution**:
   - The majority of MVP activities are **instruction-based** text/structured guides.
   - Only 1–2 activities (e.g., Box Breathing) use custom interactive React components.
   - Component rendering is governed by an **Activity Registry** with a safe fallback for unknown activity IDs.
6. **Session Execution & Status**: `shift_sessions` tracks status (`in_progress`, `completed`, `abandoned`). No complex tab-close detection is implemented in MVP.
7. **Post-Session Reflection**: Post-activity rating, mood check, and personal insights.
8. **Persistence**: For authenticated users, `scroll_reflections`, `shift_sessions`, and `session_reflections` are saved as independent records in PostgreSQL via RLS policies.

---

## 4. Activity Registry Design

To safely map database `activities.id` strings to React components:

```typescript
// Conceptual mapping pattern in TypeScript
const activityRegistry: Record<string, React.ComponentType<ActivityProps>> = {
  'box-breathing': BoxBreathingComponent, // Custom interactive component
  // Most activities default to InstructionActivityComponent
};

// Safe lookup with universal fallback
export function getAvailableActivityComponent(activityId: string) {
  return activityRegistry[activityId] || InstructionActivityFallbackComponent;
}
```

---

## 5. Security & Data Isolation (RLS)

All database access is protected by PostgreSQL Row Level Security (RLS):
- `activities`: Public read access (`SELECT`) for all users (including unauthenticated).
- `profiles`: Users can read and update only their own profile record (`auth.uid() = id`).
- `scroll_reflections`, `shift_sessions`, `session_reflections`: Independent entities where authenticated users can `SELECT`, `INSERT`, and `UPDATE` only records matching `user_id = auth.uid()`.

---

## 6. Directory Blueprint

```text
src/
├── app/
│   ├── (auth)/             # Login, signup, auth callbacks
│   ├── dashboard/          # Authenticated insight & session history views
│   ├── shift/              # Interactive shift flow (reflection -> activity -> post-reflection)
│   ├── layout.tsx          # Root layout with providers & nav
│   └── page.tsx            # Public landing & quick-try entry
├── components/
│   ├── activities/         # Activity Registry & components (InstructionFallback, BoxBreathing)
│   ├── reflection/         # Reflection form steps
│   └── ui/                 # Core design system components (buttons, cards, badges)
├── lib/
│   ├── supabase/           # Browser & server Supabase client initializers
│   └── recommendation.ts   # 4-tier TypeScript recommendation engine
└── types/
    └── database.types.ts   # Supabase DB schema definitions
```
