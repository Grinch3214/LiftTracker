<template>
  <van-config-provider theme="dark" class="default-layout">
    <TheHeader />
    <main>
      <slot />
    </main>
    <!-- <TheFooter /> -->

    <van-button type="primary" icon="plus" class="add-day" />
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
  grid-template-rows: auto 1fr;
  min-height: 100vh;
  min-height: 100dvh;
  background-color: var(--lt-main-bg-color);
  color: var(--lt-main-color);
}
.add-day {
  --van-button-normal-padding: 0 10px;

  width: 48px;
  height: 48px;
  position: fixed;
  z-index: 10;
  bottom: 48px;
  right: 24px;
  box-shadow: 0 4px 16px rgba(60, 142, 224, 0.4);
}
</style>
