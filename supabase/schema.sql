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

-- ============================================================
-- Security hardening
-- ============================================================
-- Important account state is mutated through SECURITY DEFINER RPCs below.
-- Clients keep read access, but direct browser writes to paid/progression
-- columns are intentionally blocked at the table/policy layer.

DROP POLICY IF EXISTS "update_own" ON public.profiles;
DROP POLICY IF EXISTS "insert_own" ON public.profiles;
DROP POLICY IF EXISTS "manage_own_progress" ON public.language_progress;
DROP POLICY IF EXISTS "select_own_progress" ON public.language_progress;
DROP POLICY IF EXISTS "insert_own_entry" ON public.leaderboard;
DROP POLICY IF EXISTS "update_own_entry" ON public.leaderboard;
DROP POLICY IF EXISTS "read_leaderboard_authenticated" ON public.leaderboard;

CREATE POLICY "insert_own_profile_defaults"
  ON public.profiles FOR INSERT
  WITH CHECK (
    auth.uid() = id
    AND email = COALESCE(auth.jwt() ->> 'email', email)
    AND username ~ '^[A-Za-z0-9_]{3,20}$'
    AND hearts = 5
    AND xp = 0
    AND sandbits = 0
    AND diamonds = 0
    AND owned_avatars = ARRAY['avatar_default']
    AND owned_backgrounds = ARRAY['bg_default']
    AND equipped_avatar = 'avatar_default'
    AND equipped_background = 'bg_default'
    AND subscription_active = false
    AND subscription_plan IS NULL
    AND stripe_sub_id IS NULL
    AND stripe_customer_id IS NULL
    AND renews_at IS NULL
    AND past_due = false
    AND hearts_current = 5
    AND hearts_max = 5
  );

CREATE POLICY "select_own_progress"
  ON public.language_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "read_leaderboard_authenticated"
  ON public.leaderboard FOR SELECT TO authenticated
  USING (true);

REVOKE UPDATE, DELETE ON public.profiles FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.language_progress FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.leaderboard FROM anon, authenticated;

DROP FUNCTION IF EXISTS increment_user_xp_hearts(UUID, INT, INT);

CREATE OR REPLACE FUNCTION public.is_supported_language(p_language_id TEXT)
RETURNS BOOLEAN
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT p_language_id = ANY (ARRAY[
    'swahili', 'hausa', 'yoruba', 'zulu', 'amharic', 'igbo', 'arabic',
    'shona', 'somali', 'berber', 'moore', 'lingala', 'twi', 'chichewa', 'wolof'
  ]);
$$;

DROP FUNCTION IF EXISTS public.app_complete_lesson(TEXT, TEXT, INT, INT);

