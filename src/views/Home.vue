<template>
  <div class="home">
    <h1>Welcome to the SLBC announcement system</h1>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  components: {
  },
  computed: {
    count() {
      return this.$store.state.counter;
    },
    server() {
      return this.$store.state.apiBaseAddress;
    },
  },
  methods: {
    increment() {
      this.$store.commit('increment');
    },
  },
};
</script>

<style lang="scss">

</style>
