<template>
  <van-action-sheet
    v-model:show="globalStore.isShowGroupPanel"
    :title="selectedGroup ? selectedGroup.name : 'Select Exercise'"
    class="group-panel"
    @closed="selectedGroup = null"
  >
    <div class="content">
      <div class="content-subhead">
        <div
          v-if="selectedGroup"
          class="back-btn"
          @click="selectedGroup = null"
        >
          ← Back
        </div>
      </div>

      <van-list v-if="!selectedGroup">
        <van-cell
          v-for="group in muscleGroups"
          :key="group.id"
          :title="`${group.icon} ${group.name}`"
          :value="`${group.exercises.length} exercises`"
          is-link
          @click="selectedGroup = group"
        />
      </van-list>

      <van-list v-else>
        <van-cell
          v-for="exercise in selectedGroup.exercises"
          :key="exercise.id"
          :title="exercise.name"
          :label="equipmentLabels[exercise.equipment]"
          is-link
          @click="selectExercise(exercise)"
        />
      </van-list>
    </div>
  </van-action-sheet>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { showSuccessToast, showToast } from 'vant';
import { useGlobalStore } from '@/stores/global';
import { useWorkoutStore } from '@/stores/workout';
import { useCalendarStore } from '@/stores/calendar';
import { muscleGroups, equipmentLabels } from '../mockdata';
import type { MuscleGroup, Exercise } from '../types';
import { formatDate } from '../helpers';

const globalStore = useGlobalStore();
const workoutStore = useWorkoutStore();
const calendarStore = useCalendarStore();

const selectedGroup = ref<MuscleGroup | null>(null);

function selectExercise(exercise: Exercise) {
  const date = calendarStore.selectedDate
    ? formatDate(calendarStore.selectedDate)
    : formatDate(new Date());

  const log = workoutStore.getLogByDate(date);
  const alreadyAdded = log?.exercises.some(
    (e) => e.exerciseId === exercise.id,
  );

  if (alreadyAdded) {
    showToast(`${exercise.name} already in workout`);
    return;
  }

  workoutStore.addExercise(date, exercise.id);
  globalStore.isShowGroupPanel = false;
  selectedGroup.value = null;
  showSuccessToast(`${exercise.name} added`);
}
</script>

<style>
.group-panel {
  height: 80%;
}

.content-subhead {
  display: flex;
  justify-content: flex-start;
}

.back-btn {
  padding: 12px 16px;
  cursor: pointer;
  color: var(--van-primary-color);
  font-size: 14px;
  font-weight: 600;
}
</style>