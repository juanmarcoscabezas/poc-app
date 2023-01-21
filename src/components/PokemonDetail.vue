<template>
  <div class="pokemon--container" v-if="pokemon">
    <h3>{{ pokemon.name }}</h3>
    <img
      class="pokemon--list-img"
      :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + pokemon.id + '.png'" :alt="pokemon.url"
    >
  </div>
</template>

<script>
export default {
  name: 'PokemonDetail',
  props: ['id'],

  data: function () {
    return {
      pokemon: null,
    }
  },

  created() {
    this.getPokemons()
  },

  methods: {
    getPokemons: async function() {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + this.id)
        this.pokemon = await response.json()
      } catch (error) {
        console.error(error)
      }
      
    }
  }
}
</script>

<style scoped>
  .pokemon--container {
    display: flex;
    flex-direction: column;
  }

  .pokemon--list-img {
    margin: auto;
  }

  h3 {
    margin: 40px 0 0;
  }
</style>
