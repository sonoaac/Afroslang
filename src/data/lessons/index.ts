import { swahiliStages } from './swahili-structured';
import { igboLessons } from './igbo';
import { hausaLessons } from './hausa';
import { yorubaLessons } from './yoruba';
import { zuluLessons } from './zulu';
import { mooreLessons } from './moore';
import { lingalaLessons } from './lingala';
import { somaliLessons } from './somali';
import { arabicLessons } from './arabic';
import { berberLessons } from './berber';
import { shonaLessons } from './shona';
import { chichewaLessons } from './chichewa';
import { wolofLessons } from './wolof';
import { twiLessons } from './twi';
import { amharicLessons } from './amharic';
import type { AfricanLanguage, Exercise, Lesson, Stage } from '../../types';

const STAGE_TEMPLATES: Array<Pick<Stage, 'title' | 'titleFr' | 'color'>> = [
  {
    title: 'Greetings & Introductions',
    titleFr: 'Salutations et présentations',
    color: 'from-[#F4A300] to-[#FF9500]'
  },
  {
    title: 'Polite & Formal Speech',
    titleFr: 'Politesse et formules',
    color: 'from-[#B11226] to-[#E11D48]'
  },
  {
    title: 'People & Family',
    titleFr: 'Personnes et famille',
    color: 'from-[#006D48] to-[#00A86B]'
  },
  {
    title: 'Everyday Nouns',
    titleFr: 'Noms du quotidien',
    color: 'from-[#0B0710] to-[#12050A]'
  },
  {
    title: 'Numbers & Time',
    titleFr: 'Nombres et temps',
    color: 'from-[#4169E1] to-[#6495ED]'
  },
  {
    title: 'Food & Daily Life',
    titleFr: 'Nourriture et vie quotidienne',
    color: 'from-[#8B4513] to-[#D2691E]'
  },
  {
    title: 'Conversation & Review',
    titleFr: 'Conversation et révision',
    color: 'from-[#228B22] to-[#32CD32]'
  },
];

