import { ref } from 'vue';
import { defineStore } from 'pinia';

export type ActiveTab = 'workout' | 'history' | 'templates' | 'progress';

export interface AddSetSheetState {
  show: boolean;
  date: string;
  workoutExerciseId: number;
  exerciseId: number;
  setId: number | null;
  defaultWeight: number;
  defaultReps: number;
  exerciseName: string;
}

export const useGlobalStore = defineStore('global', () => {
  const isShowGroupPanel = ref<boolean>(false);
  const activeTab = ref<ActiveTab>('workout');

  const addSetSheet = ref<AddSetSheetState>({
    show: false,
    date: '',
    workoutExerciseId: 0,
    exerciseId: 0,
    setId: null,
    defaultWeight: 0,
    defaultReps: 0,
    exerciseName: '',
  });

  const restTimer = ref({
    active: false,
    remaining: 90,
    total: 90,
  });

  let timerInterval: ReturnType<typeof setInterval> | null = null;

  function startRestTimer(seconds = 90) {
    if (timerInterval) clearInterval(timerInterval);
    restTimer.value = { active: true, remaining: seconds, total: seconds };
    timerInterval = setInterval(() => {
      if (restTimer.value.remaining > 0) {
        restTimer.value.remaining--;
      } else {
        restTimer.value.active = false;
        if (timerInterval) clearInterval(timerInterval);
      }
    }, 1000);
  }

  function stopRestTimer() {
    if (timerInterval) clearInterval(timerInterval);
    restTimer.value.active = false;
  }

  return {
    isShowGroupPanel,
    activeTab,
    addSetSheet,
    restTimer,
    startRestTimer,
    stopRestTimer,
  };
});