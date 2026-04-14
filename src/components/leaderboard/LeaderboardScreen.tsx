import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Trophy, ChevronLeft } from 'lucide-react';

interface LeaderboardScreenProps {
  onBack: () => void;
}

export const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({ onBack }) => {
  const { user } = useAuth();

  const lbFont = "'Times New Roman', Georgia, serif";
  const lbBg = 'transparent';
  const lbSurface = 'rgba(6,3,1,0.82)';
  const lbBorder = 'rgba(255,255,255,0.08)';
  const lbRed = '#b00020';
  const lbText = '#f5ede0';
  const lbMuted = 'rgba(245,237,224,0.65)';
  const lbShadow = '0 1px 6px rgba(0,0,0,0.9)';

  return (
    <div style={{ minHeight: '100vh', background: lbBg, padding: '1.5rem', fontFamily: lbFont, position: 'relative', zIndex: 5 }}>
      <div style={{ maxWidth: 900, margin: '0 auto', background: 'rgba(6,3,1,0.82)', borderRadius: 18, padding: '1.5rem' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <button
            onClick={onBack}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#b00020', border: 'none', color: '#fff', padding: '0.6rem 1.2rem', borderRadius: 8, cursor: 'pointer', fontFamily: lbFont, fontSize: '0.9rem', fontWeight: 'bold', transition: 'background 0.2s' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = lbRed; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = lbBorder; }}
          >
            <ChevronLeft style={{ width: 18, height: 18 }} strokeWidth={2} />
            Back
          </button>

          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
              <Trophy style={{ width: 24, height: 24, color: lbRed }} strokeWidth={1.5} />
              <h1 style={{ color: lbText, fontSize: 'clamp(1.4rem, 4vw, 2rem)', fontFamily: lbFont, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0, textShadow: lbShadow }}>
                Leaderboard
              </h1>
            </div>
          </div>

          <div style={{ width: 80 }} />
        </div>

        {/* Top bar accent */}
        <div style={{ height: '2px', background: lbRed, marginBottom: '2rem', opacity: 0.7 }} />

        {/* Main content — auth-gated */}
        {!user ? (
          /* Not signed in */
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            minHeight: '50vh', textAlign: 'center', padding: '2rem 1rem',
          }}>
            <Trophy style={{ width: 64, height: 64, color: lbRed, marginBottom: '1.5rem', opacity: 0.7 }} strokeWidth={1.5} />
            <p style={{
              fontFamily: lbFont, fontWeight: 'bold',
              fontSize: 'clamp(1.1rem, 4vw, 1.6rem)',
              lineHeight: 1.4, margin: 0,
              maxWidth: 500, textShadow: lbShadow,
            }}>
              <span style={{ color: lbRed }}>Create an Account</span>
              <span style={{ color: lbText }}> or </span>
              <span style={{ color: lbRed }}>Sign in</span>
              <span style={{ color: lbText }}> to start tracking your progress vs Friends</span>
            </p>
            <p style={{ color: lbMuted, fontSize: '0.9rem', marginTop: '1rem', fontFamily: lbFont, textShadow: lbShadow }}>
              Compete weekly. Climb the leagues. Rise to the top.
            </p>
          </div>
        ) : (
          /* Signed in */
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            minHeight: '50vh', textAlign: 'center', padding: '2rem 1rem',
          }}>
            <Trophy style={{ width: 64, height: 64, color: lbRed, marginBottom: '1.5rem', opacity: 0.6 }} strokeWidth={1.5} />
            <p style={{
              fontFamily: lbFont, fontWeight: 'bold',
              fontSize: 'clamp(1.6rem, 5vw, 2.4rem)',
              color: lbText, margin: 0,
              letterSpacing: '0.02em', textShadow: lbShadow,
            }}>
              Coming Soon
            </p>
            <p style={{ color: lbMuted, fontSize: '0.9rem', marginTop: '1rem', fontFamily: lbFont, maxWidth: 400, textShadow: lbShadow }}>
              The leaderboard is being built. Your XP is already being tracked — be ready when it launches.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
