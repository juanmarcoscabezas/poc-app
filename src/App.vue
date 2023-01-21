<template>
  <Nav></Nav>
  <router-view></router-view>
</template>

<script>
import Nav from './components/Nav.vue'

export default {
  name: 'App',
  components: {
    Nav
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 1000px;
  margin: 20px auto 0 auto;
}
</style>
