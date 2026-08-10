<template>
  <van-tabbar active-color="#3c8ee0" inactive-color="#666" :border="false" class="tab-bar" route>
    <van-tabbar-item icon="notes-o" to="/">Workout</van-tabbar-item>
    <van-tabbar-item icon="calendar-o" to="/history">History</van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.tab-bar {
  background: var(--van-background-2);
  border-top: 1px solid var(--van-border-color);
}
</style>
