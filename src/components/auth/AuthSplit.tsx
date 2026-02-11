import React, { useMemo, useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import './AuthSplit.css';
import { AfroslangSignature } from './AfroslangSignature';

type AuthMode = 'login' | 'signup';

interface AuthSplitProps {
  initialMode?: AuthMode;
  onSuccess?: () => void;
  onGuestMode?: () => void;
  hideGuestMode?: boolean;
}

export const AuthSplit: React.FC<AuthSplitProps> = ({
  initialMode = 'login',
  onSuccess,
  onGuestMode,
  hideGuestMode = false,
}) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState('');

  const [fullName, setFullName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupLoading, setSignupLoading] = useState(false);
  const [signupError, setSignupError] = useState('');

  const showLogin = mode === 'login';

  const backboxLoginMsgClass = useMemo(() => {
    return `authSplitLoginMsg ${showLogin ? '' : 'authSplitVisibility'}`.trim();
  }, [showLogin]);

  const backboxSignupMsgClass = useMemo(() => {
    return `authSplitSignupMsg ${showLogin ? 'authSplitVisibility' : ''}`.trim();
  }, [showLogin]);

  const frontboxClass = useMemo(() => {
    return `authSplitFrontbox ${showLogin ? '' : 'authSplitMoving'}`.trim();
  }, [showLogin]);

  const handleSwitchToSignup = () => {
    setLoginError('');
    setLoginSuccess('');
    setMode('signup');
  };

  const handleSwitchToLogin = () => {
    setSignupError('');
    setMode('login');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');
    setLoginSuccess('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      console.log('Logged in:', userCredential.user.uid);
      onSuccess?.();
    } catch (error: any) {
      setLoginError(error?.message || 'Login failed.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setLoginError('');
    setLoginSuccess('');
    if (!loginEmail) {
      setLoginError('Enter your email first.');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, loginEmail);
      setLoginSuccess('Password reset email sent.');
    } catch (error: any) {
      setLoginError(error?.message || 'Could not send reset email.');
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupLoading(true);
    setSignupError('');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, signupEmail, signupPassword);
      const user = userCredential.user;
      console.log('User created successfully:', user.uid);

      await setDoc(doc(db, 'users', user.uid), {
        username: fullName,
        email: signupEmail,
        hearts: 5,
        xp: 0,
        subscription: { active: false, plan: null },
        createdAt: new Date().toISOString(),
        languages: {},
      });

      onSuccess?.();
    } catch (error: any) {
      if (error?.code === 'auth/configuration-not-found') {
        setSignupError('Firebase configuration not found. Please check your Firebase project settings.');
      } else if (error?.code === 'auth/email-already-in-use') {
        setSignupError('This email is already registered. Please try logging in instead.');
      } else if (error?.code === 'auth/weak-password') {
        setSignupError('Password should be at least 6 characters long.');
      } else if (error?.code === 'auth/invalid-email') {
        setSignupError('Please enter a valid email address.');
      } else {
        setSignupError(error?.message || 'An error occurred during signup. Please try again.');
      }
    } finally {
      setSignupLoading(false);
    }
  };

  return (
    <div className="authSplitPage">
      <div className="authSplitBrand">
        <AfroslangSignature />
      </div>
      <div className="authSplitContainer">
        <div className="authSplitBackbox">
          <div className={backboxLoginMsgClass}>
            <div className="authSplitTextContent">
              <p className="authSplitTitle">Don't have an account?</p>
              <p>Sign up to save all your graph.</p>
              <button type="button" className="authSplitSwitchBtn" onClick={handleSwitchToSignup}>
                Sign Up
              </button>
            </div>
          </div>

          <div className={backboxSignupMsgClass}>
            <div className="authSplitTextContent">
              <p className="authSplitTitle">Have an account?</p>
              <p>Log in to see all your collection.</p>
              <button type="button" className="authSplitSwitchBtn" onClick={handleSwitchToLogin}>
                LOG IN
              </button>
            </div>
          </div>
        </div>

        <div className={frontboxClass}>
          <div className={`authSplitLogin ${showLogin ? '' : 'authSplitHide'}`.trim()}>
            <h2>LOG IN</h2>
            <form onSubmit={handleLogin}>
              <div className="authSplitInputbox">
                <input
                  className="authSplitInput"
                  type="email"
                  name="email"
                  placeholder="  EMAIL"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
                <input
                  className="authSplitInput"
                  type="password"
                  name="password"
                  placeholder="  PASSWORD"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </div>

              <p className="authSplitForgot" onClick={handleForgotPassword}>
                FORGET PASSWORD?
              </p>

              {loginError && <div className="authSplitError">{loginError}</div>}
              {loginSuccess && <div className="authSplitSuccess">{loginSuccess}</div>}

              {!hideGuestMode && onGuestMode && (
                <p className="authSplitForgot" style={{ marginTop: 8 }} onClick={onGuestMode}>
                  CONTINUE AS GUEST
                </p>
              )}

              <button className="authSplitSubmitBtn" type="submit" disabled={loginLoading}>
                {loginLoading ? '...' : 'LOG IN'}
              </button>
            </form>
          </div>

          <div className={`authSplitSignup ${showLogin ? 'authSplitHide' : ''}`.trim()}>
            <h2>SIGN UP</h2>
            <form onSubmit={handleSignup}>
              <div className="authSplitInputbox">
                <input
                  className="authSplitInput"
                  type="text"
                  name="fullname"
                  placeholder="  FULLNAME"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
                <input
                  className="authSplitInput"
                  type="email"
                  name="email"
                  placeholder="  EMAIL"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  required
                />
                <input
                  className="authSplitInput"
                  type="password"
                  name="password"
                  placeholder="  PASSWORD"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  required
                />
              </div>

              {signupError && <div className="authSplitError">{signupError}</div>}

              <button className="authSplitSubmitBtn" type="submit" disabled={signupLoading}>
                {signupLoading ? '...' : 'SIGN UP'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
