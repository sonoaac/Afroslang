import { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import { RainCanvas } from '../rain/RainCanvas';
import './LandingPage.css';

type SheetMode = 'login' | 'signup' | null;

export function LandingPage() {
  const { setGuestMode } = useAuth();
  const [sheet, setSheet] = useState<SheetMode>(null);
  const [logoError, setLogoError] = useState(false);

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

  return (
    <div className="landing-page">
      {/* Rain canvas behind everything */}
      <RainCanvas intensity="heavy" />

      {/* Hero: mascot + title */}
      <div className="landing-hero">
        {logoError ? (
          <span style={{ fontSize: '5rem' }}>🐦</span>
        ) : (
          <img
            className="landing-mascot"
            src="/Afroslang.png"
            alt="Afroslang mascot"
            onError={() => setLogoError(true)}
            draggable={false}
          />
        )}
        <h1 className="landing-title">
          Afro<span>slang</span>
        </h1>
        <p className="landing-tagline">African Language Learning</p>
      </div>

      {/* Bottom CTA panel */}
      <div className="landing-bottom">
        <button className="landing-btn-primary" onClick={() => setSheet('signup')}>
          Get Started — Sign Up
        </button>
        <button className="landing-btn-secondary" onClick={() => setSheet('login')}>
          Log In
        </button>
        <button className="landing-btn-guest" onClick={() => setGuestMode(true)}>
          Continue as Guest
        </button>
      </div>

      {/* Auth bottom sheet */}
      {sheet && (
        <>
          <div className="auth-sheet-backdrop" onClick={closeSheet} />
          <div className="auth-sheet">
            <div className="auth-sheet-handle" />

            {/* Tab switcher */}
            <div className="auth-sheet-tabs">
              <button
                className={`auth-sheet-tab${sheet === 'login' ? ' auth-sheet-tab--active' : ''}`}
                onClick={() => { setSheet('login'); setSignupError(''); setLoginError(''); setLoginSuccess(''); }}
              >
                Log In
              </button>
              <button
                className={`auth-sheet-tab${sheet === 'signup' ? ' auth-sheet-tab--active' : ''}`}
                onClick={() => { setSheet('signup'); setLoginError(''); setLoginSuccess(''); setSignupError(''); }}
              >
                Sign Up
              </button>
            </div>

            {/* Login form */}
            {sheet === 'login' && (
              <form onSubmit={handleLogin}>
                {loginError   && <div className="auth-sheet-error">{loginError}</div>}
                {loginSuccess && <div className="auth-sheet-success">{loginSuccess}</div>}
                <input
                  className="auth-sheet-input"
                  type="email"
                  placeholder="Email address"
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
                <input
                  className="auth-sheet-input"
                  type="password"
                  placeholder="Password"
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <button className="auth-sheet-submit" type="submit" disabled={loginLoading}>
                  {loginLoading ? 'Logging in…' : 'Log In'}
                </button>
                <button type="button" className="auth-sheet-forgot" onClick={handleForgotPassword}>
                  Forgot password?
                </button>
              </form>
            )}

            {/* Signup form */}
            {sheet === 'signup' && (
              <form onSubmit={handleSignup}>
                {signupError && <div className="auth-sheet-error">{signupError}</div>}
                <input
                  className="auth-sheet-input"
                  type="text"
                  placeholder="Full name"
                  value={signupName}
                  onChange={e => setSignupName(e.target.value)}
                  required
                  autoComplete="name"
                />
                <input
                  className="auth-sheet-input"
                  type="email"
                  placeholder="Email address"
                  value={signupEmail}
                  onChange={e => setSignupEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
                <input
                  className="auth-sheet-input"
                  type="password"
                  placeholder="Password (min 6 chars)"
                  value={signupPassword}
                  onChange={e => setSignupPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  minLength={6}
                />
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
