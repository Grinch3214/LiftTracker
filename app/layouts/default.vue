<template>
  <div>
    header
    <van-button type="primary" @click="showToast('toast')">button</van-button>
    <VanButton type="success" @click="showNotify('notify')">button</VanButton>
    <LazyVanButton type="default">lazy button</LazyVanButton>
    <slot />
    <p>
      footer
      <span v-for="(item, index) in workoutStore.workouts" :key="index">{{
        item
      }}</span>
    </p>

    <div>
      <p>Saved value: {{ note }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStorage } from '@vueuse/core';

const workoutStore = useWorkoutStore();

const note = useStorage('my-note', 'Hello!');
</script>
