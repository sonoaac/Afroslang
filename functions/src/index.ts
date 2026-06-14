import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import Stripe from 'stripe';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

admin.initializeApp();
const db = admin.firestore();

// Initialise Stripe lazily so the secret key is read at function execution time
// (not at cold-start before env vars are available).
let _stripe: Stripe | null = null;
function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error('STRIPE_SECRET_KEY env var is not set');
    _stripe = new Stripe(key, { apiVersion: '2024-06-20' });
  }
  return _stripe;
}

let _supabase: SupabaseClient | null = null;
function getSupabase(): SupabaseClient {
  if (!_supabase) {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) throw new Error('Supabase service credentials are not set');
    _supabase = createClient(url, key);
  }
  return _supabase;
}

const MAX_FREE_HEARTS = 5;
const UNLIMITED_HEARTS = 999;

// Map checkout amount_total (cents) → diamonds granted
const DIAMOND_PACK_AMOUNTS: Record<number, number> = {
  199: 1,   // $1.99
  499: 5,   // $4.99
  999: 10,  // $9.99
};

// ---------------------------------------------------------------------------
// Helper — write subscription state to the user's Firestore doc
// ---------------------------------------------------------------------------
async function setSubscriptionActive(
  userId: string,
  stripeSubId: string,
  plan: 'monthly' | 'yearly',
  renewsAt: number,
  stripeCustomerId: string,
): Promise<void> {
  const { error } = await getSupabase().from('profiles').update({
    subscription_active: true,
    subscription_plan: plan,
    stripe_sub_id: stripeSubId,
    stripe_customer_id: stripeCustomerId,
    renews_at: renewsAt,
    past_due: false,
    hearts: UNLIMITED_HEARTS,
    hearts_current: UNLIMITED_HEARTS,
    hearts_max: UNLIMITED_HEARTS,
  }).eq('id', userId);
  if (error) throw error;
  console.log(`[afroslang] Subscription ACTIVATED for user ${userId} (${plan})`);
}

async function setSubscriptionCanceled(userId: string): Promise<void> {
  const { error } = await getSupabase().from('profiles').update({
    subscription_active: false,
    subscription_plan: null,
    stripe_sub_id: null,
    renews_at: null,
    past_due: false,
    hearts: MAX_FREE_HEARTS,
    hearts_current: MAX_FREE_HEARTS,
    hearts_max: MAX_FREE_HEARTS,
  }).eq('id', userId);
  if (error) throw error;
  console.log(`[afroslang] Subscription CANCELLED for user ${userId}`);
}

// ---------------------------------------------------------------------------
// Determine the plan (monthly / yearly) from a Stripe subscription object
// ---------------------------------------------------------------------------
function planFromSub(sub: Stripe.Subscription): 'monthly' | 'yearly' {
  const interval = sub.items.data[0]?.price?.recurring?.interval;
  return interval === 'year' ? 'yearly' : 'monthly';
}

