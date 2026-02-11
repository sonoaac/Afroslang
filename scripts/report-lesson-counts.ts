import { languages } from '../src/data/languages';
import type { AfricanLanguage } from '../src/types';

import { hausaLessons } from '../src/data/lessons/hausa';
import { yorubaLessons } from '../src/data/lessons/yoruba';
import { zuluLessons } from '../src/data/lessons/zulu';
import { igboLessons } from '../src/data/lessons/igbo';
import { mooreLessons } from '../src/data/lessons/moore';
import { lingalaLessons } from '../src/data/lessons/lingala';
import { somaliLessons } from '../src/data/lessons/somali';
import { arabicLessons } from '../src/data/lessons/arabic';
import { berberLessons } from '../src/data/lessons/berber';
import { shonaLessons } from '../src/data/lessons/shona';
import { chichewaLessons } from '../src/data/lessons/chichewa';
import { wolofLessons } from '../src/data/lessons/wolof';
import { twiLessons } from '../src/data/lessons/twi';
import { amharicLessons } from '../src/data/lessons/amharic';

import { swahiliStages } from '../src/data/lessons/swahili-structured';

const rawLessons: Record<AfricanLanguage, any[]> = {
  swahili: swahiliStages.flatMap(s => s.lessons ?? []),
  hausa: hausaLessons as any[],
  yoruba: yorubaLessons as any[],
  zulu: zuluLessons as any[],
  amharic: amharicLessons as any[],
  igbo: igboLessons as any[],
  arabic: arabicLessons as any[],
  shona: shonaLessons as any[],
  somali: somaliLessons as any[],
  berber: berberLessons as any[],
  moore: mooreLessons as any[],
  lingala: lingalaLessons as any[],
  twi: twiLessons as any[],
  chichewa: chichewaLessons as any[],
  wolof: wolofLessons as any[],
};

function countExercises(lessons: any[]): number {
  return lessons.reduce((sum, l) => sum + (Array.isArray(l.exercises) ? l.exercises.length : 0), 0);
}

const targetLessons = 7 * 7;

for (const lang of languages) {
  const id = lang.id;
  const lessons = rawLessons[id] ?? [];
  const lessonCount = lessons.length;
  const exCount = countExercises(lessons);
  const avg = lessonCount ? (exCount / lessonCount).toFixed(1) : '0.0';
  const coverage = Math.min(100, Math.round((lessonCount / targetLessons) * 100));
  console.log(`${id.padEnd(9)} lessons=${String(lessonCount).padStart(3)}  exercises=${String(exCount).padStart(5)}  avg=${avg.padStart(5)}  coverage=${String(coverage).padStart(3)}%`);
}
