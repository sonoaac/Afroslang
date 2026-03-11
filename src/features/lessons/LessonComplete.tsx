import { InterfaceLanguage } from '../../types';
import { Trophy, Star, Flame, Award, Zap, Home } from 'lucide-react';

interface LessonCompleteProps {
  interfaceLanguage: InterfaceLanguage;
  xpEarned: number;
  onContinue: () => void;
  onBackToLanguageSelect: () => void;
}

const lcStyle: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1.5rem',
    background: '#080808',
    fontFamily: "'Times New Roman', Georgia, serif",
    position: 'relative',
    overflow: 'hidden',
  },
  glow: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '600px',
    height: '600px',
    background: 'radial-gradient(circle, rgba(176,0,32,0.08) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  wrapper: {
    maxWidth: '700px',
    width: '100%',
    position: 'relative',
    zIndex: 1,
  },
  homeRow: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '1.5rem',
  },
  homeBtn: {
    background: '#111',
    border: '1px solid rgba(255,255,255,0.08)',
    color: '#fff',
    width: 44,
    height: 44,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'border-color 0.2s',
  },
  card: {
    background: '#111',
    border: '1px solid rgba(255,255,255,0.08)',
    padding: '2.5rem 2rem',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  cardTopLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '2px',
    background: '#b00020',
  },
  trophyWrap: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '2rem',
  },
  trophyCircle: {
    width: 96,
    height: 96,
    background: 'transparent',
    border: '1px solid rgba(176,0,32,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  completeLabel: {
    fontFamily: "'Times New Roman', Georgia, serif",
    fontSize: 'clamp(2rem, 6vw, 4rem)',
    fontWeight: 'bold',
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    marginBottom: '0.5rem',
  },
  subtitle: {
    fontFamily: "'Times New Roman', Georgia, serif",
    fontSize: '1.1rem',
    color: 'rgba(255,255,255,0.6)',
    marginBottom: '2rem',
    letterSpacing: '0.05em',
  },
  xpBox: {
    background: '#080808',
    border: '1px solid rgba(176,0,32,0.4)',
    padding: '1.5rem',
    marginBottom: '2rem',
    display: 'inline-block',
    width: '100%',
  },
  xpLabel: {
    fontFamily: "'Times New Roman', Georgia, serif",
    color: 'rgba(255,255,255,0.6)',
    fontSize: '0.8rem',
    textTransform: 'uppercase',
    letterSpacing: '0.2em',
    marginBottom: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
  },
  xpValue: {
    fontFamily: "'Times New Roman', Georgia, serif",
    fontSize: 'clamp(3rem, 10vw, 6rem)',
    fontWeight: 'bold',
    color: '#b00020',
    lineHeight: 1,
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '0.75rem',
    marginBottom: '2rem',
  },
  statCard: {
    background: '#080808',
    border: '1px solid rgba(255,255,255,0.06)',
    padding: '1rem 0.5rem',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '0.4rem',
  },
  statLabel: {
    fontFamily: "'Times New Roman', Georgia, serif",
    color: 'rgba(255,255,255,0.5)',
    fontSize: '0.7rem',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  },
  continueBtn: {
    width: '100%',
    background: '#b00020',
    border: 'none',
    color: '#fff',
    fontFamily: "'Times New Roman', Georgia, serif",
    fontSize: 'clamp(1rem, 3vw, 1.4rem)',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    padding: '1.1rem 2rem',
    cursor: 'pointer',
    transition: 'background 0.2s',
    marginBottom: '1.25rem',
  },
  motiveLine: {
    fontFamily: "'Times New Roman', Georgia, serif",
    color: 'rgba(255,255,255,0.35)',
    fontSize: '0.85rem',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  },
};

export function LessonComplete({ interfaceLanguage, xpEarned, onContinue, onBackToLanguageSelect }: LessonCompleteProps) {
  const isEnglish = interfaceLanguage === 'en';

  return (
    <div style={lcStyle.page}>
      {/* Subtle red glow */}
      <div style={lcStyle.glow} />

      <div style={lcStyle.wrapper}>
        {/* Home Button */}
        <div style={lcStyle.homeRow}>
          <button
            onClick={onBackToLanguageSelect}
            style={lcStyle.homeBtn}
            aria-label="Back to language selection"
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#b00020'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.08)'; }}
          >
            <Home style={{ width: 20, height: 20 }} strokeWidth={2} />
          </button>
        </div>

        <div style={lcStyle.card}>
          <div style={lcStyle.cardTopLine} />

          {/* Trophy */}
          <div style={lcStyle.trophyWrap}>
            <div style={lcStyle.trophyCircle}>
              <Trophy style={{ width: 48, height: 48, color: '#b00020' }} strokeWidth={1.5} />
            </div>
          </div>

          {/* Heading */}
          <h1 style={lcStyle.completeLabel}>
            {isEnglish ? 'Complete' : 'Terminé'}
          </h1>
          <p style={lcStyle.subtitle}>
            {isEnglish ? 'Lesson complete' : 'Leçon terminée'}
          </p>

          {/* XP Display */}
          <div style={lcStyle.xpBox}>
            <div style={lcStyle.xpLabel}>
              <Zap style={{ width: 14, height: 14, color: '#b00020' }} />
              {isEnglish ? 'XP Earned' : 'XP Gagné'}
              <Zap style={{ width: 14, height: 14, color: '#b00020' }} />
            </div>
            <div style={lcStyle.xpValue}>+{xpEarned}</div>
          </div>

          {/* Stats row */}
          <div style={lcStyle.statsGrid}>
            <div style={lcStyle.statCard}>
              <Flame style={{ width: 20, height: 20, color: '#b00020' }} strokeWidth={1.5} />
              <span style={lcStyle.statLabel}>{isEnglish ? 'On Fire' : 'En Feu'}</span>
            </div>
            <div style={lcStyle.statCard}>
              <Star style={{ width: 20, height: 20, color: '#b00020' }} strokeWidth={1.5} />
              <span style={lcStyle.statLabel}>{isEnglish ? 'Star' : 'Étoile'}</span>
            </div>
            <div style={lcStyle.statCard}>
              <Award style={{ width: 20, height: 20, color: '#b00020' }} strokeWidth={1.5} />
              <span style={lcStyle.statLabel}>{isEnglish ? 'Champion' : 'Champion'}</span>
            </div>
          </div>

          {/* Continue Button */}
          <button
            onClick={onContinue}
            style={lcStyle.continueBtn}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#e53935'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#b00020'; }}
          >
            {isEnglish ? 'Continue →' : 'Continuer →'}
          </button>

          <p style={lcStyle.motiveLine}>
            {isEnglish ? "You're unstoppable" : 'Vous êtes imbattable'}
          </p>
        </div>
      </div>
    </div>
  );
}
