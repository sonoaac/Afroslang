import { supabase } from '../lib/supabase';
import { HeartsData } from './heartsTimer';

export interface UserData {
  username: string;
  email: string;
  hearts: number;
  heartsData?: HeartsData;
  xp: number;
  sandbits?: number;
  diamonds?: number;
  ownedAvatars?: string[];
  ownedBackgrounds?: string[];
  equippedAvatar?: string;
  equippedBackground?: string;
  subscription: {
    active: boolean;
    plan: string | null;
    stripeSubId?: string | null;
    renewsAt?: number | null;
    stripeCustomerId?: string | null;
    pastDue?: boolean;
  };
  createdAt: string;
  languages: Record<string, { completedLessons: string[]; xp: number; hearts: number }>;
}

// ── Row shape from Supabase profiles table ────────────────────────────────
interface ProfileRow {
  id: string;
  username: string;
  email: string;
  hearts: number;
  xp: number;
  sandbits: number;
  diamonds: number;
  owned_avatars: string[];
  owned_backgrounds: string[];
  equipped_avatar: string;
  equipped_background: string;
  subscription_active: boolean;
  subscription_plan: string | null;
  stripe_sub_id: string | null;
  stripe_customer_id: string | null;
  renews_at: number | null;
  past_due: boolean;
  hearts_current: number;
  hearts_last_reset: number;
  hearts_max: number;
  created_at: string;
}

interface ProgressRow {
  language_id: string;
  completed_lessons: string[];
  xp: number;
  hearts: number;
}

function rowToUserData(row: ProfileRow, progress: ProgressRow[]): UserData {
  const languages: UserData['languages'] = {};
  for (const p of progress) {
    languages[p.language_id] = {
      completedLessons: p.completed_lessons,
      xp: p.xp,
      hearts: p.hearts,
    };
  }
  return {
    username: row.username,
    email: row.email,
    hearts: row.hearts,
    heartsData: {
      currentHearts: row.hearts_current,
      lastResetTime: row.hearts_last_reset,
      maxHearts: row.hearts_max,
    },
    xp: row.xp,
    sandbits: row.sandbits,
    diamonds: row.diamonds,
    ownedAvatars: row.owned_avatars,
    ownedBackgrounds: row.owned_backgrounds,
    equippedAvatar: row.equipped_avatar,
    equippedBackground: row.equipped_background,
    subscription: {
      active: row.subscription_active,
      plan: row.subscription_plan,
      stripeSubId: row.stripe_sub_id,
      renewsAt: row.renews_at,
      stripeCustomerId: row.stripe_customer_id,
      pastDue: row.past_due,
    },
    createdAt: row.created_at,
    languages,
  };
}

export const loadUserData = async (uid: string): Promise<UserData | null> => {
  const [{ data: profile, error }, { data: progress }] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', uid).single(),
    supabase.from('language_progress').select('language_id,completed_lessons,xp,hearts').eq('user_id', uid),
  ]);
  if (error || !profile) return null;
  return rowToUserData(profile as ProfileRow, (progress ?? []) as ProgressRow[]);
};

export const updateUserData = async (uid: string, data: Partial<UserData>): Promise<void> => {
  const update: Record<string, unknown> = {};
  if (data.hearts       !== undefined) update.hearts       = data.hearts;
  if (data.xp           !== undefined) update.xp           = data.xp;
  if (data.sandbits     !== undefined) update.sandbits     = data.sandbits;
  if (data.diamonds     !== undefined) update.diamonds     = data.diamonds;
  if (data.equippedAvatar     !== undefined) update.equipped_avatar     = data.equippedAvatar;
  if (data.equippedBackground !== undefined) update.equipped_background = data.equippedBackground;
  if (data.ownedAvatars       !== undefined) update.owned_avatars       = data.ownedAvatars;
  if (data.ownedBackgrounds   !== undefined) update.owned_backgrounds   = data.ownedBackgrounds;
  if (data.subscription) {
    update.subscription_active    = data.subscription.active;
    update.subscription_plan      = data.subscription.plan;
    update.stripe_sub_id          = data.subscription.stripeSubId ?? null;
    update.stripe_customer_id     = data.subscription.stripeCustomerId ?? null;
    update.renews_at              = data.subscription.renewsAt ?? null;
    update.past_due               = data.subscription.pastDue ?? false;
  }
  if (data.heartsData) {
    update.hearts_current     = data.heartsData.currentHearts;
    update.hearts_last_reset  = data.heartsData.lastResetTime;
    update.hearts_max         = data.heartsData.maxHearts;
  }
  if (Object.keys(update).length === 0) return;
  await supabase.from('profiles').update(update).eq('id', uid);
};

export const saveUserProgress = async (
  uid: string,
  languageId: string,
  lessonId: string,
  xpGained: number,
  heartsLost: number,
): Promise<void> => {
  // Upsert language progress row
  const { data: existing } = await supabase
    .from('language_progress')
    .select('completed_lessons,xp,hearts')
    .eq('user_id', uid)
    .eq('language_id', languageId)
    .single();

  const prev = existing as ProgressRow | null;
  const completedLessons = prev?.completed_lessons ?? [];
  const newLessons = completedLessons.includes(lessonId) ? completedLessons : [...completedLessons, lessonId];

  await Promise.all([
    supabase.from('language_progress').upsert({
      user_id: uid,
      language_id: languageId,
      completed_lessons: newLessons,
      xp: (prev?.xp ?? 0) + xpGained,
      hearts: Math.max(0, (prev?.hearts ?? 5) - heartsLost),
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id,language_id' }),
    supabase.rpc('increment_user_xp_hearts', {
      p_uid: uid,
      p_xp: xpGained,
      p_hearts_lost: heartsLost,
    }),
  ]);
};

export const createGuestUser = (): UserData => ({
  username: 'Guest',
  email: '',
  hearts: 5,
  xp: 0,
  sandbits: 0,
  diamonds: 0,
  ownedAvatars: ['avatar_default'],
  ownedBackgrounds: ['bg_default'],
  equippedAvatar: 'avatar_default',
  equippedBackground: 'bg_default',
  subscription: { active: false, plan: null },
  createdAt: new Date().toISOString(),
  languages: {},
});

export const saveGuestProgress = (progress: UserData): void => {
  localStorage.setItem('afroslang_guest_progress', JSON.stringify(progress));
};

export const loadGuestProgress = (): UserData | null => {
  try {
    const saved = localStorage.getItem('afroslang_guest_progress');
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};
