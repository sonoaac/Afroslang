import { useState, useEffect, useCallback, useRef } from 'react';
import { InterfaceLanguage, Stage, Lesson, UserProgress } from '../../types';
import { Home, Trophy as TrophyIcon, Store, User, Settings, Star, ChevronRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getLanguageById } from '../../data/languages';
import { FlagIcon } from '../language-select/FlagIcon';
import { Exercise } from '../../types';
import { MascotFactCard } from '../../components/rain/MascotFactCard';
import { RAIN_LANGUAGES } from '../../data/culturalFacts';
import { RainCanvas } from '../../components/rain/RainCanvas';

import './HomeFeed.css';
import '../../components/rain/MascotFactCard.css';

interface LearningPathProps {
  interfaceLanguage: InterfaceLanguage;
  stages: Stage[];
  progress: UserProgress;
  onStartLesson: (lesson: Lesson) => void;
  onBackToLanguageSelect: () => void;
  onNavigate?: (screen: 'leaderboard' | 'shop' | 'profile' | 'settings' | 'quests' | 'latest-news') => void;
  onSignUp?: () => void;
  onSignIn?: () => void;
  currentLanguageId?: string;
}

// Zigzag offsets for 7 nodes per stage: center, right, left, right, left, center, left
const NODE_OFFSETS = ['none', 'right', 'left', 'right', 'left', 'none', 'left'] as const;

// Which slot indices get a special node type within a stage
const CHEST_SLOT = 4;   // 5th lesson → chest reward
const TROPHY_SLOT = 6;  // 7th lesson → trophy milestone

