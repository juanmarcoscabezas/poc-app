<template>
  <ul>
    <li>
      <router-link to="/">Home</router-link>
    </li>
    <li>
      <router-link to="/favorites">Favorites</router-link>
    </li>
    <li v-if="email">
      Hi, {{ email.split('@')[0] }}
    </li>
    <button @click="logOut">Log Out</button>
  </ul>
</template>

<script>
export default {
  name: 'Nav',

  data: function () {
    return {
      email: null
    }
  },

  mounted() {
    this.getEmail()
  },

  methods: {
    getEmail: function() {
      try {
        const user = JSON.parse(localStorage.getItem('user'))
        this.email = user.email
      } catch (error) {
        this.email = ''
      }
    },
    logOut: function() {
      try {
        localStorage.setItem('user', JSON.stringify({email: null, isLoggedIn: false}))
        this.$router.push('/login')
      } catch (error) {
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style scoped>
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
    font-size: 16px;
  }
  a {
    color: #42b983;
  }
  button {
    cursor: pointer;
  }
</style>
