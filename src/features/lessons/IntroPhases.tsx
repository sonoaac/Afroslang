import { useState, useEffect } from 'react';
import { InterfaceLanguage } from '../../types';
import { VocabPair } from './lessonUtils';

// ── TeachMode — Step 2/3 ──────────────────────────────────────────────────────

interface TeachModeProps {
  vocab: VocabPair[];
  interfaceLanguage: InterfaceLanguage;
  languageName: string;
  onComplete: () => void;
  onSkip: () => void;
}

export function TeachMode({
  vocab,
  interfaceLanguage,
  languageName,
  onComplete,
  onSkip,
}: TeachModeProps) {
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const isEn = interfaceLanguage === 'en';
  const current = vocab[idx];

  if (!current) {
    onComplete();
    return null;
  }

  const handleGotIt = () => {
    setRevealed(false);
    if (idx + 1 >= vocab.length) {
      onComplete();
    } else {
      setIdx(i => i + 1);
    }
  };

  return (
    <div className="ls-intro-overlay">
      <div className="ls-intro-card">
        {/* Header */}
        <div className="ls-intro-eyebrow">
          {isEn
            ? `Step 2 of 3 · ${languageName} Vocabulary`
            : `Étape 2 sur 3 · Vocabulaire ${languageName}`}
        </div>

        {/* Step progress */}
        <div className="ls-intro-progress" style={{ marginBottom: 20 }}>
          <div className="ls-intro-prog-bar ls-intro-prog-bar--active" />
          <div className="ls-intro-prog-bar ls-intro-prog-bar--active" />
          <div className="ls-intro-prog-bar" />
        </div>

        {/* Card counter */}
        <div className="ls-teach-counter">
          {idx + 1} / {vocab.length}
        </div>

        {/* Vocab card */}
        <div className="ls-teach-card">
          {/* Question side */}
          <p className="ls-teach-question">
            {isEn ? current.question : current.questionFr}
          </p>

          {/* Answer — hidden until revealed */}
          {revealed ? (
            <div className="ls-teach-answer-reveal">
              <div className="ls-teach-answer-label">
                {isEn ? 'Answer' : 'Réponse'}
              </div>
              <p className="ls-teach-answer">{isEn ? current.answer : current.answerFr}</p>
            </div>
          ) : (
            <button className="ls-teach-reveal-btn" onClick={() => setRevealed(true)}>
              {isEn ? '👁 Show Answer' : '👁 Voir la réponse'}
            </button>
          )}
        </div>

        {/* Actions */}
        <div className="ls-intro-actions">
          <button className="ls-intro-skip" onClick={onSkip}>
            {isEn ? 'Skip all' : 'Tout passer'}
          </button>
          {revealed && (
            <button className="ls-btn-check" style={{ flex: 1 }} onClick={handleGotIt}>
              {idx + 1 >= vocab.length
                ? (isEn ? 'Continue →' : 'Continuer →')
                : (isEn ? 'Got it ✓' : 'Compris ✓')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── PreviewPhase — Step 3/3 ───────────────────────────────────────────────────

interface PreviewPhaseProps {
  vocab: VocabPair[];
  interfaceLanguage: InterfaceLanguage;
  languageName: string;
  onComplete: () => void;
}

const PREVIEW_COUNT = 3;
const PREVIEW_DURATION_MS = 2600;

export function PreviewPhase({
  vocab,
  interfaceLanguage,
  languageName,
  onComplete,
}: PreviewPhaseProps) {
  const isEn = interfaceLanguage === 'en';
  const preview = vocab.slice(0, PREVIEW_COUNT);
  const [idx, setIdx] = useState(0);
  const [done, setDone] = useState(false);

  // Auto-advance every PREVIEW_DURATION_MS ms
  useEffect(() => {
    if (done) return;
    const t = setTimeout(() => {
      if (idx + 1 >= preview.length) {
        setDone(true);
      } else {
        setIdx(i => i + 1);
      }
    }, PREVIEW_DURATION_MS);
    return () => clearTimeout(t);
  }, [idx, done, preview.length]);

  const current = preview[idx];

  return (
    <div className="ls-intro-overlay">
      <div className="ls-intro-card">
        <div className="ls-intro-eyebrow">
          {isEn
            ? `Step 3 of 3 · Quick Review · ${languageName}`
            : `Étape 3 sur 3 · Révision rapide · ${languageName}`}
        </div>

        {/* Step progress */}
        <div className="ls-intro-progress" style={{ marginBottom: 20 }}>
          <div className="ls-intro-prog-bar ls-intro-prog-bar--active" />
          <div className="ls-intro-prog-bar ls-intro-prog-bar--active" />
          <div className="ls-intro-prog-bar ls-intro-prog-bar--active" />
        </div>

        {done ? (
          /* All cards flashed — ready to begin */
          <div className="ls-preview-ready">
            <span className="ls-preview-ready-icon">🚀</span>
            <p className="ls-preview-ready-text">
              {isEn ? "You're ready! Let's go." : 'Vous êtes prêt(e) ! C\'est parti.'}
            </p>
            <button className="ls-btn-check" onClick={onComplete} style={{ width: '100%' }}>
              {isEn ? 'BEGIN LESSON' : 'COMMENCER LA LEÇON'}
            </button>
          </div>
        ) : (
          /* Flash card */
          <>
            {/* Timer dots */}
            <div className="ls-preview-dots">
              {preview.map((_, i) => (
                <div
                  key={i}
                  className={`ls-preview-dot${i === idx ? ' ls-preview-dot--active' : i < idx ? ' ls-preview-dot--done' : ''}`}
                />
              ))}
            </div>

            <div className="ls-preview-flash" key={current.id}>
              <p className="ls-preview-native">{isEn ? current.answer : current.answerFr}</p>
              <p className="ls-preview-english">{isEn ? current.question : current.questionFr}</p>
            </div>

            <button className="ls-intro-skip" onClick={onComplete} style={{ width: '100%', textAlign: 'center' }}>
              {isEn ? 'Skip to lesson' : 'Passer à la leçon'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
