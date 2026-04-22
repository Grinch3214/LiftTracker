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

// --- Equipment labels ---
export const equipmentLabels: Record<EquipmentType, string> = {
  barbell: 'Barbell',
  dumbbell: 'Dumbbell',
  machine: 'Machine',
  cable: 'Cable',
  bodyweight: 'Bodyweight',
};

// --- Muscle Groups with Exercises ---
export const muscleGroups: MuscleGroup[] = [
  {
    id: 1,
    name: 'Chest',
    icon: '🫁',
    exercises: [
      { id: 101, name: 'Bench Press', equipment: 'barbell' },
      { id: 102, name: 'Incline Bench Press', equipment: 'barbell' },
      { id: 103, name: 'Dumbbell Flyes', equipment: 'dumbbell' },
      { id: 104, name: 'Dumbbell Press', equipment: 'dumbbell' },
      { id: 105, name: 'Cable Crossover', equipment: 'cable' },
      { id: 106, name: 'Push-Up', equipment: 'bodyweight' },
    ],
  },
  {
    id: 2,
    name: 'Back',
    icon: '🔙',
    exercises: [
      { id: 201, name: 'Deadlift', equipment: 'barbell' },
      { id: 202, name: 'Barbell Row', equipment: 'barbell' },
      { id: 203, name: 'Pull-Up', equipment: 'bodyweight' },
      { id: 204, name: 'Lat Pulldown', equipment: 'machine' },
      { id: 205, name: 'Seated Cable Row', equipment: 'cable' },
      { id: 206, name: 'Dumbbell Row', equipment: 'dumbbell' },
    ],
  },
  {
    id: 3,
    name: 'Shoulders',
    icon: '🏋️',
    exercises: [
      { id: 301, name: 'Overhead Press', equipment: 'barbell' },
      { id: 302, name: 'Dumbbell Shoulder Press', equipment: 'dumbbell' },
      { id: 303, name: 'Lateral Raise', equipment: 'dumbbell' },
      { id: 304, name: 'Front Raise', equipment: 'dumbbell' },
      { id: 305, name: 'Face Pull', equipment: 'cable' },
    ],
  },
  {
    id: 4,
    name: 'Arms',
    icon: '💪',
    exercises: [
      { id: 401, name: 'Barbell Curl', equipment: 'barbell' },
      { id: 402, name: 'Hammer Curl', equipment: 'dumbbell' },
      { id: 403, name: 'Dumbbell Curl', equipment: 'dumbbell' },
      { id: 404, name: 'Tricep Pushdown', equipment: 'cable' },
      { id: 405, name: 'Skull Crusher', equipment: 'barbell' },
      { id: 406, name: 'Dips', equipment: 'bodyweight' },
    ],
  },
  {
    id: 5,
    name: 'Legs',
    icon: '🦵',
    exercises: [
      { id: 501, name: 'Squat', equipment: 'barbell' },
      { id: 502, name: 'Leg Press', equipment: 'machine' },
      { id: 503, name: 'Romanian Deadlift', equipment: 'barbell' },
      { id: 504, name: 'Leg Curl', equipment: 'machine' },
      { id: 505, name: 'Leg Extension', equipment: 'machine' },
      { id: 506, name: 'Calf Raise', equipment: 'machine' },
      { id: 507, name: 'Lunges', equipment: 'dumbbell' },
    ],
  },
  {
    id: 6,
    name: 'Core',
    icon: '🔥',
    exercises: [
      { id: 601, name: 'Plank', equipment: 'bodyweight' },
      { id: 602, name: 'Crunch', equipment: 'bodyweight' },
      { id: 603, name: 'Leg Raise', equipment: 'bodyweight' },
      { id: 604, name: 'Cable Crunch', equipment: 'cable' },
    ],
  },
];

