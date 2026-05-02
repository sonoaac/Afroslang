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
  { id: 'facebook',  label: 'Facebook' },
  { id: 'twitter',   label: 'Twitter/X' },
  { id: 'friend',    label: 'A Friend' },
  { id: 'appstore',  label: 'App Store' },
  { id: 'youtube',   label: 'YouTube' },
  { id: 'google',    label: 'Google' },
  { id: 'other',     label: 'Other' },
];

type PlacementQ = { q: string; opts: string[]; ans: string };

const PLACEMENT_QUESTIONS: Record<string, PlacementQ[]> = {
  swahili: [
    { q: 'What does "Habari" mean?',               opts: ['Hello / How are you', 'Goodbye', 'Thank you', 'Water'],          ans: 'Hello / How are you' },
    { q: 'How do you say "one" in Swahili?',       opts: ['Mbili', 'Moja', 'Tatu', 'Nne'],                                  ans: 'Moja' },
    { q: 'What does "Asante" mean?',               opts: ['Please', 'Sorry', 'Thank you', 'Yes'],                           ans: 'Thank you' },
    { q: '"Chakula" means?',                       opts: ['Water', 'Food', 'House', 'Book'],                                ans: 'Food' },
    { q: 'What does "Ndio" mean?',                 opts: ['No', 'Maybe', 'Yes', 'Later'],                                   ans: 'Yes' },
    { q: '"Mama" in Swahili means?',               opts: ['Sister', 'Mother', 'Aunt', 'Friend'],                            ans: 'Mother' },
    { q: 'What does "Simba" mean?',                opts: ['Elephant', 'Cheetah', 'Lion', 'Snake'],                          ans: 'Lion' },
    { q: 'How do you say "water" in Swahili?',     opts: ['Mto', 'Maji', 'Chai', 'Maziwa'],                                 ans: 'Maji' },
    { q: '"Karibu" means?',                        opts: ['Be careful', 'Welcome', 'Hurry up', 'Wait'],                     ans: 'Welcome' },
    { q: 'What does "Kwaheri" mean?',              opts: ['Good morning', 'Goodbye', 'Good night', 'Hello'],                ans: 'Goodbye' },
  ],
  yoruba: [
    { q: 'How do you say "Good morning" in Yoruba?', opts: ['Bawo ni', 'E kaaro', 'E kaasan', 'Ẹ ku irole'],              ans: 'E kaaro' },
    { q: 'What does "Ese" mean in Yoruba?',          opts: ['Hello', 'Goodbye', 'Thank you', 'Please'],                   ans: 'Thank you' },
    { q: '"Omi" in Yoruba means?',                   opts: ['Food', 'Water', 'Fire', 'Wind'],                             ans: 'Water' },
    { q: 'What does "Bẹẹni" mean?',                  opts: ['No', 'Yes', 'Maybe', 'Never'],                               ans: 'Yes' },
    { q: '"Ounjẹ" means?',                           opts: ['Water', 'House', 'Food', 'Money'],                           ans: 'Food' },
    { q: 'How do you say "one" in Yoruba?',          opts: ['Èjì', 'Ọ̀kan', 'Ẹ̀ta', 'Ẹ̀rin'],                             ans: 'Ọ̀kan' },
    { q: 'What does "Aburo" mean?',                  opts: ['Mother', 'Younger sibling', 'Friend', 'Father'],             ans: 'Younger sibling' },
    { q: '"Ilé" in Yoruba means?',                   opts: ['Road', 'Market', 'House/Home', 'School'],                    ans: 'House/Home' },
    { q: 'What does "Àánú" mean?',                   opts: ['Happiness', 'Anger', 'Love/Compassion', 'Sadness'],          ans: 'Love/Compassion' },
    { q: '"Ọjọ melo" asks about?',                   opts: ['What color', 'How many days', 'Where to go', 'Who is it'],  ans: 'How many days' },
  ],
  hausa: [
    { q: 'How do you say "Hello" in Hausa?',       opts: ['Nagode', 'Sannu', 'Barka', 'Lafiya'],                          ans: 'Sannu' },
    { q: 'What does "Nagode" mean?',               opts: ['Hello', 'Goodbye', 'Thank you', 'Please'],                     ans: 'Thank you' },
    { q: '"Ruwa" in Hausa means?',                 opts: ['Fire', 'Water', 'Food', 'Earth'],                              ans: 'Water' },
    { q: 'What does "Ɗaya" mean?',                 opts: ['Two', 'Three', 'One', 'Four'],                                 ans: 'One' },
    { q: '"Gida" means?',                          opts: ['School', 'Market', 'House/Home', 'Farm'],                      ans: 'House/Home' },
    { q: 'What does "Abinci" mean?',               opts: ['Water', 'Food', 'Money', 'Clothes'],                           ans: 'Food' },
    { q: '"Yaro" means?',                          opts: ['Girl', 'Boy', 'Elder', 'Baby'],                                ans: 'Boy' },
    { q: 'How do you say "Yes" in Hausa?',         opts: ["A'a", 'Haka ne', 'Kwai', 'Ee'],                               ans: 'Ee' },
    { q: 'What does "Aiki" mean?',                 opts: ['Play', 'Work', 'Sleep', 'Eat'],                                ans: 'Work' },
    { q: '"Rana" in Hausa means?',                 opts: ['Moon', 'Star', 'Sun/Day', 'Rain'],                             ans: 'Sun/Day' },
  ],
  igbo: [
    { q: 'How do you greet in Igbo?',              opts: ['Ndewo', 'Daalu', 'Biko', 'Ọ dị mma'],                          ans: 'Ndewo' },
    { q: 'What does "Daalu" mean?',                opts: ['Please', 'Thank you', 'Goodbye', 'Sorry'],                     ans: 'Thank you' },
    { q: '"Mmiri" in Igbo means?',                 opts: ['Food', 'Water', 'Fire', 'Earth'],                              ans: 'Water' },
    { q: 'What does "Ọ dị mma" mean?',             opts: ['No problem / It is fine', 'I am angry', 'Goodbye', 'Help me'], ans: 'No problem / It is fine' },
    { q: 'What does "Nnę" mean?',                  opts: ['Father', 'Mother', 'Sister', 'Grandmother'],                   ans: 'Mother' },
    { q: '"Otu" in Igbo means?',                   opts: ['One', 'Two', 'Group', 'Road'],                                 ans: 'One' },
    { q: 'What does "Ulo" mean?',                  opts: ['Road', 'House', 'Market', 'Farm'],                             ans: 'House' },
    { q: '"Biko" means?',                          opts: ['Thank you', 'Please', 'Yes', 'No'],                            ans: 'Please' },
    { q: 'What does "Ụmụ" mean?',                  opts: ['Elders', 'Children', 'Animals', 'Traders'],                   ans: 'Children' },
    { q: '"Ọrịa" means?',                          opts: ['Market', 'Sickness', 'Joy', 'Journey'],                        ans: 'Sickness' },
  ],
  zulu: [
    { q: 'How do you say "Hello" in Zulu?',        opts: ['Sawubona', 'Ngiyabonga', 'Hamba kahle', 'Yebo'],               ans: 'Sawubona' },
    { q: 'What does "Ngiyabonga" mean?',           opts: ['Please', 'I love you', 'Thank you', 'Sorry'],                  ans: 'Thank you' },
    { q: '"Amanzi" means?',                        opts: ['Food', 'Fire', 'Water', 'Earth'],                              ans: 'Water' },
    { q: 'What does "Yebo" mean?',                 opts: ['No', 'Yes', 'Maybe', 'Later'],                                 ans: 'Yes' },
    { q: '"Ukudla" in Zulu means?',                opts: ['Water', 'Clothes', 'Food', 'Money'],                           ans: 'Food' },
    { q: 'What does "Hamba kahle" mean?',          opts: ['Good morning', 'Welcome', 'Go well / Goodbye', 'Hurry'],       ans: 'Go well / Goodbye' },
    { q: '"Umuntu" means?',                        opts: ['Animal', 'Person', 'Chief', 'Elder'],                          ans: 'Person' },
    { q: 'What does "Nkosi" mean?',               opts: ['Friend', 'Enemy', 'God/Lord/King', 'Teacher'],                 ans: 'God/Lord/King' },
    { q: '"Umuzi" means?',                         opts: ['School', 'Market', 'Home/Homestead', 'River'],                 ans: 'Home/Homestead' },
    { q: 'What does "Uxolo" mean?',               opts: ['Thank you', 'Sorry / Peace', 'Goodbye', 'Welcome'],            ans: 'Sorry / Peace' },
  ],
  amharic: [
    { q: 'How do you say "Hello" in Amharic?',    opts: ['Ameseginalehu', 'Selam', 'Betam', 'Gobez'],                     ans: 'Selam' },
    { q: 'What does "Ameseginalehu" mean?',       opts: ['Hello', 'Goodbye', 'Thank you', 'Please'],                     ans: 'Thank you' },
    { q: '"Wuha" means?',                          opts: ['Food', 'Water', 'Fire', 'Land'],                               ans: 'Water' },
    { q: 'What does "Awo" mean?',                  opts: ['No', 'Yes', 'Maybe', 'Good'],                                  ans: 'Yes' },
    { q: '"Migib" in Amharic means?',              opts: ['Water', 'House', 'Food', 'School'],                            ans: 'Food' },
    { q: 'What does "Ishi" mean?',                 opts: ['No', 'Never', 'OK / Alright', 'Goodbye'],                     ans: 'OK / Alright' },
    { q: '"Lij" means?',                           opts: ['Elder', 'Child', 'King', 'Friend'],                            ans: 'Child' },
    { q: 'What does "Betam" mean?',                opts: ['Little', 'Never', 'Very much', 'Always'],                     ans: 'Very much' },
    { q: '"Gobez" means?',                         opts: ['Strong', 'Clever/Skilled', 'Rich', 'Tall'],                    ans: 'Clever/Skilled' },
    { q: 'What does "Lijoch" mean?',               opts: ['Elders', 'Children', 'Friends', 'Animals'],                   ans: 'Children' },
  ],
  arabic: [
    { q: 'How do you say "Hello" in Egyptian Arabic?', opts: ['Shukran', 'Ahlan wa sahlan', "Ma'a salama", 'Aywa'],       ans: 'Ahlan wa sahlan' },
    { q: 'What does "Shukran" mean?',              opts: ['Please', 'Goodbye', 'Thank you', 'Sorry'],                     ans: 'Thank you' },
    { q: '"Moya" in Arabic means?',                opts: ['Fire', 'Earth', 'Water', 'Wind'],                              ans: 'Water' },
    { q: 'What does "Aywa" mean?',                 opts: ['No', 'Yes', 'Maybe', 'Later'],                                 ans: 'Yes' },
    { q: '"Akl" means?',                           opts: ['Water', 'Money', 'Food/Eating', 'House'],                      ans: 'Food/Eating' },
    { q: "What does \"Ma'a salama\" mean?",        opts: ['Good morning', 'Welcome', 'Goodbye', 'Good night'],            ans: 'Goodbye' },
    { q: '"Wahid" in Arabic means?',               opts: ['Two', 'One', 'Three', 'Ten'],                                  ans: 'One' },
    { q: 'What does "Yalla" mean?',                opts: ['Wait', "Let's go / Come on", 'Stop', 'Look'],                  ans: "Let's go / Come on" },
    { q: '"Habibi" means?',                        opts: ['Enemy', 'My love/dear', 'Teacher', 'Stranger'],                ans: 'My love/dear' },
    { q: 'What does "Inshallah" mean?',            opts: ['Never', 'God willing / Hopefully', 'I promise', 'Right now'], ans: 'God willing / Hopefully' },
  ],
};

