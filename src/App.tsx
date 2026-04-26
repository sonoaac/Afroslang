import { useState, useEffect, useCallback, useRef } from 'react';
import { Routes, Route, Navigate, useNavigate, useParams } from 'react-router-dom';
import { InterfaceLanguage, AfricanLanguage, UserProgress, Lesson } from './types';
import { LandingPage } from './components/landing/LandingPage';
import { GlCanvas } from './components/landing/GlCanvas';
import { SavannaCanvas } from './components/landing/SavannaCanvas';
import { CloudyCanvas } from './components/landing/CloudyCanvas';

import { LearningPath } from './features/lessons/LearningPath';
import { LessonScreen } from './features/lessons/LessonScreen';
import { LessonComplete } from './features/lessons/LessonComplete';
import { LeaderboardScreen } from './components/leaderboard/LeaderboardScreen';
import { SubscriptionPage } from './components/subscription/SubscriptionPage';
import { SuccessPage } from './components/subscription/SuccessPage';
import { FeedbackPage } from './components/feedback/FeedbackPage';
import { LatestNews } from './components/layout/LatestNews';
import { ShopScreen } from './features/store/ShopScreen';
import { ProfileScreen } from './components/profile/ProfileScreen';

import { useAuth } from './contexts/AuthContext';
import { getLanguageById } from './data/languages';
import { getStagesForLanguage } from './data/lessons';
import { saveUserProgress } from './utils/userData';
import { addWeeklyXP, getCurrentWeekIdFromDB, getUserLeague } from './utils/leaderboardUtils';
import { isXpBoostActive, getBackgroundStyle } from './utils/currencyUtils';

// ── Shared types ─────────────────────────────────────────────────────────────
const VALID_LANGS: AfricanLanguage[] = [
  'swahili','hausa','yoruba','igbo','zulu','amharic','arabic','shona',
  'somali','berber','moore','lingala','twi','chichewa','wolof'
];

// Primary country slug for each language — used to build the URL
const LANG_COUNTRY: Record<AfricanLanguage, string> = {
  igbo:     'nigeria',
  yoruba:   'nigeria',
  hausa:    'nigeria',
  amharic:  'ethiopia',
  somali:   'somalia',
  arabic:   'egypt',
  swahili:  'tanzania',
  zulu:     'south-africa',
  twi:      'ghana',
  wolof:    'senegal',
  moore:    'burkina-faso',
  lingala:  'dr-congo',
  shona:    'zimbabwe',
  chichewa: 'malawi',
  berber:   'morocco',
};

const langUrl = (lang: AfricanLanguage) => `/${LANG_COUNTRY[lang]}/${lang}`;

function createDefaultProgress(lang: AfricanLanguage): UserProgress {
  return {
    languageId: lang, xp: 0, level: 1, hearts: 5, heartsResetTime: null,
    streak: 0, lastPracticeDate: null, streakDays: [], lessonsCompleted: 0,
    wordsLearned: 0, mistakeCount: 0, completedLessons: [], currentStage: 1
  };
}

// ── LearnView — manages path / lesson / complete sub-screens ─────────────────
interface LearnViewProps {
  interfaceLanguage: InterfaceLanguage;
  userProgressMap: Record<string, UserProgress>;
  setUserProgressMap: React.Dispatch<React.SetStateAction<Record<string, UserProgress>>>;
  userData: any;
  user: any;
  isGuest: boolean;
  onBackToLanding: () => void;
  onNavigate: (screen: string) => void;
  onGoToSignUp: () => void;
  onGoToSubscription: () => void;
  onSetCurrentLanguage: (lang: AfricanLanguage) => void;
}

