<template>
  <div class="container-fluid mini-controller-wrapper pl-0 pr-0">
    <div class="nav navbar navbar-expand bg-light navbar-light ">
      <ul class="navbar-nav">
        <li class="nav-item navbar-brand">Control</li>
        <li class="nav-item" @click="resume">
          <a class="nav-link" href="#" >
            <font-awesome-icon icon="play"></font-awesome-icon> Resume
          </a>
        </li>
        <li class="nav-item" @click="pause">
          <a class="nav-link" href="#">
            <font-awesome-icon icon="pause"></font-awesome-icon> Pause
          </a>
        </li>
        <li class="nav-item" @click="stop">
          <a class="nav-link" href="#">
            <font-awesome-icon icon="stop"></font-awesome-icon> Stop
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import playApi from '@/api/play';

export default {
  name: 'miniAudioController',
  methods: {
    stop() {
      playApi.stop();
    },
    pause() {
      playApi.pause();
    },
    resume() {
      playApi.resume();
    },
  },
};
</script>


<style lang="scss">
.mini-controller-wrapper {
  width: 100%;
}
</style>
