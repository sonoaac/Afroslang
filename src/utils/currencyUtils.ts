import { doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../firebase';
import { UserData } from './userData';

// ── Leaderboard weekly Sandbit rewards ────────────────────────────────────
export const LEADERBOARD_REWARDS: Record<1 | 2 | 3, number> = {
  1: 100,
  2: 50,
  3: 25,
};

// ── Diamond conversion ─────────────────────────────────────────────────────
export const SANDBITS_PER_DIAMOND = 50; // 1 diamond → 50 SB

// ── Diamond packs (real money via Stripe) ─────────────────────────────────
// Set paymentLink to your Stripe Payment Link URLs.
// Each link must be set up as a one-time payment product in Stripe Dashboard.
// Pass ?client_reference_id=UID when redirecting so the webhook knows the user.
export const DIAMOND_PACKS = [
  {
    id: 'diamonds_1',
    diamonds: 1,
    price: 1.99,
    label: '1 Diamond',
    paymentLink: '', // TODO: add Stripe Payment Link URL
  },
  {
    id: 'diamonds_5',
    diamonds: 5,
    price: 4.99,
    label: '5 Diamonds',
    highlight: true,
    paymentLink: '', // TODO: add Stripe Payment Link URL
  },
  {
    id: 'diamonds_10',
    diamonds: 10,
    price: 9.99,
    label: '10 Diamonds',
    paymentLink: '', // TODO: add Stripe Payment Link URL
  },
] as const;

// ── Cosmetic catalogue ─────────────────────────────────────────────────────
// Add actual image files to /public/avatars/ and /public/backgrounds/.
// id 'avatar_default' and 'bg_default' are always free and pre-owned.
export interface CosmeticItem {
  id: string;
  name: string;
  emoji: string;
  price: number; // SB cost (0 = free)
  image?: string; // path under /public (optional, falls back to emoji)
  plusOnly?: boolean; // automatically owned by AfroPlus subscribers
}

export const AVATARS: CosmeticItem[] = [
  { id: 'avatar_default',   name: 'Default',    emoji: '🐦',  price: 0,   image: '/Afroslang.png' },
  { id: 'avatar_afroplus',  name: 'AfroPlus',   emoji: '⭐',  price: 0,   image: '/Afroplus.png',  plusOnly: true },
  { id: 'avatar_afroplus_f', name: 'AfroPlus F', emoji: '⭐', price: 0,   image: '/AfroplusF.png', plusOnly: true },
  { id: 'avatar_warrior',   name: 'Warrior',    emoji: '🗡️',  price: 200 },
  { id: 'avatar_scholar',   name: 'Scholar',    emoji: '📚',  price: 150 },
  { id: 'avatar_chief',     name: 'Chief',      emoji: '👑',  price: 350 },
  { id: 'avatar_griot',     name: 'Griot',      emoji: '🎵',  price: 250 },
  { id: 'avatar_hunter',    name: 'Hunter',     emoji: '🏹',  price: 300 },
];

export const BACKGROUNDS: CosmeticItem[] = [
  { id: 'bg_default',   name: 'Sandy Desert',  emoji: '🏜️',  price: 0 },
  { id: 'bg_savanna',   name: 'Savanna',        emoji: '🌅',  price: 300 },
  { id: 'bg_market',    name: 'Night Market',   emoji: '🏮',  price: 250 },
  { id: 'bg_night',     name: 'Night Sky',      emoji: '🌃',  price: 400 },
  { id: 'bg_forest',    name: 'Deep Forest',    emoji: '🌿',  price: 200 },
  { id: 'bg_ocean',     name: 'Ocean Blue',     emoji: '🌊',  price: 350 },
  { id: 'bg_cloudy',   name: 'Storm Clouds',   emoji: '⛈️',  price: 275 },
];

/** CSS gradient for each background ID, applied to the app root. */
export function getBackgroundStyle(bgId: string | undefined): string {
  switch (bgId) {
    case 'bg_savanna':
      return 'linear-gradient(45deg, #8B0000 0%, #c0392b 50%, #e67e22 100%)';
    case 'bg_market':
      return 'radial-gradient(900px 500px at 30% 40%, rgba(220,60,0,0.22) 0%, rgba(0,0,0,0) 60%), linear-gradient(135deg, #0a0000 0%, #1a0505 50%, #050000 100%)';
    case 'bg_night':
      return 'radial-gradient(1200px 800px at 80% 10%, rgba(124,58,237,0.25), transparent 60%), radial-gradient(1000px 700px at 10% 90%, rgba(6,182,212,0.22), transparent 55%), #0b0f14';
    case 'bg_forest':
      return 'hsl(200,40%,18%)';
    case 'bg_ocean':
      return 'linear-gradient(180deg, #1a8aaa 0%, #0d4a6a 50%, #0a1e2a 100%)';
    case 'bg_cloudy':
      return 'linear-gradient(0deg, #3a6fa8 0%, #1a5099 50%, #053780 100%)';
    default: // bg_default — Sandy Desert (current default dark warm)
      return 'radial-gradient(1200px 600px at 25% 20%, rgba(176, 0, 32, 0.35) 0%, rgba(0,0,0,0) 60%), linear-gradient(135deg, #000000 0%, #120007 55%, #000000 100%)';
  }
}

/** Equip an already-owned cosmetic item without spending currency. */
export async function equipCosmetic(
  userId: string,
  itemId: string,
  type: 'avatar' | 'background',
): Promise<Partial<UserData>> {
  const equippedKey = type === 'avatar' ? 'equippedAvatar' : 'equippedBackground';
  await updateDoc(doc(db, 'users', userId), { [equippedKey]: itemId });
  return { [equippedKey]: itemId };
}

// ── 2× XP — Plus perk only (not a purchasable item) ───────────────────────
/** Returns true if the user has an active AfroPlus subscription. */
export function isXpBoostActive(userData: UserData | null): boolean {
  return userData?.subscription?.active === true;
}

// ── Firestore mutations ────────────────────────────────────────────────────

/** Award Sandbit leaderboard reward to a user. */
export async function awardLeaderboardSandbits(userId: string, rank: 1 | 2 | 3): Promise<void> {
  const amount = LEADERBOARD_REWARDS[rank];
  await updateDoc(doc(db, 'users', userId), { sandbits: increment(amount) });
}

/** Convert diamonds → sandbits (1 diamond = 50 SB). */
export async function convertDiamondsToSandbits(
  userId: string,
  userData: UserData,
  diamondsToSpend: number,
): Promise<Partial<UserData> | null> {
  const currentDiamonds = userData.diamonds ?? 0;
  if (currentDiamonds < diamondsToSpend || diamondsToSpend < 1) return null;

  const sandbitsGained = diamondsToSpend * SANDBITS_PER_DIAMOND;
  const newDiamonds = currentDiamonds - diamondsToSpend;
  const newSandbits = (userData.sandbits ?? 0) + sandbitsGained;

  await updateDoc(doc(db, 'users', userId), {
    diamonds: newDiamonds,
    sandbits: newSandbits,
  });

  return { diamonds: newDiamonds, sandbits: newSandbits };
}

/** Purchase a cosmetic (avatar or background) with sandbits. */
export async function purchaseCosmetic(
  userId: string,
  userData: UserData,
  item: CosmeticItem,
  type: 'avatar' | 'background',
): Promise<Partial<UserData> | null> {
  const currentSandbits = userData.sandbits ?? 0;
  if (currentSandbits < item.price) return null;

  const ownedKey = type === 'avatar' ? 'ownedAvatars' : 'ownedBackgrounds';
  const equippedKey = type === 'avatar' ? 'equippedAvatar' : 'equippedBackground';
  const currentOwned: string[] = (userData as any)[ownedKey] ?? [];

  if (currentOwned.includes(item.id)) {
    // Already owned — just equip it (free)
    await updateDoc(doc(db, 'users', userId), { [equippedKey]: item.id });
    return { [equippedKey]: item.id };
  }

  const newSandbits = currentSandbits - item.price;
  const newOwned = [...currentOwned, item.id];
  await updateDoc(doc(db, 'users', userId), {
    sandbits: newSandbits,
    [ownedKey]: newOwned,
    [equippedKey]: item.id,
  });

  return { sandbits: newSandbits, [ownedKey]: newOwned, [equippedKey]: item.id };
}

/** Redirect user to buy a diamond pack via Stripe. */
export function buyDiamondPack(pack: typeof DIAMOND_PACKS[number], userId: string, userEmail: string): void {
  if (!pack.paymentLink) {
    // eslint-disable-next-line no-console
    console.warn('Diamond payment link not configured for pack:', pack.id);
    return;
  }
  const returnUrl = `${window.location.origin}?diamonds_success=1&pack=${pack.diamonds}`;
  const url = `${pack.paymentLink}?client_reference_id=${encodeURIComponent(userId)}&prefilled_email=${encodeURIComponent(userEmail)}&redirect_url=${encodeURIComponent(returnUrl)}`;
  window.location.href = url;
}