function hashString(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number): () => number {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffled<T>(items: T[], seed: string): T[] {
  const rng = mulberry32(hashString(seed));
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function normalizeToTwenty(exercises: Exercise[] | undefined, seed: string): Exercise[] {
  const source = Array.isArray(exercises) ? exercises : [];

  const fallback: Exercise = {
    id: `${seed}-fallback-1`,
    type: 'multiple-choice',
    question: 'Select the correct answer',
    questionFr: 'Sélectionnez la bonne réponse',
    correctAnswer: 'A',
    options: ['A', 'B', 'C', 'D']
  };

  const base = source.length > 0 ? source : [fallback];
  const chosen = base.length >= 20 ? shuffled(base, seed).slice(0, 20) : [...base];

  while (chosen.length < 20) {
    const template = base[chosen.length % base.length];
    chosen.push({
      ...template,
      id: `${seed}-p${chosen.length + 1}`,
      question: template.question ? `${template.question} (Review)` : template.question,
      questionFr: template.questionFr ? `${template.questionFr} (Révision)` : template.questionFr,
    });
  }

  return chosen;
}

function toLesson(raw: any, stageId: string, slotIndex: number, seed: string, defaultTitle: string, defaultTitleFr: string): Lesson {
  const id = typeof raw?.id === 'string' && raw.id.trim() ? raw.id : `${stageId}-lesson-${slotIndex + 1}`;
  const type = raw?.type ?? 'vocabulary';
  const title = typeof raw?.title === 'string' && raw.title.trim() ? raw.title : defaultTitle;
  const titleFr = typeof raw?.titleFr === 'string' && raw.titleFr.trim() ? raw.titleFr : defaultTitleFr;
  const xpReward = typeof raw?.xpReward === 'number' ? raw.xpReward : 10;
  const exercises = normalizeToTwenty(raw?.exercises, `${id}:${seed}`);

  return {
    id,
    stageId,
    lessonNumber: slotIndex + 1,
    type,
    title,
    titleFr,
    xpReward,
    exercises,
  };
}

function createReviewLesson(languageId: AfricanLanguage, stageId: string, stageIndex: number, slotIndex: number, pool: Exercise[]): Lesson {
  const stageTemplate = STAGE_TEMPLATES[stageIndex] ?? STAGE_TEMPLATES[0];
  const id = `${languageId}-review-${stageIndex + 1}-${slotIndex + 1}`;
  const seed = `${languageId}:${stageIndex}:${slotIndex}`;
  const exercises = normalizeToTwenty(pool, `${id}:${seed}`);

  return {
    id,
    stageId,
    lessonNumber: slotIndex + 1,
    type: 'vocabulary',
    title: `Review: ${stageTemplate.title}`,
    titleFr: `Révision : ${stageTemplate.titleFr}`,
    xpReward: 10,
    exercises,
  };
}

function rawLessonsForLanguage(languageId: AfricanLanguage): any[] {
  switch (languageId) {
    case 'swahili':
      return swahiliStages.flatMap(s => s.lessons ?? []);
    case 'hausa':
      return hausaLessons as any[];
    case 'yoruba':
      return yorubaLessons as any[];
    case 'zulu':
      return zuluLessons as any[];
    case 'amharic':
      return amharicLessons as any[];
    case 'igbo':
      return igboLessons as any[];
    case 'arabic':
      return arabicLessons as any[];
    case 'shona':
      return shonaLessons as any[];
    case 'somali':
      return somaliLessons as any[];
    case 'berber':
      return berberLessons as any[];
    case 'moore':
      return mooreLessons as any[];
    case 'lingala':
      return lingalaLessons as any[];
    case 'twi':
      return twiLessons as any[];
    case 'chichewa':
      return chichewaLessons as any[];
    case 'wolof':
      return wolofLessons as any[];
    default:
      return [];
  }
}

function createSevenStageCurriculum(languageId: AfricanLanguage): Stage[] {
  const rawLessons = rawLessonsForLanguage(languageId);
  const allExercises: Exercise[] = rawLessons.flatMap(l => (Array.isArray(l?.exercises) ? (l.exercises as Exercise[]) : []));

  const stages: Stage[] = [];
  for (let stageIndex = 0; stageIndex < 7; stageIndex++) {
    const template = STAGE_TEMPLATES[stageIndex] ?? STAGE_TEMPLATES[0];
    const stageId = `${languageId}-stage-${stageIndex + 1}`;
    const lessons: Lesson[] = [];

    const poolCutoff = Math.max(1, Math.min(rawLessons.length, (stageIndex + 1) * 7));
    const poolExercises: Exercise[] = rawLessons
      .slice(0, poolCutoff)
      .flatMap(l => (Array.isArray(l?.exercises) ? (l.exercises as Exercise[]) : []));

    const pool = poolExercises.length > 0 ? poolExercises : allExercises;

    for (let slotIndex = 0; slotIndex < 7; slotIndex++) {
      const globalIndex = stageIndex * 7 + slotIndex;
      const raw = rawLessons[globalIndex];

      if (raw) {
        lessons.push(
          toLesson(
            raw,
            stageId,
            slotIndex,
            `${languageId}:${globalIndex}`,
            `Lesson ${slotIndex + 1}`,
            `Leçon ${slotIndex + 1}`
          )
        );
      } else {
        lessons.push(createReviewLesson(languageId, stageId, stageIndex, slotIndex, pool));
      }
    }

    stages.push({
      id: stageId,
      stageNumber: stageIndex + 1,
      title: template.title,
      titleFr: template.titleFr,
      color: template.color,
      lessons,
    });
  }

  return stages;
}

export const allStages: Record<AfricanLanguage, Stage[]> = {
  swahili: createSevenStageCurriculum('swahili'),
  hausa: createSevenStageCurriculum('hausa'),
  yoruba: createSevenStageCurriculum('yoruba'),
  zulu: createSevenStageCurriculum('zulu'),
  amharic: createSevenStageCurriculum('amharic'),
  igbo: createSevenStageCurriculum('igbo'),
  arabic: createSevenStageCurriculum('arabic'),
  shona: createSevenStageCurriculum('shona'),
  somali: createSevenStageCurriculum('somali'),
  berber: createSevenStageCurriculum('berber'),
  moore: createSevenStageCurriculum('moore'),
  lingala: createSevenStageCurriculum('lingala'),
  twi: createSevenStageCurriculum('twi'),
  chichewa: createSevenStageCurriculum('chichewa'),
  wolof: createSevenStageCurriculum('wolof'),
};

export function getStagesForLanguage(languageId: AfricanLanguage): Stage[] {
  return allStages[languageId] || [];
}

export function getLessonById(languageId: AfricanLanguage, lessonId: string): Lesson | undefined {
  const stages = getStagesForLanguage(languageId);
  for (const stage of stages) {
    const lesson = stage.lessons.find(l => l.id === lessonId);
    if (lesson) return lesson;
  }
  return undefined;
}
