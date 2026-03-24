export type InterfaceLanguage = 'en' | 'fr';

export type AfricanLanguage =
  | 'swahili'
  | 'hausa'
  | 'yoruba'
  | 'zulu'
  | 'amharic'
  | 'igbo'
  | 'arabic'
  | 'shona'
  | 'somali'
  | 'berber'
  | 'moore'
  | 'lingala'
  | 'twi'
  | 'chichewa'
  | 'wolof';

export interface Language {
  id: AfricanLanguage;
  name: string;
  nameFr: string;
  countries: string[];
  flags: string[];
  region: 'west' | 'east' | 'central' | 'north' | 'southern';
  speakers: string;
}

export interface UserProgress {
  languageId: AfricanLanguage;
  xp: number;
  level: number;
  hearts: number; // Supports decimals (e.g., 4.5 for half hearts)
  heartsResetTime: number | null;
  streak: number;
  lastPracticeDate: string | null;
  streakDays?: number[]; // Array of day numbers in current month that have streaks (1-31)
  lessonsCompleted: number;
  wordsLearned: number;
  mistakeCount: number;
  completedLessons: string[]; // Array of completed lesson IDs
  currentStage: number; // Current stage the user is on
}

export interface Stage {
  id: string;
  stageNumber: number;
  title: string;
  titleFr: string;
  color: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  stageId: string;
  lessonNumber: number; // 1-5 within each stage
  type: 'vocabulary' | 'grammar' | 'writing' | 'culture';
  title: string;
  titleFr: string;
  xpReward: number;
  exercises: Exercise[];
}

// ── Supporting interfaces for enriched exercise types ────────────────────────

export interface ConversationTurn {
  speaker: 'guide' | 'user';
  text: string;                  // native language phrase shown
  textTranslation: string;       // English gloss shown below
  textTranslationFr?: string;
  options?: string[];            // choices for user turns
  optionsFr?: string[];
  correctIndex?: number;         // index into options[] that is correct
}

export interface StoryWord {
  word: string;       // native-language word as it appears in the story text
  meaning: string;    // English meaning shown on tap
  meaningFr?: string;
}

export interface ToneEntry {
  mark: string;          // diacritic symbol shown e.g. "á"
  name: string;          // English label e.g. "High Tone"
  nameFr: string;
  example: string;       // native word using that tone
  meaning: string;       // English meaning of the example word
  meaningFr: string;
  pitch: 'high' | 'low' | 'mid' | 'rising' | 'falling';
}

// ── Exercise ─────────────────────────────────────────────────────────────────

export interface Exercise {
  id: string;
  type:
    | 'multiple-choice'
    | 'fill-blank'
    | 'match'
    | 'translate'
    | 'type-answer'
    // ── Enriched types (injected at runtime, not in lesson data files) ──
    | 'flashcard'       // flip card: native word → English meaning
    | 'audio-match'     // TTS audio plays, user picks written option
    | 'word-order'      // tap word tiles to assemble a sentence
    | 'cultural-card'   // non-quiz cultural insight slide
    | 'conversation'    // scripted dialogue with option choices
    | 'story'           // story paragraph with tappable vocab
    | 'tone-trainer';   // tone identification for tonal languages
  question: string;
  questionFr: string;
  correctAnswer: string;
  correctAnswerFr?: string;
  options?: string[];
  optionsFr?: string[];
  hint?: string;
  hintFr?: string;
  // word-order
  wordTiles?: string[];
  // cultural-card
  culturalText?: string;
  culturalTextFr?: string;
  culturalEmoji?: string;
  // conversation
  conversationScript?: ConversationTurn[];
  // story
  storyText?: string;
  storyTextFr?: string;
  storyWords?: StoryWord[];
  // tone-trainer
  toneData?: ToneEntry[];
}

export interface CulturalCapsule {
  id: string;
  languageId: AfricanLanguage;
  type: 'proverb' | 'dialogue' | 'trivia';
  content: string;
  contentFr: string;
  translation: string;
  translationFr: string;
  explanation: string;
  explanationFr: string;
}
