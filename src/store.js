/* eslint-disable no-param-reassign */
import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    token: null,
    username: null,
    expires: null,
    isLoggedIn: false,
    apiBaseAddress: process.env.VUE_APP_API_SERVER,
  },
  mutations: {
    login(state, loginInfo) {
      if (!loginInfo || !loginInfo.token || !loginInfo.loggedIn) {
        console.error('Attempted login mutation with bad loginInfo');
        console.error(loginInfo);
        state.isLoggedIn = false;
        return;
      }

      state.token = loginInfo.token;
      state.username = loginInfo.username;

      if (loginInfo.localStorageExpires) {
        console.log('Getting expires from local');
        state.expires = loginInfo.localStorageExpires;
      } else {
        // Calculate time of day token expires, based on diff between iat and exp for timezone diff
        state.expires = new Date(Date.now() + (loginInfo.exp - loginInfo.iat) * 1000);
        state.isLoggedIn = true;
        Vue.localStorage.set('expires', state.expires.getTime());
      }
      Vue.localStorage.set('token', state.token);
      Vue.localStorage.set('username', state.username);
      state.isLoggedIn = true;
    },
    logout(state) {
      console.log('Logging out');
      state.isLoggedIn = false;
      state.token = null;
      state.username = null;
      state.expires = null;
      Vue.localStorage.set('token', null);
      Vue.localStorage.set('username', null);
      Vue.localStorage.set('expires', null);
    },
  },
});

export default store;
