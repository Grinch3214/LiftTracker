# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # start dev server (Vite HMR)
npm run build        # type-check + production build (run-p)
npm run build-only   # production build without type-check
npm run type-check   # vue-tsc --build only
npm run preview      # preview production build
```

There is no test suite. Type-checking (`npm run build`) is the primary correctness gate.

## Architecture

**Stack:** Vue 3 (Composition API) + Vant 4 (mobile UI) + Pinia + TypeScript + Vite.  
**Target:** mobile-first PWA workout tracker. No backend — all data is in-memory.

### Data flow

```
src/mockdata.ts      ← static types + seed data (muscle groups, workout logs, templates)
src/helpers.ts       ← pure functions over mockdata (getExerciseById, formatDate, etc.)
src/stores/
  workout.ts         ← reactive CRUD copy of workoutLogs; all mutations go here
  global.ts          ← UI state: activeTab, addSetSheet popup state, rest timer
  calendar.ts        ← selectedDate + formattedDate computed
```

`workout.ts` deep-clones `workoutLogs` on init so mock data is never mutated. All add/remove operations (exercises, sets) go through this store. The store also provides `getExerciseHistory` and `getPersonalRecord` for the progress page.

### Component tree

```
App.vue
└── layouts/MxDefault.vue          ← root layout; owns FAB + global popups
    ├── components/MxHeader.vue     ← nav bar with date picker; shows workout dots on calendar
    ├── pages/MxWorkoutPage.vue     ← exercise cards for selected date; rest timer banner
    │   └── components/MxExerciseCard.vue  ← sets table with PR badge; emits CRUD events upward
    ├── pages/MxHistoryPage.vue     ← sorted workout list; tap → navigate to that date
    ├── pages/MxTemplatesPage.vue   ← load a template into selected date
    ├── pages/MxProgressPage.vue    ← per-exercise history + PR; van-tabs per muscle group
    ├── components/MxTabBar.vue     ← 4-tab bottom nav; syncs with globalStore.activeTab
    ├── components/MxGroupPanel.vue ← action sheet; adds exercise to workout on select
    └── components/MxAddSetSheet.vue ← bottom popup for add/edit set; shows prev-session hint
```

Navigation between tabs is done via `globalStore.activeTab` (no Vue Router — router is installed but disabled).

### Key conventions

- **Path alias:** `@/` resolves to `src/`.
- **Vant auto-import:** `unplugin-vue-components` + `VantResolver` — Vant components do **not** need to be manually imported in templates.
- **Mx prefix:** all project components are prefixed `Mx`.
- **Date format:** `YYYY-MM-DD` string everywhere in store/data; `Date` objects only in calendar store and Vant calendar bindings. `formatDate(Date): string` in `helpers.ts` is the single converter.
- **IDs:** workout-exercise IDs in mock data start at 10; runtime-created IDs use an incrementing counter starting at 100000 to avoid collisions.
- **van-tag `size`:** Vant 4's `TagSize` only accepts `'large' | 'medium'`; omit `size` for the default (smallest) variant.
