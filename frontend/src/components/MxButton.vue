<template>
  <van-button
    :icon="icon"
    :type="type"
    :size="size"
    :plain="plain"
    :block="block"
    :round="round"
    :disabled="disabled"
    @click="emit('click')"
  >{{ text }}</van-button>
</template>

<script setup lang="ts">
import type { ButtonType, ButtonSize } from 'vant/es';

withDefaults(
  defineProps<{
    text?: string;
    icon?: string;
    type?: ButtonType;
    size?: ButtonSize;
    plain?: boolean;
    block?: boolean;
    round?: boolean;
    disabled?: boolean;
  }>(),
  {
    type: 'default',
    size: 'normal',
  },
);

const emit = defineEmits(['click']);
</script>