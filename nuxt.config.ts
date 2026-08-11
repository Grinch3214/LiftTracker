// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  ssr: false,
  modules: ['@pinia/nuxt', '@vant/nuxt', '@vueuse/nuxt', '@nuxtjs/i18n'],
  css: ['~/assets/scss/main.scss'],
  i18n: {
    locales: [
      { code: 'en', file: 'en.json' },
      { code: 'ru', file: 'ru.json' },
    ],
    defaultLocale: 'en',
    langDir: 'locales/',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'lift-tracker-locale',
      alwaysRedirect: false,
    },
  },
});