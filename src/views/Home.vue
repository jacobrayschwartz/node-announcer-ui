<template>
  <div class="home">
    <h1>Welcome to the SLBC announcement system</h1>
    <h3>Please make a selection</h3>
    <div class="main-links container-fluid">
      <div @click="routeTo('play')"
        class="card play-audio-card link-card bg-primary text-white">
        <div class="card-body">
          <h4 class="card-title">Play Audio</h4>
          <div class="card-text">Play audio over PA system</div>
        </div>
      </div>

      <div @click="routeTo('upload')"
           class="card upload-audio-card link-card bg-primary text-white">
        <div class="card-body">
          <h4 class="card-title">Upload Audio</h4>
          <div class="card-text">Add audio file to system</div>
        </div>
      </div>

      <div @click="routeTo('users')"
        class="card user-management-card link-card bg-primary text-white">
        <div class="card-body">
          <h4 class="card-title">Manage users</h4>
          <div class="card-text">Add or delete users with access to this system</div>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  components: {
  },
  computed: {
  },
  methods: {
    increment() {
      this.$store.commit('increment');
    },
    routeTo(path) {
      console.log(`Route to ${path}`);
      this.$router.push(path);
    },
  },
};
</script>

<style lang="scss">
.main-links {
}

.link-card{
  margin: 5px;
  width: 100%;
  cursor: pointer;
}
</style>
