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

      // Calculate time of day token expires, based on diff bewteen iat and exp for timezone diff
      console.log(loginInfo);
      state.expires = new Date(Date.now() + (loginInfo.exp - loginInfo.iat));
      state.isLoggedIn = true;
    },
    logout(state) {
      console.log('Logging out');
      state.isLoggedIn = false;
      state.token = null;
      state.username = null;
      state.expires = null;
    },
  },
});

export default store;
