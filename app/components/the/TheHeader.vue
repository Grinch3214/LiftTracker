<template>
  <header class="header">
    <van-nav-bar
      :title="title"
      :right-text="isWorkoutPage ? dateLabel : ''"
      @click-right="isWorkoutPage && (showCalendar = true)"
    />

    <van-calendar
      v-model:show="showCalendar"
      :show-confirm="false"
      :default-date="uiStore.selectedDate"
      :min-date="minDate"
      :max-date="maxDate"
      :formatter="dayFormatter"
      color="#3c8ee0"
      @confirm="onConfirm"
    />
  </header>
</template>

<script setup lang="ts">
import type { CalendarDayItem } from 'vant';
import { useUiStore } from '@/stores/ui';
import { useWorkoutStore } from '@/stores/workout';
import { formatDate, isToday } from '@/utils/date';

const route = useRoute();
const uiStore = useUiStore();
const workoutStore = useWorkoutStore();

const showCalendar = ref(false);
const minDate = ref(new Date(2025, 0, 1));
const maxDate = ref(new Date(2030, 11, 31));

const isWorkoutPage = computed(() => route.path === '/');

const titles: Record<string, string> = {
  '/': 'LiftTracker',
  '/history': 'History',
};

const title = computed(() => titles[route.path] ?? 'LiftTracker');

const dateLabel = computed(() =>
  isToday(formatDate(uiStore.selectedDate))
    ? 'Today'
    : formatDate(uiStore.selectedDate),
);

function dayFormatter(day: CalendarDayItem): CalendarDayItem {
  if (day.date && workoutStore.workoutDates.includes(formatDate(day.date))) {
    day.bottomInfo = '·';
  }
  return day;
}

function onConfirm(date: Date) {
  uiStore.selectedDate = date;
  showCalendar.value = false;
}
</script>

<style lang="scss" scoped>
.header {
  position: sticky;
  inset-block-start: 0;
  z-index: 5;
}
</style>
