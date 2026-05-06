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

### Screen Navigation (`src/App.tsx`, `src/main.tsx`)

The app uses **react-router-dom v7** with `BrowserRouter`. Route structure:

```
/                        → LandingPage (login/signup overlay, Africa map, language picker)
/:country/:lang          → LearnView (LearningPath → LessonScreen → LessonComplete sub-screens)
/shop                    → ShopScreen
/leaderboard             → LeaderboardScreen
/profile                 → ProfileScreen
/news                    → LatestNews
/subscription            → SubscriptionPage
/payment-success         → SuccessPage
/feedback                → FeedbackPage
/learn/:lang             → (legacy) redirects to /:country/:lang
/:lang                   → (legacy) redirects to /:country/:lang
*                        → redirects to /
```

Language URLs use a `/:country/:lang` pattern (e.g. `/nigeria/hausa`, `/ethiopia/amharic`). The `LANG_COUNTRY` constant in `App.tsx` maps each `AfricanLanguage` to its primary country slug. `langUrl(lang)` constructs the canonical URL.

Unauthenticated users see `LandingPage` at `/`, which renders `OnboardingFlow` as a full-screen overlay for new sign-ups. After auth, the app navigates to `/:country/:lang` for the user's selected language (or the pre-selected language captured from the URL on first visit). Routes other than `/` redirect to `/` if unauthenticated.

`userProgressMap` (keyed by `AfricanLanguage`) is the primary client-side state. It persists to `localStorage` (keys: `afroslang_progress`, `afroslang_interface`). XP/streaks only count for authenticated (non-guest) users.

### Authentication (`src/contexts/AuthContext.tsx`)

**Supabase Auth** via `useAuth()` hook (`src/lib/supabase.ts` — requires `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` env vars). Three modes:
- **Authenticated user** — full Supabase sync (profiles + progress tables)
- **Guest** — progress stored in `localStorage` via `loadGuestProgress`/`saveGuestProgress`
- **Unauthenticated** — shows `<LandingPage />`

On every auth state change, `AuthContext` calls `getCurrentHeartsStatus()` from `src/utils/heartsTimer.ts` to recalculate heart regeneration before setting `userData`. Also initializes RevenueCat via `initRevenueCat()` from `src/utils/revenueCatUtils.ts` (native in-app purchases).

**`UserData` vs `UserProgress`** — two distinct types:
- `UserData` (`src/utils/userData.ts`) — the Supabase `profiles` row: subscription status, gems, sandbits, diamonds, equipped cosmetics, `heartsData` with server-side regeneration timestamps.
- `UserProgress` (`src/types/index.ts`) — client-side per-language state in `userProgressMap`: XP, level, streak, `completedLessons[]`. Persisted to `localStorage`.

> **Firebase note:** `src/firebase.ts`, `src/firebase.js`, `src/utils/demoSubscription.ts`, and `src/components/debug/Firebase*.tsx` are legacy artifacts — Firebase is no longer used for auth or data storage. Do not add new Firebase dependencies.

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

Topic-aware dialogue scripts exist for all 15 languages. `getConversationScript(languageId, topic)` returns a `ConversationTurn[]` array with native text, English gloss, French gloss, answer choices, and `wrongExplanation` fields. `detectTopic(lessonTitle)` infers topic from lesson title keywords. All conversation turns include bilingual fields (`textTranslation`, `textTranslationFr`, `wrongExplanation`, `wrongExplanationFr`).

### Tone Training (`src/features/lessons/lessonUtils.ts`)

Tonal languages get `tone-trainer` exercises automatically. `TONAL_LANGUAGES` set: `igbo, yoruba, hausa, twi, ewe, moore, lingala`. The `TONE_DATA` object maps each language to an array of `ToneEntry` objects with the diacritic mark, English/French name, a native example word, its meaning, and pitch direction (`high | low | mid | rising | falling`).

### Key Data Types (`src/types/index.ts`)

