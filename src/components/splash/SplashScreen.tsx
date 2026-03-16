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
  { size: 20, top: '12%',  delay: '0s',    dur: '7s',   flapDur: '0.42s' },
  { size: 16, top: '24%',  delay: '1.4s',  dur: '9s',   flapDur: '0.38s' },
  { size: 24, top: '38%',  delay: '2.8s',  dur: '7.5s', flapDur: '0.45s' },
  { size: 14, top: '55%',  delay: '0.7s',  dur: '8.5s', flapDur: '0.35s' },
  { size: 22, top: '68%',  delay: '3.5s',  dur: '6.8s', flapDur: '0.40s' },
  { size: 18, top: '80%',  delay: '1.9s',  dur: '9.5s', flapDur: '0.44s' },
  { size: 20, top: '8%',   delay: '4.2s',  dur: '8s',   flapDur: '0.36s' },
  { size: 15, top: '90%',  delay: '5.1s',  dur: '7.2s', flapDur: '0.41s' },
];

interface BirdProps { size: number; idx: number; flapDur: string; }

function Bird3D({ size, idx, flapDur }: BirdProps) {
  const gTop = `bgt${idx}`;
  const gBot = `bgb${idx}`;
  const w = size * 5;
  const h = size * 2.5;
  return (
    <div className="sp-bird3d-scene" style={{ width: w, height: h }}>
      <svg viewBox="0 0 200 100" width={w} height={h} style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id={gTop} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff8a80" />
            <stop offset="60%" stopColor="#e53935" />
            <stop offset="100%" stopColor="#c62828" />
          </linearGradient>
          <linearGradient id={gBot} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7f0000" />
            <stop offset="50%" stopColor="#b71c1c" />
            <stop offset="100%" stopColor="#c62828" />
          </linearGradient>
        </defs>

        {/* Bottom wing — behind body */}
        <g className="sp-wing-bot" style={{ '--flap-dur': flapDur } as React.CSSProperties}>
          <path
            d="M105 56 C88 64 66 73 42 83 C27 90 11 93 3 90 C14 85 30 78 52 69 C74 60 93 55 105 56 Z"
            fill={`url(#${gBot})`}
          />
        </g>

        {/* Body */}
        <ellipse cx="122" cy="52" rx="26" ry="11" fill="#c62828" />

        {/* Tail */}
        <path d="M96,52 L76,43 L80,52 L76,61 Z" fill="#b71c1c" />

        {/* Head */}
        <circle cx="144" cy="43" r="13" fill="#c62828" />

        {/* Beak */}
        <path d="M157,42 L174,46 L157,49 Z" fill="#f9a825" />

        {/* Eye */}
        <circle cx="147" cy="41" r="3" fill="white" />
        <circle cx="148.5" cy="41" r="1.5" fill="#111" />

        {/* Top wing — in front of body */}
        <g className="sp-wing-top" style={{ '--flap-dur': flapDur } as React.CSSProperties}>
          <path
            d="M105 48 C88 40 66 31 42 21 C27 14 11 11 3 14 C14 19 30 26 52 35 C74 44 93 49 105 48 Z"
            fill={`url(#${gTop})`}
          />
          {/* Leading-edge highlight */}
          <path
            d="M105 48 C90 43 72 37 52 30 C38 25 22 19 10 15"
            fill="none"
            stroke="rgba(255,180,170,0.35)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
}

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

      {/* ── Flying 3D birds in the background ── */}
      <div className="sp-birds" aria-hidden="true">
        {BIRDS.map((b, i) => (
          <div
            key={i}
            className="sp-bird3d"
            style={{
              top: b.top,
              animationDuration: b.dur,
              animationDelay: b.delay,
            }}
          >
            <Bird3D size={b.size} idx={i} flapDur={b.flapDur} />
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
