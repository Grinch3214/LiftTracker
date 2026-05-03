<template>
  <div class="progress-page">
    <van-tabs
      v-model:active="activeGroupIndex"
      color="#3c8ee0"
      title-active-color="#3c8ee0"
      shrink
      sticky
      offset-top="46px"
      class="group-tabs"
    >
      <van-tab
        v-for="group in muscleGroups"
        :key="group.id"
        :title="`${group.icon}`"
      >
        <div class="exercise-list">
          <div
            v-for="exercise in group.exercises"
            :key="exercise.id"
            class="exercise-row"
            @click="openExercise(exercise)"
          >
            <div class="ex-info">
              <span class="ex-name">{{ exercise.name }}</span>
              <span class="ex-pr">{{ getPRLabel(exercise.id) }}</span>
            </div>
            <div class="ex-right">
              <span class="sessions-count">
                {{ getSessionCount(exercise.id) }}
                {{ getSessionCount(exercise.id) === 1 ? 'session' : 'sessions' }}
              </span>
              <van-icon name="arrow" size="14" color="#555" />
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>

    <!-- Exercise history popup -->
    <van-popup
      v-model:show="showHistory"
      position="bottom"
      round
      :style="{ height: '72%' }"
      class="history-popup"
    >
      <div class="popup-handle" />

      <div class="popup-header">
        <div class="popup-title-row">
          <span class="popup-title">{{ selectedExercise?.name }}</span>
          <van-tag
            v-if="selectedPR"
            type="warning"
            class="pr-tag"
          >
            🏆 PR: {{ selectedPR.weight > 0 ? selectedPR.weight + ' kg' : 'BW' }} × {{ selectedPR.reps }}
          </van-tag>
        </div>
      </div>

      <div class="popup-content">
        <div v-if="exerciseHistory.length === 0" class="popup-empty">
          <van-empty description="No history yet" />
        </div>

        <div v-else class="history-entries">
          <div
            v-for="entry in reversedHistory"
            :key="entry.date"
            class="history-entry"
          >
            <div class="entry-header">
              <span class="entry-date">{{ formatEntryDate(entry.date) }}</span>
              <span class="entry-volume">{{ entry.totalVolume.toLocaleString() }} kg vol</span>
            </div>
            <div class="entry-sets">
              <span
                v-for="(set, i) in entry.sets"
                :key="set.id"
                class="set-chip"
                :class="{ 'chip-pr': entry.maxWeight > 0 && set.weight >= entry.maxWeight }"
              >
                {{ set.weight > 0 ? set.weight + ' kg' : 'BW' }} × {{ set.reps }}
                <span v-if="i < entry.sets.length - 1" class="sep">·</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { muscleGroups } from '../mockdata';
import type { Exercise } from '../types';
import { useWorkoutStore } from '@/stores/workout';

const workoutStore = useWorkoutStore();

const activeGroupIndex = ref(0);
const showHistory = ref(false);
const selectedExercise = ref<Exercise | null>(null);

const exerciseHistory = computed(() => {
  if (!selectedExercise.value) return [];
  return workoutStore.getExerciseHistory(selectedExercise.value.id);
});

const reversedHistory = computed(() => [...exerciseHistory.value].reverse());

const selectedPR = computed(() => {
  if (!selectedExercise.value) return null;
  return workoutStore.getPersonalRecord(selectedExercise.value.id);
});

function getSessionCount(exerciseId: number): number {
  return workoutStore.getExerciseHistory(exerciseId).length;
}

function getPRLabel(exerciseId: number): string {
  const pr = workoutStore.getPersonalRecord(exerciseId);
  if (!pr) return 'No data';
  return `Best: ${pr.weight > 0 ? pr.weight + ' kg' : 'BW'} × ${pr.reps}`;
}

function openExercise(exercise: Exercise) {
  selectedExercise.value = exercise;
  showHistory.value = true;
}

function formatEntryDate(dateStr: string): string {
  const parts = dateStr.split('-');
  return new Date(
    Number(parts[0]),
    Number(parts[1]) - 1,
    Number(parts[2]),
  ).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}
</script>

<style scoped>
.progress-page {
  padding-bottom: 100px;
}

.exercise-list {
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.exercise-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  background: var(--van-background-2);
  border-radius: 10px;
  margin-bottom: 6px;
  cursor: pointer;
  transition: opacity 0.15s;
}

.exercise-row:active {
  opacity: 0.7;
}

.ex-info {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.ex-name {
  font-size: 15px;
  font-weight: 600;
  color: var(--van-text-color);
}

.ex-pr {
  font-size: 12px;
  color: var(--van-text-color-2);
}

.ex-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.sessions-count {
  font-size: 12px;
  color: #555;
}

/* Popup */
.history-popup {
  display: flex;
  flex-direction: column;
}

.popup-handle {
  width: 36px;
  height: 4px;
  border-radius: 2px;
  background: var(--van-gray-5);
  margin: 12px auto 0;
  flex-shrink: 0;
}

.popup-header {
  padding: 14px 16px 12px;
  border-bottom: 1px solid var(--van-border-color);
  flex-shrink: 0;
}

.popup-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.popup-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--van-text-color);
}

.pr-tag {
  font-size: 12px;
  white-space: nowrap;
}

.popup-content {
  flex: 1;
  overflow-y: auto;
  padding: 12px 16px;
}

.popup-empty {
  padding-top: 40px;
}

.history-entries {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.history-entry {
  background: var(--van-background-2);
  border-radius: 10px;
  padding: 12px 14px;
}

.entry-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.entry-date {
  font-size: 13px;
  font-weight: 600;
  color: var(--van-text-color);
}

.entry-volume {
  font-size: 12px;
  color: var(--van-text-color-2);
}

.entry-sets {
  display: flex;
  flex-wrap: wrap;
  gap: 0;
  font-size: 13px;
  color: var(--van-text-color-2);
}

.set-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.set-chip.chip-pr {
  color: #ffc107;
  font-weight: 600;
}

.sep {
  margin: 0 5px;
  opacity: 0.4;
}
</style>