import type { Exercise, MuscleGroup, EquipmentType } from '~~/types';
import { muscleGroups, exercises } from '@/data/muscle-groups';

export const equipmentLabels: Record<EquipmentType, string> = {
  barbell: 'Barbell',
  dumbbell: 'Dumbbell',
  machine: 'Machine',
  cable: 'Cable',
  bodyweight: 'Bodyweight',
};

export function getExerciseById(id: string): Exercise | undefined {
  return exercises.find((exercise) => exercise.id === id);
}

export function getMuscleGroupById(id: string): MuscleGroup | undefined {
  return muscleGroups.find((group) => group.id === id);
}

export function getExercisesByMuscleGroup(muscleGroupId: string): Exercise[] {
  return exercises.filter((exercise) => exercise.muscleGroupId === muscleGroupId);
}
