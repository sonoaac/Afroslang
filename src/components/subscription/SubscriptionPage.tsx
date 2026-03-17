import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { SUBSCRIPTION_PLANS, PREMIUM_FEATURES } from '../../utils/stripeConfig';
import { Crown, Check, Star, Zap, Heart, BarChart3, Trophy, ChevronLeft } from 'lucide-react';

interface SubscriptionPageProps {
  onBack: () => void;
}

export const SubscriptionPage: React.FC<SubscriptionPageProps> = ({ onBack }) => {
  const { user, userData, isGuest } = useAuth();
  const [loading, setLoading] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('yearly');

  const handleSubscribe = async (planType: 'monthly' | 'yearly') => {
    if (isGuest || !user) {
      alert('Please create an account or sign in to subscribe to AfroSlang Plus. This ensures your subscription is properly linked to your account.');
      return;
    }

    if (!userData?.username) {
      alert('Please complete your profile by setting a username before subscribing. This helps us personalize your experience.');
      return;
    }

    setLoading(planType);

    try {
      const plan = SUBSCRIPTION_PLANS[planType];
      
      console.log('Plan selected:', plan);
      console.log('Payment link:', plan.paymentLink);
      
      // Check if payment link exists
      if (!plan.paymentLink) {
        throw new Error('Payment link not configured for this plan');
      }
      
      // Build the return URL so Stripe can redirect back to this app.
      // In Stripe Dashboard → Payment Link → After payment, set redirect to:
      //   https://<your-domain>?payment_success=1
      // We append it here as a hint; for Payment Links the final redirect is
      // controlled by the Dashboard setting.
      const returnUrl = `${window.location.origin}?payment_success=1`;
      const paymentUrl = `${plan.paymentLink}?client_reference_id=${encodeURIComponent(user.uid)}&prefilled_email=${encodeURIComponent(user.email ?? '')}&prefilled_name=${encodeURIComponent(userData.username ?? '')}&redirect_url=${encodeURIComponent(returnUrl)}`;

      // Navigate in the same tab so the success redirect lands back here
      window.location.href = paymentUrl;
      
    } catch (error) {
      console.error('Subscription error:', error);
      alert(`Error: ${error.message || 'Something went wrong. Please try again.'}`);
    } finally {
      setLoading(null);
    }
  };

  const isSubscribed = userData?.subscription?.active;

  const subFont = "'Times New Roman', Georgia, serif";
  const subBg = '#080808';
  const subSurface = '#111111';
  const subBorder = 'rgba(255,255,255,0.08)';
  const subRed = '#b00020';
  const subText = '#ffffff';
  const subMuted = 'rgba(255,255,255,0.6)';
  const subDim = 'rgba(255,255,255,0.35)';

  const BackBtn = () => (
    <button
      onClick={onBack}
      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: subSurface, border: `1px solid ${subBorder}`, color: subMuted, padding: '0.6rem 1.2rem', cursor: 'pointer', fontFamily: subFont, fontSize: '0.9rem', transition: 'border-color 0.2s, color 0.2s', marginBottom: '2rem' }}
      onMouseEnter={(e) => { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor = subRed; el.style.color = subText; }}
      onMouseLeave={(e) => { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor = subBorder; el.style.color = subMuted; }}
    >
      <ChevronLeft style={{ width: 18, height: 18 }} strokeWidth={2} />
      Back
    </button>
  );

  // Show message for guest users
  if (isGuest) {
    return (
      <div style={{ minHeight: '100vh', background: subBg, padding: '1.5rem', fontFamily: subFont }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <BackBtn />
          <div style={{ height: '2px', background: subRed, marginBottom: '2rem', opacity: 0.7 }} />
          <div style={{ background: subSurface, border: `1px solid ${subBorder}`, padding: '2.5rem 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: subRed }} />
            <Crown style={{ width: 40, height: 40, color: subRed, margin: '0 auto 1rem', display: 'block' }} strokeWidth={1.5} />
            <h1 style={{ color: subText, fontFamily: subFont, fontSize: 'clamp(1.3rem, 4vw, 2rem)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>
              Create Account to Subscribe
            </h1>
            <p style={{ color: subMuted, fontFamily: subFont, fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
              To subscribe to AfroSlang Plus, please create an account first. This ensures your subscription is properly linked and you can access all Plus features.
            </p>
            <button
              onClick={() => { alert('Please use the profile menu to sign up for an account first.'); }}
              style={{ background: subRed, border: 'none', color: subText, fontFamily: subFont, fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '0.9rem 2rem', cursor: 'pointer', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', transition: 'background 0.2s' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#e53935'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = subRed; }}
            >
              <Crown style={{ width: 18, height: 18 }} strokeWidth={2} />
              Create Account to Subscribe
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isSubscribed) {
    return (
      <div style={{ minHeight: '100vh', background: subBg, padding: '1.5rem', fontFamily: subFont }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <BackBtn />
          <div style={{ height: '2px', background: subRed, marginBottom: '2rem', opacity: 0.7 }} />
          <div style={{ background: subSurface, border: `1px solid ${subBorder}`, padding: '2.5rem 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden', marginBottom: '1.5rem' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: subRed }} />
            <Crown style={{ width: 40, height: 40, color: subRed, margin: '0 auto 1rem', display: 'block' }} strokeWidth={1.5} />
            <h1 style={{ color: subText, fontFamily: subFont, fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
              Plus Active
            </h1>
            <p style={{ color: subMuted, fontFamily: subFont, fontSize: '1rem', marginBottom: '2rem' }}>
              You're enjoying all Plus features
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem', textAlign: 'left' }}>
              {PREMIUM_FEATURES.map((feature, index) => (
                <div key={index} style={{ background: 'rgba(176,0,32,0.06)', border: `1px solid rgba(176,0,32,0.2)`, borderLeft: `3px solid ${subRed}`, padding: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '1.4rem' }}>{feature.icon}</span>
                    <h3 style={{ color: subText, fontFamily: subFont, fontSize: '0.9rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>{feature.title}</h3>
                  </div>
                  <p style={{ color: subMuted, fontFamily: subFont, fontSize: '0.82rem', lineHeight: 1.4, margin: 0 }}>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: subBg, padding: '1.5rem', fontFamily: subFont }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <BackBtn />
        <div style={{ height: '2px', background: subRed, marginBottom: '2.5rem', opacity: 0.7 }} />

        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <Crown style={{ width: 48, height: 48, color: subRed, margin: '0 auto 1rem', display: 'block' }} strokeWidth={1.5} />
          <h1 style={{ color: subText, fontFamily: subFont, fontSize: 'clamp(1.8rem, 5vw, 3.5rem)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem', margin: '0 0 0.75rem 0' }}>
            AfroSlang Plus
          </h1>
          <p style={{ color: subMuted, fontFamily: subFont, fontSize: '1.1rem' }}>
            Unlock unlimited learning potential with Plus features
          </p>
        </div>

        {/* Features Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
          {PREMIUM_FEATURES.map((feature, index) => (
            <div key={index} style={{ background: subSurface, border: `1px solid ${subBorder}`, padding: '1.25rem', borderLeft: `3px solid rgba(176,0,32,0.4)` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '1.5rem' }}>{feature.icon}</span>
                <h3 style={{ color: subText, fontFamily: subFont, fontSize: '0.9rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>{feature.title}</h3>
              </div>
              <p style={{ color: subMuted, fontFamily: subFont, fontSize: '0.82rem', lineHeight: 1.4, margin: 0 }}>{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Pricing Plans */}
        <div style={{ background: subSurface, border: `1px solid ${subBorder}`, padding: '2rem', marginBottom: '2rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: subRed }} />
          <h2 style={{ color: subText, fontFamily: subFont, fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.15em', textAlign: 'center', marginBottom: '1.5rem', marginTop: 0 }}>
            Choose Your Plan
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            {/* Monthly */}
            <div
              onClick={() => setSelectedPlan('monthly')}
              style={{ background: selectedPlan === 'monthly' ? 'rgba(176,0,32,0.12)' : 'rgba(255,255,255,0.02)', border: selectedPlan === 'monthly' ? `1px solid ${subRed}` : `1px solid ${subBorder}`, padding: '1.5rem', textAlign: 'center', cursor: 'pointer', transition: 'border-color 0.2s, background 0.2s' }}
            >
              <h3 style={{ color: subText, fontFamily: subFont, fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem', marginTop: 0 }}>Monthly</h3>
              <div style={{ color: subText, fontFamily: subFont, fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>$5.99</div>
              <div style={{ color: subMuted, fontSize: '0.82rem', fontFamily: subFont, marginBottom: '0.75rem' }}>per month</div>
              <div style={{ background: 'rgba(176,0,32,0.2)', border: `1px solid rgba(176,0,32,0.4)`, color: '#fca5a5', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0.3rem 0.75rem', display: 'inline-block', marginBottom: '1rem', fontFamily: subFont }}>
                7-day FREE trial
              </div>
              <div style={{ background: selectedPlan === 'monthly' ? subRed : 'transparent', border: `1px solid ${selectedPlan === 'monthly' ? subRed : subBorder}`, color: subText, fontFamily: subFont, fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0.5rem 1rem', cursor: 'pointer', transition: 'all 0.2s' }}>
                {selectedPlan === 'monthly' ? 'Selected' : 'Select Monthly'}
              </div>
            </div>

            {/* Yearly */}
            <div
              onClick={() => setSelectedPlan('yearly')}
              style={{ background: selectedPlan === 'yearly' ? 'rgba(176,0,32,0.12)' : 'rgba(255,255,255,0.02)', border: selectedPlan === 'yearly' ? `1px solid ${subRed}` : `1px solid ${subBorder}`, padding: '1.5rem', textAlign: 'center', cursor: 'pointer', transition: 'border-color 0.2s, background 0.2s', position: 'relative' }}
            >
              <div style={{ position: 'absolute', top: '-1px', left: '50%', transform: 'translateX(-50%)', background: subRed, color: subText, fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.12em', padding: '0.25rem 0.75rem', fontFamily: subFont, whiteSpace: 'nowrap' }}>
                Best Value
              </div>
              <h3 style={{ color: subText, fontFamily: subFont, fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem', marginTop: '0.75rem' }}>Yearly</h3>
              <div style={{ color: subText, fontFamily: subFont, fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>$39.99</div>
              <div style={{ color: subMuted, fontSize: '0.82rem', fontFamily: subFont, marginBottom: '0.5rem' }}>per year</div>
              <div style={{ background: 'rgba(176,0,32,0.2)', border: `1px solid rgba(176,0,32,0.4)`, color: '#fca5a5', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0.3rem 0.75rem', display: 'inline-block', marginBottom: '0.5rem', fontFamily: subFont }}>
                7-day FREE trial
              </div>
              <div style={{ color: '#86efac', fontSize: '0.82rem', fontFamily: subFont, marginBottom: '1rem' }}>Save $32.89/year</div>
              <div style={{ background: selectedPlan === 'yearly' ? subRed : 'transparent', border: `1px solid ${selectedPlan === 'yearly' ? subRed : subBorder}`, color: subText, fontFamily: subFont, fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0.5rem 1rem', cursor: 'pointer', transition: 'all 0.2s' }}>
                {selectedPlan === 'yearly' ? 'Selected' : 'Select Yearly'}
              </div>
            </div>
          </div>

          {/* Subscribe CTA */}
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={() => handleSubscribe(selectedPlan)}
              disabled={loading !== null}
              style={{ background: subRed, border: 'none', color: subText, fontFamily: subFont, fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.15em', padding: '1rem 3rem', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1, transition: 'background 0.2s', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}
              onMouseEnter={(e) => { if (!loading) (e.currentTarget as HTMLButtonElement).style.background = '#e53935'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = subRed; }}
            >
              {loading ? (
                <>
                  <div style={{ width: 16, height: 16, border: `2px solid rgba(255,255,255,0.3)`, borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                  Processing...
                </>
              ) : (
                <>
                  <Crown style={{ width: 18, height: 18 }} strokeWidth={2} />
                  Upgrade to Plus
                </>
              )}
            </button>
            <p style={{ color: subDim, fontSize: '0.75rem', fontFamily: subFont, margin: 0, letterSpacing: '0.04em' }}>
              Cancel anytime. Secure payment powered by Stripe.
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div style={{ background: subSurface, border: `1px solid ${subBorder}`, padding: '2rem' }}>
          <h3 style={{ color: subText, fontFamily: subFont, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.15em', textAlign: 'center', marginBottom: '1.5rem', marginTop: 0 }}>
            Frequently Asked Questions
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
            {[
              { q: 'What happens to my progress?', a: 'All your learning progress is saved and will continue to be available.' },
              { q: 'Can I cancel anytime?', a: 'Yes! You can cancel your subscription at any time from your account settings.' },
              { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, debit cards, and digital wallets through Stripe.' },
              { q: 'Is there a free trial?', a: 'New users get 3 free hearts to try the app. Plus features require a subscription.' },
            ].map((item) => (
              <div key={item.q} style={{ borderLeft: `2px solid rgba(176,0,32,0.4)`, paddingLeft: '0.75rem' }}>
                <h4 style={{ color: subText, fontFamily: subFont, fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.35rem', marginTop: 0 }}>{item.q}</h4>
                <p style={{ color: subMuted, fontFamily: subFont, fontSize: '0.78rem', lineHeight: 1.5, margin: 0 }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
