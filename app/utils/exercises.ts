import type { Exercise, MuscleGroup } from '~~/types';
import { muscleGroups, exercises } from '@/data/muscle-groups';

export function getExerciseById(id: string): Exercise | undefined {
  return exercises.find((exercise) => exercise.id === id);
}

export function getMuscleGroupById(id: string): MuscleGroup | undefined {
  return muscleGroups.find((group) => group.id === id);
}

export function getExercisesByMuscleGroup(muscleGroupId: string): Exercise[] {
  return exercises.filter((exercise) => exercise.muscleGroupId === muscleGroupId);
}
