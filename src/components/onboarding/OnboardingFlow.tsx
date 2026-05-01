import { useState, useEffect, useCallback } from 'react';

// ── Static data ───────────────────────────────────────────────────────────────

const LANGUAGES = [
  { id: 'swahili',  label: 'Swahili',  flag: '🇰🇪', region: 'East Africa' },
  { id: 'yoruba',   label: 'Yoruba',   flag: '🇳🇬', region: 'West Africa' },
  { id: 'hausa',    label: 'Hausa',    flag: '🇳🇬', region: 'West Africa' },
  { id: 'igbo',     label: 'Igbo',     flag: '🇳🇬', region: 'Nigeria' },
  { id: 'zulu',     label: 'Zulu',     flag: '🇿🇦', region: 'South Africa' },
  { id: 'amharic',  label: 'Amharic',  flag: '🇪🇹', region: 'East Africa' },
  { id: 'arabic',   label: 'Arabic',   flag: '🇪🇬', region: 'North Africa' },
];

const SOURCES = [
  { id: 'tiktok',    label: 'TikTok' },
  { id: 'instagram', label: 'Instagram' },
  { id: 'twitter',   label: 'Twitter/X' },
  { id: 'friend',    label: 'A Friend' },
  { id: 'appstore',  label: 'App Store' },
  { id: 'youtube',   label: 'YouTube' },
  { id: 'google',    label: 'Google' },
];

// ── Social media SVG icons ────────────────────────────────────────────────────

function IconTikTok() {
  return (
    <svg width="26" height="26" viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="10" fill="#000"/>
      <path d="M34.1 14.5a8.7 8.7 0 01-5.4-5.5h-4.5v20.6a4.1 4.1 0 01-4.1 3.7 4.1 4.1 0 01-4.1-4.1 4.1 4.1 0 014.1-4.1c.4 0 .8.06 1.1.15V20.7a8.7 8.7 0 00-1.1-.07 8.7 8.7 0 00-8.7 8.7 8.7 8.7 0 008.7 8.7 8.7 8.7 0 008.7-8.7V19.6a13.4 13.4 0 007.8 2.5v-4.5a8.7 8.7 0 01-2.5-.6z" fill="white"/>
      <path d="M34.1 14.5a8.7 8.7 0 01-5.4-5.5h-4.5v20.6a4.1 4.1 0 01-4.1 3.7 4.1 4.1 0 01-4.1-4.1 4.1 4.1 0 014.1-4.1c.4 0 .8.06 1.1.15V20.7a8.7 8.7 0 00-1.1-.07 8.7 8.7 0 00-8.7 8.7 8.7 8.7 0 008.7 8.7 8.7 8.7 0 008.7-8.7V19.6a13.4 13.4 0 007.8 2.5v-4.5a8.7 8.7 0 01-2.5-.6z" fill="#69C9D0" opacity="0.5"/>
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg width="26" height="26" viewBox="0 0 48 48" fill="none">
      <defs>
        <radialGradient id="ig1" cx="30%" cy="107%" r="120%">
          <stop offset="0%" stopColor="#fdf497"/>
          <stop offset="10%" stopColor="#fdf497"/>
          <stop offset="50%" stopColor="#fd5949"/>
          <stop offset="68%" stopColor="#d6249f"/>
          <stop offset="100%" stopColor="#285AEB"/>
        </radialGradient>
      </defs>
      <rect width="48" height="48" rx="12" fill="url(#ig1)"/>
      <rect x="11" y="11" width="26" height="26" rx="7" stroke="white" strokeWidth="2.5" fill="none"/>
      <circle cx="24" cy="24" r="7" stroke="white" strokeWidth="2.5" fill="none"/>
      <circle cx="33" cy="15" r="2" fill="white"/>
    </svg>
  );
}

function IconTwitterX() {
  return (
    <svg width="26" height="26" viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="10" fill="#000"/>
      <path d="M28.4 21.5L38.3 10h-2.4L27.4 20l-7.2-10H11l10.4 14.5L11 38h2.4l9.1-10.1 7.3 10.1H39L28.4 21.5zm-3.2 3.6l-1-1.5L14.3 12h3.6l6.9 9.5 1 1.5 9 12.5h-3.6l-5.9-8.4z" fill="white"/>
    </svg>
  );
}

