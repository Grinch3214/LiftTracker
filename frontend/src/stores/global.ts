import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useGlobalStore = defineStore('global', () => {
  const isShowGroupPanel = ref<boolean>(false);
  return { isShowGroupPanel };
});
