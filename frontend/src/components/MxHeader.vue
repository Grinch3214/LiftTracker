<template>
  <div class="p-4">
    <van-config-provider theme="dark">
      <van-nav-bar
        title="Lift Tracker"
        left-text="Назад"
        right-text="Сегодня"
      />

      <van-calendar
        v-model:show="showCalendar"
        v-model="selectedDate"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="onConfirm"
        @close="showCalendar = false"
        color="#1989fa"
      />

      <van-cell
        title="Выбрать дату тренировки"
        :value="formattedDate"
        is-link
        @click="showCalendar = true"
      />

      <van-form v-if="selectedDate">
        <van-field
          v-model="workoutName"
          label="Название тренировки"
          placeholder="Например: Ноги + пресс"
        />
        <van-button type="primary" block @click="saveWorkout"
          >Сохранить</van-button
        >
      </van-form>
    </van-config-provider>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

import { Locale } from 'vant';
import enUS from 'vant/es/locale/lang/en-US';
import { showToast } from 'vant';

Locale.use('en-US', enUS);

const showCalendar = ref(false);
const selectedDate = ref(null);
const minDate = ref(new Date(2025, 0, 1));
const maxDate = ref(new Date(2030, 11, 31));

const formattedDate = computed(() => {
  if (!selectedDate.value) return 'Не выбрано';
  return selectedDate.value.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
});

const workoutName = ref('');

const onConfirm = (date) => {
  selectedDate.value = date;
  showCalendar.value = false;
  showToast(`Выбрана дата: ${date.toLocaleDateString('en-EN')}`);
};

const saveWorkout = () => {
  showToast('Тренировка сохранена!');
};
</script>

<style>
:root {
  --van-primary-color: #1989fa;
}
</style>
