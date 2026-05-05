import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

// --- Source data (mirrored from frontend/src/mockdata.ts) ---

const muscleGroups = [
  {
    id: 1, name: 'Chest', icon: '🫁',
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
    id: 2, name: 'Back', icon: '🔙',
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
    id: 3, name: 'Shoulders', icon: '🏋️',
    exercises: [
      { id: 301, name: 'Overhead Press', equipment: 'barbell' },
      { id: 302, name: 'Dumbbell Shoulder Press', equipment: 'dumbbell' },
      { id: 303, name: 'Lateral Raise', equipment: 'dumbbell' },
      { id: 304, name: 'Front Raise', equipment: 'dumbbell' },
      { id: 305, name: 'Face Pull', equipment: 'cable' },
    ],
  },
  {
    id: 4, name: 'Arms', icon: '💪',
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
    id: 5, name: 'Legs', icon: '🦵',
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
    id: 6, name: 'Core', icon: '🔥',
    exercises: [
      { id: 601, name: 'Plank', equipment: 'bodyweight' },
      { id: 602, name: 'Crunch', equipment: 'bodyweight' },
      { id: 603, name: 'Leg Raise', equipment: 'bodyweight' },
      { id: 604, name: 'Cable Crunch', equipment: 'cable' },
    ],
  },
] as const;

const workoutTemplates = [
  {
    name: 'Push Day', icon: '💪',
    exercises: [
      { mockExerciseId: 101, defaultSets: 3, defaultReps: 5, defaultWeight: 80, order: 0 },
      { mockExerciseId: 301, defaultSets: 3, defaultReps: 6, defaultWeight: 60, order: 1 },
      { mockExerciseId: 103, defaultSets: 3, defaultReps: 12, defaultWeight: 20, order: 2 },
      { mockExerciseId: 303, defaultSets: 3, defaultReps: 15, defaultWeight: 12, order: 3 },
      { mockExerciseId: 404, defaultSets: 3, defaultReps: 12, defaultWeight: 35, order: 4 },
    ],
  },
  {
    name: 'Pull Day', icon: '🔙',
    exercises: [
      { mockExerciseId: 203, defaultSets: 3, defaultReps: 8, defaultWeight: 0, order: 0 },
      { mockExerciseId: 204, defaultSets: 3, defaultReps: 10, defaultWeight: 60, order: 1 },
      { mockExerciseId: 205, defaultSets: 3, defaultReps: 10, defaultWeight: 55, order: 2 },
      { mockExerciseId: 401, defaultSets: 3, defaultReps: 10, defaultWeight: 35, order: 3 },
      { mockExerciseId: 305, defaultSets: 3, defaultReps: 15, defaultWeight: 20, order: 4 },
    ],
  },
  {
    name: 'Leg Day', icon: '🦵',
    exercises: [
      { mockExerciseId: 501, defaultSets: 4, defaultReps: 5, defaultWeight: 100, order: 0 },
      { mockExerciseId: 503, defaultSets: 3, defaultReps: 8, defaultWeight: 70, order: 1 },
      { mockExerciseId: 502, defaultSets: 3, defaultReps: 10, defaultWeight: 120, order: 2 },
      { mockExerciseId: 504, defaultSets: 3, defaultReps: 12, defaultWeight: 45, order: 3 },
      { mockExerciseId: 506, defaultSets: 3, defaultReps: 15, defaultWeight: 50, order: 4 },
    ],
  },
  {
    name: 'Upper Body', icon: '🏋️',
    exercises: [
      { mockExerciseId: 101, defaultSets: 3, defaultReps: 6, defaultWeight: 80, order: 0 },
      { mockExerciseId: 202, defaultSets: 3, defaultReps: 8, defaultWeight: 70, order: 1 },
      { mockExerciseId: 301, defaultSets: 3, defaultReps: 8, defaultWeight: 55, order: 2 },
      { mockExerciseId: 401, defaultSets: 3, defaultReps: 10, defaultWeight: 35, order: 3 },
      { mockExerciseId: 404, defaultSets: 3, defaultReps: 12, defaultWeight: 35, order: 4 },
    ],
  },
  {
    name: 'Full Body', icon: '🔥',
    exercises: [
      { mockExerciseId: 501, defaultSets: 3, defaultReps: 5, defaultWeight: 100, order: 0 },
      { mockExerciseId: 101, defaultSets: 3, defaultReps: 6, defaultWeight: 80, order: 1 },
      { mockExerciseId: 201, defaultSets: 3, defaultReps: 5, defaultWeight: 120, order: 2 },
      { mockExerciseId: 301, defaultSets: 3, defaultReps: 8, defaultWeight: 55, order: 3 },
      { mockExerciseId: 401, defaultSets: 3, defaultReps: 10, defaultWeight: 35, order: 4 },
    ],
  },
];

