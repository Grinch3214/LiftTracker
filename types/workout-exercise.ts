import { type SetEntry } from './set-entry';

// One exercise performed within a specific Workout (not the catalog entry itself)
export interface WorkoutExercise {
  id: string;
  exerciseId: string; // links to Exercise.id in the catalog
  sets: SetEntry[];
  order?: number; // display order within the workout
}
