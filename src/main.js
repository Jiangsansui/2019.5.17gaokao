import Vue from 'vue';

import App from './App.vue'
import router from './router'
import store from './store'
import ELEMENT from 'element-ui';
import JsonExcel from 'vue-json-excel'

// import NavMenu from '@/components/NavMenu.vue'
import axios from 'axios'

Vue.component('downloadExcel', JsonExcel);
Vue.config.productionTip = false
// Vue.use(NavMenu)
Vue.use(ELEMENT);

window.APP=new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
