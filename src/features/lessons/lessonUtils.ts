import { Exercise, ConversationTurn, ToneEntry } from '../../types';
import { CulturalFact } from '../../data/culturalFacts';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface VocabPair {
  id: string;
  question: string;
  questionFr: string;
  answer: string;
  answerFr: string;
}

export interface EnrichedExercise extends Exercise {
  wasWrong?: boolean;
  hasRetried?: boolean;
  isEnriched?: boolean; // true = not counted toward quiz score/total
}

// ── Constants ─────────────────────────────────────────────────────────────────

export const TONAL_LANGUAGES = new Set([
  'igbo', 'yoruba', 'hausa', 'twi', 'ewe', 'moore', 'lingala',
]);

const TONE_DATA: Record<string, ToneEntry[]> = {
  igbo: [
    { mark: 'á', name: 'High Tone', nameFr: 'Ton Haut', example: 'ákwá', meaning: 'egg / to cry', meaningFr: 'œuf / pleurer', pitch: 'high' },
    { mark: 'à', name: 'Low Tone', nameFr: 'Ton Bas', example: 'àkwà', meaning: 'cloth / bed', meaningFr: 'tissu / lit', pitch: 'low' },
    { mark: 'a', name: 'Mid Tone', nameFr: 'Ton Moyen', example: 'akwa', meaning: 'bridge', meaningFr: 'pont', pitch: 'mid' },
  ],
  yoruba: [
    { mark: 'á', name: 'High Tone', nameFr: 'Ton Haut', example: 'iyá', meaning: 'mother', meaningFr: 'mère', pitch: 'high' },
    { mark: 'à', name: 'Low Tone', nameFr: 'Ton Bas', example: 'ìyà', meaning: 'suffering', meaningFr: 'souffrance', pitch: 'low' },
    { mark: 'a', name: 'Mid Tone', nameFr: 'Ton Moyen', example: 'iya', meaning: 'enlargement', meaningFr: 'élargissement', pitch: 'mid' },
  ],
  hausa: [
    { mark: 'â', name: 'Falling Tone', nameFr: 'Ton Descendant', example: 'gâri', meaning: 'town / flour', meaningFr: 'ville / farine', pitch: 'falling' },
    { mark: 'á', name: 'High Tone', nameFr: 'Ton Haut', example: 'rúwá', meaning: 'water', meaningFr: 'eau', pitch: 'high' },
    { mark: 'à', name: 'Low Tone', nameFr: 'Ton Bas', example: 'gàrì', meaning: 'cassava flour', meaningFr: 'farine de manioc', pitch: 'low' },
  ],
  twi: [
    { mark: 'á', name: 'High Tone', nameFr: 'Ton Haut', example: 'Ɔkyéna', meaning: 'tomorrow', meaningFr: 'demain', pitch: 'high' },
    { mark: 'à', name: 'Low Tone', nameFr: 'Ton Bas', example: 'mma', meaning: 'children', meaningFr: 'enfants', pitch: 'low' },
  ],
  moore: [
    { mark: 'á', name: 'High Tone', nameFr: 'Ton Haut', example: 'yãmba', meaning: 'speak', meaningFr: 'parler', pitch: 'high' },
    { mark: 'à', name: 'Low Tone', nameFr: 'Ton Bas', example: 'na', meaning: 'come', meaningFr: 'venir', pitch: 'low' },
  ],
  lingala: [
    { mark: 'á', name: 'High Tone', nameFr: 'Ton Haut', example: 'ndéle', meaning: 'sky', meaningFr: 'ciel', pitch: 'high' },
    { mark: 'à', name: 'Low Tone', nameFr: 'Ton Bas', example: 'ndèlè', meaning: 'star', meaningFr: 'étoile', pitch: 'low' },
  ],
};

