// NOTE: This file is kept for reference only.
// The live webhook handler runs as a Firebase Cloud Function in functions/src/index.ts
// Deploy it with: cd functions && npm install && cd .. && firebase deploy --only functions
//
// The webhook URL to register in your Stripe Dashboard is:
//   https://us-central1-ahamefuna-legacy.cloudfunctions.net/stripeWebhook
//
// Required Firebase secret env vars (set via Firebase CLI):
//   firebase functions:secrets:set STRIPE_SECRET_KEY
//   firebase functions:secrets:set STRIPE_WEBHOOK_SECRET
