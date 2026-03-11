import { useState, useEffect, useMemo } from 'react';
import { InterfaceLanguage, Lesson, Exercise } from '../../types';
import { X, Heart, CheckCircle2, XCircle, Lightbulb, RotateCcw, Home } from 'lucide-react';
import { checkIgboAnswer } from '../../utils/igboTextUtils';
import { HeartsTimer } from '../../components/ui/HeartsTimer';
import { HeartsOutModal } from '../../components/ui/HeartsOutModal';
import { GuestLimitModal } from '../../components/ui/GuestLimitModal';
import { HeartsData, updateHearts, updateGuestHearts } from '../../utils/heartsTimer';
import './LessonPremium.css';

interface LessonScreenProps {
  interfaceLanguage: InterfaceLanguage;
  lesson: Lesson;
  languageName: string;
  hearts: number;
  heartsData?: HeartsData;
  isSubscribed?: boolean;
  userId?: string;
  isGuest?: boolean;
  onComplete: (xpEarned: number, heartsLost: number, heartsGained: number) => void;
  onExit: () => void;
  onBackToLanguageSelect: () => void;
}

interface ExerciseWithState extends Exercise {
  wasWrong?: boolean; // Track if this was previously answered wrong
  hasRetried?: boolean; // Track if redemption was attempted
}

