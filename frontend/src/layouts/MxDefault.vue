<template>
  <div class="app-layout">
    <MxHeader />

    <main class="main-content">
      <MxWorkoutPage v-if="globalStore.activeTab === 'workout'" />
      <MxHistoryPage v-else-if="globalStore.activeTab === 'history'" />
      <MxTemplatesPage v-else-if="globalStore.activeTab === 'templates'" />
      <MxProgressPage v-else-if="globalStore.activeTab === 'progress'" />
    </main>

    <MxTabBar />
    <MxGroupPanel />
    <MxAddSetSheet />

    <MxButton
      v-if="globalStore.activeTab === 'workout'"
      type="primary"
      icon="plus"
      is-round
      class="fab-add"
      @click="globalStore.isShowGroupPanel = true"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useGlobalStore } from '@/stores/global';
import { useCalendarStore } from '@/stores/calendar';
import MxHeader from '@/components/MxHeader.vue';
import MxGroupPanel from '@/components/MxGroupPanel.vue';
import MxTabBar from '@/components/MxTabBar.vue';
import MxAddSetSheet from '@/components/MxAddSetSheet.vue';
import MxButton from '@/components/MxButton.vue';
import MxWorkoutPage from '@/pages/MxWorkoutPage.vue';
import MxHistoryPage from '@/pages/MxHistoryPage.vue';
import MxTemplatesPage from '@/pages/MxTemplatesPage.vue';
import MxProgressPage from '@/pages/MxProgressPage.vue';

const globalStore = useGlobalStore();
const calendarStore = useCalendarStore();

onMounted(() => {
  if (!calendarStore.selectedDate) {
    calendarStore.selectedDate = new Date();
  }
});
</script>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  height: 100dvh;
  overflow: hidden;
}

.main-content {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.fab-add {
  --van-button-normal-padding: 0 10px;

  width: 48px;
  height: 48px;
  position: fixed;
  z-index: 10;
  bottom: 68px;
  right: 24px;
  box-shadow: 0 4px 16px rgba(60, 142, 224, 0.4);
}
</style>