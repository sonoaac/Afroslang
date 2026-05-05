-- ============================================================
-- Afroslang — Supabase PostgreSQL Schema
-- Run this in: Supabase Dashboard → SQL Editor
-- ============================================================

-- ── profiles (replaces Firestore users/{uid}) ───────────────
CREATE TABLE public.profiles (
  id                    UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username              TEXT NOT NULL,
  email                 TEXT NOT NULL,
  hearts                INT  NOT NULL DEFAULT 5,
  xp                    INT  NOT NULL DEFAULT 0,
  sandbits              INT  NOT NULL DEFAULT 0,
  diamonds              INT  NOT NULL DEFAULT 0,
  owned_avatars         TEXT[] NOT NULL DEFAULT ARRAY['avatar_default'],
  owned_backgrounds     TEXT[] NOT NULL DEFAULT ARRAY['bg_default'],
  equipped_avatar       TEXT NOT NULL DEFAULT 'avatar_default',
  equipped_background   TEXT NOT NULL DEFAULT 'bg_default',
  subscription_active   BOOLEAN NOT NULL DEFAULT false,
  subscription_plan     TEXT,
  stripe_sub_id         TEXT,
  stripe_customer_id    TEXT,
  renews_at             BIGINT,
  past_due              BOOLEAN NOT NULL DEFAULT false,
  hearts_current        INT  NOT NULL DEFAULT 5,
  hearts_last_reset     BIGINT NOT NULL DEFAULT EXTRACT(EPOCH FROM NOW())::BIGINT * 1000,
  hearts_max            INT  NOT NULL DEFAULT 5,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "select_own"  ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "insert_own"  ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "update_own"  ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- ── language_progress (replaces Firestore languages.{lang}) ─
CREATE TABLE public.language_progress (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id          UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  language_id      TEXT NOT NULL,
  completed_lessons TEXT[] NOT NULL DEFAULT '{}',
  xp               INT  NOT NULL DEFAULT 0,
  hearts           INT  NOT NULL DEFAULT 5,
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, language_id)
);

ALTER TABLE public.language_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "manage_own_progress" ON public.language_progress FOR ALL USING (auth.uid() = user_id);

-- ── leaderboard (replaces Firestore leaderboards/{weekId}/{league}/{uid}) ─
CREATE TABLE public.leaderboard (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  username    TEXT NOT NULL,
  xp          INT  NOT NULL DEFAULT 0,
  league      TEXT NOT NULL DEFAULT 'Copper',
  subscribed  BOOLEAN NOT NULL DEFAULT false,
  multiplier  FLOAT   NOT NULL DEFAULT 1.0,
  week_id     TEXT NOT NULL,
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, week_id)
);

ALTER TABLE public.leaderboard ENABLE ROW LEVEL SECURITY;
CREATE POLICY "read_leaderboard"  ON public.leaderboard FOR SELECT TO authenticated USING (true);
CREATE POLICY "insert_own_entry"  ON public.leaderboard FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "update_own_entry"  ON public.leaderboard FOR UPDATE USING (auth.uid() = user_id);

-- ── Service-role bypass (used by Stripe webhook Edge Function) ─
-- The webhook uses the service_role key which bypasses RLS automatically.
-- No extra policies needed.

-- ── Helper: atomically increment XP and decrement hearts on lesson complete ─
CREATE OR REPLACE FUNCTION increment_user_xp_hearts(p_uid UUID, p_xp INT, p_hearts_lost INT)
RETURNS void LANGUAGE sql SECURITY DEFINER AS $$
  UPDATE public.profiles
  SET
    xp              = xp + p_xp,
    hearts          = GREATEST(0, hearts - p_hearts_lost),
    hearts_current  = GREATEST(0, hearts_current - p_hearts_lost)
  WHERE id = p_uid;
$$;
