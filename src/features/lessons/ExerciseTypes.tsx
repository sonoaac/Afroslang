import { useState, useRef } from 'react';
import { InterfaceLanguage } from '../../types';
import { EnrichedExercise } from './lessonUtils';
import { CheckCircle2, XCircle, Volume2 } from 'lucide-react';

// ── Shared callback type ──────────────────────────────────────────────────────

interface ExerciseCallbacks {
  onCorrect: () => void;  // mark correct, advance
  onWrong: () => void;    // mark wrong (hearts deducted by parent), advance
}

// ─────────────────────────────────────────────────────────────────────────────
// FlashcardExercise
// Front: native word — user mentally recalls meaning — then flips — rates Easy/Hard
// ─────────────────────────────────────────────────────────────────────────────

interface FlashcardProps {
  exercise: EnrichedExercise;
  interfaceLanguage: InterfaceLanguage;
  callbacks: ExerciseCallbacks;
}

export function FlashcardExercise({ exercise, interfaceLanguage, callbacks }: FlashcardProps) {
  const [flipped, setFlipped] = useState(false);
  const isEn = interfaceLanguage === 'en';

  const front = isEn ? exercise.question : (exercise.questionFr || exercise.question);
  const back  = isEn ? exercise.correctAnswer : (exercise.correctAnswerFr || exercise.correctAnswer);

  return (
    <div className="ls-flashcard-wrap">
      <p className="ls-flashcard-instruction">
        {isEn ? 'What does this mean in English?' : 'Que signifie cela en anglais ?'}
      </p>

      <div className={`ls-flashcard${flipped ? ' ls-flashcard--flipped' : ''}`} onClick={() => setFlipped(f => !f)}>
        <div className="ls-flashcard-front">
          <span className="ls-flashcard-face-label">{isEn ? 'Native word' : 'Mot natif'}</span>
          <p className="ls-flashcard-word">{front}</p>
          <span className="ls-flashcard-tap-hint">{isEn ? 'Tap to flip' : 'Appuyez pour retourner'}</span>
        </div>
        <div className="ls-flashcard-back">
          <span className="ls-flashcard-face-label">{isEn ? 'Meaning' : 'Signification'}</span>
          <p className="ls-flashcard-meaning">{back}</p>
          <span className="ls-flashcard-tap-hint">{isEn ? 'Tap to flip back' : 'Appuyez pour retourner'}</span>
        </div>
      </div>

      {flipped && (
        <div className="ls-flashcard-rate">
          <p className="ls-flashcard-rate-label">
            {isEn ? 'How well did you know it?' : 'Dans quelle mesure le connaissiez-vous ?'}
          </p>
          <div className="ls-flashcard-rate-btns">
            <button className="ls-flashcard-btn-hard" onClick={callbacks.onWrong}>
              <XCircle style={{ width: 16, height: 16 }} />
              {isEn ? 'Hard — review again' : 'Difficile — revoir'}
            </button>
            <button className="ls-flashcard-btn-easy" onClick={callbacks.onCorrect}>
              <CheckCircle2 style={{ width: 16, height: 16 }} />
              {isEn ? 'Got it!' : 'Compris !'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// AudioMatchExercise
// Plays TTS audio of the correct answer — user picks from written options
// ─────────────────────────────────────────────────────────────────────────────

interface AudioMatchProps {
  exercise: EnrichedExercise;
  interfaceLanguage: InterfaceLanguage;
  shuffledOptions: string[];
  userAnswer: string;
  showFeedback: boolean;
  isCorrect: boolean;
  onSelect: (opt: string) => void;
}

export function AudioMatchExercise({
  exercise,
  interfaceLanguage,
  shuffledOptions,
  userAnswer,
  showFeedback,
  isCorrect,
  onSelect,
}: AudioMatchProps) {
  const isEn = interfaceLanguage === 'en';
  const [played, setPlayed] = useState(false);
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);

  const getCorrectAnswer = () =>
    !isEn && exercise.correctAnswerFr ? exercise.correctAnswerFr : exercise.correctAnswer;

  const playAudio = () => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(exercise.correctAnswer);
    utter.rate = 0.85;
    utter.pitch = 1;
    utterRef.current = utter;
    window.speechSynthesis.speak(utter);
    setPlayed(true);
  };

  const correctAnswer = getCorrectAnswer();

  return (
    <div className="ls-audio-wrap">
      {/* Play button */}
      <button
        className={`ls-audio-play-btn${played ? ' ls-audio-play-btn--played' : ''}`}
        onClick={playAudio}
        aria-label="Play audio"
      >
        <Volume2 style={{ width: 32, height: 32 }} />
        <span>{played ? (isEn ? 'Play again' : 'Rejouer') : (isEn ? 'Play audio' : 'Écouter')}</span>
      </button>

      <p className="ls-audio-instruction">
        {isEn ? 'Which option matches what you heard?' : 'Quelle option correspond à ce que vous avez entendu ?'}
      </p>

      {/* Options — same grid as multiple-choice */}
      <div className="ls-options-grid">
        {shuffledOptions.map((option, i) => {
          const isSelected     = userAnswer === option;
          const isCorrectOpt   = option === correctAnswer;
          const showCorrect    = showFeedback && isCorrectOpt;
          const showIncorrect  = showFeedback && isSelected && !isCorrect;
          return (
            <button
              key={i}
              disabled={showFeedback || !played}
              onClick={() => onSelect(option)}
              className={`ls-option-btn${showCorrect ? ' ls-option-btn--correct' : showIncorrect ? ' ls-option-btn--wrong' : isSelected ? ' ls-option-btn--selected' : ''}`}
            >
              <span>{option}</span>
              {showCorrect   && <CheckCircle2 style={{ width: 18, height: 18, flexShrink: 0 }} />}
              {showIncorrect && <XCircle      style={{ width: 18, height: 18, flexShrink: 0 }} />}
            </button>
          );
        })}
      </div>

      {!played && (
        <p className="ls-audio-must-play">
          {isEn ? '⬆ You must play the audio before answering.' : '⬆ Vous devez écouter l\'audio avant de répondre.'}
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// WordOrderExercise
// Given English sentence + shuffled native-word tiles — tap tiles to assemble
// ─────────────────────────────────────────────────────────────────────────────

interface WordOrderProps {
  exercise: EnrichedExercise;
  interfaceLanguage: InterfaceLanguage;
  showFeedback: boolean;
  isCorrect: boolean;
  onAnswer: (assembled: string) => void; // called when user taps CHECK
}

export function WordOrderExercise({
  exercise,
  interfaceLanguage,
  showFeedback,
  isCorrect,
  onAnswer,
}: WordOrderProps) {
  const isEn = interfaceLanguage === 'en';
  const tiles = exercise.wordTiles ?? exercise.correctAnswer.split(' ');

  const [selected, setSelected] = useState<string[]>([]);
  const [remaining, setRemaining] = useState<string[]>([...tiles]);

  const addTile = (word: string, fromIdx: number) => {
    if (showFeedback) return;
    setSelected(s => [...s, word]);
    setRemaining(r => r.filter((_, i) => i !== fromIdx));
  };

  const removeTile = (word: string, fromIdx: number) => {
    if (showFeedback) return;
    setRemaining(r => [...r, word]);
    setSelected(s => s.filter((_, i) => i !== fromIdx));
  };

  const assembled = selected.join(' ');

  const assembledBgClass = showFeedback
    ? isCorrect ? ' ls-word-order-assembled--correct' : ' ls-word-order-assembled--wrong'
    : '';

  return (
    <div className="ls-word-order-wrap">
      {/* Assembled area */}
      <div className={`ls-word-order-assembled${assembledBgClass}`}>
        {selected.length === 0 ? (
          <span className="ls-word-order-placeholder">
            {isEn ? 'Tap tiles below to build the sentence…' : 'Appuyez sur les tuiles pour assembler la phrase…'}
          </span>
        ) : (
          selected.map((w, i) => (
            <button key={i} className="ls-word-tile ls-word-tile--selected" onClick={() => removeTile(w, i)}>
              {w}
            </button>
          ))
        )}
      </div>

      {/* Available tiles */}
      <div className="ls-word-tile-bank">
        {remaining.map((w, i) => (
          <button key={i} className="ls-word-tile" onClick={() => addTile(w, i)} disabled={showFeedback}>
            {w}
          </button>
        ))}
      </div>

      {/* Check / feedback shown by parent bottom bar — parent reads assembled via onAnswer */}
      {!showFeedback && selected.length > 0 && (
        <button
          className="ls-btn-check"
          style={{ marginTop: 8, width: '100%' }}
          onClick={() => onAnswer(assembled)}
        >
          {isEn ? '✓ CHECK' : '✓ VÉRIFIER'}
        </button>
      )}
    </div>
  );
}
