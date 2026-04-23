<template>
  <div class="history-page">
    <div v-if="sortedLogs.length === 0" class="empty-wrap">
      <van-empty description="No workouts logged yet" />
    </div>

    <div v-else class="log__list">
      <div
        v-for="log in sortedLogs"
        :key="log.date"
        class="log__card"
        @click="goToWorkout(log.date)"
      >
        <div class="log__top">
          <div class="log__date-block">
            <span class="log__day-name">{{ getDayName(log.date) }}</span>
            <span class="log__date">{{ getShortDate(log.date) }}</span>
          </div>
          <div class="log__stats">
            <span class="log__stat">
              <van-icon name="apps-o" size="13" />
              {{ log.exercises.length }}
            </span>
            <span class="log__stat">
              <van-icon name="notes-o" size="13" />
              {{ getTotalSets(log) }}
            </span>
            <span class="log__stat">
              <van-icon name="chart-trending-o" size="13" />
              {{ getTotalVolume(log).toLocaleString() }} kg
            </span>
          </div>
        </div>

        <div class="log__exercises">
          <van-tag
            v-for="ex in log.exercises.slice(0, 4)"
            :key="ex.id"
            plain
            type="primary"
            class="ex-tag"
          >
            {{ getExerciseName(ex.exerciseId) }}
          </van-tag>
          <van-tag
            v-if="log.exercises.length > 4"
            plain
            class="ex-tag more-tag"
          >
            +{{ log.exercises.length - 4 }} more
          </van-tag>
        </div>

        <van-icon name="arrow" size="14" color="#555" class="arrow-icon" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useWorkoutStore } from '@/stores/workout';
import { useCalendarStore } from '@/stores/calendar';
import { useGlobalStore } from '@/stores/global';
import type { WorkoutLog } from '../types';
import { getExerciseById } from '../helpers';

const workoutStore = useWorkoutStore();
const calendarStore = useCalendarStore();
const globalStore = useGlobalStore();

const sortedLogs = computed(() =>
  [...workoutStore.logs].sort((a, b) => b.date.localeCompare(a.date)),
);

function getExerciseName(exerciseId: number): string {
  return getExerciseById(exerciseId)?.name ?? 'Unknown';
}

function getTotalSets(log: WorkoutLog): number {
  return log.exercises.reduce((sum, ex) => sum + ex.sets.length, 0);
}

function getTotalVolume(log: WorkoutLog): number {
  return log.exercises.reduce(
    (sum, ex) => sum + ex.sets.reduce((s, set) => s + set.weight * set.reps, 0),
    0,
  );
}

function parseDate(dateStr: string): Date {
  const parts = dateStr.split('-');
  return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
}

function getDayName(dateStr: string): string {
  return parseDate(dateStr).toLocaleDateString('en-US', { weekday: 'short' });
}

function getShortDate(dateStr: string): string {
  return parseDate(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

function goToWorkout(dateStr: string) {
  calendarStore.selectedDate = parseDate(dateStr);
  globalStore.activeTab = 'workout';
}
</script>

<style scoped lang="scss">
.history-page {
  padding: 12px 12px 100px;
}

.empty-wrap {
  padding-top: 60px;
}

.log {
  &__list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__card {
    background: var(--van-background-2);
    border-radius: 14px;
    padding: 14px 14px 12px;
    cursor: pointer;
    position: relative;
    transition: opacity 0.15s;

    &:active {
      opacity: 0.8;
    }
  }

  &__top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  &__date-block {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  &__day-name {
    font-size: 11px;
    color: var(--van-primary-color);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  &__date {
    font-size: 16px;
    font-weight: 700;
    color: var(--van-text-color);
  }

  &__stats {
    display: flex;
    gap: 12px;
    align-items: center;
  }

  &__stat {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    color: var(--van-text-color-2);
  }

  &__exercises {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
}

.ex-tag {
  border-color: var(--van-primary-color);
  color: var(--van-primary-color);
  border-radius: 6px;
}

.more-tag {
  border-color: #555;
  color: #888;
}

.arrow-icon {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
}
</style>