const workoutLogs = [
  // Push sessions
  { date: '2026-02-10', exercises: [
    { mockExerciseId: 101, sets: [{ weight: 77.5, reps: 5 }, { weight: 77.5, reps: 5 }, { weight: 77.5, reps: 5 }] },
    { mockExerciseId: 301, sets: [{ weight: 55, reps: 6 }, { weight: 55, reps: 6 }, { weight: 55, reps: 5 }] },
    { mockExerciseId: 103, sets: [{ weight: 18, reps: 12 }, { weight: 18, reps: 12 }, { weight: 18, reps: 10 }] },
  ]},
  { date: '2026-02-24', exercises: [
    { mockExerciseId: 101, sets: [{ weight: 80, reps: 5 }, { weight: 80, reps: 5 }, { weight: 80, reps: 4 }] },
    { mockExerciseId: 301, sets: [{ weight: 57.5, reps: 6 }, { weight: 57.5, reps: 6 }, { weight: 57.5, reps: 5 }] },
    { mockExerciseId: 103, sets: [{ weight: 20, reps: 12 }, { weight: 20, reps: 12 }, { weight: 20, reps: 10 }] },
  ]},
  { date: '2026-03-10', exercises: [
    { mockExerciseId: 101, sets: [{ weight: 82.5, reps: 5 }, { weight: 82.5, reps: 5 }, { weight: 82.5, reps: 5 }] },
    { mockExerciseId: 301, sets: [{ weight: 60, reps: 6 }, { weight: 60, reps: 6 }, { weight: 60, reps: 5 }] },
    { mockExerciseId: 103, sets: [{ weight: 20, reps: 12 }, { weight: 22, reps: 12 }, { weight: 22, reps: 10 }] },
  ]},
  { date: '2026-03-24', exercises: [
    { mockExerciseId: 101, sets: [{ weight: 85, reps: 5 }, { weight: 85, reps: 5 }, { weight: 85, reps: 4 }] },
    { mockExerciseId: 301, sets: [{ weight: 62.5, reps: 6 }, { weight: 62.5, reps: 5 }, { weight: 62.5, reps: 5 }] },
    { mockExerciseId: 103, sets: [{ weight: 22, reps: 12 }, { weight: 22, reps: 12 }, { weight: 22, reps: 10 }] },
  ]},
  { date: '2026-04-08', exercises: [
    { mockExerciseId: 101, sets: [{ weight: 87.5, reps: 5 }, { weight: 87.5, reps: 5 }, { weight: 87.5, reps: 4 }] },
    { mockExerciseId: 301, sets: [{ weight: 65, reps: 6 }, { weight: 65, reps: 6 }, { weight: 65, reps: 5 }] },
    { mockExerciseId: 103, sets: [{ weight: 24, reps: 12 }, { weight: 24, reps: 10 }, { weight: 24, reps: 10 }] },
  ]},
  // Pull sessions
  { date: '2026-02-12', exercises: [
    { mockExerciseId: 203, sets: [{ weight: 0, reps: 8 }, { weight: 0, reps: 7 }, { weight: 0, reps: 6 }] },
    { mockExerciseId: 204, sets: [{ weight: 55, reps: 10 }, { weight: 55, reps: 10 }, { weight: 57.5, reps: 8 }] },
    { mockExerciseId: 401, sets: [{ weight: 32.5, reps: 10 }, { weight: 32.5, reps: 10 }, { weight: 32.5, reps: 8 }] },
  ]},
  { date: '2026-02-26', exercises: [
    { mockExerciseId: 203, sets: [{ weight: 0, reps: 8 }, { weight: 0, reps: 8 }, { weight: 0, reps: 6 }] },
    { mockExerciseId: 204, sets: [{ weight: 57.5, reps: 10 }, { weight: 57.5, reps: 10 }, { weight: 57.5, reps: 8 }] },
    { mockExerciseId: 401, sets: [{ weight: 35, reps: 10 }, { weight: 35, reps: 10 }, { weight: 35, reps: 8 }] },
  ]},
  { date: '2026-03-12', exercises: [
    { mockExerciseId: 203, sets: [{ weight: 0, reps: 9 }, { weight: 0, reps: 8 }, { weight: 0, reps: 7 }] },
    { mockExerciseId: 204, sets: [{ weight: 60, reps: 10 }, { weight: 60, reps: 10 }, { weight: 60, reps: 8 }] },
    { mockExerciseId: 401, sets: [{ weight: 35, reps: 10 }, { weight: 35, reps: 10 }, { weight: 37.5, reps: 8 }] },
  ]},
  { date: '2026-03-26', exercises: [
    { mockExerciseId: 203, sets: [{ weight: 0, reps: 10 }, { weight: 0, reps: 8 }, { weight: 0, reps: 7 }] },
    { mockExerciseId: 204, sets: [{ weight: 62.5, reps: 10 }, { weight: 62.5, reps: 10 }, { weight: 62.5, reps: 8 }] },
    { mockExerciseId: 401, sets: [{ weight: 37.5, reps: 10 }, { weight: 37.5, reps: 10 }, { weight: 37.5, reps: 8 }] },
  ]},
  { date: '2026-04-10', exercises: [
    { mockExerciseId: 203, sets: [{ weight: 0, reps: 10 }, { weight: 0, reps: 9 }, { weight: 0, reps: 8 }] },
    { mockExerciseId: 204, sets: [{ weight: 65, reps: 10 }, { weight: 65, reps: 10 }, { weight: 65, reps: 8 }] },
    { mockExerciseId: 401, sets: [{ weight: 37.5, reps: 10 }, { weight: 40, reps: 10 }, { weight: 40, reps: 8 }] },
  ]},
  // Leg sessions
  { date: '2026-02-14', exercises: [
    { mockExerciseId: 501, sets: [{ weight: 95, reps: 5 }, { weight: 95, reps: 5 }, { weight: 95, reps: 5 }, { weight: 95, reps: 4 }] },
    { mockExerciseId: 503, sets: [{ weight: 65, reps: 8 }, { weight: 65, reps: 8 }, { weight: 65, reps: 6 }] },
    { mockExerciseId: 504, sets: [{ weight: 40, reps: 12 }, { weight: 40, reps: 12 }, { weight: 40, reps: 10 }] },
  ]},
  { date: '2026-02-28', exercises: [
    { mockExerciseId: 501, sets: [{ weight: 100, reps: 5 }, { weight: 100, reps: 5 }, { weight: 100, reps: 5 }, { weight: 100, reps: 3 }] },
    { mockExerciseId: 503, sets: [{ weight: 70, reps: 8 }, { weight: 70, reps: 8 }, { weight: 70, reps: 6 }] },
    { mockExerciseId: 504, sets: [{ weight: 42.5, reps: 12 }, { weight: 42.5, reps: 12 }, { weight: 42.5, reps: 10 }] },
  ]},
  { date: '2026-03-14', exercises: [
    { mockExerciseId: 501, sets: [{ weight: 105, reps: 5 }, { weight: 105, reps: 5 }, { weight: 105, reps: 5 }, { weight: 100, reps: 4 }] },
    { mockExerciseId: 503, sets: [{ weight: 72.5, reps: 8 }, { weight: 72.5, reps: 8 }, { weight: 72.5, reps: 6 }] },
    { mockExerciseId: 504, sets: [{ weight: 45, reps: 12 }, { weight: 45, reps: 12 }, { weight: 45, reps: 10 }] },
  ]},
  { date: '2026-03-28', exercises: [
    { mockExerciseId: 501, sets: [{ weight: 110, reps: 5 }, { weight: 110, reps: 5 }, { weight: 110, reps: 4 }, { weight: 105, reps: 5 }] },
    { mockExerciseId: 503, sets: [{ weight: 75, reps: 8 }, { weight: 75, reps: 8 }, { weight: 75, reps: 6 }] },
    { mockExerciseId: 504, sets: [{ weight: 47.5, reps: 12 }, { weight: 47.5, reps: 12 }, { weight: 47.5, reps: 10 }] },
  ]},
  { date: '2026-04-12', exercises: [
    { mockExerciseId: 501, sets: [{ weight: 115, reps: 5 }, { weight: 115, reps: 5 }, { weight: 115, reps: 4 }, { weight: 110, reps: 5 }] },
    { mockExerciseId: 503, sets: [{ weight: 77.5, reps: 8 }, { weight: 77.5, reps: 8 }, { weight: 77.5, reps: 6 }] },
    { mockExerciseId: 504, sets: [{ weight: 50, reps: 12 }, { weight: 50, reps: 12 }, { weight: 50, reps: 10 }] },
  ]},
];

