<template>
  <div class="workout-page">
    <WorkoutRestTimer />

    <WorkoutEmptyState v-if="exercises.length === 0" />

    <template v-else>
      <WorkoutExerciseCard
        v-for="we in exercises"
        :key="we.id"
        :exercise="getExercise(we.exerciseId)"
        :workout-exercise="we"
        @add-set="openAddSet(we)"
        @edit-set="(set: SetEntry) => openEditSet(we, set)"
        @delete-set="(setId: string) => removeSet(we.id, setId)"
        @delete-exercise="removeExercise(we.id)"
      />

      <div class="workout-summary">{{ summaryText }}</div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { showConfirmDialog } from 'vant';
import type { SetEntry, WorkoutExercise } from '~~/types';
import { useWorkoutStore } from '@/stores/workout';
import { useUiStore } from '@/stores/ui';
import { getExerciseById } from '@/utils/exercises';
import { formatDate } from '@/utils/date';
import { pluralize } from '@/utils/pluralize';

const workoutStore = useWorkoutStore();
const uiStore = useUiStore();
const { t } = useI18n();

const currentDate = computed(() => formatDate(uiStore.selectedDate));

const exercises = computed(
  () => workoutStore.getWorkoutByDate(currentDate.value)?.exercises ?? [],
);

const totalSets = computed(() =>
  exercises.value.reduce((sum, ex) => sum + ex.sets.length, 0),
);

const totalVolume = computed(() =>
  exercises.value.reduce(
    (sum, ex) => sum + ex.sets.reduce((s, set) => s + set.weight * set.reps, 0),
    0,
  ),
);

const exerciseWord = computed(() =>
  pluralize(exercises.value.length, {
    one: t('units.exerciseWordOne'),
    few: t('units.exerciseWordFew'),
    many: t('units.exerciseWordMany'),
  }),
);

const setWord = computed(() =>
  pluralize(totalSets.value, {
    one: t('units.setWordOne'),
    few: t('units.setWordFew'),
    many: t('units.setWordMany'),
  }),
);

const summaryText = computed(() =>
  t('workout.summary', {
    exercises: t('units.countWord', {
      count: exercises.value.length,
      word: exerciseWord.value,
    }),
    sets: t('units.countWord', { count: totalSets.value, word: setWord.value }),
    volume: totalVolume.value.toLocaleString(),
  }),
);

function getExercise(exerciseId: string) {
  return getExerciseById(exerciseId)!;
}

function openAddSet(we: WorkoutExercise) {
  const lastSet = we.sets.length > 0 ? we.sets[we.sets.length - 1] : null;
  uiStore.addSetSheet = {
    show: true,
    date: currentDate.value,
    workoutExerciseId: we.id,
    exerciseId: we.exerciseId,
    setId: null,
    defaultWeight: lastSet?.weight ?? 0,
    defaultReps: lastSet?.reps ?? 0,
  };
}

function openEditSet(we: WorkoutExercise, set: SetEntry) {
  uiStore.addSetSheet = {
    show: true,
    date: currentDate.value,
    workoutExerciseId: we.id,
    exerciseId: we.exerciseId,
    setId: set.id,
    defaultWeight: set.weight,
    defaultReps: set.reps,
  };
}

async function removeSet(workoutExerciseId: string, setId: string) {
  try {
    await showConfirmDialog({
      title: t('workout.removeSetTitle'),
      confirmButtonText: t('workout.remove'),
      confirmButtonColor: '#ee0a24',
    });
  } catch {
    return;
  }
  workoutStore.removeSet(currentDate.value, workoutExerciseId, setId);
}

async function removeExercise(workoutExerciseId: string) {
  try {
    await showConfirmDialog({
      title: t('workout.removeExerciseTitle'),
      message: t('workout.removeExerciseMessage'),
      confirmButtonText: t('workout.remove'),
      confirmButtonColor: '#ee0a24',
    });
  } catch {
    return;
  }
  workoutStore.removeExercise(currentDate.value, workoutExerciseId);
}
</script>

<style scoped lang="scss">
.workout-page {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.workout-summary {
  text-align: center;
  padding: 16px;
  font-size: 13px;
  color: var(--van-text-color-2);
}
</style>