function LearnView({
  interfaceLanguage, userProgressMap, setUserProgressMap,
  userData, user, isGuest,
  onBackToLanding, onNavigate, onGoToSignUp, onGoToSubscription,
  onSetCurrentLanguage,
}: LearnViewProps) {
  const { lang } = useParams<{ country: string; lang: string }>();
  const language = lang as AfricanLanguage;

  const [subScreen, setSubScreen] = useState<'path' | 'lesson' | 'complete'>('path');
  const [activeLesson, setActiveLesson]   = useState<Lesson | null>(null);
  const [lastCompletedXP, setLastCompletedXP] = useState(0);

  useEffect(() => {
    onSetCurrentLanguage(language);
    // Ensure progress entry exists
    setUserProgressMap(prev =>
      prev[language] ? prev : { ...prev, [language]: createDefaultProgress(language) }
    );
    setSubScreen('path');
  }, [language]); // eslint-disable-line react-hooks/exhaustive-deps

  const getCurrentProgress = (): UserProgress => {
    const unlimitedHearts = userData?.subscription?.active ? 999 : 5;
    const progress = userProgressMap[language];
    if (!progress) return { ...createDefaultProgress(language), hearts: unlimitedHearts };
    return { ...progress, hearts: unlimitedHearts };
  };

  const handleStartLesson = (lesson: Lesson) => {
    if (!lesson?.exercises?.length) return;
    setActiveLesson(lesson);
    setSubScreen('lesson');
  };

  const handleLessonComplete = async (xpEarned: number, heartsLost: number, heartsGained: number) => {
    if (!language || !activeLesson) return;
    setLastCompletedXP(xpEarned);

    if (user && !isGuest) {
      await saveUserProgress(user.uid, language, activeLesson.id, xpEarned, heartsLost);
      try {
        const weekId = await getCurrentWeekIdFromDB();
        const userLeague = await getUserLeague(user.uid, weekId);
        await addWeeklyXP(
          user.uid, userLeague || 'Copper',
          userData?.username || 'User', xpEarned,
          userData?.subscription?.active || false, weekId
        );
      } catch {}
    }

    setUserProgressMap(prev => {
      const current = prev[language] || createDefaultProgress(language);
      const shouldCountXP = user && !isGuest;
      const newXp    = shouldCountXP ? current.xp + xpEarned : current.xp;
      const newLevel = shouldCountXP ? Math.floor(newXp / 100) + 1 : current.level;

      let newHearts    = Math.min(5, current.hearts - heartsLost + heartsGained);
      let newResetTime = current.heartsResetTime;
      if (newHearts === 0) newResetTime = Date.now() + 7 * 60 * 60 * 1000;
      else if (newHearts > 0 && current.heartsResetTime) newResetTime = null;

      const today = new Date();
      const todayStr = today.toDateString();
      const todayDay = today.getDate();
      const todayMonth = today.getMonth();
      const todayYear  = today.getFullYear();
      const lastDate   = current.lastPracticeDate;
      let newStreak  = shouldCountXP ? current.streak : 0;
      let streakDays = shouldCountXP ? (current.streakDays || []) : [];

      if (shouldCountXP && (!lastDate || lastDate !== todayStr)) {
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        if (lastDate === yesterday.toDateString()) {
          newStreak += 1;
        } else if (!lastDate) {
          newStreak = 1;
        } else {
          newStreak = 1;
          const lastDateObj = new Date(lastDate);
          if (lastDateObj.getMonth() !== todayMonth || lastDateObj.getFullYear() !== todayYear) {
            streakDays = [];
          }
        }
        if (todayMonth === new Date().getMonth() && todayYear === new Date().getFullYear()
            && !streakDays.includes(todayDay)) {
          streakDays = [...streakDays, todayDay].sort((a, b) => a - b);
        }
      }

      const completedLessons = (current.completedLessons || []).includes(activeLesson.id)
        ? current.completedLessons
        : [...(current.completedLessons || []), activeLesson.id];

      return {
        ...prev,
        [language]: {
          ...current, xp: newXp, level: newLevel, hearts: newHearts,
          heartsResetTime: newResetTime, streak: newStreak,
          lastPracticeDate: shouldCountXP ? todayStr : current.lastPracticeDate,
          streakDays, lessonsCompleted: current.lessonsCompleted + 1,
          wordsLearned: current.wordsLearned + 3,
          mistakeCount: heartsLost > 0 ? current.mistakeCount + heartsLost : current.mistakeCount,
          completedLessons
        }
      };
    });

    setSubScreen('complete');
  };

  if (subScreen === 'lesson' && activeLesson) {
    return (
      <LessonScreen
        interfaceLanguage={interfaceLanguage}
        lesson={activeLesson}
        languageId={language}
        languageName={getLanguageById(language)?.name || ''}
        hearts={getCurrentProgress().hearts}
        heartsData={userData?.heartsData}
        isSubscribed={userData?.subscription?.active || false}
        xpBoostActive={isXpBoostActive(userData)}
        userId={user?.uid}
        userName={userData?.name || user?.displayName || undefined}
        isGuest={isGuest}
        onComplete={handleLessonComplete}
        onExit={() => setSubScreen('path')}
        onBackToLanguageSelect={onBackToLanding}
        onGoToSignUp={onGoToSignUp}
        onGoToSubscription={onGoToSubscription}
      />
    );
  }

  if (subScreen === 'complete') {
    return (
      <LessonComplete
        interfaceLanguage={interfaceLanguage}
        xpEarned={lastCompletedXP}
        onContinue={() => setSubScreen('path')}
        onBackToLanguageSelect={onBackToLanding}
      />
    );
  }

  return (
    <LearningPath
      interfaceLanguage={interfaceLanguage}
      stages={getStagesForLanguage(language)}
      progress={getCurrentProgress()}
      onStartLesson={handleStartLesson}
      onBackToLanguageSelect={onBackToLanding}
      onNavigate={onNavigate}
      currentLanguageId={language}
    />
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
function App() {
  const navigate = useNavigate();
  const { user, userData, isGuest, loading, logout, setGuestMode } = useAuth();

  const [authSheet, setAuthSheet]           = useState<'login' | 'signup' | null>(null);
  const [preSelectedLanguage, setPreSelectedLanguage] = useState<string | null>(null);
  const [interfaceLanguage, setInterfaceLanguage]     = useState<InterfaceLanguage>('en');
  const [currentLanguage, setCurrentLanguage]         = useState<AfricanLanguage | null>(null);
  const [userProgressMap, setUserProgressMap]         = useState<Record<string, UserProgress>>({});

  const wasAuthOnLoad   = useRef<boolean | null>(null);
  const paymentSuccess  = new URLSearchParams(window.location.search).has('payment_success');

  // Unused — satisfies useCallback lint
  const handleIntroComplete = useCallback(() => {}, []);
  void handleIntroComplete;

  // ── Load from localStorage ────────────────────────────────────────────────
  useEffect(() => {
    const savedInterface = localStorage.getItem('afroslang_interface');
    const savedProgress  = localStorage.getItem('afroslang_progress');

    if (savedInterface) setInterfaceLanguage(savedInterface as InterfaceLanguage);

    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      Object.keys(progress).forEach(langId => {
        const p = progress[langId];
        if (!p.completedLessons) p.completedLessons = [];
        if (p.heartsResetTime && Date.now() >= p.heartsResetTime) {
          p.hearts = 5; p.heartsResetTime = null;
        }
      });
      setUserProgressMap(progress);
    }

    localStorage.removeItem('afroslang_current_language');

    // Pre-select language from URL: /:country/:lang or /learn/:lang (legacy)
    const path = window.location.pathname;
    const countryLangMatch = path.match(/^\/[a-z-]+\/([a-z]+)$/);
    const learnMatch = path.match(/^\/learn\/([a-z]+)/);
    const legacyMatch = path.match(/^\/([a-z]+)$/);
    const urlLang = (countryLangMatch?.[1] ?? learnMatch?.[1] ?? legacyMatch?.[1] ?? '') as AfricanLanguage;
    if (VALID_LANGS.includes(urlLang)) {
      setPreSelectedLanguage(urlLang);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Persist to localStorage ───────────────────────────────────────────────
  useEffect(() => {
    if (Object.keys(userProgressMap).length > 0)
      localStorage.setItem('afroslang_progress', JSON.stringify(userProgressMap));
  }, [userProgressMap]);

  useEffect(() => {
    localStorage.setItem('afroslang_interface', interfaceLanguage);
  }, [interfaceLanguage]);

  // ── Record whether user was already authed on load ────────────────────────
  useEffect(() => {
    if (!loading && wasAuthOnLoad.current === null)
      wasAuthOnLoad.current = !!(user || isGuest);
  }, [loading, user, isGuest]);

  // ── Auth state → navigate ─────────────────────────────────────────────────
  useEffect(() => {
    if (loading || !(user || isGuest)) return;
    if (paymentSuccess) {
      navigate('/payment-success', { replace: true });
    } else if (wasAuthOnLoad.current === false && preSelectedLanguage) {
      const lang = preSelectedLanguage as AfricanLanguage;
      setCurrentLanguage(lang);
      setPreSelectedLanguage(null);
      navigate(langUrl(lang), { replace: true });
    }
  }, [user, isGuest, loading]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Helpers ───────────────────────────────────────────────────────────────
  const handleLanguageSelect = (languageId: string) => {
    const lang = languageId as AfricanLanguage;
    setCurrentLanguage(lang);
    if (!userProgressMap[lang])
      setUserProgressMap(prev => ({ ...prev, [lang]: createDefaultProgress(lang) }));
    navigate(langUrl(lang));
  };

  const goToLanding = () => navigate('/');

  const handleGoToSignIn = async () => {
    if (user) await logout();
    else setGuestMode(false);
    setAuthSheet('login');
    goToLanding();
  };

  const handleGoToSignUp = async () => {
    if (user) await logout();
    else setGuestMode(false);
    setAuthSheet('signup');
    goToLanding();
  };

  void handleGoToSignIn;

  const authenticated = !!(user || isGuest);
  const appBg = getBackgroundStyle(userData?.equippedBackground);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--app-bg)' }}>
        <div className="text-white text-xl">Loading Afroslang...</div>
      </div>
    );
  }

  const equippedBg = userData?.equippedBackground ?? 'bg_default';

  const appShell = (children: React.ReactNode) => (
    <div style={{ minHeight: '100dvh', background: appBg }}>
      {equippedBg === 'bg_savanna' ? <SavannaCanvas /> : equippedBg === 'bg_cloudy' ? <CloudyCanvas /> : <GlCanvas />}
      {children}
    </div>
  );

  return (
    <Routes>
      {/* Landing / auth */}
      <Route path="/" element={
        <LandingPage
          initialSheet={authSheet}
          isLoggedIn={!!user}
          onContinue={() => currentLanguage && navigate(langUrl(currentLanguage))}
          onSelectLanguage={handleLanguageSelect}
          onPreSelectLanguage={setPreSelectedLanguage}
          userProgressMap={userProgressMap}
        />
      } />

      {/* Learning path + lesson + complete — /:country/:lang */}
      <Route path="/:country/:lang" element={
        authenticated ? appShell(
          <LearnView
            interfaceLanguage={interfaceLanguage}
            userProgressMap={userProgressMap}
            setUserProgressMap={setUserProgressMap}
            userData={userData}
            user={user}
            isGuest={isGuest}
            onBackToLanding={goToLanding}
            onNavigate={(screen) => {
              if (screen === 'leaderboard') navigate('/leaderboard');
              else if (screen === 'shop') navigate('/shop');
              else if (screen === 'latest-news') navigate('/news');
              else if (screen === 'profile' || screen === 'settings') navigate('/profile');
            }}
            onGoToSignUp={handleGoToSignUp}
            onGoToSubscription={() => navigate('/subscription')}
            onSetCurrentLanguage={setCurrentLanguage}
          />
        ) : <Navigate to="/" replace />
      } />

      {/* Legacy /learn/:lang → /:country/:lang */}
      {VALID_LANGS.map(lang => (
        <Route key={`learn-${lang}`} path={`/learn/${lang}`} element={<Navigate to={langUrl(lang)} replace />} />
      ))}

      {/* Legacy /:lang → /:country/:lang */}
      {VALID_LANGS.map(lang => (
        <Route key={lang} path={`/${lang}`} element={<Navigate to={langUrl(lang)} replace />} />
      ))}

      {/* Shop */}
      <Route path="/shop" element={
        authenticated ? appShell(
          <ShopScreen
            interfaceLanguage={interfaceLanguage}
            onBack={() => currentLanguage ? navigate(langUrl(currentLanguage)) : goToLanding()}
          />
        ) : <Navigate to="/" replace />
      } />

      {/* Leaderboard */}
      <Route path="/leaderboard" element={
        authenticated ? appShell(
          <LeaderboardScreen
            onBack={() => currentLanguage ? navigate(langUrl(currentLanguage as AfricanLanguage)) : goToLanding()}
          />
        ) : <Navigate to="/" replace />
      } />

      {/* Profile */}
      <Route path="/profile" element={
        authenticated ? appShell(
          <ProfileScreen
            userProgressMap={userProgressMap}
            currentLanguage={currentLanguage}
            interfaceLanguage={interfaceLanguage}
            onBack={() => currentLanguage ? navigate(langUrl(currentLanguage as AfricanLanguage)) : goToLanding()}
            onContinueLearning={handleLanguageSelect}
            onChangeInterfaceLanguage={setInterfaceLanguage}
            onGoToShop={() => navigate('/shop')}
          />
        ) : <Navigate to="/" replace />
      } />

      {/* Latest news */}
      <Route path="/news" element={
        authenticated ? appShell(
          <LatestNews
            interfaceLanguage={interfaceLanguage}
            onBack={() => currentLanguage ? navigate(langUrl(currentLanguage as AfricanLanguage)) : goToLanding()}
          />
        ) : <Navigate to="/" replace />
      } />

      {/* Subscription */}
      <Route path="/subscription" element={
        authenticated ? appShell(
          <SubscriptionPage onBack={goToLanding} />
        ) : <Navigate to="/" replace />
      } />

      {/* Payment success */}
      <Route path="/payment-success" element={
        authenticated ? appShell(
          <SuccessPage onContinue={goToLanding} />
        ) : <Navigate to="/" replace />
      } />

      {/* Feedback */}
      <Route path="/feedback" element={
        authenticated ? appShell(
          <FeedbackPage onBack={goToLanding} />
        ) : <Navigate to="/" replace />
      } />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
