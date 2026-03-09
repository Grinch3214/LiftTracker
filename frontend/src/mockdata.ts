export type EquipmentType =
  | 'barbell'
  | 'dumbbell'
  | 'machine'
  | 'cable'
  | 'bodyweight';

export interface MuscleGroup {
  id: number;
  name: string;
  icon: string;
}

export interface Exercise {
  id: number;
  name: string;
  muscleGroupId: number;
  equipment: EquipmentType;
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

// --- Equipment labels (для UI) ---
export const equipmentLabels: Record<EquipmentType, string> = {
  barbell: 'Barbell',
  dumbbell: 'Dumbbell',
  machine: 'Machine',
  cable: 'Cable',
  bodyweight: 'Bodyweight',
};

// --- Muscle Groups ---
export const muscleGroups: MuscleGroup[] = [
  { id: 1, name: 'Chest', icon: '🫁' },
  { id: 2, name: 'Back', icon: '🔙' },
  { id: 3, name: 'Shoulders', icon: '🏋️' },
  { id: 4, name: 'Arms', icon: '💪' },
  { id: 5, name: 'Legs', icon: '🦵' },
  { id: 6, name: 'Core', icon: '🔥' },
];

// --- Exercise Catalogue ---
export const exercises: Exercise[] = [
  // Chest
  { id: 101, name: 'Bench Press', muscleGroupId: 1, equipment: 'barbell' },
  {
    id: 102,
    name: 'Incline Bench Press',
    muscleGroupId: 1,
    equipment: 'barbell',
  },
  { id: 103, name: 'Dumbbell Flyes', muscleGroupId: 1, equipment: 'dumbbell' },
  { id: 104, name: 'Dumbbell Press', muscleGroupId: 1, equipment: 'dumbbell' },
  { id: 105, name: 'Cable Crossover', muscleGroupId: 1, equipment: 'cable' },
  { id: 106, name: 'Push-Up', muscleGroupId: 1, equipment: 'bodyweight' },

  // Back
  { id: 201, name: 'Deadlift', muscleGroupId: 2, equipment: 'barbell' },
  { id: 202, name: 'Barbell Row', muscleGroupId: 2, equipment: 'barbell' },
  { id: 203, name: 'Pull-Up', muscleGroupId: 2, equipment: 'bodyweight' },
  { id: 204, name: 'Lat Pulldown', muscleGroupId: 2, equipment: 'machine' },
  { id: 205, name: 'Seated Cable Row', muscleGroupId: 2, equipment: 'cable' },
  { id: 206, name: 'Dumbbell Row', muscleGroupId: 2, equipment: 'dumbbell' },

  // Shoulders
  { id: 301, name: 'Overhead Press', muscleGroupId: 3, equipment: 'barbell' },
  { id: 302, name: 'Dumbbell Press', muscleGroupId: 3, equipment: 'dumbbell' },
  { id: 303, name: 'Lateral Raise', muscleGroupId: 3, equipment: 'dumbbell' },
  { id: 304, name: 'Front Raise', muscleGroupId: 3, equipment: 'dumbbell' },
  { id: 305, name: 'Face Pull', muscleGroupId: 3, equipment: 'cable' },

  // Arms
  { id: 401, name: 'Barbell Curl', muscleGroupId: 4, equipment: 'barbell' },
  { id: 402, name: 'Hammer Curl', muscleGroupId: 4, equipment: 'dumbbell' },
  { id: 403, name: 'Dumbbell Curl', muscleGroupId: 4, equipment: 'dumbbell' },
  { id: 404, name: 'Tricep Pushdown', muscleGroupId: 4, equipment: 'cable' },
  { id: 405, name: 'Skull Crusher', muscleGroupId: 4, equipment: 'barbell' },
  { id: 406, name: 'Dips', muscleGroupId: 4, equipment: 'bodyweight' },

  // Legs
  { id: 501, name: 'Squat', muscleGroupId: 5, equipment: 'barbell' },
  { id: 502, name: 'Leg Press', muscleGroupId: 5, equipment: 'machine' },
  {
    id: 503,
    name: 'Romanian Deadlift',
    muscleGroupId: 5,
    equipment: 'barbell',
  },
  { id: 504, name: 'Leg Curl', muscleGroupId: 5, equipment: 'machine' },
  { id: 505, name: 'Leg Extension', muscleGroupId: 5, equipment: 'machine' },
  { id: 506, name: 'Calf Raise', muscleGroupId: 5, equipment: 'machine' },
  { id: 507, name: 'Lunges', muscleGroupId: 5, equipment: 'dumbbell' },

  // Core
  { id: 601, name: 'Plank', muscleGroupId: 6, equipment: 'bodyweight' },
  { id: 602, name: 'Crunch', muscleGroupId: 6, equipment: 'bodyweight' },
  { id: 603, name: 'Leg Raise', muscleGroupId: 6, equipment: 'bodyweight' },
  { id: 604, name: 'Cable Crunch', muscleGroupId: 6, equipment: 'cable' },
];

// --- Mock Workout Logs ---
export const workoutLogs: WorkoutLog[] = [
  {
    date: '2026-03-07',
    exercises: [
      {
        id: 1,
        exerciseId: 101,
        sets: [
          { id: 1, weight: 80, reps: 8 },
          { id: 2, weight: 80, reps: 8 },
          { id: 3, weight: 85, reps: 6 },
        ],
      },
      {
        id: 2,
        exerciseId: 103,
        sets: [
          { id: 1, weight: 20, reps: 12 },
          { id: 2, weight: 20, reps: 12 },
          { id: 3, weight: 22, reps: 10 },
        ],
      },
    ],
  },
  {
    date: '2025-03-05',
    exercises: [
      {
        id: 3,
        exerciseId: 501,
        sets: [
          { id: 1, weight: 100, reps: 5 },
          { id: 2, weight: 100, reps: 5 },
          { id: 3, weight: 105, reps: 4 },
        ],
      },
      {
        id: 4,
        exerciseId: 503,
        sets: [
          { id: 1, weight: 70, reps: 10 },
          { id: 2, weight: 70, reps: 10 },
        ],
      },
    ],
  },
];

export const getLogByDate = (date: string): WorkoutLog | undefined =>
  workoutLogs.find((log) => log.date === date);

export const getExerciseById = (id: number): Exercise | undefined =>
  exercises.find((ex) => ex.id === id);

export const getMuscleGroupById = (id: number): MuscleGroup | undefined =>
  muscleGroups.find((g) => g.id === id);

export const getExercisesByGroup = (groupId: number): Exercise[] =>
  exercises.filter((ex) => ex.muscleGroupId === groupId);

export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
