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
      { id: 302, name: 'Dumbbell Press', equipment: 'dumbbell' },
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

// --- Helpers ---
export const getLogByDate = (date: string): WorkoutLog | undefined =>
  workoutLogs.find((log) => log.date === date);

export const getExerciseById = (id: number): Exercise | undefined =>
  muscleGroups.flatMap((g) => g.exercises).find((ex) => ex.id === id);

export const getMuscleGroupById = (id: number): MuscleGroup | undefined =>
  muscleGroups.find((g) => g.id === id);

export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
