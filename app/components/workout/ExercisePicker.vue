<template>
  <van-action-sheet
    v-model:show="uiStore.exercisePicker.show"
    :title="selectedGroup ? selectedGroup.name : 'Select Exercise'"
    class="exercise-picker"
    @closed="selectedGroup = null"
  >
    <div class="content">
      <div v-if="selectedGroup" class="back-btn" @click="selectedGroup = null">← Back</div>

      <van-list v-if="!selectedGroup">
        <van-cell
          v-for="group in muscleGroups"
          :key="group.id"
          :title="group.name"
          :value="`${getExercisesByMuscleGroup(group.id).length} exercises`"
          is-link
          @click="selectedGroup = group"
        />
      </van-list>

      <van-list v-else>
        <van-cell
          v-for="exercise in getExercisesByMuscleGroup(selectedGroup.id)"
          :key="exercise.id"
          :title="exercise.name"
          :label="exercise.equipment ? equipmentLabels[exercise.equipment] : ''"
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
import type { MuscleGroup, Exercise } from '~~/types';
import { useUiStore } from '@/stores/ui';
import { useWorkoutStore } from '@/stores/workout';
import { muscleGroups } from '@/data/muscle-groups';
import { getExercisesByMuscleGroup, equipmentLabels } from '@/utils/exercises';
import { formatDate } from '@/utils/date';

const uiStore = useUiStore();
const workoutStore = useWorkoutStore();

const selectedGroup = ref<MuscleGroup | null>(null);

function selectExercise(exercise: Exercise) {
  const date = formatDate(uiStore.selectedDate);
  const workout = workoutStore.getWorkoutByDate(date);
  const alreadyAdded = workout?.exercises.some((e) => e.exerciseId === exercise.id);

  if (alreadyAdded) {
    showToast(`${exercise.name} already in workout`);
    return;
  }

  workoutStore.addExercise(date, exercise.id);
  uiStore.exercisePicker.show = false;
  selectedGroup.value = null;
  showSuccessToast(`${exercise.name} added`);
}
</script>

<style scoped lang="scss">
.exercise-picker {
  height: 80%;
}

.back-btn {
  padding: 12px 16px;
  cursor: pointer;
  color: var(--van-primary-color);
  font-size: 14px;
  font-weight: 600;
}
</style>
