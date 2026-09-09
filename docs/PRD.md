# CogniShift - Product Requirement Document (PRD)

**Document Version:** 2.2.0  
**Status:** Approved Architecture Base  
**Date:** September 9, 2026  
**Target Repository:** `d:/cognishift`

---

## 1. Executive Summary & Product Vision

**CogniShift** is a digital wellbeing application designed to interrupt passive browsing and guide users into short, intentional, engaging activities.

Rather than relying on restrictive app blockers that trigger frustration, CogniShift uses positive behavioral nudge design—offering a seamless shift from passive scrolling, losing track of time, or wanting a break to 2, 5, 10, or 20-minute intentional activities (such as micro-mindfulness, guided physical stretches, reflection prompts, and simple focus resets).

---

## 2. Problem Statement & Core Value Proposition

### 2.1 The Problem
1. **Passive Browsing Loops**: Users frequently fall into passive scrolling on social media, video feeds, or websites during work breaks or downtime, leaving them feeling drained rather than refreshed.
2. **Aggressive Blockers Fail**: Traditional app blockers create friction and annoyance, prompting users to disable or bypass them.
3. **Lack of Low-Friction Alternatives**: When taking a quick break or after losing track of time, users lack immediate, low-effort alternatives that provide a quick cognitive reset without distraction.

### 2.2 Core Value Proposition
CogniShift transforms break time by substituting passive browsing with positive, bite-sized intentional shifts. It provides immediate, enjoyable micro-engagements that refresh mental energy, encourage personal reflection, and restore conscious control over screen time.

---

## 3. Target Audience & User Personas

### Persona A: Maya — The Remote Knowledge Worker
- **Behavior**: Opens passive browsing feeds during code compilation or between meetings, intending to take a quick break but losing track of time.
- **Needs**: Gentle, attractive interrupters that invite her to stretch, do a 2-minute breathing exercise, or reflect intentionally.

### Persona B: Sam — The Mindful Practitioner
- **Behavior**: Wants to cultivate intentional tech habits, lower screen fatigue, and reflect on their daily breaks.
- **Needs**: Personal reflection history, mood tracking, and deterministic activity recommendations tailored to current mood, intentions, and available time (2, 5, 10, or 20 minutes).

---

## 4. Core Feature Specifications

### 4.1 Pattern Interrupt & Shift Entry
- **Shift Entry Triggers**: Quick manual trigger ("Take a Shift") or active tab-only soft-nudges.
- **Tab-Bound Nudges**: All reminders/nudges are strictly confined to the active CogniShift web application tab. No browser extensions, push notifications, background tracking, or OS integrations.
- **Scroll Reflection Prompt**: Neutral reflection on current context (e.g., passive browsing, lost track of time, taking a planned break).
- **Public Try Mode**: Guests can try activities immediately without authenticating. No anonymous account conversion, guest persistence, or `sessionStorage` migration is performed. Persistent history and personal insights require signing in.

### 4.2 Deterministic Recommendation Engine
- **Time Selection**: Standardized time options of **2 minutes**, **5 minutes**, **10 minutes**, and **20 minutes**. Activities must fit within the selected duration.
- **Intentional Matching**: Matches activities based on `supported_moods` (e.g., fatigued, anxious, bored) and `supported_intentions` (e.g., energize, calm, refocus, physical reset).
- **4-Tier Fallback Hierarchy**: Implemented in TypeScript:
  1. *Exact match* (Mood, Intention, Time)
  2. *Partial match* (Mood OR Intention within Time)
  3. *Compatible activities* (Fits within Time slot)
  4. *Universal fallback* (Default instruction-based activity)

### 4.3 Activity Engine & Registry
- **Instruction-First Catalog**: MVP relies primarily on clear, well-formatted instruction-based activities (e.g., guided reflections, physical stretches, focus exercises).
- **Interactive Components**: Only 1–2 activities (e.g., Box Breathing) use dedicated interactive React components in the MVP.
- **Activity Registry**: Safe mapping of database `activity_id` values to React components, with a fallback view for unknown activity IDs.

### 4.4 Personal Reflections & History Dashboard
- **Scroll Reflections**: Independent log of initial state and browsing context.
- **Session Reflections**: Post-activity mood tracking, clarity ratings, and personal insights linked to completed sessions.
- **Insight History**: View past shifts and reflection logs for registered users.

---

## 5. UI & Design System Guidelines

CogniShift utilizes a **warm, vibrant, uplifting, and tactile design system**:
- **Color Palette**: Calming slate dark base (`#0F172A`), warm orange-coral highlight (`#FB923C`), refreshing mint green (`#34D399`), and soft lavender (`#A78BFA`).
- **Glassmorphic Elements**: Translucent frosted cards with subtle outer glows for elevated visual quality.
- **Micro-Animations**: Smooth spring transitions and progress fills for completion state.
- **Typography**: Modern rounded typography (`Outfit` / `Inter`) for a friendly, approachable interface.

---

## 6. Success Metrics

- **Shift Completion Rate**: > 85% of started activities completed to end.
- **User Reflection Quality**: High engagement in post-activity personal reflections.
- **Positive Energy Impact**: > 90% positive shift in self-reported post-activity mood.
