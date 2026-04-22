<template>
  <div class="templates-page">
    <div class="templates-list">
      <div
        v-for="template in workoutTemplates"
        :key="template.id"
        class="template-card"
      >
        <div class="template-top">
          <span class="template-icon">{{ template.icon }}</span>
          <div class="template-info">
            <span class="template-name">{{ template.name }}</span>
            <span class="template-count">
              {{ template.exercises.length }} exercises
            </span>
          </div>
        </div>

        <div class="template-exercises">
          <div
            v-for="te in template.exercises"
            :key="te.exerciseId"
            class="template-ex-row"
          >
            <span class="te-name">{{ getExerciseName(te.exerciseId) }}</span>
            <span class="te-sets">
              {{ te.defaultSets }} × {{ te.defaultReps }}
              <span v-if="te.defaultWeight > 0"> @ {{ te.defaultWeight }} kg</span>
              <span v-else> BW</span>
            </span>
          </div>
        </div>

        <van-button
          type="primary"
          block
          round
          class="start-btn"
          @click="startTemplate(template.id)"
        >
          Start Workout
        </van-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { showSuccessToast } from 'vant';
import { workoutTemplates } from '../mockdata';
import { getExerciseById, formatDate } from '../helpers';
import { useWorkoutStore } from '@/stores/workout';
import { useCalendarStore } from '@/stores/calendar';
import { useGlobalStore } from '@/stores/global';

const workoutStore = useWorkoutStore();
const calendarStore = useCalendarStore();
const globalStore = useGlobalStore();

function getExerciseName(exerciseId: number): string {
  return getExerciseById(exerciseId)?.name ?? 'Unknown';
}

function startTemplate(templateId: number) {
  const date = calendarStore.selectedDate
    ? formatDate(calendarStore.selectedDate)
    : formatDate(new Date());
  workoutStore.startFromTemplate(date, templateId);
  globalStore.activeTab = 'workout';
  showSuccessToast('Template loaded!');
}
</script>

<style scoped>
.templates-page {
  padding: 12px 12px 100px;
}

.templates-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.template-card {
  background: var(--van-background-2);
  border-radius: 14px;
  padding: 16px;
}

.template-top {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
}

.template-icon {
  font-size: 28px;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(60, 142, 224, 0.1);
  border-radius: 12px;
}

.template-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.template-name {
  font-size: 17px;
  font-weight: 700;
  color: var(--van-text-color);
}

.template-count {
  font-size: 12px;
  color: var(--van-text-color-2);
}

.template-exercises {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
  padding-left: 4px;
}

.template-ex-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.te-name {
  font-size: 14px;
  color: var(--van-text-color);
}

.te-sets {
  font-size: 13px;
  color: var(--van-text-color-2);
}

.start-btn {
  margin-top: 4px;
}
</style>