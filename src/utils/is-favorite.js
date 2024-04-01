import { usePokemonStore } from 'stores/pokemon-store';
const pokeStore = usePokemonStore();

export default (pokemonName) => !!pokeStore.favorite_pokemons.find(p => p.name === pokemonName);