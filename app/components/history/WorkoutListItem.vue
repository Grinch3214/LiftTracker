<template>
  <div class="workout-item" @click="open">
    <div class="workout-item__date">
      <span class="day">{{ dayLabel }}</span>
      <span class="weekday">{{ weekdayLabel }}</span>
    </div>
    <div class="workout-item__stats">
      <span class="exercise-names">{{ exerciseNames }}</span>
      <span class="dot">·</span>
      <span>{{ totalSets }} sets</span>
      <span class="dot">·</span>
      <span>{{ totalVolume.toLocaleString() }} kg</span>
    </div>
    <van-icon name="arrow" size="14" color="#888" />
  </div>
</template>

<script setup lang="ts">
import type { Workout } from '~~/types';
import { useUiStore } from '@/stores/ui';
import { parseDate } from '@/utils/date';
import { getExerciseById } from '@/utils/exercises';

const props = defineProps<{ workout: Workout }>();
const uiStore = useUiStore();

const date = computed(() => parseDate(props.workout.date));

const dayLabel = computed(() => date.value.getDate());
const weekdayLabel = computed(() =>
  date.value.toLocaleDateString('en-US', { month: 'short', weekday: 'short' }),
);

const exerciseNames = computed(() =>
  props.workout.exercises
    .map((we) => getExerciseById(we.exerciseId)?.name)
    .filter(Boolean)
    .join(', '),
);

const totalSets = computed(() =>
  props.workout.exercises.reduce((sum, e) => sum + e.sets.length, 0),
);

const totalVolume = computed(() =>
  props.workout.exercises.reduce(
    (sum, e) => sum + e.sets.reduce((s, set) => s + set.weight * set.reps, 0),
    0,
  ),
);

function open() {
  uiStore.selectedDate = date.value;
  navigateTo('/');
}
</script>

<style scoped lang="scss">
.workout-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--van-border-color);
  cursor: pointer;
}

.workout-item__date {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 44px;
}

.day {
  font-size: 18px;
  font-weight: 700;
  color: var(--van-text-color);
}

.weekday {
  font-size: 11px;
  color: var(--van-text-color-2);
  text-transform: uppercase;
}

.workout-item__stats {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  font-size: 13px;
  color: var(--van-text-color-2);
  min-width: 0;
}

.exercise-names {
  color: var(--van-text-color);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}

.dot {
  opacity: 0.4;
}
</style>
