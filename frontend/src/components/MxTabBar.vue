<template>
  <van-tabbar
    v-model="activeIndex"
    active-color="#3c8ee0"
    inactive-color="#666"
    :border="false"
    class="tab-bar"
  >
    <van-tabbar-item icon="notes-o">Workout</van-tabbar-item>
    <van-tabbar-item icon="calendar-o">History</van-tabbar-item>
    <van-tabbar-item icon="apps-o">Templates</van-tabbar-item>
    <van-tabbar-item icon="chart-trending-o">Progress</van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useGlobalStore, type ActiveTab } from '@/stores/global';

const globalStore = useGlobalStore();
const tabs: ActiveTab[] = ['workout', 'history', 'templates', 'progress'];

const activeIndex = computed({
  get: () => tabs.indexOf(globalStore.activeTab),
  set: (val: number) => {
    globalStore.activeTab = tabs[val] ?? 'workout';
  },
});
</script>

<style scoped>
.tab-bar {
  background: var(--van-background-2);
  border-top: 1px solid var(--van-border-color);
}
</style>