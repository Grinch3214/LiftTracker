<template>
  <div class="history-page">
    <van-empty v-if="sortedWorkouts.length === 0" description="No workouts logged yet" />

    <HistoryWorkoutListItem v-for="workout in sortedWorkouts" :key="workout.id" :workout="workout" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useWorkoutStore } from '@/stores/workout';

const workoutStore = useWorkoutStore();

const sortedWorkouts = computed(() => [...workoutStore.workouts].sort((a, b) => b.date.localeCompare(a.date)));
</script>

<style scoped lang="scss">
.history-page {
  padding-bottom: 100px;
}
</style>
