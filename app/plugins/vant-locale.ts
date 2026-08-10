import { Locale } from 'vant';
import enUS from 'vant/es/locale/lang/en-US';

export default defineNuxtPlugin(() => {
  Locale.use('en-US', enUS);
});
