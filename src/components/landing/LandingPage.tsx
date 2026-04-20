import { useState, useEffect, useRef } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import { DescrambleText } from '../ui/DescrambleText';
import { StaticPage } from './StaticPage';
import { AfricaMap } from './AfricaMap';
import { GlCanvas } from './GlCanvas';
import { SandbitsIcon } from '../ui/SandbitsIcon';
import './LandingPage.css';

// Drop-in only — no scramble chars. from === to so only phase 1 (drop-in) runs.
const AFROSLANG_CHARS = 'AFROSLANG'.split('').map(ch => ({ from: ch, to: ch }));
// REKINDLE starts after AFROSLANG fully lands + a short beat
const REKINDLE_START  = (AFROSLANG_CHARS.length - 1) * 55 + 900 + 180; // ~1500ms
const REKINDLE_CHARS  = 'REKINDLE'.split('').map(ch => ({ from: ch, to: ch }));
// Sub-line after REKINDLE fully lands
const SUB_DELAY       = REKINDLE_START + (REKINDLE_CHARS.length - 1) * 55 + 900 + 200; // ~2985ms

type SheetMode = 'login' | 'signup' | null;

// Language → ISO-2 country codes (a language can span multiple countries)
const LANGUAGE_COUNTRIES: Record<string, string[]> = {
  swahili:  ['KE', 'TZ', 'UG', 'RW', 'BI', 'CD'],
  hausa:    ['NG', 'NE', 'GH'],
  yoruba:   ['NG', 'BJ', 'TG'],
  igbo:     ['NG'],
  zulu:     ['ZA'],
  amharic:  ['ET'],
  arabic:   ['EG', 'DZ', 'MA', 'TN', 'LY', 'SD', 'MR', 'SS'],
  shona:    ['ZW'],
  somali:   ['SO', 'DJ', 'ET'],
  berber:   ['MA', 'DZ'],
  moore:    ['BF'],
  lingala:  ['CD', 'CG'],
  twi:      ['GH'],
  chichewa: ['MW', 'ZM'],
  wolof:    ['SN', 'GM'],
};

interface LandingPageProps {
  initialSheet?: SheetMode;
  isLoggedIn?: boolean;
  onContinue?: () => void;
  onSelectLanguage?: (languageId: string) => void;
  onPreSelectLanguage?: (languageId: string) => void;
  userProgressMap?: Record<string, { completedLessons: string[] }>;
}

// ── Language names ────────────────────────────────────────────────────────────
const LANGUAGE_NAMES: Record<string, string> = {
  hausa:    'Hausa',
  yoruba:   'Yoruba',
  igbo:     'Igbo',
  amharic:  'Amharic',
  somali:   'Somali',
  arabic:   'Arabic',
  swahili:  'Swahili',
  zulu:     'Zulu',
  twi:      'Twi (Akan)',
  wolof:    'Wolof',
  moore:    'Mòoré',
  lingala:  'Lingala',
  shona:    'Shona',
  chichewa: 'Chichewa',
  berber:   'Berber (Tamazight)',
};

interface ExploreCountry {
  code: string;
  name: string;
  fact: string;
  languages: string[];
}

