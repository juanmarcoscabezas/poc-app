<template>
  <div>
    <div class="pokemon--list">
      <div class="pokemon--list-item" v-for="pokemon in pokemons" :key="pokemon.url">
        <h3>
          <router-link :to="'/pokemon/' + pokemon.id">{{ pokemon.name }}</router-link>
        </h3>
        <img
          v-if="!loading"
          class="pokemon--list-img"
          :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + pokemon.id + '.png'" 
          @error="replaceImg"
        >
        <img
          v-if="loading"
          class="pokemon--list-img empty--img"
          :src="placeholderImg" :alt="pokemon.url"
        >
        <button @click="addFavorite(pokemon)" v-if="!favorites[pokemon.id]">🤍</button>
        <button @click="removeFavorite(pokemon)" v-if="favorites[pokemon.id]">❤️</button>
      </div>
    </div>
    <ul v-if="pokemons.length" class="pagination">
      <li v-if="previous">
        <router-link :to="'/?' + this.previous">&#60;&#60; Back</router-link>
      </li>
      <li>Page: {{ Math.round($route.query.offset / 20) + 1 || 1}} of {{ Math.round(count / 20) }}</li>
      <li v-if="next">
        <router-link :to="'/?' +  this.next">Next &#62;&#62;</router-link>
      </li>
    </ul>
  </div>
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
      favorites: [],
      user: null,
      loading: false,
      placeholderImg: 'https://i.pinimg.com/originals/95/d5/cd/95d5cded00f3a3e8a98fb1eed568aa9f.png'
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
    getPokemons: async function(offset = 0, limit = 20) {
      try {
        this.loading = true
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
        const data = await response.json()
        this.pokemons = data.results.map(pokemon => {
          return {
            id: pokemon.url.split('/').at(-2),
            name: pokemon.name
          }
        })
        this.count = data.count
        this.next = data.next?.split('?').at(-1) || null
        this.previous = data.previous?.split('?').at(-1) || null
        this.loading = false        
      } catch (error) {
        console.error(error)
        this.loading = false
      }
    },

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
      } catch (error) {
        console.error(error)
      }
    },

    replaceImg(e) {
      e.target.src = this.placeholderImg
    }
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
    margin: 5px auto;
    width: 96px;
    height: 96px;
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

  .pagination {
    margin: 50px 0;
  }

  .empty--list {
    margin: 20px 0;
  }

  .empty--img {
    width: 96px;
    height: 96px;
  }
</style>
