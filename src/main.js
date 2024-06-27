import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import './plugins';
import store from './store';
// import { sync } from 'vuex-router-sync'
import i18n from '@/translations';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import commonMixin from '@/mixins/common';
import toolMixin from '@/mixins/tool';
import EventBus from './plugins/event-bus';
import VueI18n from 'vue-i18n';
// import VeeValidate from 'vee-validate';
import VueApexCharts from 'vue-apexcharts';
// import { VueRecaptcha } from 'vue-recaptcha';
// import VueSignaturePad from 'vue-signature-pad';

// Vue.use(VueSignaturePad);



Vue.use(VueApexCharts);

Vue.component('apexchart', VueApexCharts);

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

Vue.config.productionTip = false;

Vue.use(EventBus);
Vue.mixin(commonMixin);
Vue.mixin(toolMixin);

// sync(store, router)

new Vue({
  router,
  vuetify,
  store,
  i18n,
  VueApexCharts,
  render: h => h(App),
}).$mount('#app');

//i18n.global.locale.value = 'en_US';

// i18n.locale = 'en_US';