- `UserProgress` — per-language client state (xp, level, hearts, streak, completedLessons[])
- `Stage` → `Lesson` → `Exercise` — the content hierarchy
- `ConversationTurn` — one turn in a scripted dialogue
- `StoryWord` — a tappable word in a story exercise (word, meaning, meaningFr)
- `ToneEntry` — one tone in a tone-trainer slide (mark, name, example, pitch)
- Hearts: max 5, regenerate at **1 heart per 5 hours** (incremental). Managed server-side via `src/utils/heartsTimer.ts` for authenticated users, via `localStorage` key `afroslang_guest_hearts` for guests. Plus subscribers get 999 (unlimited).
- Guest lesson cap: 3 completions before `GuestLimitModal` prompts sign-up; XP/streaks do not persist for guests

### Design System

Dark luxury theme defined in `src/styles/globals.css`:
- **Brand colors:** `--brand-black: #000000`, `--brand-red: #b00020`, `--brand-green: #35b729`
- **Background:** `--app-bg` is a radial gradient (dark black + subtle red glow); overridden by user's equipped background
- **Fonts:** Plus Jakarta Sans (primary UI font) and Playfair Display (serif/editorial) — loaded via Google Fonts in `globals.css`
- **Component library:** shadcn/ui in `src/components/ui/` — **do not modify these files directly**

### Animated Backgrounds

The app shell wraps all authenticated routes in a canvas background that respects `userData.equippedBackground`:

| Background ID | Canvas Component | CSS gradient applied |
|---|---|---|
| `bg_default` | `GlCanvas` | Dark warm radial gradient |
| `bg_savanna` | `SavannaCanvas` | Warm orange-red linear |
| `bg_cloudy` | `CloudyCanvas` | Blue storm linear |
| `bg_night` | `NightSkyCanvas` | Purple/cyan starfield |
| `bg_forest` | `DeepForestCanvas` | Dark teal HSL |
| `bg_ocean` | `OceanCanvas` | Ocean blue linear |

`getBackgroundStyle(bgId)` in `currencyUtils.ts` returns the CSS for the `style` attribute; the matching canvas component renders on top.

### Supabase / Backend (`src/lib/supabase.ts`, `src/utils/`)

- **Supabase tables:** `profiles` (user data, cosmetics, subscription), `progress` (per-language lesson completion/XP), `leaderboard` (weekly XP)
- **Env vars required:** `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
- **Leaderboard leagues** (7 tiers): Copper → Bronze → Silver → Gold → Platinum → Diamond → Stars
- **Stripe webhook:** The live handler is a Firebase Cloud Function at `functions/src/index.ts`. Webhook URL: `https://us-central1-ahamefuna-legacy.cloudfunctions.net/stripeWebhook`. Secrets are set via `firebase functions:secrets:set STRIPE_SECRET_KEY` / `STRIPE_WEBHOOK_SECRET`.
- **Subscription flow:** `SubscriptionPage` redirects to a Stripe Payment Link with `client_reference_id=uid`. On return (`?payment_success=1`), `SuccessPage` polls Supabase every 2 s (up to 30 s) waiting for the webhook to flip `profiles.subscription_active = true`.
- **RevenueCat:** Native in-app purchases (mobile) via `@revenuecat/purchases-capacitor`. Initialized in `AuthContext` on login; reset on logout.

### Gems, Sandbits & Diamonds (`src/utils/currencyUtils.ts`)

Three in-app currencies:
- **Gems** — earned by completing lessons (not yet wired; reserved for shop)
- **Sandbits** — earned via leaderboard rewards; used to purchase cosmetics in the shop
- **Diamonds** — purchased with real money via Stripe Payment Links (`DIAMOND_PACKS`); convert to Sandbits at 1 diamond = 50 SB

Shop actions: cosmetic avatar purchase (Sandbits), background purchase (Sandbits), diamond → Sandbits conversion. Plus subscribers get 2× XP automatically (`isXpBoostActive()` checks subscription status — there is no separate purchasable XP boost).

