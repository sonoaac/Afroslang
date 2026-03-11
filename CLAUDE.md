# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Afroslang** (package name: `afroslang`) — a gamified African language learning app. Users pick an interface language (English/French), select an African language to learn, then progress through 7-stage curricula with 7 lessons each. Think Duolingo for African languages.

**Supported languages:** Swahili, Hausa, Yoruba, Zulu, Amharic, Igbo, Arabic, Shona, Somali, Berber, Moore, Lingala, Twi, Chichewa, Wolof.

## Commands

```bash
npm run dev          # Start dev server (Vite, localhost:5173)
npm run build        # Production build → dist/
npm run preview      # Preview production build locally
npm run typecheck    # TypeScript check (no emit)
npm run lint         # ESLint (zero warnings threshold)
npm run validate:lessons  # Validate all lesson data integrity
```

Node 22.x is required.

## Architecture

### Screen Navigation (`src/App.tsx`)

App is a single-page app with no router. Navigation is a `currentScreen` state string that switches between rendered screen components:

```
auth → interface-select → language-select → path → lesson → complete
                                                  ↘ leaderboard / shop / latest-news
```

`userProgressMap` (keyed by `AfricanLanguage`) is the primary client-side state. It persists to `localStorage` (keys: `afroslang_progress`, `afroslang_interface`). XP/streaks only count for authenticated (non-guest) users.

### Authentication (`src/contexts/AuthContext.tsx`)

Firebase Auth via `useAuth()` hook. Three modes:
- **Authenticated user** — full Firebase Firestore sync
- **Guest** — progress stored in `localStorage` via `loadGuestProgress`/`saveGuestProgress`
- **Unauthenticated** — shows `<AuthScreen />`

### Lesson Data Pipeline (`src/data/lessons/index.ts`)

All languages share the same 7-stage structure via `createSevenStageCurriculum()`:
1. Raw lesson arrays live in `src/data/lessons/<language>.ts` (exported as `<language>Lessons`)
2. Swahili uses a structured format (`swahili-structured.ts`) with pre-defined stages
3. The curriculum builder distributes raw lessons across 7 stages × 7 lessons, padding with review lessons when raw content is insufficient
4. Each lesson is normalized to exactly 20 exercises by `normalizeToTwenty()` (repeats with "(Review)" suffix if needed)
5. `getStagesForLanguage(languageId)` is the main entry point

Exercise types: `multiple-choice | fill-blank | match | translate | type-answer`

### Key Data Types (`src/types/index.ts`)

- `UserProgress` — per-language client state (xp, level, hearts, streak, completedLessons[])
- `Stage` → `Lesson` → `Exercise` — the content hierarchy
- Hearts: max 5, reset after 7 hours when depleted; subscribers get 999 (unlimited)

### Firebase / Backend (`src/firebase.ts`, `src/utils/`)

- **Firestore collections:** `users/{uid}` for profile/progress, `leaderboard` for weekly XP
- **Leaderboard leagues** (7 tiers): Copper → Bronze → Silver → Gold → Platinum → Diamond → Stars
- Firebase config has hardcoded fallback values in `src/firebase.ts`; `.env` vars (`VITE_FIREBASE_*`) take precedence
- Firebase emulators can be enabled via `VITE_USE_FIREBASE_EMULATOR=true`
- Stripe integration: `src/api/create-checkout-session.ts`, `src/api/stripe-webhook.ts`

### UI Components

- `src/components/ui/` — shadcn/ui component library (do not modify these files)
- `src/features/` — feature-level screens: `language-select/`, `lessons/`, `store/`
- `src/components/` — shared components: auth, layout, leaderboard, subscription, debug

### Adding a New Language

1. Create `src/data/lessons/<language>.ts` exporting `<language>Lessons` (array of lesson objects with `exercises`)
2. Add the language ID to `AfricanLanguage` type in `src/types/index.ts`
3. Add it to `rawLessonsForLanguage()` switch in `src/data/lessons/index.ts`
4. Add metadata to `src/data/languages.ts`
5. Run `npm run validate:lessons` to check data integrity

### Lesson Data Validation

`npm run validate:lessons` checks all languages for:
- Non-empty stage/lesson/exercise IDs (no duplicates within a language)
- Valid exercise types
- Multiple-choice exercises must include `correctAnswer` in `options[]`

### Bilingual Content Convention

Every user-facing string in lesson/exercise data must have English + French variants:
- `title` / `titleFr`, `question` / `questionFr`, `options` / `optionsFr`, `hint` / `hintFr`
- Interface language (`'en'` | `'fr'`) is set at startup and persisted in `localStorage` as `afroslang_interface`

### Igbo Text Handling

`src/utils/igboTextUtils.ts` exports `checkIgboAnswer()` for diacritic-flexible, case-insensitive answer matching. Use this instead of strict equality when validating Igbo exercise responses.

### Deployment

- **Vercel** is the target host (`vercel.json` in root). No special build config needed — Vite output in `dist/` is served directly.
- Firebase config is read from `VITE_FIREBASE_*` env vars, with hardcoded fallbacks in `src/firebase.ts` for development without `.env`.
- Stripe API keys go in `VITE_STRIPE_*` env vars; webhook handler lives in `src/api/stripe-webhook.ts`.
