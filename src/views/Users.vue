<template>
  <div class="container users">
    <div class="row mb-5" v-if="alerts && alerts.length">
      <div class="alerts">
        <div v-bind:key="alert.msg" v-for="alert in alerts"
             v-bind:class="alert.classes">{{alert.msg}}</div>
      </div>
    </div>

    <div class="row mb-5">
      <button class="btn btn-primary btn-lg add-user-button">
        Add User
      </button>
    </div>

    <div class="row">
      <div class="col-md-4 col-sm-6 col-xl-4"
           v-for="user in users" v-bind:key="user.username">
        <div class="card">
          <div class="card-header">
            {{user.username}}<strong v-if="isCurrentUser(user.username)"> (current)</strong>
          </div>
          <div class="card-body">
            <div>
              <dl>
                <dt>Last Login:</dt>
                <dd>{{formatDateTime(user.lastLogin)}}</dd>
                <dt>From:</dt>
                <dd>{{user.from}}</dd>
              </dl>
            </div>
            <div class="mt-3">
              <button class="btn btn-danger delete-user-button"
                      v-bind:disabled="isCurrentUser(user.username)">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userApi from '@/api/users';

export default {
  name: 'Users',
  data() {
    return {
      alerts: [],
      users: [],
    };
  },
  methods: {
    updateUsers() {
      this.alerts = [];
      userApi.getAll()
        .then((res) => {
          this.users = res.data;
          console.log(this.users);
        })
        .catch((err) => {
          if (err.response && err.response.msg) {
            const { data } = err.response;
            this.alerts.push({ classes: ['alert', 'alert-danger'], msg: data.msg });
          } else {
            // No response from server, probably not up
            this.alerts.push({ classes: ['alert', 'alert-danger'], msg: 'Unable get users...' });
          }
        });
    },
    formatDateTime(time){
      const dateTime = new Date(time);
      return `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`;
    },
    isCurrentUser(username) {
      return this.$store.state.username === username;
    },
  },
  mounted() {
    this.updateUsers();
  },
};
</script>

<style lang="scss">
.add-user-button {
  width: 100%;
}
.delete-user-button{
  width: 100%;
}
.alert{
  width: 100%;
}
</style>
