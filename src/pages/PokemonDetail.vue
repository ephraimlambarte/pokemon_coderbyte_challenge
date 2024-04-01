<script setup>
import { onMounted, ref, computed } from 'vue';
import { usePokemonStore } from 'stores/pokemon-store';
import { useRouter, useRoute } from 'vue-router'
import { useQuasar } from 'quasar';
import { api } from 'boot/axios';
import is_favorite from 'app/src/utils/is-favorite';
const router = useRouter();
const route = useRoute()
const pokemonName = route.params.name;


const pokeStore = usePokemonStore();
const $q = useQuasar();


const pokemon = ref(null);
const selectedPokemon = ref(null);


const fetchPokemonDetail = (url) => {
    return api.get(url)
    .then(res => {
        pokemon.value = res.data;
    });
}

const loadPokemon = () => {
    if (!pokeStore.pokemons.find(p => p.name === pokemonName)) {
        router.push(
            {name: 'notfound'},
        );
        return;
    }

    selectedPokemon.value = pokeStore.pokemons.find(p => p.name === pokemonName);
    $q.loading.show();

    fetchPokemonDetail(selectedPokemon.value.url)
    .finally(() => {
        $q.loading.hide();
    });
};

const pokemonImgUrl = computed(() => {
    if(!pokemon.value) {
        return null;
    }
    
    return pokemon.value.sprites.other.home.front_shiny;
});
const pokeNameDisplay  = computed(() => {
    if(!pokemon.value) {
        return null;
    }
    
    return pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
});
const toggleFavorites = () => {
    if (isFavorite.value) {
        const index = pokeStore.favorite_pokemons.findIndex(p => p.name === pokemonName)
        pokeStore.favorite_pokemons.splice(index, 1);
    } else {
        pokeStore.favorite_pokemons.push(pokemon.value);
    }
};
const isFavorite = computed(() => {
    return is_favorite(pokemonName);
});

onMounted(() => {
    if (pokeStore.pokemons.length === 0){
        router.push(
            {path: '/'},
        );
    } else {
        loadPokemon();
    }
});

</script>
<template>
    <div class="main-container" v-if="pokemon">
        <div class="primary-details-container">
            <div class="pokemon-img-container">
                <q-img :src="pokemonImgUrl"  spinner-color="white"/>    
            </div>
            <div class="primary-text-details-container">
                <h4>{{ pokeNameDisplay }} </h4> 
                <h4>Weight: {{ pokemon.weight }}</h4>
            </div>
        </div>
        <h3>Skills</h3>
        <ul>
            <li :key="'ability-'+index" v-for="(ability, index) in pokemon.abilities">{{ ability.ability.name }}</li>
        </ul>
        <q-page-sticky position="bottom-right" :offset="[50, 50]">
            <q-btn
                fab
                :icon="isFavorite ? 'favorite' : 'favorite_border'"
                color="accent"
                @click="toggleFavorites()"/>
        </q-page-sticky>
    </div>
</template>
<style scss>
h3 {
    margin: 0px
}
.main-container {
    display: flex;
    padding: 20px;
    flex-direction: column;
}
.primary-details-container {
    display: flex;
    gap: 20px;
}
.pokemon-img-container {
    width: 200px;
    height: 200px;
}
.text-details-container {
    height: 200px;
}
.primary-details-container {
    padding-bottom: 20px;
}
</style>