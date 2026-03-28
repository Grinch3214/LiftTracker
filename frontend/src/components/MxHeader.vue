<template>
  <div class="p-4">
    <van-nav-bar
      title="Lift Tracker"
      left-text="Menu"
      :right-text="calendarStore.formattedDate"
      @click-right="showCalendar = true"
    />

    <van-calendar
      v-model:show="showCalendar"
      v-model="calendarStore.selectedDate"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="onConfirm"
      @select="onSelect"
      @close="showCalendar = false"
      color="#3c8ee0"
    />

    <!-- <van-cell
      title="Выбрать дату тренировки"
      is-link
      @click="showCalendar = true"
    /> -->

    <!-- <van-form v-if="selectedDate">
      <van-field
        v-model="workoutName"
        label="Название тренировки"
        placeholder="Например: Ноги + пресс"
      />
      <van-button type="primary" block @click="saveWorkout"
        >Сохранить</van-button
      >
    </van-form> -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useCalendarStore } from '@/stores/calendar';

import { Locale } from 'vant';
import enUS from 'vant/es/locale/lang/en-US';
import { showSuccessToast } from 'vant';

Locale.use('en-US', enUS);

const calendarStore = useCalendarStore();

const showCalendar = ref(false);
const minDate = ref(new Date(2025, 0, 1));
const maxDate = ref(new Date(2030, 11, 31));

const onConfirm = (date) => {
  calendarStore.selectedDate = date;
  showCalendar.value = false;
  showSuccessToast(
    `${date.toLocaleDateString('en-EN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })}`,
  );
};

const onSelect = (date) => {
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
/* No time today :( */
:root {
  --van-primary-color: #3c8ee0;
  --van-toast-default-width: 150px;
}

.van-toast--success {
  box-shadow: 0 0 2px 0 var(--van-toast-text-color);
}
</style>