// ── All 54 African countries with language links ──────────────────────────────
const EXPLORE_COUNTRIES: ExploreCountry[] = [
  { code:'NG', name:'Nigeria',            languages:['hausa','yoruba','igbo'],    fact:'Home to over 500 languages, more than any other country in Africa.' },
  { code:'ET', name:'Ethiopia',           languages:['amharic','somali'],         fact:'One of Africa\'s oldest civilizations, with over 90 languages spoken.' },
  { code:'EG', name:'Egypt',              languages:['arabic'],                   fact:'Home to the world\'s oldest writing system, hieroglyphics dating back 5,000 years.' },
  { code:'TZ', name:'Tanzania',           languages:['swahili'],                  fact:'Birthplace of Swahili, now spoken by over 200 million people across Africa.' },
  { code:'KE', name:'Kenya',              languages:['swahili','somali'],         fact:'Africa\'s tech capital — Nairobi is known as the "Silicon Savannah."' },
  { code:'ZA', name:'South Africa',       languages:['zulu'],                     fact:'Has 11 official languages, the most of any single country in the world.' },
  { code:'GH', name:'Ghana',              languages:['twi','hausa'],              fact:'First sub-Saharan African country to gain independence in 1957.' },
  { code:'MA', name:'Morocco',            languages:['arabic','berber'],          fact:'Home to the world\'s oldest university, al-Qarawiyyin, founded in 859 AD.' },
  { code:'DZ', name:'Algeria',            languages:['arabic','berber'],          fact:'The largest country in Africa, bigger than all of Western Europe combined.' },
  { code:'CD', name:'DR Congo',           languages:['lingala','swahili'],        fact:'Home to the second-largest rainforest and the world\'s deepest river.' },
  { code:'SN', name:'Senegal',            languages:['wolof'],                    fact:'Nearly all Senegalese speak Wolof as a shared language, regardless of ethnicity.' },
  { code:'BF', name:'Burkina Faso',       languages:['moore'],                    fact:'"Land of Incorruptible Men" — Mòoré is spoken by nearly half the population.' },
  { code:'ZW', name:'Zimbabwe',           languages:['shona'],                    fact:'Home to Victoria Falls, one of the Seven Natural Wonders of the World.' },
  { code:'SO', name:'Somalia',            languages:['somali'],                   fact:'Somali is the most widely spoken Cushitic language in Africa.' },
  { code:'MW', name:'Malawi',             languages:['chichewa'],                 fact:'Lake Malawi contains more fish species than any other lake on Earth.' },
  { code:'ZM', name:'Zambia',             languages:['chichewa'],                 fact:'Home to 73 spoken languages and shares the spectacular Victoria Falls.' },
  { code:'MZ', name:'Mozambique',         languages:['chichewa'],                 fact:'Has one of the longest coastlines in Africa, over 2,500 km.' },
  { code:'CG', name:'Rep. of Congo',      languages:['lingala'],                  fact:'Part of the Congo Basin, the second-largest tropical forest in the world.' },
  { code:'BJ', name:'Benin',              languages:['yoruba'],                   fact:'Birthplace of Vodun (Voodoo), a tradition that spread to the Americas.' },
  { code:'GM', name:'Gambia',             languages:['wolof'],                    fact:'The smallest country in mainland Africa, almost surrounded by Senegal.' },
  { code:'UG', name:'Uganda',             languages:['swahili'],                  fact:'Hosts over half of the world\'s remaining mountain gorillas.' },
  { code:'SD', name:'Sudan',              languages:['arabic'],                   fact:'Sudan has more ancient pyramids than Egypt — over 200 Nubian pyramids.' },
  { code:'TN', name:'Tunisia',            languages:['arabic'],                   fact:'The northernmost country in Africa and birthplace of the Arab Spring.' },
  { code:'LY', name:'Libya',              languages:['arabic'],                   fact:'Libya holds the largest proven oil reserves in Africa.' },
  { code:'MR', name:'Mauritania',         languages:['arabic'],                   fact:'Ancient cities of Chinguetti and Ouadane are UNESCO World Heritage Sites.' },
  { code:'DJ', name:'Djibouti',           languages:['somali'],                   fact:'Home to Lake Assal, the lowest point in Africa.' },
  { code:'NE', name:'Niger',              languages:['hausa'],                    fact:'The largest country in West Africa — 80% covered by the Sahara.' },
  { code:'MG', name:'Madagascar',         languages:[],                           fact:'Over 90% of Madagascar\'s wildlife exists nowhere else on Earth.' },
  { code:'CM', name:'Cameroon',           languages:[],                           fact:'"Africa in miniature" — rainforests, savannas, mountains, deserts, and beaches.' },
  { code:'AO', name:'Angola',             languages:[],                           fact:'Angola has the most Portuguese speakers outside Brazil and Portugal.' },
  { code:'ML', name:'Mali',               languages:[],                           fact:'Timbuktu was once the world\'s greatest center of Islamic scholarship.' },
  { code:'TD', name:'Chad',               languages:[],                           fact:'Lake Chad has shrunk by 90% since the 1960s due to climate change.' },
  { code:'CI', name:"Côte d'Ivoire",     languages:[],                           fact:'The world\'s largest producer of cocoa — 40% of the global supply.' },
  { code:'GN', name:'Guinea',             languages:[],                           fact:'Guinea contains two-thirds of the world\'s bauxite reserves.' },
  { code:'RW', name:'Rwanda',             languages:[],                           fact:'Rwanda has the highest percentage of female parliament members in the world.' },
  { code:'BI', name:'Burundi',            languages:[],                           fact:'Despite its small size, Burundi has remarkable cultural diversity.' },
  { code:'SS', name:'South Sudan',        languages:[],                           fact:'South Sudan is the world\'s newest country, gaining independence in 2011.' },
  { code:'TG', name:'Togo',               languages:[],                           fact:'Togo\'s Vodoun Day draws thousands of visitors each January.' },
  { code:'SL', name:'Sierra Leone',       languages:[],                           fact:'"Lion Mountains" in Portuguese — named by early explorers.' },
  { code:'LR', name:'Liberia',            languages:[],                           fact:'Africa\'s oldest republic, founded in 1847 by freed American slaves.' },
  { code:'CF', name:'Cent. African R.',   languages:[],                           fact:'Home to Dzanga-Sangha, one of the last refuges for forest elephants.' },
  { code:'ER', name:'Eritrea',            languages:[],                           fact:'Eritrea gained independence after a 30-year liberation struggle.' },
  { code:'NA', name:'Namibia',            languages:[],                           fact:'The Namib Desert is the world\'s oldest desert, at over 55 million years.' },
  { code:'BW', name:'Botswana',           languages:[],                           fact:'Botswana transformed from one of Africa\'s poorest nations into one of its fastest-growing.' },
  { code:'LS', name:'Lesotho',            languages:[],                           fact:'Lesotho is entirely surrounded by South Africa.' },
  { code:'GW', name:'Guinea-Bissau',      languages:[],                           fact:'The Bijagós Archipelago is a UNESCO Biosphere Reserve with oceanic hippos.' },
  { code:'GA', name:'Gabon',              languages:[],                           fact:'Gabon has 88% forest cover — one of the most forested countries on Earth.' },
  { code:'GQ', name:'Equatorial Guinea',  languages:[],                           fact:'The only mainland African country where Spanish is an official language.' },
  { code:'SZ', name:'Eswatini',           languages:[],                           fact:'One of Africa\'s last absolute monarchies.' },
  { code:'CV', name:'Cape Verde',         languages:[],                           fact:'Cape Verde\'s Morna music is UNESCO Intangible Cultural Heritage.' },
  { code:'ST', name:'São Tomé & Príncipe',languages:[],                           fact:'Sits almost exactly on the equator in the Atlantic Ocean.' },
  { code:'KM', name:'Comoros',            languages:[],                           fact:'The world\'s largest producer of ylang-ylang, used in fine perfumes.' },
  { code:'MU', name:'Mauritius',          languages:[],                           fact:'The extinct dodo bird was native to Mauritius.' },
  { code:'SC', name:'Seychelles',         languages:[],                           fact:'Home to the Coco de Mer, the world\'s largest seed, up to 25 kg.' },
];


