<template>
  <div class="pokemon--list">
    <div class="pokemon--list-item" v-for="pokemon in pokemons" :key="pokemon.url">
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
  <ul class="pagination">
    <li>
      <router-link :to="'/?' + this.previous">&#60;&#60; Back</router-link>
    </li>
    <li>
      <router-link :to="'/?' +  this.next">Next &#62;&#62;</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'PokemonList',
  props: ['offset', 'limit'],

  data: function () {
    return {
      pokemons: [],
      count: 0,
      next: null,
      previous: null,
      favorites: []
    }
  },

  created() {
    this.$watch(
      () => this.$route.query,
      (toParams) => {
        this.getPokemons(toParams.offset, toParams.limit)
      }
    )
  },

  mounted() {
    this.getPokemons(this.$route.query.offset, this.$route.query.limit)
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
    getPokemons: async function(offset = 0, limit = 20) {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
        const data = await response.json()
        this.pokemons = data.results.map(pokemon => {
          return {
            id: pokemon.url.split('/').at(-2),
            name: pokemon.name
          }
        })
        this.count = data.count
        this.next = data.next?.split('?').at(-1)
        this.previous = data.previous?.split('?').at(-1) || 'offset=0&limit=20'
      } catch (error) {
        console.error(error)
      }
      
    },

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
