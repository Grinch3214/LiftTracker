<template>
  <van-popup
    v-model:show="sheet.show"
    position="bottom"
    round
    class="add-set-popup"
  >
    <div class="sheet-handle" />

    <div class="sheet-header">
      <span class="sheet-title">{{ sheet.setId !== null ? 'Edit Set' : 'Add Set' }}</span>
      <span class="sheet-exercise-name">{{ sheet.exerciseName }}</span>
    </div>

    <div v-if="prevSession" class="prev-info">
      <van-icon name="clock-o" size="13" color="#888" />
      <span>Last session: {{ prevSession.weight > 0 ? prevSession.weight + ' kg' : 'BW' }} × {{ prevSession.reps }} reps</span>
    </div>

    <div class="inputs-row">
      <div class="input-block">
        <label>Weight (kg)</label>
        <van-field
          v-model="weightStr"
          type="number"
          input-align="center"
          placeholder="0"
          class="set-input"
        />
      </div>
      <div class="input-divider" />
      <div class="input-block">
        <label>Reps</label>
        <van-field
          v-model="repsStr"
          type="digit"
          input-align="center"
          placeholder="0"
          class="set-input"
        />
      </div>
    </div>

    <div class="sheet-actions">
      <van-button plain size="large" class="btn-cancel" @click="cancel">
        Cancel
      </van-button>
      <van-button type="primary" size="large" class="btn-confirm" @click="confirm">
        {{ sheet.setId !== null ? 'Save' : 'Add Set' }}
      </van-button>
    </div>
  </van-popup>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useGlobalStore } from '@/stores/global';
import { useWorkoutStore } from '@/stores/workout';

const globalStore = useGlobalStore();
const workoutStore = useWorkoutStore();

const sheet = computed(() => globalStore.addSetSheet);

const weightStr = ref('');
const repsStr = ref('');

watch(
  () => sheet.value.show,
  (shown) => {
    if (shown) {
      weightStr.value =
        sheet.value.defaultWeight > 0
          ? String(sheet.value.defaultWeight)
          : '';
      repsStr.value =
        sheet.value.defaultReps > 0 ? String(sheet.value.defaultReps) : '';
    }
  },
);

const prevSession = computed(() => {
  if (!sheet.value.exerciseId) return null;
  const history = workoutStore.getExerciseHistory(sheet.value.exerciseId);
  const pastSessions = history.filter((h) => h.date !== sheet.value.date);
  if (!pastSessions.length) return null;
  const last = pastSessions[pastSessions.length - 1];
  if (!last) return null;
  return last.bestSet;
});

function confirm() {
  const weight = parseFloat(weightStr.value) || 0;
  const reps = parseInt(repsStr.value) || 0;
  if (reps === 0) return;

  if (sheet.value.setId !== null) {
    workoutStore.updateSet(
      sheet.value.date,
      sheet.value.workoutExerciseId,
      sheet.value.setId,
      weight,
      reps,
    );
  } else {
    workoutStore.addSet(
      sheet.value.date,
      sheet.value.workoutExerciseId,
      weight,
      reps,
    );
    globalStore.startRestTimer(90);
  }
  globalStore.addSetSheet.show = false;
}

function cancel() {
  globalStore.addSetSheet.show = false;
}
</script>

<style scoped>
.add-set-popup {
  padding: 0 16px 40px;
}

.sheet-handle {
  width: 36px;
  height: 4px;
  border-radius: 2px;
  background: var(--van-gray-5);
  margin: 12px auto 0;
}

.sheet-header {
  padding: 16px 0 4px;
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

.prev-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-size: 12px;
  color: #888;
  margin-bottom: 16px;
}

.inputs-row {
  display: flex;
  gap: 0;
  margin: 8px 0 20px;
  border: 1px solid var(--van-border-color);
  border-radius: 12px;
  overflow: hidden;
}

.input-block {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 0 8px;
}

.input-block label {
  font-size: 11px;
  color: var(--van-text-color-2);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
}

.set-input :deep(.van-field__control) {
  font-size: 32px;
  font-weight: 700;
  text-align: center;
  color: var(--van-text-color);
}

.input-divider {
  width: 1px;
  background: var(--van-border-color);
  align-self: stretch;
}

.sheet-actions {
  display: flex;
  gap: 10px;
}

.btn-cancel {
  flex: 1;
  border-radius: 10px;
}

.btn-confirm {
  flex: 2;
  border-radius: 10px;
}
</style>