Diamond purchase return uses `?diamonds_success=1` URL param; `App.tsx` polls Supabase for up to 20 s waiting for the webhook to credit the diamonds.

### Cosmetics System (`src/utils/currencyUtils.ts`)

`AVATARS` and `BACKGROUNDS` arrays define the cosmetic catalogue (`CosmeticItem` type). Items with `plusOnly: true` are automatically owned by Plus subscribers. `purchaseCosmetic()` deducts Sandbits and updates `profiles.owned_avatars` / `profiles.owned_backgrounds`. `equipCosmetic()` updates `profiles.equipped_avatar` / `profiles.equipped_background`.

### Onboarding Flow (`src/components/onboarding/OnboardingFlow.tsx`)

A 14-step wizard rendered as a fixed overlay (z-index 9999) on `LandingPage` for unauthenticated users. Called with `onSignIn` and `onComplete(selectedLanguage, plan, placementScore)` callbacks.

**Steps in order:**
0. Welcome screen — language toggle (EN/FR), mascot animation, CTA buttons
1. Mascot intro with typewriter greeting
2. Chat-style questions intro (Afroplus mascot)
3. Language selection carousel — arrow-navigated 2-column picker
4. Course building — auto-advances after 2.8 s, animated progress bar
5. Discovery source — how the user heard about Afroslang (TikTok, Instagram, Facebook, Twitter/X, Friend, App Store, YouTube, Google, Other)
6. Level check — self-assessed fluency with signal-bar visualization (5 options from "brand new" to "basically native")
7. Affirmation screen — auto-advances after 2.2 s
8. Learning goals — multi-select (roots, culture, fun, travel, career, family, other)
9. Routine setup intro — emoji animation
10. Daily goal — 5 / 15 / 30 / 60 min
11. Plan selection — AfroPlus vs Free
12. Placement test — 10 language-specific questions per language (defined for Swahili, Yoruba, Hausa, Igbo, Zulu, Amharic, Arabic) with immediate feedback
13. Results — score %, starting stage, visual answer grid, then account creation

All 14 steps are fully bilingual (EN/FR). Keyframe animations are injected as a style string into the DOM; background images come from `/onboardingbg/onboarding*.png`.

### Placement Test

The placement test lives inside `OnboardingFlow` (step 12) and also integrates with `App.tsx`. `handleSetPlacementScore(languageId, scoreFrac)` pre-unlocks stages: 70%+ skips 1–4 stages (1 per 10% above 70%, max 4 at 100%). Unlocking marks all lessons in skipped stages as completed in `userProgressMap`.

### Path Aliases

TypeScript path alias `@/*` maps to `./src/*` (configured in `tsconfig.json`). Use `@/components/...`, `@/utils/...`, etc. for imports.

### TypeScript Strictness

`tsconfig.json` enables `strict`, `noUnusedLocals`, and `noUnusedParameters`. `npm run typecheck` will fail on unused variables — remove them rather than prefixing with `_`.

### UI Components & Screen Modules

