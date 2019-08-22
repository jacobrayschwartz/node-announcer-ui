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
const expires = Vue.localStorage.get('expires');
const username = Vue.localStorage.get('username');

console.log(token);
console.log(expires);
console.log(username);
console.log(Date.now());

if (token && expires && username) {
  if (expires > Date.now()) {
    store.commit('login', {
      token, loggedIn: true, localStorageExpires: expires, username,
    });
  }
}

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
