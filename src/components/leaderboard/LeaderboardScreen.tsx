import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Trophy, ChevronLeft } from 'lucide-react';

interface LeaderboardScreenProps {
  onBack: () => void;
}

export const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({ onBack }) => {
  const { user } = useAuth();

  const lbFont = "'Times New Roman', Georgia, serif";
  const lbRed = '#b00020';
  const lbText = '#f5ede0';
  const lbMuted = 'rgba(245,237,224,0.65)';
  const lbShadow = '0 1px 6px rgba(0,0,0,0.9)';

  return (
    <div style={{
      minHeight: '100dvh',
      background: 'transparent',
      padding: 'clamp(0.75rem, 3vw, 1.5rem)',
      fontFamily: lbFont,
      position: 'relative',
      zIndex: 5,
      boxSizing: 'border-box',
    }}>
      <div style={{
        maxWidth: 900,
        margin: '0 auto',
        background: 'rgba(6,3,1,0.82)',
        borderRadius: 18,
        padding: 'clamp(1rem, 4vw, 1.5rem)',
        overflow: 'hidden',
      }}>

        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.5rem',
          gap: '0.5rem',
          minWidth: 0,
        }}>
          <button
            onClick={onBack}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.3rem',
              background: lbRed, border: 'none', color: '#fff',
              padding: '0.5rem 0.85rem', borderRadius: 8,
              cursor: 'pointer', fontFamily: lbFont,
              fontSize: 'clamp(0.78rem, 2.5vw, 0.9rem)',
              fontWeight: 'bold', flexShrink: 0,
            }}
          >
            <ChevronLeft style={{ width: 16, height: 16 }} strokeWidth={2} />
            Back
          </button>

          <div style={{ textAlign: 'center', flex: 1, minWidth: 0, overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <Trophy style={{ width: 20, height: 20, color: lbRed, flexShrink: 0 }} strokeWidth={1.5} />
              <h1 style={{
                color: lbText,
                fontSize: 'clamp(1.1rem, 4vw, 2rem)',
                fontFamily: lbFont,
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                margin: 0,
                textShadow: lbShadow,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}>
                Leaderboard
              </h1>
            </div>
          </div>

          {/* Balancing spacer — shrinks on mobile */}
          <div style={{ width: 'clamp(0px, 10vw, 72px)', flexShrink: 0 }} />
        </div>

        {/* Top bar accent */}
        <div style={{ height: '2px', background: lbRed, marginBottom: '1.5rem', opacity: 0.7 }} />

        {/* Main content — auth-gated */}
        {!user ? (
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            minHeight: '45vh', textAlign: 'center', padding: '1.5rem 0.5rem',
          }}>
            <Trophy style={{ width: 52, height: 52, color: lbRed, marginBottom: '1.25rem', opacity: 0.7 }} strokeWidth={1.5} />
            <p style={{
              fontFamily: lbFont,
              fontWeight: 'bold',
              fontSize: 'clamp(0.95rem, 3.5vw, 1.5rem)',
              lineHeight: 1.5,
              margin: '0 0 0.75rem',
              maxWidth: 480,
              textShadow: lbShadow,
              wordBreak: 'break-word',
            }}>
              <span style={{ color: lbRed }}>Create an Account</span>
              <span style={{ color: lbText }}> or </span>
              <span style={{ color: lbRed }}>Sign in</span>
              <span style={{ color: lbText }}> to start tracking your progress vs Friends</span>
            </p>
            <p style={{
              color: lbMuted,
              fontSize: 'clamp(0.78rem, 2.5vw, 0.9rem)',
              margin: 0,
              fontFamily: lbFont,
              textShadow: lbShadow,
              maxWidth: 360,
            }}>
              Compete weekly. Climb the leagues. Rise to the top.
            </p>
          </div>
        ) : (
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            minHeight: '45vh', textAlign: 'center', padding: '1.5rem 0.5rem',
          }}>
            <Trophy style={{ width: 52, height: 52, color: lbRed, marginBottom: '1.25rem', opacity: 0.6 }} strokeWidth={1.5} />
            <p style={{
              fontFamily: lbFont,
              fontWeight: 'bold',
              fontSize: 'clamp(1.3rem, 5vw, 2.2rem)',
              color: lbText,
              margin: '0 0 0.75rem',
              letterSpacing: '0.02em',
              textShadow: lbShadow,
            }}>
              Coming Soon
            </p>
            <p style={{
              color: lbMuted,
              fontSize: 'clamp(0.78rem, 2.5vw, 0.9rem)',
              margin: 0,
              fontFamily: lbFont,
              maxWidth: 360,
              textShadow: lbShadow,
              lineHeight: 1.6,
            }}>
              The leaderboard is being built. Your XP is already being tracked — be ready when it launches.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
