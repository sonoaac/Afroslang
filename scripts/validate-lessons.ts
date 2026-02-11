import { languages } from '../src/data/languages';
import { getStagesForLanguage } from '../src/data/lessons';
import type { AfricanLanguage, Exercise, Lesson, Stage } from '../src/types';

type ValidationIssue = {
  languageId: AfricanLanguage;
  where: string;
  message: string;
};

const allowedExerciseTypes = new Set<Exercise['type']>([
  'multiple-choice',
  'fill-blank',
  'match',
  'translate',
  'type-answer'
]);

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function validateExercise(languageId: AfricanLanguage, exercise: Exercise, where: string, issues: ValidationIssue[]) {
  if (!isNonEmptyString(exercise.id)) {
    issues.push({ languageId, where, message: 'Exercise has missing/empty id' });
  }

  if (!allowedExerciseTypes.has(exercise.type)) {
    issues.push({ languageId, where, message: `Exercise has unsupported type: ${String(exercise.type)}` });
  }

  if (!isNonEmptyString(exercise.question)) {
    issues.push({ languageId, where, message: 'Exercise has missing/empty question' });
  }

  if (!isNonEmptyString(exercise.correctAnswer)) {
    issues.push({ languageId, where, message: 'Exercise has missing/empty correctAnswer' });
  }

  if (exercise.type === 'multiple-choice') {
    if (!Array.isArray(exercise.options) || exercise.options.length < 2) {
      issues.push({ languageId, where, message: 'Multiple-choice exercise has missing/too-short options[]' });
      return;
    }

    if (!exercise.options.includes(exercise.correctAnswer)) {
      issues.push({ languageId, where, message: 'Multiple-choice options[] does not include correctAnswer' });
    }
  }
}

function validateLesson(languageId: AfricanLanguage, lesson: Lesson, stage: Stage, issues: ValidationIssue[]) {
  const where = `${stage.id} / ${lesson.id}`;

  if (!isNonEmptyString(lesson.id)) {
    issues.push({ languageId, where, message: 'Lesson has missing/empty id' });
  }

  if (!Array.isArray(lesson.exercises) || lesson.exercises.length === 0) {
    issues.push({ languageId, where, message: 'Lesson has no exercises' });
    return;
  }

  const exerciseIds = new Set<string>();
  for (const ex of lesson.exercises) {
    if (exerciseIds.has(ex.id)) {
      issues.push({ languageId, where, message: `Duplicate exercise id within lesson: ${ex.id}` });
    }
    if (isNonEmptyString(ex.id)) exerciseIds.add(ex.id);

    validateExercise(languageId, ex, where, issues);
  }
}

function validateStages(languageId: AfricanLanguage, stages: Stage[], issues: ValidationIssue[]) {
  if (!Array.isArray(stages) || stages.length === 0) {
    issues.push({ languageId, where: languageId, message: 'No stages found for language' });
    return;
  }

  const stageIds = new Set<string>();
  const lessonIds = new Set<string>();

  for (const stage of stages) {
    if (!isNonEmptyString(stage.id)) {
      issues.push({ languageId, where: languageId, message: 'Stage has missing/empty id' });
      continue;
    }

    if (stageIds.has(stage.id)) {
      issues.push({ languageId, where: stage.id, message: 'Duplicate stage id' });
    }
    stageIds.add(stage.id);

    if (!Array.isArray(stage.lessons)) {
      issues.push({ languageId, where: stage.id, message: 'Stage lessons is not an array' });
      continue;
    }

    for (const lesson of stage.lessons) {
      if (lessonIds.has(lesson.id)) {
        issues.push({ languageId, where: `${stage.id} / ${lesson.id}`, message: 'Duplicate lesson id across language stages' });
      }
      if (isNonEmptyString(lesson.id)) lessonIds.add(lesson.id);

      validateLesson(languageId, lesson, stage, issues);
    }
  }
}

async function main() {
  const issues: ValidationIssue[] = [];

  const languageIds = languages.map(l => l.id) as AfricanLanguage[];

  for (const languageId of languageIds) {
    const stages = getStagesForLanguage(languageId);
    validateStages(languageId, stages, issues);
  }

  if (issues.length === 0) {
    console.log(`✅ Lesson validation passed for ${languageIds.length} languages`);
    return;
  }

  const grouped = new Map<AfricanLanguage, ValidationIssue[]>();
  for (const issue of issues) {
    const arr = grouped.get(issue.languageId) ?? [];
    arr.push(issue);
    grouped.set(issue.languageId, arr);
  }

  console.error(`❌ Lesson validation found ${issues.length} issue(s):`);
  for (const [languageId, group] of grouped) {
    console.error(`\n- ${languageId}: ${group.length} issue(s)`);
    for (const issue of group.slice(0, 20)) {
      console.error(`  • ${issue.where}: ${issue.message}`);
    }
    if (group.length > 20) {
      console.error(`  • ...and ${group.length - 20} more`);
    }
  }

  process.exitCode = 1;
}

main().catch((err) => {
  console.error('❌ Validation script crashed:', err);
  process.exitCode = 1;
});
