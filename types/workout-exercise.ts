import { type SetEntry } from './set-entry';

export interface WorkoutExercise {
  id: string;
  exerciseId: string;
  sets: SetEntry[];
  order?: number;
}
