<template>
  <div class="pokemon--container" v-if="pokemon">
    <h3>{{ pokemon.name }}</h3>
    <img
      class="pokemon--list-img"
      @error="replaceImg"
      :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + pokemon.id + '.png'" :alt="pokemon.url"
    >
    <table>
      <thead>
        <tr>
          <th>Stat</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(stat, index) in pokemon.stats" :key="index">
          <td>{{ stat.stat.name }}</td>
          <td>{{ stat.base_stat }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'PokemonDetail',
  props: ['id'],

  data: function () {
    return {
      pokemon: null,
      placeholderImg: 'https://i.pinimg.com/originals/95/d5/cd/95d5cded00f3a3e8a98fb1eed568aa9f.png'
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
    },
    replaceImg(e) {
      e.target.src = this.placeholderImg
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
    width: 96px;
  }

  h3 {
    margin: 40px 0 0;
  }

  table {
    text-align: left;
    width: 400px;
    margin: auto;
  }
</style>
