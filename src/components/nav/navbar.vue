<template>
  <div class="container-fluid pl-0 pr-0">
    <div class="nav navbar navbar-expand bg-light navbar-light">
      <ul class="navbar-nav">
        <li><router-link v-if="isLoggedIn" class="nav-link nav-item" to="/">Home</router-link></li>
        <li><router-link v-if="!isLoggedIn"
             class="nav-link nav-item" to="/login">Login</router-link></li>
        <li><a @click="logout" v-if="isLoggedIn"
               class="nav-link nav-item" to="/login" href="#">Logout</a></li>
      </ul>
    </div>

  </div>
</template>

<script>
export default {
  name: 'navbar',
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
  },
  methods: {
    logout() {
      this.$store.commit('logout');
      this.$router.push('login');
    },
  },
};
</script>

<style lang="scss">

</style>