const GREETINGS: Record<string, { phrase: string; translation: string; translationFr: string }> = {
  igbo:     { phrase: 'Ndewo!',      translation: 'Hello!',   translationFr: 'Bonjour !' },
  yoruba:   { phrase: 'Ẹ káàárọ̀!',  translation: 'Good morning!', translationFr: 'Bonjour !' },
  hausa:    { phrase: 'Sannu!',      translation: 'Hello!',   translationFr: 'Bonjour !' },
  swahili:  { phrase: 'Habari!',     translation: 'How are you?', translationFr: 'Comment ça va ?' },
  zulu:     { phrase: 'Sawubona!',   translation: 'Hello!',   translationFr: 'Bonjour !' },
  amharic:  { phrase: 'ሰላም!',       translation: 'Hello!',   translationFr: 'Bonjour !' },
  wolof:    { phrase: 'Salaam!',     translation: 'Hello!',   translationFr: 'Bonjour !' },
  twi:      { phrase: 'Akwaaba!',    translation: 'Welcome!', translationFr: 'Bienvenue !' },
  lingala:  { phrase: 'Mbote!',      translation: 'Hello!',   translationFr: 'Bonjour !' },
  shona:    { phrase: 'Mhoro!',      translation: 'Hello!',   translationFr: 'Bonjour !' },
  arabic:   { phrase: 'أهلاً!',      translation: 'Hello!',   translationFr: 'Bonjour !' },
  berber:   { phrase: 'Azul!',       translation: 'Hello!',   translationFr: 'Bonjour !' },
  somali:   { phrase: 'Salaan!',     translation: 'Hello!',   translationFr: 'Bonjour !' },
  moore:    { phrase: 'Nee windiga!',translation: 'Good morning!', translationFr: 'Bonjour !' },
  chichewa: { phrase: 'Moni!',       translation: 'Hello!',   translationFr: 'Bonjour !' },
};

// ── Deterministic shuffle (no Math.random so useMemo stays stable) ────────────

