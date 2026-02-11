import { useState, useEffect } from 'react';
import { InterfaceLanguage, AfricanLanguage, UserProgress, Lesson } from './types';
import { InterfaceLanguageSelector } from './features/language-select/InterfaceLanguageSelector';
import { LanguageSelectionScreen } from './features/language-select/LanguageSelectionScreen';
import { LearningPath } from './features/lessons/LearningPath';
import { LessonScreen } from './features/lessons/LessonScreen';
import { LessonComplete } from './features/lessons/LessonComplete';
import { AuthScreen } from './components/auth/AuthScreen';
import { LeaderboardScreen } from './components/leaderboard/LeaderboardScreen';
import { SubscriptionPage } from './components/subscription/SubscriptionPage';
import { FeedbackPage } from './components/feedback/FeedbackPage';
import { LatestNews } from './components/layout/LatestNews';
import { ShopScreen } from './features/store/ShopScreen';
import { FirebaseQuickSetup } from './components/debug/FirebaseQuickSetup';
import { useAuth } from './contexts/AuthContext';
import { getLanguageById } from './data/languages';
import { getStagesForLanguage, getLessonById } from './data/lessons';
import { saveUserProgress } from './utils/userData';
import { addWeeklyXP, getCurrentWeekIdFromDB, getUserLeague } from './utils/leaderboardUtils';

type Screen = 'auth' | 'interface-select' | 'language-select' | 'path' | 'lesson' | 'complete' | 'leaderboard' | 'subscription' | 'feedback' | 'shop' | 'latest-news';

