import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useCalendarStore = defineStore('calendar', () => {
  const date = ref();

  return {
    date,
  };
});
