import { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { InterfaceLanguage, Lesson } from '../../types';
import { X, Heart, CheckCircle2, XCircle, Lightbulb, RotateCcw, Home } from 'lucide-react';
import { checkIgboAnswer } from '../../utils/igboTextUtils';
import { HeartsTimer } from '../../components/ui/HeartsTimer';
import { HeartsOutModal } from '../../components/ui/HeartsOutModal';
import { TrialOfferModal } from '../../components/ui/TrialOfferModal';
import { GuestLimitModal } from '../../components/ui/GuestLimitModal';
import { HeartsData, updateHearts, updateGuestHearts } from '../../utils/heartsTimer';
import { culturalFacts } from '../../data/culturalFacts';
import {
  extractTeachVocab,
  buildEnrichedQueue,
  EnrichedExercise,
} from './lessonUtils';
import { TeachMode, PreviewPhase } from './IntroPhases';
import { FlashcardExercise, AudioMatchExercise, WordOrderExercise } from './ExerciseTypes';
import { CulturalCardExercise, ToneTrainerExercise } from './EnrichedExercises';
import { ConversationExercise, StoryExercise } from './AdvancedExercises';
import { RainCanvas } from '../../components/rain/RainCanvas';
import './LessonPremium.css';

// ── Phase type ────────────────────────────────────────────────────────────────

type LessonPhase = 'intro' | 'teach' | 'preview' | 'quiz';

// ── Props ─────────────────────────────────────────────────────────────────────

interface LessonScreenProps {
  interfaceLanguage: InterfaceLanguage;
  lesson: Lesson;
  languageName: string;
  languageId: string;
  hearts: number;
  heartsData?: HeartsData;
  isSubscribed?: boolean;
  xpBoostActive?: boolean;
  userId?: string;
  userName?: string;
  isGuest?: boolean;
  onComplete: (xpEarned: number, heartsLost: number, heartsGained: number) => void;
  onExit: () => void;
  onBackToLanguageSelect: () => void;
  onGoToSignUp?: () => void;
  onGoToSubscription?: () => void;
}

// ── Component ─────────────────────────────────────────────────────────────────

export function LessonScreen({
  interfaceLanguage,
  lesson,
  languageName,
  languageId,
  hearts,
  heartsData,
  isSubscribed = false,
  xpBoostActive = false,
  userId,
  userName = 'Friend',
  isGuest = false,
  onComplete,
  onExit,
  onBackToLanguageSelect,
  onGoToSignUp,
  onGoToSubscription,
}: LessonScreenProps) {
  const isEnglish = interfaceLanguage === 'en';

  // ── Lesson phase ───────────────────────────────────────────────────────────
  const [lessonPhase, setLessonPhase] = useState<LessonPhase>('intro');

  // ── Vocab for teach/preview phases ────────────────────────────────────────
  const teachVocab = useMemo(() => extractTeachVocab(lesson.exercises), [lesson.exercises]);

  // ── Enriched exercise queue ───────────────────────────────────────────────
  const facts = culturalFacts[languageId] ?? [];

  // Stable seed derived from lesson id
  const lessonSeed = useMemo(() => {
    let h = 0;
    for (let i = 0; i < lesson.id.length; i++) {
      h = (Math.imul(31, h) + lesson.id.charCodeAt(i)) | 0;
    }
    return Math.abs(h);
  }, [lesson.id]);

  const enrichedQueue = useMemo(
    () => buildEnrichedQueue(lesson.exercises, languageId, facts, lesson.type, lessonSeed, userName, lesson.title),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lesson.id, userName],
  );

  // ── Quiz state ────────────────────────────────────────────────────────────
  const [exerciseQueue, setExerciseQueue] = useState<EnrichedExercise[]>(() =>
    lesson.exercises.length > 0 ? enrichedQueue.map(ex => ({ ...ex })) : [],
  );

  const [currentExercise, setCurrentExercise] = useState<EnrichedExercise | null>(
    exerciseQueue.length > 0 ? exerciseQueue[0] : null,
  );

  // Only count non-enriched exercises toward the score
  const totalQuestions = useMemo(
    () => enrichedQueue.filter(ex => !ex.isEnriched).length,
    [enrichedQueue],
  );

  const [correctAnswers,    setCorrectAnswers]    = useState(0);
  const [userAnswer,        setUserAnswer]        = useState('');
  const [showFeedback,      setShowFeedback]      = useState(false);
  const [isCorrect,         setIsCorrect]         = useState(false);
  const [totalHeartsLost,   setTotalHeartsLost]   = useState(0);
  const [totalHeartsGained, setTotalHeartsGained] = useState(0);
  const [currentHearts,     setCurrentHearts]     = useState(hearts);
  const [showHeartsOutModal,  setShowHeartsOutModal]  = useState(false);
  const [showGuestLimitModal, setShowGuestLimitModal] = useState(false);
  const [showTrialOffer,      setShowTrialOffer]      = useState(false);

  // Stage number for intro eyebrow
  const stageNumber = useMemo(() => {
    const m = lesson.stageId.match(/stage-(\d+)/);
    return m ? parseInt(m[1], 10) : 1;
  }, [lesson.stageId]);

  // ── Guest limit check ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!isGuest) return;
    const guestProgress = JSON.parse(localStorage.getItem('afroslang_guest_progress') || '{}');
    const completed = Object.values(guestProgress.languages || {}).reduce(
      (total: number, lang: unknown) => total + ((lang as { completedLessons?: string[] }).completedLessons?.length ?? 0),
      0,
    );
    if (completed >= 3) setShowGuestLimitModal(true);
  }, [isGuest]);

  // Reset answer when exercise changes
  useEffect(() => {
    setUserAnswer('');
    setShowFeedback(false);
  }, [currentExercise?.id]);

  // Shuffle options deterministically per exercise
  const shuffledOptions = useMemo(() => {
    if (!currentExercise) return [];
    const opts =
      !isEnglish && currentExercise.optionsFr
        ? currentExercise.optionsFr
        : currentExercise.options ?? [];
    const arr = [...opts];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentExercise?.id, isEnglish]);

  // ── Helpers ───────────────────────────────────────────────────────────────

  const getCorrectAnswer = () =>
    !isEnglish && currentExercise?.correctAnswerFr
      ? currentExercise.correctAnswerFr
      : currentExercise?.correctAnswer ?? '';

  const getLessonIcon = () =>
    ({ vocabulary: '📚', grammar: '📝', writing: '✍️', culture: '🎭' }[lesson.type]);

  const progress = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;

  const isRedemption =
    (currentExercise?.wasWrong ?? false) && !(currentExercise?.hasRetried ?? false);

  // ── Heart / scoring helpers ───────────────────────────────────────────────

  const loseHeart = () => {
    setTotalHeartsLost(prev => {
      const newTotal = prev + 1;
      // Show trial offer on the very first heart lost (not subscribed, not guest)
      if (newTotal === 1 && !isSubscribed && !isGuest) {
        setShowTrialOffer(true);
      }
      return newTotal;
    });
    if (currentHearts > 0) {
      setCurrentHearts(prev => Math.max(0, prev - 1));
      if (userId && !isGuest) updateHearts(userId, 1);
      else if (isGuest) updateGuestHearts(1);
    }
  };

  const gainHalfHeart = () => {
    setTotalHeartsGained(prev => prev + 0.5);
    setCurrentHearts(prev => Math.min(5, prev + 0.5));
  };

  // ── Submit / Next ─────────────────────────────────────────────────────────

  const handleSubmit = () => {
    if (!isSubscribed && currentHearts <= 0) {
      setShowHeartsOutModal(true);
      return;
    }
    const correctAnswer = getCorrectAnswer();
    const correct = checkIgboAnswer(userAnswer, correctAnswer);
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      if (!currentExercise?.isEnriched) setCorrectAnswers(prev => prev + 1);
      if (isRedemption) gainHalfHeart();
    } else {
      if (!isSubscribed) {
        if (isRedemption || !currentExercise?.wasWrong) loseHeart();
      }
      const wrongExercise: EnrichedExercise = {
        ...currentExercise!,
        wasWrong: true,
        hasRetried: false,
      };
      setExerciseQueue(prev => {
        const q = [...prev];
        const pos = q.length > 2 ? Math.floor(Math.random() * (q.length - 2)) + 2 : q.length;
        q.splice(pos, 0, wrongExercise);
        return q;
      });
    }
  };

  const advanceQueue = () => {
    const newQueue = exerciseQueue.slice(1);
    setExerciseQueue(newQueue);
    if (newQueue.length > 0) {
      setCurrentExercise(newQueue[0]);
      setUserAnswer('');
      setShowFeedback(false);
    } else {
      const xpPerCorrect = Math.floor(lesson.xpReward / Math.max(totalQuestions, 1));
      const baseXp       = Math.max(correctAnswers * xpPerCorrect, 5);
      const perfectBonus = totalHeartsLost === 0 ? 5 : 0;
      const xpEarned     = xpBoostActive ? (baseXp + perfectBonus) * 2 : baseXp + perfectBonus;
      onComplete(xpEarned, totalHeartsLost, totalHeartsGained);
    }
  };

  const handleNext = () => advanceQueue();

  // ── Word-order answer ─────────────────────────────────────────────────────
  const handleWordOrderAnswer = (assembled: string) => {
    if (!isSubscribed && currentHearts <= 0) {
      setShowHeartsOutModal(true);
      return;
    }
    const correctAnswer = getCorrectAnswer();
    const correct = assembled.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
    setUserAnswer(assembled);
    setIsCorrect(correct);
    setShowFeedback(true);
    if (correct) {
      if (!currentExercise?.isEnriched) setCorrectAnswers(prev => prev + 1);
      if (isRedemption) gainHalfHeart();
    } else {
      if (!isSubscribed) loseHeart();
      const wrongExercise: EnrichedExercise = { ...currentExercise!, wasWrong: true, hasRetried: false };
      setExerciseQueue(prev => {
        const q = [...prev];
        const pos = q.length > 2 ? Math.floor(Math.random() * (q.length - 2)) + 2 : q.length;
        q.splice(pos, 0, wrongExercise);
        return q;
      });
    }
  };

  // ── Hearts renderer ───────────────────────────────────────────────────────
  const renderHearts = () => {
    if (isSubscribed) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <div style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#b00020' }}>
            <Heart style={{ width: 16, height: 16, fill: 'white', color: 'white' }} />
          </div>
          <span style={{ fontSize: '1.1rem', color: '#fff', fontFamily: "'Times New Roman', Georgia, serif" }}>∞</span>
        </div>
      );
    }
    const fullHearts   = Math.floor(currentHearts);
    const hasHalfHeart = currentHearts % 1 !== 0;
    return Array.from({ length: 5 }, (_, i) => {
      const isFull = i < fullHearts;
      const isHalf = i === fullHearts && hasHalfHeart;
      return (
        <div key={i} style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', background: isFull || isHalf ? '#b00020' : 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
          {isHalf ? (
            <div style={{ position: 'relative', width: 16, height: 16 }}>
              <Heart style={{ position: 'absolute', width: 16, height: 16, color: 'rgba(255,255,255,0.2)' }} />
              <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' }}>
                <Heart style={{ width: 16, height: 16, fill: 'white', color: 'white' }} />
              </div>
            </div>
          ) : (
            <Heart style={{ width: 16, height: 16, fill: isFull ? 'white' : 'none', color: isFull ? 'white' : 'rgba(255,255,255,0.25)' }} />
          )}
        </div>
      );
    });
  };

  // ══════════════════════════════════════════════════════════════════════════
  // PHASE RENDERING
  // ══════════════════════════════════════════════════════════════════════════

  // ── Phase 1: Intro card ───────────────────────────────────────────────────
  if (lessonPhase === 'intro') {
    return (
      <div className="ls-intro-overlay">
        <div className="ls-intro-card">
          <div className="ls-intro-eyebrow">
            {isEnglish
              ? `Stage ${stageNumber} · Lesson ${lesson.lessonNumber}`
              : `Étape ${stageNumber} · Leçon ${lesson.lessonNumber}`}
          </div>

          <h1 className="ls-intro-title">
            {isEnglish ? lesson.title : lesson.titleFr}
          </h1>

          <span className="ls-intro-icon">{getLessonIcon()}</span>

          <p className="ls-intro-desc">
            {isEnglish
              ? `Learn essential ${lesson.type} in ${languageName}`
              : `Apprenez ${lesson.type === 'vocabulary' ? 'le vocabulaire' : lesson.type === 'grammar' ? 'la grammaire' : lesson.type === 'writing' ? "l'écriture" : 'la culture'} en ${languageName}`}
          </p>
          <p className="ls-intro-count">
            {lesson.exercises.length} {isEnglish ? 'exercises' : 'exercices'}
          </p>

          {/* Step indicator — all 3 steps shown, step 1 active */}
          <div className="ls-intro-progress">
            <div className="ls-intro-prog-bar ls-intro-prog-bar--active" />
            <div className="ls-intro-prog-bar" />
            <div className="ls-intro-prog-bar" />
          </div>
          <p className="ls-intro-step-label">
            {isEnglish ? 'Step 1 of 3 — Overview' : 'Étape 1 sur 3 — Aperçu'}
          </p>

          <div className="ls-intro-actions">
            <button className="ls-intro-skip" onClick={() => setLessonPhase('quiz')}>
              {isEnglish ? 'Skip intro' : 'Passer l\'intro'}
            </button>
            <button
              className="ls-btn-check"
              style={{ flex: 1 }}
              onClick={() => setLessonPhase(teachVocab.length > 0 ? 'teach' : 'quiz')}
            >
              {isEnglish ? 'NEXT →' : 'SUIVANT →'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Phase 2: Teach mode ───────────────────────────────────────────────────
  if (lessonPhase === 'teach') {
    return (
      <TeachMode
        vocab={teachVocab}
        interfaceLanguage={interfaceLanguage}
        languageName={languageName}
        onComplete={() => setLessonPhase('preview')}
        onSkip={() => setLessonPhase('quiz')}
      />
    );
  }

  // ── Phase 3: Preview flash ────────────────────────────────────────────────
  if (lessonPhase === 'preview') {
    return (
      <PreviewPhase
        vocab={teachVocab}
        interfaceLanguage={interfaceLanguage}
        languageName={languageName}
        onComplete={() => setLessonPhase('quiz')}
      />
    );
  }

  // ── No exercises guard ────────────────────────────────────────────────────
  if (!currentExercise) {
    return (
      <div className="ls-root" style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', padding: '2rem', maxWidth: 400 }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📚</div>
          <h2 style={{ fontFamily: "'Times New Roman', Georgia, serif", color: '#fff', marginBottom: '0.75rem' }}>
            {isEnglish ? 'No lessons available yet' : 'Aucune leçon disponible'}
          </h2>
          <button onClick={onExit} className="ls-btn-check">
            {isEnglish ? '← Go Back' : '← Retour'}
          </button>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════
  // QUIZ PHASE
  // ══════════════════════════════════════════════════════════════════════════

  const progressRatio = progress / 100;
  const dimAlpha = Math.max(0, 0.5 * (1 - progressRatio));
  const rainOpacity = Math.max(0, 1 - progressRatio * 1.5);

  const renderHeader = () => (
    <>
      {createPortal(
        <>
          <div style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none', background: `rgba(0,0,0,${dimAlpha})`, transition: 'background 0.8s ease' }} />
          <div style={{ position: 'fixed', inset: 0, zIndex: 2, pointerEvents: 'none', opacity: rainOpacity, transition: 'opacity 1s ease' }}>
            <RainCanvas intensity="heavy" />
          </div>
        </>,
        document.body
      )}
      <div className="ls-header">
        <div className="ls-header-inner">
          <button onClick={onExit} className="ls-exit-btn" aria-label="Exit">
            <X style={{ width: 18, height: 18 }} strokeWidth={2.5} />
          </button>
          <div className="ls-progress-track">
            <div className="ls-progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="ls-counter">{correctAnswers}/{totalQuestions}</div>
          <div style={{ display: 'flex', gap: 3 }}>
            {heartsData
              ? <HeartsTimer heartsData={heartsData} isSubscribed={isSubscribed} />
              : renderHearts()}
          </div>
          <button onClick={onBackToLanguageSelect} className="ls-home-btn" aria-label="Home">
            <Home style={{ width: 18, height: 18 }} strokeWidth={2} />
          </button>
        </div>
      </div>
    </>
  );

  // ── Enriched non-quiz exercises bypass normal submit/next flow ─────────────

  // Cultural card — just show, then advance
  if (currentExercise.type === 'cultural-card') {
    return (
      <div className="ls-root">
        <div className="ls-header">
          <div className="ls-header-inner">
            <button onClick={onExit} className="ls-exit-btn"><X style={{ width: 18, height: 18 }} strokeWidth={2.5} /></button>
            <div className="ls-progress-track"><div className="ls-progress-fill" style={{ width: `${progress}%` }} /></div>
            <div className="ls-counter">{correctAnswers}/{totalQuestions}</div>
            <div style={{ display: 'flex', gap: 3 }}>{heartsData ? <HeartsTimer heartsData={heartsData} isSubscribed={isSubscribed} /> : renderHearts()}</div>
            <button onClick={onBackToLanguageSelect} className="ls-home-btn"><Home style={{ width: 18, height: 18 }} /></button>
          </div>
        </div>
        <div className="ls-body">
          <CulturalCardExercise
            exercise={currentExercise}
            interfaceLanguage={interfaceLanguage}
            onContinue={advanceQueue}
          />
        </div>
      </div>
    );
  }

  // Conversation — manages its own turn state, calls back when done
  if (currentExercise.type === 'conversation') {
    return (
      <div className="ls-root">
        {renderHeader()}
        <div className="ls-body">
          <ConversationExercise
            exercise={currentExercise}
            interfaceLanguage={interfaceLanguage}
            onComplete={(allCorrect) => {
              if (!allCorrect && !isSubscribed) loseHeart();
              advanceQueue();
            }}
          />
        </div>
      </div>
    );
  }

  // Flashcard (enriched) — manages its own flip/rate
  if (currentExercise.type === 'flashcard') {
    return (
      <div className="ls-root">
        <div className="ls-header">
          <div className="ls-header-inner">
            <button onClick={onExit} className="ls-exit-btn"><X style={{ width: 18, height: 18 }} strokeWidth={2.5} /></button>
            <div className="ls-progress-track"><div className="ls-progress-fill" style={{ width: `${progress}%` }} /></div>
            <div className="ls-counter">{correctAnswers}/{totalQuestions}</div>
            <div style={{ display: 'flex', gap: 3 }}>{heartsData ? <HeartsTimer heartsData={heartsData} isSubscribed={isSubscribed} /> : renderHearts()}</div>
            <button onClick={onBackToLanguageSelect} className="ls-home-btn"><Home style={{ width: 18, height: 18 }} /></button>
          </div>
        </div>
        <div className="ls-body">
          <FlashcardExercise
            exercise={currentExercise}
            interfaceLanguage={interfaceLanguage}
            callbacks={{
              onCorrect: advanceQueue,
              onWrong: () => {
                if (!isSubscribed) loseHeart();
                advanceQueue();
              },
            }}
          />
        </div>
      </div>
    );
  }

  // ── Story exercise ─────────────────────────────────────────────────────────
  if (currentExercise.type === 'story') {
    return (
      <div className="ls-root">
        {renderHeader()}
        <div className="ls-body">
          <StoryExercise
            exercise={currentExercise}
            interfaceLanguage={interfaceLanguage}
            userAnswer={userAnswer}
            showFeedback={showFeedback}
            isCorrect={isCorrect}
            onSelect={(opt) => {
              setUserAnswer(opt);
              const correct = checkIgboAnswer(opt, getCorrectAnswer());
              setIsCorrect(correct);
              setShowFeedback(true);
              if (correct) {
                if (!currentExercise.isEnriched) setCorrectAnswers(p => p + 1);
              } else {
                if (!isSubscribed) loseHeart();
              }
            }}
          />
          {showFeedback && (
            <div className={`ls-feedback${isCorrect ? ' ls-feedback--correct' : ' ls-feedback--wrong'}`} style={{ marginTop: 12 }}>
              <div className="ls-feedback-icon">
                {isCorrect ? <CheckCircle2 style={{ width: 22, height: 22, color: '#4ade80' }} /> : <XCircle style={{ width: 22, height: 22, color: '#fca5a5' }} />}
              </div>
              <div className="ls-feedback-body">
                <p className="ls-feedback-title">{isCorrect ? (isEnglish ? 'CORRECT!' : 'CORRECT !') : (isEnglish ? 'Correct answer:' : 'Bonne réponse :')}</p>
                {!isCorrect && <p className="ls-feedback-answer">{getCorrectAnswer()}</p>}
              </div>
            </div>
          )}
        </div>
        {showFeedback && (
          <div className="ls-bottom"><div className="ls-bottom-inner">
            <button onClick={handleNext} className="ls-btn-next">
              {exerciseQueue.length > 1 ? (isEnglish ? 'NEXT →' : 'SUIVANT →') : (isEnglish ? 'FINISH' : 'TERMINER')}
            </button>
          </div></div>
        )}
      </div>
    );
  }

  // ── Tone trainer ───────────────────────────────────────────────────────────
  if (currentExercise.type === 'tone-trainer') {
    return (
      <div className="ls-root">
        {renderHeader()}
        <div className="ls-body">
          {xpBoostActive && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', marginBottom: '0.75rem', background: 'rgba(255,214,10,0.1)', border: '1px solid rgba(255,214,10,0.3)', borderRadius: 8, padding: '6px 14px', fontSize: '0.8rem', color: '#ffd60a', fontWeight: 'bold' }}>
              ⚡ {isEnglish ? '2× XP BOOST ACTIVE' : 'BOOST 2× XP ACTIF'}
            </div>
          )}
          <div className="ls-meta-row">
            <div className="ls-type-badge"><span>🎵</span><span>Tone Trainer</span></div>
          </div>
          <ToneTrainerExercise
            exercise={currentExercise}
            interfaceLanguage={interfaceLanguage}
            userAnswer={userAnswer}
            showFeedback={showFeedback}
            isCorrect={isCorrect}
            onSelect={(opt) => setUserAnswer(opt)}
          />
          {showFeedback && (
            <div className={`ls-feedback${isCorrect ? ' ls-feedback--correct' : ' ls-feedback--wrong'}`} style={{ marginTop: 12 }}>
              <div className="ls-feedback-icon">{isCorrect ? <CheckCircle2 style={{ width: 22, height: 22, color: '#4ade80' }} /> : <XCircle style={{ width: 22, height: 22, color: '#fca5a5' }} />}</div>
              <div className="ls-feedback-body">
                <p className="ls-feedback-title">{isCorrect ? (isEnglish ? 'CORRECT!' : 'CORRECT !') : (isEnglish ? 'Correct answer:' : 'Bonne réponse :')}</p>
                {!isCorrect && <p className="ls-feedback-answer">{getCorrectAnswer()}</p>}
              </div>
            </div>
          )}
        </div>
        <div className="ls-bottom"><div className="ls-bottom-inner">
          {!showFeedback ? (
            <button onClick={handleSubmit} disabled={!userAnswer} className="ls-btn-check">{isEnglish ? '✓ CHECK' : '✓ VÉRIFIER'}</button>
          ) : (
            <button onClick={handleNext} className="ls-btn-next">{exerciseQueue.length > 1 ? (isEnglish ? 'NEXT →' : 'SUIVANT →') : (isEnglish ? 'FINISH' : 'TERMINER')}</button>
          )}
        </div></div>
      </div>
    );
  }

  // ── Audio match ────────────────────────────────────────────────────────────
  if (currentExercise.type === 'audio-match') {
    return (
      <div className="ls-root">
        {renderHeader()}
        <div className="ls-body">
          {xpBoostActive && <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', marginBottom: '0.75rem', background: 'rgba(255,214,10,0.1)', border: '1px solid rgba(255,214,10,0.3)', borderRadius: 8, padding: '6px 14px', fontSize: '0.8rem', color: '#ffd60a', fontWeight: 'bold' }}>⚡ {isEnglish ? '2× XP BOOST ACTIVE' : 'BOOST 2× XP ACTIF'}</div>}
          <div className="ls-meta-row">
            <div className="ls-type-badge"><span>🔊</span><span>{isEnglish ? 'Listen & Match' : 'Écouter et Associer'}</span></div>
            {isRedemption && !showFeedback && <div className="ls-redemption-badge"><RotateCcw style={{ width: 12, height: 12, display: 'inline', marginRight: 4 }} />{isEnglish ? 'REDEMPTION' : 'RÉDEMPTION'}</div>}
          </div>
          <AudioMatchExercise
            exercise={currentExercise}
            interfaceLanguage={interfaceLanguage}
            shuffledOptions={shuffledOptions}
            userAnswer={userAnswer}
            showFeedback={showFeedback}
            isCorrect={isCorrect}
            onSelect={(opt) => setUserAnswer(opt)}
          />
          {showFeedback && (
            <div className={`ls-feedback${isCorrect ? ' ls-feedback--correct' : ' ls-feedback--wrong'}`}>
              <div className="ls-feedback-icon">{isCorrect ? <CheckCircle2 style={{ width: 22, height: 22, color: '#4ade80' }} /> : <XCircle style={{ width: 22, height: 22, color: '#fca5a5' }} />}</div>
              <div className="ls-feedback-body">
                <p className="ls-feedback-title">{isCorrect ? (isRedemption ? (isEnglish ? 'REDEEMED! +0.5 ♥' : 'RÉDEMPTÉ ! +0.5 ♥') : (isEnglish ? 'CORRECT!' : 'CORRECT !')) : (isEnglish ? 'Correct answer:' : 'Bonne réponse :')}</p>
                {!isCorrect && <><p className="ls-feedback-answer">{getCorrectAnswer()}</p>{!isRedemption && <p className="ls-feedback-note">{isEnglish ? "You'll get a chance to redeem yourself later." : 'Vous aurez une chance de vous racheter plus tard.'}</p>}</>}
              </div>
            </div>
          )}
        </div>
        <div className="ls-bottom"><div className="ls-bottom-inner">
          {!showFeedback ? (
            <button onClick={handleSubmit} disabled={!userAnswer} className="ls-btn-check">{isEnglish ? '✓ CHECK' : '✓ VÉRIFIER'}</button>
          ) : (
            <button onClick={handleNext} className="ls-btn-next">{exerciseQueue.length > 1 ? (isEnglish ? 'NEXT →' : 'SUIVANT →') : (isEnglish ? 'FINISH' : 'TERMINER')}</button>
          )}
        </div></div>
      </div>
    );
  }

  // ── Word order ─────────────────────────────────────────────────────────────
  if (currentExercise.type === 'word-order') {
    return (
      <div className="ls-root">
        {renderHeader()}
        <div className="ls-body">
          {xpBoostActive && <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', marginBottom: '0.75rem', background: 'rgba(255,214,10,0.1)', border: '1px solid rgba(255,214,10,0.3)', borderRadius: 8, padding: '6px 14px', fontSize: '0.8rem', color: '#ffd60a', fontWeight: 'bold' }}>⚡ {isEnglish ? '2× XP BOOST ACTIVE' : 'BOOST 2× XP ACTIF'}</div>}
          <div className="ls-meta-row">
            <div className="ls-type-badge"><span>🧩</span><span>{isEnglish ? 'Word Order' : 'Ordre des Mots'}</span></div>
            {isRedemption && !showFeedback && <div className="ls-redemption-badge"><RotateCcw style={{ width: 12, height: 12, display: 'inline', marginRight: 4 }} />{isEnglish ? 'REDEMPTION' : 'RÉDEMPTION'}</div>}
          </div>
          <div className="ls-question-box">
            <p className="ls-question-text">{isEnglish ? currentExercise.question : currentExercise.questionFr}</p>
            {isRedemption && !showFeedback && <p className="ls-redemption-hint">{isEnglish ? '♥ Get half a heart back!' : '♥ Récupérez un demi-cœur !'}</p>}
          </div>
          <WordOrderExercise
            exercise={currentExercise}
            interfaceLanguage={interfaceLanguage}
            showFeedback={showFeedback}
            isCorrect={isCorrect}
            onAnswer={handleWordOrderAnswer}
          />
          {showFeedback && (
            <div className={`ls-feedback${isCorrect ? ' ls-feedback--correct' : ' ls-feedback--wrong'}`}>
              <div className="ls-feedback-icon">{isCorrect ? <CheckCircle2 style={{ width: 22, height: 22, color: '#4ade80' }} /> : <XCircle style={{ width: 22, height: 22, color: '#fca5a5' }} />}</div>
              <div className="ls-feedback-body">
                <p className="ls-feedback-title">{isCorrect ? (isEnglish ? 'CORRECT!' : 'CORRECT !') : (isEnglish ? 'Correct order:' : 'Ordre correct :')}</p>
                {!isCorrect && <p className="ls-feedback-answer">{getCorrectAnswer()}</p>}
              </div>
            </div>
          )}
        </div>
        {showFeedback && (
          <div className="ls-bottom"><div className="ls-bottom-inner">
            <button onClick={handleNext} className="ls-btn-next">{exerciseQueue.length > 1 ? (isEnglish ? 'NEXT →' : 'SUIVANT →') : (isEnglish ? 'FINISH' : 'TERMINER')}</button>
          </div></div>
        )}
      </div>
    );
  }

  // ── Standard exercises (multiple-choice, type-answer, translate, fill-blank) ──

  return (
    <div className="ls-root">
      {renderHeader()}

      <div className="ls-body">
        {xpBoostActive && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', marginBottom: '0.75rem', background: 'rgba(255,214,10,0.1)', border: '1px solid rgba(255,214,10,0.3)', borderRadius: 8, padding: '6px 14px', fontSize: '0.8rem', color: '#ffd60a', fontWeight: 'bold' }}>
            ⚡ {isEnglish ? '2× XP BOOST ACTIVE' : 'BOOST 2× XP ACTIF'}
          </div>
        )}

        <div className="ls-meta-row">
          <div className="ls-type-badge">
            <span>{getLessonIcon()}</span>
            <span style={{ textTransform: 'capitalize' }}>{lesson.type}</span>
          </div>
          {isRedemption && !showFeedback && (
            <div className="ls-redemption-badge">
              <RotateCcw style={{ width: 12, height: 12, display: 'inline', marginRight: 4 }} />
              {isEnglish ? 'REDEMPTION' : 'RÉDEMPTION'}
            </div>
          )}
        </div>

        <div className="ls-question-box">
          <p className="ls-question-text">
            {isEnglish ? currentExercise.question : currentExercise.questionFr}
          </p>
          {isRedemption && !showFeedback && (
            <p className="ls-redemption-hint">
              {isEnglish ? '♥ Get half a heart back!' : '♥ Récupérez un demi-cœur !'}
            </p>
          )}
        </div>

        {/* Multiple choice */}
        {currentExercise.type === 'multiple-choice' && currentExercise.options && (
          <div className="ls-options-grid">
            {shuffledOptions.map((option, i) => {
              const isSelected    = userAnswer === option;
              const isCorrectOpt  = option === getCorrectAnswer();
              const showCorr      = showFeedback && isCorrectOpt;
              const showInco      = showFeedback && isSelected && !isCorrect;
              return (
                <button
                  key={i}
                  onClick={() => setUserAnswer(option)}
                  disabled={showFeedback}
                  className={`ls-option-btn${showCorr ? ' ls-option-btn--correct' : showInco ? ' ls-option-btn--wrong' : isSelected ? ' ls-option-btn--selected' : ''}`}
                >
                  <span>{option}</span>
                  {showCorr && <CheckCircle2 style={{ width: 18, height: 18, flexShrink: 0 }} />}
                  {showInco && <XCircle      style={{ width: 18, height: 18, flexShrink: 0 }} />}
                </button>
              );
            })}
          </div>
        )}

        {/* Text input */}
        {(currentExercise.type === 'type-answer' ||
          currentExercise.type === 'translate' ||
          currentExercise.type === 'fill-blank') && (
          <input
            type="text"
            value={userAnswer}
            onChange={e => setUserAnswer(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && userAnswer && !showFeedback) handleSubmit(); }}
            disabled={showFeedback}
            placeholder={isEnglish ? 'Type your answer…' : 'Tapez votre réponse…'}
            className={`ls-type-input${showFeedback ? (isCorrect ? ' ls-type-input--correct' : ' ls-type-input--wrong') : ''}`}
            autoFocus
          />
        )}

        {/* Hint */}
        {currentExercise.hint && !showFeedback && (
          <div className="ls-hint">
            <div className="ls-hint-icon"><Lightbulb style={{ width: 14, height: 14, color: '#e53935' }} /></div>
            <p className="ls-hint-text">{isEnglish ? currentExercise.hint : currentExercise.hintFr}</p>
          </div>
        )}

        {/* Feedback */}
        {showFeedback && (
          <div className={`ls-feedback${isCorrect ? ' ls-feedback--correct' : ' ls-feedback--wrong'}`}>
            <div className="ls-feedback-icon">
              {isCorrect
                ? <CheckCircle2 style={{ width: 22, height: 22, color: '#4ade80' }} />
                : <XCircle      style={{ width: 22, height: 22, color: '#fca5a5' }} />}
            </div>
            <div className="ls-feedback-body">
              <p className="ls-feedback-title">
                {isCorrect
                  ? isRedemption
                    ? (isEnglish ? 'REDEEMED! +0.5 ♥' : 'RÉDEMPTÉ ! +0.5 ♥')
                    : (isEnglish ? 'CORRECT!' : 'CORRECT !')
                  : (isEnglish ? 'Correct answer:' : 'Bonne réponse :')}
              </p>
              {!isCorrect && (
                <>
                  <p className="ls-feedback-answer">{getCorrectAnswer()}</p>
                  {!isRedemption && (
                    <p className="ls-feedback-note">
                      {isEnglish
                        ? "You'll get a chance to redeem yourself later."
                        : 'Vous aurez une chance de vous racheter plus tard.'}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom bar */}
      <div className="ls-bottom">
        <div className="ls-bottom-inner">
          {!showFeedback ? (
            <button onClick={handleSubmit} disabled={!userAnswer} className="ls-btn-check">
              {isEnglish ? '✓ CHECK' : '✓ VÉRIFIER'}
            </button>
          ) : (
            <button onClick={handleNext} className="ls-btn-next">
              {exerciseQueue.length > 1
                ? (isEnglish ? 'NEXT →' : 'SUIVANT →')
                : (isEnglish ? 'FINISH' : 'TERMINER')}
            </button>
          )}
        </div>
      </div>

      {/* Modals */}
      <HeartsOutModal
        isOpen={showHeartsOutModal}
        onClose={() => setShowHeartsOutModal(false)}
        onSubscribe={() => {
          setShowHeartsOutModal(false);
          if (isGuest) onGoToSignUp?.();
          else onGoToSubscription?.();
        }}
        heartsData={heartsData ?? { currentHearts: 0, lastResetTime: Date.now(), maxHearts: 5 }}
        isGuest={isGuest}
      />

      <GuestLimitModal
        isOpen={showGuestLimitModal}
        onClose={() => setShowGuestLimitModal(false)}
        onSignUp={() => { setShowGuestLimitModal(false); onGoToSignUp?.(); }}
        lessonsCompleted={3}
      />

      <TrialOfferModal
        isOpen={showTrialOffer}
        onClose={() => setShowTrialOffer(false)}
        onStartTrial={() => { setShowTrialOffer(false); onGoToSubscription?.(); }}
      />
    </div>
  );
}
