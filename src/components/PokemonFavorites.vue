<template>
  <div>
    <div class="pokemon--list">
      <div class="pokemon--list-item" v-for="pokemon in favorites" :key="pokemon.url">
        <h3>
          <router-link :to="'/pokemon/' + pokemon.id">{{ pokemon.name }}</router-link>
        </h3>
        <img
          class="pokemon--list-img"
          :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + pokemon.id + '.png'" :alt="pokemon.url"
        >
        <button @click="addFavorite(pokemon)" v-if="!favorites[pokemon.id]">🤍</button>
        <button @click="removeFavorite(pokemon)" v-if="favorites[pokemon.id]">❤️</button>
      </div>
    </div>
    <h3 v-if="Object.keys(favorites).length === 0" class="empty--list">You don't have favorites yet</h3>
  </div>
</template>

<script>
export default {
  name: 'PokemonList',

  data: function () {
    return {
      favorites: [],
      user: null,
    }
  },


  mounted() {
    try {
      this.user = JSON.parse(localStorage.getItem('user'))
      this.favorites = JSON.parse(localStorage.getItem(this.user.email))
      if (!this.favorites) {
        this.favorites = {}
      }
    } catch (error) {
      this.favorites = {}
    }
  },

  methods: {
    addFavorite: async function(pokemon) {
      try {
        this.favorites[pokemon.id] = pokemon
        localStorage.setItem(this.user.email, JSON.stringify(this.favorites))
      } catch (error) {
        console.error(error)
      }
    },

    removeFavorite: async function(pokemon) {
      try {
        delete this.favorites[pokemon.id]
        localStorage.setItem(this.user.email, JSON.stringify(this.favorites))
        console.log(this.favorites)
      } catch (error) {
        console.error(error)
      }
    },
  }
}
</script>

<style scoped>
  .pokemon--list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 10px;
  }

  .pokemon--list-item {
    display: flex;
    flex-direction: column;
    background: rgb(241, 241, 241);
  }

  .pokemon--list-img {
    margin: auto;
  }

  h3 {
    margin: 10px 0 0;
    font-size: 15px;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  .empty--list {
    width: 100%;
    text-align: center;
  }
</style>
