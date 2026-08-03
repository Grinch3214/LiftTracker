export const useWorkoutStore = defineStore('workout', () => {
  // delete after test
  const workouts = ref([1, 2, 3, 4, 5]);

  return {
    workouts,
  };
});
