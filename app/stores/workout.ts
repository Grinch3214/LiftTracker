import { computed } from 'vue';
import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import type { Workout, WorkoutExercise, SetEntry } from '~~/types';

export interface ExerciseHistoryEntry {
  workoutId: string;
  date: string;
  sets: SetEntry[];
  maxWeight: number;
  totalVolume: number;
  bestSet: SetEntry | null;
}

export const useWorkoutStore = defineStore('workout', () => {
  const workouts = useStorage<Workout[]>('lift-tracker-workouts', []);

  function getWorkoutByDate(date: string): Workout | undefined {
    return workouts.value.find((workout) => workout.date === date);
  }

  function getOrCreateWorkoutByDate(date: string): Workout {
    let workout = getWorkoutByDate(date);
    if (!workout) {
      workout = {
        id: crypto.randomUUID(),
        date,
        exercises: [],
        createdAt: new Date().toISOString(),
      };
      workouts.value.push(workout);
    }
    return workout;
  }

  function addExercise(date: string, exerciseId: string): WorkoutExercise {
    const workout = getOrCreateWorkoutByDate(date);
    const existing = workout.exercises.find(
      (exercise) => exercise.exerciseId === exerciseId,
    );
    if (existing) return existing;

    const workoutExercise: WorkoutExercise = {
      id: crypto.randomUUID(),
      exerciseId,
      sets: [],
      order: workout.exercises.length,
    };
    workout.exercises.push(workoutExercise);
    return workoutExercise;
  }

  function removeExercise(date: string, workoutExerciseId: string): void {
    const workout = getWorkoutByDate(date);
    if (!workout) return;

    const index = workout.exercises.findIndex(
      (exercise) => exercise.id === workoutExerciseId,
    );
    if (index !== -1) workout.exercises.splice(index, 1);

    if (workout.exercises.length === 0) {
      const workoutIndex = workouts.value.findIndex((w) => w.id === workout.id);
      if (workoutIndex !== -1) workouts.value.splice(workoutIndex, 1);
    }
  }

  function addSet(
    date: string,
    workoutExerciseId: string,
    weight: number,
    reps: number,
  ): void {
    const workout = getWorkoutByDate(date);
    const exercise = workout?.exercises.find((e) => e.id === workoutExerciseId);
    if (!exercise) return;

    exercise.sets.push({
      id: crypto.randomUUID(),
      weight,
      reps,
      isCompleted: true,
    });
  }

  function updateSet(
    date: string,
    workoutExerciseId: string,
    setId: string,
    weight: number,
    reps: number,
  ): void {
    const workout = getWorkoutByDate(date);
    const exercise = workout?.exercises.find((e) => e.id === workoutExerciseId);
    const set = exercise?.sets.find((s) => s.id === setId);
    if (!set) return;

    set.weight = weight;
    set.reps = reps;
  }

  function removeSet(
    date: string,
    workoutExerciseId: string,
    setId: string,
  ): void {
    const workout = getWorkoutByDate(date);
    const exercise = workout?.exercises.find((e) => e.id === workoutExerciseId);
    if (!exercise) return;

    const index = exercise.sets.findIndex((s) => s.id === setId);
    if (index !== -1) exercise.sets.splice(index, 1);
  }

  const workoutDates = computed(() => workouts.value.map((w) => w.date));

  function getExerciseHistory(exerciseId: string): ExerciseHistoryEntry[] {
    return workouts.value
      .filter((workout) =>
        workout.exercises.some((e) => e.exerciseId === exerciseId),
      )
      .map((workout) => {
        const exercise = workout.exercises.find(
          (e) => e.exerciseId === exerciseId,
        )!;
        const maxWeight =
          exercise.sets.length > 0
            ? Math.max(...exercise.sets.map((s) => s.weight))
            : 0;
        const totalVolume = exercise.sets.reduce(
          (sum, s) => sum + s.weight * s.reps,
          0,
        );
        const bestSet =
          exercise.sets.length > 0
            ? exercise.sets.reduce((best, s) =>
                s.weight > best.weight ? s : best,
              )
            : null;
        return {
          workoutId: workout.id,
          date: workout.date,
          sets: exercise.sets,
          maxWeight,
          totalVolume,
          bestSet,
        };
      })
      .sort((a, b) => a.date.localeCompare(b.date));
  }

  function getPersonalRecord(
    exerciseId: string,
  ): { weight: number; reps: number; date: string } | null {
    const history = getExerciseHistory(exerciseId);
    if (!history.length) return null;

    let pr = { weight: 0, reps: 0, date: '' };
    history.forEach((entry) => {
      entry.sets.forEach((set) => {
        if (
          set.weight > pr.weight ||
          (set.weight === pr.weight && set.reps > pr.reps)
        ) {
          pr = { weight: set.weight, reps: set.reps, date: entry.date };
        }
      });
    });
    return pr.reps > 0 ? pr : null;
  }

  return {
    workouts,
    getWorkoutByDate,
    getOrCreateWorkoutByDate,
    addExercise,
    removeExercise,
    addSet,
    updateSet,
    removeSet,
    workoutDates,
    getExerciseHistory,
    getPersonalRecord,
  };
});
