# AfroSlang Plus — Stripe + Firebase Setup Guide

## Architecture

Payments use **Stripe Payment Links** (no custom server needed).
Webhook events are handled by a **Firebase Cloud Function** (`stripeWebhook`).

---

## 1. Deploy the Firebase Cloud Function

```bash
# Install Firebase CLI (if not already)
npm install -g firebase-tools

# Login
firebase login

# Install function dependencies
cd functions
npm install
cd ..

# Set secret environment variables (one-time)
firebase functions:secrets:set STRIPE_SECRET_KEY
# → paste your Stripe secret key (sk_live_... or sk_test_...)

firebase functions:secrets:set STRIPE_WEBHOOK_SECRET
# → paste the webhook signing secret from Stripe Dashboard (whsec_...)

# Deploy
firebase deploy --only functions
```

The function URL will be:
```
https://us-central1-afroslang.cloudfunctions.net/stripeWebhook
```

---

## 2. Register the Webhook in Stripe Dashboard

1. Go to **Stripe Dashboard → Developers → Webhooks**
2. Click **Add endpoint**
3. URL: `https://us-central1-afroslang.cloudfunctions.net/stripeWebhook`
4. Events to listen for:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Copy the **Signing secret** (whsec_...) and set it:
   ```bash
   firebase functions:secrets:set STRIPE_WEBHOOK_SECRET
   ```

---

## 3. Configure Payment Link Success Redirect

For each Payment Link in Stripe Dashboard:
1. Open the Payment Link → **Settings**
2. Under **After payment** → set redirect URL to:
   ```
   https://<your-app-domain>?payment_success=1
   ```
   e.g. `https://afroslang.web.app?payment_success=1`

This brings the user back to the app after paying, where they see the SuccessPage
which polls Firestore until `subscription.active` becomes `true`.

---

## 4. Firestore Data Structure

The webhook writes/reads this structure on `users/{uid}`:

```json
{
  "subscription": {
    "active": true,
    "plan": "monthly",          // or "yearly"
    "stripeSubId": "sub_xxx",
    "renewsAt": 1750000000000,  // ms timestamp
    "stripeCustomerId": "cus_xxx"
  },
  "hearts": 999                 // Plus users get 999 (unlimited)
}
```

When subscription is cancelled:
```json
{
  "subscription": {
    "active": false,
    "plan": null,
    "stripeSubId": null,
    "renewsAt": null,
    "stripeCustomerId": null
  },
  "hearts": 5                   // Reset to free-tier max
}
```

---

## 5. Testing

Use Stripe CLI to forward webhooks locally:

```bash
stripe listen --forward-to localhost:5001/afroslang/us-central1/stripeWebhook
```

Test a payment:
```bash
stripe trigger checkout.session.completed
```