- `src/components/ui/` — shadcn/ui component library (do not modify these files)
- `src/features/language-select/` — `LanguageSelectionScreen`, `InterfaceLanguageSelector`, `FlagIcon`, `SelectMotionOverlay`
- `src/features/lessons/` — `LearningPath`, `LessonScreen`, `LessonComplete`, `ExerciseTypes`, `AdvancedExercises`, `EnrichedExercises`, `IntroPhases`
- `src/features/store/` — `ShopScreen` (cosmetics/currency shop)
- `src/components/landing/` — `LandingPage`, `AfricaMap` (D3 v7 choropleth), `GlCanvas`, `SavannaCanvas`, `CloudyCanvas`, `NightSkyCanvas`, `DeepForestCanvas`, `OceanCanvas`, `StaticPage`, `DescrambleText`
- `src/components/profile/` — `ProfileScreen` (user stats, equipped cosmetics, language progress overview, settings)
- `src/components/rain/` — `RainCanvas` and `MascotFactCard` (shown on `LearningPath` for `RAIN_LANGUAGES`)
- `src/components/onboarding/` — `OnboardingFlow` (see Onboarding Flow section above)
- `src/components/auth/` — `Login`, `SignUp`, `AuthModal`, `AuthScreen`
- `src/components/mascot/` — `AfroslangMascot` (animated mascot character used in onboarding and lesson flows)
- `src/components/streak/` — `StreakPopup` (modal shown when user maintains a daily practice streak)
- `src/components/layout/Header.tsx` — top app bar shown in authenticated routes
- `src/components/intro/` — `AfroslangIntro` (animated logo reveal — present in the codebase but not used in any route)
- `src/components/splash/` — `SplashScreen` (unused in routing — do not re-add without intent)
- `src/utils/logger.ts` — wrapper for console logging (use instead of bare `console.log`)

### Cultural Facts & Rain Background

`src/data/culturalFacts.ts` exports `culturalFacts` (per-language `CulturalFact[]`) and `RAIN_LANGUAGES` (Set of language IDs that show rain canvas + mascot fact card on `LearningPath`).

### Duplicate / Legacy Files

- `src/data/` root contains legacy copies of some lesson files. Canonical source is `src/data/lessons/<language>.ts`. **Do not add content to files in `src/data/` root.**
- `src/data/all-languages.ts` and `src/data/lessons/all-languages.ts` are aggregate files — do not add lessons here; use individual language files.
- `src/firebase.js` — legacy artifact; use only `src/firebase.ts` if Firebase debug tools are needed.
- `src/utils/demoSubscription.ts` — legacy Firebase-based subscription toggle; no longer functional against Supabase.
- `src/main.tsx.backup` — ignore it.
- `src/lib/` contains only `supabase.ts`; `src/pages/` and `src/hooks/` are empty placeholders.
- Root-level `components/` and `project/` directories are legacy artifacts — do not add anything there.

### Adding a New Language

1. Create `src/data/lessons/<language>.ts` exporting `<language>Lessons`
2. Add the language ID to `AfricanLanguage` type in `src/types/index.ts`
3. Add it to `rawLessonsForLanguage()` switch in `src/data/lessons/index.ts`
4. Add metadata to `src/data/languages.ts`
5. Add cultural facts to `src/data/culturalFacts.ts`; decide whether it belongs in `RAIN_LANGUAGES`
6. If tonal, add it to `TONAL_LANGUAGES` and provide `TONE_DATA` entries in `src/features/lessons/lessonUtils.ts`
7. Add topic-aware conversation scripts to `src/features/lessons/conversationScripts.ts`
8. Add to `LANG_COUNTRY` in `App.tsx` (language ID → country slug for URL)
9. Add to `LANGUAGE_COUNTRIES` in `LandingPage.tsx` (language ID → ISO-2 country codes for Africa map)
10. Add the relevant countries to `EXPLORE_COUNTRIES` in `LandingPage.tsx` if not already present
11. Add 10 placement test questions to the `PLACEMENT_QUESTIONS` map in `OnboardingFlow.tsx`
12. Run `npm run validate:lessons` to check data integrity

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

Hearts refill at **1 heart per 5 hours** (up to max 5). `HeartsData` (`currentHearts`, `lastResetTime`, `maxHearts`) is stored in `profiles.hearts_*` columns in Supabase for authenticated users and in `localStorage` key `afroslang_guest_hearts` for guests. `AuthContext` calls `getCurrentHeartsStatus()` on login to apply regenerated hearts and writes back to Supabase.

### Deployment

- **Vercel** is the target host (`vercel.json` in root). Vite output in `dist/` is served directly.
- Supabase config is read from `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` env vars.
- Stripe API keys go in `VITE_STRIPE_*` env vars; the live webhook handler is `functions/src/index.ts` (Firebase Cloud Function).
