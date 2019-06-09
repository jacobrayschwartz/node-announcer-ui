<template>
  <div class="container-fluid mini-controller-wrapper pl-0 pr-0">
    <div class="nav navbar navbar-expand bg-light navbar-light ">
      <ul class="navbar-nav">
        <li class="nav-item navbar-brand">Now Playing...</li>
        <li class="nav-item"><a class="nav-link" href="#">
          <font-awesome-icon icon="play"></font-awesome-icon> Play</a>
        </li>
        <li class="nav-item"><a class="nav-link" href="#">Pause</a></li>
        <li class="nav-item"><a class="nav-link" href="#">Stop</a></li>
      </ul>
    </div>
  </div>
</template>

<script>


export default {
  name: 'miniAudioController',
};
</script>


<style lang="scss">
.mini-controller-wrapper {
  width: 100%;

}
</style>
