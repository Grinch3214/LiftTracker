import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useGlobalStore = defineStore('global', () => {
  const showGroupPanel = ref<boolean>(false);
  return { showGroupPanel };
});