// ── Social media SVG icons ────────────────────────────────────────────────────

function IconTikTok() {
  return (
    <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="10" fill="#000"/>
      <path d="M34.1 14.5a8.7 8.7 0 01-5.4-5.5h-4.5v20.6a4.1 4.1 0 01-4.1 3.7 4.1 4.1 0 01-4.1-4.1 4.1 4.1 0 014.1-4.1c.4 0 .8.06 1.1.15V20.7a8.7 8.7 0 00-1.1-.07 8.7 8.7 0 00-8.7 8.7 8.7 8.7 0 008.7 8.7 8.7 8.7 0 008.7-8.7V19.6a13.4 13.4 0 007.8 2.5v-4.5a8.7 8.7 0 01-2.5-.6z" fill="#69C9D0"/>
      <path d="M34.1 14.5a8.7 8.7 0 01-5.4-5.5h-4.5v20.6a4.1 4.1 0 01-4.1 3.7 4.1 4.1 0 01-4.1-4.1 4.1 4.1 0 014.1-4.1c.4 0 .8.06 1.1.15V20.7a8.7 8.7 0 00-1.1-.07 8.7 8.7 0 00-8.7 8.7 8.7 8.7 0 008.7 8.7 8.7 8.7 0 008.7-8.7V19.6a13.4 13.4 0 007.8 2.5v-4.5a8.7 8.7 0 01-2.5-.6z" fill="white" opacity="0.55"/>
    </svg>
  );
}

