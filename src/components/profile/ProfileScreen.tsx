import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { AfricanLanguage, InterfaceLanguage, UserProgress } from '../../types';
import { getLanguageById } from '../../data/languages';
import './ProfileScreen.css';

interface ProfileScreenProps {
  userProgressMap: Record<string, UserProgress>;
  currentLanguage: AfricanLanguage | null;
  interfaceLanguage: InterfaceLanguage;
  onBack: () => void;
  onContinueLearning: (languageId: string) => void;
  onChangeInterfaceLanguage: (lang: InterfaceLanguage) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  userProgressMap,
  currentLanguage,
  interfaceLanguage,
  onBack,
  onContinueLearning,
  onChangeInterfaceLanguage,
}) => {
  const { user, userData, isGuest, logout } = useAuth();
  const [signingOut, setSigningOut] = useState(false);
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);

  const username = userData?.username || user?.displayName || (isGuest ? 'Guest' : 'User');
  const email    = userData?.email    || user?.email    || '';
  const initials = username.slice(0, 2).toUpperCase();

  const totalXP       = userData?.xp ?? 0;
  const totalLessons  = Object.values(userProgressMap).reduce((sum, p) => sum + (p.lessonsCompleted ?? 0), 0);
  const highestStreak = Object.values(userProgressMap).reduce((max, p) => Math.max(max, p.streak ?? 0), 0);
  const isPremium     = userData?.subscription?.active ?? false;

  // Languages with progress, most-recently-active first (most XP first as proxy)
  const activeLanguages = Object.entries(userProgressMap)
    .filter(([, p]) => (p.completedLessons?.length ?? 0) > 0)
    .sort(([, a], [, b]) => (b.xp ?? 0) - (a.xp ?? 0));

  const resumeLanguage = currentLanguage ?? (activeLanguages[0]?.[0] as AfricanLanguage | undefined) ?? null;
  const resumeProgress = resumeLanguage ? userProgressMap[resumeLanguage] : null;
  const resumeLangMeta = resumeLanguage ? getLanguageById(resumeLanguage) : null;

  const handleLogout = async () => {
    setSigningOut(true);
    await logout();
    setSigningOut(false);
  };

  return (
    <div className="ps-screen">
      {/* Header */}
      <header className="ps-header">
        <button className="ps-back-btn" onClick={onBack} aria-label="Go back">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>
        <h1 className="ps-title">Profile</h1>
        <div className="ps-header-spacer" />
      </header>

      <div className="ps-body">

        {/* Avatar + identity */}
        <div className="ps-identity">
          <div className="ps-avatar">
            <span className="ps-avatar-initials">{initials}</span>
            {isPremium && <span className="ps-avatar-crown" aria-label="Premium">👑</span>}
          </div>
          <h2 className="ps-username">{username}</h2>
          {email && <p className="ps-email">{email}</p>}
          <span className={`ps-badge ${isPremium ? 'ps-badge--premium' : 'ps-badge--free'}`}>
            {isPremium ? 'Plus Member' : isGuest ? 'Guest' : 'Free'}
          </span>
        </div>

        {/* Stats */}
        <div className="ps-stats">
          <div className="ps-stat">
            <span className="ps-stat-value">{totalXP.toLocaleString()}</span>
            <span className="ps-stat-label">Total XP</span>
          </div>
          <div className="ps-stat-divider" />
          <div className="ps-stat">
            <span className="ps-stat-value">{highestStreak}</span>
            <span className="ps-stat-label">Day Streak</span>
          </div>
          <div className="ps-stat-divider" />
          <div className="ps-stat">
            <span className="ps-stat-value">{totalLessons}</span>
            <span className="ps-stat-label">Lessons</span>
          </div>
        </div>

        {/* Continue Learning */}
        {resumeLanguage && resumeProgress && (
          <div className="ps-section">
            <h3 className="ps-section-title">Continue Learning</h3>
            <button
              className="ps-continue-card"
              onClick={() => onContinueLearning(resumeLanguage)}
            >
              <div className="ps-continue-card-left">
                <span className="ps-continue-flag">🌍</span>
                <div className="ps-continue-info">
                  <span className="ps-continue-lang">{resumeLangMeta?.name ?? resumeLanguage}</span>
                  <span className="ps-continue-meta">
                    Level {resumeProgress.level ?? 1} · {(resumeProgress.xp ?? 0).toLocaleString()} XP · {resumeProgress.completedLessons?.length ?? 0} lessons done
                  </span>
                </div>
              </div>
              <svg className="ps-continue-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

        {/* All languages with progress */}
        {activeLanguages.length > 1 && (
          <div className="ps-section">
            <h3 className="ps-section-title">My Languages</h3>
            <div className="ps-lang-list">
              {activeLanguages.map(([langId, prog]) => {
                const meta = getLanguageById(langId as AfricanLanguage);
                return (
                  <button
                    key={langId}
                    className="ps-lang-row"
                    onClick={() => onContinueLearning(langId)}
                  >
                    <span className="ps-lang-name">{meta?.name ?? langId}</span>
                    <span className="ps-lang-xp">{(prog.xp ?? 0).toLocaleString()} XP</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Settings */}
        <div className="ps-section">
          <h3 className="ps-section-title">Settings</h3>
          <div className="ps-settings-list">

            {/* Interface language toggle */}
            <div className="ps-setting-row">
              <span className="ps-setting-label">Interface Language</span>
              <div className="ps-lang-toggle">
                <button
                  className={`ps-lang-toggle-btn${interfaceLanguage === 'en' ? ' ps-lang-toggle-btn--active' : ''}`}
                  onClick={() => onChangeInterfaceLanguage('en')}
                >EN</button>
                <button
                  className={`ps-lang-toggle-btn${interfaceLanguage === 'fr' ? ' ps-lang-toggle-btn--active' : ''}`}
                  onClick={() => onChangeInterfaceLanguage('fr')}
                >FR</button>
              </div>
            </div>

            <div className="ps-setting-row ps-setting-row--link">
              <span className="ps-setting-label">Privacy Policy</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </div>

            <div className="ps-setting-row ps-setting-row--link">
              <span className="ps-setting-label">Terms of Service</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </div>

          </div>
        </div>

        {/* Sign out */}
        <div className="ps-section ps-section--danger">
          {!showConfirmLogout ? (
            <button
              className="ps-signout-btn"
              onClick={() => setShowConfirmLogout(true)}
              disabled={signingOut}
            >
              Sign Out
            </button>
          ) : (
            <div className="ps-confirm-logout">
              <p className="ps-confirm-text">Are you sure you want to sign out?</p>
              <div className="ps-confirm-row">
                <button className="ps-confirm-cancel" onClick={() => setShowConfirmLogout(false)}>
                  Cancel
                </button>
                <button className="ps-confirm-yes" onClick={handleLogout} disabled={signingOut}>
                  {signingOut ? 'Signing out…' : 'Yes, Sign Out'}
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
