<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import './assets/css/normalize.min.css'
export default {
  name: 'App'
}
</script>

<style>
html, body {
  width: 100%;
  height: 100%;
  /* overflow: hidden; */
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* background-color: lightblue; */
  width: 100%;
  height: 100%;
  /* overflow: hidden; */
}
</style>
