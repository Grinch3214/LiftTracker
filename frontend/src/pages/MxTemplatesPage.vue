<template>
  <div class="page">
    <div class="page__list">
      <div v-for="template in workoutTemplates" :key="template.id" class="card">
        <div class="card__top">
          <span class="card__icon">{{ template.icon }}</span>
          <div class="card__info">
            <span class="card__name">{{ template.name }}</span>
            <span class="card__count">
              {{ template.exercises.length }} exercises
            </span>
          </div>
        </div>

        <div class="card__exercises">
          <div
            v-for="te in template.exercises"
            :key="te.exerciseId"
            class="card__ex-row"
          >
            <span class="card__te-name">{{
              getExerciseName(te.exerciseId)
            }}</span>
            <span class="card__te-sets">
              {{ te.defaultSets }} × {{ te.defaultReps }}
              <span v-if="te.defaultWeight > 0">
                @ {{ te.defaultWeight }} kg</span
              >
              <span v-else> BW</span>
            </span>
          </div>
        </div>

        <MxButton
          type="primary"
          block
          round
          text="Start Workout"
          @click="startTemplate(template.id)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { showSuccessToast } from 'vant';
import MxButton from '@/components/MxButton.vue';
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

<style scoped lang="scss">
.page {
  padding: 12px 12px 100px;

  &__list {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
}

.card {
  background: var(--van-background-2);
  border-radius: 14px;
  padding: 16px;

  &__top {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 14px;
  }

  &__icon {
    font-size: 28px;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(60, 142, 224, 0.1);
    border-radius: 12px;
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  &__name {
    font-size: 17px;
    font-weight: 700;
    color: var(--van-text-color);
  }

  &__count {
    font-size: 12px;
    color: var(--van-text-color-2);
  }

  &__exercises {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 16px;
    padding-left: 4px;
  }

  &__ex-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__te-name {
    font-size: 14px;
    color: var(--van-text-color);
  }

  &__te-sets {
    font-size: 13px;
    color: var(--van-text-color-2);
  }
}
</style>
