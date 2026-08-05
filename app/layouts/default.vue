<template>
  <van-config-provider theme="dark" class="default-layout">
    <TheHeader />
    <main>
      <slot />
    </main>
    <TheFooter />
  </van-config-provider>
</template>

<script setup lang="ts">
// as test, remove after
import { useStorage } from '@vueuse/core';

const note = useStorage('my-note', 'Hello!');
</script>

<style scoped lang="scss">
.default-layout {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100dvh;
}
</style>
