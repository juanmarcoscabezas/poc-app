<template>
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
</template>

<script>
export default {
  name: 'PokemonList',

  data: function () {
    return {
      favorites: []
    }
  },


  mounted() {
    try {
      this.favorites = JSON.parse(localStorage.getItem('favorites'))
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
        localStorage.setItem('favorites', JSON.stringify(this.favorites))
      } catch (error) {
        console.error(error)
      }
    },

    removeFavorite: async function(pokemon) {
      try {
        delete this.favorites[pokemon.id]
        localStorage.setItem('favorites', JSON.stringify(this.favorites))
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

  .pagination {
    margin: 50px 0;
  }
</style>
