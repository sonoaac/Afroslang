import { useState, useEffect, useRef, useCallback } from 'react';
import './SplashScreen.css';

const PHRASES = [
  'Welcome to Afroslang',
  'Ready to learn?',
  'Our unique style will leave you doom scrolling',
  'Ready for your fyLp?',
];

// Words to accent red in the last phrase
const ACCENT_WORDS = new Set(['fyLp?']);

const rand = (lo: number, hi: number) => Math.random() * (hi - lo) + lo;

interface Glyph {
  ch: string;
  gx: number;
  gy: number;
  gr: number;
  gd: number;   // assemble stagger delay (ms)
  god: number;  // scatter stagger delay (ms) — reverse order
  accent: boolean;
}

function buildGlyphs(text: string, phraseIdx: number): Glyph[] {
  const words = text.split(' ');
  const nonSpaceCount = text.replace(/ /g, '').length;
  let nonSpaceI = 0;

  const result: Glyph[] = [];

  words.forEach((word, wi) => {
    // Add space before every word except the first
    if (wi > 0) {
      result.push({ ch: ' ', gx: 0, gy: 0, gr: 0, gd: 0, god: 0, accent: false });
    }
    const isAccentWord = phraseIdx === PHRASES.length - 1 && ACCENT_WORDS.has(word);
    word.split('').forEach((ch) => {
      const i = nonSpaceI++;
      result.push({
        ch,
        gx: rand(-500, 500),
        gy: rand(-340, 340),
        gr: rand(-600, 600),
        gd:  i * 22,                            // forward stagger
        god: (nonSpaceCount - 1 - i) * 10,      // reverse stagger
        accent: isAccentWord,
      });
    });
  });

  return result;
}

type Phase = 'idle' | 'in' | 'hold' | 'out';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [started, setStarted]     = useState(false);
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [glyphs, setGlyphs]       = useState<Glyph[]>([]);
  const [phase, setPhase]         = useState<Phase>('idle');
  const tref = useRef<ReturnType<typeof setTimeout>[]>([]);

  const sched = (fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    tref.current.push(id);
  };

  useEffect(() => () => { tref.current.forEach(clearTimeout); }, []);

  const runPhrase = useCallback((idx: number) => {
    if (idx >= PHRASES.length) {
      onComplete();
      return;
    }

    const g = buildGlyphs(PHRASES[idx], idx);
    const nonSpaceCount = g.filter(c => c.ch !== ' ').length;

    setPhraseIdx(idx);
    setGlyphs(g);
    setPhase('in');

    const assembleMs = nonSpaceCount * 22 + 750;
    const scatterMs  = nonSpaceCount * 10 + 750;

    sched(() => {
      setPhase('hold');
      sched(() => {
        setPhase('out');
        sched(() => runPhrase(idx + 1), scatterMs);
      }, 2200);
    }, assembleMs);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onComplete]);

  const handleStart = () => {
    setStarted(true);
    runPhrase(0);
  };

  const isAssembled = phase === 'in' || phase === 'hold';
  const isExiting   = phase === 'out';

  return (
    <div className="sp-root">

      {/* ── Idle: wordmark + play button ── */}
      {!started && (
        <div className="sp-idle">
          <div className="sp-wordmark">
            AFRO<span>SLANG</span>
          </div>
          <div className="sp-tagline">African Language Learning</div>

          <button className="sp-play-btn" onClick={handleStart} aria-label="Begin">
            {/* Play triangle */}
            <svg viewBox="0 0 24 24" fill="currentColor" width="34" height="34"
                 style={{ marginLeft: 4 }}>
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>

          {/* Phrase dots preview */}
          <div className="sp-dots">
            {PHRASES.map((_, i) => (
              <div key={i} className="sp-dot" />
            ))}
          </div>
        </div>
      )}

      {/* ── Active: shattering text ── */}
      {started && (
        <>
          <div className="sp-stage" key={phraseIdx}>
            {glyphs.map((g, i) =>
              g.ch === ' ' ? (
                <span key={i} className="sp-space">&nbsp;</span>
              ) : (
                <span
                  key={i}
                  className={[
                    'sp-glyph',
                    isAssembled ? 'sp-glyph--in'  : '',
                    isExiting   ? 'sp-glyph--out' : '',
                    g.accent    ? 'sp-glyph--accent' : '',
                  ].filter(Boolean).join(' ')}
                  style={{
                    '--gx':  `${g.gx}px`,
                    '--gy':  `${g.gy}px`,
                    '--gr':  `${g.gr}deg`,
                    '--gd':  `${g.gd}ms`,
                    '--god': `${g.god}ms`,
                  } as React.CSSProperties}
                >
                  {g.ch}
                </span>
              )
            )}
          </div>

          {/* Progress dots */}
          <div className="sp-dots" style={{ position: 'absolute', bottom: '8vh' }}>
            {PHRASES.map((_, i) => (
              <div
                key={i}
                className={`sp-dot${i === phraseIdx ? ' sp-dot--active' : ''}`}
              />
            ))}
          </div>
        </>
      )}

    </div>
  );
}