export function LessonScreen({ 
  interfaceLanguage, 
  lesson,
  languageName,
  hearts,
  heartsData,
  isSubscribed = false,
  userId,
  isGuest = false,
  onComplete,
  onExit,
  onBackToLanguageSelect
}: LessonScreenProps) {
  const isEnglish = interfaceLanguage === 'en';
  
  // Initialize exercise queue with all exercises
  const [exerciseQueue, setExerciseQueue] = useState<ExerciseWithState[]>(() => 
    (lesson.exercises && lesson.exercises.length > 0) 
      ? [...lesson.exercises].map(ex => ({ ...ex }))
      : []
  );
  const [currentExercise, setCurrentExercise] = useState<ExerciseWithState | null>(
    exerciseQueue.length > 0 ? exerciseQueue[0] : null
  );
  const [correctAnswers, setCorrectAnswers] = useState(0);
  
  const [userAnswer, setUserAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [totalHeartsLost, setTotalHeartsLost] = useState(0);
  const [totalHeartsGained, setTotalHeartsGained] = useState(0);
  const [currentHearts, setCurrentHearts] = useState(hearts);
  const [showHeartsOutModal, setShowHeartsOutModal] = useState(false);
  const [showGuestLimitModal, setShowGuestLimitModal] = useState(false);
  const [showLessonIntro, setShowLessonIntro] = useState(true);

  // Extract stage number from stageId (e.g., "swahili-stage-1" -> 1)
  const getStageNumber = () => {
    const match = lesson.stageId.match(/stage-(\d+)/);
    return match ? parseInt(match[1], 10) : 1;
  };

  const stageNumber = getStageNumber();
  const currentStep = 1; // Intro is step 1
  const totalSteps = 3; // Intro, questions, completion

  const totalQuestions = lesson.exercises.length;
  const progress = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;

  // Check guest lesson limit
  useEffect(() => {
    if (isGuest) {
      // Get completed lessons count from localStorage
      const guestProgress = JSON.parse(localStorage.getItem('afroslang_guest_progress') || '{}');
      const completedLessons = Object.values(guestProgress.languages || {}).reduce((total: number, lang: any) => {
        return total + (lang.completedLessons?.length || 0);
      }, 0);
      
      if (completedLessons >= 3) {
        setShowGuestLimitModal(true);
      }
    }
  }, [isGuest]);

  useEffect(() => {
    // Reset answer when exercise changes
    setUserAnswer('');
    setShowFeedback(false);
  }, [currentExercise?.id]);

  // Shuffle options once per exercise so correct answer isn't always in the same position
  const shuffledOptions = useMemo(() => {
    if (!currentExercise) return [];
    const opts = (!isEnglish && currentExercise.optionsFr)
      ? currentExercise.optionsFr
      : (currentExercise.options || []);
    const arr = [...opts];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentExercise?.id, isEnglish]);

  if (!currentExercise) {
    return (
      <div className="ls-root" style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', padding: '2rem', maxWidth: 400 }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📚</div>
          <h2 style={{ fontFamily: "'Times New Roman', Georgia, serif", color: '#fff', marginBottom: '0.75rem' }}>
            {isEnglish ? 'No lessons available yet' : 'Aucune leçon disponible pour le moment'}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '1.5rem', fontFamily: "'Times New Roman', Georgia, serif" }}>
            {isEnglish
              ? 'More lessons are coming soon for this language! Check back later.'
              : 'Plus de leçons arrivent bientôt pour cette langue! Revenez plus tard.'}
          </p>
          <button onClick={onExit} className="ls-btn-check">
            {isEnglish ? '← Go Back' : '← Retour'}
          </button>
        </div>
      </div>
    );
  }

  // Get the correct answer based on interface language
  const getCorrectAnswer = () => {
    if (!isEnglish && currentExercise.correctAnswerFr) {
      return currentExercise.correctAnswerFr;
    }
    return currentExercise.correctAnswer;
  };

  // (getOptions kept for potential future use — currently options resolved via shuffledOptions)

  const handleSubmit = () => {
    // Check if user has hearts (for non-subscribers)
    if (!isSubscribed && currentHearts <= 0) {
      setShowHeartsOutModal(true);
      return;
    }

    const correctAnswer = getCorrectAnswer();
    // Use Igbo text utility for better accent handling
    const correct = checkIgboAnswer(userAnswer, correctAnswer);
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setCorrectAnswers(prev => prev + 1);
      
      // If this was a redemption, give half heart back
      if (currentExercise.wasWrong && !currentExercise.hasRetried) {
        setTotalHeartsGained(prev => prev + 0.5);
        setCurrentHearts(prev => Math.min(5, prev + 0.5));
      }
    } else {
      // Wrong answer - only lose hearts if not subscribed
      if (!isSubscribed) {
        if (currentExercise.wasWrong && !currentExercise.hasRetried) {
          // Failed redemption - lose another heart
          setTotalHeartsLost(prev => prev + 1);
          if (currentHearts > 0) {
            setCurrentHearts(prev => Math.max(0, prev - 1));
            
            // Update hearts in database/localStorage
            if (userId && !isGuest) {
              updateHearts(userId, 1);
            } else if (isGuest) {
              updateGuestHearts(1);
            }
          }
        } else if (!currentExercise.wasWrong) {
          // First time wrong - lose heart and add back to queue randomly
          setTotalHeartsLost(prev => prev + 1);
          if (currentHearts > 0) {
            setCurrentHearts(prev => Math.max(0, prev - 1));
            
            // Update hearts in database/localStorage
            if (userId && !isGuest) {
              updateHearts(userId, 1);
            } else if (isGuest) {
              updateGuestHearts(1);
            }
          }
        }
      }
        
      // Add this question back to the queue at a random position (not immediately next)
      const wrongExercise: ExerciseWithState = { 
        ...currentExercise, 
        wasWrong: true,
        hasRetried: false
      };
      
      // Insert at a random position in the remaining queue (at least 2 positions ahead)
      setExerciseQueue(prevQueue => {
        const newQueue = [...prevQueue];
        if (newQueue.length > 2) {
          const randomPos = Math.floor(Math.random() * (newQueue.length - 2)) + 2;
          newQueue.splice(randomPos, 0, wrongExercise);
        } else {
          newQueue.push(wrongExercise);
        }
        return newQueue;
      });
    }
  };

  const handleNext = () => {
    // Remove current exercise from queue
    const newQueue = exerciseQueue.slice(1);
    setExerciseQueue(newQueue);
    
    if (newQueue.length > 0) {
      setCurrentExercise(newQueue[0]);
      setUserAnswer('');
      setShowFeedback(false);
    } else {
      // Lesson complete - XP based only on correct answers
      const xpPerCorrect = Math.floor(lesson.xpReward / totalQuestions);
      const xpEarned = Math.max(correctAnswers * xpPerCorrect, 5);
      onComplete(xpEarned, totalHeartsLost, totalHeartsGained);
    }
  };

  const getLessonIcon = () => {
    const icons = {
      vocabulary: '📚',
      grammar: '📝',
      writing: '✍️',
      culture: '🎭'
    };
    return icons[lesson.type];
  };


  // Render hearts with half heart support and infinity for subscribers
  const renderHearts = () => {
    const heartItems = [];

    // If subscribed, show infinity symbol
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

    // For non-subscribers, show regular hearts
    const fullHearts = Math.floor(currentHearts);
    const hasHalfHeart = currentHearts % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      const isFull = i < fullHearts;
      const isHalf = i === fullHearts && hasHalfHeart;
      heartItems.push(
        <div
          key={i}
          style={{
            width: 28,
            height: 28,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: isFull || isHalf ? '#b00020' : 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
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
    }

    return heartItems;
  };

  const isRedemption = currentExercise.wasWrong && !currentExercise.hasRetried;

  // Lesson Intro Modal
  if (showLessonIntro) {
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

          <span className="ls-intro-icon">
            {lesson.type === 'vocabulary' ? '📚' :
             lesson.type === 'grammar' ? '📝' :
             lesson.type === 'writing' ? '✍️' : '🎭'}
          </span>

          <p className="ls-intro-desc">
            {isEnglish
              ? `Learn essential ${lesson.type === 'vocabulary' ? 'vocabulary' : lesson.type === 'grammar' ? 'grammar' : lesson.type === 'writing' ? 'writing' : 'culture'} in ${languageName}`
              : `Apprenez ${lesson.type === 'vocabulary' ? 'le vocabulaire essentiel' : lesson.type === 'grammar' ? 'la grammaire' : lesson.type === 'writing' ? "l'écriture" : 'la culture'} en ${languageName}`}
          </p>
          <p className="ls-intro-count">
            {lesson.exercises.length} {isEnglish ? 'exercises' : 'exercices'}
          </p>

          <div className="ls-intro-progress">
            {[...Array(totalSteps)].map((_, idx) => (
              <div key={idx} className={`ls-intro-prog-bar${idx < currentStep ? ' ls-intro-prog-bar--active' : ''}`} />
            ))}
          </div>

          <div className="ls-intro-actions">
            <button onClick={() => setShowLessonIntro(false)} className="ls-intro-skip">
              {isEnglish ? 'Skip' : 'Passer'}
            </button>
            <button onClick={() => setShowLessonIntro(false)} className="ls-btn-check" style={{ flex: 1 }}>
              {isEnglish ? 'BEGIN' : 'COMMENCER'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ls-root">
      {/* ── Header ── */}
      <div className="ls-header">
        <div className="ls-header-inner">
          <button onClick={onExit} className="ls-exit-btn" aria-label="Exit lesson">
            <X style={{ width: 18, height: 18 }} strokeWidth={2.5} />
          </button>
          <div className="ls-progress-track">
            <div className="ls-progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="ls-counter">{correctAnswers}/{totalQuestions}</div>
          <div style={{ display: 'flex', gap: 3 }}>
            {heartsData ? (
              <HeartsTimer heartsData={heartsData} isSubscribed={isSubscribed} />
            ) : (
              renderHearts()
            )}
          </div>
          <button onClick={onBackToLanguageSelect} className="ls-home-btn" aria-label="Home">
            <Home style={{ width: 18, height: 18 }} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="ls-body">
        {/* Meta row */}
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

        {/* Question */}
        <div className="ls-question-box">
          <p className="ls-question-text">
            {isEnglish ? currentExercise.question : currentExercise.questionFr}
          </p>
          {isRedemption && !showFeedback && (
            <p className="ls-redemption-hint">
              {isEnglish ? '♥ Get half a heart back!' : '♥ Récupérez un demi-cœur!'}
            </p>
          )}
        </div>

        {/* Multiple Choice */}
        {currentExercise.type === 'multiple-choice' && currentExercise.options && (
          <div className="ls-options-grid">
            {shuffledOptions.map((option, index) => {
              const isSelected = userAnswer === option;
              const isCorrectAnswer = option === getCorrectAnswer();
              const showCorrect = showFeedback && isCorrectAnswer;
              const showIncorrect = showFeedback && isSelected && !isCorrect;
              return (
                <button
                  key={index}
                  onClick={() => setUserAnswer(option)}
                  disabled={showFeedback}
                  className={`ls-option-btn${showCorrect ? ' ls-option-btn--correct' : showIncorrect ? ' ls-option-btn--wrong' : isSelected ? ' ls-option-btn--selected' : ''}`}
                >
                  <span>{option}</span>
                  {showCorrect && <CheckCircle2 style={{ width: 18, height: 18, flexShrink: 0 }} />}
                  {showIncorrect && <XCircle style={{ width: 18, height: 18, flexShrink: 0 }} />}
                </button>
              );
            })}
          </div>
        )}

        {/* Type Answer */}
        {(currentExercise.type === 'type-answer' || currentExercise.type === 'translate' || currentExercise.type === 'fill-blank') && (
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            disabled={showFeedback}
            placeholder={isEnglish ? 'Type your answer…' : 'Tapez votre réponse…'}
            className={`ls-type-input${showFeedback ? (isCorrect ? ' ls-type-input--correct' : ' ls-type-input--wrong') : ''}`}
            autoFocus
          />
        )}

        {/* Hint */}
        {currentExercise.hint && !showFeedback && (
          <div className="ls-hint">
            <div className="ls-hint-icon">
              <Lightbulb style={{ width: 14, height: 14, color: '#e53935' }} />
            </div>
            <p className="ls-hint-text">
              {isEnglish ? currentExercise.hint : currentExercise.hintFr}
            </p>
          </div>
        )}

        {/* Feedback */}
        {showFeedback && (
          <div className={`ls-feedback${isCorrect ? ' ls-feedback--correct' : ' ls-feedback--wrong'}`}>
            <div className="ls-feedback-icon">
              {isCorrect
                ? <CheckCircle2 style={{ width: 22, height: 22, color: '#4ade80' }} />
                : <XCircle style={{ width: 22, height: 22, color: '#fca5a5' }} />}
            </div>
            <div className="ls-feedback-body">
              <p className="ls-feedback-title">
                {isCorrect
                  ? isRedemption
                    ? (isEnglish ? 'REDEEMED! +0.5 ♥' : 'RÉDEMPTÉ! +0.5 ♥')
                    : (isEnglish ? 'CORRECT!' : 'CORRECT!')
                  : (isEnglish ? 'Correct answer:' : 'Bonne réponse:')}
              </p>
              {!isCorrect && (
                <>
                  <p className="ls-feedback-answer">{getCorrectAnswer()}</p>
                  {!isRedemption && (
                    <p className="ls-feedback-note">
                      {isEnglish ? "You'll get a chance to redeem yourself later." : 'Vous aurez une chance de vous racheter plus tard.'}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ── Bottom bar ── */}
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

      {/* Hearts Out Modal */}
      <HeartsOutModal
        isOpen={showHeartsOutModal}
        onClose={() => setShowHeartsOutModal(false)}
        onSubscribe={() => {
          setShowHeartsOutModal(false);
          // Navigate to subscription page - this would need to be passed as a prop
          // For now, just close the modal
        }}
        heartsData={heartsData || { currentHearts: 0, lastResetTime: Date.now(), maxHearts: 5 }}
        isGuest={isGuest}
      />

      {/* Guest Limit Modal */}
      <GuestLimitModal
        isOpen={showGuestLimitModal}
        onClose={() => setShowGuestLimitModal(false)}
        onSignUp={() => {
          setShowGuestLimitModal(false);
          // Navigate to sign up - this would need to be passed as a prop
          // For now, just close the modal
        }}
        lessonsCompleted={3}
      />
    </div>
  );
}
