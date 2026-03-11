import { useState, useEffect, useRef, useCallback } from 'react';
import './SplashScreen.css';

const PHRASES = [
  'Welcome to Afroslang',
  'Ready to learn?',
  'Our unique style will leave you doom scrolling',
  'Ready for your fyLp?',
];

// Words to highlight red in the final phrase
const ACCENT_WORDS = new Set(['fyLp?']);

const rand = (lo: number, hi: number) => Math.random() * (hi - lo) + lo;

interface Glyph {
  ch: string;
  gx: number;
  gy: number;
  gr: number;
  gd: number;   // assemble delay (ms) — forward stagger
  god: number;  // scatter delay (ms) — forward stagger (first char shatters first)
  accent: boolean;
}

interface WordGroup {
  glyphs: Glyph[];
}

// Build per-word groups — words never break; only wrapping between words
function buildWordGroups(text: string, phraseIdx: number): WordGroup[] {
  const words = text.split(' ');
  let charI = 0;

  return words.map((word) => {
    const isAccent = phraseIdx === PHRASES.length - 1 && ACCENT_WORDS.has(word);
    const glyphs: Glyph[] = word.split('').map((ch) => {
      const i = charI++;
      return {
        ch,
        gx: rand(-520, 520),
        gy: rand(-360, 360),
        gr: rand(-660, 660),
        gd:  i * 10,   // fast assembly stagger
        god: i * 25,   // slow scatter stagger
        accent: isAccent,
      };
    });
    return { glyphs };
  });
}

type Phase = 'idle' | 'in' | 'hold' | 'out';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [started, setStarted]         = useState(false);
  const [phraseIdx, setPhraseIdx]     = useState(0);
  const [wordGroups, setWordGroups]   = useState<WordGroup[]>([]);
  const [phase, setPhase]             = useState<Phase>('idle');
  const tref = useRef<ReturnType<typeof setTimeout>[]>([]);

  const sched = (fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    tref.current.push(id);
  };

  useEffect(() => () => { tref.current.forEach(clearTimeout); }, []);

  const runPhrase = useCallback((idx: number) => {
    if (idx >= PHRASES.length) { onComplete(); return; }

    const groups = buildWordGroups(PHRASES[idx], idx);
    const nonSpaceCount = groups.reduce((s, w) => s + w.glyphs.length, 0);

    setPhraseIdx(idx);
    setWordGroups(groups);
    setPhase('in');

    // Assemble: last char at nonSpaceCount*10ms + 500ms transition
    const assembleMs = nonSpaceCount * 10 + 550;
    // Scatter:  last char at nonSpaceCount*25ms + 1100ms transition
    const scatterMs  = nonSpaceCount * 25 + 1200;

    sched(() => {
      setPhase('hold');
      sched(() => {
        setPhase('out');
        sched(() => runPhrase(idx + 1), scatterMs);
      }, 2000);
    }, assembleMs);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onComplete]);

  const handleStart = () => { setStarted(true); runPhrase(0); };

  const isAssembled = phase === 'in' || phase === 'hold';
  const isExiting   = phase === 'out';

  return (
    <div className="sp-root">

      {/* ── Idle screen ── */}
      {!started && (
        <div className="sp-idle">
          <div className="sp-wordmark">AFRO<em>SLANG</em></div>
          <div className="sp-tagline">African Language Learning</div>
          <button className="sp-play-btn" onClick={handleStart} aria-label="Begin">
            <svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36"
                 style={{ marginLeft: 5 }}>
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
          <div className="sp-dots">
            {PHRASES.map((_, i) => <div key={i} className="sp-dot" />)}
          </div>
        </div>
      )}

      {/* ── Animating phrases ── */}
      {started && (
        <>
          {/* Each word is an atomic block — never breaks mid-word */}
          <div className="sp-stage" key={phraseIdx}>
            {wordGroups.map((wg, wi) => (
              <span key={wi} className="sp-word">
                {wg.glyphs.map((g, ci) => (
                  <span
                    key={ci}
                    className={[
                      'sp-glyph',
                      isAssembled ? 'sp-glyph--in'     : '',
                      isExiting   ? 'sp-glyph--out'    : '',
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
                ))}
              </span>
            ))}
          </div>

          {/* Phrase progress dots */}
          <div className="sp-dots sp-dots--bottom">
            {PHRASES.map((_, i) => (
              <div key={i} className={`sp-dot${i === phraseIdx ? ' sp-dot--active' : ''}`} />
            ))}
          </div>
        </>
      )}

    </div>
  );
}
