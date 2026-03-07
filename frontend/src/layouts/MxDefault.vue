<template>
  <MxHeader />
  <main>
    <!-- <MxHomePage /> -->
    <MxGroupPanel />
    <van-button
      class="add"
      icon="plus"
      type="primary"
      round
      @click="addExample"
    />
  </main>
</template>

<script setup lang="ts">
import MxGroupPanel from '@/components/MxGroupPanel.vue';
import MxHeader from '@/components/MxHeader.vue';
import { useGlobalStore } from '@/stores/global';

const globalStore = useGlobalStore();

function addExample() {
  globalStore.isShowGroupPanel = true;
}
</script>

<style scoped>
.add {
  --van-button-normal-padding: 0 10px;

  width: 44px;
  height: 44px;
  position: fixed;
  z-index: 1;
  bottom: 24px;
  right: 40px;
}
</style>