// ---------------------------------------------------------------------------
// Webhook handler
// ---------------------------------------------------------------------------
export const stripeWebhook = functions
  .runWith({ secrets: ['STRIPE_SECRET_KEY', 'STRIPE_WEBHOOK_SECRET', 'SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY'] })
  .https.onRequest(async (req, res) => {
    if (req.method !== 'POST') {
      res.status(405).send('Method Not Allowed');
      return;
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error('[afroslang] STRIPE_WEBHOOK_SECRET is not set');
      res.status(500).send('Webhook secret not configured');
      return;
    }

    const sig = req.headers['stripe-signature'] as string;
    let event: Stripe.Event;

    try {
      // req.rawBody is provided by Firebase Functions HTTP triggers
      event = getStripe().webhooks.constructEvent(
        (req as any).rawBody,
        sig,
        webhookSecret,
      );
    } catch (err: any) {
      console.error('[afroslang] Webhook signature verification failed:', err.message);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    try {
      switch (event.type) {
        // ── Payment link / checkout completed ──────────────────────────────
        case 'checkout.session.completed': {
          const session = event.data.object as Stripe.Checkout.Session;

          // Stripe Payment Links pass the Firebase UID via client_reference_id.
          // Custom checkout sessions pass it via metadata.userId.
          const userId =
            session.client_reference_id ??
            (session.metadata?.userId as string | undefined);

          if (!userId) {
            console.warn('[afroslang] checkout.session.completed — no userId found');
            break;
          }

          // ── One-time diamond pack purchase ─────────────────────────────────
          if (session.mode === 'payment') {
            const diamonds = DIAMOND_PACK_AMOUNTS[session.amount_total ?? 0];
            if (!diamonds) {
              console.warn('[afroslang] Unknown diamond pack amount:', session.amount_total);
              break;
            }
            const { data: profile, error: loadError } = await getSupabase()
              .from('profiles')
              .select('diamonds')
              .eq('id', userId)
              .single();
            if (loadError) throw loadError;
            const { error: updateError } = await getSupabase()
              .from('profiles')
              .update({ diamonds: (profile?.diamonds ?? 0) + diamonds })
              .eq('id', userId);
            if (updateError) throw updateError;
            console.log(`[afroslang] Credited ${diamonds} diamond(s) to user ${userId}`);
            break;
          }

          // ── Subscription checkout ───────────────────────────────────────────
          if (!session.subscription) break;

          // Fetch the full subscription to determine plan + renewal date
          const sub = await getStripe().subscriptions.retrieve(
            session.subscription as string,
          );

          await setSubscriptionActive(
            userId,
            sub.id,
            planFromSub(sub),
            sub.current_period_end * 1000, // convert to ms
            (sub.customer as string) ?? '',
          );
          break;
        }

        // ── Subscription renewed or updated ────────────────────────────────
        case 'customer.subscription.updated': {
          const sub = event.data.object as Stripe.Subscription;

          // userId lives in subscription metadata (set when creating a custom
          // checkout session) OR we look it up via customer email / Firestore.
          const userId = sub.metadata?.userId ?? (await userIdFromCustomer(sub.customer as string));

          if (!userId) {
            console.warn('[afroslang] customer.subscription.updated — no userId for sub', sub.id);
            break;
          }

          if (sub.status === 'active' || sub.status === 'trialing') {
            await setSubscriptionActive(
              userId,
              sub.id,
              planFromSub(sub),
              sub.current_period_end * 1000,
              sub.customer as string,
            );
          } else if (sub.status === 'canceled' || sub.status === 'unpaid') {
            await setSubscriptionCanceled(userId);
          }
          break;
        }

        // ── Subscription cancelled (end of billing period or immediately) ──
        case 'customer.subscription.deleted': {
          const sub = event.data.object as Stripe.Subscription;
          const userId = sub.metadata?.userId ?? (await userIdFromCustomer(sub.customer as string));

          if (!userId) {
            console.warn('[afroslang] customer.subscription.deleted — no userId for sub', sub.id);
            break;
          }

          await setSubscriptionCanceled(userId);
          break;
        }

        // ── Invoice paid (renewal) ──────────────────────────────────────────
        case 'invoice.payment_succeeded': {
          const invoice = event.data.object as Stripe.Invoice;
          if (!invoice.subscription) break;

          const sub = await getStripe().subscriptions.retrieve(invoice.subscription as string);
          const userId = sub.metadata?.userId ?? (await userIdFromCustomer(sub.customer as string));

          if (!userId) break;

          if (sub.status === 'active' || sub.status === 'trialing') {
            await setSubscriptionActive(
              userId,
              sub.id,
              planFromSub(sub),
              sub.current_period_end * 1000,
              sub.customer as string,
            );
          }
          break;
        }

        // ── Payment failed ─────────────────────────────────────────────────
        case 'invoice.payment_failed': {
          const invoice = event.data.object as Stripe.Invoice;
          if (!invoice.subscription) break;

          const sub = await getStripe().subscriptions.retrieve(invoice.subscription as string);
          const userId = sub.metadata?.userId ?? (await userIdFromCustomer(sub.customer as string));

          if (!userId) break;

          // Mark past_due but keep hearts until actually cancelled
          const { error } = await getSupabase()
            .from('profiles')
            .update({ past_due: true })
            .eq('id', userId);
          if (error) throw error;
          console.log(`[afroslang] Payment failed for user ${userId}`);
          break;
        }

        default:
          console.log(`[afroslang] Unhandled event type: ${event.type}`);
      }
    } catch (err) {
      console.error('[afroslang] Error processing webhook event:', err);
      res.status(500).send('Internal error processing event');
      return;
    }

    res.json({ received: true });
  });

// ---------------------------------------------------------------------------
// Server-side login rate limiting
// Tracks failed attempts per email hash in _rateLimit/{emailHash}
// ---------------------------------------------------------------------------
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 min
const RATE_LIMIT_MAX       = 5;

export const checkLoginRateLimit = functions.https.onCall(async (data) => {
  const { emailHash } = data as { emailHash?: unknown };
  if (!emailHash || typeof emailHash !== 'string' || emailHash.length !== 64) {
    throw new functions.https.HttpsError('invalid-argument', 'Invalid request');
  }
  const ref = db.doc(`_rateLimit/login_${emailHash}`);
  const now = Date.now();
  const snap = await ref.get();
  if (!snap.exists) return { allowed: true, attemptsLeft: RATE_LIMIT_MAX };
  const attempts: number[] = ((snap.data()!.attempts ?? []) as number[])
    .filter((t: number) => now - t < RATE_LIMIT_WINDOW_MS);
  if (attempts.length >= RATE_LIMIT_MAX) {
    const oldestInWindow = Math.min(...attempts);
    return { allowed: false, until: oldestInWindow + RATE_LIMIT_WINDOW_MS, attemptsLeft: 0 };
  }
  return { allowed: true, attemptsLeft: RATE_LIMIT_MAX - attempts.length };
});

export const recordLoginFailure = functions.https.onCall(async (data) => {
  const { emailHash } = data as { emailHash?: unknown };
  if (!emailHash || typeof emailHash !== 'string' || emailHash.length !== 64) {
    throw new functions.https.HttpsError('invalid-argument', 'Invalid request');
  }
  const ref = db.doc(`_rateLimit/login_${emailHash}`);
  const now = Date.now();
  await db.runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    const existing: number[] = snap.exists ? ((snap.data()!.attempts ?? []) as number[]) : [];
    const pruned = existing.filter((t: number) => now - t < RATE_LIMIT_WINDOW_MS);
    pruned.push(now);
    tx.set(ref, { attempts: pruned, updatedAt: admin.firestore.FieldValue.serverTimestamp() });
  });
  return { recorded: true };
});

