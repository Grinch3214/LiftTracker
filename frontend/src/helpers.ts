import { workoutLogs, muscleGroups } from './mockdata';
import type { WorkoutLog, Exercise, MuscleGroup } from './types';

export const getLogByDate = (date: string): WorkoutLog | undefined =>
  workoutLogs.find((log) => log.date === date);

export const getExerciseById = (id: number): Exercise | undefined =>
  muscleGroups.flatMap((g) => g.exercises).find((ex) => ex.id === id);

export const getMuscleGroupById = (id: number): MuscleGroup | undefined =>
  muscleGroups.find((g) => g.id === id);

export const getMuscleGroupForExercise = (
  exerciseId: number,
): MuscleGroup | undefined =>
  muscleGroups.find((g) => g.exercises.some((e) => e.id === exerciseId));

export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};