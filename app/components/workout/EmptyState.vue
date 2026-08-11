<template>
  <div class="empty-state">
    <van-empty :image="noDataImg" description="No workout for this day" />
  </div>
</template>

<script setup lang="ts">
import noDataImg from '@/assets/images/no-data.svg';
</script>

<style scoped lang="scss">
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-block: auto;
  padding-block-end: var(--van-tabbar-height);
  text-align: center;
}
</style>
