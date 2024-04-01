<template>
  <q-page class="flex flex-center">
    <q-table
      title="Pokemons"
      :columns="tableColumns"
      row-key="name"
      :rows="pokemons">
      <template #body="{row}">
        <tr @click="goToPokemon(row)">
          <td>{{ row.name }}</td>
          <td> 
            <q-icon :name="row.is_favorite ? 'favorite' : 'favorite_border'"/>
          </td>
        </tr>
      </template>
    </q-table>
  </q-page>
</template>

<script setup>
import { usePokemonStore } from 'stores/pokemon-store';
import { onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import isFavorite from 'app/src/utils/is-favorite';

const router = useRouter();

const pokeStore = usePokemonStore();
const pokemons = computed(() => pokeStore.pokemons.map(p => ({
  ...p,
  is_favorite: isFavorite(p.name),
})));

function goToPokemon(pokemon) {
  router.push(
    {path: `/detail/${pokemon.name}`},
  );
}


const tableColumns = [
  {
    name: 'name',
    label: 'Name',
    field: 'name',
    required: true,
    align: 'left',
    sortable: true,
  },
  {
    name: 'is_favorite',
    label: '',
    field: 'is_favorite',
    required: false,
    align: 'left',
    sortable: true,
  }
];

onMounted(() => {
  pokeStore.fetchPokemons();
  
});
defineOptions({
  name: 'IndexPage',
  inheritAttrs: false,
});
</script>
