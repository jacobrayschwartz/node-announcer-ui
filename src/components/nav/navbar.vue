<template>
  <div class="container-fluid pl-0 pr-0">
    <div class="nav navbar navbar-expand bg-light navbar-light">
      <ul class="navbar-nav">
        <li><router-link class="nav-link nav-item" to="/">Home</router-link></li>
        <li><router-link class="nav-link nav-item" to="/about">About</router-link></li>
        <li><router-link class="nav-link nav-item" to="/login">Login</router-link></li>
      </ul>
    </div>

  </div>
</template>

<script>
export default {
  name: 'navbar',
};
</script>

<style lang="scss">

</style>
