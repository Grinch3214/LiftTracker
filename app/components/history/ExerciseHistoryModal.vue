<template>
  <van-popup v-model:show="show" position="bottom" round closeable class="history-popup">
    <div class="sheet-handle" />

    <div class="sheet-header">
      <span class="sheet-title">History</span>
      <span class="sheet-exercise-name">{{ exercise?.name }}</span>
    </div>

    <div v-if="history.length === 0" class="empty">No history yet for this exercise.</div>

    <div v-else class="history-list">
      <div v-for="entry in history" :key="entry.date" class="history-entry">
        <div class="entry-date">{{ entry.date }}</div>
        <div class="entry-sets">
          <span v-for="set in entry.sets" :key="set.id" class="entry-set">
            {{ set.weight > 0 ? set.weight + ' kg' : 'BW' }} × {{ set.reps }}
          </span>
        </div>
        <div class="entry-stats">
          <span>Best: {{ entry.bestSet ? `${entry.bestSet.weight} kg × ${entry.bestSet.reps}` : '—' }}</span>
          <span class="dot">·</span>
          <span>{{ entry.totalVolume.toLocaleString() }} kg total</span>
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useUiStore } from '@/stores/ui';
import { useWorkoutStore } from '@/stores/workout';
import { getExerciseById } from '@/utils/exercises';

const uiStore = useUiStore();
const workoutStore = useWorkoutStore();

const show = computed({
  get: () => uiStore.historyExerciseId !== null,
  set: (val: boolean) => {
    if (!val) uiStore.historyExerciseId = null;
  },
});

const exercise = computed(() => (uiStore.historyExerciseId ? getExerciseById(uiStore.historyExerciseId) : undefined));

const history = computed(() => {
  if (!uiStore.historyExerciseId) return [];
  return [...workoutStore.getExerciseHistory(uiStore.historyExerciseId)].reverse();
});
</script>

<style scoped lang="scss">
.history-popup {
  padding: 0 16px 40px;
  max-height: 70%;
}

.sheet-handle {
  width: 36px;
  height: 4px;
  border-radius: 2px;
  background: var(--van-gray-5);
  margin: 12px auto 0;
}

.sheet-header {
  padding: 16px 0 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.sheet-title {
  font-size: 13px;
  color: var(--van-text-color-2);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.sheet-exercise-name {
  font-size: 20px;
  font-weight: 700;
  color: var(--van-text-color);
}

.empty {
  text-align: center;
  padding: 24px 0;
  color: var(--van-text-color-2);
  font-size: 14px;
}

.history-list {
  overflow-y: auto;
  max-height: 50vh;
}

.history-entry {
  padding: 10px 0;
  border-top: 1px solid var(--van-border-color);
}

.entry-date {
  font-size: 13px;
  font-weight: 700;
  color: var(--van-text-color);
  margin-bottom: 4px;
}

.entry-sets {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 4px;
}

.entry-set {
  font-size: 12px;
  color: var(--van-text-color);
  background: var(--van-background);
  border-radius: 6px;
  padding: 2px 6px;
}

.entry-stats {
  font-size: 12px;
  color: var(--van-text-color-2);
}

.dot {
  opacity: 0.4;
  margin: 0 4px;
}
</style>
