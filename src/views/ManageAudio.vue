<template>
  <div class="container audio-management">
    <div class="row mb-5" v-if="alerts && alerts.length">
      <div class="alerts">
        <div v-bind:key="alert.msg" v-for="alert in alerts"
             v-bind:class="alert.classes">{{alert.msg}}</div>
      </div>
    </div>
    <div class="row mb-5">
      <div class="search-wrapper col-12">
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">
              <font-awesome-icon icon="search"></font-awesome-icon>
            </span>
          </div>
          <input v-model="searchString" @input="search"
                 type="text" class="search-bar form-control" placeholder="Search for audio">
        </div>
      </div>
    </div>
    <div class="row" v-if="files && files.length">
      <div class="col-md-4 col-sm-6 col-xl-4"
           v-for="file in files" v-bind:key="file.uuid">
        <div class="card file">
          <div class="card-header">{{file.name}}</div>
          <div class="card-body">
            <div class="card-text">
              <div class="tags">
                Tags: <span class="tag text-muted"
                      v-for="tag in file.tags" v-bind:key="tag">{{tag}} </span>
              </div>
            </div>
          </div>
          <div class="card-footer container-fluid">
            <div class="play footer-button btn-link">
              <font-awesome-icon icon="play" @click="openModal(file)"></font-awesome-icon>
            </div>
            <div class="preview-audio footer-button btn-link">
              Preview
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row" v-else-if="searching">
      <h2 class="text-muted">Searching for audio</h2>
    </div>
    <div class="row" v-else>
      <h2 class="text-muted">No files found...</h2>
    </div>


    <div class="modal fade server-play-modal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content" v-if="selectedFile" >
          <div class="modal-header">
            <h5 class="modal-title">Play {{selectedFile.name}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <h6 class="text-muted">Options</h6>
            <div class="container">
              <form action="#" v-on:submit.prevent>
                <div class="row">
                  <div class="form-group col-md-6">
                    <label for="count">Count:</label>
                    <input v-model="playAudioParams.count" :disabled="playAudioParams.continuous"
                           type="number" class="form-control" name="count" id="count">
                  </div>
                  <div class="col-md-6">
                    <div class="form-check form-check-inline">
                      <input v-model="playAudioParams.continuous"
                             type="checkbox" class="form-check-input"
                             name="continuous" id="continuous">
                      <label for="continuous" class="form-check-label">Continuous</label>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-danger float-left" @click="deleteFile">Delete</button>
            <button class="btn btn-primary" @click="playAudio">Play</button>
            <button class="btn btn-dark" data-dismiss="modal">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import $ from 'jquery';
import searchApi from '@/api/search';
import playApi from '@/api/play';

export default {
  name: 'ManageAudio',
  data() {
    return {
      searchString: null,
      files: [],
      searching: true,
      alerts: [],
      selectedFile: null,
      playAudioParams: {
        continuous: false,
        count: 2,
      },
    };
  },
  methods: {
    search() {
      this.alerts = [];
      this.searching = true;
      console.log(`Searching for ${this.searchString}`);
      searchApi.search(this.searchString)
        .then((res) => {
          this.searching = false;
          this.files = res.data.files;
        })
        .catch((err) => {
          this.files = [];
          this.searching = false;
          if (err.response) {
            const { data } = err.response;
            this.alerts.push({ classes: ['alert', 'alert-dange'], msg: data.msg });
          } else {
            // No response from server, probably not up
            this.alerts.push({ classes: ['alert', 'alert-dange'], msg: 'Unable to perform search...' });
          }
        });
    },
    openModal(file) {
      this.selectedFile = file;
      $('.server-play-modal').modal({ show: true, focus: true });
    },
    closeModal() {
      $('.server-play-modal').modal('hide');
    },
    playAudio() {
      let { count } = this.playAudioParams;
      if (this.playAudioParams.continuous) {
        count = -1;
      }
      playApi.play(this.selectedFile.uuid, count);
    },
    deleteFile() {
      searchApi.delete(this.selectedFile.uuid)
        .then(() => {
          this.closeModal();
          this.search();
        });
    },
  },
  created() {
    // Adding debounce to search function
    this.search = _.debounce(this.search, 500);
  },
  mounted() {
    this.search();
  },
};

</script>

<style lang="scss">
.footer-button{
  display:inline-block;
  cursor: pointer;
}
.file{
  .card-footer{
    display: flex;
    justify-content: space-between;
  }
}
</style>
