import { useState, useRef } from 'react';
import { InterfaceLanguage } from '../../types';
import { EnrichedExercise } from './lessonUtils';
import { CheckCircle2, XCircle, Volume2 } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// CulturalCardExercise
// Non-quiz cultural insight slide — user reads and taps Continue
// ─────────────────────────────────────────────────────────────────────────────

interface CulturalCardProps {
  exercise: EnrichedExercise;
  interfaceLanguage: InterfaceLanguage;
  onContinue: () => void;
}

export function CulturalCardExercise({ exercise, interfaceLanguage, onContinue }: CulturalCardProps) {
  const isEn = interfaceLanguage === 'en';
  const text  = isEn ? (exercise.culturalText  ?? '') : (exercise.culturalTextFr  ?? exercise.culturalText ?? '');

  return (
    <div className="ls-cultural-card">
      <div className="ls-cultural-card-emoji">{exercise.culturalEmoji ?? '🌍'}</div>
      <div className="ls-cultural-card-label">
        {isEn ? 'Cultural Insight' : 'Aperçu Culturel'}
      </div>
      <p className="ls-cultural-card-text">{text}</p>
      <button className="ls-btn-check ls-cultural-card-btn" onClick={onContinue}>
        {isEn ? 'Continue →' : 'Continuer →'}
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ToneTrainerExercise
// Shows a tonal word, plays it via TTS, user identifies the correct tone
// ─────────────────────────────────────────────────────────────────────────────

interface ToneTrainerProps {
  exercise: EnrichedExercise;
  interfaceLanguage: InterfaceLanguage;
  userAnswer: string;
  showFeedback: boolean;
  isCorrect: boolean;
  onSelect: (opt: string) => void;
}

// Pitch → speechSynthesis pitch value
const PITCH_MAP: Record<string, number> = {
  high: 1.6,
  low:  0.5,
  mid:  1.0,
  rising: 1.4,
  falling: 0.6,
};

export function ToneTrainerExercise({
  exercise,
  interfaceLanguage,
  userAnswer,
  showFeedback,
  isCorrect,
  onSelect,
}: ToneTrainerProps) {
  const isEn   = interfaceLanguage === 'en';
  const tones  = exercise.toneData ?? [];
  const target = tones.find(t => (isEn ? t.name : t.nameFr) === (isEn ? exercise.correctAnswer : exercise.correctAnswerFr))
    ?? tones[0];

  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [played, setPlayed] = useState(false);

  const playTone = () => {
    if (!('speechSynthesis' in window) || !target) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(target.example);
    utter.pitch = PITCH_MAP[target.pitch] ?? 1.0;
    utter.rate  = 0.8;
    utterRef.current = utter;
    window.speechSynthesis.speak(utter);
    setPlayed(true);
  };

  const correctAnswer = isEn ? exercise.correctAnswer : (exercise.correctAnswerFr ?? exercise.correctAnswer);
  const options = isEn ? (exercise.options ?? []) : (exercise.optionsFr ?? exercise.options ?? []);

  return (
    <div className="ls-tone-wrap">
      {/* Word display */}
      <div className="ls-tone-word-box">
        <p className="ls-tone-word">{target?.example ?? ''}</p>
        {target && (
          <p className="ls-tone-mark-hint">
            {isEn ? `Mark: "${target.mark}"` : `Marque : "${target.mark}"`}
          </p>
        )}
      </div>

      {/* Play button */}
      <button
        className={`ls-audio-play-btn${played ? ' ls-audio-play-btn--played' : ''}`}
        onClick={playTone}
        aria-label="Play tone"
      >
        <Volume2 style={{ width: 28, height: 28 }} />
        <span>{played ? (isEn ? 'Play again' : 'Rejouer') : (isEn ? 'Hear the tone' : 'Écouter le ton')}</span>
      </button>

      <p className="ls-tone-instruction">
        {isEn ? 'Which tone is this?' : 'Quel est ce ton ?'}
      </p>

      {/* Tone options */}
      <div className="ls-options-grid">
        {options.map((opt, i) => {
          const toneEntry   = tones[i];
          const isSelected  = userAnswer === opt;
          const isCorrectOp = opt === correctAnswer;
          const showCorr    = showFeedback && isCorrectOp;
          const showInco    = showFeedback && isSelected && !isCorrect;
          return (
            <button
              key={i}
              disabled={showFeedback}
              onClick={() => onSelect(opt)}
              className={`ls-option-btn ls-tone-option${showCorr ? ' ls-option-btn--correct' : showInco ? ' ls-option-btn--wrong' : isSelected ? ' ls-option-btn--selected' : ''}`}
            >
              <div>
                <span className="ls-tone-option-name">{opt}</span>
                {toneEntry && (
                  <span className="ls-tone-option-mark"> ({toneEntry.mark})</span>
                )}
              </div>
              {showCorr && <CheckCircle2 style={{ width: 16, height: 16, flexShrink: 0 }} />}
              {showInco && <XCircle      style={{ width: 16, height: 16, flexShrink: 0 }} />}
            </button>
          );
        })}
      </div>

      {/* Post-answer explanation */}
      {showFeedback && target && (
        <div className="ls-tone-explanation">
          <p className="ls-tone-exp-title">
            {isEn ? `${target.name} (${target.mark})` : `${target.nameFr} (${target.mark})`}
          </p>
          <p className="ls-tone-exp-body">
            {isEn
              ? `"${target.example}" means "${target.meaning}". Tone changes meaning — the same letters with a different tone can be a completely different word.`
              : `"${target.example}" signifie "${target.meaningFr}". Le ton change le sens — les mêmes lettres avec un ton différent peuvent former un mot complètement différent.`}
          </p>
        </div>
      )}
    </div>
  );
}
