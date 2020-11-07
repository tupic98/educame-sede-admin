/* eslint-disable */
import Vue from 'vue';
// @ts-ignore
import vClickOutside from 'v-click-outside';
import es, { messages } from 'vee-validate/dist/locale/es.json';
import {
  ValidationProvider,
  ValidationObserver,
  localize,
  extend,
} from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import router from '@/router';
import Snotify, { SnotifyPosition } from 'vue-snotify';
import App from './App.vue';
import store from './store';
import '@/bootstrap';

import './assets/scss/tailwind.scss';

Vue.use(vClickOutside);

/* <editor-fold desc="Snotify"> */
const options = {
  toast: {
    position: SnotifyPosition.rightTop,
  },
};

Vue.use(Snotify, options);
/* </editor-fold> */

/* <editor-fold desc="Vee Validate"> */
Object.keys(rules).forEach((rule: string) => {
  extend(rule, (rules as any)[rule]);
  extend(rule, {
    ...(rules as any)[rule],
    message: (messages as any)[rule],
  });
});
localize('es', es);
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
/* </editor-fold> */

const localStore = require('store');

Vue.prototype.$localStore = localStore;
declare module 'vue/types/vue' {
  interface Vue {
    $localStore: typeof localStore;
  }
}

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
