<template>
  <div class="login container">
    <div class="card bg-light login-card">
      <div class="card-body">
        <h4 class="card-title">Log in to access the announcements system</h4>
        <div v-if="alerts" class="alerts">
          <div v-bind:key="alert.msg" v-for="alert in alerts"
               v-bind:class="alert.classes">{{alert.msg}}</div>
        </div>
        <form class="card-form" action="#" v-on:submit.prevent>
          <div class="form-group">
            <label for="username">Username:</label>
            <input v-model="username" class="form-control"
                   type="text" name="username" id="username">
            <small class="form-text">Enter your username, given by the Administrator</small>
          </div>

          <div class="form-group">
            <label for="password">Password:</label>
            <input v-model="password" class="form-control"
                   type="password" name="password" id="password">
            <small class="form-text">Enter your password</small>
          </div>

          <button class="btn btn-lg btn-primary"
                  @click="login">Log in</button>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
import loginApi from '@/api/login';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      alerts: [],
    };
  },
  mounted() {
    this.alerts = [];
  },
  methods: {
    login() {
      this.alerts = [{ classes: ['alert', 'alert-info'], msg: 'Logging in...' }];

      loginApi.login(this.username, this.password).then((res) => {
        if (res.data.loggedIn) {
          this.alerts = [{ classes: ['alert', 'alert-success'], msg: 'Logged in!' }];
          console.log('Success response from auth, committing login');
          this.$store.commit('login', res.data);
          this.$router.push('/');
        }
      }).catch((err) => {
        this.alerts = [];
        console.log('Error logging in');
        console.log(err);

        if (err.response && err.response.data.msg) {
          // Server is up, but login didn't succeed
          this.alerts.push({ classes: ['alert', 'alert-danger'], msg: err.response.data.msg });
        } else {
          // Server is down
          console.error('Cannot contact api server');
          this.alerts.push({ classes: ['alert', 'alert-danger'], msg: 'Cannot contact server' });
        }
      });
    },
  },
};
</script>
