<template>
  <van-action-sheet
    v-model:show="globalStore.showGroupPanel"
    title="Title"
    class="group-panel"
  >
    <div class="content">Content</div>
  </van-action-sheet>
</template>

<script setup lang="ts">
import { useGlobalStore } from '@/stores/global';

const globalStore = useGlobalStore();
</script>

<style>
.group-panel {
  /* --van-action-sheet-max-height: 100%;
  --van-popup-round-radius: 0; */

  height: 100%;
}
</style>
