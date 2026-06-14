import { supabase } from '../lib/supabase';
import { logger } from './logger';

export const LEAGUES = ['Copper', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Stars'] as const;
export type League = typeof LEAGUES[number];

export const LEAGUE_CONFIG: Record<League, { color: string; icon: string; gradient: string }> = {
  Copper:   { color: '#CD7F32', icon: '🥉', gradient: 'from-amber-600 to-orange-500' },
  Bronze:   { color: '#CD7F32', icon: '🥉', gradient: 'from-amber-500 to-yellow-600' },
  Silver:   { color: '#C0C0C0', icon: '🥈', gradient: 'from-gray-300 to-gray-400' },
  Gold:     { color: '#FFD700', icon: '🥇', gradient: 'from-yellow-400 to-yellow-500' },
  Platinum: { color: '#E5E4E2', icon: '💎', gradient: 'from-gray-200 to-gray-300' },
  Diamond:  { color: '#B9F2FF', icon: '💎', gradient: 'from-blue-300 to-cyan-400' },
  Stars:    { color: '#FFD700', icon: '⭐', gradient: 'from-yellow-300 to-yellow-400' },
};

export function getCurrentWeekId(): string {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const days = Math.floor((now.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));
  const week = Math.ceil((days + startOfYear.getDay() + 1) / 7);
  return `${now.getFullYear()}-W${week}`;
}

export function getNextWeekId(): string {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const days = Math.floor((now.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));
  const week = Math.ceil((days + startOfYear.getDay() + 1) / 7) + 1;
  return `${now.getFullYear()}-W${week}`;
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  xp: number;
  league: League;
  subscribed: boolean;
  multiplier: number;
  rank?: number;
  updatedAt: Date;
}

export async function addWeeklyXP(
  userId: string,
  league: League,
  username: string,
  gainedXP: number,
  isSubscribed: boolean,
  weekId: string,
): Promise<void> {
  try {
    void userId;
    void username;
    void isSubscribed;
    const { error } = await supabase.rpc('app_add_weekly_xp', {
      p_league: league,
      p_gained_xp: gainedXP,
      p_week_id: weekId,
    });
    if (error) throw error;
  } catch (error) {
    logger.error('Error adding weekly XP:', error);
    throw error;
  }
}

// Kept for API compatibility — week ID is computed locally now
export async function getCurrentWeekIdFromDB(): Promise<string> {
  return getCurrentWeekId();
}

export async function getLeaderboard(league: League, weekId: string): Promise<LeaderboardEntry[]> {
  try {
    const { data, error } = await supabase
      .from('leaderboard')
      .select('user_id,username,xp,league,subscribed,multiplier,updated_at')
      .eq('league', league)
      .eq('week_id', weekId)
      .order('xp', { ascending: false });

    if (error || !data) return [];
    return data.map((row, i) => ({
      userId: row.user_id,
      username: row.username,
      xp: row.xp,
      league: row.league as League,
      subscribed: row.subscribed,
      multiplier: row.multiplier,
      rank: i + 1,
      updatedAt: new Date(row.updated_at),
    }));
  } catch (error) {
    logger.error('Error getting leaderboard:', error);
    return [];
  }
}

export async function getUserLeague(userId: string, weekId: string): Promise<League | null> {
  try {
    const { data } = await supabase
      .from('leaderboard')
      .select('league')
      .eq('user_id', userId)
      .eq('week_id', weekId)
      .single();
    return (data?.league as League) ?? null;
  } catch {
    return null;
  }
}

export async function getUserLeaderboardEntry(userId: string, weekId: string): Promise<LeaderboardEntry | null> {
  try {
    const { data } = await supabase
      .from('leaderboard')
      .select('user_id,username,xp,league,subscribed,multiplier,updated_at')
      .eq('user_id', userId)
      .eq('week_id', weekId)
      .single();
    if (!data) return null;
    return {
      userId: data.user_id,
      username: data.username,
      xp: data.xp,
      league: data.league as League,
      subscribed: data.subscribed,
      multiplier: data.multiplier,
      updatedAt: new Date(data.updated_at),
    };
  } catch {
    return null;
  }
}

export async function resetWeeklyLeaderboard(): Promise<void> {
  throw new Error('Weekly leaderboard resets must run from a trusted backend job.');
}
