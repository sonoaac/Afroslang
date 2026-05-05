import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { AfricanLanguage, InterfaceLanguage, UserProgress } from '../../types';
import { getLanguageById } from '../../data/languages';
import { AVATARS, BACKGROUNDS } from '../../utils/currencyUtils';
import './ProfileScreen.css';

interface ProfileScreenProps {
  userProgressMap: Record<string, UserProgress>;
  currentLanguage: AfricanLanguage | null;
  interfaceLanguage: InterfaceLanguage;
  onBack: () => void;
  onContinueLearning: (languageId: string) => void;
  onChangeInterfaceLanguage: (lang: InterfaceLanguage) => void;
  onGoToShop?: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  userProgressMap,
  currentLanguage,
  interfaceLanguage,
  onBack,
  onContinueLearning,
  onChangeInterfaceLanguage,
  onGoToShop,
}) => {
  const { user, userData, isGuest, logout, equipItem } = useAuth();
  const [signingOut, setSigningOut] = useState(false);
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);
  const [equipping, setEquipping] = useState<string | null>(null);

  const isEn = interfaceLanguage === 'en';
  const username   = userData?.username || (user?.user_metadata?.full_name as string | undefined) || (isGuest ? (isEn ? 'Guest' : 'Invité') : 'User');
  const email      = userData?.email    || user?.email    || '';
  const initials   = username.slice(0, 2).toUpperCase();
  const isPremium  = userData?.subscription?.active ?? false;

  const equippedAvatarId = userData?.equippedAvatar ?? 'avatar_default';
  const equippedBgId     = userData?.equippedBackground ?? 'bg_default';
  const ownedAvatars     = userData?.ownedAvatars     ?? ['avatar_default'];
  const ownedBackgrounds = userData?.ownedBackgrounds ?? ['bg_default'];

  const equippedAvatarItem = AVATARS.find(a => a.id === equippedAvatarId) ?? AVATARS[0];

  const totalXP       = userData?.xp ?? 0;
  const totalLessons  = Object.values(userProgressMap).reduce((sum, p) => sum + (p.lessonsCompleted ?? 0), 0);
  const highestStreak = Object.values(userProgressMap).reduce((max, p) => Math.max(max, p.streak ?? 0), 0);

  const activeLanguages = Object.entries(userProgressMap)
    .filter(([, p]) => (p.completedLessons?.length ?? 0) > 0)
    .sort(([, a], [, b]) => (b.xp ?? 0) - (a.xp ?? 0));

  const resumeLanguage = currentLanguage ?? (activeLanguages[0]?.[0] as AfricanLanguage | undefined) ?? null;
  const resumeProgress = resumeLanguage ? userProgressMap[resumeLanguage] : null;
  const resumeLangMeta = resumeLanguage ? getLanguageById(resumeLanguage) : null;

  const handleEquip = async (itemId: string, type: 'avatar' | 'background') => {
    if (isGuest || !user) return;
    const ownedList = type === 'avatar' ? ownedAvatars : ownedBackgrounds;
    const avatarMeta = type === 'avatar' ? AVATARS.find(a => a.id === itemId) : null;
    const isPlusOwned = avatarMeta?.plusOnly && isPremium;
    if (!ownedList.includes(itemId) && !isPlusOwned) { onGoToShop?.(); return; }
    setEquipping(itemId);
    await equipItem(itemId, type);
    setEquipping(null);
  };

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
        <h1 className="ps-title">{isEn ? 'Profile' : 'Profil'}</h1>
        <div className="ps-header-spacer" />
      </header>

      <div className="ps-body">

        {/* Avatar + identity */}
        <div className="ps-identity">
          <div className="ps-avatar">
            {equippedAvatarItem.image
              ? <img src={equippedAvatarItem.image} alt={equippedAvatarItem.name} className="ps-avatar-img" />
              : equippedAvatarItem.id === 'avatar_default'
                ? <span className="ps-avatar-initials">{initials}</span>
                : <span className="ps-avatar-emoji">{equippedAvatarItem.emoji}</span>
            }
            {isPremium && <span className="ps-avatar-crown" aria-label="Premium">👑</span>}
          </div>
          <h2 className="ps-username">{username}</h2>
          {email && <p className="ps-email">{email}</p>}
          <span className={`ps-badge ${isPremium ? 'ps-badge--premium' : 'ps-badge--free'}`}>
            {isPremium ? (isEn ? 'Plus Member' : 'Membre Plus') : isGuest ? (isEn ? 'Guest' : 'Invité') : (isEn ? 'Free' : 'Gratuit')}
          </span>
        </div>

        {/* Stats */}
        <div className="ps-stats">
          <div className="ps-stat">
            <span className="ps-stat-value">{totalXP.toLocaleString()}</span>
            <span className="ps-stat-label">{isEn ? 'Total XP' : 'XP Total'}</span>
          </div>
          <div className="ps-stat-divider" />
          <div className="ps-stat">
            <span className="ps-stat-value">{highestStreak}</span>
            <span className="ps-stat-label">{isEn ? 'Day Streak' : 'Série'}</span>
          </div>
          <div className="ps-stat-divider" />
          <div className="ps-stat">
            <span className="ps-stat-value">{totalLessons}</span>
            <span className="ps-stat-label">{isEn ? 'Lessons' : 'Leçons'}</span>
          </div>
        </div>

        {/* Avatar customisation */}
        {!isGuest && (
          <div className="ps-section">
            <h3 className="ps-section-title">{isEn ? 'Avatar' : 'Avatar'}</h3>
            <div className="ps-cosmetic-grid">
              {AVATARS.map(avatar => {
                const owned    = ownedAvatars.includes(avatar.id) || (avatar.plusOnly && isPremium);
                const equipped = equippedAvatarId === avatar.id;
                const busy     = equipping === avatar.id;
                const lockTitle = avatar.plusOnly ? `${avatar.name} — AfroPlus` : `${avatar.name} — ${avatar.price} SB`;
                return (
                  <button
                    key={avatar.id}
                    className={`ps-cosmetic-item${equipped ? ' ps-cosmetic-item--equipped' : ''}${!owned ? ' ps-cosmetic-item--locked' : ''}`}
                    onClick={() => handleEquip(avatar.id, 'avatar')}
                    disabled={busy}
                    title={owned ? avatar.name : lockTitle}
                  >
                    {avatar.image
                      ? <img src={avatar.image} alt={avatar.name} className="ps-cosmetic-img" />
                      : <span className="ps-cosmetic-emoji">{avatar.emoji}</span>
                    }
                    <span className="ps-cosmetic-name">{avatar.name}</span>
                    {equipped && <span className="ps-cosmetic-check">✓</span>}
                    {!owned && <span className="ps-cosmetic-lock">{avatar.plusOnly ? '⭐' : '🔒'}</span>}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Background customisation */}
        {!isGuest && (
          <div className="ps-section">
            <h3 className="ps-section-title">{isEn ? 'Background' : 'Arrière-plan'}</h3>
            <div className="ps-cosmetic-grid">
              {BACKGROUNDS.map(bg => {
                const owned    = ownedBackgrounds.includes(bg.id);
                const equipped = equippedBgId === bg.id;
                const busy     = equipping === bg.id;
                return (
                  <button
                    key={bg.id}
                    className={`ps-cosmetic-item${equipped ? ' ps-cosmetic-item--equipped' : ''}${!owned ? ' ps-cosmetic-item--locked' : ''}`}
                    onClick={() => handleEquip(bg.id, 'background')}
                    disabled={busy}
                    title={owned ? bg.name : `${bg.name} — ${bg.price} SB`}
                  >
                    <span className="ps-cosmetic-emoji">{bg.emoji}</span>
                    <span className="ps-cosmetic-name">{bg.name}</span>
                    {equipped && <span className="ps-cosmetic-check">✓</span>}
                    {!owned && <span className="ps-cosmetic-lock">🔒</span>}
                  </button>
                );
              })}
            </div>
            {!isGuest && (
              <p className="ps-cosmetic-hint">
                {isEn ? 'Locked items can be purchased in the' : 'Les éléments verrouillés peuvent être achetés dans la'}{' '}
                <button className="ps-cosmetic-shop-link" onClick={onGoToShop}>{isEn ? 'Shop' : 'Boutique'}</button>
              </p>
            )}
          </div>
        )}

        {/* Continue Learning */}
        {resumeLanguage && resumeProgress && (
          <div className="ps-section">
            <h3 className="ps-section-title">{isEn ? 'Continue Learning' : 'Continuer à apprendre'}</h3>
            <button
              className="ps-continue-card"
              onClick={() => onContinueLearning(resumeLanguage)}
            >
              <div className="ps-continue-card-left">
                <span className="ps-continue-flag">🌍</span>
                <div className="ps-continue-info">
                  <span className="ps-continue-lang">{resumeLangMeta?.name ?? resumeLanguage}</span>
                  <span className="ps-continue-meta">
                    {isEn ? 'Level' : 'Niveau'} {resumeProgress.level ?? 1} · {(resumeProgress.xp ?? 0).toLocaleString()} XP · {resumeProgress.completedLessons?.length ?? 0} {isEn ? 'lessons done' : 'leçons terminées'}
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
            <h3 className="ps-section-title">{isEn ? 'My Languages' : 'Mes Langues'}</h3>
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
          <h3 className="ps-section-title">{isEn ? 'Settings' : 'Paramètres'}</h3>
          <div className="ps-settings-list">
            <div className="ps-setting-row">
              <span className="ps-setting-label">{isEn ? 'Interface Language' : 'Langue de l\'interface'}</span>
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
              <span className="ps-setting-label">{isEn ? 'Privacy Policy' : 'Politique de confidentialité'}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </div>
            <div className="ps-setting-row ps-setting-row--link">
              <span className="ps-setting-label">{isEn ? 'Terms of Service' : 'Conditions d\'utilisation'}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </div>
          </div>
        </div>

        {/* Sign out */}
        <div className="ps-section ps-section--danger">
          {!showConfirmLogout ? (
            <button className="ps-signout-btn" onClick={() => setShowConfirmLogout(true)} disabled={signingOut}>
              {isEn ? 'Sign Out' : 'Se déconnecter'}
            </button>
          ) : (
            <div className="ps-confirm-logout">
              <p className="ps-confirm-text">{isEn ? 'Are you sure you want to sign out?' : 'Voulez-vous vraiment vous déconnecter ?'}</p>
              <div className="ps-confirm-row">
                <button className="ps-confirm-cancel" onClick={() => setShowConfirmLogout(false)}>{isEn ? 'Cancel' : 'Annuler'}</button>
                <button className="ps-confirm-yes" onClick={handleLogout} disabled={signingOut}>
                  {signingOut ? (isEn ? 'Signing out…' : 'Déconnexion…') : (isEn ? 'Yes, Sign Out' : 'Oui, se déconnecter')}
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
