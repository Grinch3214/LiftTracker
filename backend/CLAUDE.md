# LiftTracker — Backend

## Project Overview

NestJS 11 REST API for a mobile-first workout tracker. The frontend is a Vue 3 + Vant PWA (tab-based, no router). Initially no auth — all endpoints are public.

## Stack

- **Framework:** NestJS 11 (TypeScript)
- **ORM:** Prisma
- **DB:** PostgreSQL
- **Config:** `@nestjs/config` with `.env`

## Frontend Contract

The Vue frontend calls this API to replace its in-memory Pinia stores.

### Frontend Data Model (from `frontend/src/types.ts`)

```ts
type EquipmentType =
  | 'barbell'
  | 'dumbbell'
  | 'machine'
  | 'cable'
  | 'bodyweight';

interface Exercise {
  id;
  name;
  equipment: EquipmentType;
}
interface MuscleGroup {
  id;
  name;
  icon;
  exercises: Exercise[];
}
interface WorkoutSet {
  id;
  weight;
  reps;
}
interface WorkoutExercise {
  id;
  exerciseId;
  sets: WorkoutSet[];
}
interface WorkoutLog {
  date: string /* YYYY-MM-DD */;
  exercises: WorkoutExercise[];
}
interface WorkoutTemplate {
  id;
  name;
  icon;
  exercises: { exerciseId; defaultSets; defaultReps; defaultWeight }[];
}
```

### Date Format

Always `YYYY-MM-DD` strings (no time component). Example: `"2026-04-12"`.

## Module Structure

```
src/
├── prisma/          # PrismaModule + PrismaService (global)
├── exercises/       # Exercise catalog (grouped by muscle group)
├── muscle-groups/   # Muscle group list with nested exercises
├── workouts/        # WorkoutLog CRUD (by date)
├── templates/       # Workout templates
└── common/          # Shared pipes, filters, interceptors
```

## API Routes (planned)

| Method | Path                                            | Description                            |
| ------ | ----------------------------------------------- | -------------------------------------- |
| GET    | /muscle-groups                                  | All muscle groups with exercises       |
| GET    | /exercises                                      | All exercises (flat list)              |
| GET    | /workouts?date=YYYY-MM-DD                       | Get workout log for date               |
| POST   | /workouts                                       | Create/upsert workout for date         |
| PUT    | /workouts/:id/exercises                         | Add exercise to workout                |
| DELETE | /workouts/:id/exercises/:exerciseId             | Remove exercise                        |
| POST   | /workouts/:id/exercises/:exerciseId/sets        | Add set                                |
| PUT    | /workouts/:id/exercises/:exerciseId/sets/:setId | Update set                             |
| DELETE | /workouts/:id/exercises/:exerciseId/sets/:setId | Remove set                             |
| GET    | /templates                                      | All templates                          |
| POST   | /workouts/from-template                         | Start workout from template for a date |
| GET    | /progress/exercise/:exerciseId                  | History + PR for exercise              |

## Key Conventions

- No auth (for now) — all routes public
- IDs: auto-increment integers (matching frontend number type)
- Equipment enum in Prisma matches frontend `EquipmentType` union exactly
- CORS enabled for `http://localhost:5173` (Vite dev server)
- Seed script populates muscle groups, exercises, and templates from frontend mock data

## Database Schema (Prisma)

See `prisma/schema.prisma`.
