import React, { useState, useEffect } from 'react';
import { Heart, Clock, Gem, X } from 'lucide-react';
import { getTimeUntilNextReset, formatTimeRemaining } from '../../utils/heartsTimer';
import { COST_HEARTS_REFILL } from '../../utils/currencyUtils';

interface HeartsOutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribe: () => void;
  heartsData: {
    currentHearts: number;
    lastResetTime: number;
    maxHearts: number;
  };
  isGuest?: boolean;
  currentGems?: number;
  onRefillWithGems?: () => Promise<boolean>;
}

export const HeartsOutModal: React.FC<HeartsOutModalProps> = ({
  isOpen,
  onClose,
  onSubscribe,
  heartsData,
  isGuest = false,
  currentGems = 0,
  onRefillWithGems,
}) => {
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [refilling, setRefilling] = useState(false);

  const handleGemRefill = async () => {
    if (!onRefillWithGems) return;
    setRefilling(true);
    const success = await onRefillWithGems();
    setRefilling(false);
    if (success) onClose();
  };

  useEffect(() => {
    if (!isOpen) return;
    const updateTimer = () => setTimeRemaining(getTimeUntilNextReset(heartsData.lastResetTime));
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [isOpen, heartsData.lastResetTime]);

  if (!isOpen) return null;

  return (
    <>
      {/* Spinning conic-gradient border keyframe */}
      <style>{`
        @property --hom-angle {
          syntax: "<angle>";
          inherits: false;
          initial-value: 0deg;
        }
        @keyframes hom-spin {
          to { --hom-angle: 360deg; }
        }
        .hom-spin-border {
          animation: hom-spin 4s linear infinite;
        }
      `}</style>

      {/* Backdrop */}
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: 'rgba(0,0,0,0.45)',
          backdropFilter: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '1rem',
        }}
      >
        {/* Spinning border wrapper */}
        <div
          className="hom-spin-border"
          style={{
            padding: 2,
            borderRadius: 32,
            background: `conic-gradient(
              from var(--hom-angle),
              rgba(255,255,255,0.08) 0deg,
              rgba(176,0,32,0.9)    120deg,
              rgba(255,255,255,0.08) 180deg,
              rgba(176,0,32,0.9)    300deg,
              rgba(255,255,255,0.08) 360deg
            )`,
            width: '100%',
            maxWidth: 380,
          }}
        >
          {/* Inner card */}
          <div
            style={{
              background: 'transparent',
              borderRadius: 30,
              padding: '2rem 1.75rem',
              position: 'relative',
              fontFamily: "'Times New Roman', Georgia, serif",
              color: '#f5f5f5',
            }}
          >
            {/* Close */}
            <button
              onClick={onClose}
              style={{
                position: 'absolute', top: 14, right: 14,
                width: 32, height: 32, borderRadius: '50%',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: '#888', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <X style={{ width: 15, height: 15 }} />
            </button>

            {/* Broken heart icon */}
            <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
              <div style={{ fontSize: 60, lineHeight: 1 }}>💔</div>
            </div>

            {/* Title */}
            <h2 style={{
              textAlign: 'center', margin: '0 0 0.6rem',
              fontSize: '1.45rem', fontWeight: 'bold', letterSpacing: '0.02em',
              color: '#fff',
            }}>
              {isGuest ? 'Oops! No More Hearts!' : 'Hearts Run Out!'}
            </h2>

            {/* Subtitle */}
            <p style={{
              textAlign: 'center', margin: '0 0 1.4rem',
              fontSize: '0.88rem', color: 'rgba(255,255,255,0.55)',
              lineHeight: 1.6,
            }}>
              {isGuest
                ? "You've used all your free hearts. Create a profile to get more hearts and continue learning!"
                : "You've used all your hearts. Refill with gems, wait for the reset, or go unlimited."}
            </p>

            {/* Timer (authenticated only) */}
            {!isGuest && (
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: '0.6rem', background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 12, padding: '0.75rem 1rem',
                marginBottom: '1.25rem',
              }}>
                <Clock style={{ width: 16, height: 16, color: '#888' }} />
                <span style={{ fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', letterSpacing: 1 }}>
                  Resets in
                </span>
                <span style={{ fontSize: '1rem', fontWeight: 'bold', color: '#f5f5f5' }}>
                  {formatTimeRemaining(timeRemaining)}
                </span>
              </div>
            )}

            {/* Hearts row */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: '1.5rem' }}>
              {Array.from({ length: heartsData.maxHearts }, (_, i) => (
                <div
                  key={i}
                  style={{
                    width: 34, height: 34, borderRadius: 8,
                    background: i < heartsData.currentHearts ? '#b00020' : 'rgba(255,255,255,0.06)',
                    border: `1px solid ${i < heartsData.currentHearts ? 'rgba(176,0,32,0.6)' : 'rgba(255,255,255,0.08)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <Heart
                    style={{
                      width: 16, height: 16,
                      fill: i < heartsData.currentHearts ? '#fff' : 'none',
                      color: i < heartsData.currentHearts ? '#fff' : 'rgba(255,255,255,0.2)',
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>

              {/* Guest: create profile */}
              {isGuest && (
                <>
                  <button
                    onClick={onSubscribe}
                    style={{
                      width: '100%', padding: '0.9rem',
                      background: '#b00020', border: 'none', borderRadius: 12,
                      color: '#fff', fontFamily: "'Times New Roman', Georgia, serif",
                      fontSize: '0.9rem', fontWeight: 'bold',
                      letterSpacing: '0.08em', textTransform: 'uppercase',
                      cursor: 'pointer', boxShadow: '0 4px 0 #6e0012',
                      transition: 'all 0.15s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#d00025')}
                    onMouseLeave={e => (e.currentTarget.style.background = '#b00020')}
                  >
                    🔐 Create Profile
                  </button>
                  <button
                    onClick={onClose}
                    style={{
                      width: '100%', padding: '0.75rem',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 12, color: 'rgba(255,255,255,0.5)',
                      fontFamily: "'Times New Roman', Georgia, serif",
                      fontSize: '0.85rem', fontWeight: 'bold',
                      cursor: 'pointer', transition: 'all 0.15s',
                    }}
                  >
                    Continue as Guest
                  </button>
                </>
              )}

              {/* Authenticated */}
              {!isGuest && (
                <>
                  {/* Gem refill — when user has enough gems */}
                  {onRefillWithGems && currentGems >= COST_HEARTS_REFILL && (
                    <button
                      onClick={handleGemRefill}
                      disabled={refilling}
                      style={{
                        width: '100%', padding: '0.9rem',
                        background: '#b00020', border: 'none', borderRadius: 12,
                        color: '#fff', fontFamily: "'Times New Roman', Georgia, serif",
                        fontSize: '0.9rem', fontWeight: 'bold',
                        letterSpacing: '0.08em', textTransform: 'uppercase',
                        cursor: refilling ? 'not-allowed' : 'pointer',
                        boxShadow: '0 4px 0 #6e0012',
                        opacity: refilling ? 0.6 : 1, transition: 'all 0.15s',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                      }}
                    >
                      <Gem style={{ width: 16, height: 16 }} />
                      {refilling ? 'Refilling…' : `Use ${COST_HEARTS_REFILL} Gems — Refill ❤️`}
                    </button>
                  )}

                  {/* Subscribe */}
                  <button
                    onClick={onSubscribe}
                    style={{
                      width: '100%', padding: '0.9rem',
                      background: 'rgba(176,0,32,0.12)',
                      border: '1px solid rgba(176,0,32,0.4)',
                      borderRadius: 12, color: '#f5f5f5',
                      fontFamily: "'Times New Roman', Georgia, serif",
                      fontSize: '0.9rem', fontWeight: 'bold',
                      letterSpacing: '0.08em', textTransform: 'uppercase',
                      cursor: 'pointer', transition: 'all 0.15s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(176,0,32,0.8)')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(176,0,32,0.4)')}
                  >
                    👑 Go Unlimited — Subscribe
                  </button>

                  {/* Wait */}
                  <button
                    onClick={onClose}
                    style={{
                      width: '100%', padding: '0.75rem',
                      background: 'transparent',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 12, color: 'rgba(255,255,255,0.35)',
                      fontFamily: "'Times New Roman', Georgia, serif",
                      fontSize: '0.82rem', cursor: 'pointer', transition: 'all 0.15s',
                    }}
                  >
                    Wait for Reset
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