// --- Workout Templates ---
export const workoutTemplates: WorkoutTemplate[] = [
  {
    id: 1,
    name: 'Push Day',
    icon: '💪',
    exercises: [
      { exerciseId: 101, defaultSets: 3, defaultReps: 5, defaultWeight: 80 },
      { exerciseId: 301, defaultSets: 3, defaultReps: 6, defaultWeight: 60 },
      { exerciseId: 103, defaultSets: 3, defaultReps: 12, defaultWeight: 20 },
      { exerciseId: 303, defaultSets: 3, defaultReps: 15, defaultWeight: 12 },
      { exerciseId: 404, defaultSets: 3, defaultReps: 12, defaultWeight: 35 },
    ],
  },
  {
    id: 2,
    name: 'Pull Day',
    icon: '🔙',
    exercises: [
      { exerciseId: 203, defaultSets: 3, defaultReps: 8, defaultWeight: 0 },
      { exerciseId: 204, defaultSets: 3, defaultReps: 10, defaultWeight: 60 },
      { exerciseId: 205, defaultSets: 3, defaultReps: 10, defaultWeight: 55 },
      { exerciseId: 401, defaultSets: 3, defaultReps: 10, defaultWeight: 35 },
      { exerciseId: 305, defaultSets: 3, defaultReps: 15, defaultWeight: 20 },
    ],
  },
  {
    id: 3,
    name: 'Leg Day',
    icon: '🦵',
    exercises: [
      { exerciseId: 501, defaultSets: 4, defaultReps: 5, defaultWeight: 100 },
      { exerciseId: 503, defaultSets: 3, defaultReps: 8, defaultWeight: 70 },
      { exerciseId: 502, defaultSets: 3, defaultReps: 10, defaultWeight: 120 },
      { exerciseId: 504, defaultSets: 3, defaultReps: 12, defaultWeight: 45 },
      { exerciseId: 506, defaultSets: 3, defaultReps: 15, defaultWeight: 50 },
    ],
  },
  {
    id: 4,
    name: 'Upper Body',
    icon: '🏋️',
    exercises: [
      { exerciseId: 101, defaultSets: 3, defaultReps: 6, defaultWeight: 80 },
      { exerciseId: 202, defaultSets: 3, defaultReps: 8, defaultWeight: 70 },
      { exerciseId: 301, defaultSets: 3, defaultReps: 8, defaultWeight: 55 },
      { exerciseId: 401, defaultSets: 3, defaultReps: 10, defaultWeight: 35 },
      { exerciseId: 404, defaultSets: 3, defaultReps: 12, defaultWeight: 35 },
    ],
  },
  {
    id: 5,
    name: 'Full Body',
    icon: '🔥',
    exercises: [
      { exerciseId: 501, defaultSets: 3, defaultReps: 5, defaultWeight: 100 },
      { exerciseId: 101, defaultSets: 3, defaultReps: 6, defaultWeight: 80 },
      { exerciseId: 201, defaultSets: 3, defaultReps: 5, defaultWeight: 120 },
      { exerciseId: 301, defaultSets: 3, defaultReps: 8, defaultWeight: 55 },
      { exerciseId: 401, defaultSets: 3, defaultReps: 10, defaultWeight: 35 },
    ],
  },
];

// --- Mock Workout Logs (PPL split, ~5 cycles over 10 weeks) ---
function s(id: number, weight: number, reps: number): WorkoutSet {
  return { id, weight, reps };
}

