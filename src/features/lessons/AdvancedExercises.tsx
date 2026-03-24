import { useState } from 'react';
import { InterfaceLanguage } from '../../types';
import { EnrichedExercise } from './lessonUtils';
import { CheckCircle2, XCircle } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// ConversationExercise
// Alternating guide/user dialogue — user taps options on their turns
// ─────────────────────────────────────────────────────────────────────────────

interface ConversationProps {
  exercise: EnrichedExercise;
  interfaceLanguage: InterfaceLanguage;
  onComplete: (allCorrect: boolean) => void;
}

export function ConversationExercise({ exercise, interfaceLanguage, onComplete }: ConversationProps) {
  const isEn   = interfaceLanguage === 'en';
  const script = exercise.conversationScript ?? [];
  const [turnIdx,   setTurnIdx]   = useState(0);
  const [mistakes,  setMistakes]  = useState(0);
  const [picked,    setPicked]    = useState<number | null>(null);
  const [showReveal, setShowReveal] = useState(false);

  if (script.length === 0) {
    onComplete(true);
    return null;
  }

  const turn = script[turnIdx];

  const advance = () => {
    setPicked(null);
    setShowReveal(false);
    if (turnIdx + 1 >= script.length) {
      onComplete(mistakes === 0);
    } else {
      setTurnIdx(i => i + 1);
    }
  };

  const handlePick = (optIdx: number) => {
    if (picked !== null) return;
    setPicked(optIdx);
    setShowReveal(true);
    if (optIdx !== (turn.correctIndex ?? 0)) {
      setMistakes(m => m + 1);
    }
  };

  // Guide turn: show text, then Continue button
  if (turn.speaker === 'guide') {
    return (
      <div className="ls-convo-wrap">
        <div className="ls-convo-label">
          {isEn ? 'Conversation' : 'Conversation'}
        </div>
        <div className="ls-convo-history">
          {script.slice(0, turnIdx + 1).map((t, i) => (
            <div key={i} className={`ls-convo-bubble ls-convo-bubble--${t.speaker}`}>
              <div className="ls-convo-bubble-speaker">
                {t.speaker === 'guide' ? '🧭' : '🧑'}
              </div>
              <div className="ls-convo-bubble-body">
                <p className="ls-convo-bubble-text">{t.text}</p>
                <p className="ls-convo-bubble-gloss">
                  {isEn ? t.textTranslation : (t.textTranslationFr ?? t.textTranslation)}
                </p>
              </div>
            </div>
          ))}
        </div>
        <button className="ls-btn-check" onClick={advance} style={{ width: '100%' }}>
          {isEn ? 'Continue →' : 'Continuer →'}
        </button>
      </div>
    );
  }

  // User turn: show options
  const options   = isEn ? (turn.options ?? []) : (turn.optionsFr ?? turn.options ?? []);
  const correctIdx = turn.correctIndex ?? 0;

  return (
    <div className="ls-convo-wrap">
      <div className="ls-convo-label">
        {isEn ? 'Your turn — choose the right response:' : 'À vous — choisissez la bonne réponse :'}
      </div>

      <div className="ls-convo-history">
        {script.slice(0, turnIdx).map((t, i) => (
          <div key={i} className={`ls-convo-bubble ls-convo-bubble--${t.speaker}`}>
            <div className="ls-convo-bubble-speaker">
              {t.speaker === 'guide' ? '🧭' : '🧑'}
            </div>
            <div className="ls-convo-bubble-body">
              <p className="ls-convo-bubble-text">{t.text}</p>
              <p className="ls-convo-bubble-gloss">
                {isEn ? t.textTranslation : (t.textTranslationFr ?? t.textTranslation)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Option buttons */}
      <div className="ls-convo-options">
        {options.map((opt, i) => {
          const isSelected = picked === i;
          const isCorrect  = i === correctIdx;
          const showCorr   = showReveal && isCorrect;
          const showInco   = showReveal && isSelected && !isCorrect;
          return (
            <button
              key={i}
              disabled={picked !== null}
              onClick={() => handlePick(i)}
              className={`ls-option-btn${showCorr ? ' ls-option-btn--correct' : showInco ? ' ls-option-btn--wrong' : isSelected ? ' ls-option-btn--selected' : ''}`}
            >
              <span>{opt}</span>
              {showCorr && <CheckCircle2 style={{ width: 16, height: 16, flexShrink: 0 }} />}
              {showInco && <XCircle      style={{ width: 16, height: 16, flexShrink: 0 }} />}
            </button>
          );
        })}
      </div>

      {showReveal && (
        <button className="ls-btn-next" style={{ width: '100%', marginTop: 12 }} onClick={advance}>
          {turnIdx + 1 >= script.length
            ? (isEn ? 'Finish' : 'Terminer')
            : (isEn ? 'Next →' : 'Suivant →')}
        </button>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// StoryExercise
// Short cultural-facts story — tappable vocabulary words — comprehension MC Q
// ─────────────────────────────────────────────────────────────────────────────

interface StoryProps {
  exercise: EnrichedExercise;
  interfaceLanguage: InterfaceLanguage;
  userAnswer: string;
  showFeedback: boolean;
  isCorrect: boolean;
  onSelect: (opt: string) => void;
}

export function StoryExercise({
  exercise,
  interfaceLanguage,
  userAnswer,
  showFeedback,
  isCorrect,
  onSelect,
}: StoryProps) {
  const isEn = interfaceLanguage === 'en';
  const text  = isEn ? (exercise.storyText ?? '') : (exercise.storyTextFr ?? exercise.storyText ?? '');
  const vocab = exercise.storyWords ?? [];
  const [tappedWord, setTappedWord] = useState<string | null>(null);

  const options       = isEn ? (exercise.options ?? []) : (exercise.optionsFr ?? exercise.options ?? []);
  const correctAnswer = !isEn && exercise.correctAnswerFr ? exercise.correctAnswerFr : exercise.correctAnswer;

  // Render story text with highlighted tappable vocabulary words
  const renderStory = () => {
    if (vocab.length === 0) return <p className="ls-story-text">{text}</p>;

    // Build a regex from vocab words to split text on them
    const wordList = vocab.map(v => v.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const regex    = new RegExp(`(${wordList.join('|')})`, 'gi');
    const parts    = text.split(regex);

    return (
      <p className="ls-story-text">
        {parts.map((part, i) => {
          const vocabEntry = vocab.find(v => v.word.toLowerCase() === part.toLowerCase());
          if (vocabEntry) {
            const isActive = tappedWord === vocabEntry.word;
            return (
              <span key={i} className="ls-story-vocab-group" style={{ position: 'relative', display: 'inline' }}>
                <button
                  key={i}
                  className={`ls-story-word${isActive ? ' ls-story-word--active' : ''}`}
                  onClick={() => setTappedWord(isActive ? null : vocabEntry.word)}
                >
                  {part}
                </button>
                {isActive && (
                  <span className="ls-story-tooltip">
                    {isEn ? vocabEntry.meaning : (vocabEntry.meaningFr ?? vocabEntry.meaning)}
                  </span>
                )}
              </span>
            );
          }
          return <span key={i}>{part}</span>;
        })}
      </p>
    );
  };

  return (
    <div className="ls-story-wrap">
      {/* Story card */}
      <div className="ls-story-card">
        <div className="ls-story-label">
          {isEn ? '📖 Read & Explore' : '📖 Lire et Explorer'}
        </div>
        {renderStory()}
        {vocab.length > 0 && (
          <p className="ls-story-tap-hint">
            {isEn ? 'Tap highlighted words to see their meaning.' : 'Appuyez sur les mots surlignés pour voir leur signification.'}
          </p>
        )}
      </div>

      {/* Comprehension question */}
      {exercise.correctAnswer && (
        <>
          <p className="ls-story-q-label">
            {isEn ? 'Comprehension question:' : 'Question de compréhension :'}
          </p>
          <div className="ls-question-box" style={{ marginBottom: 16 }}>
            <p className="ls-question-text">
              {isEn ? exercise.question : exercise.questionFr}
            </p>
          </div>

          <div className="ls-options-grid">
            {options.map((opt, i) => {
              const isSelected = userAnswer === opt;
              const isCorrOpt  = opt === correctAnswer;
              const showCorr   = showFeedback && isCorrOpt;
              const showInco   = showFeedback && isSelected && !isCorrect;
              return (
                <button
                  key={i}
                  disabled={showFeedback}
                  onClick={() => onSelect(opt)}
                  className={`ls-option-btn${showCorr ? ' ls-option-btn--correct' : showInco ? ' ls-option-btn--wrong' : isSelected ? ' ls-option-btn--selected' : ''}`}
                >
                  <span>{opt}</span>
                  {showCorr && <CheckCircle2 style={{ width: 16, height: 16, flexShrink: 0 }} />}
                  {showInco && <XCircle      style={{ width: 16, height: 16, flexShrink: 0 }} />}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
