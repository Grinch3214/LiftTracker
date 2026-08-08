<template>
  <div class="container empty-state">
    <van-empty :image="noDataImg" description="No workouts logged yet" />
  </div>
</template>

<script lang="ts" setup>
import noDataImg from '@/assets/images/no-data.svg';
// today I cant coding :(
</script>

<style scoped lang="scss">
.empty-state {
  height: 100%;
  display: flex;
  justify-content: center;
}
</style>
