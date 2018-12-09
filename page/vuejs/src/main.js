import Vue from 'vue'
import './plugins/axios'
import VeeValidate from 'vee-validate';

import App from './App.vue'
import { router } from './router'
import { store } from './_store/store'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import 'vue-material/dist/theme/default.css'

Vue.config.productionTip = false

Vue.use(VueMaterial);
Vue.use(VeeValidate);

// setup fake backend
// import { configureFakeBackend } from './_helpers/fake-backend';
// configureFakeBackend();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
