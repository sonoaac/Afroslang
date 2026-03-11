import { useState, useEffect } from 'react';
import { InterfaceLanguage, Stage, Lesson, UserProgress } from '../../types';
import { Heart, Home, Trophy as TrophyIcon, Store, User, Settings, Shield, Newspaper } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getLanguageById } from '../../data/languages';
import { FlagIcon } from '../language-select/FlagIcon';
import { Exercise } from '../../types';
import { RainCanvas } from '../../components/rain/RainCanvas';
import { MascotFactCard } from '../../components/rain/MascotFactCard';
import { RAIN_LANGUAGES } from '../../data/culturalFacts';

import './HomeFeed.css';
import '../../components/rain/MascotFactCard.css';

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
  const showRain = currentLanguageId ? RAIN_LANGUAGES.has(currentLanguageId) : false;

  const STAGE_COLORS = ['#b00020','#cc0028','#e53935','#9b0019','#d32f2f','#c62828','#bf360c'];
  const TYPE_ICONS: Record<string, string> = { vocabulary:'🔤', grammar:'⚡', culture:'🌍', writing:'✍️' };
  const xpPercent = Math.min(100, ((progress.xp ?? 0) % 100));
  const userName = (userData as any)?.username || (isGuest ? (isEnglish ? 'Guest' : 'Invité') : 'You');
  const initials = userName.slice(0, 2).toUpperCase();

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
      <div style={{ minHeight:'100svh', display:'flex', alignItems:'center', justifyContent:'center', background:'#080808' }}>
        <div style={{ textAlign:'center' }}>
          <div style={{ fontSize:'4rem' }}>📚</div>
          <p style={{ color:'#4ade80', fontFamily:'Times New Roman', fontSize:'1.2rem', marginTop:16 }}>
            {isEnglish ? 'Lessons Coming Soon!' : 'Leçons à venir!'}
          </p>
        </div>
      </div>
    );
  }

  const NAV_ITEMS = [
    { key:'learn',        icon:<Home className="w-5 h-5"/>,       label: isEnglish?'Learn':'Apprendre' },
    { key:'leaderboard',  icon:<TrophyIcon className="w-5 h-5"/>, label: isEnglish?'Ranks':'Classements' },
    { key:'shop',         icon:<Store className="w-5 h-5"/>,      label: isEnglish?'Shop':'Boutique' },
    { key:'latest-news',  icon:<Newspaper className="w-5 h-5"/>,  label: isEnglish?'News':'Actualités' },
    { key:'profile',      icon:<User className="w-5 h-5"/>,       label: isEnglish?'Profile':'Profil' },
  ] as const;

  return (
    <div className="hf-page">
      {showRain && <RainCanvas intensity="heavy" />}

      {/* ── Desktop sidebar ── */}
      <nav className="hf-sidebar">
        {logoError ? (
          <div style={{ width:40,height:40,borderRadius:'50%',background:'#b00020',marginBottom:16 }}/>
        ) : (
          <img
            className="hf-sidebar-logo"
            src="/Afroslang.png"
            alt="Afroslang"
            onError={() => setLogoError(true)}
            onClick={() => handleSidebarClick('learn')}
          />
        )}
        {NAV_ITEMS.map(item => (
          <button
            key={item.key}
            className={`hf-sidebar-btn${activeSidebarItem === item.key ? ' hf-sidebar-btn--active' : ''}`}
            onClick={() => handleSidebarClick(item.key as any)}
            aria-label={item.label}
          >
            {item.icon}
            <span className="hf-sidebar-tooltip">{item.label}</span>
          </button>
        ))}
        <button
          className={`hf-sidebar-btn${activeSidebarItem === 'settings' ? ' hf-sidebar-btn--active' : ''}`}
          onClick={() => handleSidebarClick('settings')}
          aria-label={isEnglish ? 'Settings' : 'Paramètres'}
          style={{ marginTop:'auto' }}
        >
          <Settings className="w-5 h-5"/>
          <span className="hf-sidebar-tooltip">{isEnglish ? 'Settings' : 'Paramètres'}</span>
        </button>
      </nav>

      {/* ── Main feed ── */}
      <main className="hf-feed">

        {/* Top bar */}
        <header className="hf-topbar">
          <div className="hf-topbar-brand" onClick={() => handleSidebarClick('learn')}>
            {logoError ? (
              <span style={{ fontSize:'1.4rem' }}>🐦</span>
            ) : (
              <img className="hf-topbar-logo" src="/Afroslang.png" alt="" onError={() => setLogoError(true)} />
            )}
            <span className="hf-topbar-name">Afroslang</span>
          </div>

          <div className="hf-topbar-lang">
            {currentLanguage?.flags?.[0] && (
              <FlagIcon country={currentLanguage.flags[0]} size="sm" />
            )}
            <span className="hf-topbar-langname">
              {currentLanguage?.name ?? (currentLanguageId ?? '')}
            </span>
          </div>

          <div className="hf-topbar-right">
            <span className="hf-topbar-stat">❤️ {progress.hearts}</span>
            <span className="hf-topbar-stat">🔥 {progress.streak ?? 0}</span>
          </div>
        </header>

        <div className="hf-feed-body">

          {/* Profile / XP strip */}
          <div className="hf-profile-strip">
            <div className="hf-avatar">{initials}</div>
            <div className="hf-profile-info">
              <div className="hf-profile-name">{userName}</div>
              <div className="hf-profile-level">
                {isEnglish ? `Level ${progress.level ?? 1}` : `Niveau ${progress.level ?? 1}`}
              </div>
              <div className="hf-xp-bar-track">
                <div className="hf-xp-bar-fill" style={{ width: `${xpPercent}%` }} />
              </div>
            </div>
            <div className="hf-profile-badges">
              <span className="hf-badge">⚡ {progress.xp ?? 0} XP</span>
              <span className="hf-badge">
                {(progress.completedLessons?.length ?? 0)} {isEnglish ? 'done' : 'faits'}
              </span>
            </div>
          </div>

          {/* Continue card */}
          {currentLessonInfo && (
            <div className="hf-continue-card">
              <div className="hf-continue-icon">
                {TYPE_ICONS[currentLessonInfo.lesson.type] ?? '📖'}
              </div>
              <div className="hf-continue-text">
                <div className="hf-continue-label">
                  {isEnglish ? `Stage ${currentLessonInfo.stage.stageNumber} · Continue` : `Étape ${currentLessonInfo.stage.stageNumber} · Continuer`}
                </div>
                <div className="hf-continue-title">
                  {isEnglish ? currentLessonInfo.lesson.title : (currentLessonInfo.lesson.titleFr || currentLessonInfo.lesson.title)}
                </div>
              </div>
              <button
                className="hf-continue-btn"
                onClick={() => startLessonWithTwentyQuestions(currentLessonInfo.lesson)}
              >
                {isEnglish ? 'Go' : 'Aller'}
              </button>
            </div>
          )}

          {/* Cultural fact card */}
          {currentLanguageId && (
            <div className="hf-fact-wrap">
              <MascotFactCard languageId={currentLanguageId} isEnglish={isEnglish} />
            </div>
          )}

          {/* Stage sections */}
          {Array.from({ length: 7 }).map((_, stageIndex) => {
            const stage = getStageForIndex(stageIndex);
            const stageTitle = isEnglish ? stage.title : stage.titleFr;
            const accent = STAGE_COLORS[stageIndex] ?? '#22c55e';

            return (
              <div key={stage.id}>
                {stageIndex > 0 && <div className="hf-stage-divider" />}

                <section
                  className="hf-stage-section"
                  aria-label={`Stage ${stageIndex + 1}`}
                >
                  {/* Stage header */}
                  <div className="hf-stage-header">
                    <span className="hf-stage-dot" style={{ color: accent, background: accent }} />
                    <span className="hf-stage-num">
                      {isEnglish ? `Stage ${stageIndex + 1}` : `Étape ${stageIndex + 1}`}
                    </span>
                    <span className="hf-stage-title">
                      {(stageTitle || (isEnglish ? 'Lessons' : 'Leçons')).trim()}
                    </span>
                    <span className="hf-stage-count">7 · 20Q</span>
                  </div>

                  {/* Lessons horizontal row */}
                  <div className="hf-lessons-row">
                    {Array.from({ length: 7 }).map((_, slotIndex) => {
                      const { lesson, isReal } = getLessonForSlot(stageIndex, slotIndex);
                      const unlocked  = isReal ? isLessonUnlocked(lesson)  : false;
                      const completed = isReal ? isLessonCompleted(lesson.id) : false;
                      const heartsBlocked = progress.hearts === 0 && !isGuest && !userData?.subscription?.active && !completed;
                      const title = isReal
                        ? (isEnglish ? lesson.title : (lesson.titleFr || lesson.title))
                        : (isEnglish ? `Lesson ${slotIndex + 1}` : `Leçon ${slotIndex + 1}`);

                      const cardState = !isReal ? 'soon'
                        : completed  ? 'done'
                        : unlocked   ? 'active'
                        : 'locked';

                      const btnClass = `hf-card-btn hf-card-btn--${cardState === 'done' ? 'review' : cardState}`;

                      return (
                        <article
                          key={lesson.id}
                          className={`hf-lesson-card hf-lesson-card--${cardState}`}
                          style={{ '--stage-color': accent } as React.CSSProperties}
                          tabIndex={unlocked && isReal ? 0 : -1}
                          onClick={() => {
                            if (!isReal || !unlocked || heartsBlocked) return;
                            startLessonWithTwentyQuestions(lesson);
                          }}
                        >
                          <div className="hf-card-top">
                            <span className="hf-card-num">
                              {isEnglish ? `#${slotIndex + 1}` : `#${slotIndex + 1}`}
                            </span>
                            <span className="hf-card-status">
                              {cardState === 'done' ? '✅'
                                : cardState === 'active' ? '▶️'
                                : cardState === 'locked' ? '🔒'
                                : '⏳'}
                            </span>
                          </div>

                          <div className="hf-card-type-icon">
                            {isReal ? (TYPE_ICONS[lesson.type] ?? '📖') : '🕐'}
                          </div>

                          <div className="hf-card-title">{title}</div>

                          <div className="hf-card-meta">
                            {isReal && <span className="hf-card-xp">⚡{lesson.xpReward ?? 10} XP</span>}
                            <span className="hf-card-type-label">
                              {isReal ? lesson.type : (isEnglish ? 'Soon' : 'Bientôt')}
                            </span>
                          </div>

                          <button
                            type="button"
                            className={btnClass}
                            disabled={!isReal || !unlocked || heartsBlocked}
                            onClick={e => {
                              e.stopPropagation();
                              if (!isReal || !unlocked || heartsBlocked) return;
                              startLessonWithTwentyQuestions(lesson);
                            }}
                          >
                            {cardState === 'soon'   ? (isEnglish ? 'Soon' : 'Bientôt')
                             : cardState === 'done'  ? (isEnglish ? 'Review' : 'Réviser')
                             : cardState === 'locked'? (isEnglish ? 'Locked' : 'Verrouillé')
                             : (isEnglish ? 'Start' : 'Démarrer')}
                          </button>
                        </article>
                      );
                    })}
                  </div>
                </section>
              </div>
            );
          })}

        </div>{/* end hf-feed-body */}
      </main>

      {/* ── Mobile bottom nav ── */}
      <nav className="hf-bottom-nav">
        {NAV_ITEMS.map(item => (
          <button
            key={item.key}
            className={`hf-bnav-btn${activeSidebarItem === item.key ? ' hf-bnav-btn--active' : ''}`}
            onClick={() => handleSidebarClick(item.key as any)}
          >
            {item.icon}
            <span className="hf-bnav-label">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
