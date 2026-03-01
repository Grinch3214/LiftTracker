import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';

import { MyPreset } from './theme/preset';
import './assets/main.css';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: MyPreset,
    options: {
      prefix: 'mx',
      darkModeSelector: 'system',
    },
  },
});
app.use(createPinia());
app.use(router);

app.mount('#app');