export function LearningPath({
  interfaceLanguage,
  stages,
  progress,
  onStartLesson,
  onBackToLanguageSelect,
  onNavigate,
  onSignUp,
  onSignIn,
  currentLanguageId
}: LearningPathProps) {
  const isEnglish = interfaceLanguage === 'en';
  const [logoError, setLogoError] = useState(false);
  const [currencyError, setCurrencyError] = useState(false);
  const [activeSidebarItem, setActiveSidebarItem] = useState<
    'learn' | 'leaderboard' | 'quests' | 'shop' | 'profile' | 'settings' | 'latest-news'
  >('learn');
  const [guidebookStage, setGuidebookStage] = useState<number | null>(null);
  const { user, userData, isGuest } = useAuth();
  const mainRef = useRef<HTMLElement>(null);

  // Scroll to top on mount
  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, behavior: 'instant' });
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const currentLanguage = currentLanguageId ? getLanguageById(currentLanguageId) : null;
  const langName = currentLanguage?.name ?? currentLanguageId ?? '';

  // Set document title: "LearnIgbo | Afroslang"
  useEffect(() => {
    if (langName) {
      document.title = `Learn${langName} | Afroslang`;
    }
    return () => { document.title = 'Afroslang'; };
  }, [langName]);

  const isLessonCompleted = (lessonId: string): boolean =>
    (progress.completedLessons || []).includes(lessonId);

  const flattenedLessons = stages.flatMap(s => s.lessons || []);
  const lessonIndexById = new Map(flattenedLessons.map((l, i) => [l.id, i] as const));

  const isLessonUnlocked = (lesson: Lesson): boolean => {
    const idx = lessonIndexById.get(lesson.id);
    if (idx === undefined) return false;
    if (idx === 0) return true;
    return (progress.completedLessons || []).length >= idx;
  };

  const ensureExerciseCount = (source: Exercise[], desiredCount: number, idPrefix: string): Exercise[] => {
    if (source.length >= desiredCount) {
      let h = 2166136261;
      for (let i = 0; i < idPrefix.length; i++) {
        h ^= idPrefix.charCodeAt(i);
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
    const base = source.length > 0 ? source : [{
      id: `${idPrefix}-fallback-1`, type: 'multiple-choice' as const,
      question: 'Select the correct answer', questionFr: 'Sélectionnez la bonne réponse',
      correctAnswer: 'A', options: ['A', 'B', 'C', 'D']
    }];
    const out: Exercise[] = [...source];
    let i = 0;
    while (out.length < desiredCount) {
      const template = base[i % base.length];
      out.push({
        ...template, id: `${idPrefix}-p${out.length + 1}`,
        question: template.question ? `${template.question} (Review)` : template.question,
        questionFr: template.questionFr ? `${template.questionFr} (Révision)` : template.questionFr,
      });
      i++;
    }
    return out;
  };

  const startLessonWithTwentyQuestions = useCallback((lesson: Lesson) => {
    const patchedLesson: Lesson = {
      ...lesson,
      exercises: ensureExerciseCount(lesson.exercises || [], 20, lesson.id)
    };
    onStartLesson(patchedLesson);
  }, [onStartLesson]);

  const handleSidebarClick = (item: typeof activeSidebarItem) => {
    setActiveSidebarItem(item);
    if (item !== 'learn' && onNavigate) onNavigate(item as any);
  };

  // Find the first active (unlocked, incomplete) lesson globally for the floating mascot
  const getFirstActiveLessonId = (): string | null => {
    for (const stage of stages) {
      for (const lesson of (stage.lessons || [])) {
        if (isLessonUnlocked(lesson) && !isLessonCompleted(lesson.id)) return lesson.id;
      }
    }
    return null;
  };
  const firstActiveLessonId = getFirstActiveLessonId();

  const xpPercent = Math.min(100, (progress.xp ?? 0) % 100);
  const dailyXP = Math.min((progress.xp ?? 0) % 50, 50);
  const dailyXPPercent = (dailyXP / 50) * 100;
  const userName = (userData as any)?.username || (isGuest ? (isEnglish ? 'Guest' : 'Invité') : 'You');
  const initials = userName.slice(0, 2).toUpperCase();
  const showRain = currentLanguageId ? RAIN_LANGUAGES.has(currentLanguageId) : false;

  const getStageForIndex = (stageIndex: number): Stage => {
    const real = stages[stageIndex];
    if (real) return real;
    return {
      id: `${currentLanguageId || 'lang'}-stage-${stageIndex + 1}`,
      stageNumber: stageIndex + 1,
      title: isEnglish ? 'Coming soon' : 'Bientôt',
      titleFr: 'Bientôt',
      color: 'from-[#F4A300] to-[#FF9500]',
      lessons: []
    } as Stage;
  };

  const STAGE_COLORS = ['#f4a300','#b00020','#2dc653','#5bc8ff','#9b59b6','#e67e22','#35b729'];

  const NAV_ITEMS = [
    { key: 'learn',       icon: <Home className="w-5 h-5" />,        label: isEnglish ? 'Learn'        : 'Apprendre'   },
    { key: 'leaderboard', icon: <TrophyIcon className="w-5 h-5" />,  label: isEnglish ? 'Leaderboards' : 'Classements'  },
    { key: 'quests',      icon: <Star className="w-5 h-5" />,        label: isEnglish ? 'Quests'       : 'Quêtes'       },
    { key: 'shop',        icon: <Store className="w-5 h-5" />,       label: isEnglish ? 'Shop'         : 'Boutique'     },
    { key: 'profile',     icon: <User className="w-5 h-5" />,        label: isEnglish ? 'Profile'      : 'Profil'       },
  ] as const;

  if (!stages || stages.length === 0) {
    return (
      <div style={{ minHeight:'100svh', display:'flex', alignItems:'center', justifyContent:'center', background:'#111' }}>
        <div style={{ textAlign:'center' }}>
          <div style={{ fontSize:'4rem' }}>📚</div>
          <p style={{ color:'#2dc653', fontFamily:'Nunito, sans-serif', fontSize:'1.2rem', marginTop:16 }}>
            {isEnglish ? 'Lessons Coming Soon!' : 'Leçons à venir!'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="lp-shell">
      {showRain && <RainCanvas intensity="heavy" />}

      {/* ═══════════════════════════════════
          LEFT SIDEBAR
      ═══════════════════════════════════ */}
      <nav className="lp-sidebar">
        {/* Logo + brand */}
        <div className="lp-logo-wrap">
          <div className="lp-mascot-anim" title="Afroslang">
            {logoError ? (
              <span style={{ fontSize: 32 }}>🐦</span>
            ) : (
              <img
                src="/Afroslang.png"
                alt="Afroslang"
                onError={() => setLogoError(true)}
              />
            )}
          </div>
          <div className="lp-logo-text">
            <span className="lp-logo-title">Afroslang</span>
            <span className="lp-logo-sub">Learn{langName}</span>
          </div>
        </div>

        {/* Nav items */}
        {NAV_ITEMS.map(item => (
          <button
            key={item.key}
            className={`lp-nav-item${activeSidebarItem === item.key ? ' lp-nav-item--active' : ''}`}
            onClick={() => handleSidebarClick(item.key as any)}
          >
            <span className="lp-nav-icon">{item.icon}</span>
            <span className="lp-nav-label">{item.label}</span>
          </button>
        ))}

        <button
          className={`lp-nav-item lp-nav-item--bottom${activeSidebarItem === 'settings' ? ' lp-nav-item--active' : ''}`}
          onClick={() => handleSidebarClick('settings')}
        >
          <span className="lp-nav-icon"><Settings className="w-5 h-5" /></span>
          <span className="lp-nav-label">{isEnglish ? 'More' : 'Plus'}</span>
        </button>
      </nav>

      {/* ═══════════════════════════════════
          CENTER COLUMN
      ═══════════════════════════════════ */}
      <div className="lp-center">

        {/* Top bar */}
        <header className="lp-topbar">
          {/* Brand (mobile) */}
          <div className="lp-topbar-brand" onClick={onBackToLanguageSelect}>
            {logoError ? (
              <span style={{ fontSize:'1.2rem' }}>🐦</span>
            ) : (
              <img className="lp-topbar-logo" src="/Afroslang.png" alt="" onError={() => setLogoError(true)} />
            )}
            <div className="lp-topbar-lang">
              {currentLanguage?.flags?.[0] && <FlagIcon country={currentLanguage.flags[0]} size="sm" />}
              <span className="lp-topbar-langname">{langName}</span>
            </div>
          </div>

          {/* Stats */}
          <div className="lp-topbar-stats">
            <div className="lp-stat lp-stat--fire">
              <span className="lp-flame">🔥</span>
              <span>{progress.streak ?? 0}</span>
            </div>
            <div className="lp-stat lp-stat--xp">
              <span>⭐</span>
              <span>{progress.xp ?? 0}</span>
            </div>
            {/* Currency icon uses afroslang-logo.png */}
            <div className="lp-stat lp-stat--gem">
              {currencyError ? (
                <span>💎</span>
              ) : (
                <img
                  className="lp-currency-icon"
                  src="/afroslang-logo.png"
                  alt="coins"
                  onError={() => setCurrencyError(true)}
                />
              )}
              <span>{userData?.subscription?.active ? '∞' : progress.lessonsCompleted ?? 0}</span>
            </div>
            <div className="lp-stat lp-stat--heart">
              <span>❤️</span>
              <span>{userData?.subscription?.active ? '∞' : progress.hearts}</span>
            </div>
          </div>
        </header>

        {/* Lesson path */}
        <main className="lp-main" ref={mainRef}>
          <div className="lp-path-col">

            {Array.from({ length: 7 }).map((_, stageIndex) => {
              const stage = getStageForIndex(stageIndex);
              const stageTitle = isEnglish ? stage.title : (stage.titleFr || stage.title);
              const accent = STAGE_COLORS[stageIndex] ?? '#2dc653';
              const lessons = stage.lessons || [];
              const isRealStage = stageIndex < stages.length;

              return (
                <div key={stage.id} className="lp-stage-block">

                  {/* Section banner */}
                  <div className="lp-section-banner" style={{ '--accent': accent } as React.CSSProperties}>
                    <div className="lp-banner-left">
                      <small>
                        {isEnglish
                          ? `← SECTION 1, UNIT ${stageIndex + 1}`
                          : `← SECTION 1, UNITÉ ${stageIndex + 1}`}
                      </small>
                      <h2>{stageTitle}</h2>
                    </div>
                    <button
                      className="lp-guidebook-btn"
                      onClick={() => setGuidebookStage(guidebookStage === stageIndex ? null : stageIndex)}
                      title={isEnglish ? 'Guidebook' : 'Guide'}
                    >
                      📖 {isEnglish ? 'GUIDEBOOK' : 'GUIDE'}
                    </button>
                  </div>

                  {/* Guidebook (cultural fact card) */}
                  {guidebookStage === stageIndex && currentLanguageId && (
                    <div className="lp-guidebook-panel">
                      <MascotFactCard languageId={currentLanguageId} isEnglish={isEnglish} />
                    </div>
                  )}

                  {/* Zigzag path nodes */}
                  <div className="lp-path">
                    {Array.from({ length: 7 }).map((_, slotIndex) => {
                      const lesson = lessons[slotIndex];
                      const isReal = !!lesson && isRealStage;
                      const completed = isReal && isLessonCompleted(lesson.id);
                      const unlocked = isReal && isLessonUnlocked(lesson);
                      const isFirstActive = isReal && lesson.id === firstActiveLessonId;
                      const heartsBlocked = progress.hearts === 0 && !isGuest && !userData?.subscription?.active;

                      const isSpecialChest = slotIndex === CHEST_SLOT;
                      const isSpecialTrophy = slotIndex === TROPHY_SLOT;

                      let nodeState: 'active' | 'done' | 'locked' | 'soon' = 'soon';
                      if (!isReal) nodeState = 'soon';
                      else if (completed) nodeState = 'done';
                      else if (unlocked && !heartsBlocked) nodeState = 'active';
                      else nodeState = 'locked';

                      let nodeIcon = '⭐';
                      if (isSpecialChest) nodeIcon = nodeState === 'done' ? '🎁' : '🎁';
                      else if (isSpecialTrophy) nodeIcon = nodeState === 'done' ? '🏆' : '🏆';
                      else if (nodeState === 'done') nodeIcon = '✅';
                      else if (nodeState === 'locked') nodeIcon = '🔒';
                      else if (nodeState === 'soon') nodeIcon = '⏳';

                      const offset = NODE_OFFSETS[slotIndex] ?? 'none';
                      const title = isReal
                        ? (isEnglish ? lesson.title : (lesson.titleFr || lesson.title))
                        : (isEnglish ? `Lesson ${slotIndex + 1}` : `Leçon ${slotIndex + 1}`);

                      return (
                        <div key={slotIndex} className="lp-node-row">
                          {/* Connector from previous node */}
                          {slotIndex > 0 && (
                            <div className={`lp-connector lp-connector--${offset === 'none' ? 'straight' : offset}`} />
                          )}

                          <div className={`lp-node-wrap lp-node-offset--${offset}`}>
                            {/* START badge on first active node */}
                            {isFirstActive && (
                              <div className="lp-start-badge">
                                {isEnglish ? 'START' : 'DÉBUT'}
                              </div>
                            )}

                            {/* Floating mascot next to first active node */}
                            {isFirstActive && (
                              <div className="lp-path-mascot">
                                {logoError ? (
                                  <span style={{ fontSize: 36 }}>🐦</span>
                                ) : (
                                  <img src="/Afroslang.png" alt="" onError={() => setLogoError(true)} />
                                )}
                              </div>
                            )}

                            <button
                              className={`lp-node lp-node--${nodeState}${isSpecialChest || isSpecialTrophy ? ' lp-node--special' : ''}`}
                              style={{ '--node-accent': accent } as React.CSSProperties}
                              disabled={nodeState === 'locked' || nodeState === 'soon'}
                              onClick={() => {
                                if (isReal && unlocked && !heartsBlocked) {
                                  startLessonWithTwentyQuestions(lesson);
                                }
                              }}
                              title={title}
                              aria-label={`${title} — ${nodeState}`}
                            >
                              <span className="lp-node-icon">{nodeIcon}</span>
                            </button>

                            {/* Tooltip label below node */}
                            <div className="lp-node-label">{title}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

          </div>
        </main>
      </div>

      {/* ═══════════════════════════════════
          RIGHT SIDEBAR
      ═══════════════════════════════════ */}
      <aside className="lp-right">

        {/* Daily XP widget */}
        <div className="lp-widget">
          <h3 className="lp-widget-title">⭐ {isEnglish ? 'Daily XP' : 'XP du jour'}</h3>
          <div className="lp-xp-row">
            <div className="lp-xp-bar">
              <div className="lp-xp-fill" style={{ width: `${dailyXPPercent}%` }} />
            </div>
            <span className="lp-xp-label">{dailyXP} / 50</span>
          </div>
        </div>

        {/* Profile strip */}
        <div className="lp-widget lp-widget--profile">
          <div className="lp-r-avatar">{initials}</div>
          <div className="lp-r-info">
            <div className="lp-r-name">{userName}</div>
            <div className="lp-r-level">
              {isEnglish ? `Level ${progress.level ?? 1}` : `Niveau ${progress.level ?? 1}`}
            </div>
            <div className="lp-r-xpbar">
              <div className="lp-r-xpfill" style={{ width: `${xpPercent}%` }} />
            </div>
          </div>
          <span className="lp-r-xp-badge">⚡ {progress.xp ?? 0}</span>
        </div>

        {/* Leaderboard unlock / mini leaderboard */}
        {(progress.lessonsCompleted ?? 0) < 10 ? (
          <div className="lp-widget">
            <h3 className="lp-widget-title">🏆 {isEnglish ? 'Unlock Leaderboards!' : 'Débloquez les classements!'}</h3>
            <p className="lp-widget-sub">
              {isEnglish
                ? `Complete ${10 - (progress.lessonsCompleted ?? 0)} more lessons to start competing`
                : `Terminez ${10 - (progress.lessonsCompleted ?? 0)} leçons de plus`}
            </p>
          </div>
        ) : (
          <div className="lp-widget">
            <h3 className="lp-widget-title">
              🔥 {isEnglish ? 'Top Slangers' : 'Top Apprenants'}
              <button className="lp-widget-action" onClick={() => handleSidebarClick('leaderboard')}>
                {isEnglish ? 'VIEW ALL' : 'VOIR TOUT'} <ChevronRight className="w-3 h-3" style={{ display:'inline' }} />
              </button>
            </h3>
            {[
              { rank: 1, avatar: '🦅', name: 'Oga_Tunde',    xp: 340 },
              { rank: 2, avatar: '🦁', name: 'Sisi_Lagos',   xp: 290 },
              { rank: 3, avatar: '🐆', name: 'Nairobi_G',    xp: 210 },
              { rank: 4, avatar: '🦊', name: 'Accra_Vibes',  xp: 180 },
            ].map(row => (
              <div key={row.rank} className="lp-lb-row">
                <span className={`lp-lb-rank${row.rank === 1 ? ' lp-lb-rank--gold' : ''}`}>{row.rank}</span>
                <span className="lp-lb-avatar">{row.avatar}</span>
                <span className="lp-lb-name">{row.name}</span>
                <span className="lp-lb-xp">{row.xp} XP</span>
              </div>
            ))}
          </div>
        )}

        {/* Daily quests */}
        <div className="lp-widget">
          <h3 className="lp-widget-title">
            🎯 {isEnglish ? 'Daily Quests' : 'Quêtes du jour'}
            <button className="lp-widget-action" onClick={() => handleSidebarClick('quests')}>
              {isEnglish ? 'VIEW ALL' : 'TOUT VOIR'}
            </button>
          </h3>
          <div className="lp-quest-item">
            <span className="lp-quest-icon">⚡</span>
            <div className="lp-quest-body">
              <strong>{isEnglish ? 'Earn 10 XP' : 'Gagner 10 XP'}</strong>
              <div className="lp-quest-bar">
                <div className="lp-quest-fill" style={{ width: `${Math.min(100, ((progress.xp ?? 0) % 10) * 10)}%` }} />
              </div>
              <span className="lp-quest-label">{Math.min((progress.xp ?? 0) % 10, 10)} / 10</span>
            </div>
            <span className="lp-quest-reward">🎖️</span>
          </div>
        </div>

        {/* Sign up CTA for guests */}
        {(isGuest || !user) && (
          <div className="lp-widget">
            <h3 className="lp-widget-title">🔐 {isEnglish ? 'Save Your Progress!' : 'Sauvegardez vos progrès!'}</h3>
            <button className="lp-btn-primary" onClick={onSignUp ?? (() => handleSidebarClick('profile'))}>
              {isEnglish ? 'CREATE PROFILE' : 'CRÉER UN PROFIL'}
            </button>
            <button className="lp-btn-secondary" onClick={onSignIn ?? (() => handleSidebarClick('profile'))}>
              {isEnglish ? 'SIGN IN' : 'SE CONNECTER'}
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="lp-footer-links">
          <a href="#" onClick={e => e.preventDefault()}>About</a>
          <a href="#" onClick={e => e.preventDefault()}>Blog</a>
          <a href="#" onClick={e => e.preventDefault()}>Privacy</a>
          <a href="#" onClick={e => e.preventDefault()}>Terms</a>
        </div>
      </aside>

      {/* ═══════════════════════════════════
          MOBILE BOTTOM NAV
      ═══════════════════════════════════ */}
      <nav className="lp-bottom-nav">
        {NAV_ITEMS.map(item => (
          <button
            key={item.key}
            className={`lp-bnav-btn${activeSidebarItem === item.key ? ' lp-bnav-btn--active' : ''}`}
            onClick={() => handleSidebarClick(item.key as any)}
          >
            {item.icon}
            <span className="lp-bnav-label">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
