<template>
  <div class="history-page">
    <van-empty
      v-if="sortedWorkouts.length === 0"
      description="No workouts logged yet"
    />

    <HistoryWorkoutListItem
      v-for="workout in sortedWorkouts"
      :key="workout.id"
      :workout="workout"
    />
  </div>
</template>

<script setup lang="ts">
import { useWorkoutStore } from '@/stores/workout';

const workoutStore = useWorkoutStore();

const sortedWorkouts = computed(() =>
  [...workoutStore.workouts].sort((a, b) => b.date.localeCompare(a.date)),
);
</script>

<style scoped lang="scss">
.history-page {
  height: 100%;
  display: flex;
  flex-flow: column;

  .van-empty {
    margin-block: auto;
    padding-block: 0px var(--van-tabbar-height);
  }
}
</style>