// ---------------------------------------------------------------------------
// RevenueCat webhook
// Handles IAP events from iOS App Store and Google Play.
// Auth: RevenueCat sends Authorization header with the webhook secret set
// in the RevenueCat Dashboard → Project → Integrations → Webhooks.
// Set the secret via: firebase functions:secrets:set RC_WEBHOOK_SECRET
// ---------------------------------------------------------------------------

// Maps RevenueCat product ID → diamonds granted (must match client-side RC_DIAMONDS_MAP)
const RC_DIAMOND_PRODUCTS: Record<string, number> = {
  'com.afroslang.app.diamonds_1':  1,
  'com.afroslang.app.diamonds_5':  5,
  'com.afroslang.app.diamonds_10': 10,
};

const RC_SUBSCRIPTION_PRODUCTS = new Set([
  'com.afroslang.app.afroplus_monthly',
  'com.afroslang.app.afroplus_yearly',
]);

function rcPlanFromProductId(productId: string): 'monthly' | 'yearly' {
  return productId.includes('yearly') ? 'yearly' : 'monthly';
}

export const revenueCatWebhook = functions
  .runWith({ secrets: ['RC_WEBHOOK_SECRET', 'SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY'] })
  .https.onRequest(async (req, res) => {
    if (req.method !== 'POST') {
      res.status(405).send('Method Not Allowed');
      return;
    }

    // Verify shared secret
    const rcSecret = process.env.RC_WEBHOOK_SECRET;
    const authHeader = req.headers['authorization'] ?? '';
    if (!rcSecret || authHeader !== rcSecret) {
      console.error('[RC] Webhook auth failed');
      res.status(401).send('Unauthorized');
      return;
    }

    const body = req.body as { event?: Record<string, any> };
    const event = body?.event;
    if (!event) {
      res.status(400).send('Missing event');
      return;
    }

    const userId: string | undefined = event.app_user_id ?? event.original_app_user_id;
    const productId: string | undefined = event.product_id;
    const eventType: string | undefined = event.type;

    if (!userId || !productId || !eventType) {
      console.warn('[RC] Missing required event fields', { userId, productId, eventType });
      res.json({ received: true });
      return;
    }

    try {
      switch (eventType) {
        // ── New subscription or renewal ──────────────────────────────────────
        case 'INITIAL_PURCHASE':
        case 'RENEWAL':
        case 'RESUBSCRIBE': {
          if (!RC_SUBSCRIPTION_PRODUCTS.has(productId)) break;
          const plan = rcPlanFromProductId(productId);
          const expiresMs = event.expiration_at_ms ?? null;
          const { error } = await getSupabase().from('profiles').update({
            subscription_active: true,
            subscription_plan: plan,
            stripe_sub_id: null,
            stripe_customer_id: null,
            renews_at: expiresMs,
            past_due: false,
            hearts: UNLIMITED_HEARTS,
            hearts_current: UNLIMITED_HEARTS,
            hearts_max: UNLIMITED_HEARTS,
          }).eq('id', userId);
          if (error) throw error;
          console.log(`[RC] Subscription ACTIVE (${plan}) for user ${userId}`);
          break;
        }

        // ── Subscription cancelled or expired ────────────────────────────────
        case 'CANCELLATION':
        case 'EXPIRATION': {
          if (!RC_SUBSCRIPTION_PRODUCTS.has(productId)) break;
          const { error } = await getSupabase().from('profiles').update({
            subscription_active: false,
            subscription_plan: null,
            stripe_sub_id: null,
            stripe_customer_id: null,
            renews_at: null,
            past_due: false,
            hearts: MAX_FREE_HEARTS,
            hearts_current: MAX_FREE_HEARTS,
            hearts_max: MAX_FREE_HEARTS,
          }).eq('id', userId);
          if (error) throw error;
          console.log(`[RC] Subscription CANCELLED for user ${userId}`);
          break;
        }

        // ── Diamond pack purchase (consumable) ───────────────────────────────
        case 'NON_SUBSCRIPTION_PURCHASE': {
          const diamonds = RC_DIAMOND_PRODUCTS[productId];
          if (!diamonds) {
            console.warn('[RC] Unknown consumable product:', productId);
            break;
          }
          const { data: profile, error: loadError } = await getSupabase()
            .from('profiles')
            .select('diamonds')
            .eq('id', userId)
            .single();
          if (loadError) throw loadError;
          const { error: updateError } = await getSupabase()
            .from('profiles')
            .update({ diamonds: (profile?.diamonds ?? 0) + diamonds })
            .eq('id', userId);
          if (updateError) throw updateError;
          console.log(`[RC] Credited ${diamonds} diamond(s) to user ${userId}`);
          break;
        }

        default:
          console.log(`[RC] Unhandled event type: ${eventType}`);
      }
    } catch (err) {
      console.error('[RC] Error processing event:', err);
      res.status(500).send('Internal error');
      return;
    }

    res.json({ received: true });
  });

// ---------------------------------------------------------------------------
// Look up a Firestore userId by matching the Stripe customer ID stored on
// the user doc. Used as a fallback when metadata.userId is absent (e.g. for
// subscriptions created via Payment Links before we started storing metadata).
// ---------------------------------------------------------------------------
async function userIdFromCustomer(customerId: string): Promise<string | null> {
  if (!customerId) return null;

  const { data, error } = await getSupabase()
    .from('profiles')
    .select('id')
    .eq('stripe_customer_id', customerId)
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  return data?.id ?? null;
}
