import { type WorkoutExercise } from './workout-exercise';

export interface Workout {
  id: string;
  date: string;
  exercises: WorkoutExercise[];
  createdAt: string;
}
