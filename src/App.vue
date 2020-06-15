<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-link to="/tree">Tree</router-link>
    <router-link to="/h1">HelloWorld1</router-link>
    <router-link to="/honey">Honey</router-link>
    <router-link to="/">Root</router-link>
    <hr>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
