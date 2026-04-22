<template>
  <div class="header-wrap">
    <van-nav-bar
      :title="headerTitle"
      :right-text="isWorkoutTab ? calendarStore.formattedDate : ''"
      @click-right="isWorkoutTab && (showCalendar = true)"
    />

    <van-calendar
      v-model:show="showCalendar"
      v-model="calendarStore.selectedDate"
      :min-date="minDate"
      :max-date="maxDate"
      :formatter="dayFormatter"
      @confirm="onConfirm"
      @select="onSelect"
      @close="showCalendar = false"
      color="#3c8ee0"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useCalendarStore } from '@/stores/calendar';
import { useGlobalStore } from '@/stores/global';
import { useWorkoutStore } from '@/stores/workout';
import { showSuccessToast, Locale } from 'vant';
import type { CalendarDayItem } from 'vant';
import enUS from 'vant/es/locale/lang/en-US';

Locale.use('en-US', enUS);

const calendarStore = useCalendarStore();
const globalStore = useGlobalStore();
const workoutStore = useWorkoutStore();

const showCalendar = ref(false);
const minDate = ref(new Date(2025, 0, 1));
const maxDate = ref(new Date(2030, 11, 31));

const isWorkoutTab = computed(() => globalStore.activeTab === 'workout');

const headerTitles: Record<string, string> = {
  workout: 'Lift Tracker',
  history: 'History',
  templates: 'Templates',
  progress: 'Progress',
};

const headerTitle = computed(
  () => headerTitles[globalStore.activeTab] ?? 'Lift Tracker',
);

function dayFormatter(day: CalendarDayItem): CalendarDayItem {
  if (day.date) {
    const d = day.date;
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    if (workoutStore.workoutDates.includes(dateStr)) {
      day.bottomInfo = '·';
    }
  }
  return day;
}

const onConfirm = (date: Date) => {
  calendarStore.selectedDate = date;
  showCalendar.value = false;
  showSuccessToast(
    date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
  );
};

const onSelect = (date: Date) => {
  if (
    calendarStore.selectedDate &&
    calendarStore.selectedDate.getTime() === date.getTime()
  ) {
    onConfirm(date);
  } else {
    calendarStore.selectedDate = date;
  }
};
</script>

<style>
:root {
  --van-primary-color: #3c8ee0;
  --van-toast-default-width: 160px;
}

.van-toast--success {
  box-shadow: 0 0 2px 0 var(--van-toast-text-color);
}

.van-calendar__bottom-info {
  color: var(--van-primary-color) !important;
  font-size: 14px !important;
}
</style>