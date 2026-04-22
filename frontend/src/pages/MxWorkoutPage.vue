<template>
  <div class="workout-page">
    <!-- Rest timer banner -->
    <Transition name="slide-down">
      <div
        v-if="globalStore.restTimer.active"
        class="rest-timer"
        @click="globalStore.stopRestTimer()"
      >
        <van-icon name="clock-o" size="15" />
        <span class="timer-label">Rest</span>
        <span class="timer-value">{{ timerDisplay }}</span>
        <div class="timer-bar">
          <div
            class="timer-bar-fill"
            :style="{ width: timerProgress + '%' }"
          />
        </div>
        <van-icon name="cross" size="13" color="#888" />
      </div>
    </Transition>

    <!-- Empty state -->
    <div v-if="exercises.length === 0" class="empty-state">
      <van-empty image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png" description=" " />
      <p class="empty-title">No workout for this day</p>
      <p class="empty-sub">Start from a template or add exercises with +</p>
      <div class="template-chips">
        <van-button
          v-for="t in topTemplates"
          :key="t.id"
          size="small"
          plain
          type="primary"
          class="template-chip"
          @click="startTemplate(t.id)"
        >
          {{ t.icon }} {{ t.name }}
        </van-button>
      </div>
    </div>

    <!-- Exercise cards -->
    <MxExerciseCard
      v-for="we in exercises"
      :key="we.id"
      :exercise="getExercise(we.exerciseId)"
      :workout-exercise="we"
      :date="currentDate"
      @add-set="openAddSet(we)"
      @edit-set="(set) => openEditSet(we, set)"
      @delete-set="(setId) => removeSet(we.id, setId)"
      @delete-exercise="removeExercise(we.id)"
    />

    <!-- Workout summary -->
    <div v-if="exercises.length > 0" class="workout-summary">
      <span>{{ exercises.length }} exercises</span>
      <span class="dot">·</span>
      <span>{{ totalSets }} sets</span>
      <span class="dot">·</span>
      <span>{{ totalVolume.toLocaleString() }} kg total</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { showConfirmDialog } from 'vant';
import { useCalendarStore } from '@/stores/calendar';
import { useWorkoutStore } from '@/stores/workout';
import { useGlobalStore } from '@/stores/global';
import { workoutTemplates, type WorkoutSet, type WorkoutExercise } from '../mockdata';
import { getExerciseById, formatDate } from '../helpers';
import MxExerciseCard from '@/components/MxExerciseCard.vue';

const calendarStore = useCalendarStore();
const workoutStore = useWorkoutStore();
const globalStore = useGlobalStore();

const currentDate = computed(() =>
  calendarStore.selectedDate
    ? formatDate(calendarStore.selectedDate)
    : formatDate(new Date()),
);

const exercises = computed(
  () => workoutStore.getLogByDate(currentDate.value)?.exercises ?? [],
);

const topTemplates = computed(() => workoutTemplates.slice(0, 3));

const timerDisplay = computed(() => {
  const s = globalStore.restTimer.remaining;
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
});

const timerProgress = computed(() => {
  const { remaining, total } = globalStore.restTimer;
  return total > 0 ? (remaining / total) * 100 : 0;
});

const totalSets = computed(() =>
  exercises.value.reduce((sum, ex) => sum + ex.sets.length, 0),
);

const totalVolume = computed(() =>
  exercises.value.reduce(
    (sum, ex) =>
      sum + ex.sets.reduce((s, set) => s + set.weight * set.reps, 0),
    0,
  ),
);

function getExercise(exerciseId: number) {
  return getExerciseById(exerciseId)!;
}

function openAddSet(we: WorkoutExercise) {
  const ex = getExerciseById(we.exerciseId);
  const lastSet = we.sets.length > 0 ? we.sets[we.sets.length - 1] : null;
  globalStore.addSetSheet = {
    show: true,
    date: currentDate.value,
    workoutExerciseId: we.id,
    exerciseId: we.exerciseId,
    setId: null,
    defaultWeight: lastSet?.weight ?? 0,
    defaultReps: lastSet?.reps ?? 0,
    exerciseName: ex?.name ?? '',
  };
}

function openEditSet(we: WorkoutExercise, set: WorkoutSet) {
  const ex = getExerciseById(we.exerciseId);
  globalStore.addSetSheet = {
    show: true,
    date: currentDate.value,
    workoutExerciseId: we.id,
    exerciseId: we.exerciseId,
    setId: set.id,
    defaultWeight: set.weight,
    defaultReps: set.reps,
    exerciseName: ex?.name ?? '',
  };
}

function removeSet(workoutExerciseId: number, setId: number) {
  workoutStore.removeSet(currentDate.value, workoutExerciseId, setId);
}

async function removeExercise(workoutExerciseId: number) {
  await showConfirmDialog({
    title: 'Remove exercise?',
    message: 'All sets will be deleted.',
    confirmButtonText: 'Remove',
    confirmButtonColor: '#ee0a24',
  });
  workoutStore.removeExercise(currentDate.value, workoutExerciseId);
}

function startTemplate(templateId: number) {
  workoutStore.startFromTemplate(currentDate.value, templateId);
}
</script>

<style scoped>
.workout-page {
  padding-bottom: 100px;
}

.rest-timer {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: rgba(60, 142, 224, 0.12);
  border-bottom: 1px solid rgba(60, 142, 224, 0.2);
  cursor: pointer;
  overflow: hidden;
  position: relative;
}

.timer-label {
  font-size: 13px;
  color: var(--van-text-color-2);
}

.timer-value {
  font-size: 18px;
  font-weight: 700;
  color: var(--van-primary-color);
  min-width: 42px;
}

.timer-bar {
  flex: 1;
  height: 3px;
  background: rgba(60, 142, 224, 0.2);
  border-radius: 2px;
  overflow: hidden;
}

.timer-bar-fill {
  height: 100%;
  background: var(--van-primary-color);
  border-radius: 2px;
  transition: width 1s linear;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.25s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 24px 16px;
  text-align: center;
}

.empty-title {
  font-size: 17px;
  font-weight: 700;
  color: var(--van-text-color);
  margin: 0 0 6px;
}

.empty-sub {
  font-size: 13px;
  color: var(--van-text-color-2);
  margin: 0 0 20px;
}

.template-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}

.template-chip {
  border-radius: 20px !important;
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