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
import VTooltip from 'v-tooltip'
// @ts-ignore
import Paginate from 'vuejs-paginate'
// @ts-ignore
import VueTheMask from 'vue-the-mask'

import './assets/scss/tailwind.scss';

Vue.use(VTooltip)
Vue.use(vClickOutside);
Vue.component('paginate', Paginate)
Vue.use(VueTheMask)

/* <editor-fold desc="Snotify"> */
const options = {
  showProgressBar: false,
  toast: {
    position: SnotifyPosition.rightTop,
    showProgressBar: false,
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

Vue.filter('moneyFormat', (value: any) => {
  if (value) {
    let number;
    if (typeof value === 'string') {
      number = parseFloat(value.replace(',', ''));
    } else {
      number = parseFloat(value.toString().replace(',', ''));
    }
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number);
  }
  return '$ 0.00';
});

Vue.filter('formatShippingCost', (value: any) => {
  if (value) { return `$${value}` }
});

Vue.filter('capitalize', (string: string) => {
  if (string) { return `${string[0].toUpperCase()}${string.slice(1)}` };
  return '';
});

Vue.filter('truncate', (string: any, length = 50) => {
  if (!string || typeof string !== 'string') { return '' }
  if (string.length <= length) { return string }
  return string.substring(0, length) + '...';
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
