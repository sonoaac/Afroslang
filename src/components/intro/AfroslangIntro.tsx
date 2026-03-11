import { useEffect, useState } from 'react';
import './AfroslangIntro.css';

interface AfroslangIntroProps {
  onComplete: () => void;
}

const LETTERS = ['A', 'F', 'R', 'O', 'S', 'L', 'A', 'N', 'G'];

// Stagger: first letter at 0.9s, each +0.11s
const LETTER_BASE_DELAY = 0.9;
const LETTER_STAGGER = 0.11;

// Phase timing (ms)
const BIRD_GLOW_DELAY  = 1300;
const ZOOM_DELAY       = 3000;
const COMPLETE_DELAY   = 3800;

export function AfroslangIntro({ onComplete }: AfroslangIntroProps) {
  const [phase, setPhase] = useState<'enter' | 'zoom' | 'fadeout'>('enter');
  const [birdGlowing, setBirdGlowing] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setBirdGlowing(true), BIRD_GLOW_DELAY);
    const t2 = setTimeout(() => setPhase('zoom'),    ZOOM_DELAY);
    const t3 = setTimeout(() => {
      setPhase('fadeout');
      // Small buffer so fadeout animation can play before unmount
      setTimeout(onComplete, 700);
    }, COMPLETE_DELAY);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  const handleSkip = () => {
    setPhase('fadeout');
    setTimeout(onComplete, 500);
  };

  return (
    <div className={`afro-intro${phase === 'fadeout' ? ' afro-intro--fadeout' : ''}`}>
      {/* Animated rain-streak background */}
      <div className="afro-intro-bg" aria-hidden="true" />

      {/* Central stage – zoom is applied here */}
      <div className={`afro-intro-stage${phase === 'zoom' ? ' afro-intro--zoom' : ''}`}>

        {/* Expanding pulse rings when bird lands */}
        <div style={{ position: 'relative' }}>
          <div className="afro-intro-pulse" aria-hidden="true" />
          <div className="afro-intro-pulse" aria-hidden="true" />
          <div className="afro-intro-pulse" aria-hidden="true" />

          {/* Bird mascot */}
          <div className={`afro-intro-bird${birdGlowing ? ' afro-intro-bird--glowing' : ''}`}>
            {logoError ? (
              <span style={{ fontSize: '5rem' }}>🐦</span>
            ) : (
              <img
                src="/Afroslang.png"
                alt="Afroslang mascot"
                onError={() => setLogoError(true)}
                draggable={false}
              />
            )}
          </div>
        </div>

        {/* Title: AFROSLANG */}
        <div className="afro-intro-title" aria-label="Afroslang">
          {/* The sweep bar passes behind all letters */}
          <div className="afro-intro-sweep" aria-hidden="true" />

          {LETTERS.map((letter, i) => (
            <span className="afro-intro-letter-wrap" key={i} aria-hidden="true">
              <span
                className="afro-intro-char"
                style={{
                  '--char-delay': `${LETTER_BASE_DELAY + i * LETTER_STAGGER}s`,
                } as React.CSSProperties}
              >
                {letter}
              </span>
            </span>
          ))}
        </div>

        {/* Ground glow line */}
        <div className="afro-intro-ground" aria-hidden="true" />

        {/* Tagline */}
        <p className="afro-intro-tagline">
          African Language Learning
        </p>
      </div>

      {/* Skip */}
      <button
        className="afro-intro-skip"
        onClick={handleSkip}
        aria-label="Skip intro"
      >
        Skip
      </button>
    </div>
  );
}
