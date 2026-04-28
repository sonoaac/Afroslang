import { loadStripe, Stripe } from '@stripe/stripe-js';

// Stripe configuration — only the publishable key belongs on the client.
// The secret key lives exclusively in Cloud Functions (functions/src/index.ts).
export const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_...';

// Initialize Stripe
let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_PUBLIC_KEY);
  }
  return stripePromise;
};

// Subscription plans with real Stripe payment links
export const SUBSCRIPTION_PLANS = {
  monthly: {
    priceId: 'price_monthly_4_99', // Replace with your actual Stripe price ID
    amount: 499, // $4.99 in cents
    interval: 'month',
    name: 'Monthly Plus',
    description: 'Unlimited hearts, XP boost, feedback page, and more!',
    paymentLink: 'https://buy.stripe.com/7sY4gA6vy4tc7FEh2HdjO05',
    trialDays: 7
  },
  yearly: {
    priceId: 'price_yearly_39_99', // Replace with your actual Stripe price ID
    amount: 3999, // $39.99 in cents
    interval: 'year',
    name: 'Yearly Plus',
    description: 'Save 44%! All Plus features for a full year',
    savings: 'Save $32.89/year',
    paymentLink: 'https://buy.stripe.com/dRm3cw1be7Fo6BA4fVdjO06',
    trialDays: 7
  }
} as const;

// Plus features
export const PREMIUM_FEATURES = [
  {
    icon: '❤️',
    title: 'Unlimited Hearts',
    description: 'Never run out of hearts. Learn without limits!'
  },
  {
    icon: '⚡',
    title: '2× XP Boost',
    description: 'Earn double XP on every lesson and climb the leaderboard faster'
  },
  {
    icon: '📖',
    title: 'Reviews Page',
    description: 'Access the full Reviews page to revisit and reinforce every lesson'
  },
  {
    icon: '🚫',
    title: 'No Ads',
    description: 'Enjoy a completely ad free learning experience'
  }
];
