import { supabase } from '../lib/supabase';
import { logger } from './logger';

export interface HeartsData {
  currentHearts: number;
  lastResetTime: number;
  maxHearts: number;
}

export const HEARTS_REFILL_HOURS = 5;
export const MAX_HEARTS = 5;
export const HEARTS_RESET_HOURS = HEARTS_REFILL_HOURS;

export const calculateHeartsFromTime = (lastResetTime: number, currentTime: number = Date.now()): number => {
  const hoursElapsed = (currentTime - lastResetTime) / (1000 * 60 * 60);
  return Math.min(Math.floor(hoursElapsed / HEARTS_REFILL_HOURS), MAX_HEARTS);
};

export const getCurrentHeartsStatus = async (userId: string): Promise<HeartsData> => {
  try {
    const { data } = await supabase
      .from('profiles')
      .select('hearts_current,hearts_last_reset,hearts_max')
      .eq('id', userId)
      .single();

    if (data) {
      const heartsData: HeartsData = {
        currentHearts: data.hearts_current,
        lastResetTime: data.hearts_last_reset,
        maxHearts: data.hearts_max,
      };
      const now = Date.now();
      const toRestore = calculateHeartsFromTime(heartsData.lastResetTime, now);
      if (toRestore > 0 && heartsData.currentHearts < MAX_HEARTS) {
        const newHearts = Math.min(heartsData.currentHearts + toRestore, MAX_HEARTS);
        const updated: HeartsData = { currentHearts: newHearts, lastResetTime: now, maxHearts: MAX_HEARTS };
        await supabase.from('profiles').update({
          hearts: newHearts,
          hearts_current: newHearts,
          hearts_last_reset: now,
        }).eq('id', userId);
        return updated;
      }
      return heartsData;
    }

    const initial: HeartsData = { currentHearts: MAX_HEARTS, lastResetTime: Date.now(), maxHearts: MAX_HEARTS };
    await supabase.from('profiles').update({
      hearts: MAX_HEARTS,
      hearts_current: MAX_HEARTS,
      hearts_last_reset: initial.lastResetTime,
    }).eq('id', userId);
    return initial;
  } catch (error) {
    logger.error('Error getting hearts status:', error);
    return { currentHearts: MAX_HEARTS, lastResetTime: Date.now(), maxHearts: MAX_HEARTS };
  }
};

export const updateHearts = async (userId: string, heartsLost: number): Promise<HeartsData> => {
  try {
    const { data } = await supabase
      .from('profiles')
      .select('hearts_current,hearts_last_reset,hearts_max')
      .eq('id', userId)
      .single();

    const current: HeartsData = data
      ? { currentHearts: data.hearts_current, lastResetTime: data.hearts_last_reset, maxHearts: data.hearts_max }
      : { currentHearts: MAX_HEARTS, lastResetTime: Date.now(), maxHearts: MAX_HEARTS };

    const newHearts = Math.max(0, current.currentHearts - heartsLost);
    const updated: HeartsData = { ...current, currentHearts: newHearts };
    await supabase.from('profiles').update({
      hearts: newHearts,
      hearts_current: newHearts,
    }).eq('id', userId);
    return updated;
  } catch (error) {
    logger.error('Error updating hearts:', error);
    return { currentHearts: MAX_HEARTS, lastResetTime: Date.now(), maxHearts: MAX_HEARTS };
  }
};

export const getTimeUntilNextReset = (lastResetTime: number): number => {
  const elapsed = Date.now() - lastResetTime;
  const hoursElapsed = elapsed / (1000 * 60 * 60);
  const restored = Math.floor(hoursElapsed / HEARTS_REFILL_HOURS);
  return Math.max(0, ((restored + 1) * HEARTS_REFILL_HOURS * 3_600_000) - elapsed);
};

export const formatTimeRemaining = (milliseconds: number): string => {
  const hours   = Math.floor(milliseconds / (1000 * 60 * 60));
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
  if (hours   > 0) return `${hours}h ${minutes}m ${seconds}s`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
};

// ── Guest hearts (localStorage only — unchanged) ─────────────────────────
function parseGuestHeartsData(raw: unknown): HeartsData {
  const now = Date.now();
  const obj = typeof raw === 'object' && raw !== null ? (raw as Record<string, unknown>) : {};
  return {
    currentHearts: Math.min(Math.max(0, Math.floor(Number(obj.currentHearts) || 0)), MAX_HEARTS),
    lastResetTime: typeof obj.lastResetTime === 'number' && obj.lastResetTime <= now ? obj.lastResetTime : now,
    maxHearts: MAX_HEARTS,
  };
}

export const getGuestHeartsStatus = (): HeartsData => {
  try {
    const saved = localStorage.getItem('afroslang_guest_hearts');
    if (saved) {
      const heartsData = parseGuestHeartsData(JSON.parse(saved));
      const now = Date.now();
      const toRestore = calculateHeartsFromTime(heartsData.lastResetTime, now);
      if (toRestore > 0 && heartsData.currentHearts < MAX_HEARTS) {
        const updated: HeartsData = {
          currentHearts: Math.min(heartsData.currentHearts + toRestore, MAX_HEARTS),
          lastResetTime: now,
          maxHearts: MAX_HEARTS,
        };
        localStorage.setItem('afroslang_guest_hearts', JSON.stringify(updated));
        return updated;
      }
      localStorage.setItem('afroslang_guest_hearts', JSON.stringify(heartsData));
      return heartsData;
    }
  } catch (error) {
    logger.error('Error loading guest hearts:', error);
  }
  const initial: HeartsData = { currentHearts: MAX_HEARTS, lastResetTime: Date.now(), maxHearts: MAX_HEARTS };
  localStorage.setItem('afroslang_guest_hearts', JSON.stringify(initial));
  return initial;
};

export const updateGuestHearts = (heartsLost: number): HeartsData => {
  try {
    const saved = localStorage.getItem('afroslang_guest_hearts');
    const data = saved
      ? parseGuestHeartsData(JSON.parse(saved))
      : { currentHearts: MAX_HEARTS, lastResetTime: Date.now(), maxHearts: MAX_HEARTS };
    const updated: HeartsData = { ...data, currentHearts: Math.max(0, data.currentHearts - heartsLost) };
    localStorage.setItem('afroslang_guest_hearts', JSON.stringify(updated));
    return updated;
  } catch (error) {
    logger.error('Error updating guest hearts:', error);
    return { currentHearts: MAX_HEARTS, lastResetTime: Date.now(), maxHearts: MAX_HEARTS };
  }
};
