<template>
  <div class="upload-audio container">
    <div class="card bg-light upload-card">
      <div class="card-header">Upload an audio file</div>
      <div class="card-body">
        <div class="card-title">Select an audio file to upload</div>

        <div class="alerts" v-if="alerts && alerts.length">
          <div v-bind:key="alert.msg" v-for="alert in alerts"
               v-bind:class="alert.classes">{{alert.msg}}</div>
        </div>

        <form action="#" v-on:submit.prevent>
          <div class="form-group">
            <label for="file">Audio file:</label>
            <input type="file" name="file" id="file"
                   class="form-control-file" @change="fileChanged">
            <small class="form-text">Select an audio file to upload</small>
          </div>

          <div class="form-group">
            <label for="file">Name:</label>
            <input type="text" name="name" id="name" v-model="name"
                   class="form-control">
            <small class="form-text">Name of the file</small>
          </div>

          <div class="form-group">
            <label for="tags">Tags:</label>
            <input type="text" name="tags" id="tags" v-model="tags"
                   class="form-control">
            <small class="form-text">Add any tags for the file, separated by spaces</small>
          </div>

          <button class="btn btn-primary upload-button" @click="submit">Upload</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/upload';

export default {
  name: 'UploadAudio',
  data() {
    return {
      file: null,
      tags: null,
      name: null,
      alerts: [],
    };
  },
  methods: {
    fileChanged(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }

      console.log(files[0]);
      // eslint-disable-next-line prefer-destructuring
      this.file = files[0];

      this.name = this.file.name.substr(0, this.file.name.indexOf('.'));
    },
    submit() {
      this.alerts = [];
      const tags = this.tags.split(' ');
      api.upload(this.file, this.name, tags)
        .then((res) => {
          if (res.data.err) {
            this.alerts.push({ classes: ['alert', 'alert-danger'], msg: res.data.msg });
          } else {
            this.alerts.push({ classes: ['alert', 'alert-success'], msg: res.data.msg });
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.response && err.response.data.msg) {
            // Server is up, but upload didn't succeed
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

<style lang="scss">
.upload-card{
  width:100%;
}
</style>
