import { supabase } from '../lib/supabase';
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
    paymentLink: 'https://buy.stripe.com/6oU00k3jm8Js9NMdQvdjO07',
  },
  {
    id: 'diamonds_5',
    diamonds: 5,
    price: 4.99,
    label: '5 Diamonds',
    highlight: true,
    paymentLink: 'https://buy.stripe.com/9B600kg68e3M1hgh2HdjO08',
  },
  {
    id: 'diamonds_10',
    diamonds: 10,
    price: 9.99,
    label: '10 Diamonds',
    paymentLink: 'https://buy.stripe.com/7sYcN61bee3MbVU13JdjO09',
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
  { id: 'bg_default',   name: 'Classic Dark',   emoji: '🌑',  price: 0 },
  { id: 'bg_glow',      name: 'Midnight Glow',  emoji: '✨',  price: 200 },
  { id: 'bg_savanna',   name: 'Savanna',         emoji: '🌅',  price: 300 },
  { id: 'bg_market',    name: 'Night Market',    emoji: '🏮',  price: 250 },
  { id: 'bg_night',     name: 'Night Sky',       emoji: '🌃',  price: 400 },
  { id: 'bg_forest',    name: 'Deep Forest',     emoji: '🌿',  price: 200 },
  { id: 'bg_ocean',     name: 'Ocean Blue',      emoji: '🌊',  price: 350 },
  { id: 'bg_cloudy',    name: 'Storm Clouds',    emoji: '⛈️',  price: 275 },
];

/** CSS gradient for each background ID, applied to the app root. */
export function getBackgroundStyle(bgId: string | undefined): string {
  switch (bgId) {
    case 'bg_glow':  // same CSS base as classic dark; GlCanvas renders on top
      return 'radial-gradient(1200px 600px at 25% 20%, rgba(176,0,32,0.35) 0%, rgba(0,0,0,0) 60%), linear-gradient(135deg,#000000 0%,#120007 55%,#000000 100%)';
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
    default: // bg_default — Classic Dark (static, no canvas animation)
      return 'linear-gradient(135deg, #000000 0%, #0a0005 50%, #000000 100%)';
  }
}

/** Equip an already-owned cosmetic item without spending currency. */
export async function equipCosmetic(
  userId: string,
  itemId: string,
  type: 'avatar' | 'background',
): Promise<Partial<UserData>> {
  const key = type === 'avatar' ? 'equippedAvatar'  : 'equippedBackground';
  void userId;
  const { error } = await supabase.rpc('app_equip_cosmetic', {
    p_item_id: itemId,
    p_type: type,
  });
  if (error) throw error;
  return { [key]: itemId };
}

// ── 2× XP — Plus perk only (not a purchasable item) ───────────────────────
/** Returns true if the user has an active AfroPlus subscription. */
export function isXpBoostActive(userData: UserData | null): boolean {
  return userData?.subscription?.active === true;
}

// ── Firestore mutations ────────────────────────────────────────────────────

/** Award Sandbit leaderboard reward to a user. */
export async function awardLeaderboardSandbits(userId: string, rank: 1 | 2 | 3): Promise<void> {
  void userId;
  void rank;
  throw new Error('Leaderboard rewards must be awarded by a trusted backend job.');
}

/** Convert diamonds → sandbits (1 diamond = 50 SB). */
export async function convertDiamondsToSandbits(
  userId: string,
  _userData: UserData,
  diamondsToSpend: number,
): Promise<Partial<UserData> | null> {
  if (diamondsToSpend < 1) return null;
  void userId;
  void _userData;
  const { data, error } = await supabase.rpc('app_convert_diamonds_to_sandbits', {
    p_diamonds_to_spend: diamondsToSpend,
  });
  if (error || !data?.[0]) return null;
  return { diamonds: data[0].diamonds, sandbits: data[0].sandbits };
}

/** Purchase a cosmetic (avatar or background) with sandbits. */
export async function purchaseCosmetic(
  userId: string,
  _userData: UserData,
  item: CosmeticItem,
  type: 'avatar' | 'background',
): Promise<Partial<UserData> | null> {
  const ownedKey    = type === 'avatar' ? 'ownedAvatars'       : 'ownedBackgrounds';
  const equippedKey = type === 'avatar' ? 'equippedAvatar'     : 'equippedBackground';
  void userId;
  void _userData;
  const { data, error } = await supabase.rpc('app_purchase_cosmetic', {
    p_item_id: item.id,
    p_type: type,
    p_price: item.price,
  });
  if (error || !data?.[0]) return null;
  const row = data[0];
  return {
    sandbits: row.sandbits,
    [ownedKey]: type === 'avatar' ? row.owned_avatars : row.owned_backgrounds,
    [equippedKey]: type === 'avatar' ? row.equipped_avatar : row.equipped_background,
  };
}

// Only redirect to known Stripe payment origins
const STRIPE_PAYMENT_ORIGINS = new Set(['https://buy.stripe.com', 'https://checkout.stripe.com']);

/** Redirect user to buy a diamond pack via Stripe. */
export function buyDiamondPack(pack: typeof DIAMOND_PACKS[number], userId: string, userEmail: string): void {
  let dest: URL;
  try {
    dest = new URL(pack.paymentLink);
  } catch {
    console.error('Invalid payment link URL for pack:', pack.id);
    return;
  }
  if (!STRIPE_PAYMENT_ORIGINS.has(dest.origin)) {
    console.error('Blocked redirect to unexpected payment origin:', dest.origin);
    return;
  }
  const returnUrl = `${window.location.origin}?diamonds_success=1`;
  const url = `${pack.paymentLink}?client_reference_id=${encodeURIComponent(userId)}&prefilled_email=${encodeURIComponent(userEmail)}&redirect_url=${encodeURIComponent(returnUrl)}`;
  window.location.href = url;
}
