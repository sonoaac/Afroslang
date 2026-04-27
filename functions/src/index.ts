import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import Stripe from 'stripe';

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

const MAX_FREE_HEARTS = 5;
const UNLIMITED_HEARTS = 999;

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
  await db.doc(`users/${userId}`).update({
    subscription: {
      active: true,
      plan,
      stripeSubId,
      renewsAt,
      stripeCustomerId,
    },
    // Unlimited hearts for Plus members
    hearts: UNLIMITED_HEARTS,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
  console.log(`[afroslang] Subscription ACTIVATED for user ${userId} (${plan})`);
}

async function setSubscriptionCanceled(userId: string): Promise<void> {
  await db.doc(`users/${userId}`).update({
    subscription: {
      active: false,
      plan: null,
      stripeSubId: null,
      renewsAt: null,
      stripeCustomerId: null,
    },
    // Reset hearts to free-tier max
    hearts: MAX_FREE_HEARTS,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
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
  .runWith({ secrets: ['STRIPE_SECRET_KEY', 'STRIPE_WEBHOOK_SECRET'] })
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

          if (session.mode !== 'subscription' || !session.subscription) break;

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
          await db.doc(`users/${userId}`).update({
            'subscription.pastDue': true,
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          });
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
// Look up a Firestore userId by matching the Stripe customer ID stored on
// the user doc. Used as a fallback when metadata.userId is absent (e.g. for
// subscriptions created via Payment Links before we started storing metadata).
// ---------------------------------------------------------------------------
async function userIdFromCustomer(customerId: string): Promise<string | null> {
  if (!customerId) return null;

  const snap = await db
    .collection('users')
    .where('subscription.stripeCustomerId', '==', customerId)
    .limit(1)
    .get();

  if (!snap.empty) return snap.docs[0].id;

  // Also check the legacy flat field written by the old webhook code
  const snap2 = await db
    .collection('users')
    .where('stripeCustomerId', '==', customerId)
    .limit(1)
    .get();

  return snap2.empty ? null : snap2.docs[0].id;
}
