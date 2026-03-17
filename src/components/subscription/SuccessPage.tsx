import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Crown, CheckCircle, Zap, Heart, BarChart3, Loader2 } from 'lucide-react';

interface SuccessPageProps {
  onContinue: () => void;
}

export const SuccessPage: React.FC<SuccessPageProps> = ({ onContinue }) => {
  const { userData, refreshUserData } = useAuth();
  const [checking, setChecking] = useState(true);
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    // Clear ?payment_success from URL without reloading
    const url = new URL(window.location.href);
    if (url.searchParams.has('payment_success')) {
      url.searchParams.delete('payment_success');
      window.history.replaceState({}, '', url.toString());
    }

    // Poll Firestore for up to ~30 seconds (15 attempts × 2 s) waiting for
    // the webhook to flip subscription.active to true.
    let attempts = 0;
    const MAX_ATTEMPTS = 15;

    const poll = async () => {
      await refreshUserData();
      attempts++;

      // Re-read from the context via a ref-style check after refresh
      // The component will re-render with new userData after refreshUserData resolves
    };

    const interval = setInterval(async () => {
      if (attempts >= MAX_ATTEMPTS) {
        clearInterval(interval);
        setChecking(false);
        return;
      }
      await poll();
    }, 2000);

    // Initial check immediately
    poll();

    return () => clearInterval(interval);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Detect when subscription becomes active
  useEffect(() => {
    if (userData?.subscription?.active) {
      setChecking(false);
      setActivated(true);
    }
  }, [userData?.subscription?.active]);

  const subFont = "'Times New Roman', Georgia, serif";
  const subBg = '#080808';
  const subSurface = '#111111';
  const subBorder = 'rgba(255,255,255,0.08)';
  const subRed = '#b00020';
  const subText = '#ffffff';
  const subMuted = 'rgba(255,255,255,0.6)';

  return (
    <div style={{ minHeight: '100vh', background: subBg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', fontFamily: subFont }}>
      <div style={{ maxWidth: 640, width: '100%', textAlign: 'center' }}>

        {/* Icon */}
        <div style={{ marginBottom: '2rem', position: 'relative', display: 'inline-block' }}>
          <div style={{ width: 88, height: 88, background: subRed, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
            <Crown style={{ width: 44, height: 44, color: '#fff' }} strokeWidth={1.5} />
          </div>
        </div>

        <h1 style={{ color: subText, fontFamily: subFont, fontSize: 'clamp(1.8rem, 5vw, 3rem)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
          Welcome to AfroSlang Plus!
        </h1>

        <p style={{ color: subMuted, fontFamily: subFont, fontSize: '1.05rem', marginBottom: '2.5rem', lineHeight: 1.6 }}>
          Your payment was successful. Your Plus features are being activated.
        </p>

        {/* Activation status */}
        <div style={{ background: subSurface, border: `1px solid ${subBorder}`, padding: '1.5rem', marginBottom: '2rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: subRed }} />

          {checking && !activated ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', color: subMuted }}>
              <Loader2 style={{ width: 20, height: 20, animation: 'spin 1s linear infinite' }} />
              <span style={{ fontFamily: subFont, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Activating your subscription…
              </span>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', color: '#4ade80' }}>
              <CheckCircle style={{ width: 20, height: 20 }} />
              <span style={{ fontFamily: subFont, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {activated ? 'Plus Active — All features unlocked!' : 'Payment received — activation may take a moment'}
              </span>
            </div>
          )}
        </div>

        {/* Feature highlights */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2.5rem' }}>
          {[
            { icon: <Heart style={{ width: 22, height: 22, color: '#f87171' }} />, label: 'Unlimited Hearts' },
            { icon: <Zap style={{ width: 22, height: 22, color: '#facc15' }} />, label: '2× XP Boost' },
            { icon: <BarChart3 style={{ width: 22, height: 22, color: '#60a5fa' }} />, label: 'Analytics' },
          ].map((f) => (
            <div key={f.label} style={{ background: subSurface, border: `1px solid ${subBorder}`, padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              {f.icon}
              <span style={{ color: subText, fontFamily: subFont, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{f.label}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={onContinue}
          style={{ background: subRed, border: 'none', color: subText, fontFamily: subFont, fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.15em', padding: '1rem 3rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', transition: 'background 0.2s' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#e53935'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = subRed; }}
        >
          <CheckCircle style={{ width: 18, height: 18 }} />
          Start Learning Now
        </button>

        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
};
