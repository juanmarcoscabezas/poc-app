<template>
  <form action="POST" @submit="formSubmit">
    <h3>Wlcome to PokeAPI</h3>
    <input type="email" name="email" id="email" placeholder="Email" required autocomplete="on">
    <input type="password" name="password" id="password" placeholder="Password" required autocomplete="on"
      pattern="(?=.*\d)(?=.*[\W_]).{8,}"
      title="Minimum 8 characters. Should contain at least one special character and one number.">
    <button type="submit">Submit</button>
  </form>
</template>

<script>
export default {
  name: 'LoginForm',

  methods: {
    formSubmit: function(e) {
      e.preventDefault()
      try {
        localStorage.setItem('user', JSON.stringify({email: e.target.email.value, isLoggedIn: true}))
        this.$router.push('/')
      } catch (error) {
        localStorage.setItem('user', JSON.stringify({email: null, isLoggedIn: false}))
      }
    },
  }
}
</script>

<style scoped>
  form {
    display: flex;
    flex-direction: column;
    max-width: 400px;
    margin: 100px auto;
  }
  input {
    margin: 10px 0;
    height: 20px;
  }
  button {
    margin: 10px 0;
    height: 25px;
    cursor: pointer;
  }
  
</style>
