import { useState, useMemo } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import './LandingPage.css';

type SheetMode = 'login' | 'signup' | null;

interface CountryData {
  code: string;
  name: string;
  flag: string;
  fact: string;
  languages: string[];
  priority: number;
}

const LANGUAGE_NAMES: Record<string, string> = {
  hausa: 'Hausa',
  yoruba: 'Yoruba',
  igbo: 'Igbo',
  amharic: 'Amharic',
  somali: 'Somali',
  arabic: 'Arabic',
  swahili: 'Swahili',
  zulu: 'Zulu',
  twi: 'Twi (Akan)',
  wolof: 'Wolof',
  moore: 'Mòoré',
  lingala: 'Lingala',
  shona: 'Shona',
  chichewa: 'Chichewa',
  berber: 'Berber',
};

// All 54 recognized African countries — priority 1 = languages available, priority 2 = coming soon
const AFRICAN_COUNTRIES: CountryData[] = [
  { code: 'NG', name: 'Nigeria',        flag: '🇳🇬', fact: 'Home to over 500 languages — more than any other country in Africa.',                                                            languages: ['hausa', 'yoruba', 'igbo'], priority: 1 },
  { code: 'ET', name: 'Ethiopia',       flag: '🇪🇹', fact: 'One of Africa\'s oldest civilizations, with over 90 languages spoken across the country.',                                      languages: ['amharic', 'somali'],       priority: 1 },
  { code: 'EG', name: 'Egypt',          flag: '🇪🇬', fact: 'Home to the world\'s oldest writing system — ancient hieroglyphics date back over 5,000 years.',                               languages: ['arabic'],                  priority: 1 },
  { code: 'TZ', name: 'Tanzania',       flag: '🇹🇿', fact: 'Birthplace of Swahili, now spoken by over 200 million people across Africa.',                                                   languages: ['swahili'],                 priority: 1 },
  { code: 'KE', name: 'Kenya',          flag: '🇰🇪', fact: 'Africa\'s tech capital — Nairobi is known as "Silicon Savannah" and hosts hundreds of startups.',                               languages: ['swahili', 'somali'],       priority: 1 },
  { code: 'ZA', name: 'South Africa',   flag: '🇿🇦', fact: 'Has 11 official languages — the most of any single country in the world.',                                                      languages: ['zulu'],                    priority: 1 },
  { code: 'GH', name: 'Ghana',          flag: '🇬🇭', fact: 'The first sub-Saharan African country to gain independence in 1957, inspiring a continent.',                                    languages: ['twi', 'hausa'],            priority: 1 },
  { code: 'MA', name: 'Morocco',        flag: '🇲🇦', fact: 'Home to the world\'s oldest university, al-Qarawiyyin, founded in 859 AD.',                                                    languages: ['arabic', 'berber'],        priority: 1 },
  { code: 'DZ', name: 'Algeria',        flag: '🇩🇿', fact: 'The largest country in Africa by land area — bigger than all of Western Europe combined.',                                     languages: ['arabic', 'berber'],        priority: 1 },
  { code: 'CD', name: 'DR Congo',       flag: '🇨🇩', fact: 'Home to the second-largest rainforest on Earth and the world\'s deepest river.',                                                languages: ['lingala', 'swahili'],      priority: 1 },
  { code: 'SN', name: 'Senegal',        flag: '🇸🇳', fact: 'Nearly all Senegalese speak Wolof as a shared language, regardless of ethnicity.',                                              languages: ['wolof'],                   priority: 1 },
  { code: 'BF', name: 'Burkina Faso',   flag: '🇧🇫', fact: 'The name means "Land of Incorruptible Men" — Mòoré is spoken by nearly half the population.',                                  languages: ['moore'],                   priority: 1 },
  { code: 'ZW', name: 'Zimbabwe',       flag: '🇿🇼', fact: 'Home to Victoria Falls, one of the Seven Natural Wonders of the World.',                                                        languages: ['shona'],                   priority: 1 },
  { code: 'SO', name: 'Somalia',        flag: '🇸🇴', fact: 'Somali is the most widely spoken Cushitic language in Africa, with a rich oral poetry tradition.',                              languages: ['somali'],                  priority: 1 },
  { code: 'MW', name: 'Malawi',         flag: '🇲🇼', fact: 'Lake Malawi contains more fish species than any other lake on Earth — over 1,000 species.',                                    languages: ['chichewa'],                priority: 1 },
  { code: 'ZM', name: 'Zambia',         flag: '🇿🇲', fact: 'Home to 73 spoken languages and shares the spectacular Victoria Falls with Zimbabwe.',                                          languages: ['chichewa'],                priority: 1 },
  { code: 'MZ', name: 'Mozambique',     flag: '🇲🇿', fact: 'Has one of the longest coastlines in Africa — over 2,500 km of Indian Ocean shoreline.',                                       languages: ['chichewa'],                priority: 1 },
  { code: 'CG', name: 'Rep. of Congo',  flag: '🇨🇬', fact: 'Part of the Congo Basin rainforest — the second-largest tropical forest in the world.',                                        languages: ['lingala'],                 priority: 1 },
  { code: 'BJ', name: 'Benin',          flag: '🇧🇯', fact: 'Birthplace of Vodun (Voodoo) — a rich spiritual tradition that later spread to the Americas.',                                  languages: ['yoruba'],                  priority: 1 },
  { code: 'GM', name: 'Gambia',         flag: '🇬🇲', fact: 'The smallest country in mainland Africa, almost entirely surrounded by Senegal.',                                               languages: ['wolof'],                   priority: 1 },
  { code: 'UG', name: 'Uganda',         flag: '🇺🇬', fact: 'Hosts over half of the world\'s remaining mountain gorillas in Bwindi Impenetrable Forest.',                                   languages: ['swahili'],                 priority: 1 },
  // Priority 2 — coming soon
  { code: 'SD', name: 'Sudan',          flag: '🇸🇩', fact: 'Sudan has more ancient pyramids than Egypt — over 200 Nubian pyramids dot its northern landscape.',                            languages: ['arabic'],                  priority: 2 },
  { code: 'TN', name: 'Tunisia',        flag: '🇹🇳', fact: 'The northernmost country in Africa and the birthplace of the Arab Spring in 2010.',                                             languages: ['arabic'],                  priority: 2 },
  { code: 'LY', name: 'Libya',          flag: '🇱🇾', fact: 'Libya holds the largest proven oil reserves in Africa.',                                                                         languages: ['arabic'],                  priority: 2 },
  { code: 'MR', name: 'Mauritania',     flag: '🇲🇷', fact: 'Ancient cities of Chinguetti and Ouadane are UNESCO World Heritage Sites in the Sahara.',                                      languages: ['arabic'],                  priority: 2 },
  { code: 'DJ', name: 'Djibouti',       flag: '🇩🇯', fact: 'Home to Lake Assal — the lowest point in Africa and one of the saltiest bodies of water on Earth.',                            languages: ['somali'],                  priority: 2 },
  { code: 'NE', name: 'Niger',          flag: '🇳🇪', fact: 'The largest country in West Africa — 80% of its land is covered by the Sahara Desert.',                                        languages: ['hausa'],                   priority: 2 },
  { code: 'MG', name: 'Madagascar',     flag: '🇲🇬', fact: 'Over 90% of Madagascar\'s wildlife exists nowhere else on Earth, including over 100 lemur species.',                           languages: [],                          priority: 2 },
  { code: 'CM', name: 'Cameroon',       flag: '🇨🇲', fact: 'Called "Africa in miniature" — rainforests, savannas, mountains, deserts, and beaches all in one country.',                   languages: [],                          priority: 2 },
  { code: 'AO', name: 'Angola',         flag: '🇦🇴', fact: 'Angola has the highest number of Portuguese speakers outside of Brazil and Portugal.',                                          languages: [],                          priority: 2 },
  { code: 'ML', name: 'Mali',           flag: '🇲🇱', fact: 'Timbuktu was once the world\'s greatest center of Islamic scholarship, with over 700,000 manuscripts.',                        languages: [],                          priority: 2 },
  { code: 'TD', name: 'Chad',           flag: '🇹🇩', fact: 'Lake Chad, once one of Africa\'s largest lakes, has shrunk by 90% since the 1960s.',                                           languages: [],                          priority: 2 },
  { code: 'CI', name: 'Côte d\'Ivoire', flag: '🇨🇮', fact: 'The world\'s largest producer of cocoa — responsible for about 40% of the global cocoa supply.',                               languages: [],                          priority: 2 },
  { code: 'GN', name: 'Guinea',         flag: '🇬🇳', fact: 'Guinea contains two-thirds of the world\'s bauxite reserves — the primary source of aluminum.',                                languages: [],                          priority: 2 },
  { code: 'RW', name: 'Rwanda',         flag: '🇷🇼', fact: 'Rwanda has the highest percentage of female parliament members of any country in the world.',                                   languages: [],                          priority: 2 },
  { code: 'BI', name: 'Burundi',        flag: '🇧🇮', fact: 'Despite being one of Africa\'s smallest countries, Burundi has remarkable cultural diversity.',                                 languages: [],                          priority: 2 },
  { code: 'SS', name: 'South Sudan',    flag: '🇸🇸', fact: 'South Sudan is the world\'s newest country, gaining independence in July 2011.',                                               languages: [],                          priority: 2 },
  { code: 'TG', name: 'Togo',           flag: '🇹🇬', fact: 'Togo\'s Vodoun Day draws thousands of visitors each January to celebrate an ancient spiritual tradition.',                     languages: [],                          priority: 2 },
  { code: 'SL', name: 'Sierra Leone',   flag: '🇸🇱', fact: '"Sierra Leone" means "Lion Mountains" in Portuguese — named by early explorers for its thunder.',                              languages: [],                          priority: 2 },
  { code: 'LR', name: 'Liberia',        flag: '🇱🇷', fact: 'Liberia is Africa\'s oldest republic, founded in 1847 by freed American slaves.',                                              languages: [],                          priority: 2 },
  { code: 'CF', name: 'Cent. African R.',flag: '🇨🇫', fact: 'Home to the Dzanga-Sangha forest reserve — one of the last refuges for forest elephants and western lowland gorillas.',        languages: [],                          priority: 2 },
  { code: 'ER', name: 'Eritrea',        flag: '🇪🇷', fact: 'Eritrea gained independence from Ethiopia in 1993 after a 30-year liberation struggle.',                                        languages: [],                          priority: 2 },
  { code: 'NA', name: 'Namibia',        flag: '🇳🇦', fact: 'The Namib Desert is the world\'s oldest desert at over 55 million years, with towering red sand dunes.',                       languages: [],                          priority: 2 },
  { code: 'BW', name: 'Botswana',       flag: '🇧🇼', fact: 'Botswana transformed from one of Africa\'s poorest nations into one of its fastest-growing economies.',                        languages: [],                          priority: 2 },
  { code: 'LS', name: 'Lesotho',        flag: '🇱🇸', fact: 'Lesotho is entirely surrounded by South Africa — one of only three such landlocked-within-one-country nations on Earth.',     languages: [],                          priority: 2 },
  { code: 'GW', name: 'Guinea-Bissau',  flag: '🇬🇼', fact: 'The Bijagós Archipelago is a UNESCO Biosphere Reserve — home to hippos that live in the Atlantic Ocean.',                     languages: [],                          priority: 2 },
  { code: 'GA', name: 'Gabon',          flag: '🇬🇦', fact: 'Gabon has 88% forest cover — one of the most forested countries on Earth, rich in biodiversity.',                              languages: [],                          priority: 2 },
  { code: 'GQ', name: 'Equatorial Guinea', flag: '🇬🇶', fact: 'The only country in mainland Africa where Spanish is an official language.',                                                 languages: [],                          priority: 2 },
  { code: 'SZ', name: 'Eswatini',       flag: '🇸🇿', fact: 'Eswatini is one of Africa\'s last absolute monarchies, governed by Africa\'s youngest king.',                                  languages: [],                          priority: 2 },
  { code: 'CV', name: 'Cape Verde',     flag: '🇨🇻', fact: 'Cape Verde\'s unique music genre Morna is recognized by UNESCO as Intangible Cultural Heritage.',                              languages: [],                          priority: 2 },
  { code: 'ST', name: 'São Tomé & Príncipe', flag: '🇸🇹', fact: 'Sits almost exactly on the equator in the Atlantic — one of Africa\'s smallest island nations.',                          languages: [],                          priority: 2 },
  { code: 'KM', name: 'Comoros',        flag: '🇰🇲', fact: 'The world\'s largest producer of ylang-ylang flowers, used in some of the finest perfumes on Earth.',                          languages: [],                          priority: 2 },
  { code: 'MU', name: 'Mauritius',      flag: '🇲🇺', fact: 'The extinct dodo bird was native to Mauritius — the island is considered its last habitat on Earth.',                          languages: [],                          priority: 2 },
  { code: 'SC', name: 'Seychelles',     flag: '🇸🇨', fact: 'Home to the Coco de Mer — the world\'s largest seed, which can weigh up to 25 kilograms.',                                    languages: [],                          priority: 2 },
];

