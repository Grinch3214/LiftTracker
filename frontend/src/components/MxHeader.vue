<template>
  <div class="p-4">
    <van-nav-bar
      title="Lift Tracker"
      left-text="Menu"
      :right-text="formattedDate"
      @click-right="showCalendar = true"
    />

    <van-calendar
      v-model:show="showCalendar"
      v-model="selectedDate"
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
import { ref, computed } from 'vue';

import { Locale } from 'vant';
import enUS from 'vant/es/locale/lang/en-US';
import { showToast, showSuccessToast } from 'vant';

Locale.use('en-US', enUS);

const showCalendar = ref(false);
const selectedDate = ref(null);
const minDate = ref(new Date(2025, 0, 1));
const maxDate = ref(new Date(2030, 11, 31));

const formattedDate = computed(() => {
  if (!selectedDate.value) return 'Today';
  return selectedDate.value.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
  });
});

const workoutName = ref('');

const onConfirm = (date) => {
  selectedDate.value = date;
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
  console.log(date);
  if (selectedDate.value && selectedDate.value.getTime() === date.getTime()) {
    onConfirm(date);
  } else {
    selectedDate.value = date;
  }
};

const saveWorkout = () => {
  showToast('Тренировка сохранена!');
};
</script>

<style>
:root {
  --van-primary-color: #3c8ee0;
  --van-toast-default-width: 150px;
}

.van-toast--success {
  box-shadow: 0 0 2px 0 var(--van-toast-text-color);
}
</style>
