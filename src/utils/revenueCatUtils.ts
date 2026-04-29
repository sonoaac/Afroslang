import { Purchases, LOG_LEVEL } from '@revenuecat/purchases-capacitor';
import { isNativePlatform, getNativePlatform } from './platformUtils';

// ── API keys ────────────────────────────────────────────────────────────────
// Set these in your .env file:
//   VITE_RC_IOS_KEY=appl_xxxxxxxxxxxxx
//   VITE_RC_ANDROID_KEY=goog_xxxxxxxxxxxxx
const _env = (import.meta as any).env ?? {};
const RC_IOS_KEY:     string = _env.VITE_RC_IOS_KEY     ?? '';
const RC_ANDROID_KEY: string = _env.VITE_RC_ANDROID_KEY ?? '';

// ── Product identifiers ─────────────────────────────────────────────────────
// These MUST match exactly what you create in:
//   1. App Store Connect (subscriptions + consumables)
//   2. Google Play Console (subscriptions + in-app products)
//   3. RevenueCat dashboard (products + entitlements + offerings)
export const RC_PRODUCTS = {
  afroplus_monthly: 'com.afroslang.app.afroplus_monthly',
  afroplus_yearly:  'com.afroslang.app.afroplus_yearly',
  diamonds_1:       'com.afroslang.app.diamonds_1',
  diamonds_5:       'com.afroslang.app.diamonds_5',
  diamonds_10:      'com.afroslang.app.diamonds_10',
} as const;

// Maps RC product ID → diamonds granted (must match webhook DIAMOND_MAP below)
export const RC_DIAMONDS_MAP: Record<string, number> = {
  [RC_PRODUCTS.diamonds_1]:  1,
  [RC_PRODUCTS.diamonds_5]:  5,
  [RC_PRODUCTS.diamonds_10]: 10,
};

// Maps DIAMOND_PACKS.id → RC product ID (for ShopScreen routing)
export const PACK_ID_TO_RC: Record<string, string> = {
  diamonds_1:  RC_PRODUCTS.diamonds_1,
  diamonds_5:  RC_PRODUCTS.diamonds_5,
  diamonds_10: RC_PRODUCTS.diamonds_10,
};

export const RC_ENTITLEMENT_PLUS = 'afroplus';

let _initialized = false;

// ── Lifecycle ────────────────────────────────────────────────────────────────

export async function initRevenueCat(userId: string): Promise<void> {
  if (!isNativePlatform() || _initialized) return;
  const apiKey = getNativePlatform() === 'ios' ? RC_IOS_KEY : RC_ANDROID_KEY;
  if (!apiKey) {
    console.warn('[RC] API key not configured for platform:', getNativePlatform());
    return;
  }
  await Purchases.configure({ apiKey, appUserID: userId });
  if (_env.DEV) {
    await Purchases.setLogLevel({ level: LOG_LEVEL.DEBUG });
  }
  _initialized = true;
}

export async function resetRevenueCat(): Promise<void> {
  if (!isNativePlatform() || !_initialized) return;
  try {
    await Purchases.logOut();
  } catch {
    // logOut throws if no user was logged in — safe to ignore
  }
  _initialized = false;
}

// ── Status ───────────────────────────────────────────────────────────────────

export async function rcIsSubscribed(): Promise<boolean> {
  if (!isNativePlatform()) return false;
  try {
    const { customerInfo } = await Purchases.getCustomerInfo();
    return RC_ENTITLEMENT_PLUS in customerInfo.entitlements.active;
  } catch {
    return false;
  }
}

// ── Purchase results ─────────────────────────────────────────────────────────

export type RCResult =
  | { status: 'success' }
  | { status: 'cancelled' }
  | { status: 'error'; message: string };

function parseRCError(err: unknown): RCResult {
  const e = err as any;
  if (e?.userCancelled === true) return { status: 'cancelled' };
  return { status: 'error', message: e?.message ?? 'Purchase failed' };
}

// ── Purchases ────────────────────────────────────────────────────────────────

export async function purchaseAfroPlus(planType: 'monthly' | 'yearly'): Promise<RCResult> {
  const productId = planType === 'monthly'
    ? RC_PRODUCTS.afroplus_monthly
    : RC_PRODUCTS.afroplus_yearly;
  try {
    const { products } = await Purchases.getProducts({ productIdentifiers: [productId] });
    if (!products.length) return { status: 'error', message: 'Product not found in store' };
    const { customerInfo } = await Purchases.purchaseStoreProduct({ product: products[0] });
    const isActive = RC_ENTITLEMENT_PLUS in customerInfo.entitlements.active;
    return isActive ? { status: 'success' } : { status: 'error', message: 'Entitlement not granted' };
  } catch (err) {
    return parseRCError(err);
  }
}

export async function purchaseDiamondPack(packId: string): Promise<RCResult> {
  const productId = PACK_ID_TO_RC[packId];
  if (!productId) return { status: 'error', message: 'Unknown diamond pack' };
  try {
    const { products } = await Purchases.getProducts({
      productIdentifiers: [productId],
    });
    if (!products.length) return { status: 'error', message: 'Product not found in store' };
    await Purchases.purchaseStoreProduct({ product: products[0] });
    return { status: 'success' };
  } catch (err) {
    return parseRCError(err);
  }
}

export async function restoreRCPurchases(): Promise<RCResult> {
  if (!isNativePlatform()) return { status: 'error', message: 'Not on native' };
  try {
    const { customerInfo } = await Purchases.restorePurchases();
    const isActive = RC_ENTITLEMENT_PLUS in customerInfo.entitlements.active;
    return { status: 'success', ...(isActive ? {} : {}) };
  } catch (err) {
    return parseRCError(err);
  }
}
