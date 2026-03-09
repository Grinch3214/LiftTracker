import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useCalendarStore = defineStore('calendar', () => {
  const selectedDate = ref<Date | null>(null);

  const formattedDate = computed(() => {
    const today = new Date();
    const date = selectedDate.value;

    if (!date) return 'Today';

    const isToday =
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate();

    return isToday
      ? 'Today'
      : date.toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'long',
        });
  });

  return {
    selectedDate,
    formattedDate,
  };
});
