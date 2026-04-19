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

# Capacitor (native mobile)
npm run build:android   # Build + sync + open Android Studio
npm run build:ios       # Build + sync + open Xcode
npm run cap:sync        # Build + sync without opening IDE

# Firebase Cloud Functions (Stripe webhook)
cd functions && npm install   # Install function dependencies
firebase deploy --only functions  # Deploy the webhook to Firebase
```

Node 22.x is required.

**No tests exist** — there is no testing infrastructure (no Vitest, Jest, or spec files).

## Architecture

### Screen Navigation (`src/App.tsx`)

App is a single-page app with no router. Navigation is a `currentScreen` state string that switches between rendered screen components:

```
AfroslangIntro (logo animation, once per session)
  → LandingPage (unauthenticated)
  → interface-select → path → lesson → complete
                            ↘ leaderboard / shop / latest-news / subscription / payment-success / feedback
```

`SplashScreen` (`src/components/splash/SplashScreen.tsx`) exists as a file but is **not currently used** in `App.tsx` — it was removed from the navigation flow. Do not re-add it without intent.

Returning authenticated users skip `LandingPage` and go straight to `interface-select`. The `currentLanguage` is intentionally **not** restored on load — users always choose their language fresh each session.

`userProgressMap` (keyed by `AfricanLanguage`) is the primary client-side state. It persists to `localStorage` (keys: `afroslang_progress`, `afroslang_interface`, `afroslang_current_language`). XP/streaks only count for authenticated (non-guest) users.

`sessionStorage` keys: `afro_intro_seen` (logo intro shown).

### Authentication (`src/contexts/AuthContext.tsx`)

Firebase Auth via `useAuth()` hook. Three modes:
- **Authenticated user** — full Firebase Firestore sync
- **Guest** — progress stored in `localStorage` via `loadGuestProgress`/`saveGuestProgress`
- **Unauthenticated** — shows `<LandingPage />`

On every auth state change, `AuthContext` calls `getCurrentHeartsStatus()` from `src/utils/heartsTimer.ts` to recalculate heart regeneration before setting `userData`.

**`UserData` vs `UserProgress`** — these are two distinct types:
- `UserData` (`src/utils/userData.ts`) — the Firestore document: subscription status, gems, total XP, `heartsData` with server-side regeneration timestamps.
- `UserProgress` (`src/types/index.ts`) — client-side per-language state in `userProgressMap`: XP, level, streak, `completedLessons[]`. Persisted to `localStorage`.

### Lesson Data Pipeline (`src/data/lessons/index.ts`)

All languages share the same 7-stage structure via `createSevenStageCurriculum()`:
1. Raw lesson arrays live in `src/data/lessons/<language>.ts` (exported as `<language>Lessons`)
2. Swahili uses a structured format (`swahili-structured.ts`) with pre-defined stages
3. The curriculum builder distributes raw lessons across 7 stages × 7 lessons, padding with review lessons (`createReviewLesson()`) when raw content is insufficient
4. Each lesson is normalized to exactly 20 exercises by `normalizeToTwenty()` (repeats with "(Review)" suffix if needed)
5. `getStagesForLanguage(languageId)` is the main entry point

**Base exercise types** (defined in lesson data files): `multiple-choice | fill-blank | match | translate | type-answer`

**Enriched exercise types** (injected at runtime by `src/features/lessons/lessonUtils.ts`, never written into lesson data files):

| Type | Description |
|---|---|
| `flashcard` | Flip card showing native word → English meaning |
| `audio-match` | TTS audio plays; user picks the written match |
| `word-order` | Tap word tiles to assemble a sentence |
| `cultural-card` | Non-quiz cultural insight slide (no score impact) |
| `conversation` | Scripted dialogue with option choices (uses `ConversationTurn[]`) |
| `story` | Story paragraph with tappable vocabulary (uses `StoryWord[]`) |
| `tone-trainer` | Tone identification for tonal languages (uses `ToneEntry[]`) |

Enriched exercises carry `isEnriched: true` on the runtime `EnrichedExercise` type and **do not count toward quiz score or total**. They form the "teaching phase" of a lesson before quiz exercises begin.

### Conversation Scripts (`src/features/lessons/conversationScripts.ts`)

Topic-aware dialogue scripts exist for all 15 languages. `getConversationScript(languageId, topic)` returns a `ConversationTurn[]` array with native text, English gloss, French gloss, answer choices, and `wrongExplanation` fields. `detectTopic(lessonTitle)` infers topic from lesson title keywords (greetings, numbers, family, food, colors, etc.). All conversation turns include bilingual fields (`text`, `textTranslation`, `textTranslationFr`, `wrongExplanation`, `wrongExplanationFr`).

### Tone Training (`src/features/lessons/lessonUtils.ts`)

Tonal languages get `tone-trainer` exercises automatically. `TONAL_LANGUAGES` set: `igbo, yoruba, hausa, twi, ewe, moore, lingala`. The `TONE_DATA` object maps each language to an array of `ToneEntry` objects containing the diacritic mark, English/French name, a native example word, its meaning, and pitch direction (`high | low | mid | rising | falling`).

### Key Data Types (`src/types/index.ts`)

- `UserProgress` — per-language client state (xp, level, hearts, streak, completedLessons[])
- `Stage` → `Lesson` → `Exercise` — the content hierarchy
- `ConversationTurn` — one turn in a scripted dialogue (speaker, native text, translation, options, wrongExplanation)
- `StoryWord` — a tappable word in a story exercise (word, meaning, meaningFr)
- `ToneEntry` — one tone in a tone-trainer slide (mark, name, example, pitch)
- Hearts: max 5, regenerate at **1 heart per 5 hours** (incremental, not a bulk reset). Managed server-side via `src/utils/heartsTimer.ts` for authenticated users, via `localStorage` key `afroslang_guest_hearts` for guests. Subscribers get 999 (unlimited).
- Guest lesson cap: 3 completions before `GuestLimitModal` prompts sign-up; XP/streaks do not persist for guests

### Design System

Dark luxury theme defined in `src/styles/globals.css`:
- **Brand colors:** `--brand-black: #000000`, `--brand-red: #b00020`, `--brand-green: #35b729`
- **Background:** `--app-bg` is a radial gradient (dark black + subtle red glow)
- **Fonts:** Kavoon (primary UI font), Roboto (fallback), and Playfair Display (serif/editorial) — all loaded via Google Fonts in `globals.css`
- **Component library:** shadcn/ui in `src/components/ui/` — **do not modify these files directly**