function App() {
  const { user, userData, isGuest, loading } = useAuth();
  const [currentScreen, setCurrentScreen] = useState<Screen>('auth');
  const [interfaceLanguage, setInterfaceLanguage] = useState<InterfaceLanguage>('en');
  const [currentLanguage, setCurrentLanguage] = useState<AfricanLanguage | null>(null);
  const [userProgressMap, setUserProgressMap] = useState<Record<string, UserProgress>>({});
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [lastCompletedXP, setLastCompletedXP] = useState(0);

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedInterface = localStorage.getItem('afroslang_interface');
    const savedProgress = localStorage.getItem('afroslang_progress');
    const savedCurrentLang = localStorage.getItem('afroslang_current_language');

    if (savedInterface) {
      setInterfaceLanguage(savedInterface as InterfaceLanguage);
    }

    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      
      // Check and reset hearts if 24 hours passed, and normalize data
      const updatedProgress = { ...progress };
      Object.keys(updatedProgress).forEach(langId => {
        const prog = updatedProgress[langId];
        // Ensure completedLessons is always an array
        if (!prog.completedLessons) {
          prog.completedLessons = [];
        }
        if (prog.heartsResetTime && Date.now() >= prog.heartsResetTime) {
          prog.hearts = 5;
          prog.heartsResetTime = null;
        }
      });
      setUserProgressMap(updatedProgress);
    }

    // Always start from interface selection for a fresh experience
    // Users can manually navigate to their previous language if needed
    // Don't auto-load saved language - let users choose fresh each time
    
    // Clear any saved current language to ensure fresh start
    if (savedCurrentLang) {
      localStorage.removeItem('afroslang_current_language');
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    if (Object.keys(userProgressMap).length > 0) {
      localStorage.setItem('afroslang_progress', JSON.stringify(userProgressMap));
    }
  }, [userProgressMap]);

  useEffect(() => {
    if (currentLanguage) {
      localStorage.setItem('afroslang_current_language', currentLanguage);
    }
  }, [currentLanguage]);

  useEffect(() => {
    localStorage.setItem('afroslang_interface', interfaceLanguage);
  }, [interfaceLanguage]);

  const handleInterfaceLanguageSelect = (lang: InterfaceLanguage) => {
    setInterfaceLanguage(lang);
    setCurrentScreen('language-select');
  };

  const handleLanguageToLearnSelect = (languageId: string) => {
    const lang = languageId as AfricanLanguage;
    setCurrentLanguage(lang);

    // Initialize progress if not exists
    if (!userProgressMap[lang]) {
      const newProgress: UserProgress = {
        languageId: lang,
        xp: 0,
        level: 1,
        hearts: 5,
        heartsResetTime: null,
        streak: 0,
        lastPracticeDate: null,
        streakDays: [],
        lessonsCompleted: 0,
        wordsLearned: 0,
        mistakeCount: 0,
        completedLessons: [],
        currentStage: 1
      };
      setUserProgressMap(prev => ({ ...prev, [lang]: newProgress }));
    }

    setCurrentScreen('path');
  };

  const handleStartLesson = (lesson: Lesson) => {
    // Check if lesson has exercises before starting
    if (!lesson || !lesson.exercises || lesson.exercises.length === 0) {
      console.error('Lesson has no exercises:', lesson);
      return;
    }
    setActiveLesson(lesson);
    setCurrentScreen('lesson');
  };

  const handleLessonComplete = async (xpEarned: number, heartsLost: number, heartsGained: number) => {
    if (!currentLanguage || !activeLesson) return;

    setLastCompletedXP(xpEarned);

    // Save to Firebase if user is authenticated
    if (user && !isGuest) {
      await saveUserProgress(user.uid, currentLanguage, activeLesson.id, xpEarned, heartsLost);
      
      // Add XP to leaderboard
      try {
        const weekId = await getCurrentWeekIdFromDB();
        const userLeague = await getUserLeague(user.uid, weekId);
        const league = userLeague || 'Copper'; // Default to Copper if no league found
        
        await addWeeklyXP(
          user.uid,
          league,
          userData?.username || 'User',
          xpEarned,
          userData?.subscription?.active || false,
          weekId
        );
      } catch (error) {
        console.error('Error adding XP to leaderboard:', error);
      }
    }

    setUserProgressMap(prev => {
      const current = prev[currentLanguage] || {
        languageId: currentLanguage,
        xp: 0,
        level: 1,
        hearts: 5,
        heartsResetTime: null,
        streak: 0,
        lastPracticeDate: null,
        streakDays: [],
        lessonsCompleted: 0,
        wordsLearned: 0,
        mistakeCount: 0,
        completedLessons: [],
        currentStage: 1
      };

      // Only count XP and streaks for authenticated users (not guests or users without accounts)
      const shouldCountXP = user && !isGuest;
      
      const newXp = shouldCountXP ? current.xp + xpEarned : current.xp;
      const newLevel = shouldCountXP ? Math.floor(newXp / 100) + 1 : current.level;
      
      // Calculate new hearts: subtract lost, add gained, max at 5
      let newHearts = Math.min(5, current.hearts - heartsLost + heartsGained);
      let newResetTime = current.heartsResetTime;

      if (newHearts === 0) {
        // Set reset time to 7 hours from now
        newResetTime = Date.now() + (7 * 60 * 60 * 1000);
      } else if (newHearts > 0 && current.heartsResetTime) {
        // If they had no hearts but now have some, clear the reset timer
        newResetTime = null;
      }

      // Update streak - only for authenticated users (not guests)
      const today = new Date();
      const todayDateString = today.toDateString();
      const todayDay = today.getDate();
      const todayMonth = today.getMonth();
      const todayYear = today.getFullYear();
      
      const lastDate = current.lastPracticeDate;
      let newStreak = shouldCountXP ? current.streak : 0;
      let streakDays = shouldCountXP ? (current.streakDays || []) : [];

      if (shouldCountXP && (!lastDate || lastDate !== todayDateString)) {
        // Check if last practice was yesterday
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayDateString = yesterday.toDateString();
        
        if (lastDate === yesterdayDateString) {
          // Consecutive day - increment streak
          newStreak += 1;
        } else if (!lastDate) {
          // First time practicing - start streak at 1
          newStreak = 1;
        } else {
          // Streak broken (last practice was more than 1 day ago) - reset to 1
          newStreak = 1;
          // Only clear streakDays if switching to a new month
          const lastDateObj = new Date(lastDate);
          const isDifferentMonth = lastDateObj.getMonth() !== todayMonth || lastDateObj.getFullYear() !== todayYear;
          if (isDifferentMonth) {
            streakDays = [];
          }
        }
        
        // Add today to streak days if it's the current month
        const isCurrentMonth = todayMonth === new Date().getMonth() && todayYear === new Date().getFullYear();
        if (isCurrentMonth && !streakDays.includes(todayDay)) {
          streakDays = [...streakDays, todayDay].sort((a, b) => a - b);
        }
      }
      
      // Update lastPracticeDate only for authenticated users
      const newLastPracticeDate = shouldCountXP ? todayDateString : current.lastPracticeDate;

      // Add lesson to completed list if not already there
      const currentCompletedLessons = current.completedLessons || [];
      const completedLessons = currentCompletedLessons.includes(activeLesson.id)
        ? currentCompletedLessons
        : [...currentCompletedLessons, activeLesson.id];

      return {
        ...prev,
        [currentLanguage]: {
          ...current,
          xp: newXp,
          level: newLevel,
          hearts: newHearts,
          heartsResetTime: newResetTime,
          streak: newStreak,
          lastPracticeDate: newLastPracticeDate,
          streakDays: streakDays,
          lessonsCompleted: current.lessonsCompleted + 1,
          wordsLearned: current.wordsLearned + 3,
          mistakeCount: heartsLost > 0 ? current.mistakeCount + heartsLost : current.mistakeCount,
          completedLessons
        }
      };
    });

    setCurrentScreen('complete');
  };

  const handleContinueAfterComplete = () => {
    setCurrentScreen('path');
  };

  const handleBackToLanguageSelect = () => {
    setCurrentScreen('language-select');
  };

  const handleExitLesson = () => {
    setCurrentScreen('path');
  };

  const getCurrentProgress = (): UserProgress => {
    const unlimitedHearts = userData?.subscription?.active ? 999 : 5;
    
    if (!currentLanguage) {
      return {
        languageId: 'swahili',
        xp: 0,
        level: 1,
        hearts: unlimitedHearts,
        heartsResetTime: null,
        streak: 0,
        lastPracticeDate: null,
        streakDays: [],
        lessonsCompleted: 0,
        wordsLearned: 0,
        mistakeCount: 0,
        completedLessons: [],
        currentStage: 1
      };
    }

    const progress = userProgressMap[currentLanguage];
    if (!progress) {
      return {
        languageId: currentLanguage,
        xp: 0,
        level: 1,
        hearts: unlimitedHearts,
        heartsResetTime: null,
        streak: 0,
        lastPracticeDate: null,
        streakDays: [],
        lessonsCompleted: 0,
        wordsLearned: 0,
        mistakeCount: 0,
        completedLessons: [],
        currentStage: 1
      };
    }

    // Override hearts for subscribers
    return {
      ...progress,
      hearts: unlimitedHearts
    };
  };

  // Handle authentication state changes
  useEffect(() => {
    if (!loading && (user || isGuest) && currentScreen === 'auth') {
      setCurrentScreen('interface-select');
    }
  }, [user, isGuest, loading, currentScreen]);

  // Show loading screen while checking authentication
  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: 'var(--app-bg)' }}
      >
        <div className="text-white text-xl">Loading Afroslang...</div>
      </div>
    );
  }

  // Show authentication screen if not logged in and not in guest mode
  if (!user && !isGuest && currentScreen === 'auth') {
    return <AuthScreen />;
  }

  return (
    <>
      {currentScreen === 'interface-select' && (
        <InterfaceLanguageSelector onSelect={handleInterfaceLanguageSelect} />
      )}

      {currentScreen === 'language-select' && (
        <LanguageSelectionScreen
          interfaceLanguage={interfaceLanguage}
          onSelectLanguage={handleLanguageToLearnSelect}
          onBack={() => setCurrentScreen('interface-select')}
          onInterfaceLanguageChange={(lang) => setInterfaceLanguage(lang)}
        />
      )}

      {currentScreen === 'path' && currentLanguage && (
        <LearningPath
          interfaceLanguage={interfaceLanguage}
          stages={getStagesForLanguage(currentLanguage)}
          progress={getCurrentProgress()}
          onStartLesson={handleStartLesson}
          onBackToLanguageSelect={() => setCurrentScreen('language-select')}
          onNavigate={(screen) => {
            if (screen === 'leaderboard') {
              setCurrentScreen('leaderboard');
            } else if (screen === 'shop') {
              setCurrentScreen('shop');
            } else if (screen === 'latest-news') {
              setCurrentScreen('latest-news');
            } else if (screen === 'profile') {
              // Add profile screen if needed
            } else if (screen === 'settings') {
              // Add settings screen if needed
            } else if (screen === 'quests') {
              // Add quests screen if needed
            }
          }}
          currentLanguageId={currentLanguage}
        />
      )}

        {currentScreen === 'lesson' && currentLanguage && activeLesson && (
          <LessonScreen
            interfaceLanguage={interfaceLanguage}
            lesson={activeLesson}
            languageName={getLanguageById(currentLanguage)?.name || ''}
            hearts={getCurrentProgress().hearts}
            heartsData={userData?.heartsData}
            isSubscribed={userData?.subscription?.active || false}
            userId={user?.uid}
            isGuest={isGuest}
            onComplete={handleLessonComplete}
            onExit={handleExitLesson}
            onBackToLanguageSelect={() => setCurrentScreen('language-select')}
          />
        )}

      {currentScreen === 'complete' && (
        <LessonComplete
          interfaceLanguage={interfaceLanguage}
          xpEarned={lastCompletedXP}
          onContinue={handleContinueAfterComplete}
          onBackToLanguageSelect={() => setCurrentScreen('language-select')}
        />
      )}

      {currentScreen === 'leaderboard' && (
        <LeaderboardScreen
          onBack={() => setCurrentScreen('interface-select')}
        />
      )}

      {currentScreen === 'subscription' && (
        <SubscriptionPage
          onBack={() => setCurrentScreen('interface-select')}
        />
      )}

      {currentScreen === 'feedback' && (
        <FeedbackPage
          onBack={() => setCurrentScreen('interface-select')}
        />
      )}

      {currentScreen === 'shop' && (
        <ShopScreen
          interfaceLanguage={interfaceLanguage}
          onBack={() => setCurrentScreen('path')}
        />
      )}

      {currentScreen === 'latest-news' && (
        <LatestNews
          interfaceLanguage={interfaceLanguage}
          onBack={() => setCurrentScreen('path')}
        />
      )}
    </>
  );
}

export default App;
