import { useState, useEffect, useRef } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import './LandingPage.css';

type SheetMode = 'login' | 'signup' | null;

interface LandingPageProps {
  initialSheet?: SheetMode;
  isLoggedIn?: boolean;
  onContinue?: () => void;
  onSelectLanguage?: (languageId: string) => void;
  onPreSelectLanguage?: (languageId: string) => void;
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

export function LandingPage({ initialSheet, isLoggedIn, onContinue, onSelectLanguage, onPreSelectLanguage }: LandingPageProps) {
  const { setGuestMode, isGuest } = useAuth();

  const [sheet, setSheet] = useState<SheetMode>(initialSheet ?? null);
  const [showOurStory, setShowOurStory] = useState(false);

  // Explorer section state
  const [exploreSearch, setExploreSearch]         = useState('');
  const [selectedCountry, setSelectedCountry]     = useState<ExploreCountry | null>(null);
  const [selectedLanguage, setSelectedLanguage]   = useState('');
  const [pendingLanguage, setPendingLanguage]     = useState('');
  const [panelOpen, setPanelOpen]                 = useState(false);
  const [showAll, setShowAll]                     = useState(false);
  const [exploreVisible, setExploreVisible]       = useState(false);
  const exploreSectionRef = useRef<HTMLDivElement>(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const initialCount = isMobile ? 7 : 21;

  useEffect(() => { window.scrollTo(0, 0); }, []);

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

  const filteredCountries = EXPLORE_COUNTRIES.filter(c => {
    const q = exploreSearch.trim().toLowerCase();
    if (!q) return true;
    if (c.name.toLowerCase().includes(q)) return true;
    return c.languages.some(l => (LANGUAGE_NAMES[l] ?? l).toLowerCase().includes(q));
  });

  const firstHalf  = filteredCountries.slice(0, initialCount);
  const secondHalf = filteredCountries.slice(initialCount);

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
      setLoginSuccess('Reset email sent. Check your inbox.');
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

  return (
    <div className="lp">

      {/* ── Stacked Hero ── */}
      <section className="lp-stack">

        <header className="lp-header">
          <div className="lp-header-left">
            <img src="/Afroslang.png" alt="Afroslang" className="lp-logo" />
            <span className="lp-brand">Afro<em>slang</em></span>
          </div>
        </header>

        {/* Top block: logo + tagline + CTAs */}
        <div className="lp-stack-top">
          <div className="lp-stack-hero-row">
            <div className="lp-stack-logo-wrap">
              <img src="/Afroslang.png" alt="Afroslang" className="lp-stack-logo" />
              <div className="lp-stack-logo-glow" />
            </div>
            <p className="lp-stack-tagline">
              <span style={{ color: '#ffffff', display: 'block', fontWeight: 800, fontSize: '2em', lineHeight: 1.1 }}>Rekindle</span>
              <span style={{ color: '#b00020', display: 'block' }}>with your ancestral tongues</span>
            </p>
          </div>
          <div className="lp-stack-ctas">
            {isLoggedIn ? (
              <button className="lp-btn-hero-primary" onClick={onContinue ?? scrollToExplorer}>
                Continue Learning →
              </button>
            ) : (
              <>
                <div className="lp-stack-ctas-row">
                  <button className="lp-btn-hero-primary" onClick={() => setSheet('signup')}>
                    Get Started
                  </button>
                  <button className="lp-btn-hero-ghost" onClick={() => setSheet('login')}>
                    Sign In
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Our Mission row */}
        <div className="lp-stack-row lp-stack-row--right">
          <div className="lp-stack-row-text">
            <span className="lp-stack-row-label">Our Mission</span>
            <p>
              Afroslang main goal is to help and assist descendants and children of the diaspora
              to maintain their language culture and ancestral sense of knowing
            </p>
          </div>
          <div className="lp-stack-row-img-wrap lp-stack-row-img-wrap--right">
            <img src="/Afroslanglpimg1.png" alt="Afroslang community" className="lp-stack-img" />
            <div className="lp-stack-img-border" />
          </div>
        </div>

        {/* ── Interactive Language Explorer ── */}
        <div
          ref={exploreSectionRef}
          className={`lp-explore-section${exploreVisible ? ' lp-explore-section--visible' : ''}`}
        >
          {/* Section header */}
          <div className="lp-explore-header">
            <p className="lp-langs-eyebrow">Over 1500+ African Languages · Explore the Continent — Not even half way there</p>
            <div className="lp-explore-search-wrap">
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

          {/* Main: panel left + grid right (desktop); panel replaces grid (mobile) */}
          <div className={`lp-explore-main${panelOpen ? ' lp-explore-main--panel-open' : ''}`}>

            {/* Left panel */}
            <aside className={`lp-explore-panel${panelOpen ? ' lp-explore-panel--open' : ''}`}>
              <div className="lp-explore-panel-handle" />
              {selectedCountry ? (
                <div className="lp-explore-panel-inner">
                  <button className="lp-explore-back-btn" onClick={() => setPanelOpen(false)}>
                    ← All countries
                  </button>
                  <button className="lp-explore-panel-close" onClick={() => setPanelOpen(false)}>✕</button>
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

            {/* Flag grid */}
            <div className="lp-explore-grid-wrap">
              <div className="lp-explore-grid">
                {firstHalf.map((country, idx) => (
                  <button
                    key={country.code}
                    className={[
                      'lp-explore-flag-btn',
                      selectedCountry?.code === country.code ? 'lp-explore-flag-btn--active' : '',
                      country.languages.length === 0 ? 'lp-explore-flag-btn--dim' : '',
                    ].join(' ')}
                    style={{ animationDelay: `${idx * 28}ms` }}
                    onClick={() => handleFlagClick(country)}
                    title={country.name}
                  >
                    <img
                      className="lp-langs-flag"
                      src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
                      alt={country.name}
                      loading="lazy"
                    />
                    <span className="lp-langs-name">{country.name}</span>
                  </button>
                ))}

                {!showAll && secondHalf.length > 0 && (
                  <button
                    className="lp-langs-toggle"
                    onClick={() => setShowAll(true)}
                    aria-label="Show more countries"
                  >
                    <span className="lp-langs-toggle-icon">›</span>
                  </button>
                )}

                {showAll && secondHalf.map((country, idx) => (
                  <button
                    key={country.code}
                    className={[
                      'lp-explore-flag-btn',
                      selectedCountry?.code === country.code ? 'lp-explore-flag-btn--active' : '',
                      country.languages.length === 0 ? 'lp-explore-flag-btn--dim' : '',
                    ].join(' ')}
                    style={{ animationDelay: `${idx * 28}ms` }}
                    onClick={() => handleFlagClick(country)}
                    title={country.name}
                  >
                    <img
                      className="lp-langs-flag"
                      src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
                      alt={country.name}
                      loading="lazy"
                    />
                    <span className="lp-langs-name">{country.name}</span>
                  </button>
                ))}

                {showAll && (
                  <button
                    className="lp-langs-toggle"
                    onClick={() => setShowAll(false)}
                    aria-label="Show fewer countries"
                  >
                    <span className="lp-langs-toggle-icon lp-langs-toggle-icon--up">›</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>


        {/* Giving Back row */}
        <div className="lp-stack-row lp-stack-row--left">
          <div className="lp-stack-row-img-wrap lp-stack-row-img-wrap--left">
            <img src="/Afroslanglpimg2.png" alt="Afroslang giving back" className="lp-stack-img" />
            <div className="lp-stack-img-border" />
          </div>
          <div className="lp-stack-row-text lp-stack-row-text--right">
            <span className="lp-stack-row-label">Giving Back</span>
            <p>
              Afroslang will better charity cases in africa as a whole whilst being transparent
              of where your money is going. All payments 50% go to charity the other 50% to the
              continuous development of the site
            </p>
          </div>
        </div>

      </section>

      {/* ── Footer ── */}
      <footer className="lp-footer">
        <div className="lp-footer-inner">

          <div className="lp-footer-brand">
            <img src="/Afroslang.png" alt="Afroslang" className="lp-footer-logo" />
            <span className="lp-footer-brand-name">Afro<em>slang</em></span>
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

          <div className="lp-footer-links-grid">

            <div className="lp-footer-col">
              <h4 className="lp-footer-col-title">Get to Know</h4>
              <ul className="lp-footer-list">
                <li><button className="lp-footer-link" onClick={() => setSheet('signup')}>About Afroslang</button></li>
                <li><button className="lp-footer-link" onClick={() => setShowOurStory(true)}>Our Story</button></li>
                <li><button className="lp-footer-link" onClick={() => setSheet('signup')}>The Team</button></li>
                <li><button className="lp-footer-link" onClick={() => setSheet('signup')}>Roadmap</button></li>
              </ul>
            </div>

            <div className="lp-footer-col">
              <h4 className="lp-footer-col-title">Did You Know</h4>
              <ul className="lp-footer-list">
                <li><span className="lp-footer-fact">Africa has over 2000 languages</span></li>
                <li><span className="lp-footer-fact">Swahili is spoken by 200M people</span></li>
                <li><span className="lp-footer-fact">Yoruba influenced languages in Brazil</span></li>
                <li><span className="lp-footer-fact">Amharic uses its own unique script</span></li>
              </ul>
            </div>

            <div className="lp-footer-col">
              <h4 className="lp-footer-col-title">Legalities</h4>
              <ul className="lp-footer-list">
                <li><button className="lp-footer-link">Terms of Service</button></li>
                <li><button className="lp-footer-link">Privacy Policy</button></li>
                <li><button className="lp-footer-link">Cookie Policy</button></li>
              </ul>
            </div>

            <div className="lp-footer-col">
              <h4 className="lp-footer-col-title">Sponsorships</h4>
              <ul className="lp-footer-list">
                <li><button className="lp-footer-link">Partner with Us</button></li>
                <li><button className="lp-footer-link">Charity Partners</button></li>
                <li><button className="lp-footer-link">Advertise</button></li>
                <li><button className="lp-footer-link">Contact Us</button></li>
              </ul>
            </div>

          </div>
        </div>

        <div className="lp-footer-bottom">
          <span>© 2025 Afroslang. Built with love for the diaspora.</span>
          <span className="lp-footer-bottom-right">50% of all payments go directly to African charities</span>
        </div>
      </footer>

      {/* ── Our Story modal ── */}
      {showOurStory && (
        <>
          <div className="our-story-backdrop" onClick={() => setShowOurStory(false)} />
          <div className="our-story-modal">
            <button className="our-story-close" onClick={() => setShowOurStory(false)} aria-label="Close">✕</button>
            <h2 className="our-story-title">Our Story</h2>
            <div className="our-story-body">
              <p className="our-story-owner">Owned by <strong>Sonoaac</strong></p>
              <p>
                Sonoaac is an Africa First Focus Group dedicated to building products that celebrate,
                preserve, and elevate African culture and identity across the globe.
              </p>
              <p>
                Its Founder originates from <strong>Imo Owerri, Nigeria</strong> — born in <strong>2004</strong> in Lagos.
                Afroslang was created from a personal mission: to ensure that descendants of the diaspora
                never lose connection with their ancestral tongues.
              </p>
            </div>
          </div>
        </>
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
                <div className="auth-sheet-divider"><span>or</span></div>
                <button
                  type="button"
                  className="auth-sheet-guest"
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

            {sheet === 'signup' && (
              <form onSubmit={handleSignup}>
                {signupError && <div className="auth-sheet-error">{signupError}</div>}
                <input className="auth-sheet-input" type="text"     placeholder="Full name"              value={signupName}     onChange={e => setSignupName(e.target.value)}     required autoComplete="name" />
                <input className="auth-sheet-input" type="email"    placeholder="Email address"          value={signupEmail}    onChange={e => setSignupEmail(e.target.value)}    required autoComplete="email" />
                <input className="auth-sheet-input" type="password" placeholder="Password (min 6 chars)" value={signupPassword} onChange={e => setSignupPassword(e.target.value)} required autoComplete="new-password" minLength={6} />
                <button className="auth-sheet-submit" type="submit" disabled={signupLoading}>
                  {signupLoading ? 'Creating account…' : 'Create Account'}
                </button>
                <div className="auth-sheet-divider"><span>or</span></div>
                <button
                  type="button"
                  className="auth-sheet-guest"
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
        </>
      )}
    </div>
  );
}
