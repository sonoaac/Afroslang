import { useState, useEffect } from 'react';
import { InterfaceLanguage, Stage, Lesson, UserProgress } from '../../types';
import { Heart, Home, Trophy as TrophyIcon, Store, User, Settings, Shield, Newspaper } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getLanguageById } from '../../data/languages';
import { FlagIcon } from '../language-select/FlagIcon';
import { Exercise } from '../../types';

import './StackedLessonCards.css';

interface LearningPathProps {
  interfaceLanguage: InterfaceLanguage;
  stages: Stage[];
  progress: UserProgress;
  onStartLesson: (lesson: Lesson) => void;
  onBackToLanguageSelect: () => void;
  onNavigate?: (screen: 'leaderboard' | 'shop' | 'profile' | 'settings' | 'quests' | 'latest-news') => void;
  currentLanguageId?: string;
}

export function LearningPath({ 
  interfaceLanguage, 
  stages, 
  progress, 
  onStartLesson, 
  onBackToLanguageSelect,
  onNavigate,
  currentLanguageId
}: LearningPathProps) {
  const isEnglish = interfaceLanguage === 'en';
  const [timeRemaining, setTimeRemaining] = useState('');
  const [logoError, setLogoError] = useState(false);
  const [activeSidebarItem, setActiveSidebarItem] = useState<'learn' | 'leaderboard' | 'quests' | 'shop' | 'profile' | 'settings' | 'latest-news'>('learn');
  const { user, userData, isGuest } = useAuth();
  
  // Get current language data for flag display
  const currentLanguage = currentLanguageId ? getLanguageById(currentLanguageId) : null;

  // Update countdown timer
  useEffect(() => {
    if (!progress.heartsResetTime) return;

    const updateTimer = () => {
      const now = Date.now();
      const diff = progress.heartsResetTime! - now;
      
      if (diff <= 0) {
        setTimeRemaining('');
        return;
      }
      
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    
    return () => clearInterval(interval);
  }, [progress.heartsResetTime]);

  const isLessonCompleted = (lessonId: string): boolean => {
    return (progress.completedLessons || []).includes(lessonId);
  };

  const ensureExerciseCount = (source: Exercise[], desiredCount: number, idPrefix: string): Exercise[] => {
    if (source.length >= desiredCount) {
      // Select a deterministic subset so every lesson is exactly desiredCount questions.
      const seed = idPrefix;
      let h = 2166136261;
      for (let i = 0; i < seed.length; i++) {
        h ^= seed.charCodeAt(i);
        h = Math.imul(h, 16777619);
      }
      let s = h >>> 0;
      const rand = () => {
        s += 0x6d2b79f5;
        let t = s;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };

      const shuffled = [...source];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(rand() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled.slice(0, desiredCount);
    }

    const base = source.length > 0 ? source : [
      {
        id: `${idPrefix}-fallback-1`,
        type: 'multiple-choice',
        question: 'Select the correct answer',
        questionFr: 'Sélectionnez la bonne réponse',
        correctAnswer: 'A',
        options: ['A', 'B', 'C', 'D']
      }
    ];

    const out: Exercise[] = [...source];
    let i = 0;
    while (out.length < desiredCount) {
      const template = base[i % base.length];
      const cloneIndex = out.length + 1;
      out.push({
        ...template,
        id: `${idPrefix}-p${cloneIndex}`,
        question: template.question ? `${template.question} (Review)` : template.question,
        questionFr: template.questionFr ? `${template.questionFr} (Révision)` : template.questionFr,
      });
      i += 1;
    }
    return out;
  };

  const startLessonWithTwentyQuestions = (lesson: Lesson) => {
    const patchedLesson: Lesson = {
      ...lesson,
      exercises: ensureExerciseCount(lesson.exercises || [], 20, lesson.id)
    };
    onStartLesson(patchedLesson);
  };

  const flattenedLessons = stages.flatMap(s => s.lessons || []);
  const lessonIndexById = new Map(flattenedLessons.map((l, i) => [l.id, i] as const));

  const isLessonUnlocked = (lesson: Lesson): boolean => {
    const idx = lessonIndexById.get(lesson.id);
    if (idx === undefined) return false;
    if (idx === 0) return true;
    return (progress.completedLessons || []).length >= idx;
  };

  const handleSidebarClick = (item: 'learn' | 'leaderboard' | 'quests' | 'shop' | 'profile' | 'settings' | 'latest-news') => {
    setActiveSidebarItem(item);
    if (item !== 'learn' && onNavigate) {
      onNavigate(item as any);
    }
  };

  // Get first lesson that's not completed or current lesson
  const getCurrentLesson = () => {
    for (const stage of stages) {
      for (const lesson of stage.lessons) {
        if (isLessonUnlocked(lesson) && !isLessonCompleted(lesson.id)) {
          return { lesson, stage };
        }
      }
    }
    return null;
  };

  const currentLessonInfo = getCurrentLesson();

  const getStageForIndex = (stageIndex: number): Stage => {
    const real = stages[stageIndex];
    if (real) return real;
    return {
      id: `${currentLanguageId || 'lang'}-stage-${stageIndex + 1}`,
      stageNumber: stageIndex + 1,
      title: isEnglish ? 'Coming soon' : 'Bientôt',
      titleFr: isEnglish ? 'Coming soon' : 'Bientôt',
      color: 'from-[#F4A300] to-[#FF9500]',
      lessons: []
    } as Stage;
  };

  const getLessonForSlot = (stageIndex: number, slotIndex: number): { lesson: Lesson; isReal: boolean } => {
    const stage = getStageForIndex(stageIndex);
    const existing = stage.lessons?.[slotIndex];
    if (existing) return { lesson: existing, isReal: true };

    return {
      lesson: {
        id: `${stage.id}-coming-soon-${slotIndex + 1}`,
        stageId: stage.id,
        lessonNumber: slotIndex + 1,
        type: 'vocabulary',
        title: stackedLessonLabels[slotIndex] || (isEnglish ? `Lesson ${slotIndex + 1}` : `Leçon ${slotIndex + 1}`),
        titleFr: stackedLessonLabels[slotIndex] || (isEnglish ? `Lesson ${slotIndex + 1}` : `Leçon ${slotIndex + 1}`),
        xpReward: 0,
        exercises: []
      },
      isReal: false
    };
  };

  // Safety check
  if (!stages || stages.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center space-y-8">
          <div className="text-8xl animate-bounce">📚</div>
          <h2 className="text-5xl text-gray-900 mb-4">
            {isEnglish ? 'Lessons Coming Soon!' : 'Leçons à venir!'}
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Sidebar - Hidden on mobile */}
      <div className="hidden md:flex w-20 flex-shrink-0 bg-gray-50 border-r border-gray-200 flex flex-col items-center py-6">
        {/* Logo at top */}
        <button
          onClick={() => handleSidebarClick('learn')}
          className="mb-6 w-14 h-14 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
        >
          {logoError ? (
            <div className="w-12 h-12 rounded-full bg-green-500" />
          ) : (
            <img
              src="/afroslang-logo.png"
              alt="Afroslang logo"
              className="w-12 h-12 rounded-full object-contain animate-bounce hover:scale-110 transition-transform"
              onError={() => setLogoError(true)}
            />
          )}
        </button>

        {/* Navigation Icons */}
        <div className="flex flex-col gap-4 flex-1">
          {/* Learn (active when on this page) */}
          <div className="relative group">
            <button
              onClick={() => handleSidebarClick('learn')}
              className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all ${
                activeSidebarItem === 'learn'
                  ? 'bg-green-500 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              aria-label="Learn"
            >
              <Home className="w-6 h-6" />
            </button>
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
              {isEnglish ? 'Learn' : 'Apprendre'}
            </div>
          </div>

          {/* Leaderboards */}
          <div className="relative group">
            <button
              onClick={() => handleSidebarClick('leaderboard')}
              className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all ${
                activeSidebarItem === 'leaderboard'
                  ? 'bg-yellow-400 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              aria-label="Leaderboards"
            >
              <TrophyIcon className="w-6 h-6" />
            </button>
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
              {isEnglish ? 'Leaderboards' : 'Classements'}
            </div>
          </div>

          {/* Quests */}
          <div className="relative group">
            <button
              onClick={() => handleSidebarClick('quests')}
              className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all ${
                activeSidebarItem === 'quests'
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              aria-label="Quests"
            >
              <Shield className="w-6 h-6" />
            </button>
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
              {isEnglish ? 'Quests' : 'Quêtes'}
            </div>
          </div>

          {/* Shop */}
          <div className="relative group">
            <button
              onClick={() => handleSidebarClick('shop')}
              className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all ${
                activeSidebarItem === 'shop'
                  ? 'bg-purple-500 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              aria-label="Shop"
            >
              <Store className="w-6 h-6" />
            </button>
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
              {isEnglish ? 'Shop' : 'Boutique'}
            </div>
          </div>

          {/* Latest News */}
          <div className="relative group">
            <button
              onClick={() => handleSidebarClick('latest-news')}
              className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all ${
                activeSidebarItem === 'latest-news'
                  ? 'bg-orange-500 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              aria-label="Latest News"
            >
              <Newspaper className="w-6 h-6" />
            </button>
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
              {isEnglish ? 'Latest News' : 'Dernières Actualités'}
            </div>
          </div>

          {/* Profile */}
          <div className="relative group">
            <button
              onClick={() => handleSidebarClick('profile')}
              className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all ${
                activeSidebarItem === 'profile'
                  ? 'bg-red-500 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              aria-label="Profile"
            >
              <User className="w-6 h-6" />
            </button>
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
              {isEnglish ? 'Profile' : 'Profil'}
            </div>
          </div>

          {/* Settings */}
          <div className="relative group">
            <button
              onClick={() => handleSidebarClick('settings')}
              className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all ${
                activeSidebarItem === 'settings'
                  ? 'bg-gray-700 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              aria-label="Settings"
            >
              <Settings className="w-6 h-6" />
            </button>
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
              {isEnglish ? 'Settings' : 'Paramètres'}
            </div>
          </div>
        </div>
      </div>

      {/* Central Content Area */}
      <div className="flex-1 flex flex-col overflow-y-auto min-w-0">
        {/* Mobile Header - Only visible on mobile */}
        <div className="md:hidden bg-gray-900 text-white px-4 py-4 flex items-center justify-between sticky top-0 z-40">
          <button
            onClick={onBackToLanguageSelect}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          {currentLanguage && currentLanguage.flags && currentLanguage.flags.length > 0 && (
            <FlagIcon country={currentLanguage.flags[0]} size="md" />
          )}
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 fill-white" />
            <span className="font-semibold">{progress.hearts}</span>
          </div>
        </div>

        {/* Lesson Stacks */}
        <div className="flex-1 px-3 sm:px-6 py-4 sm:py-6">
          <div className="afroStackedWrap">
            <div className="space-y-6">
              {Array.from({ length: 7 }).map((_, stageIndex) => {
                const stage = getStageForIndex(stageIndex);
                const stageTitle = isEnglish ? stage.title : stage.titleFr;

                return (
                  <section
                    key={stage.id}
                    className="afroStackedCards"
                    aria-label={isEnglish ? `Stage ${stageIndex + 1} lessons` : `Étape ${stageIndex + 1} leçons`}
                  >
                    <div className="afroStackSectionHeader">
                      <h2>{(stageTitle || (isEnglish ? 'Lessons' : 'Leçons')).trim()}</h2>
                      <p>{isEnglish ? '7 lessons • 20 questions each' : '7 leçons • 20 questions chacune'}</p>
                    </div>

                    <div className="afroStackGrid">
                      <div className="afroStackRow">
                        {Array.from({ length: 7 }).map((_, slotIndex) => {
                          const { lesson, isReal } = getLessonForSlot(stageIndex, slotIndex);
                          const unlocked = isReal ? isLessonUnlocked(lesson) : false;
                          const completed = isReal ? isLessonCompleted(lesson.id) : false;
                          const heartsBlocked = progress.hearts === 0 && !isGuest && !userData?.subscription?.active && !completed;
                          const label = isReal
                            ? (isEnglish ? lesson.title : (lesson.titleFr || lesson.title))
                            : (isEnglish ? `Lesson ${slotIndex + 1}` : `Leçon ${slotIndex + 1}`);

                          return (
                            <article key={lesson.id} className="afroStackCard" tabIndex={0}>
                              <div className="afroStackMeta">
                                {isEnglish ? `Lesson ${slotIndex + 1}` : `Leçon ${slotIndex + 1}`} • {
                                  !isReal
                                    ? (isEnglish ? 'Coming soon' : 'Bientôt')
                                    : completed
                                      ? (isEnglish ? 'Completed' : 'Terminé')
                                      : unlocked
                                        ? (isEnglish ? 'Ready' : 'Prêt')
                                        : (isEnglish ? 'Locked' : 'Verrouillé')
                                }
                              </div>
                              <h3>{label}</h3>
                              <p className="afroStackDesc">
                                {!isReal
                                  ? (isEnglish ? 'More content is coming for this stage.' : 'Plus de contenu arrive pour cette étape.')
                                  : (isEnglish ? '20 questions. Keep your hearts to continue.' : '20 questions. Gardez vos cœurs pour continuer.')}
                              </p>

                              <div className="afroStackFooter">
                                <button
                                  type="button"
                                  className="afroStackButton"
                                  onClick={() => {
                                    if (!isReal) return;
                                    if (!unlocked) return;
                                    if (heartsBlocked) return;
                                    startLessonWithTwentyQuestions(lesson);
                                  }}
                                  disabled={!isReal || !unlocked || heartsBlocked}
                                >
                                  {!isReal
                                    ? (isEnglish ? 'Soon' : 'Bientôt')
                                    : completed
                                      ? (isEnglish ? 'Review' : 'Réviser')
                                      : isEnglish
                                        ? 'Start'
                                        : 'Démarrer'}
                                </button>

                                <span className="afroStackPill">
                                  {!isReal
                                    ? (isEnglish ? '⏳ Soon' : '⏳ Bientôt')
                                    : completed
                                      ? (isEnglish ? '★ Done' : '★ Fait')
                                      : unlocked
                                        ? (isEnglish ? '✓ Unlocked' : '✓ Débloqué')
                                        : (isEnglish ? '🔒 Locked' : '🔒 Verrouillé')}
                                </span>
                              </div>
                            </article>
                          );
                        })}
                      </div>
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
