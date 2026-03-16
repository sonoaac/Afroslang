import { useState, useEffect, useRef } from 'react';
import './SplashScreen.css';

const PHRASES = [
  'TALK LOUD',
  'GO DEEP',
  'STAY SHARP',
  'fyLp NOW',
];

const ACCENT_WORDS = new Set(['fyLp']);
const LAST_IDX = PHRASES.length - 1;

const rand = (lo: number, hi: number) => Math.random() * (hi - lo) + lo;

// All glyphs use the same dark-green class
const COLOR_CLASSES = ['sp-glyph--cg', 'sp-glyph--cg', 'sp-glyph--cg'] as const;

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

// Birds fly in from z-depth — 3 depth tiers so some pass close, others stay back
const BIRDS = [
  { size: 54, top: '12%',  delay: '0s',    dur: '8.0s',  bounceDur: '0.62s', flapDur: '0.38s', depth: 'close' },
  { size: 48, top: '28%',  delay: '2.3s',  dur: '10.5s', bounceDur: '0.70s', flapDur: '0.43s', depth: 'mid'   },
  { size: 60, top: '42%',  delay: '4.8s',  dur: '8.5s',  bounceDur: '0.57s', flapDur: '0.36s', depth: 'close' },
  { size: 38, top: '56%',  delay: '1.5s',  dur: '11.0s', bounceDur: '0.76s', flapDur: '0.45s', depth: 'far'   },
  { size: 52, top: '68%',  delay: '6.2s',  dur: '9.0s',  bounceDur: '0.64s', flapDur: '0.40s', depth: 'mid'   },
  { size: 44, top: '80%',  delay: '3.4s',  dur: '10.0s', bounceDur: '0.68s', flapDur: '0.44s', depth: 'mid'   },
  { size: 56, top: '8%',   delay: '7.0s',  dur: '8.0s',  bounceDur: '0.60s', flapDur: '0.39s', depth: 'close' },
  { size: 36, top: '90%',  delay: '5.2s',  dur: '11.5s', bounceDur: '0.80s', flapDur: '0.46s', depth: 'far'   },
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

      {/* ── Flying mascot birds in the background ── */}
      <div className="sp-birds" aria-hidden="true">
        {BIRDS.map((b, i) => (
          // Outer: 3D flight path — depth variant controls closest z-pass
          <div
            key={i}
            className={`sp-bird-fly sp-bird-fly--${b.depth}`}
            style={{
              top: b.top,
              animationDuration: b.dur,
              animationDelay: b.delay,
            }}
          >
            {/* Middle: Duo-style body bounce + squash/stretch + head tilt */}
            <div
              className="sp-bird-bounce"
              style={{
                '--bounce-dur': b.bounceDur,
                '--bounce-offset': `${i * 0.17}s`,
              } as React.CSSProperties}
            >
              {/* Inner img: wing-flap scaleX */}
              <img
                src="/Afroslang.png"
                className="sp-bird-img"
                alt=""
                style={{
                  width: b.size,
                  height: b.size,
                  '--flap-dur': b.flapDur,
                  '--flap-offset': `${i * 0.11}s`,
                } as React.CSSProperties}
              />
            </div>
          </div>
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
