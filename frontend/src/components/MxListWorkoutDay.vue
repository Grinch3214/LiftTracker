<template>
  <div class="workout-day">
    <div v-if="currentWorkoutExercises.length === 0" class="empty">
      Empty 💪
    </div>

    <div
      v-for="exercise in currentWorkoutExercises"
      :key="exercise.id"
      class="exercise-card"
    >
      <div class="exercise-header">
        <!-- <span class="icon">{{ getMuscleGroup(exercise)?.icon }}</span> -->
        <div>
          <h4>{{ exercise.name }}</h4>
        </div>
      </div>

      <table class="sets-table">
        <thead>
          <tr>
            <th>Сет</th>
            <th>Вес (кг)</th>
            <th>Повторы</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="set in exercise.sets" :key="set.id">
            <td>{{ set.id }}</td>
            <td>{{ set.weight }}</td>
            <td>{{ set.reps }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { getLogByDate, getExerciseById, formatDate } from '../mockdata';
import { useCalendarStore } from '@/stores/calendar';

export type EquipmentType =
  | 'barbell'
  | 'dumbbell'
  | 'machine'
  | 'cable'
  | 'bodyweight';

export interface MuscleGroup {
  id: number;
  name: string;
  icon: string;
}

export interface Exercise {
  id: number;
  name: string;
  muscleGroupId: number;
  equipment: EquipmentType;
}

export interface WorkoutSet {
  id: number;
  weight: number;
  reps: number;
}

export interface WorkoutExercise {
  id: number;
  exerciseId: number;
  sets: WorkoutSet[];
}

export interface WorkoutLog {
  date: string; // 'YYYY-MM-DD'
  exercises: WorkoutExercise[];
}

const calendarStore = useCalendarStore();

const currentWorkoutExercises = computed(() => {
  const date = calendarStore.selectedDate;
  if (!date) return [];

  const dateStr = formatDate(date);

  const log = getLogByDate(dateStr);
  if (!log?.exercises) return [];

  return log.exercises
    .map((we) => {
      const exercise = getExerciseById(we.exerciseId);
      return exercise ? { ...exercise, sets: we.sets } : null;
    })
    .filter((ex): ex is Exercise & { sets: WorkoutSet[] } => ex !== null);
});
</script>