function IconInstagram() {
  return (
    <img src="/instagrampng.jpg" width={28} height={28}
      style={{ borderRadius: 8, objectFit: 'cover', display: 'block', flexShrink: 0 }}
      alt="Instagram" />
  );
}

function IconFacebook() {
  return (
    <img src="/facebookimg.jpg" width={28} height={28}
      style={{ borderRadius: '50%', objectFit: 'cover', display: 'block', flexShrink: 0 }}
      alt="Facebook" />
  );
}

function IconFriend() {
  return (
    <div style={{ width: 28, height: 28, background: '#2a2a2a', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
      <img src="/familyiconsimg.jpg" width={22} height={22}
        style={{ objectFit: 'contain', display: 'block', filter: 'invert(1)' }}
        alt="A Friend" />
    </div>
  );
}

function IconTwitterX() {
  return (
    <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="10" fill="#000"/>
      <path d="M28.4 21.5L38.3 10h-2.4L27.4 20l-7.2-10H11l10.4 14.5L11 38h2.4l9.1-10.1 7.3 10.1H39L28.4 21.5zm-3.2 3.6l-1-1.5L14.3 12h3.6l6.9 9.5 1 1.5 9 12.5h-3.6l-5.9-8.4z" fill="white"/>
    </svg>
  );
}

function IconAppStore() {
  return (
    <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
      <defs>
        <linearGradient id="asg" x1="24" y1="4" x2="24" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#22CCFF"/>
          <stop offset="1" stopColor="#0066FF"/>
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="11" fill="url(#asg)"/>
      <line x1="24" y1="10" x2="11"  y2="37" stroke="white" strokeWidth="4" strokeLinecap="round"/>
      <line x1="24" y1="10" x2="37"  y2="37" stroke="white" strokeWidth="4" strokeLinecap="round"/>
      <line x1="15.5" y1="28" x2="32.5" y2="28" stroke="white" strokeWidth="4" strokeLinecap="round"/>
    </svg>
  );
}

function IconOther() {
  return (
    <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="10" fill="#444"/>
      <circle cx="15" cy="24" r="3.5" fill="white"/>
      <circle cx="24" cy="24" r="3.5" fill="white"/>
      <circle cx="33" cy="24" r="3.5" fill="white"/>
    </svg>
  );
}

function IconYouTube() {
  return (
    <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="10" fill="#FF0000"/>
      <rect x="8" y="14" width="32" height="20" rx="5" fill="#FF0000" stroke="white" strokeWidth="2"/>
      <path d="M21 19l12 5-12 5V19z" fill="white"/>
    </svg>
  );
}

function IconGoogle() {
  return (
    <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="10" fill="white"/>
      <path d="M43.6 24.5c0-1.4-.12-2.8-.35-4.1H24v7.8h11c-.5 2.5-1.9 4.6-4 6v5h6.5c3.8-3.5 6.1-8.7 6.1-14.7z" fill="#4285F4"/>
      <path d="M24 44c5.4 0 10-1.8 13.3-4.8l-6.5-5c-1.8 1.2-4.1 1.9-6.8 1.9-5.2 0-9.7-3.5-11.3-8.3H5v5.2C8.3 39.4 15.6 44 24 44z" fill="#34A853"/>
      <path d="M12.7 27.8a12 12 0 010-7.6V15H5A19.8 19.8 0 005 33l7.7-5.2z" fill="#FBBC05"/>
      <path d="M24 12.1c2.9 0 5.5 1 7.5 2.9l5.6-5.6C33.9 6.3 29.3 4.2 24 4.2c-8.4 0-15.7 4.6-19 11.4l7.7 5.2C14.3 15.6 18.8 12.1 24 12.1z" fill="#EA4335"/>
    </svg>
  );
}

const SOURCE_ICONS: Record<string, () => React.ReactElement> = {
  tiktok:    IconTikTok,
  instagram: IconInstagram,
  facebook:  IconFacebook,
  twitter:   IconTwitterX,
  friend:    IconFriend,
  appstore:  IconAppStore,
  youtube:   IconYouTube,
  google:    IconGoogle,
  other:     IconOther,
};

const LEVELS = [
  { id: 'zero',   label: "I'm brand new",         bars: 0 },
  { id: 'some',   label: 'I know some words',      bars: 1 },
  { id: 'convo',  label: 'I can hold a convo',     bars: 2 },
  { id: 'fluent', label: "I'm lowkey fluent",       bars: 3 },
  { id: 'native', label: "I'm basically a native",  bars: 4 },
];

const GOALS = [
  { id: 'roots',   label: 'Stay connected to roots', emoji: '🌍' },
  { id: 'culture', label: 'Support my culture',       emoji: '✊' },
  { id: 'fun',     label: 'Just for fun',             emoji: '😄' },
  { id: 'travel',  label: 'Travel',                  emoji: '✈️' },
  { id: 'career',  label: 'Career',                  emoji: '💼' },
  { id: 'fam',     label: 'Connect with fam',         emoji: '👨‍👩‍👧‍👦' },
  { id: 'other',   label: 'Other',                   emoji: '💡' },
];

const DAILY = [
  { id: '5',  label: '5 min',   subtitle: 'Chill' },
  { id: '10', label: '10 min',  subtitle: 'Regular' },
  { id: '15', label: '15 min',  subtitle: 'Serious' },
  { id: '20', label: '20+ min', subtitle: 'Extreme' },
];

const GREEN = '#4CAF50';
const RED   = '#b00020';
const BLACK = '#000000';
const DARK  = '#0d0d0d';
const FONT  = "'Plus Jakarta Sans', sans-serif";

const TOTAL_Q = 11;

// ── Sub-components ────────────────────────────────────────────────────────────

function Wave() {
  return (
    <svg viewBox="0 0 390 28" xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', width: '100%', flexShrink: 0, marginBottom: -1 }}>
      <path d="M0,14 Q65,0 130,14 Q195,28 260,14 Q325,0 390,14 L390,28 L0,28 Z" fill={RED} />
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
  const [step, setStep]           = useState(0);
  const [animKey, setAnimKey]     = useState(0);
  const [selectedLang, setSelectedLang]     = useState('');
  const [discovery, setDiscovery]           = useState('');
  const [level, setLevel]                   = useState('');
  const [goals, setGoals]                   = useState<string[]>([]);
  const [dailyGoal, setDailyGoal]           = useState('');
  const [selectedPlan, setSelectedPlan]     = useState<'plus' | 'free'>('free');
  const [placementQ, setPlacementQ]         = useState(0);
  const [placementAnswers, setPlacementAnswers] = useState<string[]>([]);

  const go = useCallback((n: number) => {
    setStep(n);
    setAnimKey(k => k + 1);
  }, []);

  const next = useCallback(() => go(step + 1), [step, go]);

  useEffect(() => {
    if (step === 4) { const t = setTimeout(() => go(5), 2800); return () => clearTimeout(t); }
    if (step === 7) { const t = setTimeout(() => go(8), 2200); return () => clearTimeout(t); }
  }, [step, go]);

  const progress = step < 1 ? 0 : Math.min(100, Math.round((step / TOTAL_Q) * 100));

  const toggleGoal = (id: string) =>
    setGoals(prev => prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]);

  const handlePlacementAnswer = (opt: string) => {
    const questions = PLACEMENT_QUESTIONS[selectedLang] ?? [];
    const newAnswers = [...placementAnswers, opt];
    setPlacementAnswers(newAnswers);
    if (placementQ + 1 >= questions.length) {
      go(13);
    } else {
      setPlacementQ(q => q + 1);
    }
  };

  // ── Shared CSS ──────────────────────────────────────────────────────────────

  const css = `
    @keyframes ob-fadein  { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
    @keyframes ob-bounce  { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-10px); } }
    @keyframes ob-pulse   { 0%,100% { opacity:1; } 50% { opacity:0.45; } }
    @keyframes ob-barfill { from { width:0; } to { width:72%; } }
    @keyframes ob-dot     { 0%,60%,100% { transform:translateY(0); opacity:0.4; } 30% { transform:translateY(-5px); opacity:1; } }
    .ob-anim { animation: ob-fadein 0.32s ease both; }
    .ob-dot-1 { animation: ob-dot 1.1s ease-in-out infinite; }
    .ob-dot-2 { animation: ob-dot 1.1s ease-in-out 0.18s infinite; }
    .ob-dot-3 { animation: ob-dot 1.1s ease-in-out 0.36s infinite; }
    .ob-card {
      width:100%; max-width:390px;
      height:100dvh; max-height:900px;
      display:flex; flex-direction:column;
      background:${DARK}; position:relative; overflow:hidden;
    }
    .ob-progress { height:3px; background:rgba(255,255,255,0.08); flex-shrink:0; }
    .ob-progress-fill { height:100%; background:${RED}; transition:width 0.4s ease; }
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
    .ob-bottom { background:${RED}; padding:1.2rem 1.2rem 2.2rem; display:flex; flex-direction:column; gap:0.7rem; flex-shrink:0; }
    .ob-btn-primary {
      background:${BLACK}; color:#fff; border:none; border-radius:30px;
      padding:1rem; font-size:0.97rem; font-weight:800; font-family:${FONT};
      cursor:pointer; width:100%; letter-spacing:0.6px; transition:opacity 0.15s;
    }
    .ob-btn-primary:disabled { opacity:0.45; cursor:not-allowed; }
    .ob-btn-primary:not(:disabled):active { opacity:0.8; }
    .ob-btn-outline {
      background:transparent; color:#fff; border:2px solid rgba(255,255,255,0.7); border-radius:30px;
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
    .ob-row-btn.sel  { border-color:${GREEN}; background:rgba(76,175,80,0.12); }
    .ob-row-btn-plain { border-color:#1e1e1e !important; background:#161616 !important; cursor:pointer; }
    .ob-row-btn-plain:active { background:rgba(76,175,80,0.08) !important; border-color:${GREEN} !important; }
    .ob-check { width:20px; height:20px; border-radius:6px; border:2px solid #333; display:flex; align-items:center; justify-content:center; flex-shrink:0; transition:background 0.15s, border-color 0.15s; }
    .ob-check.on { background:${GREEN}; border-color:${GREEN}; }
    .ob-bubble {
      background:#1c1c1c; border:1.5px solid rgba(176,0,32,0.45);
      border-radius:18px 18px 18px 4px; padding:0.75rem 1rem;
      display:flex; align-items:center; gap:6px;
    }
    .ob-bubble-speech {
      background:#1c1c1c; border:1.5px solid rgba(176,0,32,0.45);
      border-radius:18px; padding:1rem 1.2rem; color:#fff;
      font-family:${FONT}; font-size:1rem; font-weight:600;
      text-align:center; max-width:270px; position:relative; line-height:1.45;
    }
    .ob-bubble-speech::before {
      content:''; position:absolute; top:-10px; left:50%; transform:translateX(-50%);
      width:0; height:0; border-left:9px solid transparent;
      border-right:9px solid transparent; border-bottom:10px solid rgba(176,0,32,0.45);
    }
    .ob-mascot { width:90px; height:90px; object-fit:contain; filter:drop-shadow(0 4px 18px rgba(176,0,32,0.45)); }
    .ob-heading { color:#fff; font-family:${FONT}; font-weight:800; font-size:1.25rem; text-align:center; line-height:1.2; margin:0; }
    .ob-sub { color:rgba(255,255,255,0.5); font-family:${FONT}; font-size:0.85rem; text-align:center; line-height:1.5; margin:0; }
  `;

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
          <div style={{ background: RED, padding: '1.4rem 1.25rem 2.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <p style={{ color: '#fff', fontFamily: FONT, fontWeight: 700, fontSize: '0.8rem', textAlign: 'center', margin: 0, letterSpacing: 1, textTransform: 'uppercase', opacity: 0.75 }}>
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
            <div className="ob-bubble-speech">
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

  // ── STEP 2: Questions intro (chat layout) ───────────────────────────────────
  if (step === 2) {
    return (
      <Overlay>
        <div className="ob-card" key={animKey}>
          <ProgressBar />
          <div className="ob-content ob-anim" style={{ alignItems: 'flex-start', justifyContent: 'center', gap: '1.6rem', padding: '2rem 1.4rem' }}>
            {/* Chat row: small mascot + typing dots bubble */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.75rem' }}>
              <img src="/Afroslang.png" alt="Afro" style={{
                width: 44, height: 44, borderRadius: '50%', objectFit: 'contain',
                border: '2px solid rgba(76,175,80,0.5)', flexShrink: 0,
                filter: 'drop-shadow(0 2px 8px rgba(76,175,80,0.35))',
              }} />
              <div className="ob-bubble" style={{ borderRadius: '18px 18px 18px 4px', padding: '0.75rem 1rem' }}>
                <div className="ob-dot-1" style={{ width: 9, height: 9, borderRadius: '50%', background: RED }} />
                <div className="ob-dot-2" style={{ width: 9, height: 9, borderRadius: '50%', background: RED }} />
                <div className="ob-dot-3" style={{ width: 9, height: 9, borderRadius: '50%', background: RED }} />
              </div>
            </div>
            {/* Main heading */}
            <div>
              <p className="ob-heading" style={{ textAlign: 'left', fontSize: '1.5rem', lineHeight: 1.2 }}>
                Just answer a few questions for me
              </p>
              <p className="ob-sub" style={{ textAlign: 'left', marginTop: '0.55rem' }}>
                I'll use your answers to build your perfect Afroslang course
              </p>
            </div>
            {/* 7-dot indicator */}
            <div style={{ display: 'flex', gap: '0.45em' }}>
              {[...Array(7)].map((_, i) => (
                <div key={i} style={{ width: 30, height: 7, borderRadius: 4, background: 'rgba(76,175,80,0.22)', border: '1px solid rgba(76,175,80,0.4)' }} />
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

  // ── STEP 4: Course building (auto-advance 2.8s) ─────────────────────────────
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
              <div style={{ height: '100%', background: RED, borderRadius: 8, animation: 'ob-barfill 2.5s ease-out both' }} />
            </div>
          </div>
          <Wave />
          <div style={{ background: RED, padding: '1.1rem 1.2rem 1.9rem' }}>
            <p style={{ color: '#fff', fontWeight: 700, textAlign: 'center', fontFamily: FONT, margin: 0, fontSize: '0.88rem', animation: 'ob-pulse 1.1s ease-in-out infinite' }}>
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
                  <span style={{ minWidth: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {SOURCE_ICONS[src.id] ? SOURCE_ICONS[src.id]() : null}
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
            <div className="ob-bubble-speech" style={{ fontSize: '1.05rem' }}>
              Ayy, that's what I'm talking about! 🔥
            </div>
            <p className="ob-sub" style={{ animation: 'ob-pulse 1.4s ease-in-out infinite' }}>
              Setting things up...
            </p>
          </div>
          <Wave />
          <div style={{ background: RED, padding: '1.1rem 1.2rem 1.9rem' }}>
            <button className="ob-btn-primary" onClick={next}>CONTINUE</button>
          </div>
        </div>
      </Overlay>
    );
  }

  // ── STEP 8: Learning goal (multi-select) ────────────────────────────────────
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

  // ── STEP 10: Daily goal (rectangle list, no emoji) ──────────────────────────
  if (step === 10) {
    return (
      <Overlay>
        <div className="ob-card" key={animKey}>
          <ProgressBar />
          <div className="ob-content ob-anim" style={{ justifyContent: 'flex-start', paddingTop: '1.5rem', gap: '0.9rem' }}>
            <p className="ob-heading" style={{ width: '100%' }}>What's your daily goal?</p>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
              {DAILY.map(d => (
                <button key={d.id}
                  className={`ob-row-btn${dailyGoal === d.id ? ' sel' : ''}`}
                  onClick={() => setDailyGoal(d.id)}>
                  <div style={{ flex: 1 }}>
                    <p style={{ color: '#fff', fontWeight: 700, margin: 0, fontSize: '0.94em' }}>{d.label}</p>
                    <p style={{ color: 'rgba(255,255,255,0.38)', margin: 0, fontSize: '0.73em' }}>{d.subtitle}</p>
                  </div>
                  {dailyGoal === d.id && (
                    <span style={{ color: GREEN, fontWeight: 900 }}>✓</span>
                  )}
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
    const startPlan = (plan: 'plus' | 'free') => {
      setSelectedPlan(plan);
      setPlacementQ(0);
      setPlacementAnswers([]);
      go(12);
    };
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
            }} onClick={() => startPlan('plus')}>
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
              <button className="ob-btn-primary" style={{ background: GREEN, color: BLACK, padding: '0.8em' }}>
                START AFROPLUS
              </button>
            </div>

            {/* Free card */}
            <div style={{
              width: '100%', background: '#181818', border: '1.5px solid #2a2a2a',
              borderRadius: 18, padding: '1.1rem', cursor: 'pointer',
            }} onClick={() => startPlan('free')}>
              <p style={{ color: '#fff', fontWeight: 800, fontSize: '0.97rem', margin: '0 0 0.2rem', fontFamily: FONT }}>
                Learn for free
              </p>
              <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: '0.78em', margin: '0 0 0.8rem', fontFamily: FONT }}>
                Core features, with ads
              </p>
              <button className="ob-btn-outline" style={{ borderColor: '#333', color: 'rgba(255,255,255,0.55)', padding: '0.65em' }}>
                CONTINUE FOR FREE
              </button>
            </div>
          </div>
          <div style={{ height: '1.5rem', background: DARK, flexShrink: 0 }} />
        </div>
      </Overlay>
    );
  }

  // ── STEP 12: Placement test ─────────────────────────────────────────────────
  if (step === 12) {
    const questions = PLACEMENT_QUESTIONS[selectedLang] ?? [];
    const currentQ  = questions[placementQ];
    if (!currentQ) { go(13); return null; }
    const qProgress = Math.round((placementQ / questions.length) * 100);

    return (
      <Overlay>
        <div className="ob-card" key={animKey}>
          <ProgressBar />
          <div className="ob-content-top ob-anim" style={{ paddingTop: '1.3rem', gap: '1rem' }}>
            {/* Placement header */}
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontFamily: FONT, fontSize: '0.78rem', margin: 0 }}>
                Placement check
              </p>
              <p style={{ color: RED, fontFamily: FONT, fontSize: '0.78rem', margin: 0, fontWeight: 700 }}>
                {placementQ + 1} / {questions.length}
              </p>
            </div>
            <div style={{ width: '100%', height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 4 }}>
              <div style={{ height: '100%', background: RED, borderRadius: 4, width: `${qProgress}%`, transition: 'width 0.3s' }} />
            </div>

            {/* Question (re-animate on each new Q) */}
            <div key={`pq-${placementQ}`} className="ob-anim" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              <p className="ob-heading" style={{ textAlign: 'left', fontSize: '1.05rem', lineHeight: 1.35 }}>
                {currentQ.q}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {currentQ.opts.map(opt => (
                  <button key={opt}
                    className="ob-row-btn ob-row-btn-plain"
                    onClick={() => handlePlacementAnswer(opt)}
                    style={{ padding: '0.85rem 1rem' }}>
                    <span style={{ color: '#fff', fontWeight: 600, fontSize: '0.9em' }}>{opt}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div style={{ height: '1rem', flexShrink: 0 }} />
        </div>
      </Overlay>
    );
  }

  // ── STEP 13: Placement results + account creation ───────────────────────────
  if (step === 13) {
    const questions = PLACEMENT_QUESTIONS[selectedLang] ?? [];
    const score     = placementAnswers.filter((a, i) => a === questions[i]?.ans).length;
    const total     = questions.length;
    const pct       = total > 0 ? Math.round((score / total) * 100) : 0;
    const stage     = score >= Math.round(total * 0.8) ? 3 : score >= Math.round(total * 0.5) ? 2 : 1;
    const stageLabel = stage === 3 ? 'Advanced' : stage === 2 ? 'Intermediate' : 'Beginner';
    const msg        = stage === 3 ? "You're lowkey fluent! 🔥" : stage === 2 ? "You've got a solid base! 💪" : "Ready to start from the roots! 🌱";

    return (
      <Overlay>
        <div className="ob-card" key={animKey}>
          <ProgressBar />
          <div className="ob-content ob-anim" style={{ gap: '1.3rem' }}>
            <img src="/Afroslang.png" alt="Mascot" className="ob-mascot"
              style={{ width: 100, height: 100, animation: 'ob-bounce 1.8s ease-in-out infinite' }} />
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: RED, fontWeight: 900, fontSize: '2.5rem', fontFamily: FONT, margin: 0, lineHeight: 1 }}>
                {pct}%
              </p>
              <p className="ob-heading" style={{ marginTop: '0.3rem', fontSize: '1.1rem' }}>{msg}</p>
              <p className="ob-sub" style={{ marginTop: '0.35rem' }}>
                You'll start at{' '}
                <strong style={{ color: '#fff' }}>{stageLabel}</strong> level
              </p>
            </div>
            {/* Score dots */}
            <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 230 }}>
              {questions.map((q, i) => (
                <div key={i} style={{
                  width: 13, height: 13, borderRadius: '50%',
                  background: placementAnswers[i] === q.ans ? GREEN : '#e53935',
                  flexShrink: 0,
                }} />
              ))}
            </div>
            <p className="ob-sub" style={{ fontSize: '0.8em', maxWidth: 260 }}>
              Create a free account to save your progress and start learning!
            </p>
          </div>
          <Wave />
          <div className="ob-bottom">
            <button className="ob-btn-primary" onClick={() => onComplete(selectedLang, selectedPlan)}>
              CREATE ACCOUNT &amp; SAVE PROGRESS
            </button>
            {selectedPlan === 'plus' && (
              <p style={{ color: '#fff', fontFamily: FONT, fontSize: '0.74em', textAlign: 'center', margin: 0, opacity: 0.8 }}>
                You'll be set up with AfroPlus after signing up
              </p>
            )}
          </div>
        </div>
      </Overlay>
    );
  }

  return null;
}
