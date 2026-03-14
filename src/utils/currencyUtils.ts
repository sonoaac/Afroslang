import { doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../firebase';
import { UserData } from './userData';

// ── Gem earning constants ──────────────────────────────────────────────
export const GEMS_PER_LESSON       = 5;   // base reward per completed lesson
export const GEMS_PERFECT_BONUS    = 10;  // no hearts lost during lesson
export const GEMS_FIRST_TIME_BONUS = 5;   // first time completing this lesson

// ── Shop costs ─────────────────────────────────────────────────────────
export const COST_HEARTS_REFILL  = 100;  // gems  → refill all 5 hearts
export const COST_SANDBITS_PACK  = 250;  // gems  → +500 sandbits
export const COST_XP_BOOST       = 150;  // sandbits → 2× XP for 1 hour

export const XP_BOOST_DURATION_MS = 60 * 60 * 1000; // 1 hour in ms

/** How many gems are earned for completing a lesson. */
export function calcGemsEarned(heartsLost: number, isFirstTime: boolean): number {
  let gems = GEMS_PER_LESSON;
  if (heartsLost === 0)  gems += GEMS_PERFECT_BONUS;
  if (isFirstTime)       gems += GEMS_FIRST_TIME_BONUS;
  return gems;
}

/** Whether the XP boost is currently active. */
export function isXpBoostActive(userData: UserData | null): boolean {
  if (!userData?.xpBoostExpiry) return false;
  return Date.now() < userData.xpBoostExpiry;
}

/** Remaining XP boost time in ms (0 if inactive). */
export function xpBoostRemainingMs(userData: UserData | null): number {
  if (!userData?.xpBoostExpiry) return 0;
  return Math.max(0, userData.xpBoostExpiry - Date.now());
}

/**
 * Award gems to a user after lesson completion.
 * Firestore increment — local state is handled by the caller.
 */
export async function awardGems(userId: string, gems: number): Promise<void> {
  const ref = doc(db, 'users', userId);
  await updateDoc(ref, { gems: increment(gems) });
}

/**
 * Purchase: refill all 5 hearts using gems.
 * Returns the updated fields on success, null if insufficient gems.
 */
export async function purchaseHeartsRefill(
  userId: string,
  userData: UserData,
): Promise<Partial<UserData> | null> {
  const currentGems = userData.gems ?? 0;
  if (currentGems < COST_HEARTS_REFILL) return null;

  const newGems = currentGems - COST_HEARTS_REFILL;
  const ref = doc(db, 'users', userId);
  await updateDoc(ref, {
    gems: newGems,
    hearts: 5,
    'heartsData.currentHearts': 5,
  });

  return { gems: newGems, hearts: 5 };
}

/**
 * Purchase: +500 sandbits pack using gems.
 * Returns the updated fields on success, null if insufficient gems.
 */
export async function purchaseSandbitsPack(
  userId: string,
  userData: UserData,
): Promise<Partial<UserData> | null> {
  const currentGems = userData.gems ?? 0;
  if (currentGems < COST_SANDBITS_PACK) return null;

  const newGems     = currentGems - COST_SANDBITS_PACK;
  const newSandbits = (userData.sandbits ?? 0) + 500;
  const ref = doc(db, 'users', userId);
  await updateDoc(ref, { gems: newGems, sandbits: newSandbits });

  return { gems: newGems, sandbits: newSandbits };
}

/**
 * Purchase: 2× XP Boost for 1 hour using sandbits.
 * Returns the updated fields on success, null if insufficient sandbits.
 */
export async function purchaseXpBoost(
  userId: string,
  userData: UserData,
): Promise<Partial<UserData> | null> {
  const currentSandbits = userData.sandbits ?? 0;
  if (currentSandbits < COST_XP_BOOST) return null;

  const newSandbits  = currentSandbits - COST_XP_BOOST;
  const xpBoostExpiry = Date.now() + XP_BOOST_DURATION_MS;
  const ref = doc(db, 'users', userId);
  await updateDoc(ref, { sandbits: newSandbits, xpBoostExpiry });

  return { sandbits: newSandbits, xpBoostExpiry };
}
