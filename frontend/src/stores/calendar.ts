import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useCalendarStore = defineStore('calendar', () => {
  const selectedDate = ref<Date | null>(null);

  const formattedDate = computed(() => {
    if (!selectedDate.value) return 'Today';
    return selectedDate.value.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
    });
  });

  return {
    selectedDate,
    formattedDate,
  };
});
