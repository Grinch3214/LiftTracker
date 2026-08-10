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

      <div class="workout-summary">
        <span>{{ exercises.length }} exercises</span>
        <span class="dot">·</span>
        <span>{{ totalSets }} sets</span>
        <span class="dot">·</span>
        <span>{{ totalVolume.toLocaleString() }} kg total</span>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { showConfirmDialog } from 'vant';
import type { SetEntry, WorkoutExercise } from '~~/types';
import { useWorkoutStore } from '@/stores/workout';
import { useUiStore } from '@/stores/ui';
import { getExerciseById } from '@/utils/exercises';
import { formatDate } from '@/utils/date';

const workoutStore = useWorkoutStore();
const uiStore = useUiStore();

const currentDate = computed(() => formatDate(uiStore.selectedDate));

const exercises = computed(() => workoutStore.getWorkoutByDate(currentDate.value)?.exercises ?? []);

const totalSets = computed(() => exercises.value.reduce((sum, ex) => sum + ex.sets.length, 0));

const totalVolume = computed(() =>
  exercises.value.reduce((sum, ex) => sum + ex.sets.reduce((s, set) => s + set.weight * set.reps, 0), 0),
);

function getExercise(exerciseId: string) {
  return getExerciseById(exerciseId)!;
}

function openAddSet(we: WorkoutExercise) {
  const exercise = getExerciseById(we.exerciseId);
  const lastSet = we.sets.length > 0 ? we.sets[we.sets.length - 1] : null;
  uiStore.addSetSheet = {
    show: true,
    date: currentDate.value,
    workoutExerciseId: we.id,
    exerciseId: we.exerciseId,
    setId: null,
    defaultWeight: lastSet?.weight ?? 0,
    defaultReps: lastSet?.reps ?? 0,
    exerciseName: exercise?.name ?? '',
  };
}

function openEditSet(we: WorkoutExercise, set: SetEntry) {
  const exercise = getExerciseById(we.exerciseId);
  uiStore.addSetSheet = {
    show: true,
    date: currentDate.value,
    workoutExerciseId: we.id,
    exerciseId: we.exerciseId,
    setId: set.id,
    defaultWeight: set.weight,
    defaultReps: set.reps,
    exerciseName: exercise?.name ?? '',
  };
}

function removeSet(workoutExerciseId: string, setId: string) {
  workoutStore.removeSet(currentDate.value, workoutExerciseId, setId);
}

async function removeExercise(workoutExerciseId: string) {
  await showConfirmDialog({
    title: 'Remove exercise?',
    message: 'All sets will be deleted.',
    confirmButtonText: 'Remove',
    confirmButtonColor: '#ee0a24',
  });
  workoutStore.removeExercise(currentDate.value, workoutExerciseId);
}
</script>

<style scoped lang="scss">
.workout-page {
  padding-bottom: 100px;
}

.workout-summary {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px;
  font-size: 13px;
  color: var(--van-text-color-2);
}

.dot {
  opacity: 0.4;
}
</style>
