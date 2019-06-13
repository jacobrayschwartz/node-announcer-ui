<template>
  <div class="login container">
    <div class="card bg-light login-card">
      <div class="card-body">
        <h4 class="card-title">Log in to access the announcements system</h4>
        <form class="card-form" action="#">
          <div class="form-group">
            <label for="username">Username:</label>
            <input class="form-control" type="text" name="username" id="username">
            <small class="form-text">Enter your username, given by the Administrator</small>
          </div>

          <div class="form-group">
            <label for="password">Password:</label>
            <input class="form-control" type="password" name="password" id="password">
            <small class="form-text">Enter your password</small>
          </div>

          <button class="btn btn-lg btn-primary" @click="login">Log in</button>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'Login',
  methods: {
    login() {
      // doing nothing for the moment
    },
  },
};
</script>
