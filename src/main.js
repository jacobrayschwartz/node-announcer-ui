import Vue from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import VueLocalStorage from 'vue-localstorage';
import axios from 'axios';
import _ from 'lodash';
import App from './App.vue';
import router from './router';
import store from './store';
import faIcons from './misc/faIcons';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

Vue.use(VueLocalStorage);

Object.defineProperty(Vue.prototype, '$_', { value: _ });

axios.defaults.baseURL = process.env.VUE_APP_API_SERVER;
library.add(faIcons);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = false;

const token = Vue.localStorage.get('token');
console.log(`LOADING TOKEN: ${token}`);
if (token) {
  store.commit('login', { token, loggedIn: true });
}

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