// Mobile shows first 27 (priority-1 countries fill ~21, then some of priority-2)
const MOBILE_FIRST_COUNT = 27;

interface LandingPageProps {
  initialSheet?: SheetMode;
}

export function LandingPage({ initialSheet }: LandingPageProps) {
  const { setGuestMode } = useAuth();

  // Auth sheet
  const [sheet, setSheet] = useState<SheetMode>(initialSheet ?? null);

  // Search
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Gallery
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);   // mobile bottom-sheet open
  const [showAll, setShowAll] = useState(false);       // pagination

  // Login state
  const [loginEmail, setLoginEmail]       = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginLoading, setLoginLoading]   = useState(false);
  const [loginError, setLoginError]       = useState('');
  const [loginSuccess, setLoginSuccess]   = useState('');

  // Signup state
  const [signupName, setSignupName]         = useState('');
  const [signupEmail, setSignupEmail]       = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupLoading, setSignupLoading]   = useState(false);
  const [signupError, setSignupError]       = useState('');

  const closeSheet = () => {
    setSheet(null);
    setLoginError(''); setLoginSuccess('');
    setSignupError('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true); setLoginError(''); setLoginSuccess('');
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      closeSheet();
    } catch (err: any) {
      setLoginError(err?.message || 'Login failed.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setLoginError(''); setLoginSuccess('');
    if (!loginEmail) { setLoginError('Enter your email first.'); return; }
    try {
      await sendPasswordResetEmail(auth, loginEmail);
      setLoginSuccess('Reset email sent — check your inbox.');
    } catch (err: any) {
      setLoginError(err?.message || 'Could not send reset email.');
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupLoading(true); setSignupError('');
    try {
      const { user } = await createUserWithEmailAndPassword(auth, signupEmail, signupPassword);
      await setDoc(doc(db, 'users', user.uid), {
        username: signupName,
        email: signupEmail,
        hearts: 5,
        xp: 0,
        subscription: { active: false, plan: null },
        createdAt: new Date().toISOString(),
        languages: {},
      });
      closeSheet();
    } catch (err: any) {
      const code = err?.code ?? '';
      if (code === 'auth/email-already-in-use') setSignupError('Email already registered. Try logging in.');
      else if (code === 'auth/weak-password')   setSignupError('Password must be at least 6 characters.');
      else if (code === 'auth/invalid-email')   setSignupError('Please enter a valid email address.');
      else setSignupError(err?.message || 'Signup failed. Try again.');
    } finally {
      setSignupLoading(false);
    }
  };

  const handleFlagClick = (country: CountryData) => {
    setSelectedCountry(country);
    setSelectedLanguage(country.languages[0] || '');
    setPanelOpen(true);
  };

  const handleShowMore = () => {
    setShowAll(true);
  };

  const filteredCountries = useMemo(() => {
    if (!searchQuery.trim()) return AFRICAN_COUNTRIES;
    const q = searchQuery.toLowerCase();
    return AFRICAN_COUNTRIES.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.languages.some(l => LANGUAGE_NAMES[l]?.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const firstHalf  = filteredCountries.slice(0, MOBILE_FIRST_COUNT);
  const secondHalf = filteredCountries.slice(MOBILE_FIRST_COUNT);

  return (
    <div className="lp">

      {/* ── Header ── */}
      <header className="lp-header">
        <div className="lp-header-left">
          <img src="/Afroslang.png" alt="Afroslang" className="lp-logo" />
          <span className="lp-brand">Afro<em>slang</em></span>
        </div>

        <div className="lp-header-right">
          {searchOpen ? (
            <div className="lp-search-bar">
              <input
                autoFocus
                type="text"
                className="lp-search-input"
                placeholder="Search country or language…"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              <button
                className="lp-search-close"
                onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
              >✕</button>
            </div>
          ) : (
            <button className="lp-search-icon" onClick={() => setSearchOpen(true)} title="Search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <circle cx="11" cy="11" r="7" />
                <line x1="16.5" y1="16.5" x2="22" y2="22" />
              </svg>
            </button>
          )}
          <button className="lp-btn-login"  onClick={() => setSheet('login')}>Log In</button>
          <button className="lp-btn-signup" onClick={() => setSheet('signup')}>Sign Up</button>
        </div>
      </header>

      {/* ── Main: featured panel + flag grid ── */}
      <main className="lp-main">

        {/* Featured panel — desktop sidebar / mobile bottom-sheet */}
        <aside className={`lp-featured${panelOpen ? ' lp-featured--open' : ''}`}>
          {/* Mobile drag handle */}
          <div className="lp-featured-handle" />

          {selectedCountry ? (
            <div key={selectedCountry.code} className="lp-featured-inner">
              <button
                className="lp-featured-close"
                onClick={() => setPanelOpen(false)}
                aria-label="Close"
              >✕</button>

              <div className="lp-featured-flag">{selectedCountry.flag}</div>
              <h2 className="lp-featured-name">{selectedCountry.name}</h2>
              <p className="lp-featured-fact">{selectedCountry.fact}</p>

              {selectedCountry.languages.length > 0 ? (
                <div className="lp-featured-langs">
                  <label className="lp-lang-label">Choose a language to learn</label>
                  <div className="lp-lang-select-wrap">
                    <select
                      className="lp-lang-select"
                      value={selectedLanguage}
                      onChange={e => setSelectedLanguage(e.target.value)}
                    >
                      {selectedCountry.languages.map(lid => (
                        <option key={lid} value={lid}>{LANGUAGE_NAMES[lid] || lid}</option>
                      ))}
                    </select>
                    <span className="lp-select-arrow">▾</span>
                  </div>
                  <button
                    className="lp-btn-start"
                    onClick={() => setSheet('signup')}
                  >
                    Start Learning {selectedLanguage ? LANGUAGE_NAMES[selectedLanguage] : ''}
                  </button>
                </div>
              ) : (
                <div className="lp-featured-coming">
                  <span>🌍</span>
                  <p>Languages for {selectedCountry.name} are coming soon!</p>
                </div>
              )}
            </div>
          ) : (
            <div className="lp-featured-empty">
              <img src="/Afroslang.png" alt="" className="lp-featured-logo" />
              <p className="lp-featured-prompt">Tap a country flag<br/>to explore its languages</p>
            </div>
          )}
        </aside>

        {/* Flag gallery + CTAs */}
        <div className="lp-grid-wrap">
          <div className="lp-flag-grid">
            {firstHalf.map(country => (
              <button
                key={country.code}
                className={[
                  'lp-flag-btn',
                  selectedCountry?.code === country.code ? 'lp-flag-btn--active' : '',
                  country.languages.length === 0 ? 'lp-flag-btn--dim' : '',
                ].join(' ')}
                onClick={() => handleFlagClick(country)}
                title={country.name}
              >
                <span className="lp-flag-emoji">{country.flag}</span>
                <span className="lp-flag-name">{country.name}</span>
              </button>
            ))}

            {/* "›" next page button */}
            {!showAll && secondHalf.length > 0 && (
              <button className="lp-more-btn" onClick={handleShowMore} title="See all countries">
                <span>›</span>
              </button>
            )}

            {/* Second half — flow-in animation */}
            {showAll && secondHalf.map((country, idx) => (
              <button
                key={country.code}
                className={[
                  'lp-flag-btn lp-flag-btn--flow',
                  selectedCountry?.code === country.code ? 'lp-flag-btn--active' : '',
                  country.languages.length === 0 ? 'lp-flag-btn--dim' : '',
                ].join(' ')}
                style={{ animationDelay: `${idx * 28}ms` }}
                onClick={() => handleFlagClick(country)}
                title={country.name}
              >
                <span className="lp-flag-emoji">{country.flag}</span>
                <span className="lp-flag-name">{country.name}</span>
              </button>
            ))}

            {/* "‹" collapse button */}
            {showAll && (
              <button className="lp-less-btn" onClick={() => setShowAll(false)} title="Show less">
                <span>‹</span>
              </button>
            )}
          </div>

          {/* Primary CTAs */}
          <div className="lp-cta-row">
            <button className="lp-btn-primary" onClick={() => setSheet('signup')}>
              Get Started — It's Free
            </button>
            <button className="lp-btn-guest" onClick={() => setGuestMode(true)}>
              Continue as Guest
            </button>
          </div>
        </div>
      </main>

      {/* ── Info sections ── */}
      <section className="lp-info">
        <details className="lp-info-section" open>
          <summary className="lp-info-summary">Did You Know?</summary>
          <div className="lp-info-body">
            <div className="lp-facts-grid">
              <div className="lp-fact-card">🌍 <strong>2,000+</strong> languages are spoken across Africa — more than any other continent on Earth.</div>
              <div className="lp-fact-card">🗣️ <strong>Swahili</strong> is Africa's most widely spoken language, used from Kenya to the DRC to Mozambique.</div>
              <div className="lp-fact-card">📜 <strong>Arabic</strong> has been written in Africa for over 1,400 years — longer than in most of Europe.</div>
              <div className="lp-fact-card">🏆 <strong>Yoruba</strong> has over 50 million speakers and directly influenced languages spoken in Brazil and Cuba.</div>
              <div className="lp-fact-card">🔤 <strong>Amharic</strong> uses the Ge'ez script — one of the few indigenous African writing systems still in active use today.</div>
              <div className="lp-fact-card">🎵 Many African languages are <strong>tonal</strong> — the same word spoken at different pitches can carry completely different meanings.</div>
            </div>
          </div>
        </details>

        <details className="lp-info-section">
          <summary className="lp-info-summary">About Afroslang</summary>
          <div className="lp-info-body">
            <p>Afroslang is a gamified African language learning platform built to celebrate and preserve the rich linguistic heritage of Africa. Choose from 15 languages across 5 regions, earn XP, maintain streaks, and compete on leaderboards.</p>
            <p style={{ marginTop: '12px' }}>Our curriculum is built by native speakers and educators. Every lesson connects language to culture — because to truly speak a language, you must understand its people.</p>
          </div>
        </details>
      </section>

      {/* Mobile backdrop for featured panel */}
      {panelOpen && (
        <div className="lp-panel-backdrop" onClick={() => setPanelOpen(false)} />
      )}

      {/* ── Auth bottom sheet ── */}
      {sheet && (
        <>
          <div className="auth-sheet-backdrop" onClick={closeSheet} />
          <div className="auth-sheet">
            <div className="auth-sheet-handle" />

            <div className="auth-sheet-tabs">
              <button
                className={`auth-sheet-tab${sheet === 'login' ? ' auth-sheet-tab--active' : ''}`}
                onClick={() => { setSheet('login'); setSignupError(''); setLoginError(''); setLoginSuccess(''); }}
              >Log In</button>
              <button
                className={`auth-sheet-tab${sheet === 'signup' ? ' auth-sheet-tab--active' : ''}`}
                onClick={() => { setSheet('signup'); setLoginError(''); setLoginSuccess(''); setSignupError(''); }}
              >Sign Up</button>
            </div>

            {sheet === 'login' && (
              <form onSubmit={handleLogin}>
                {loginError   && <div className="auth-sheet-error">{loginError}</div>}
                {loginSuccess && <div className="auth-sheet-success">{loginSuccess}</div>}
                <input className="auth-sheet-input" type="email"    placeholder="Email address"   value={loginEmail}    onChange={e => setLoginEmail(e.target.value)}    required autoComplete="email" />
                <input className="auth-sheet-input" type="password" placeholder="Password"         value={loginPassword} onChange={e => setLoginPassword(e.target.value)} required autoComplete="current-password" />
                <button className="auth-sheet-submit" type="submit" disabled={loginLoading}>
                  {loginLoading ? 'Logging in…' : 'Log In'}
                </button>
                <button type="button" className="auth-sheet-forgot" onClick={handleForgotPassword}>
                  Forgot password?
                </button>
              </form>
            )}

            {sheet === 'signup' && (
              <form onSubmit={handleSignup}>
                {signupError && <div className="auth-sheet-error">{signupError}</div>}
                <input className="auth-sheet-input" type="text"     placeholder="Full name"           value={signupName}     onChange={e => setSignupName(e.target.value)}     required autoComplete="name" />
                <input className="auth-sheet-input" type="email"    placeholder="Email address"       value={signupEmail}    onChange={e => setSignupEmail(e.target.value)}    required autoComplete="email" />
                <input className="auth-sheet-input" type="password" placeholder="Password (min 6 chars)" value={signupPassword} onChange={e => setSignupPassword(e.target.value)} required autoComplete="new-password" minLength={6} />
                <button className="auth-sheet-submit" type="submit" disabled={signupLoading}>
                  {signupLoading ? 'Creating account…' : 'Create Account'}
                </button>
              </form>
            )}
          </div>
        </>
      )}
    </div>
  );
}
