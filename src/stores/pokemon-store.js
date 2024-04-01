import { defineStore } from 'pinia';
import { api } from 'boot/axios';

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    pokemons: [],
    favorite_pokemons: [],
  }),
  actions: {
    async fetchPokemons() {
      return api.get('/')
      .then(res => {
        this.pokemons = res.data.results;
      });
    },
  },
});
