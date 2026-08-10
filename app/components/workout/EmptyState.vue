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
  padding: 32px 24px 16px;
  text-align: center;
}
</style>
