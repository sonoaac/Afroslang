import { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import './LandingPage.css';

type SheetMode = 'login' | 'signup' | null;

interface LandingPageProps {
  initialSheet?: SheetMode;
}

const COUNTRY_FACTS = [
  {
    flag: '🇳🇬',
    name: 'Nigeria',
    fact: 'Home to over 500 languages making it the most linguistically diverse country on the entire continent. More tongues live within its borders than in all of Western Europe combined.',
  },
  {
    flag: '🇪🇹',
    name: 'Ethiopia',
    fact: 'One of only two African nations never colonised by a European power. Its legacy of sovereignty lit a flame that inspired independence movements across the whole continent.',
  },
  {
    flag: '🇿🇦',
    name: 'South Africa',
    fact: 'Home to 11 official languages the most of any single nation on Earth. Every tongue reflects a culture that was here long before borders were ever drawn.',
  },
  {
    flag: '🇪🇬',
    name: 'Egypt',
    fact: 'Home to the worlds oldest writing system with hieroglyphics dating back over 5000 years. Civilisation did not begin in Europe. It began here.',
  },
  {
    flag: '🇰🇪',
    name: 'Kenya',
    fact: 'Nairobi is known as the Silicon Savannah hosting hundreds of startups and standing as the undisputed tech capital of Africa with a growing global reach.',
  },
  {
    flag: '🇬🇭',
    name: 'Ghana',
    fact: 'The first sub Saharan African country to gain independence in 1957. That single act of sovereignty gave the entire continent the courage to rise.',
  },
  {
    flag: '🇹🇿',
    name: 'Tanzania',
    fact: 'Birthplace of Swahili now spoken by over 200 million people across the continent making it the most widely spoken Bantu language in the world.',
  },
];

export function LandingPage({ initialSheet }: LandingPageProps) {
  const { setGuestMode } = useAuth();

  const [sheet, setSheet] = useState<SheetMode>(initialSheet ?? null);

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

      {/* ── Header ── */}
      <header className="lp-header">
        <div className="lp-header-left">
          <img src="/Afroslang.png" alt="Afroslang" className="lp-logo" />
          <span className="lp-brand">Afro<em>slang</em></span>
        </div>
        <div className="lp-header-right">
          <button className="lp-btn-login"  onClick={() => setSheet('login')}>Log In</button>
          <button className="lp-btn-signup" onClick={() => setSheet('signup')}>Sign Up</button>
        </div>
      </header>

      {/* ── Stacked Hero ── */}
      <section className="lp-stack">

        {/* Top block: logo + title + tagline */}
        <div className="lp-stack-top">
          <div className="lp-stack-logo-wrap">
            <img src="/Afroslang.png" alt="Afroslang" className="lp-stack-logo" />
            <div className="lp-stack-logo-glow" />
          </div>
          <h1 className="lp-stack-title">Welcome to Afroslang</h1>
          <p className="lp-stack-tagline">Rekindle with your ancestral tongues</p>
          <div className="lp-stack-ctas">
            <button className="lp-btn-hero-primary" onClick={() => setSheet('signup')}>
              Get Started
            </button>
            <button className="lp-btn-hero-ghost" onClick={() => setGuestMode(true)}>
              Try as Guest
            </button>
          </div>
        </div>

        {/* Row 1: mission text left + lpimg1 right */}
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

        {/* Row 2: lpimg2 left + charity text right */}
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

      {/* ── 7 Countries ── */}
      <section className="lp-countries">
        <div className="lp-countries-header">
          <h2 className="lp-countries-title">The Continent We Celebrate</h2>
          <p className="lp-countries-sub">Seven nations. Seven stories. One lineage.</p>
        </div>
        <div className="lp-countries-grid">
          {COUNTRY_FACTS.map(c => (
            <div className="lp-country-card" key={c.name}>
              <span className="lp-country-flag">{c.flag}</span>
              <h3 className="lp-country-name">{c.name}</h3>
              <p className="lp-country-fact">{c.fact}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="lp-footer">
        <div className="lp-footer-inner">

          {/* Brand column */}
          <div className="lp-footer-brand">
            <img src="/Afroslang.png" alt="Afroslang" className="lp-footer-logo" />
            <span className="lp-footer-brand-name">Afro<em>slang</em></span>
            <p className="lp-footer-brand-desc">
              Gamified African language learning for the diaspora and everyone who wants to
              connect with the continent
            </p>
            <div className="lp-footer-socials">
              <a
                className="lp-social-link"
                href="https://www.tiktok.com"
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
                </svg>
                TikTok
              </a>
              <a
                className="lp-social-link"
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                </svg>
                Instagram
              </a>
              <a
                className="lp-social-link"
                href="https://www.twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X / Twitter"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                Twitter
              </a>
            </div>
          </div>

          {/* Links columns */}
          <div className="lp-footer-links-grid">

            <div className="lp-footer-col">
              <h4 className="lp-footer-col-title">Get to Know</h4>
              <ul className="lp-footer-list">
                <li><button className="lp-footer-link" onClick={() => setSheet('signup')}>About Afroslang</button></li>
                <li><button className="lp-footer-link" onClick={() => setSheet('signup')}>Our Story</button></li>
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
                <li><button className="lp-footer-link">Ownership</button></li>
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