export const workoutLogs: WorkoutLog[] = [
  // ===== PUSH SESSIONS =====
  {
    date: '2026-02-10',
    exercises: [
      { id: 10, exerciseId: 101, sets: [s(1, 77.5, 5), s(2, 77.5, 5), s(3, 77.5, 5)] },
      { id: 11, exerciseId: 301, sets: [s(1, 55, 6), s(2, 55, 6), s(3, 55, 5)] },
      { id: 12, exerciseId: 103, sets: [s(1, 18, 12), s(2, 18, 12), s(3, 18, 10)] },
    ],
  },
  {
    date: '2026-02-24',
    exercises: [
      { id: 19, exerciseId: 101, sets: [s(1, 80, 5), s(2, 80, 5), s(3, 80, 4)] },
      { id: 20, exerciseId: 301, sets: [s(1, 57.5, 6), s(2, 57.5, 6), s(3, 57.5, 5)] },
      { id: 21, exerciseId: 103, sets: [s(1, 20, 12), s(2, 20, 12), s(3, 20, 10)] },
    ],
  },
  {
    date: '2026-03-10',
    exercises: [
      { id: 28, exerciseId: 101, sets: [s(1, 82.5, 5), s(2, 82.5, 5), s(3, 82.5, 5)] },
      { id: 29, exerciseId: 301, sets: [s(1, 60, 6), s(2, 60, 6), s(3, 60, 5)] },
      { id: 30, exerciseId: 103, sets: [s(1, 20, 12), s(2, 22, 12), s(3, 22, 10)] },
    ],
  },
  {
    date: '2026-03-24',
    exercises: [
      { id: 37, exerciseId: 101, sets: [s(1, 85, 5), s(2, 85, 5), s(3, 85, 4)] },
      { id: 38, exerciseId: 301, sets: [s(1, 62.5, 6), s(2, 62.5, 5), s(3, 62.5, 5)] },
      { id: 39, exerciseId: 103, sets: [s(1, 22, 12), s(2, 22, 12), s(3, 22, 10)] },
    ],
  },
  {
    date: '2026-04-08',
    exercises: [
      { id: 46, exerciseId: 101, sets: [s(1, 87.5, 5), s(2, 87.5, 5), s(3, 87.5, 4)] },
      { id: 47, exerciseId: 301, sets: [s(1, 65, 6), s(2, 65, 6), s(3, 65, 5)] },
      { id: 48, exerciseId: 103, sets: [s(1, 24, 12), s(2, 24, 10), s(3, 24, 10)] },
    ],
  },
  // ===== PULL SESSIONS =====
  {
    date: '2026-02-12',
    exercises: [
      { id: 13, exerciseId: 203, sets: [s(1, 0, 8), s(2, 0, 7), s(3, 0, 6)] },
      { id: 14, exerciseId: 204, sets: [s(1, 55, 10), s(2, 55, 10), s(3, 57.5, 8)] },
      { id: 15, exerciseId: 401, sets: [s(1, 32.5, 10), s(2, 32.5, 10), s(3, 32.5, 8)] },
    ],
  },
  {
    date: '2026-02-26',
    exercises: [
      { id: 22, exerciseId: 203, sets: [s(1, 0, 8), s(2, 0, 8), s(3, 0, 6)] },
      { id: 23, exerciseId: 204, sets: [s(1, 57.5, 10), s(2, 57.5, 10), s(3, 57.5, 8)] },
      { id: 24, exerciseId: 401, sets: [s(1, 35, 10), s(2, 35, 10), s(3, 35, 8)] },
    ],
  },
  {
    date: '2026-03-12',
    exercises: [
      { id: 31, exerciseId: 203, sets: [s(1, 0, 9), s(2, 0, 8), s(3, 0, 7)] },
      { id: 32, exerciseId: 204, sets: [s(1, 60, 10), s(2, 60, 10), s(3, 60, 8)] },
      { id: 33, exerciseId: 401, sets: [s(1, 35, 10), s(2, 35, 10), s(3, 37.5, 8)] },
    ],
  },
  {
    date: '2026-03-26',
    exercises: [
      { id: 40, exerciseId: 203, sets: [s(1, 0, 10), s(2, 0, 8), s(3, 0, 7)] },
      { id: 41, exerciseId: 204, sets: [s(1, 62.5, 10), s(2, 62.5, 10), s(3, 62.5, 8)] },
      { id: 42, exerciseId: 401, sets: [s(1, 37.5, 10), s(2, 37.5, 10), s(3, 37.5, 8)] },
    ],
  },
  {
    date: '2026-04-10',
    exercises: [
      { id: 49, exerciseId: 203, sets: [s(1, 0, 10), s(2, 0, 9), s(3, 0, 8)] },
      { id: 50, exerciseId: 204, sets: [s(1, 65, 10), s(2, 65, 10), s(3, 65, 8)] },
      { id: 51, exerciseId: 401, sets: [s(1, 37.5, 10), s(2, 40, 10), s(3, 40, 8)] },
    ],
  },
  // ===== LEG SESSIONS =====
  {
    date: '2026-02-14',
    exercises: [
      { id: 16, exerciseId: 501, sets: [s(1, 95, 5), s(2, 95, 5), s(3, 95, 5), s(4, 95, 4)] },
      { id: 17, exerciseId: 503, sets: [s(1, 65, 8), s(2, 65, 8), s(3, 65, 6)] },
      { id: 18, exerciseId: 504, sets: [s(1, 40, 12), s(2, 40, 12), s(3, 40, 10)] },
    ],
  },
  {
    date: '2026-02-28',
    exercises: [
      { id: 25, exerciseId: 501, sets: [s(1, 100, 5), s(2, 100, 5), s(3, 100, 5), s(4, 100, 3)] },
      { id: 26, exerciseId: 503, sets: [s(1, 70, 8), s(2, 70, 8), s(3, 70, 6)] },
      { id: 27, exerciseId: 504, sets: [s(1, 42.5, 12), s(2, 42.5, 12), s(3, 42.5, 10)] },
    ],
  },
  {
    date: '2026-03-14',
    exercises: [
      { id: 34, exerciseId: 501, sets: [s(1, 105, 5), s(2, 105, 5), s(3, 105, 5), s(4, 100, 4)] },
      { id: 35, exerciseId: 503, sets: [s(1, 72.5, 8), s(2, 72.5, 8), s(3, 72.5, 6)] },
      { id: 36, exerciseId: 504, sets: [s(1, 45, 12), s(2, 45, 12), s(3, 45, 10)] },
    ],
  },
  {
    date: '2026-03-28',
    exercises: [
      { id: 43, exerciseId: 501, sets: [s(1, 110, 5), s(2, 110, 5), s(3, 110, 4), s(4, 105, 5)] },
      { id: 44, exerciseId: 503, sets: [s(1, 75, 8), s(2, 75, 8), s(3, 75, 6)] },
      { id: 45, exerciseId: 504, sets: [s(1, 47.5, 12), s(2, 47.5, 12), s(3, 47.5, 10)] },
    ],
  },
  {
    date: '2026-04-12',
    exercises: [
      { id: 52, exerciseId: 501, sets: [s(1, 115, 5), s(2, 115, 5), s(3, 115, 4), s(4, 110, 5)] },
      { id: 53, exerciseId: 503, sets: [s(1, 77.5, 8), s(2, 77.5, 8), s(3, 77.5, 6)] },
      { id: 54, exerciseId: 504, sets: [s(1, 50, 12), s(2, 50, 12), s(3, 50, 10)] },
    ],
  },
];
