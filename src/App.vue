<template>
  <router-view></router-view>
</template>

<script>

export default {
  name: 'App',

  created() {
    this.$watch(
      () => this.$route.name,
      () => {
        try {
          const user = JSON.parse(localStorage.getItem('user'))
          if (!user.isLoggedIn) {
            this.$router.push('/login')
          }
          if (user.isLoggedIn && this.$route.name === 'Login') {
            this.$router.push('/')
          }
        } catch (error) {
          this.$router.push('/login')
        }
      }
    )
  },
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
