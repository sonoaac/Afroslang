import { useState, useEffect } from 'react';
import { InterfaceLanguage, Lesson, Exercise } from '../../types';
import { X, Heart, CheckCircle2, XCircle, Lightbulb, Zap, RotateCcw, Home } from 'lucide-react';
import { checkIgboAnswer } from '../../utils/igboTextUtils';
import { HeartsTimer } from '../../components/ui/HeartsTimer';
import { HeartsOutModal } from '../../components/ui/HeartsOutModal';
import { GuestLimitModal } from '../../components/ui/GuestLimitModal';
import { HeartsData, updateHearts, updateGuestHearts } from '../../utils/heartsTimer';

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

  if (!currentExercise) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8" style={{ background: 'var(--app-bg)' }}>
        <div className="text-center space-y-6 bg-white rounded-3xl p-12 retro-shadow-lg game-border max-w-2xl">
          <div className="text-8xl mb-6 animate-bounce">📚</div>
          <h2 className="text-[#1A1A1A] text-4xl">
            {isEnglish ? 'No lessons available yet' : 'Aucune leçon disponible pour le moment'}
          </h2>
          <p className="text-[#4A4A4A] text-xl max-w-md mx-auto leading-relaxed">
            {isEnglish 
              ? 'More lessons are coming soon for this language! Check back later.'
              : 'Plus de leçons arrivent bientôt pour cette langue! Revenez plus tard.'}
          </p>
          <button
            onClick={onExit}
            className="mt-8 px-12 py-5 rounded-2xl bg-gradient-to-r from-[#FF1493] to-[#9D4EDD] text-white retro-shadow-lg game-border hover:scale-110 transition-all duration-300 text-xl uppercase tracking-wider"
          >
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

  // Get options based on interface language
  const getOptions = () => {
    if (!isEnglish && currentExercise.optionsFr) {
      return currentExercise.optionsFr;
    }
    return currentExercise.options || [];
  };

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

  const answerColors = ['#FF1493', '#9D4EDD', '#FFD700', '#00FF94'];

  // Render hearts with half heart support and infinity for subscribers
  const renderHearts = () => {
    const hearts = [];
    
    // If subscribed, show infinity symbol
    if (isSubscribed) {
      return (
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#FF1493] to-[#FF69B4] scale-110 retro-shadow-sm game-border">
            <Heart className="w-6 h-6 fill-white text-white" />
          </div>
          <span className="text-2xl text-white font-bold">∞</span>
        </div>
      );
    }
    
    // For non-subscribers, show regular hearts
    const fullHearts = Math.floor(currentHearts);
    const hasHalfHeart = currentHearts % 1 !== 0;
    
    for (let i = 0; i < 5; i++) {
      const isFull = i < fullHearts;
      const isHalf = i === fullHearts && hasHalfHeart;
      
      hearts.push(
        <div
          key={i}
          className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
            isFull || isHalf
              ? 'bg-gradient-to-br from-[#FF1493] to-[#FF69B4] scale-110 retro-shadow-sm' 
              : 'bg-gray-300'
          } game-border`}
        >
          {isHalf ? (
            <div className="relative w-6 h-6">
              <Heart className="absolute w-6 h-6 text-gray-300" />
              <div className="absolute inset-0 overflow-hidden" style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' }}>
                <Heart className="w-6 h-6 fill-white text-white" />
              </div>
            </div>
          ) : (
            <Heart
              className={`w-6 h-6 ${
                isFull 
                  ? 'fill-white text-white' 
                  : 'text-gray-400'
              }`}
            />
          )}
        </div>
      );
    }
    
    return hearts;
  };

  const isRedemption = currentExercise.wasWrong && !currentExercise.hasRetried;

  const brown = '#6B4F3A'; // dark brown
  const lightBrown = '#A67B5B';
  const green = '#10B981';

  // Lesson Intro Modal
  if (showLessonIntro) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div 
          className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${brown} 0%, ${lightBrown} 100%)`,
          }}
        >
          {/* Pattern overlay */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H20v-1.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2z'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          <div className="relative z-10 p-8 sm:p-12">
            {/* Top: Unit and Lesson */}
            <div className="text-white/90 text-sm sm:text-base mb-4">
              {isEnglish 
                ? `Unit ${stageNumber} • Lesson ${lesson.lessonNumber}`
                : `Unité ${stageNumber} • Leçon ${lesson.lessonNumber}`}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl font-bold text-white mb-6 sm:mb-8 uppercase tracking-wide">
              {isEnglish ? lesson.title : lesson.titleFr}
            </h1>

            {/* Progress Indicator */}
            <div className="flex items-center gap-2 mb-8 sm:mb-12">
              {[...Array(totalSteps)].map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 flex-1 rounded-full transition-all ${
                    idx < currentStep 
                      ? 'bg-white' 
                      : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
            <div className="text-white/80 text-xs sm:text-sm mb-6 sm:mb-8">
              {currentStep} / {totalSteps}
            </div>

            {/* Main Content - Illustration/Text */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 sm:p-10 mb-8 sm:mb-12 border border-white/20">
              <div className="text-center space-y-4 sm:space-y-6">
                {/* Illustration */}
                <div className="text-6xl sm:text-8xl mb-4">
                  {lesson.type === 'vocabulary' ? '📚' : 
                   lesson.type === 'grammar' ? '📝' : 
                   lesson.type === 'writing' ? '✍️' : '🎭'}
                </div>
                
                {/* Lesson description */}
                <p className="text-white text-lg sm:text-2xl font-medium">
                  {isEnglish 
                    ? `Learn essential ${lesson.type === 'vocabulary' ? 'vocabulary' : lesson.type === 'grammar' ? 'grammar' : lesson.type === 'writing' ? 'writing' : 'culture'} in ${languageName}`
                    : `Apprenez ${lesson.type === 'vocabulary' ? 'le vocabulaire essentiel' : lesson.type === 'grammar' ? 'la grammaire' : lesson.type === 'writing' ? 'l\'écriture' : 'la culture'} en ${languageName}`}
                </p>
                
                {/* Exercise count */}
                <p className="text-white/80 text-sm sm:text-lg">
                  {lesson.exercises.length} {isEnglish ? 'exercises' : 'exercices'}
                </p>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowLessonIntro(false)}
                className="px-6 sm:px-10 py-3 sm:py-4 bg-white text-gray-900 font-bold rounded-lg sm:rounded-xl hover:bg-gray-100 transition-all text-sm sm:text-lg uppercase shadow-lg"
                style={{
                  backgroundColor: green,
                  color: 'white'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#059669';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = green;
                }}
              >
                {isEnglish ? 'Continue' : 'Continuer'}
              </button>
              <button
                onClick={() => {
                  setShowLessonIntro(false);
                  // Could add skip functionality
                }}
                className="text-white/80 hover:text-white text-sm sm:text-base underline transition-colors"
              >
                {isEnglish ? 'Skip' : 'Passer'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col touch-manipulation" style={{ background: 'var(--app-bg)' }}>
        {/* Header */}
        <div className="bg-white/95 backdrop-blur-md game-border border-b-0 px-3 sm:px-6 py-2 sm:py-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto">
          {/* Mobile Layout */}
          <div className="flex sm:hidden items-center justify-between gap-2">
            {/* Exit */}
            <button
              onClick={onExit}
              className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-[#FF1493] hover:bg-[#FF69B4] rounded-lg transition-all retro-shadow-sm touch-manipulation"
              aria-label="Exit lesson"
            >
              <X className="w-4 h-4 text-white" strokeWidth={3} />
            </button>
            
            {/* Progress Bar */}
            <div className="flex-1 h-2.5 bg-[#2D2D2D] rounded-full overflow-hidden game-border p-0.5">
              <div 
                className="h-full bg-gradient-to-r from-[#00FF94] via-[#7FFF00] to-[#FFD700] rounded-full transition-all duration-500 relative overflow-hidden"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
              </div>
            </div>

            {/* Counter */}
            <div className="bg-gradient-to-r from-[#FFD700] to-[#FF6B35] px-2 py-1 rounded-lg game-border retro-shadow-sm flex-shrink-0">
              <span className="text-white text-xs font-bold">
                {correctAnswers}/{totalQuestions}
              </span>
            </div>

            {/* Hearts */}
            <div className="flex gap-0.5 scale-75 origin-right flex-shrink-0">
              {heartsData ? (
                <HeartsTimer heartsData={heartsData} isSubscribed={isSubscribed} />
              ) : (
                renderHearts()
              )}
            </div>
            
            {/* Home */}
            <button
              onClick={onBackToLanguageSelect}
              className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-gradient-to-r from-[#9D4EDD] to-[#FFB6D9] hover:scale-110 rounded-lg transition-all retro-shadow-sm touch-manipulation"
              aria-label="Back to language selection"
            >
              <Home className="w-4 h-4 text-white" strokeWidth={3} />
            </button>
          </div>

          {/* Desktop Layout */}
          <div className="hidden sm:flex items-center gap-4 lg:gap-6">
            <button
              onClick={onExit}
              className="p-3 bg-[#FF1493] hover:bg-[#FF69B4] rounded-xl transition-all hover:scale-110 retro-shadow-sm"
              aria-label="Exit lesson"
            >
              <X className="w-6 h-6 text-white" strokeWidth={3} />
            </button>

            {/* Progress Bar */}
            <div className="flex-1 h-8 bg-[#2D2D2D] rounded-full overflow-hidden game-border p-1">
              <div 
                className="h-full bg-gradient-to-r from-[#00FF94] via-[#7FFF00] to-[#FFD700] rounded-full transition-all duration-500 relative overflow-hidden"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
              </div>
            </div>

            {/* Question Counter */}
            <div className="bg-gradient-to-r from-[#FFD700] to-[#FF6B35] px-6 py-2 rounded-xl game-border retro-shadow-sm">
              <span className="text-white text-xl uppercase tracking-wider">
                {correctAnswers}/{totalQuestions}
              </span>
            </div>

            {/* Hearts */}
            <div className="flex gap-2">
              {heartsData ? (
                <HeartsTimer heartsData={heartsData} isSubscribed={isSubscribed} />
              ) : (
                renderHearts()
              )}
            </div>
            
            {/* Home Button */}
            <button
              onClick={onBackToLanguageSelect}
              className="p-3 bg-gradient-to-r from-[#9D4EDD] to-[#FFB6D9] hover:scale-110 rounded-xl transition-all retro-shadow-sm group"
              aria-label="Back to language selection"
            >
              <Home className="w-6 h-6 text-white" strokeWidth={3} />
            </button>
          </div>
        </div>
      </div>

        {/* Exercise Content */}
        <div className="flex-1 flex flex-col items-center justify-start sm:justify-center p-4 sm:p-8 pb-[30vh] sm:pb-8 max-w-5xl mx-auto w-full overflow-y-auto">
        {/* XP & Type indicator */}
        <div className="mb-4 sm:mb-8 flex flex-col sm:flex-row items-center gap-2 sm:gap-4 flex-shrink-0">
          <div className="bg-white px-3 sm:px-8 py-2 sm:py-3 rounded-lg sm:rounded-2xl game-border retro-shadow-sm flex items-center gap-2 sm:gap-3">
            <span className="text-2xl sm:text-4xl">{getLessonIcon()}</span>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 sm:w-6 sm:h-6 text-[#FFD700]" />
              <span className="text-sm sm:text-2xl text-[#1A1A1A] font-semibold">
                {correctAnswers}/{totalQuestions} ✓
              </span>
            </div>
          </div>
          
          {/* Redemption Badge */}
          {isRedemption && !showFeedback && (
            <div className="bg-gradient-to-r from-[#9D4EDD] to-[#FFB6D9] px-3 sm:px-8 py-2 sm:py-3 rounded-lg sm:rounded-2xl game-border retro-shadow-sm animate-pulse flex-shrink-0">
              <div className="flex items-center gap-2 sm:gap-3 text-white">
                <RotateCcw className="w-4 h-4 sm:w-6 sm:h-6" />
                <span className="text-xs sm:text-xl uppercase tracking-wider font-semibold">
                  {isEnglish ? 'REDEMPTION!' : 'RÉDEMPTION!'}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Question Box */}
        <div className="w-full max-w-3xl mx-auto bg-white rounded-lg sm:rounded-3xl p-4 sm:p-10 game-border retro-shadow-lg mb-4 sm:mb-10">
          <h2 className="text-xl sm:text-4xl text-center text-[#1A1A1A] leading-tight font-semibold">
            {isEnglish ? currentExercise.question : currentExercise.questionFr}
          </h2>
          {isRedemption && !showFeedback && (
            <p className="text-center text-xs sm:text-2xl text-[#9D4EDD] mt-1 sm:mt-6">
              💜 {isEnglish ? 'Get half a heart back!' : 'Récupérez un demi-cœur!'}
            </p>
          )}
        </div>

        {/* Multiple Choice */}
        {currentExercise.type === 'multiple-choice' && currentExercise.options && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 w-full max-w-3xl mx-auto">
            {getOptions().map((option, index) => {
              const isSelected = userAnswer === option;
              const isCorrectAnswer = option === getCorrectAnswer();
              const showCorrect = showFeedback && isCorrectAnswer;
              const showIncorrect = showFeedback && isSelected && !isCorrect;
              
                  return (
                  <button
                    key={index}
                    onClick={() => setUserAnswer(option)}
                    disabled={showFeedback}
                    className={`
                      p-4 sm:p-8 rounded-lg sm:rounded-2xl game-border transition-all text-left flex items-center justify-between min-h-[56px] sm:min-h-[120px] touch-manipulation w-full
                      ${showCorrect
                        ? 'bg-gradient-to-br from-[#00FF94] to-[#7FFF00] retro-shadow-lg scale-105 animate-pop'
                        : showIncorrect
                        ? 'bg-gradient-to-br from-[#FF1493] to-[#FF69B4] retro-shadow-lg'
                        : isSelected
                        ? 'bg-gradient-to-br from-[#FFD700] to-[#FF6B35] retro-shadow-lg scale-105'
                        : 'bg-white active:bg-gradient-to-br active:from-[#FFB6D9] active:to-[#9D4EDD] sm:hover:bg-gradient-to-br sm:hover:from-[#FFB6D9] sm:hover:to-[#9D4EDD] retro-shadow active:scale-105 sm:hover:scale-105'
                      }
                      ${showFeedback ? 'cursor-not-allowed' : 'sm:hover:retro-shadow-lg active:retro-shadow-lg'}
                    `}
                  style={{
                    backgroundColor: !isSelected && !showCorrect && !showIncorrect ? answerColors[index % 4] + '33' : undefined
                  }}
                >
                  <span className={`text-base sm:text-2xl font-semibold ${showCorrect || showIncorrect || isSelected ? 'text-white' : 'text-[#1A1A1A]'}`}>
                    {option}
                  </span>
                  {showCorrect && (
                    <div className="bg-white rounded-full p-1 sm:p-2 flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5 sm:w-8 sm:h-8 text-[#00FF94]" />
                    </div>
                  )}
                  {showIncorrect && (
                    <div className="bg-white rounded-full p-0.5 sm:p-2">
                      <XCircle className="w-3 h-3 sm:w-8 sm:h-8 text-[#FF1493]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Type Answer */}
        {(currentExercise.type === 'type-answer' || currentExercise.type === 'translate' || currentExercise.type === 'fill-blank') && (
          <div className="w-full max-w-3xl">
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              disabled={showFeedback}
              placeholder={isEnglish ? 'Type your answer...' : 'Tapez votre réponse...'}
              className={`
                w-full p-3 sm:p-8 rounded-xl sm:rounded-3xl game-border text-base sm:text-2xl text-center transition-all min-h-[52px] sm:min-h-auto font-semibold
                ${showFeedback
                  ? isCorrect
                    ? 'bg-gradient-to-r from-[#00FF94] to-[#7FFF00] text-white retro-shadow-lg'
                    : 'bg-gradient-to-r from-[#FF1493] to-[#FF69B4] text-white retro-shadow-lg'
                  : 'bg-white text-black placeholder:text-gray-400 focus:retro-shadow-lg focus:outline-none focus:scale-105'
                }
              `}
              autoFocus
            />
          </div>
        )}

        {/* Hint */}
        {currentExercise.hint && !showFeedback && (
          <div className="mt-4 sm:mt-8 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white game-border retro-shadow w-full max-w-3xl">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="bg-gradient-to-br from-[#FFD700] to-[#FF6B35] p-2 sm:p-3 rounded-xl flex-shrink-0">
                <Lightbulb className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
              </div>
              <p className="text-sm sm:text-xl text-[#1A1A1A] flex-1">
                {isEnglish ? currentExercise.hint : currentExercise.hintFr}
              </p>
            </div>
          </div>
        )}

        {/* Feedback */}
        {showFeedback && (
          <div className="mt-4 sm:mt-8 w-full max-w-3xl">
            <div className={`
              p-4 sm:p-8 rounded-xl sm:rounded-3xl game-border retro-shadow-lg animate-fadeIn
              ${isCorrect 
                ? 'bg-gradient-to-r from-[#00FF94] to-[#7FFF00]' 
                : 'bg-gradient-to-r from-[#FF1493] to-[#FF69B4]'
              }
            `}>
              <div className="flex items-center gap-3 sm:gap-6">
                <div className="bg-white rounded-xl sm:rounded-2xl p-2 sm:p-4 flex-shrink-0">
                  {isCorrect ? (
                    <CheckCircle2 className="w-8 h-8 sm:w-12 sm:h-12 text-[#00FF94]" />
                  ) : (
                    <XCircle className="w-8 h-8 sm:w-12 sm:h-12 text-[#FF1493]" />
                  )}
                </div>
                <div className="flex-1 text-white">
                  <p className="text-lg sm:text-3xl mb-2 font-bold">
                    {isCorrect 
                      ? isRedemption
                        ? (isEnglish ? '💜 REDEEMED! +0.5 ❤️' : '💜 RÉDEMPTÉ! +0.5 ❤️')
                        : (isEnglish ? '🎉 AMAZING!' : '🎉 INCROYABLE!')
                      : (isEnglish ? 'Correct answer:' : 'Bonne réponse:')}
                  </p>
                  {!isCorrect && (
                    <>
                      <p className="text-base sm:text-2xl mb-2 font-semibold">{getCorrectAnswer()}</p>
                      {!isRedemption && (
                        <p className="text-sm sm:text-xl opacity-90">
                          💡 {isEnglish ? 'You\'ll get a chance to redeem yourself later!' : 'Vous aurez une chance de vous racheter plus tard!'}
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Button Area */}
      <div className="bg-white/95 backdrop-blur-md game-border border-t-0 p-1 sm:p-8 max-w-5xl mx-auto w-full">
        {!showFeedback ? (
          <button
            onClick={handleSubmit}
            disabled={!userAnswer}
              className={`
              w-full py-4 sm:py-6 rounded-lg sm:rounded-2xl game-border transition-all text-base sm:text-3xl uppercase tracking-wider retro-shadow-lg touch-manipulation min-h-[56px] sm:min-h-auto font-bold
              ${userAnswer
                ? 'bg-gradient-to-r from-[#00FF94] to-[#7FFF00] text-white active:scale-105 sm:hover:scale-105 active:retro-shadow-lg sm:hover:retro-shadow-lg animate-pulse'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            {isEnglish ? '✓ CHECK' : '✓ VÉRIFIER'}
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="w-full py-4 sm:py-6 rounded-lg sm:rounded-2xl bg-gradient-to-r from-[#FFD700] to-[#FF6B35] text-white game-border retro-shadow-lg active:scale-105 sm:hover:scale-105 transition-all text-base sm:text-3xl uppercase tracking-wider touch-manipulation min-h-[56px] sm:min-h-auto font-bold"
          >
            {exerciseQueue.length > 1
              ? (isEnglish ? 'NEXT →' : 'SUIVANT →')
              : (isEnglish ? '🏆 FINISH' : '🏆 TERMINER')}
          </button>
        )}
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
