<template>
  <header class="header">
    <van-nav-bar title="Some title" right-text="28 Nov" @click-right="" />

    <van-calendar color="#3c8ee0" />
    <!-- v-model:show="showCalendar"
      v-model="selectedDate"
      :min-date="minDate"
      :max-date="maxDate"
      :formatter="dayFormatter"
      @confirm="onConfirm"
      @select="onSelect"
      @close="showCalendar = false" -->
  </header>
</template>

<script setup lang="ts">
import { showSuccessToast, Locale } from 'vant';
import type { CalendarDayItem } from 'vant';
import enUS from 'vant/es/locale/lang/en-US';

Locale.use('en-US', enUS);
</script>

<style lang="scss" scoped>
.header {
  position: sticky;
  inset-block-start: 0;
}
</style>