### Firebase / Backend (`src/firebase.ts`, `src/utils/`, `functions/`)

- **Firestore collections:** `users/{uid}` for profile/progress, `leaderboard` for weekly XP
- **Leaderboard leagues** (7 tiers): Copper → Bronze → Silver → Gold → Platinum → Diamond → Stars
- Firebase config has hardcoded fallback values in `src/firebase.ts`; `.env` vars (`VITE_FIREBASE_*`) take precedence
- Firebase emulators can be enabled via `VITE_USE_FIREBASE_EMULATOR=true`
- **Stripe webhook:** The live handler is a Firebase Cloud Function at `functions/src/index.ts` — NOT `src/api/stripe-webhook.ts` (that file is reference-only). Webhook URL: `https://us-central1-ahamefuna-legacy.cloudfunctions.net/stripeWebhook`. Secrets are set via `firebase functions:secrets:set STRIPE_SECRET_KEY` / `STRIPE_WEBHOOK_SECRET`.
- **Subscription flow:** `SubscriptionPage` redirects to a Stripe Payment Link with `client_reference_id=uid`. On return (`?payment_success=1`), `SuccessPage` polls Firestore every 2 s (up to 30 s) waiting for the webhook to flip `users/{uid}.subscription.active = true`. Use `src/utils/demoSubscription.ts` to activate/deactivate subscriptions locally for testing.

### Gems & Currency (`src/utils/currencyUtils.ts`)

