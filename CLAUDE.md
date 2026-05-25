# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repo layout

```
LiftTracker/
├── frontend/   # Vue 3 + Vant 4 PWA (mobile workout tracker)
└── backend/    # NestJS 11 REST API + Prisma + PostgreSQL
```

---

## Frontend (`frontend/`)

### Commands

```bash
npm run dev          # Vite dev server with HMR (localhost:5173)
npm run start        # dev server exposed on LAN (--host)
npm run build        # type-check + production build
npm run type-check   # vue-tsc only
```

No test suite — `npm run build` (type-check) is the correctness gate.

### Architecture

**Stack:** Vue 3 (Composition API) + Vant 4 + Pinia + TypeScript + Vite.

Navigation is driven by `globalStore.activeTab` — Vue Router is installed but disabled; there are no routes.

**Data flow:**

```
src/mockdata.ts      ← static seed data (muscle groups, exercises, templates)
src/types.ts         ← shared TypeScript interfaces (WorkoutLog, WorkoutExercise, etc.)
src/helpers.ts       ← pure functions: getExerciseById, formatDate, etc.
src/stores/
  workout.ts         ← CRUD over workoutLogs; deep-clones mockdata on init
  global.ts          ← UI state: activeTab, sheet popup flags, rest timer
  calendar.ts        ← selectedDate + formattedDate computed
```

`workout.ts` is the single source of truth for all workout mutations. `getExerciseHistory` and `getPersonalRecord` for the progress page also live here.

**Component tree:**

```
App.vue
└── layouts/MxDefault.vue          ← root layout; owns FAB + global popups
    ├── components/MxHeader.vue     ← date picker nav; dots on calendar for logged days
    ├── pages/MxWorkoutPage.vue     ← exercise cards for selected date; rest timer banner
    │   └── components/MxExerciseCard.vue  ← sets table + PR badge; emits CRUD events upward
    ├── pages/MxHistoryPage.vue     ← sorted list; tap navigates to date
    ├── pages/MxTemplatesPage.vue   ← load template into selected date
    ├── pages/MxProgressPage.vue    ← per-exercise history + PR; van-tabs per muscle group
    ├── components/MxTabBar.vue     ← 4-tab bottom nav; syncs globalStore.activeTab
    ├── components/MxGroupPanel.vue ← action sheet; adds exercise to workout
    └── components/MxAddSetSheet.vue ← bottom popup for add/edit set; shows prev-session hint
```

### Key conventions

- **Path alias:** `@/` → `src/`
- **Vant auto-import:** `unplugin-vue-components` + `VantResolver` — never manually import Vant components in templates.
- **Mx prefix:** all project components are prefixed `Mx`.
- **Date format:** `YYYY-MM-DD` string everywhere. `formatDate(Date): string` in `helpers.ts` is the single converter.
- **IDs:** mock data exercise IDs start at 101+ (grouped by muscle: 1xx chest, 2xx back, etc.); runtime-created IDs use a counter starting at 100000.
- **van-tag `size`:** Vant 4's `TagSize` only accepts `'large' | 'medium'`; omit for the default (smallest) variant.

---

## Backend (`backend/`)

### Commands

```bash
# Database (run from backend/)
docker compose up -d          # start PostgreSQL on port 15434
npx prisma migrate dev        # apply migrations
npx prisma db seed            # seed exercises, muscle groups, templates

# Development
npm run start:dev             # NestJS watch mode (localhost:3000)
npm run build                 # compile TypeScript

# Code quality
npm run lint                  # ESLint --fix
npm run format                # Prettier

# Tests
npm test                      # Jest unit tests
npm run test:e2e              # e2e tests (requires running DB)
```

### Architecture

**Stack:** NestJS 11 + Prisma 7 + PostgreSQL 16. `PrismaModule` is global; inject `PrismaService` anywhere.

**Module structure:**

```
src/
├── prisma/          # PrismaModule (global) + PrismaService
├── muscle-groups/   # GET /muscle-groups — full catalog with nested exercises
├── workouts/        # WorkoutLog CRUD; also owns /workouts/progress/:exerciseId
├── templates/       # GET /templates + POST /workouts/from-template
└── app.module.ts    # root: imports ConfigModule (global), PrismaModule, the 3 feature modules
```

**Implemented API routes:**

| Method | Path | Description |
|--------|------|-------------|
| GET | `/muscle-groups` | All muscle groups with exercises |
| GET | `/workouts?date=YYYY-MM-DD` | Workout log for a date (or all logs) |
| POST | `/workouts` | Create workout |
| POST | `/workouts/from-template` | Start workout from template |
| POST | `/workouts/:id/exercises` | Add exercise to workout |
| DELETE | `/workouts/:id/exercises/:exerciseId` | Remove exercise |
| POST | `/workouts/:id/exercises/:exerciseId/sets` | Add set |
| PUT | `/workouts/:id/exercises/:exerciseId/sets/:setId` | Update set |
| DELETE | `/workouts/:id/exercises/:exerciseId/sets/:setId` | Remove set |
| GET | `/workouts/progress/:exerciseId` | History + PR for an exercise |
| GET | `/templates` | All templates |

**Global pipes:** `ValidationPipe({ whitelist: true, transform: true })` — all route bodies must use DTOs with class-validator decorators.

**CORS:** only `http://localhost:5173` is whitelisted.

### Database

PostgreSQL runs in Docker (`backend/docker-compose.yml`) on port **15434** (avoids conflict with local Postgres default). Connection string is in `backend/.env` (`DATABASE_URL`). Prisma client output is in `backend/generated/prisma/`.

Seed data in `backend/prisma/seed.ts` mirrors `frontend/src/mockdata.ts` exactly — IDs must stay in sync if either is changed.

### Key conventions

- No auth — all routes are public.
- IDs are auto-increment integers (match frontend `number` type).
- `WorkoutLog` has a unique constraint on `date`; use upsert-style logic when creating.
- `onDelete: Cascade` is set on `WorkoutExercise → WorkoutLog` and `WorkoutSet → WorkoutExercise`.
- Equipment enum values in Prisma schema (`barbell | dumbbell | machine | cable | bodyweight`) must exactly match the frontend `EquipmentType` union in `frontend/src/types.ts`.
