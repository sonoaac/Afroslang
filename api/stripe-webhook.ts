import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-09-30.acacia' });

// Service-role client — bypasses RLS
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

const DIAMOND_PACK_AMOUNTS: Record<number, number> = {
  199: 1,
  499: 5,
  999: 10,
};

const UNLIMITED_HEARTS = 999;

async function setSubscriptionActive(
  userId: string,
  stripeSubId: string,
  plan: string,
  renewsAt: number,
  stripeCustomerId: string,
) {
  await supabase.from('profiles').update({
    subscription_active: true,
    subscription_plan: plan,
    stripe_sub_id: stripeSubId,
    stripe_customer_id: stripeCustomerId,
    renews_at: renewsAt,
    past_due: false,
    hearts: UNLIMITED_HEARTS,
    hearts_current: UNLIMITED_HEARTS,
  }).eq('id', userId);
}

async function setSubscriptionCanceled(userId: string) {
  await supabase.from('profiles').update({
    subscription_active: false,
    subscription_plan: null,
    stripe_sub_id: null,
    renews_at: null,
    hearts: 5,
    hearts_current: 5,
  }).eq('id', userId);
}

async function addDiamonds(userId: string, amount: number) {
  const { data } = await supabase.from('profiles').select('diamonds').eq('id', userId).single();
  await supabase.from('profiles').update({ diamonds: (data?.diamonds ?? 0) + amount }).eq('id', userId);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const sig = req.headers['stripe-signature'] as string;
  let event: Stripe.Event;

  try {
    const rawBody = await getRawBody(req);
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId  = session.client_reference_id;
        if (!userId) break;

        if (session.mode === 'subscription' && session.subscription) {
          const sub = await stripe.subscriptions.retrieve(session.subscription as string);
          const plan = sub.items.data[0]?.price?.recurring?.interval === 'year' ? 'yearly' : 'monthly';
          await setSubscriptionActive(userId, sub.id, plan, sub.current_period_end * 1000, sub.customer as string);
        }

        if (session.mode === 'payment' && session.amount_total) {
          const diamonds = DIAMOND_PACK_AMOUNTS[session.amount_total];
          if (diamonds) await addDiamonds(userId, diamonds);
        }
        break;
      }

      case 'customer.subscription.updated': {
        const sub    = event.data.object as Stripe.Subscription;
        const userId = sub.metadata?.userId ?? sub.client_reference_id;
        if (!userId) break;
        if (sub.status === 'active' || sub.status === 'trialing') {
          const plan = sub.items.data[0]?.price?.recurring?.interval === 'year' ? 'yearly' : 'monthly';
          await setSubscriptionActive(userId, sub.id, plan, sub.current_period_end * 1000, sub.customer as string);
        } else if (sub.status === 'past_due') {
          await supabase.from('profiles').update({ past_due: true }).eq('id', userId);
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const sub    = event.data.object as Stripe.Subscription;
        const userId = sub.metadata?.userId ?? sub.client_reference_id;
        if (userId) await setSubscriptionCanceled(userId);
        break;
      }
    }
  } catch (err) {
    console.error('[stripe-webhook] handler error:', err);
    return res.status(500).send('Internal error');
  }

  res.status(200).json({ received: true });
}

function getRawBody(req: VercelRequest): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk: Buffer) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}
