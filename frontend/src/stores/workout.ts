import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import {
  workoutLogs,
  workoutTemplates,
  type WorkoutLog,
  type WorkoutExercise,
  type WorkoutSet,
} from '../mockdata';

export const useWorkoutStore = defineStore('workout', () => {
  const logs = ref<WorkoutLog[]>(JSON.parse(JSON.stringify(workoutLogs)));

  let _idCounter = 100000;
  function nextId(): number {
    return ++_idCounter;
  }

  function getLogByDate(date: string): WorkoutLog | undefined {
    return logs.value.find((l) => l.date === date);
  }

  function getOrCreateLog(date: string): WorkoutLog {
    let log = getLogByDate(date);
    if (!log) {
      log = { date, exercises: [] };
      logs.value.push(log);
    }
    return log;
  }

  function addExercise(date: string, exerciseId: number): WorkoutExercise {
    const log = getOrCreateLog(date);
    const existing = log.exercises.find((e) => e.exerciseId === exerciseId);
    if (existing) return existing;
    const exercise: WorkoutExercise = { id: nextId(), exerciseId, sets: [] };
    log.exercises.push(exercise);
    return exercise;
  }

  function removeExercise(date: string, workoutExerciseId: number): void {
    const log = getLogByDate(date);
    if (!log) return;
    const idx = log.exercises.findIndex((e) => e.id === workoutExerciseId);
    if (idx !== -1) log.exercises.splice(idx, 1);
    if (log.exercises.length === 0) {
      const li = logs.value.findIndex((l) => l.date === date);
      if (li !== -1) logs.value.splice(li, 1);
    }
  }

  function addSet(
    date: string,
    workoutExerciseId: number,
    weight: number,
    reps: number,
  ): void {
    const log = getLogByDate(date);
    if (!log) return;
    const ex = log.exercises.find((e) => e.id === workoutExerciseId);
    if (!ex) return;
    const nextSetId =
      ex.sets.length > 0 ? Math.max(...ex.sets.map((s) => s.id)) + 1 : 1;
    ex.sets.push({ id: nextSetId, weight, reps });
  }

  function updateSet(
    date: string,
    workoutExerciseId: number,
    setId: number,
    weight: number,
    reps: number,
  ): void {
    const log = getLogByDate(date);
    if (!log) return;
    const ex = log.exercises.find((e) => e.id === workoutExerciseId);
    if (!ex) return;
    const set = ex.sets.find((s) => s.id === setId);
    if (!set) return;
    set.weight = weight;
    set.reps = reps;
  }

  function removeSet(
    date: string,
    workoutExerciseId: number,
    setId: number,
  ): void {
    const log = getLogByDate(date);
    if (!log) return;
    const ex = log.exercises.find((e) => e.id === workoutExerciseId);
    if (!ex) return;
    const idx = ex.sets.findIndex((s) => s.id === setId);
    if (idx !== -1) ex.sets.splice(idx, 1);
  }

  function startFromTemplate(date: string, templateId: number): void {
    const template = workoutTemplates.find((t) => t.id === templateId);
    if (!template) return;
    const log = getOrCreateLog(date);
    log.exercises = [];
    template.exercises.forEach((te) => {
      const sets: WorkoutSet[] = Array.from(
        { length: te.defaultSets },
        (_, i) => ({ id: i + 1, weight: te.defaultWeight, reps: te.defaultReps }),
      );
      log.exercises.push({ id: nextId(), exerciseId: te.exerciseId, sets });
    });
  }

  const workoutDates = computed(() => logs.value.map((l) => l.date));

  function getExerciseHistory(exerciseId: number) {
    return logs.value
      .filter((log) => log.exercises.some((e) => e.exerciseId === exerciseId))
      .map((log) => {
        const ex = log.exercises.find((e) => e.exerciseId === exerciseId)!;
        const maxWeight =
          ex.sets.length > 0 ? Math.max(...ex.sets.map((s) => s.weight)) : 0;
        const totalVolume = ex.sets.reduce(
          (sum, s) => sum + s.weight * s.reps,
          0,
        );
        const bestSet =
          ex.sets.length > 0
            ? ex.sets.reduce((best, s) =>
                s.weight > best.weight ? s : best,
              )
            : null;
        return { date: log.date, sets: ex.sets, maxWeight, totalVolume, bestSet };
      })
      .sort((a, b) => a.date.localeCompare(b.date));
  }

  function getPersonalRecord(
    exerciseId: number,
  ): { weight: number; reps: number; date: string } | null {
    const history = getExerciseHistory(exerciseId);
    if (!history.length) return null;
    let pr = { weight: 0, reps: 0, date: '' };
    history.forEach((h) => {
      h.sets.forEach((s) => {
        if (
          s.weight > pr.weight ||
          (s.weight === pr.weight && s.reps > pr.reps)
        ) {
          pr = { weight: s.weight, reps: s.reps, date: h.date };
        }
      });
    });
    return pr.reps > 0 ? pr : null;
  }

  return {
    logs,
    getLogByDate,
    addExercise,
    removeExercise,
    addSet,
    updateSet,
    removeSet,
    startFromTemplate,
    workoutDates,
    getExerciseHistory,
    getPersonalRecord,
  };
});