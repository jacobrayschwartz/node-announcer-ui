/* eslint-disable no-param-reassign */
import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    token: null,
    username: null,
    expires: null,
    isLoggedIn: true,
    apiBaseAddress: process.env.VUE_APP_API_SERVER,
  },
  mutations: {
    toggleLogin(state) {
      state.isLoggedIn = !state.isLoggedIn;
    },
  },
});

export default store;
