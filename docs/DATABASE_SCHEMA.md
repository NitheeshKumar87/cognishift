# CogniShift - Database Schema & Entity Documentation

**Version:** 2.0.0  
**Database System:** PostgreSQL (Supabase Managed)

---

## 1. Entity Overview & Relationships

```
+----------------+       +---------------------+       +----------------------+
|    profiles    |       |  scroll_reflections |       |    shift_sessions    |
+----------------+       +---------------------+       +----------------------+
  ^         ^                       ^                       ^            |
  |         |                       |                       |            v
  |         +-----------------------+                       |   +----------------------+
  |                                                         |   |  session_reflections |
  +---------------------------------------------------------+   +----------------------+
                                                                           |
                                                                           v
                                                                +----------------------+
                                                                |      activities      |
                                                                +----------------------+
```

### Key Architectural Rule: Independent Entities
`scroll_reflections` and `shift_sessions` are strictly independent entities. There is **no foreign key** (`session_id`) linking `scroll_reflections` to `shift_sessions`. This allows users to capture scroll reflections independently of starting or completing a session.

---

## 2. Table Specifications & DDL

### 2.1 `profiles`
Stores extended user profile information linked to Supabase authentication (`auth.users`).

```sql
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  display_name TEXT,
  theme_preference TEXT DEFAULT 'dark'
);
```

### 2.2 `activities`
Read-only catalog of activities available in the application.

```sql
CREATE TABLE public.activities (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content_markdown TEXT,                              -- Structured instructions for instruction-based activities
  category TEXT NOT NULL,                            -- 'mind', 'body', 'creative', 'reflection'
  duration_minutes INTEGER NOT NULL DEFAULT 2,       -- Standardized durations: 2, 5, 10, or 20 minutes
  supported_moods TEXT[] NOT NULL DEFAULT '{}',       -- e.g. {'fatigued', 'anxious', 'bored', 'restless'}
  supported_intentions TEXT[] NOT NULL DEFAULT '{}',  -- e.g. {'energize', 'calm', 'refocus', 'physical_reset'}
  is_interactive BOOLEAN NOT NULL DEFAULT false,      -- true for custom React interactive activities (e.g. Box Breathing)
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT valid_duration CHECK (duration_minutes IN (2, 5, 10, 20))
);
```

### 2.3 `shift_sessions`
Core transaction table recording an initiated or completed shift.

```sql
CREATE TABLE public.shift_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  activity_id TEXT NOT NULL REFERENCES public.activities(id) ON DELETE RESTRICT,
  started_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  completed_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'in_progress', -- Valid values: 'in_progress', 'completed', 'abandoned'
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT valid_status CHECK (status IN ('in_progress', 'completed', 'abandoned'))
);
```

### 2.4 `scroll_reflections`
Independent entity capturing initial context prior to starting a shift. Has **no dependency** on `shift_sessions`.

```sql
CREATE TABLE public.scroll_reflections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  reason TEXT NOT NULL, -- 'passive_browsing', 'scrolling', 'lost_track_of_time', 'wanted_a_break'
  initial_mood TEXT NOT NULL,
  initial_energy INTEGER CHECK (initial_energy BETWEEN 1 AND 5),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);
```

### 2.5 `session_reflections`
Captures reflections, post-activity mood shifts, and personal insights linked to a completed `shift_session`.

```sql
CREATE TABLE public.session_reflections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  session_id UUID NOT NULL REFERENCES public.shift_sessions(id) ON DELETE CASCADE,
  post_mood TEXT NOT NULL,
  post_energy INTEGER CHECK (post_energy BETWEEN 1 AND 5),
  personal_insight TEXT,
  clarity_rating INTEGER CHECK (clarity_rating BETWEEN 1 AND 5),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);
```

---

## 3. Row Level Security (RLS) Policies

```sql
-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shift_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scroll_reflections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.session_reflections ENABLE ROW LEVEL SECURITY;

-- Activities Policies (Public Read Access)
CREATE POLICY "Activities are viewable by everyone" 
  ON public.activities FOR SELECT USING (true);

-- Profiles Policies
CREATE POLICY "Users can view own profile" 
  ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" 
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Shift Sessions Policies
CREATE POLICY "Users can view own shift sessions" 
  ON public.shift_sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own shift sessions" 
  ON public.shift_sessions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own shift sessions" 
  ON public.shift_sessions FOR UPDATE USING (auth.uid() = user_id);

-- Scroll Reflections Policies (Independent Entity)
CREATE POLICY "Users can view own scroll reflections" 
  ON public.scroll_reflections FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own scroll reflections" 
  ON public.scroll_reflections FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Session Reflections Policies
CREATE POLICY "Users can view own session reflections" 
  ON public.session_reflections FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own session reflections" 
  ON public.session_reflections FOR INSERT WITH CHECK (auth.uid() = user_id);
```
