<template>
  <MxHeader />
  <main>
    <!-- <MxHomePage /> -->
    <MxListWorkoutDay />
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
import { onMounted } from 'vue';
import MxGroupPanel from '@/components/MxGroupPanel.vue';
import MxHeader from '@/components/MxHeader.vue';
import MxListWorkoutDay from '@/components/MxListWorkoutDay.vue';
import { useGlobalStore } from '@/stores/global';
import { useCalendarStore } from '@/stores/calendar';

const globalStore = useGlobalStore();
const calendarStore = useCalendarStore();

function addExample() {
  globalStore.isShowGroupPanel = true;
}

onMounted(() => {
  if (!calendarStore.selectedDate) {
    calendarStore.selectedDate = new Date();

    console.log(calendarStore.selectedDate);
  }
});
</script>

<style scoped>
.add {
  --van-button-normal-padding: 0 10px;

  width: 44px;
  height: 44px;
  position: fixed;
  z-index: 1;
  bottom: 24px;
  right: 30px;
}
</style>