function seededShuffle<T>(arr: T[], seed: number): T[] {
  const result = [...arr];
  let s = (seed ^ 0xdeadbeef) >>> 0;
  for (let i = result.length - 1; i > 0; i--) {
    s = Math.imul(s ^ (s >>> 15), s | 1);
    s ^= s + Math.imul(s ^ (s >>> 7), s | 61);
    s = ((s ^ (s >>> 14)) >>> 0) % (i + 1);
    const j = s % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// ── Vocab extraction ──────────────────────────────────────────────────────────

export function extractTeachVocab(exercises: Exercise[]): VocabPair[] {
  return exercises
    .filter(ex => ex.type === 'multiple-choice' && ex.correctAnswer.trim())
    .slice(0, 8)
    .map(ex => ({
      id: ex.id,
      question: ex.question,
      questionFr: ex.questionFr || ex.question,
      answer: ex.correctAnswer,
      answerFr: ex.correctAnswerFr || ex.correctAnswer,
    }));
}

// ── Tone trainer exercise ────────────────────────────────────────────────────

function makeToneExercise(languageId: string, seed: number): EnrichedExercise {
  const tones = TONE_DATA[languageId] ?? TONE_DATA.igbo;
  const shuffled = seededShuffle(tones, seed);
  const target = shuffled[0];
  return {
    id: `tone-${languageId}-${seed}`,
    type: 'tone-trainer',
    question: `Which tone mark does "${target.example}" carry?`,
    questionFr: `Quel ton porte "${target.example}" ?`,
    correctAnswer: target.name,
    correctAnswerFr: target.nameFr,
    options: tones.map(t => t.name),
    optionsFr: tones.map(t => t.nameFr),
    toneData: tones,
    isEnriched: true,
  };
}

// ── Conversation builder ──────────────────────────────────────────────────────

function buildConversationScript(
  exercises: Exercise[],
  languageId: string,
): ConversationTurn[] {
  const vocab = exercises
    .filter(ex => ex.type === 'multiple-choice' && ex.correctAnswer.trim())
    .slice(0, 4);

  if (vocab.length < 2) return [];

  const greeting = GREETINGS[languageId] ?? { phrase: 'Hello!', translation: 'Hello!', translationFr: 'Bonjour !' };
  const [v1, v2, v3] = vocab;

  return [
    {
      speaker: 'guide',
      text: greeting.phrase,
      textTranslation: greeting.translation,
      textTranslationFr: greeting.translationFr,
    },
    {
      speaker: 'user',
      text: v1.correctAnswer,
      textTranslation: v1.question,
      options: seededShuffle(
        [v1.correctAnswer, v2.correctAnswer, v3?.correctAnswer ?? 'Ọ dị mma'].filter(Boolean),
        47,
      ),
      correctIndex: 0,
    },
    {
      speaker: 'guide',
      text: v2.correctAnswer,
      textTranslation: v2.question,
    },
    {
      speaker: 'user',
      text: v2.correctAnswer,
      textTranslation: v2.question,
      options: seededShuffle(
        [v2.correctAnswer, v1.correctAnswer, v3?.correctAnswer ?? greeting.phrase].filter(Boolean),
        83,
      ),
      correctIndex: 0,
    },
  ];
}

// ── Story exercise ────────────────────────────────────────────────────────────

function buildStoryExercise(
  facts: CulturalFact[],
  exercises: Exercise[],
  seed: number,
): EnrichedExercise | null {
  if (facts.length === 0) return null;

  const fact = facts[seed % facts.length];
  const storyWords = exercises
    .filter(ex => ex.correctAnswer.trim().split(' ').length === 1)
    .slice(0, 5)
    .map(ex => ({
      word: ex.correctAnswer,
      meaning: ex.correctAnswer,
      meaningFr: ex.correctAnswerFr ?? ex.correctAnswer,
    }));

  const compQ = exercises.find(ex => ex.type === 'multiple-choice');

  return {
    id: `story-${seed}`,
    type: 'story',
    question: compQ?.question ?? 'What did you learn?',
    questionFr: compQ?.questionFr ?? "Qu'avez-vous appris ?",
    correctAnswer: compQ?.correctAnswer ?? '',
    correctAnswerFr: compQ?.correctAnswerFr,
    options: compQ?.options,
    optionsFr: compQ?.optionsFr,
    storyText: fact.text,
    storyTextFr: fact.textFr,
    storyWords,
    isEnriched: true,
  };
}

// ── Main queue builder ────────────────────────────────────────────────────────

export function buildEnrichedQueue(
  exercises: Exercise[],
  languageId: string,
  facts: CulturalFact[],
  lessonType: string,
  lessonSeed: number,
): EnrichedExercise[] {
  const queue: EnrichedExercise[] = [];
  const isTonal = TONAL_LANGUAGES.has(languageId);
  let toneInserted = false;
  let factIndex = 0;

  // ── Preamble enriched items ──────────────────────────────────────────────
  // Conversation intro (first item before any quiz exercises)
  const convoScript = buildConversationScript(exercises, languageId);
  if (convoScript.length >= 2) {
    queue.push({
      id: 'conversation-intro',
      type: 'conversation',
      question: 'Practice a quick conversation',
      questionFr: 'Pratiquez une courte conversation',
      correctAnswer: '',
      conversationScript: convoScript,
      isEnriched: true,
    });
  }

  // Story for culture-type lessons
  if (lessonType === 'culture' && facts.length > 0) {
    const storyEx = buildStoryExercise(facts, exercises, lessonSeed);
    if (storyEx) queue.push(storyEx);
  }

  // ── Interleave quiz exercises with enriched items ────────────────────────
  exercises.forEach((ex, idx) => {
    // Cultural card every 6 real exercises
    if (idx > 0 && idx % 6 === 0 && factIndex < facts.length) {
      const f = facts[factIndex++];
      queue.push({
        id: `cultural-${idx}`,
        type: 'cultural-card',
        question: '',
        questionFr: '',
        correctAnswer: '',
        culturalText: f.text,
        culturalTextFr: f.textFr,
        culturalEmoji: f.emoji,
        isEnriched: true,
      });
    }

    // Tone trainer for tonal languages at exercise index 3
    if (isTonal && idx === 3 && !toneInserted) {
      queue.push(makeToneExercise(languageId, lessonSeed + idx));
      toneInserted = true;
    }

    // Transform exercise types based on deterministic position
    if (ex.type === 'multiple-choice' && idx % 4 === 2) {
      // Every 4th multiple-choice (positions 2, 6, 10…) → audio-match
      queue.push({ ...ex, type: 'audio-match' });
    } else if (
      (ex.type === 'translate' || ex.type === 'fill-blank') &&
      ex.correctAnswer.split(' ').length >= 2
    ) {
      // Multi-word translate/fill-blank → word-order
      const words = ex.correctAnswer.split(' ');
      queue.push({ ...ex, type: 'word-order', wordTiles: seededShuffle(words, lessonSeed + idx) });
    } else if (ex.type === 'multiple-choice' && idx % 5 === 0 && idx > 0) {
      // Every 5th multiple-choice → preceded by a vocab flashcard
      queue.push({
        id: `flash-${ex.id}`,
        type: 'flashcard',
        question: ex.correctAnswer,        // native word shown on front
        questionFr: ex.correctAnswerFr ?? ex.correctAnswer,
        correctAnswer: ex.question,         // English context on back
        correctAnswerFr: ex.questionFr ?? ex.question,
        isEnriched: true,
      });
      queue.push({ ...ex });
    } else {
      queue.push({ ...ex });
    }
  });

  return queue;
}