function IconFriend() {
  return (
    <svg width="26" height="26" viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="10" fill="#4CAF50"/>
      <circle cx="18" cy="18" r="6" stroke="white" strokeWidth="2.5" fill="none"/>
      <path d="M6 38c0-6.6 5.4-12 12-12" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <circle cx="32" cy="16" r="5" stroke="white" strokeWidth="2" fill="none"/>
      <path d="M38 34c0-5.5-4.5-10-10-10" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

function IconAppStore() {
  return (
    <svg width="26" height="26" viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="10" fill="#0070C9"/>
      <path d="M24 9.5c-1.8 0-3.4 1-4.3 2.5L9.8 29.5a5 5 0 004.3 7.5h19.8a5 5 0 004.3-7.5L28.3 12C27.4 10.5 25.8 9.5 24 9.5z" fill="white"/>
      <path d="M19 33h10M24 18v8" stroke="#0070C9" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  );
}

function IconYouTube() {
  return (
    <svg width="26" height="26" viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="10" fill="#FF0000"/>
      <rect x="8" y="14" width="32" height="20" rx="5" fill="#FF0000" stroke="white" strokeWidth="2"/>
      <path d="M21 19l12 5-12 5V19z" fill="white"/>
    </svg>
  );
}

function IconGoogle() {
  return (
    <svg width="26" height="26" viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="10" fill="white"/>
      <path d="M43.6 24.5c0-1.4-.12-2.8-.35-4.1H24v7.8h11c-.5 2.5-1.9 4.6-4 6v5h6.5c3.8-3.5 6.1-8.7 6.1-14.7z" fill="#4285F4"/>
      <path d="M24 44c5.4 0 10-1.8 13.3-4.8l-6.5-5c-1.8 1.2-4.1 1.9-6.8 1.9-5.2 0-9.7-3.5-11.3-8.3H5v5.2C8.3 39.4 15.6 44 24 44z" fill="#34A853"/>
      <path d="M12.7 27.8a12 12 0 010-7.6V15H5A19.8 19.8 0 005 33l7.7-5.2z" fill="#FBBC05"/>
      <path d="M24 12.1c2.9 0 5.5 1 7.5 2.9l5.6-5.6C33.9 6.3 29.3 4.2 24 4.2c-8.4 0-15.7 4.6-19 11.4l7.7 5.2C14.3 15.6 18.8 12.1 24 12.1z" fill="#EA4335"/>
    </svg>
  );
}

const SOURCE_ICON: Record<string, React.ReactNode> = {
  tiktok:    <IconTikTok />,
  instagram: <IconInstagram />,
  twitter:   <IconTwitterX />,
  friend:    <IconFriend />,
  appstore:  <IconAppStore />,
  youtube:   <IconYouTube />,
  google:    <IconGoogle />,
};

const LEVELS = [
  { id: 'zero',   label: "I'm brand new",          bars: 0 },
  { id: 'some',   label: 'I know some words',       bars: 1 },
  { id: 'convo',  label: 'I can hold a convo',      bars: 2 },
  { id: 'fluent', label: "I'm lowkey fluent",        bars: 3 },
  { id: 'native', label: "I'm basically a native",   bars: 4 },
];

const GOALS = [
  { id: 'roots',   label: 'Stay connected to roots',  emoji: '🌍' },
  { id: 'culture', label: 'Support my culture',        emoji: '✊' },
  { id: 'fun',     label: 'Just for fun',              emoji: '😄' },
  { id: 'travel',  label: 'Travel',                   emoji: '✈️' },
  { id: 'career',  label: 'Career',                   emoji: '💼' },
  { id: 'fam',     label: 'Connect with fam',          emoji: '👨‍👩‍👧‍👦' },
  { id: 'other',   label: 'Other',                    emoji: '💡' },
];

const DAILY = [
  { id: '5',  label: '5 min',  subtitle: 'Chill',   emoji: '😎' },
  { id: '10', label: '10 min', subtitle: 'Regular', emoji: '📚' },
  { id: '15', label: '15 min', subtitle: 'Serious', emoji: '💪' },
  { id: '20', label: '20 min', subtitle: 'No cap',  emoji: '🔥' },
];

const GREEN  = '#4CAF50';
const BLACK  = '#000000';
const DARK   = '#0d0d0d';
const FONT   = "'Plus Jakarta Sans', sans-serif";

// Steps 1-11 are the "question" steps. Step 0 = welcome (no bar). Step 12 = free confirm.
const TOTAL_Q = 11;

// ── Sub-components ────────────────────────────────────────────────────────────

function Wave() {
  return (
    <svg viewBox="0 0 390 28" xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', width: '100%', flexShrink: 0, marginBottom: -1 }}>
      <path d="M0,14 Q65,0 130,14 Q195,28 260,14 Q325,0 390,14 L390,28 L0,28 Z" fill={GREEN} />
    </svg>
  );
}

function SignalBars({ count }: { count: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 22, flexShrink: 0 }}>
      {[0, 1, 2, 3, 4].map(i => (
        <div key={i} style={{
          width: 5, height: 7 + i * 3, borderRadius: 2,
          background: i <= count ? GREEN : 'rgba(255,255,255,0.18)',
        }} />
      ))}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

interface OnboardingFlowProps {
  onSignIn: () => void;
  onComplete: (selectedLanguage: string, plan: 'plus' | 'free') => void;
}

export function OnboardingFlow({ onSignIn, onComplete }: OnboardingFlowProps) {
  const [step, setStep]         = useState(0);
  const [animKey, setAnimKey]   = useState(0);
  const [selectedLang, setSelectedLang] = useState('');
  const [discovery, setDiscovery]       = useState('');
  const [level, setLevel]               = useState('');
  const [goals, setGoals]               = useState<string[]>([]);
  const [dailyGoal, setDailyGoal]       = useState('');

  const go = useCallback((n: number) => {
    setStep(n);
    setAnimKey(k => k + 1);
  }, []);

  const next = useCallback(() => go(step + 1), [step, go]);

  // Auto-advance: loading (step 4) and affirm (step 7)
  useEffect(() => {
    if (step === 4) { const t = setTimeout(() => go(5), 2800); return () => clearTimeout(t); }
    if (step === 7) { const t = setTimeout(() => go(8), 2200); return () => clearTimeout(t); }
  }, [step, go]);

  const progress = step < 1 ? 0 : Math.min(100, Math.round((step / TOTAL_Q) * 100));

  const toggleGoal = (id: string) =>
    setGoals(prev => prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]);

  // ── Shared CSS injected once ────────────────────────────────────────────────

  const css = `
    @keyframes ob-fadein  { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
    @keyframes ob-bounce  { 0%,100% { transform:translateY(0)  } 50% { transform:translateY(-10px); } }
    @keyframes ob-pulse   { 0%,100% { opacity:1; } 50% { opacity:0.45; } }
    @keyframes ob-barfill { from { width:0; } to { width:72%; } }
    .ob-anim { animation: ob-fadein 0.32s ease both; }
    .ob-card {
      width:100%; max-width:390px;
      height:100dvh; max-height:900px;
      display:flex; flex-direction:column;
      background:${DARK}; position:relative; overflow:hidden;
    }
    .ob-progress { height:3px; background:rgba(255,255,255,0.08); flex-shrink:0; }
    .ob-progress-fill { height:100%; background:${GREEN}; transition:width 0.4s ease; }
    .ob-content {
      flex:1; display:flex; flex-direction:column;
      align-items:center; justify-content:center;
      padding:1.4rem 1.2rem; overflow-y:auto; gap:1.1rem;
    }
    .ob-content-top {
      flex:1; display:flex; flex-direction:column;
      align-items:center; justify-content:flex-start;
      padding:1.1rem 1.2rem 0; overflow-y:auto; gap:0.7rem;
    }
    .ob-bottom { background:${GREEN}; padding:1.2rem 1.2rem 2.2rem; display:flex; flex-direction:column; gap:0.7rem; flex-shrink:0; }
    .ob-btn-primary {
      background:${BLACK}; color:#fff; border:none; border-radius:30px;
      padding:1rem; font-size:0.97rem; font-weight:800; font-family:${FONT};
      cursor:pointer; width:100%; letter-spacing:0.6px; transition:opacity 0.15s;
    }
    .ob-btn-primary:disabled { opacity:0.45; cursor:not-allowed; }
    .ob-btn-primary:not(:disabled):active { opacity:0.8; }
    .ob-btn-outline {
      background:transparent; color:${BLACK}; border:2px solid ${BLACK}; border-radius:30px;
      padding:0.85rem; font-size:0.92rem; font-weight:700; font-family:${FONT};
      cursor:pointer; width:100%; letter-spacing:0.5px;
    }
    .ob-row-btn {
      background:#1a1a1a; border:1.5px solid #252525; border-radius:13px;
      padding:0.75rem 0.9rem; display:flex; align-items:center; gap:0.7rem;
      cursor:pointer; width:100%; font-family:${FONT}; transition:border-color 0.15s, background 0.15s;
      text-align:left;
    }
    .ob-row-btn:hover { border-color:${GREEN}; background:rgba(76,175,80,0.08); }
    .ob-row-btn.sel { border-color:${GREEN}; background:rgba(76,175,80,0.12); }
    .ob-check { width:20px; height:20px; border-radius:6px; border:2px solid #333; display:flex; align-items:center; justify-content:center; flex-shrink:0; transition:background 0.15s, border-color 0.15s; }
    .ob-check.on { background:${GREEN}; border-color:${GREEN}; }
    .ob-daily-btn {
      background:#1a1a1a; border:1.5px solid #252525; border-radius:14px;
      padding:0.9rem 0.4rem; display:flex; flex-direction:column;
      align-items:center; gap:0.3rem; cursor:pointer; flex:1;
      transition:border-color 0.15s, background 0.15s; font-family:${FONT};
    }
    .ob-daily-btn.sel { border-color:${GREEN}; background:rgba(76,175,80,0.13); }
    .ob-bubble {
      background:#1c1c1c; border:1.5px solid rgba(76,175,80,0.35);
      border-radius:18px; padding:1rem 1.2rem; color:#fff;
      font-family:${FONT}; font-size:1rem; font-weight:600;
      text-align:center; max-width:270px; position:relative; line-height:1.45;
    }
    .ob-bubble::before {
      content:''; position:absolute; top:-10px; left:50%; transform:translateX(-50%);
      width:0; height:0; border-left:9px solid transparent;
      border-right:9px solid transparent; border-bottom:10px solid rgba(76,175,80,0.35);
    }
    .ob-mascot { width:90px; height:90px; object-fit:contain; filter:drop-shadow(0 4px 18px rgba(76,175,80,0.45)); }
    .ob-heading { color:#fff; font-family:${FONT}; font-weight:800; font-size:1.25rem; text-align:center; line-height:1.2; margin:0; }
    .ob-sub { color:rgba(255,255,255,0.5); font-family:${FONT}; font-size:0.85rem; text-align:center; line-height:1.5; margin:0; }
  `;

  // ── Shared structural pieces ────────────────────────────────────────────────

  const ProgressBar = () => (
    <div className="ob-progress">
      <div className="ob-progress-fill" style={{ width: `${progress}%` }} />
    </div>
  );

  const Overlay = ({ children }: { children: React.ReactNode }) => (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <style>{css}</style>
      {children}
    </div>
  );

  // ── STEP 0: Welcome ─────────────────────────────────────────────────────────
  if (step === 0) {
    return (
      <Overlay>
        <div className="ob-card">
          {/* Black top zone */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.2rem', padding: '2rem 1.5rem' }} className="ob-anim">
            <img src="/Afroslang.png" alt="Afroslang" className="ob-mascot"
              style={{ width: 100, height: 100, animation: 'ob-bounce 2.4s ease-in-out infinite' }} />
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: '#fff', fontFamily: FONT, fontWeight: 900, fontSize: '2rem', margin: '0 0 0.3rem', letterSpacing: 1 }}>
                Afro<span style={{ color: '#b00020' }}>slang</span>
              </p>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontFamily: FONT, fontSize: '0.85rem', margin: 0, letterSpacing: 0.5 }}>
                The living dictionary of African street slang
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              {['🇳🇬','🇰🇪','🇿🇦','🇪🇹','🌍'].map((f, i) => (
                <span key={i} style={{ fontSize: '1.3em', opacity: 0.7 + i * 0.06 }}>{f}</span>
              ))}
            </div>
          </div>
          <Wave />
          {/* Green bottom zone */}
          <div style={{ background: GREEN, padding: '1.4rem 1.25rem 2.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <p style={{ color: BLACK, fontFamily: FONT, fontWeight: 700, fontSize: '0.8rem', textAlign: 'center', margin: 0, letterSpacing: 1, textTransform: 'uppercase', opacity: 0.7 }}>
              New to Afroslang?
            </p>
            <button className="ob-btn-primary" onClick={() => go(1)}>GET STARTED</button>
            <button className="ob-btn-outline" onClick={onSignIn}>
              Already have an account? SIGN IN
            </button>
          </div>
        </div>
      </Overlay>
    );
  }

  // ── STEP 1: Mascot intro ────────────────────────────────────────────────────
  if (step === 1) {
    return (
      <Overlay>
        <div className="ob-card" key={animKey}>
          <ProgressBar />
          <div className="ob-content ob-anim">
            <img src="/Afroslang.png" alt="Afro" className="ob-mascot"
              style={{ animation: 'ob-bounce 1.8s ease-in-out infinite' }} />
            <div className="ob-bubble">
              👋 Hi there! I'm <strong>Afro!</strong>
              <br /><span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.82em' }}>Your African slang guide</span>
            </div>
          </div>
          <Wave />
          <div className="ob-bottom">
            <button className="ob-btn-primary" onClick={next}>CONTINUE</button>
          </div>
        </div>
      </Overlay>
    );
  }

  // ── STEP 2: 7 questions intro ───────────────────────────────────────────────
  if (step === 2) {
    return (
      <Overlay>
        <div className="ob-card" key={animKey}>
          <ProgressBar />
          <div className="ob-content ob-anim" style={{ gap: '1.25rem' }}>
            <img src="/Afroslang.png" alt="Afro" className="ob-mascot"
              style={{ animation: 'ob-bounce 1.6s ease-in-out infinite' }} />
            <p className="ob-heading" style={{ fontSize: '1.35rem' }}>Just 7 quick questions</p>
            <p className="ob-sub" style={{ maxWidth: 270 }}>
              I'll use your answers to build your perfect Afroslang course
            </p>
            <div style={{ display: 'flex', gap: '0.45em', marginTop: '0.4rem' }}>
              {[...Array(7)].map((_, i) => (
                <div key={i} style={{ width: 30, height: 7, borderRadius: 4, background: 'rgba(76,175,80,0.22)', border: `1px solid rgba(76,175,80,0.4)` }} />
              ))}
            </div>
          </div>
          <Wave />
          <div className="ob-bottom">
            <button className="ob-btn-primary" onClick={next}>LET'S GO 🔥</button>
          </div>
        </div>
      </Overlay>
    );
  }

  // ── STEP 3: Language select ─────────────────────────────────────────────────
  if (step === 3) {
    return (
      <Overlay>
        <div className="ob-card" key={animKey}>
          <ProgressBar />
          <div className="ob-content-top ob-anim" style={{ paddingTop: '1.25rem' }}>
            <p className="ob-heading" style={{ width: '100%', marginBottom: '0.4rem' }}>
              What would you like to learn?
            </p>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {LANGUAGES.map(lang => (
                <button key={lang.id}
                  className={`ob-row-btn${selectedLang === lang.id ? ' sel' : ''}`}
                  onClick={() => setSelectedLang(lang.id)}>
                  <span style={{ fontSize: '1.55em', minWidth: 28, textAlign: 'center' }}>{lang.flag}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ color: '#fff', fontWeight: 700, margin: 0, fontSize: '0.94em' }}>{lang.label}</p>
                    <p style={{ color: 'rgba(255,255,255,0.38)', margin: 0, fontSize: '0.73em' }}>{lang.region}</p>
                  </div>
                  {selectedLang === lang.id && (
                    <span style={{ color: GREEN, fontSize: '1em', fontWeight: 900 }}>✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
          <Wave />
          <div className="ob-bottom">
            <button className="ob-btn-primary" disabled={!selectedLang} onClick={next}>
              CONTINUE
            </button>
          </div>
        </div>
      </Overlay>
    );
  }

  // ── STEP 4: Course building (auto-advance) ──────────────────────────────────
  if (step === 4) {
    return (
      <Overlay>
        <div className="ob-card" key={animKey}>
          <ProgressBar />
          <div className="ob-content ob-anim" style={{ gap: '1.6rem' }}>
            <img src="/Afroslang.png" alt="Building" className="ob-mascot"
              style={{ animation: 'ob-bounce 0.75s ease-in-out infinite' }} />
            <div style={{ textAlign: 'center' }}>
              <p className="ob-heading" style={{ fontSize: '1.15rem', marginBottom: '0.35rem' }}>
                COURSE BUILDING...
              </p>
              <p className="ob-sub">
                Get ready to join your friends learning African slang!
              </p>
            </div>
            <div style={{ width: '100%', background: 'rgba(255,255,255,0.07)', borderRadius: 8, height: 8, overflow: 'hidden' }}>
              <div style={{ height: '100%', background: GREEN, borderRadius: 8, animation: 'ob-barfill 2.5s ease-out both' }} />
            </div>
          </div>
          <Wave />
          <div style={{ background: GREEN, padding: '1.1rem 1.2rem 1.9rem' }}>
            <p style={{ color: BLACK, fontWeight: 700, textAlign: 'center', fontFamily: FONT, margin: 0, fontSize: '0.88rem', animation: 'ob-pulse 1.1s ease-in-out infinite' }}>
              Personalizing your experience...
            </p>
          </div>
        </div>
      </Overlay>
    );
  }

  // ── STEP 5: Discovery source ────────────────────────────────────────────────
  if (step === 5) {
    return (
      <Overlay>
        <div className="ob-card" key={animKey}>
          <ProgressBar />
          <div className="ob-content-top ob-anim" style={{ paddingTop: '1.25rem' }}>
            <p className="ob-heading" style={{ width: '100%', marginBottom: '0.35rem' }}>
              How did you hear about Afroslang?
            </p>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {SOURCES.map(src => (
                <button key={src.id}
                  className={`ob-row-btn${discovery === src.id ? ' sel' : ''}`}
                  onClick={() => setDiscovery(src.id)}>
                  <span style={{ minWidth: 30, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {SOURCE_ICON[src.id]}
                  </span>
                  <span style={{ color: '#fff', fontWeight: 600, fontSize: '0.92em' }}>{src.label}</span>
                  {discovery === src.id && (
                    <span style={{ color: GREEN, marginLeft: 'auto', fontWeight: 900 }}>✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
          <Wave />
          <div className="ob-bottom">
            <button className="ob-btn-primary" disabled={!discovery} onClick={next}>CONTINUE</button>
          </div>
        </div>
      </Overlay>
    );
  }

  // ── STEP 6: Level check ─────────────────────────────────────────────────────
  if (step === 6) {
    return (
      <Overlay>
        <div className="ob-card" key={animKey}>
          <ProgressBar />
          <div className="ob-content ob-anim" style={{ justifyContent: 'flex-start', paddingTop: '1.5rem', gap: '0.9rem' }}>
            <p className="ob-heading" style={{ width: '100%' }}>How much slang do you know?</p>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
              {LEVELS.map(lvl => (
                <button key={lvl.id}
                  className={`ob-row-btn${level === lvl.id ? ' sel' : ''}`}
                  onClick={() => setLevel(lvl.id)}>
                  <SignalBars count={lvl.bars} />
                  <span style={{ color: '#fff', fontWeight: 600, fontSize: '0.92em', flex: 1 }}>{lvl.label}</span>
                  {level === lvl.id && (
                    <span style={{ color: GREEN, fontWeight: 900 }}>✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
          <Wave />
          <div className="ob-bottom">
            <button className="ob-btn-primary" disabled={!level} onClick={next}>CONTINUE</button>
          </div>
        </div>
      </Overlay>
    );
  }

  // ── STEP 7: Affirm (auto-advance 2.2s) ─────────────────────────────────────
  if (step === 7) {
    return (
      <Overlay>
        <div className="ob-card" key={animKey}>
          <ProgressBar />
          <div className="ob-content ob-anim" style={{ gap: '1.5rem' }}>
            <img src="/Afroslang.png" alt="Excited" className="ob-mascot"
              style={{ width: 110, height: 110, animation: 'ob-bounce 0.65s ease-in-out infinite' }} />
            <div className="ob-bubble" style={{ fontSize: '1.05rem' }}>
              Ayy, that's what I'm talking about! 🔥
            </div>
            <p className="ob-sub" style={{ animation: 'ob-pulse 1.4s ease-in-out infinite' }}>
              Setting things up...
            </p>
          </div>
          <Wave />
          <div style={{ background: GREEN, padding: '1.1rem 1.2rem 1.9rem' }}>
            <button className="ob-btn-primary" onClick={next}>CONTINUE</button>
          </div>
        </div>
      </Overlay>
    );
  }

  // ── STEP 8: Learning goal (multi-select checkboxes) ─────────────────────────
  if (step === 8) {
    return (
      <Overlay>
        <div className="ob-card" key={animKey}>
          <ProgressBar />
          <div className="ob-content-top ob-anim" style={{ paddingTop: '1.1rem' }}>
            <p className="ob-heading" style={{ width: '100%' }}>Why are you learning?</p>
            <p className="ob-sub" style={{ width: '100%', textAlign: 'left', marginBottom: '0.1rem' }}>Select all that apply</p>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.48rem' }}>
              {GOALS.map(g => (
                <button key={g.id}
                  className={`ob-row-btn${goals.includes(g.id) ? ' sel' : ''}`}
                  onClick={() => toggleGoal(g.id)}>
                  <span style={{ fontSize: '1.2em', minWidth: 26, textAlign: 'center' }}>{g.emoji}</span>
                  <span style={{ color: '#fff', fontWeight: 600, fontSize: '0.9em', flex: 1 }}>{g.label}</span>
                  <div className={`ob-check${goals.includes(g.id) ? ' on' : ''}`}>
                    {goals.includes(g.id) && (
                      <span style={{ color: '#fff', fontSize: '0.68em', fontWeight: 900, lineHeight: 1 }}>✓</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
          <Wave />
          <div className="ob-bottom">
            <button className="ob-btn-primary" disabled={goals.length === 0} onClick={next}>
              CONTINUE
            </button>
          </div>
        </div>
      </Overlay>
    );
  }

  // ── STEP 9: Routine setup ───────────────────────────────────────────────────
  if (step === 9) {
    return (
      <Overlay>
        <div className="ob-card" key={animKey}>
          <ProgressBar />
          <div className="ob-content ob-anim" style={{ gap: '1.4rem' }}>
            <div style={{ fontSize: '3.4em', animation: 'ob-bounce 1.7s ease-in-out infinite' }}>⏰</div>
            <p className="ob-heading">Let's set up a vibe routine!</p>
            <p className="ob-sub" style={{ maxWidth: 275 }}>
              A daily habit is the secret to mastering African slang.
              We'll help you stay consistent.
            </p>
          </div>
          <Wave />
          <div className="ob-bottom">
            <button className="ob-btn-primary" onClick={next}>SOUNDS GOOD 🙌</button>
          </div>
        </div>
      </Overlay>
    );
  }

  // ── STEP 10: Daily goal ─────────────────────────────────────────────────────
  if (step === 10) {
    return (
      <Overlay>
        <div className="ob-card" key={animKey}>
          <ProgressBar />
          <div className="ob-content ob-anim" style={{ gap: '1.3rem' }}>
            <p className="ob-heading">What's your daily goal?</p>
            <div style={{ display: 'flex', gap: '0.55rem', width: '100%' }}>
              {DAILY.map(d => (
                <button key={d.id}
                  className={`ob-daily-btn${dailyGoal === d.id ? ' sel' : ''}`}
                  onClick={() => setDailyGoal(d.id)}>
                  <span style={{ fontSize: '1.5em' }}>{d.emoji}</span>
                  <span style={{ color: '#fff', fontWeight: 800, fontSize: '0.88em', fontFamily: FONT }}>{d.label}</span>
                  <span style={{ color: 'rgba(255,255,255,0.42)', fontSize: '0.7em', fontFamily: FONT }}>{d.subtitle}</span>
                </button>
              ))}
            </div>
          </div>
          <Wave />
          <div className="ob-bottom">
            <button className="ob-btn-primary" disabled={!dailyGoal} onClick={next}>
              I'M LOCKED IN 🔒
            </button>
          </div>
        </div>
      </Overlay>
    );
  }

  // ── STEP 11: Plan select ────────────────────────────────────────────────────
  if (step === 11) {
    return (
      <Overlay>
        <div className="ob-card" key={animKey}>
          <ProgressBar />
          <div className="ob-content ob-anim" style={{ gap: '1.2rem' }}>
            <p className="ob-heading" style={{ fontSize: '1.2rem' }}>How do you want to get started?</p>

            {/* AfroPlus card */}
            <div style={{
              width: '100%', background: 'linear-gradient(145deg,#071407,#0d200d)',
              border: `2px solid ${GREEN}`, borderRadius: 18, padding: '1.25rem',
              position: 'relative', cursor: 'pointer',
            }} onClick={() => onComplete(selectedLang, 'plus')}>
              <div style={{
                position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)',
                background: GREEN, color: BLACK, fontWeight: 900, fontSize: '0.68em',
                padding: '0.28em 0.9em', borderRadius: 20, letterSpacing: 1,
                fontFamily: FONT, whiteSpace: 'nowrap', textTransform: 'uppercase',
              }}>
                ⭐ RECOMMENDED
              </div>
              <p style={{ color: GREEN, fontWeight: 900, fontSize: '1.1rem', margin: '0.5rem 0 0.2rem', fontFamily: FONT }}>
                AfroPlus ⚡
              </p>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.8em', margin: '0 0 0.9rem', fontFamily: FONT }}>
                Faster progress · no ads · unlimited hearts
              </p>
              <button className="ob-btn-primary"
                style={{ background: GREEN, color: BLACK, padding: '0.8em' }}>
                START AFROPLUS
              </button>
            </div>

            {/* Free card */}
            <div style={{
              width: '100%', background: '#181818', border: '1.5px solid #2a2a2a',
              borderRadius: 18, padding: '1.1rem', cursor: 'pointer',
            }} onClick={() => go(12)}>
              <p style={{ color: '#fff', fontWeight: 800, fontSize: '0.97rem', margin: '0 0 0.2rem', fontFamily: FONT }}>
                Learn for free
              </p>
              <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: '0.78em', margin: '0 0 0.8rem', fontFamily: FONT }}>
                Core features, with ads
              </p>
              <button className="ob-btn-outline"
                style={{ borderColor: '#333', color: 'rgba(255,255,255,0.55)', padding: '0.65em' }}>
                CONTINUE FOR FREE
              </button>
            </div>
          </div>
          <div style={{ height: '1.5rem', background: DARK, flexShrink: 0 }} />
        </div>
      </Overlay>
    );
  }

  // ── STEP 12: Free confirm (mascot slightly annoyed) ─────────────────────────
  if (step === 12) {
    return (
      <Overlay>
        <div className="ob-card" key={animKey}>
          <ProgressBar />
          <div className="ob-content ob-anim" style={{ gap: '1.5rem' }}>
            <img src="/Afroslang.png" alt="Mascot" className="ob-mascot"
              style={{ filter: 'drop-shadow(0 4px 14px rgba(255,160,0,0.35)) saturate(0.8)', opacity: 0.88 }} />
            <div className="ob-bubble">
              Okay... you'll learn lots,<br />with ads along the way 😤
            </div>
            <p className="ob-sub" style={{ maxWidth: 240, fontSize: '0.78em' }}>
              You can always upgrade to AfroPlus later!
            </p>
          </div>
          <Wave />
          <div className="ob-bottom">
            <button className="ob-btn-primary" onClick={() => onComplete(selectedLang, 'free')}>
              CONTINUE
            </button>
          </div>
        </div>
      </Overlay>
    );
  }

  return null;
}
