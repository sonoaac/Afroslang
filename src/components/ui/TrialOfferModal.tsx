import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { SUBSCRIPTION_PLANS } from '../../utils/stripeConfig';

interface TrialOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartTrial: () => void;
}

export const TrialOfferModal: React.FC<TrialOfferModalProps> = ({
  isOpen,
  onClose,
  onStartTrial,
}) => {
  // Auto-dismiss after 8 s if user ignores it
  useEffect(() => {
    if (!isOpen) return;
    const t = setTimeout(onClose, 8000);
    return () => clearTimeout(t);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const price = (SUBSCRIPTION_PLANS.monthly.amount / 100).toFixed(2);

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9998,
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        padding: '0 0 24px',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          pointerEvents: 'auto',
          width: '100%',
          maxWidth: 420,
          margin: '0 16px',
          borderRadius: 20,
          background: 'rgba(8, 0, 3, 0.72)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(176,0,32,0.45)',
          boxShadow: '0 -4px 40px rgba(176,0,32,0.25), 0 8px 32px rgba(0,0,0,0.7)',
          padding: '20px 20px 18px',
          fontFamily: "'Roboto', sans-serif",
          animation: 'trialSlideUp 0.35s cubic-bezier(0.34,1.56,0.64,1) both',
        }}
      >
        <style>{`
          @keyframes trialSlideUp {
            from { opacity: 0; transform: translateY(40px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>

        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 12, right: 12,
            width: 28, height: 28, borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#888', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <X style={{ width: 13, height: 13 }} />
        </button>

        {/* Content row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
          <div style={{ fontSize: 36, lineHeight: 1, flexShrink: 0 }}>💔</div>
          <div>
            <p style={{
              margin: '0 0 3px',
              fontSize: '0.95rem', fontWeight: 800,
              color: '#fff', lineHeight: 1.2,
            }}>
              You lost a heart!
            </p>
            <p style={{
              margin: 0,
              fontSize: '0.78rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.4,
            }}>
              Never run out with <strong style={{ color: '#f5c842' }}>Plus</strong> — unlimited hearts &amp; 2× XP
            </p>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={onStartTrial}
          style={{
            width: '100%', padding: '13px',
            background: 'linear-gradient(135deg, #b00020, #800018)',
            border: 'none', borderRadius: 12,
            color: '#fff',
            fontSize: '0.9rem', fontWeight: 800,
            letterSpacing: '0.04em',
            cursor: 'pointer',
            boxShadow: '0 4px 0 rgba(80,0,10,0.8)',
            marginBottom: 8,
            transition: 'opacity 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          👑 Start 7 Day Free Trial
        </button>

        <p style={{
          margin: 0, textAlign: 'center',
          fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)',
        }}>
          Then ${price}/month · Cancel anytime
        </p>

        <button
          onClick={onClose}
          style={{
            display: 'block', width: '100%', marginTop: 10,
            background: 'none', border: 'none',
            color: 'rgba(255,255,255,0.3)', fontSize: '0.78rem',
            cursor: 'pointer', padding: '2px 0',
          }}
        >
          No thanks, keep playing
        </button>
      </div>
    </div>
  );
};
