<template>
  <header>
    <div class="container w-full flex items-center">
      <div>{{ today }}</div>

      <Button
        icon="pi pi-calendar"
        aria-label="Open calendar"
        rounded
        label="Calendar"
      />
    </div>
  </header>
</template>

<script setup lang="ts">
import { Button } from 'primevue';

const today = 'Today';
</script>
