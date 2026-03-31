<template>
  <van-action-sheet
    v-model:show="globalStore.isShowGroupPanel"
    :title="selectedGroup ? selectedGroup.name : 'Muscle Groups'"
    class="group-panel"
    @closed="selectedGroup = null"
  >
    <div class="content">
      <div class="content-subhead">
        <div
          v-if="selectedGroup"
          class="back-btn"
          @click="selectedGroup = null"
        >
          Back
        </div>
      </div>

      <van-list v-if="!selectedGroup">
        <van-cell
          v-for="group in muscleGroups"
          :key="group.id"
          :title="`${group.icon} ${group.name}`"
          is-link
          @click="selectedGroup = group"
        />
      </van-list>

      <van-list v-else>
        <van-cell
          v-for="exercise in selectedGroup.exercises"
          :key="exercise.id"
          :title="exercise.name"
          :label="equipmentLabels[exercise.equipment]"
        />
      </van-list>
    </div>
  </van-action-sheet>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useGlobalStore } from '@/stores/global';
import { muscleGroups, equipmentLabels, type MuscleGroup } from '../mockdata';

const globalStore = useGlobalStore();
const selectedGroup = ref<MuscleGroup | null>(null);
</script>

<style>
.group-panel {
  height: 100%;
}

.content-subhead {
  display: flex;
  justify-content: flex-end;
}

.back-btn {
  padding: 12px 16px;
  cursor: pointer;
  color: var(--van-primary-color);
  font-size: 14px;
}
</style>
