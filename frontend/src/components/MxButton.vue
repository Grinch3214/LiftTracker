<template>
  <van-button
    :icon="icon"
    :type="type"
    :round="isRound"
    @click="emit('click')"
  />
</template>

<script setup lang="ts">
import { type ButtonType } from 'vant/es';

const props = defineProps<{
  icon?: string;
  type: ButtonType;
  isRound?: boolean;
}>();
const emit = defineEmits(['click']);
</script>