CREATE OR REPLACE FUNCTION public.app_complete_lesson(
  p_language_id TEXT,
  p_lesson_id TEXT,
  p_xp_gained INT,
  p_hearts_lost INT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid UUID := auth.uid();
  v_completed TEXT[];
  v_already_completed BOOLEAN;
  v_completed_count INT;
  v_has_hearts BOOLEAN;
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;
  IF NOT public.is_supported_language(p_language_id) THEN
    RAISE EXCEPTION 'Unsupported language';
  END IF;
  IF p_lesson_id IS NULL OR p_lesson_id !~ '^[a-zA-Z0-9_-]{1,80}$' THEN
    RAISE EXCEPTION 'Invalid lesson id';
  END IF;
  IF p_xp_gained < 0 OR p_xp_gained > 60 THEN
    RAISE EXCEPTION 'Invalid XP amount';
  END IF;
  IF p_hearts_lost < 0 OR p_hearts_lost > 5 THEN
    RAISE EXCEPTION 'Invalid hearts amount';
  END IF;

  SELECT COALESCE(completed_lessons @> ARRAY[p_lesson_id], false),
         COALESCE(array_length(completed_lessons, 1), 0)
  INTO v_already_completed, v_completed_count
  FROM public.language_progress
  WHERE user_id = v_uid
    AND language_id = p_language_id;

  v_already_completed := COALESCE(v_already_completed, false);
  v_completed_count := COALESCE(v_completed_count, 0);

  SELECT subscription_active OR hearts_current > 0
  INTO v_has_hearts
  FROM public.profiles
  WHERE id = v_uid;

  IF NOT COALESCE(v_has_hearts, false) THEN
    RAISE EXCEPTION 'No hearts available';
  END IF;

  IF NOT v_already_completed AND v_completed_count >= 49 THEN
    RAISE EXCEPTION 'Language curriculum already complete';
  END IF;

  INSERT INTO public.language_progress (user_id, language_id, completed_lessons, xp, hearts, updated_at)
  VALUES (
    v_uid,
    p_language_id,
    ARRAY[p_lesson_id],
    p_xp_gained,
    GREATEST(0, 5 - p_hearts_lost),
    NOW()
  )
  ON CONFLICT (user_id, language_id) DO UPDATE
    SET completed_lessons = CASE
          WHEN public.language_progress.completed_lessons @> ARRAY[p_lesson_id]
            THEN public.language_progress.completed_lessons
          ELSE public.language_progress.completed_lessons || p_lesson_id
        END,
        xp = public.language_progress.xp + CASE
          WHEN public.language_progress.completed_lessons @> ARRAY[p_lesson_id] THEN 0
          ELSE p_xp_gained
        END,
        hearts = GREATEST(0, public.language_progress.hearts - p_hearts_lost),
        updated_at = NOW()
  RETURNING completed_lessons INTO v_completed;

  IF NOT v_already_completed THEN
    UPDATE public.profiles
    SET xp = xp + p_xp_gained,
        hearts = GREATEST(0, hearts - p_hearts_lost),
        hearts_current = CASE
          WHEN subscription_active THEN hearts_current
          ELSE GREATEST(0, hearts_current - p_hearts_lost)
        END
    WHERE id = v_uid;
  ELSE
    UPDATE public.profiles
    SET hearts = GREATEST(0, hearts - p_hearts_lost),
        hearts_current = CASE
          WHEN subscription_active THEN hearts_current
          ELSE GREATEST(0, hearts_current - p_hearts_lost)
        END
    WHERE id = v_uid;
  END IF;

  RETURN NOT v_already_completed;
END;
$$;

CREATE OR REPLACE FUNCTION public.app_update_hearts(
  p_current_hearts INT,
  p_last_reset BIGINT
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid UUID := auth.uid();
  v_now_ms BIGINT := FLOOR(EXTRACT(EPOCH FROM NOW()) * 1000);
  v_current INT;
  v_last_reset BIGINT;
  v_allowed INT;
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;
  IF p_current_hearts < 0 OR p_current_hearts > 5 THEN
    RAISE EXCEPTION 'Invalid hearts amount';
  END IF;
  SELECT hearts_current, hearts_last_reset
  INTO v_current, v_last_reset
  FROM public.profiles
  WHERE id = v_uid
    AND subscription_active = false
    AND hearts_current <= 5;

  IF NOT FOUND THEN
    RETURN;
  END IF;

  v_allowed := LEAST(5, v_current + FLOOR(GREATEST(0, v_now_ms - v_last_reset) / (5 * 60 * 60 * 1000))::INT);

  IF p_current_hearts > v_allowed THEN
    RAISE EXCEPTION 'Hearts cannot be refilled yet';
  END IF;

  UPDATE public.profiles
  SET hearts = p_current_hearts,
      hearts_current = p_current_hearts,
      hearts_last_reset = CASE
        WHEN p_current_hearts > v_current THEN v_now_ms
        ELSE hearts_last_reset
      END,
      hearts_max = 5
  WHERE id = v_uid;
END;
$$;

CREATE OR REPLACE FUNCTION public.app_update_username(
  p_username TEXT
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid UUID := auth.uid();
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;
  IF p_username IS NULL OR p_username !~ '^[A-Za-z0-9_]{3,20}$' THEN
    RAISE EXCEPTION 'Invalid username';
  END IF;

  UPDATE public.profiles
  SET username = p_username
  WHERE id = v_uid;
END;
$$;

CREATE OR REPLACE FUNCTION public.app_convert_diamonds_to_sandbits(
  p_diamonds_to_spend INT
)
RETURNS TABLE (diamonds INT, sandbits INT)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid UUID := auth.uid();
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;
  IF p_diamonds_to_spend < 1 OR p_diamonds_to_spend > 100 THEN
    RAISE EXCEPTION 'Invalid diamond amount';
  END IF;

  UPDATE public.profiles
  SET diamonds = profiles.diamonds - p_diamonds_to_spend,
      sandbits = profiles.sandbits + (p_diamonds_to_spend * 50)
  WHERE id = v_uid
    AND profiles.diamonds >= p_diamonds_to_spend
  RETURNING profiles.diamonds, profiles.sandbits
  INTO diamonds, sandbits;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Insufficient diamonds';
  END IF;

  RETURN NEXT;
END;
$$;

CREATE OR REPLACE FUNCTION public.app_purchase_cosmetic(
  p_item_id TEXT,
  p_type TEXT,
  p_price INT
)
RETURNS TABLE (
  sandbits INT,
  owned_avatars TEXT[],
  owned_backgrounds TEXT[],
  equipped_avatar TEXT,
  equipped_background TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid UUID := auth.uid();
  v_owned BOOLEAN;
  v_expected_price INT;
  v_plus_only BOOLEAN;
  v_subscription_active BOOLEAN;
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;
  IF p_type NOT IN ('avatar', 'background') THEN
    RAISE EXCEPTION 'Invalid cosmetic type';
  END IF;
  IF p_item_id IS NULL OR p_item_id !~ '^(avatar|bg)_[a-z0-9_]{1,50}$' THEN
    RAISE EXCEPTION 'Invalid cosmetic id';
  END IF;

  SELECT expected_price, plus_only
  INTO v_expected_price, v_plus_only
  FROM (
    VALUES
      ('avatar_default', 0, false),
      ('avatar_afroplus', 0, true),
      ('avatar_afroplus_f', 0, true),
      ('avatar_warrior', 200, false),
      ('avatar_scholar', 150, false),
      ('avatar_chief', 350, false),
      ('avatar_griot', 250, false),
      ('avatar_hunter', 300, false),
      ('bg_default', 0, false),
      ('bg_savanna', 300, false),
      ('bg_market', 250, false),
      ('bg_night', 400, false),
      ('bg_forest', 200, false),
      ('bg_ocean', 350, false),
      ('bg_cloudy', 275, false)
  ) AS catalog(item_id, expected_price, plus_only)
  WHERE item_id = p_item_id;

  IF v_expected_price IS NULL THEN
    RAISE EXCEPTION 'Unknown cosmetic';
  END IF;
  IF p_price <> v_expected_price THEN
    RAISE EXCEPTION 'Invalid price';
  END IF;

  SELECT subscription_active
  INTO v_subscription_active
  FROM public.profiles
  WHERE id = v_uid;

  IF v_plus_only AND NOT v_subscription_active THEN
    RAISE EXCEPTION 'Plus subscription required';
  END IF;

  IF p_type = 'avatar' THEN
    SELECT p_item_id = ANY(profiles.owned_avatars) INTO v_owned
    FROM public.profiles
    WHERE id = v_uid;

    IF v_owned THEN
      UPDATE public.profiles
      SET equipped_avatar = p_item_id
      WHERE id = v_uid;
    ELSE
      UPDATE public.profiles
      SET sandbits = profiles.sandbits - p_price,
          owned_avatars = profiles.owned_avatars || p_item_id,
          equipped_avatar = p_item_id
      WHERE id = v_uid
        AND profiles.sandbits >= p_price;
    END IF;
  ELSE
    SELECT p_item_id = ANY(profiles.owned_backgrounds) INTO v_owned
    FROM public.profiles
    WHERE id = v_uid;

    IF v_owned THEN
      UPDATE public.profiles
      SET equipped_background = p_item_id
      WHERE id = v_uid;
    ELSE
      UPDATE public.profiles
      SET sandbits = profiles.sandbits - p_price,
          owned_backgrounds = profiles.owned_backgrounds || p_item_id,
          equipped_background = p_item_id
      WHERE id = v_uid
        AND profiles.sandbits >= p_price;
    END IF;
  END IF;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Insufficient sandbits';
  END IF;

  RETURN QUERY
  SELECT p.sandbits, p.owned_avatars, p.owned_backgrounds, p.equipped_avatar, p.equipped_background
  FROM public.profiles p
  WHERE p.id = v_uid;
END;
$$;

CREATE OR REPLACE FUNCTION public.app_equip_cosmetic(
  p_item_id TEXT,
  p_type TEXT
)
RETURNS TABLE (equipped_avatar TEXT, equipped_background TEXT)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid UUID := auth.uid();
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;
  IF p_type = 'avatar' THEN
    UPDATE public.profiles
    SET equipped_avatar = p_item_id
    WHERE id = v_uid
      AND (p_item_id = ANY(owned_avatars) OR (subscription_active AND p_item_id IN ('avatar_afroplus', 'avatar_afroplus_f')));
  ELSIF p_type = 'background' THEN
    UPDATE public.profiles
    SET equipped_background = p_item_id
    WHERE id = v_uid
      AND p_item_id = ANY(owned_backgrounds);
  ELSE
    RAISE EXCEPTION 'Invalid cosmetic type';
  END IF;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Cosmetic is not owned';
  END IF;

  RETURN QUERY
  SELECT p.equipped_avatar, p.equipped_background
  FROM public.profiles p
  WHERE p.id = v_uid;
END;
$$;

CREATE OR REPLACE FUNCTION public.app_add_weekly_xp(
  p_league TEXT,
  p_gained_xp INT,
  p_week_id TEXT
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid UUID := auth.uid();
  v_username TEXT;
  v_subscribed BOOLEAN;
  v_multiplier FLOAT;
  v_total_xp INT;
  v_profile_xp INT;
  v_existing_weekly_xp INT;
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;
  IF p_league NOT IN ('Copper', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Stars') THEN
    RAISE EXCEPTION 'Invalid league';
  END IF;
  IF p_gained_xp < 0 OR p_gained_xp > 60 THEN
    RAISE EXCEPTION 'Invalid XP amount';
  END IF;
  IF p_week_id IS NULL OR p_week_id !~ '^[0-9]{4}-W[0-9]{1,2}$' THEN
    RAISE EXCEPTION 'Invalid week id';
  END IF;

  SELECT username, subscription_active, xp
  INTO v_username, v_subscribed, v_profile_xp
  FROM public.profiles
  WHERE id = v_uid;

  v_multiplier := CASE WHEN v_subscribed THEN 1.42 ELSE 1 END;
  v_total_xp := FLOOR(p_gained_xp * v_multiplier);

  SELECT COALESCE(xp, 0)
  INTO v_existing_weekly_xp
  FROM public.leaderboard
  WHERE user_id = v_uid
    AND week_id = p_week_id;

  v_existing_weekly_xp := COALESCE(v_existing_weekly_xp, 0);

  IF v_existing_weekly_xp + v_total_xp > v_profile_xp * 2 THEN
    RAISE EXCEPTION 'Weekly XP exceeds verified profile XP';
  END IF;

  INSERT INTO public.leaderboard (user_id, username, xp, league, subscribed, multiplier, week_id, updated_at)
  VALUES (v_uid, COALESCE(v_username, 'User'), v_total_xp, p_league, v_subscribed, v_multiplier, p_week_id, NOW())
  ON CONFLICT (user_id, week_id) DO UPDATE
    SET xp = public.leaderboard.xp + v_total_xp,
        username = COALESCE(v_username, public.leaderboard.username),
        league = p_league,
        subscribed = v_subscribed,
        multiplier = v_multiplier,
        updated_at = NOW();
END;
$$;

GRANT EXECUTE ON FUNCTION public.app_complete_lesson(TEXT, TEXT, INT, INT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.app_update_hearts(INT, BIGINT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.app_update_username(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.app_convert_diamonds_to_sandbits(INT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.app_purchase_cosmetic(TEXT, TEXT, INT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.app_equip_cosmetic(TEXT, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.app_add_weekly_xp(TEXT, INT, TEXT) TO authenticated;