export function LandingPage({ initialSheet, isLoggedIn, onContinue, onSelectLanguage, onPreSelectLanguage, userProgressMap = {} }: LandingPageProps) {
  const { setGuestMode, isGuest } = useAuth();

  // Countries unlocked by completing at least 1 lesson in any of their languages
  const unlockedCodes = new Set<string>(
    Object.entries(userProgressMap)
      .filter(([, progress]) => progress.completedLessons.length > 0)
      .flatMap(([langId]) => LANGUAGE_COUNTRIES[langId] ?? [])
  );

  const [sheet, setSheet] = useState<SheetMode>(initialSheet ?? null);

  // Explorer section state
  const [exploreSearch, setExploreSearch]         = useState('');
  const [selectedCountry, setSelectedCountry]     = useState<ExploreCountry | null>(null);
  const [selectedLanguage, setSelectedLanguage]   = useState('');
  const [pendingLanguage, setPendingLanguage]     = useState('');
  const [panelOpen, setPanelOpen]                 = useState(false);
  const [exploreVisible, setExploreVisible]       = useState(false);
  const [headerScrolled, setHeaderScrolled]       = useState(false);
  const [activePage, setActivePage]               = useState<string | null>(null);
  const exploreSectionRef = useRef<HTMLDivElement>(null);
  // Tracks last active tab so form content stays rendered during close animation
  const lastSheetRef = useRef<'login' | 'signup'>('signup');
  if (sheet) lastSheetRef.current = sheet;
  const displaySheet = sheet ?? lastSheetRef.current;
  const [authTitleKey, setAuthTitleKey] = useState(0);


  useEffect(() => { window.scrollTo(0, 0); }, []);

  // Initialise AdSense units after mount
  useEffect(() => {
    try {
      const w = window as any;
      if (w.adsbygoogle) {
        document.querySelectorAll('.adsbygoogle').forEach(() => {
          (w.adsbygoogle = w.adsbygoogle || []).push({});
        });
      }
    } catch {}
  }, []);

  useEffect(() => {
    const onScroll = () => setHeaderScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const el = exploreSectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setExploreVisible(true); },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);


  // ── Typewriter reveal observer ────────────────────────────────────────────
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.lp-type-in');
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('lp-type-in--visible');
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // ── Scroll reveal observer ─────────────────────────────────────────────────
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.lp-reveal');
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('lp-reveal--visible');
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // ── Body scroll lock when overlay is open ─────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = sheet ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [sheet]);

  // ── ESC key closes overlay ─────────────────────────────────────────────────
  useEffect(() => {
    if (!sheet) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeSheet(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [sheet]);

  // ── Re-trigger title drop-in on open + tab switch ─────────────────────────
  useEffect(() => {
    if (sheet) setAuthTitleKey(k => k + 1);
  }, [sheet]);

  // ── Sand-rise scroll driver ────────────────────────────────────────────────
  useEffect(() => {
    const update = () => {
      const els = document.querySelectorAll<HTMLElement>('.lp-sand-reveal');
      const viewH = window.innerHeight;
      els.forEach(el => {
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const norm = center / viewH; // 1=bottom 0=top
        // Bell: 0 at edges, 1 when centered
        let p = norm > 0.5
          ? Math.max(0, Math.min(1, (1 - norm) * 2.4))
          : Math.max(0, Math.min(1, norm * 2.4));
        // Smoothstep
        p = p * p * (3 - 2 * p);
        el.style.setProperty('--sand-p', p.toFixed(3));
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);



  const handleFlagClick = (country: ExploreCountry) => {
    setSelectedCountry(country);
    setSelectedLanguage(country.languages[0] || '');
    setPanelOpen(true);
  };

  const handleStartLearning = () => {
    if (!selectedLanguage) return;
    if ((isLoggedIn || isGuest) && onSelectLanguage) {
      onSelectLanguage(selectedLanguage);
    } else {
      setPendingLanguage(selectedLanguage);
      onPreSelectLanguage?.(selectedLanguage);
      setSheet('signup');
      setPanelOpen(false);
    }
  };

  const scrollToExplorer = () => {
    exploreSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // ── Auth form state ────────────────────────────────────────────────────────
  const [loginEmail, setLoginEmail]       = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginLoading, setLoginLoading]   = useState(false);
  const [loginError, setLoginError]       = useState('');
  const [loginSuccess, setLoginSuccess]   = useState('');

  const [signupUsername, setSignupUsername] = useState('');
  const [signupEmail, setSignupEmail]       = useState('');
  const [signupPhone, setSignupPhone]       = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupLoading, setSignupLoading]   = useState(false);
  const [signupError, setSignupError]       = useState('');
  const [pwdFocused, setPwdFocused]         = useState(false);
  const [showLoginPwd, setShowLoginPwd]     = useState(false);
  const [showSignupPwd, setShowSignupPwd]   = useState(false);

  // ── Password rules ─────────────────────────────────────────────────────────
  // Standard keyboard special chars only
  const SPECIAL_RE = /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/;

  const pwdRules = [
    { label: 'At least 7 characters',     ok: signupPassword.length >= 7 },
    { label: '1 uppercase letter (A–Z)',   ok: /[A-Z]/.test(signupPassword) },
    { label: '1 lowercase letter (a–z)',   ok: /[a-z]/.test(signupPassword) },
    { label: '1 number (0–9)',             ok: /[0-9]/.test(signupPassword) },
    { label: '1 special character',        ok: SPECIAL_RE.test(signupPassword) },
  ];
  const pwdValid = pwdRules.every(r => r.ok);

  const validateUsername = (v: string) => /^[a-zA-Z0-9_]{3,20}$/.test(v.trim());
  const validateEmail    = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  const validatePhone    = (v: string) => v === '' || /^\+?[0-9\s\-().]{7,20}$/.test(v.trim());

  // ── Rate limiting ──────────────────────────────────────────────────────────
  const RL_KEY = 'afro_login_rl';
  const MAX_ATTEMPTS = 5;
  const LOCKOUT_MS   = 15 * 60 * 1000; // 15 min

  const getRl = (): { count: number; until: number } => {
    try { return JSON.parse(localStorage.getItem(RL_KEY) || '{"count":0,"until":0}'); }
    catch { return { count: 0, until: 0 }; }
  };
  const setRl = (d: { count: number; until: number }) =>
    localStorage.setItem(RL_KEY, JSON.stringify(d));
  const clearRl = () => localStorage.removeItem(RL_KEY);

  const checkLocked = (): { locked: boolean; minutesLeft: number } => {
    const rl = getRl();
    if (rl.until > Date.now()) {
      return { locked: true, minutesLeft: Math.ceil((rl.until - Date.now()) / 60000) };
    }
    if (rl.until && rl.until <= Date.now()) clearRl();
    return { locked: false, minutesLeft: 0 };
  };

  const recordFailedLogin = (): number => {
    const rl = getRl();
    const count = rl.count + 1;
    const until = count >= MAX_ATTEMPTS ? Date.now() + LOCKOUT_MS : rl.until;
    setRl({ count, until });
    return MAX_ATTEMPTS - count;
  };

  // ── Friendly Firebase error map ────────────────────────────────────────────
  const friendlyAuthError = (code: string): string => {
    const map: Record<string, string> = {
      'auth/user-not-found':        'No account found with that email.',
      'auth/wrong-password':        'Incorrect password. Please try again.',
      'auth/invalid-email':         'Please enter a valid email address.',
      'auth/email-already-in-use':  'An account with that email already exists. Try logging in.',
      'auth/weak-password':         'Password does not meet the requirements.',
      'auth/too-many-requests':     'Too many attempts. Please wait before trying again.',
      'auth/network-request-failed':'Network error. Check your connection and try again.',
      'auth/invalid-credential':    'Incorrect email or password.',
      'auth/user-disabled':         'This account has been disabled. Contact support.',
    };
    return map[code] || 'Something went wrong. Please try again.';
  };

  const closeSheet = () => {
    setSheet(null);
    setLoginError(''); setLoginSuccess('');
    setSignupError('');
    setPwdFocused(false);
    setShowLoginPwd(false);
    setShowSignupPwd(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(''); setLoginSuccess('');

    // Rate limit check
    const { locked, minutesLeft } = checkLocked();
    if (locked) {
      setLoginError(`Too many failed attempts. Try again in ${minutesLeft} minute${minutesLeft !== 1 ? 's' : ''}.`);
      return;
    }

    const email = loginEmail.trim().toLowerCase();
    if (!validateEmail(email)) { setLoginError('Please enter a valid email address.'); return; }
    if (!loginPassword)        { setLoginError('Please enter your password.'); return; }

    setLoginLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, loginPassword);
      clearRl();
      closeSheet();
    } catch (err: any) {
      const remaining = recordFailedLogin();
      const base = friendlyAuthError(err?.code ?? '');
      if (remaining > 0 && remaining <= 3) {
        setLoginError(`${base} (${remaining} attempt${remaining !== 1 ? 's' : ''} remaining before lockout)`);
      } else if (remaining <= 0) {
        setLoginError(`Account locked for 15 minutes due to too many failed attempts.`);
      } else {
        setLoginError(base);
      }
    } finally {
      setLoginLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setLoginError(''); setLoginSuccess('');
    const email = loginEmail.trim().toLowerCase();
    if (!email) { setLoginError('Enter your email address above first.'); return; }
    if (!validateEmail(email)) { setLoginError('Please enter a valid email address.'); return; }
    try {
      await sendPasswordResetEmail(auth, email);
      setLoginSuccess('Password reset email sent. Check your inbox.');
    } catch (err: any) {
      setLoginError(friendlyAuthError(err?.code ?? ''));
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError('');

    const username = signupUsername.trim();
    const email    = signupEmail.trim().toLowerCase();
    const phone    = signupPhone.trim();
    const password = signupPassword;

    if (!validateUsername(username)) {
      setSignupError('Username must be 3–20 characters: letters, numbers, and underscores only.');
      return;
    }
    if (!validateEmail(email)) {
      setSignupError('Please enter a valid email address.');
      return;
    }
    if (phone && !validatePhone(phone)) {
      setSignupError('Please enter a valid phone number or leave it blank.');
      return;
    }
    if (!pwdValid) {
      setSignupError('Password does not meet all requirements below.');
      setPwdFocused(true);
      return;
    }

    setSignupLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      // Write Firestore profile in background — don't block on it.
      // onAuthStateChanged fires immediately after Auth succeeds, and waiting
      // on setDoc causes the spinner to hang if Firestore is slow.
      setDoc(doc(db, 'users', user.uid), {
        username,
        email,
        ...(phone ? { phone } : {}),
        hearts: 5,
        xp: 0,
        gems: 0,
        sandbits: 0,
        subscription: { active: false, plan: null },
        createdAt: new Date().toISOString(),
        languages: {},
      }).catch(() => {});
      closeSheet();
    } catch (err: any) {
      setSignupError(friendlyAuthError(err?.code ?? ''));
    } finally {
      setSignupLoading(false);
    }
  };

  // ── Static page render ────────────────────────────────────────────────────
  const PAGE_CONTENT: Record<string, { title: string; body: React.ReactNode }> = {
    about: {
      title: 'About Afroslang',
      body: (<>
        <span className="sp-label">Who We Are</span>
        <p>Afroslang is a gamified African language learning platform built for the diaspora and for everyone who wants to connect with the African continent through its most living cultural threads — its languages.</p>
        <div className="sp-divider" />
        <h2>Our Purpose</h2>
        <p>Africa holds over 2,000 languages. Many of them are at risk. Afroslang exists to make learning these languages feel joyful, addictive, and meaningful — not like homework.</p>
        <p>We believe language is the bridge between identity and heritage. When you speak your ancestral tongue, you carry forward thousands of years of wisdom, story, and connection.</p>
        <div className="sp-divider" />
        <h2>What We Offer</h2>
        <ul>
          <li>15 African languages with full 7-stage curricula</li>
          <li>Gamified lessons: XP, streaks, leaderboards, hearts</li>
          <li>Cultural facts, tone training, and conversation scripts</li>
          <li>Bilingual interface — English and French</li>
          <li>Mobile-first — works on any device</li>
        </ul>
      </>),
    },
    'our-story': {
      title: 'Our Story',
      body: (<>
        <span className="sp-label">Owned by Sonoaac</span>
        <p>Sonoaac is an Africa First Focus Group dedicated to building products that celebrate, preserve, and elevate African culture and identity across the globe.</p>
        <div className="sp-divider" />
        <p>The Founder originates from <strong>Imo Owerri, Nigeria</strong> — born in <strong>2004</strong> in Lagos. Afroslang was created from a personal mission: to ensure that descendants of the diaspora never lose connection with their ancestral tongues.</p>
        <p>What began as a personal frustration — the feeling of being disconnected from Igbo, from the rhythms of home — became a platform that now serves learners from over a dozen African language communities.</p>
        <div className="sp-divider" />
        <h2>Where We're Going</h2>
        <p>Afroslang will expand to cover all major African languages, partner with African linguists and cultural institutions, and donate 50% of every subscription directly to African education charities.</p>
      </>),
    },
    team: {
      title: 'The Team',
      body: (<>
        <span className="sp-label">Sonoaac</span>
        <p>Afroslang is built by a small, focused team under the Sonoaac umbrella — a group of African creators, engineers, and educators who believe technology should serve cultural preservation.</p>
        <div className="sp-divider" />
        <h2>Founder</h2>
        <p><strong>Sonoaac Founder</strong> — Imo Owerri, Nigeria origin. Full-stack developer, language advocate, and diaspora voice. Built Afroslang from scratch at age 20.</p>
        <div className="sp-divider" />
        <h2>Join the Team</h2>
        <p>We are always looking for African language speakers, linguists, educators, and developers who share our mission. Reach out through the Contact page.</p>
      </>),
    },
    roadmap: {
      title: 'Roadmap',
      body: (<>
        <span className="sp-label">What's Coming</span>
        <p>Afroslang is actively growing. Here is a transparent view of what we are building next.</p>
        <div className="sp-divider" />
        <h2>In Progress</h2>
        <ul>
          <li>Expanding to 30+ African languages</li>
          <li>Native speaker audio recordings for all exercises</li>
          <li>Offline mode via Capacitor (iOS & Android apps)</li>
          <li>Community leaderboard leagues with prizes</li>
        </ul>
        <div className="sp-divider" />
        <h2>Planned</h2>
        <ul>
          <li>AI conversation partner trained on African languages</li>
          <li>Diaspora community forums per language</li>
          <li>Children's mode — ages 4–10</li>
          <li>School partnership programme for African institutions</li>
          <li>Physical merchandise — Afroslang cultural collections</li>
        </ul>
        <div className="sp-divider" />
        <h2>Long-Term Vision</h2>
        <p>A world where no African child of the diaspora grows up without access to their ancestral language — free, joyful, and always available in their pocket.</p>
      </>),
    },
    terms: {
      title: 'Terms of Service',
      body: (<>
        <span className="sp-label">Last updated: 2025</span>
        <p>By accessing or using Afroslang, you agree to be bound by these Terms of Service. If you do not agree, please do not use the platform.</p>
        <div className="sp-divider" />
        <h2>Use of Service</h2>
        <p>Afroslang grants you a personal, non-transferable licence to use the platform for personal, non-commercial language learning. You may not reproduce, distribute, or create derivative works from our content without written permission.</p>
        <h2>Accounts</h2>
        <p>You are responsible for maintaining the confidentiality of your account credentials. You must be at least 13 years old to create an account. We reserve the right to suspend accounts that violate these terms.</p>
        <h2>Subscriptions & Payments</h2>
        <p>Paid subscriptions are processed through Stripe. The 7 day free trial converts to a paid subscription unless cancelled before the trial ends. Cancellations take effect at the end of the current billing period.</p>
        <h2>Charitable Contributions</h2>
        <p>50% of all subscription revenue is donated to vetted African education charities. Afroslang publishes an annual transparency report detailing all charitable disbursements.</p>
        <h2>Limitation of Liability</h2>
        <p>Afroslang is provided "as is." We make no warranties regarding uptime, accuracy of language content, or fitness for any particular purpose. Our liability is limited to the amount you paid in the 12 months prior to any claim.</p>
      </>),
    },
    privacy: {
      title: 'Privacy Policy',
      body: (<>
        <span className="sp-label">Last updated: 2025</span>
        <p>Afroslang is committed to protecting your privacy. This policy explains what data we collect, how we use it, and your rights.</p>
        <div className="sp-divider" />
        <h2>Data We Collect</h2>
        <ul>
          <li>Account information: email address, username</li>
          <li>Learning progress: XP, completed lessons, streak data</li>
          <li>Usage data: lessons started, time on platform</li>
          <li>Payment data: processed by Stripe — we do not store card details</li>
        </ul>
        <div className="sp-divider" />
        <h2>How We Use Your Data</h2>
        <p>We use your data to operate the platform, personalise your learning experience, and send occasional product updates. We do not sell your data to third parties.</p>
        <h2>Data Retention</h2>
        <p>We retain your account data for as long as your account exists. You may request deletion at any time by contacting us.</p>
        <h2>Your Rights</h2>
        <p>You have the right to access, correct, or delete your personal data. Contact us at the address on the Contact page to exercise these rights.</p>
      </>),
    },
    cookies: {
      title: 'Cookie Policy',
      body: (<>
        <span className="sp-label">Last updated: 2025</span>
        <p>Afroslang uses a minimal number of cookies and browser storage to operate the platform.</p>
        <div className="sp-divider" />
        <h2>What We Use</h2>
        <ul>
          <li><strong>localStorage</strong> — stores your learning progress, interface language preference, and guest session data locally on your device</li>
          <li><strong>sessionStorage</strong> — tracks whether the intro animation has been shown this session</li>
          <li><strong>Firebase Auth cookies</strong> — maintains your login session securely</li>
        </ul>
        <div className="sp-divider" />
        <h2>Third-Party Cookies</h2>
        <p>Stripe (payment processor) may set cookies during the checkout flow. These are governed by Stripe's own privacy policy.</p>
        <h2>Managing Cookies</h2>
        <p>You can clear localStorage and cookies through your browser settings at any time. Doing so will log you out and reset your locally-stored progress.</p>
      </>),
    },
    partner: {
      title: 'Partner with Us',
      body: (<>
        <span className="sp-label">Sponsorships & Partnerships</span>
        <p>Afroslang is building the most prominent African language platform on the internet. We are open to partnerships that align with our mission of celebrating and preserving African culture.</p>
        <div className="sp-divider" />
        <h2>Who We Partner With</h2>
        <ul>
          <li>African cultural organisations and NGOs</li>
          <li>Universities and language preservation institutes</li>
          <li>African-owned businesses wanting to reach the diaspora</li>
          <li>Media companies and content creators in the African space</li>
          <li>Tech companies building African-focused products</li>
        </ul>
        <div className="sp-divider" />
        <h2>What We Offer Partners</h2>
        <p>In-app placements, co-branded learning content, newsletter features, and access to an engaged diaspora audience actively investing in their African identity.</p>
        <p>Contact us at the Contact page to discuss a partnership.</p>
      </>),
    },
    charity: {
      title: 'Charity Partners',
      body: (<>
        <span className="sp-label">50% Goes Back</span>
        <p>Afroslang was built on a simple promise: half of every payment goes directly to African education and cultural preservation charities. No exceptions.</p>
        <div className="sp-divider" />
        <h2>Our Commitment</h2>
        <p>We publish an annual transparency report showing exactly how much was raised and where it went. Every subscriber can see the direct impact of their membership.</p>
        <div className="sp-divider" />
        <h2>Areas We Support</h2>
        <ul>
          <li>Children's literacy programmes in sub-Saharan Africa</li>
          <li>Indigenous language documentation projects</li>
          <li>Scholarships for African students studying linguistics</li>
          <li>Community libraries and learning centres</li>
        </ul>
        <div className="sp-divider" />
        <h2>Partner Charities</h2>
        <p>We are currently onboarding our first cohort of charity partners. If you represent an African education or language charity, reach out through the Contact page.</p>
      </>),
    },
    advertise: {
      title: 'Advertise',
      body: (<>
        <span className="sp-label">Reach the Diaspora</span>
        <p>Afroslang's audience is educated, culturally engaged, and actively investing in their African heritage. Our users span the UK, US, Canada, France, and across Africa itself.</p>
        <div className="sp-divider" />
        <h2>Ad Formats Available</h2>
        <ul>
          <li>Sponsored cultural fact cards between lessons</li>
          <li>Newsletter placements (coming soon)</li>
          <li>Co-branded language learning content</li>
          <li>Community challenges and leaderboard sponsorships</li>
        </ul>
        <div className="sp-divider" />
        <h2>Our Standards</h2>
        <p>We only accept advertisers whose products and values align with our mission. No gambling, no fast fashion, no content that conflicts with African cultural dignity.</p>
        <p>Interested? Contact us through the Contact page.</p>
      </>),
    },
    contact: {
      title: 'Contact Us',
      body: (<>
        <span className="sp-label">Get in Touch</span>
        <p>We are a small team and we read every message. Whether you have a question, a partnership proposal, or just want to say hello — reach out.</p>
        <div className="sp-divider" />
        <div className="sp-contact-grid">
          <div className="sp-contact-card">
            <span className="sp-contact-card-label">General Enquiries</span>
            <span className="sp-contact-card-value">hello@afroslang.com</span>
          </div>
          <div className="sp-contact-card">
            <span className="sp-contact-card-label">Partnerships</span>
            <span className="sp-contact-card-value">partners@afroslang.com</span>
          </div>
          <div className="sp-contact-card">
            <span className="sp-contact-card-label">Press & Media</span>
            <span className="sp-contact-card-value">press@afroslang.com</span>
          </div>
          <div className="sp-contact-card">
            <span className="sp-contact-card-label">Charity Enquiries</span>
            <span className="sp-contact-card-value">charity@afroslang.com</span>
          </div>
        </div>
        <div className="sp-divider" />
        <p>We typically respond within 2 business days. For technical support, include your account email in the message.</p>
      </>),
    },
  };

  if (activePage && PAGE_CONTENT[activePage]) {
    const pg = PAGE_CONTENT[activePage];
    return (
      <StaticPage title={pg.title} onBack={() => setActivePage(null)}>
        {pg.body}
      </StaticPage>
    );
  }

  return (
    <div className="lp">
      <GlCanvas />

      <header className={`lp-header${headerScrolled ? ' lp-header--scrolled' : ''}`}>
        <div className="lp-header-left" style={{ gap: 6 }}>
          <img src="/Afroslang.png" className="lp-logo" alt="Afroslang" style={{ display: 'block', width: '52px', height: '52px' }} />
          <span className="lp-brand">
            AFRO
            <em style={{ color: '#b00020', WebkitTextStroke: '2.5px #000', marginLeft: 2 }}>SLANG</em>
          </span>
        </div>
      </header>

      {/* ── Stacked Hero ── */}
      <section className="lp-stack">

        {/* Top block: logo + tagline + CTAs */}
        <div className="lp-stack-top">
          <div className="lp-stack-hero-row">
            <div className="lp-stack-logo-wrap">
              <img
                src="/Afroslang.png"
                alt="Afroslang"
                className="lp-stack-logo"
                style={{ opacity: 0.7 }}
              />
            </div>
            <p className="lp-stack-tagline">
              <span className="lp-blood-text" style={{ color: '#ffffff', display: 'block', fontWeight: 800, fontSize: '2em', lineHeight: 1.05, letterSpacing: '0.04em', animationDelay: '2.9s' }}>
                <DescrambleText chars={REKINDLE_CHARS} startDelay={REKINDLE_START} className="dsc-rekindle" />
              </span>
              <span
                className="lp-tagline-sub lp-blood-text"
                style={{ color: 'rgba(255,255,255,0.75)', display: 'block', animationDelay: `${SUB_DELAY + 900}ms` }}
              >
                with your ancestral tongues
              </span>
            </p>
          </div>
        </div>

        {/* ── Interactive Language Explorer ── */}
        <div
          ref={exploreSectionRef}
          className={`lp-explore-section${exploreVisible ? ' lp-explore-section--visible' : ''}`}
        >
          {/* Section header — title + eyebrow only (search moved into left col on desktop) */}
          <div className="lp-explore-header lp-reveal">
            <p className="lp-langs-eyebrow lp-type-in" style={{ color: '#ffffff' }}>Explore the continent one language at a time</p>
            <p className="lp-map-cta-hint">Color the Map</p>
            {/* Search shown in header on mobile only */}
            <div className="lp-explore-search-wrap lp-search-mobile-only">
              <svg className="lp-explore-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <circle cx="11" cy="11" r="7" /><line x1="16.5" y1="16.5" x2="22" y2="22" />
              </svg>
              <input
                className="lp-explore-search"
                type="text"
                placeholder="Search country or language…"
                value={exploreSearch}
                onChange={e => setExploreSearch(e.target.value)}
              />
              {exploreSearch && (
                <button className="lp-explore-search-clear" onClick={() => setExploreSearch('')}>✕</button>
              )}
            </div>
          </div>

          {/* Main: left-col (search + panel) + map (desktop); stacked (mobile) */}
          <div className={`lp-explore-main${panelOpen ? ' lp-explore-main--panel-open' : ''}`}>

            {/* Left column: search bar (desktop) + panel */}
            <div className="lp-explore-left-col">
              {/* Search shown in left col on desktop only */}
              <div className="lp-explore-search-wrap lp-search-desktop-only">
                <svg className="lp-explore-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <circle cx="11" cy="11" r="7" /><line x1="16.5" y1="16.5" x2="22" y2="22" />
                </svg>
                <input
                  className="lp-explore-search"
                  type="text"
                  placeholder="Search country or language…"
                  value={exploreSearch}
                  onChange={e => setExploreSearch(e.target.value)}
                />
                {exploreSearch && (
                  <button className="lp-explore-search-clear" onClick={() => setExploreSearch('')}>✕</button>
                )}
              </div>

            {/* Left panel */}
            <aside className={`lp-explore-panel${panelOpen ? ' lp-explore-panel--open' : ''}`}>
              <div className="lp-explore-panel-handle" />
              {selectedCountry ? (
                <div className="lp-explore-panel-inner">
                  <button className="lp-explore-back-btn" onClick={() => setPanelOpen(false)}>
                    ← All countries
                  </button>
                  <button className="lp-explore-panel-close" onClick={() => { setPanelOpen(false); setSelectedCountry(null); }}>✕</button>
                  <img
                    className="lp-explore-panel-flag"
                    src={`https://flagcdn.com/w80/${selectedCountry.code.toLowerCase()}.png`}
                    alt={selectedCountry.name}
                  />
                  <h3 className="lp-explore-panel-name">{selectedCountry.name}</h3>
                  <p className="lp-explore-panel-fact">{selectedCountry.fact}</p>

                  {selectedCountry.languages.length > 0 ? (
                    <div className="lp-explore-panel-langs">
                      <label className="lp-explore-lang-label">Choose a language to learn</label>
                      <div className="lp-explore-select-wrap">
                        <select
                          className="lp-explore-lang-select"
                          value={selectedLanguage}
                          onChange={e => setSelectedLanguage(e.target.value)}
                        >
                          {selectedCountry.languages.map(lid => (
                            <option key={lid} value={lid}>{LANGUAGE_NAMES[lid] ?? lid}</option>
                          ))}
                        </select>
                        <span className="lp-explore-select-arrow">▾</span>
                      </div>
                      <button className="lp-explore-btn-start" onClick={handleStartLearning}>
                        Start Learning {LANGUAGE_NAMES[selectedLanguage] ?? selectedLanguage}
                      </button>
                    </div>
                  ) : (
                    <div className="lp-explore-coming-soon">
                      <span>🌍</span>
                      <p>Languages for {selectedCountry.name} are coming soon!</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="lp-explore-panel-empty">
                  <img src="/Afroslang.png" alt="" className="lp-explore-panel-logo" />
                  <p>Tap a flag to explore its languages</p>
                </div>
              )}
            </aside>
            </div>{/* end lp-explore-left-col */}

            {/* Africa map */}
            <AfricaMap
              onCountrySelect={(iso2) => {
                const country = EXPLORE_COUNTRIES.find(c => c.code === iso2);
                if (country) handleFlagClick(country);
              }}
              highlightedCodes={(() => {
                const q = exploreSearch.trim().toLowerCase();
                if (!q) return undefined;
                const matched = EXPLORE_COUNTRIES.filter(c =>
                  c.name.toLowerCase().includes(q) ||
                  c.languages.some(l => (LANGUAGE_NAMES[l] ?? l).toLowerCase().includes(q))
                );
                return matched.length ? new Set(matched.map(c => c.code)) : new Set<string>();
              })()}
              unlockedCodes={unlockedCodes}
            />
          </div>
        </div>

        {/* CTAs below map */}
        <div className="lp-map-ctas">
          {isLoggedIn ? (
            <button className="lp-btn-hero-primary" onClick={onContinue ?? scrollToExplorer}>
              Continue Learning →
            </button>
          ) : (
            <div className="lp-stack-ctas-row">
              <button className="lp-btn-hero-primary" onClick={() => setSheet('signup')}>
                Get Started
              </button>
              <button className="lp-btn-hero-ghost" onClick={() => setSheet('login')}>
                Sign In
              </button>
            </div>
          )}
        </div>

        {/* Sandbits */}
        <div className="lp-feature-block lp-feature-block--left">
          <div className="lp-feature-img-wrap">
            <SandbitsIcon size={140} />
          </div>
          <div className="lp-feature-text-block">
            <h3 className="lp-feature-heading lp-feature-heading--sandbits lp-sand-reveal">
              Sandbits
            </h3>
            <p className="lp-feature-body lp-sand-reveal">
              Sandbits are Afroslang's in-game currency used to unlock avatars, backgrounds and cosmetics in the Shop. Earn them by finishing in the top 3 on the weekly leaderboard or converting Diamonds.
            </p>
          </div>
        </div>

        {/* AfroPlus */}
        <div className="lp-feature-block lp-feature-block--right">
          <div className="lp-feature-img-wrap">
            <img src="/Afroplus.png" alt="AfroPlus" className="lp-afroplus-img" />
          </div>
          <div className="lp-feature-text-block lp-feature-text-block--right">
            <h3 className="lp-feature-heading lp-feature-heading--afroplus lp-sand-reveal" style={{ color: '#b00020' }}>
              AfroPlus
            </h3>
            <p className="lp-feature-body lp-sand-reveal">
              AfroPlus unlocks unlimited hearts, 2× XP on every lesson, the full reviews page and a completely ad free experience. Start with a 7 - day free trial and cancel anytime.
            </p>
          </div>
        </div>

        {/* Our Mission — merged with Giving Back, centred */}
        <div className="lp-mission-block lp-reveal">
          <span className="lp-sand-reveal" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', letterSpacing: '0.04em', textAlign: 'center', display: 'block', color: '#b00020' }}>
            Our Mission
          </span>
          <p className="lp-sand-reveal lp-mission-body">
            Afroslang's main goal is to help and assist descendants and children of the diaspora to maintain their language culture and ancestral sense of knowing.
          </p>
          <p className="lp-sand-reveal lp-mission-body">
            Afroslang will better charity cases in Africa whilst being transparent about where your money is going. All payments: 50% to charity, 50% to the site.
          </p>
        </div>

        {/* Manifesto */}
        <div className="lp-manifesto-row lp-reveal">

          {/* Left ad */}
          <div className="lp-manifesto-ad lp-manifesto-ad--left">
            <ins
              className="adsbygoogle"
              style={{ display: 'block' }}
              data-ad-client="ca-pub-1375843273090931"
              data-ad-slot="auto"
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
          </div>

          {/* Centre text */}
          <div className="lp-manifesto">
            <p className="lp-manifesto-eyebrow">A word from us</p>
            <p className="lp-manifesto-body">
              Afroslang is built to help children and children of the diaspora who have forgotten their native tongue.
              Unlike our competitors we aim to scale above 50 languages, well above 100, think{' '}
              <strong>1500+</strong>. That is from Urhobo to Laari to languages with less than 10,000 speakers.
              Until Africa is great. Africa will continue to be great and we aim to add love and value to that.
            </p>
            <p className="lp-manifesto-body">
              So help us and bear with us as we progress every day. Yes every single day we will progress,
              update the app and make sure you get your heart's content and money's worth.
            </p>
            <p className="lp-manifesto-body">
              You all are part of this. We cannot be 100% certain in a project this big so we hope you will
              help us further better these lessons and interfaces. Together.
            </p>
          </div>

          {/* Right ad */}
          <div className="lp-manifesto-ad lp-manifesto-ad--right">
            <ins
              className="adsbygoogle"
              style={{ display: 'block' }}
              data-ad-client="ca-pub-1375843273090931"
              data-ad-slot="auto"
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
          </div>

        </div>

      </section>

      {/* ── Footer ── */}
      <footer className="lp-footer">


        <div className="lp-footer-inner">

          <div className="lp-footer-brand lp-reveal">
            <img src="/Afroslang.png" alt="Afroslang" className="lp-footer-logo" />
            <span className="lp-footer-brand-name">AFRO<em>SLANG</em></span>
            <p className="lp-footer-brand-desc">
              Gamified African language learning for the diaspora and everyone who wants to
              connect with the continent
            </p>
            <div className="lp-footer-socials">
              <a className="lp-social-link" href="https://www.tiktok.com" target="_blank" rel="noreferrer" aria-label="TikTok">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
                </svg>
                TikTok
              </a>
              <a className="lp-social-link" href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                </svg>
                Instagram
              </a>
              <a className="lp-social-link" href="https://www.twitter.com" target="_blank" rel="noreferrer" aria-label="X / Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                Twitter
              </a>
            </div>
          </div>

          <div className="lp-footer-links-grid lp-reveal lp-reveal--delay-1">

            <div className="lp-footer-col">
              <h4 className="lp-footer-col-title">Get to Know</h4>
              <ul className="lp-footer-list">
                <li><button className="lp-footer-link" onClick={() => setActivePage('about')}>About Afroslang</button></li>
                <li><button className="lp-footer-link" onClick={() => setActivePage('our-story')}>Our Story</button></li>
                <li><button className="lp-footer-link" onClick={() => setActivePage('team')}>The Team</button></li>
                <li><button className="lp-footer-link" onClick={() => setActivePage('roadmap')}>Roadmap</button></li>
              </ul>
            </div>

            <div className="lp-footer-col">
              <h4 className="lp-footer-col-title">Legalities</h4>
              <ul className="lp-footer-list">
                <li><button className="lp-footer-link" onClick={() => setActivePage('terms')}>Terms of Service</button></li>
                <li><button className="lp-footer-link" onClick={() => setActivePage('privacy')}>Privacy Policy</button></li>
                <li><button className="lp-footer-link" onClick={() => setActivePage('cookies')}>Cookie Policy</button></li>
              </ul>
            </div>

            <div className="lp-footer-col">
              <h4 className="lp-footer-col-title">Sponsorships</h4>
              <ul className="lp-footer-list">
                <li><button className="lp-footer-link" onClick={() => setActivePage('partner')}>Partner with Us</button></li>
                <li><button className="lp-footer-link" onClick={() => setActivePage('charity')}>Charity Partners</button></li>
                <li><button className="lp-footer-link" onClick={() => setActivePage('advertise')}>Advertise</button></li>
                <li><button className="lp-footer-link" onClick={() => setActivePage('contact')}>Contact Us</button></li>
              </ul>
            </div>

          </div>
        </div>

        <div className="lp-footer-bottom">
          <span>© 2025 Afroslang. Built with love for the diaspora.</span>
          <span className="lp-footer-bottom-right">50% of all payments go directly to African charities</span>
        </div>
      </footer>


      {/* ── Auth glassmorphic phase-in overlay ── */}
      <div
        className={`as-auth-overlay${sheet ? ' as-auth-overlay--active' : ''}`}
        aria-modal="true"
        role="dialog"
        aria-label="Authentication"
      >
        {/* Backdrop — click to close */}
        <div className="as-auth-backdrop" onClick={closeSheet} />

        {/* Glass card */}
        <div className="as-auth-card">

          {/* Close */}
          <button className="as-auth-close" onClick={closeSheet} aria-label="Close">✕</button>

          {/* Drop-in title (DescrambleText, re-triggers on open + tab switch) */}
          <div className="as-auth-title-wrap">
            <DescrambleText
              key={authTitleKey}
              chars={(displaySheet === 'login' ? 'LOG IN' : 'SIGN UP').split('').map(ch => ({ from: ch, to: ch }))}
              className="as-auth-title"
              startDelay={90}
              p1Duration={550}
              p1Stagger={42}
            />
          </div>

          {/* Language context badge — shows when triggered from country panel */}
          {selectedCountry && selectedLanguage && (
            <div className="as-auth-lang-badge">
              <img
                src={`https://flagcdn.com/w20/${selectedCountry.code.toLowerCase()}.png`}
                alt={selectedCountry.name}
                className="as-auth-lang-flag"
              />
              Starting <strong>{LANGUAGE_NAMES[selectedLanguage] ?? selectedLanguage}</strong>
              <span className="as-auth-lang-country">· {selectedCountry.name}</span>
            </div>
          )}

          {/* Tab switcher */}
          <div className="as-auth-tabs">
            <button
              className={`as-tab-btn${displaySheet === 'login' ? ' as-tab-btn--active' : ''}`}
              onClick={() => { setSheet('login'); setSignupError(''); setLoginError(''); setLoginSuccess(''); }}
            >Log In</button>
            <button
              className={`as-tab-btn${displaySheet === 'signup' ? ' as-tab-btn--active' : ''}`}
              onClick={() => { setSheet('signup'); setLoginError(''); setLoginSuccess(''); setSignupError(''); }}
            >Sign Up</button>
          </div>

          {/* LOG IN form */}
          {displaySheet === 'login' && (
            <form className="as-auth-form" onSubmit={handleLogin} autoComplete="on">
              {loginError   && <div className="as-auth-error">{loginError}</div>}
              {loginSuccess && <div className="as-auth-success">{loginSuccess}</div>}

              <div className="as-field-group">
                <input
                  type="email"
                  id="as-login-email"
                  placeholder=" "
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                  autoComplete="email"
                  required
                  maxLength={254}
                />
                <label htmlFor="as-login-email">Email address</label>
              </div>

              <div className="as-field-group">
                <input
                  type={showLoginPwd ? 'text' : 'password'}
                  id="as-login-pwd"
                  placeholder=" "
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  maxLength={128}
                />
                <label htmlFor="as-login-pwd">Password</label>
                <button
                  type="button"
                  className="as-eye-btn"
                  onClick={() => setShowLoginPwd(v => !v)}
                  aria-label={showLoginPwd ? 'Hide password' : 'Show password'}
                >
                  {showLoginPwd ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  )}
                </button>
              </div>

              <button className="as-btn-primary" type="submit" disabled={loginLoading}>
                {loginLoading ? 'Logging in…' : 'LOG IN'}
              </button>
              <button type="button" className="as-btn-forgot" onClick={handleForgotPassword}>
                Forgot password?
              </button>
              <div className="as-auth-divider"><span>or</span></div>
              <button
                type="button"
                className="as-btn-guest"
                onClick={() => {
                  setGuestMode(true);
                  closeSheet();
                  if (pendingLanguage && onSelectLanguage) {
                    onSelectLanguage(pendingLanguage);
                  } else {
                    scrollToExplorer();
                  }
                }}
              >
                Continue as Guest
              </button>
            </form>
          )}

          {/* SIGN UP form */}
          {displaySheet === 'signup' && (
            <form className="as-auth-form" onSubmit={handleSignup} autoComplete="on">
              {signupError && <div className="as-auth-error">{signupError}</div>}

              <div className="as-field-group">
                <input
                  type="text"
                  id="as-signup-username"
                  placeholder=" "
                  value={signupUsername}
                  onChange={e => setSignupUsername(e.target.value.replace(/[^a-zA-Z0-9_]/g, ''))}
                  autoComplete="username"
                  required
                  maxLength={20}
                  minLength={3}
                />
                <label htmlFor="as-signup-username">Username (e.g. africanking_01)</label>
              </div>
              <div className="as-field-group">
                <input
                  type="email"
                  id="as-signup-email"
                  placeholder=" "
                  value={signupEmail}
                  onChange={e => setSignupEmail(e.target.value)}
                  autoComplete="email"
                  required
                  maxLength={254}
                />
                <label htmlFor="as-signup-email">Email address</label>
              </div>
              <div className="as-field-group">
                <input
                  type="tel"
                  id="as-signup-phone"
                  placeholder=" "
                  value={signupPhone}
                  onChange={e => setSignupPhone(e.target.value)}
                  autoComplete="tel"
                  maxLength={20}
                />
                <label htmlFor="as-signup-phone">Phone number (optional)</label>
              </div>
              <div className="as-field-group">
                <input
                  type={showSignupPwd ? 'text' : 'password'}
                  id="as-signup-pwd"
                  placeholder=" "
                  value={signupPassword}
                  onChange={e => setSignupPassword(e.target.value)}
                  onFocus={() => setPwdFocused(true)}
                  autoComplete="new-password"
                  required
                  maxLength={128}
                />
                <label htmlFor="as-signup-pwd">Password</label>
                <button
                  type="button"
                  className="as-eye-btn"
                  onClick={() => setShowSignupPwd(v => !v)}
                  aria-label={showSignupPwd ? 'Hide password' : 'Show password'}
                >
                  {showSignupPwd ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  )}
                </button>
              </div>

              {(pwdFocused || signupPassword.length > 0) && (
                <div className="as-pwd-rules">
                  {pwdRules.map(r => (
                    <div key={r.label} className={`as-pwd-rule${r.ok ? ' as-pwd-rule--ok' : ''}`}>
                      <span className="as-pwd-rule-icon">{r.ok ? '✓' : '·'}</span>
                      {r.label}
                    </div>
                  ))}
                </div>
              )}

              <button className="as-btn-primary" type="submit" disabled={signupLoading}>
                {signupLoading ? 'Creating account…' : 'CREATE ACCOUNT'}
              </button>
              <div className="as-auth-divider"><span>or</span></div>
              <button
                type="button"
                className="as-btn-guest"
                onClick={() => {
                  setGuestMode(true);
                  closeSheet();
                  if (pendingLanguage && onSelectLanguage) {
                    onSelectLanguage(pendingLanguage);
                  } else {
                    scrollToExplorer();
                  }
                }}
              >
                Continue as Guest
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
