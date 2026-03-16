import { useState, useEffect, useRef } from 'react';
import './SplashScreen.css';

const PHRASES = [
  'Welcome to Afroslang',
  'Ready to learn?',
  'Our unique style will leave you doom scrolling',
  'Ready for your fyLp?',
];

const ACCENT_WORDS = new Set(['fyLp?']);
const LAST_IDX = PHRASES.length - 1;

const rand = (lo: number, hi: number) => Math.random() * (hi - lo) + lo;

// 0=red, 1=green, 2=yellow — cycling per character
const COLOR_CLASSES = ['sp-glyph--cr', 'sp-glyph--cg', 'sp-glyph--cy'] as const;

interface GlyphData {
  ch: string;
  gx: number; gy: number; gz: number;
  rx: number; ry: number; rz: number;
  gd: number;
  accent: boolean;
  colorIdx: number;
}

interface PhraseData {
  words: { glyphs: GlyphData[] }[];
  charCount: number;
}

function buildAllPhrases(): PhraseData[] {
  return PHRASES.map((text, pi) => {
    let charI = 0;
    const words = text.split(' ').map(word => {
      const isAccent = pi === LAST_IDX && ACCENT_WORDS.has(word);
      const glyphs: GlyphData[] = word.split('').map(ch => {
        const i = charI++;
        return {
          ch,
          gx:  rand(-420, 420),
          gy:  rand(-200, 200),
          gz:  rand(-1200, -200),
          rx:  rand(-150, 150),
          ry:  rand(-180, 180),
          rz:  rand(-32,  32),
          gd:  i * 8,             // 8 ms stagger — faster than before
          accent: isAccent,
          colorIdx: i % 3,
        };
      });
      return { glyphs };
    });
    const charCount = words.reduce((s, w) => s + w.glyphs.length, 0);
    return { words, charCount };
  });
}

const TRANSITION_MS       = 350;
const STAGGER_PER_CHAR_MS = 8;
const GAP_BETWEEN_MS      = 160;
const FINAL_HOLD_MS       = 1400;

// 8 flying birds spread across the screen
const BIRDS = [
  { size: 20, top: '12%',  delay: '0s',    dur: '7s'  },
  { size: 16, top: '24%',  delay: '1.4s',  dur: '9s'  },
  { size: 24, top: '38%',  delay: '2.8s',  dur: '7.5s'},
  { size: 14, top: '55%',  delay: '0.7s',  dur: '8.5s'},
  { size: 22, top: '68%',  delay: '3.5s',  dur: '6.8s'},
  { size: 18, top: '80%',  delay: '1.9s',  dur: '9.5s'},
  { size: 20, top: '8%',   delay: '4.2s',  dur: '8s'  },
  { size: 15, top: '90%',  delay: '5.1s',  dur: '7.2s'},
];

function assembleTime(charCount: number) {
  return charCount * STAGGER_PER_CHAR_MS + TRANSITION_MS;
}

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [started, setStarted]          = useState(false);
  const [activatedCount, setActivated] = useState(0);
  const tref       = useRef<ReturnType<typeof setTimeout>[]>([]);
  const hasStarted = useRef(false);
  const allPhraseData = useRef<PhraseData[]>(buildAllPhrases()).current;

  useEffect(() => () => { tref.current.forEach(clearTimeout); }, []);

  const handleStart = () => {
    if (hasStarted.current) return;
    hasStarted.current = true;
    setStarted(true);

    let t = 0;
    allPhraseData.forEach((pd, i) => {
      const id = setTimeout(() => setActivated(i + 1), t);
      tref.current.push(id);
      t += assembleTime(pd.charCount) + GAP_BETWEEN_MS;
    });
    tref.current.push(setTimeout(onComplete, t + FINAL_HOLD_MS));
  };

  // Auto-start after 3 seconds if no interaction
  useEffect(() => {
    const autoId = setTimeout(handleStart, 3000);
    return () => clearTimeout(autoId);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="sp-root">

      {/* ── Blurred atmospheric colour blobs ── */}
      <div className="sp-bg-blur" aria-hidden="true" />

      {/* ── Flying bird logos in the background ── */}
      <div className="sp-birds" aria-hidden="true">
        {BIRDS.map((b, i) => (
          <img
            key={i}
            src="/Afroslang.png"
            className="sp-bird"
            alt=""
            style={{
              width: b.size,
              height: b.size,
              top: b.top,
              animationDuration: b.dur,
              animationDelay: b.delay,
            }}
          />
        ))}
      </div>

      {/* ── Idle ── */}
      {!started && (
        <div className="sp-idle">
          <div className="sp-wordmark">AFRO<em>SLANG</em></div>
          <div className="sp-tagline">African Language Learning</div>
          <button className="sp-play-btn" onClick={handleStart} aria-label="Begin">
            <svg viewBox="0 0 24 24" fill="currentColor" width="38" height="38"
                 style={{ marginLeft: 5 }}>
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
          <div className="sp-hint">starts in 3s</div>
        </div>
      )}

      {/* ── All phrases stacked ── */}
      {started && (
        <div className="sp-stack">
          {allPhraseData.map((pd, pi) => {
            const active = activatedCount > pi;
            return (
              <div key={pi} className="sp-line">
                {pd.words.map((wd, wi) => (
                  <span key={wi} className="sp-word">
                    {wd.glyphs.map((g, ci) => (
                      <span
                        key={ci}
                        className={[
                          'sp-glyph',
                          active   ? 'sp-glyph--in'         : '',
                          g.accent ? 'sp-glyph--accent'     : COLOR_CLASSES[g.colorIdx],
                        ].filter(Boolean).join(' ')}
                        style={{
                          '--gx': `${g.gx}px`,
                          '--gy': `${g.gy}px`,
                          '--gz': `${g.gz}px`,
                          '--rx': `${g.rx}deg`,
                          '--ry': `${g.ry}deg`,
                          '--rz': `${g.rz}deg`,
                          '--gd': `${g.gd}ms`,
                        } as React.CSSProperties}
                      >
                        {g.ch}
                      </span>
                    ))}
                  </span>
                ))}
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
