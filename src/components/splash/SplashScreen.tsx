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

interface GlyphData {
  ch: string;
  gx: number; gy: number; gz: number;
  rx: number; ry: number; rz: number;
  gd: number;
  accent: boolean;
}

interface PhraseData {
  words: { glyphs: GlyphData[] }[];
  charCount: number;
}

function buildAllPhrases(): PhraseData[] {
  return PHRASES.map((text, pi) =>  {
    let charI = 0;
    const words = text.split(' ').map(word => {
      const isAccent = pi === LAST_IDX && ACCENT_WORDS.has(word);
      const glyphs: GlyphData[] = word.split('').map(ch => {
        const i = charI++;
        return {
          ch,
          gx:  rand(-380, 380),
          gy:  rand(-180, 180),
          gz:  rand(-900, -120),  // start deep behind screen
          rx:  rand(-130, 130),
          ry:  rand(-160, 160),
          rz:  rand(-28,  28),
          gd:  i * 14,            // 14 ms stagger per char
          accent: isAccent,
        };
      });
      return { glyphs };
    });
    const charCount = words.reduce((s, w) => s + w.glyphs.length, 0);
    return { words, charCount };
  });
}

const TRANSITION_MS        = 520;
const STAGGER_PER_CHAR_MS  = 14;
const GAP_BETWEEN_MS       = 280;
const FINAL_HOLD_MS        = 1800;

function assembleTime(charCount: number) {
  return charCount * STAGGER_PER_CHAR_MS + TRANSITION_MS;
}

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [started, setStarted]           = useState(false);
  const [activatedCount, setActivated]  = useState(0);
  const tref          = useRef<ReturnType<typeof setTimeout>[]>([]);
  const allPhraseData = useRef<PhraseData[]>(buildAllPhrases()).current;

  useEffect(() => () => { tref.current.forEach(clearTimeout); }, []);

  const handleStart = () => {
    setStarted(true);

    let t = 0;
    allPhraseData.forEach((pd, i) => {
      const id = setTimeout(() => setActivated(i + 1), t);
      tref.current.push(id);
      t += assembleTime(pd.charCount) + GAP_BETWEEN_MS;
    });

    tref.current.push(setTimeout(onComplete, t + FINAL_HOLD_MS));
  };

  return (
    <div className="sp-root">

      {/* ── Idle ── */}
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
        </div>
      )}

      {/* ── All phrases stacked, each assembles from 3-D shatter ── */}
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
                          active    ? 'sp-glyph--in'     : '',
                          g.accent  ? 'sp-glyph--accent' : '',
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
