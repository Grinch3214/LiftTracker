<template>
  <NuxtRouteAnnouncer />

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { Locale } from 'vant';
import enUS from 'vant/es/locale/lang/en-US';
import ruRU from 'vant/es/locale/lang/ru-RU';

useHead({
  title: 'LiftTracker',
  meta: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0',
    },
  ],
});

const { locale } = useI18n();

watch(
  locale,
  (value) => {
    if (value === 'ru') {
      Locale.use('ru-RU', ruRU);
    } else {
      Locale.use('en-US', enUS);
    }
  },
  { immediate: true },
);
</script>