// ---

async function main() {
  console.log('Clearing existing data...');
  await prisma.workoutSet.deleteMany();
  await prisma.workoutExercise.deleteMany();
  await prisma.workoutLog.deleteMany();
  await prisma.templateExercise.deleteMany();
  await prisma.workoutTemplate.deleteMany();
  await prisma.exercise.deleteMany();
  await prisma.muscleGroup.deleteMany();

  console.log('Seeding muscle groups and exercises...');
  // mockExerciseId -> real DB id
  const exerciseIdMap = new Map<number, number>();

  for (const group of muscleGroups) {
    const dbGroup = await prisma.muscleGroup.create({
      data: { name: group.name, icon: group.icon },
    });

    for (const ex of group.exercises) {
      const dbEx = await prisma.exercise.create({
        data: { name: ex.name, equipment: ex.equipment as any, muscleGroupId: dbGroup.id },
      });
      exerciseIdMap.set(ex.id, dbEx.id);
    }
  }
  console.log(`  ${exerciseIdMap.size} exercises created`);

  console.log('Seeding templates...');
  for (const template of workoutTemplates) {
    await prisma.workoutTemplate.create({
      data: {
        name: template.name,
        icon: template.icon,
        exercises: {
          create: template.exercises.map(ex => ({
            order: ex.order,
            defaultSets: ex.defaultSets,
            defaultReps: ex.defaultReps,
            defaultWeight: ex.defaultWeight,
            exerciseId: exerciseIdMap.get(ex.mockExerciseId)!,
          })),
        },
      },
    });
  }
  console.log(`  ${workoutTemplates.length} templates created`);

  console.log('Seeding workout history...');
  for (const log of workoutLogs) {
    await prisma.workoutLog.create({
      data: {
        date: log.date,
        exercises: {
          create: log.exercises.map((ex, exOrder) => ({
            order: exOrder,
            exerciseId: exerciseIdMap.get(ex.mockExerciseId)!,
            sets: {
              create: ex.sets.map((set, setOrder) => ({
                order: setOrder,
                weight: set.weight,
                reps: set.reps,
              })),
            },
          })),
        },
      },
    });
  }
  console.log(`  ${workoutLogs.length} workout logs created`);

  console.log('✓ Seed complete');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
