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
  void uid;
  if (data.username === undefined) return;
  const { error } = await supabase.rpc('app_update_username', {
    p_username: data.username,
  });
  if (error) throw error;
};

export const saveUserProgress = async (
  uid: string,
  languageId: string,
  lessonId: string,
  xpGained: number,
  heartsLost: number,
): Promise<boolean> => {
  void uid;
  const { data, error } = await supabase.rpc('app_complete_lesson', {
    p_language_id: languageId,
    p_lesson_id: lessonId,
    p_xp_gained: xpGained,
    p_hearts_lost: heartsLost,
  });
  if (error) throw error;
  return data === true;
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