Two in-app currencies: **Gems** (earned by completing lessons) and **Sandbits** (purchasable; used for XP boosts). Shop actions: hearts refill (100 gems), XP boost (150 sandbits → 2× XP for 1 hour), Sandbits pack purchase. XP boost expiry is stored on `userData.xpBoostExpiry` (timestamp). Plus subscribers bypass the hearts system entirely (hearts set to 999).

### Path Aliases

TypeScript path alias `@/*` maps to `./src/*` (configured in `tsconfig.json`). Use `@/components/...`, `@/utils/...`, etc. for imports.

### TypeScript Strictness

`tsconfig.json` enables `strict`, `noUnusedLocals`, and `noUnusedParameters`. `npm run typecheck` (or `tsc --noEmit`) will fail on unused variables — remove them rather than prefixing with `_`.

### UI Components & Screen Modules

- `src/components/ui/` — shadcn/ui component library (do not modify these files)
- `src/features/language-select/` — `LanguageSelectionScreen`, `InterfaceLanguageSelector`, `FlagIcon`, `SelectMotionOverlay` (visual overlay during language pick transition)
- `src/features/lessons/` — `LearningPath` (stage/lesson map), `LessonScreen` (quiz runner), `LessonComplete`, `ExerciseTypes` (base exercise renderers), `AdvancedExercises` (type-answer, word-order variants), `EnrichedExercises` (flashcard, audio-match, cultural-card renderers), `IntroPhases` (teaches content before quiz phase begins)
- `src/features/store/` — `ShopScreen` (gems/sandbits shop)
- `src/hooks/` — empty; hook logic lives in components or `src/utils/`
- `src/api/` — `create-checkout-session.ts` and `stripe-webhook.ts` (reference-only; live webhook is in `functions/`)
- `src/components/intro/` — `AfroslangIntro` (animated logo reveal, plays once per session)
- `src/components/splash/` — `SplashScreen` (3D shattering text animation, unused in App.tsx)
- `src/components/landing/` — Full landing page suite:
  - `LandingPage` — scrolling marketing page with hero, interactive Africa map explorer, feature blocks, footer, and glassmorphic auth overlay (login/signup). Manages a `pendingLanguage` flow: when an unauthenticated user picks a language from the map and hits "Start Learning", the language is stored in `pendingLanguage` and applied after signup/login completes.
  - `AfricaMap` — D3 v7 choropleth of Africa (loaded dynamically from CDN at `https://d3js.org/d3.v7.min.js`). Accepts `onCountrySelect(iso2)`, `highlightedCodes` (search results), and `unlockedCodes` (countries lit up when the user has completed ≥1 lesson in any of that country's languages). Country–language mapping lives in `LANGUAGE_COUNTRIES` in `LandingPage.tsx`.
  - `GlCanvas` — WebGL animated canvas used as the hero background (also imported in `App.tsx`).
  - `StaticPage` — wrapper that renders in-app static content (About, Our Story, Terms, Privacy, etc.) — navigated to by setting `activePage` state in `LandingPage`.
  - `DescrambleText` — letter-by-letter drop-in/scramble animation used for the hero heading and auth modal titles.
  - Auth overlay: glassmorphic card with Login / Sign Up tabs. Client-side rate limiting stored in `localStorage` key `afro_login_rl` (5 attempts → 15-minute lockout). Password validation enforces 7 chars + uppercase + lowercase + digit + special character before submission.
- `src/components/rain/` — `RainCanvas` (animated rain background) and `MascotFactCard` (cultural facts carousel shown on `LearningPath` for languages in `RAIN_LANGUAGES`)
- `src/components/` — shared components: auth, layout, leaderboard, subscription, streak, mascot, debug

### Cultural Facts & Rain Background

`src/data/culturalFacts.ts` exports:
- `culturalFacts` — per-language arrays of `CulturalFact` objects (each with `text`, `textFr`, `emoji`)
- `RAIN_LANGUAGES` — a `Set` of language IDs that display the rain canvas + mascot fact card on the `LearningPath` screen (tropical/high-rainfall region languages)

When adding a new language, add cultural facts here and decide whether it belongs in `RAIN_LANGUAGES`.

### Duplicate / Legacy Files

- `src/data/` root contains legacy copies of some lesson files (e.g. `src/data/swahili.ts`, `hausa.ts`, `yoruba.ts`, `zulu.ts`). The canonical source is `src/data/lessons/<language>.ts`. **Do not add new content to files in `src/data/` root.**
- `src/data/all-languages.ts` and `src/data/lessons/all-languages.ts` are aggregate files — do not add new lessons here; add to individual language files instead.
- `src/data/swahili-structured.ts` mirrors `src/data/lessons/swahili-structured.ts` — the `lessons/` version is canonical.
- `src/firebase.js` and `src/firebase.ts` both exist — use only `src/firebase.ts`. The `.js` file is a legacy artifact.
- `src/main.tsx.backup` — ignore it.
- `src/lib/` and `src/pages/` directories exist but are empty placeholders.
- Root-level `components/` directory at the repo root (not `src/components/`) is a legacy artifact — do not add anything there.

### Adding a New Language

1. Create `src/data/lessons/<language>.ts` exporting `<language>Lessons` (array of lesson objects with `exercises`)
2. Add the language ID to `AfricanLanguage` type in `src/types/index.ts`
3. Add it to `rawLessonsForLanguage()` switch in `src/data/lessons/index.ts`
4. Add metadata to `src/data/languages.ts`
5. Add cultural facts to `src/data/culturalFacts.ts`; decide whether it belongs in `RAIN_LANGUAGES`
6. If tonal, add it to `TONAL_LANGUAGES` and provide `TONE_DATA` entries in `src/features/lessons/lessonUtils.ts`
7. Add topic-aware conversation scripts to `src/features/lessons/conversationScripts.ts`
8. Add to `LANGUAGE_COUNTRIES` in `LandingPage.tsx` (maps language ID → ISO-2 country codes) so the Africa map lights up correctly
9. Add the relevant countries to `EXPLORE_COUNTRIES` in `LandingPage.tsx` if not already present (each entry has `code`, `name`, `fact`, `languages[]`)
10. Run `npm run validate:lessons` to check data integrity

### Lesson Data Validation

`npm run validate:lessons` checks all languages for:
- Non-empty stage/lesson/exercise IDs (no duplicates within a language)
- Valid exercise types
- Multiple-choice exercises must include `correctAnswer` in `options[]`

### Bilingual Content Convention

Every user-facing string in lesson/exercise data must have English + French variants:
- `title` / `titleFr`, `question` / `questionFr`, `options` / `optionsFr`, `hint` / `hintFr`
- `ConversationTurn` fields: `textTranslation` / `textTranslationFr`, `wrongExplanation` / `wrongExplanationFr`
- Interface language (`'en'` | `'fr'`) is set at startup and persisted in `localStorage` as `afroslang_interface`

### Igbo Text Handling

`src/utils/igboTextUtils.ts` exports `checkIgboAnswer()` for diacritic-flexible, case-insensitive answer matching. Use this instead of strict equality when validating Igbo exercise responses.

### Hearts Regeneration (`src/utils/heartsTimer.ts`)

Hearts refill at **1 heart per 5 hours** (up to max 5). The `HeartsData` object (`currentHearts`, `lastResetTime`, `maxHearts`) is stored in `users/{uid}.heartsData` in Firestore for authenticated users and in `localStorage` key `afroslang_guest_hearts` for guests. `AuthContext` calls `getCurrentHeartsStatus()` on login to apply any hearts that regenerated while the user was away and writes the update back to Firestore.

### Deployment

- **Vercel** is the target host (`vercel.json` in root). No special build config needed — Vite output in `dist/` is served directly.
- Firebase config is read from `VITE_FIREBASE_*` env vars, with hardcoded fallbacks in `src/firebase.ts` for development without `.env`.
- Stripe API keys go in `VITE_STRIPE_*` env vars; the live webhook handler is `functions/src/index.ts`, not `src/api/stripe-webhook.ts` (that file is reference-only).
