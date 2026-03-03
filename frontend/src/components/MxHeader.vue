<template>
  <header class="py-3">
    <div class="container">
      <div class="flex items-center">
        <div>{{ calendarStore.date }}</div>

        <Button
          icon="pi pi-calendar"
          aria-label="Open calendar"
          rounded
          label="Calendar"
          class="ml-auto"
        />
      </div>
      <div class="text-center mt-5"></div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useCalendarStore } from '@/stores/calendar';

const calendarStore = useCalendarStore();
</script>
