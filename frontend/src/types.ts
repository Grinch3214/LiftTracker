export type EquipmentType =
  | 'barbell'
  | 'dumbbell'
  | 'machine'
  | 'cable'
  | 'bodyweight';

export interface Exercise {
  id: number;
  name: string;
  equipment: EquipmentType;
}

export interface MuscleGroup {
  id: number;
  name: string;
  icon: string;
  exercises: Exercise[];
}

export interface WorkoutSet {
  id: number;
  weight: number;
  reps: number;
}

export interface WorkoutExercise {
  id: number;
  exerciseId: number;
  sets: WorkoutSet[];
}

export interface WorkoutLog {
  date: string; // 'YYYY-MM-DD'
  exercises: WorkoutExercise[];
}

export interface WorkoutTemplate {
  id: number;
  name: string;
  icon: string;
  exercises: {
    exerciseId: number;
    defaultSets: number;
    defaultReps: number;
    defaultWeight: number;
  }[];
}