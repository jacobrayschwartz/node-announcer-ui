<template>
  <div id="app">
    <navbar/>
    <router-view class="router container pt-5"/>
    <mini-audio-controller id="miniAudioController" v-if="loggedIn"/>
  </div>
</template>

<script>
import miniAudioController from '@/components/audioControl/miniController.vue';
import Navbar from '@/components/nav/navbar.vue';

export default {
  name: 'app',
  components: { Navbar, miniAudioController },
  computed: {
    loggedIn() {
      return this.$store.state.isLoggedIn;
    },
  },
  methods: {
    toggleLogin() {
      this.$store.commit('toggleLogin');
    },
  },
};
</script>

<style lang="scss">
#app {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .router{
    flex-grow: 1;
  }

  #miniAudioController {
    align-self: flex-end;
    justify-self: end;
  }
}
</style>
