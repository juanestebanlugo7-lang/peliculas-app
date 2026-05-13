<template>
  <div class="movies-container">
    <h1> Catálogo de Películas</h1>

    <!-- Barra de búsqueda -->
    <div class="search-bar">
      <input
        type="text"
        v-model="searchTerm"
        placeholder="Buscar películas..."
        @keyup.enter="performSearch"
      />
      <button @click="performSearch">Buscar</button>
      <button v-if="store.searchQuery" @click="clearSearch">Limpiar</button>
    </div>

    <!-- Filtros de categoría -->
    <div class="filters">
      <button
        v-for="cat in categories"
        :key="cat.value"
        @click="changeCategory(cat.value)"
        :class="{ active: store.currentCategory === cat.value }"
      >
        {{ cat.label }}
      </button>
    </div>

    <div v-if="store.loading">Cargando...</div>
    <div v-else class="grid">
      <MovieCard v-for="m in store.movies" :key="m.id" :movie="m" />
    </div>

    <!-- Paginación -->
    <div class="pagination" v-if="store.totalPages > 1">
      <button :disabled="store.currentPage === 1" @click="store.prevPage()">◀ Anterior</button>
      <span>Página {{ store.currentPage }} de {{ store.totalPages }}</span>
      <button :disabled="store.currentPage === store.totalPages" @click="store.nextPage()">Siguiente ▶</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useMoviesStore } from '../../stores/movies';
import MovieCard from './MovieCard.vue';

const store = useMoviesStore();
const searchTerm = ref(store.searchQuery);

const categories = [
  { label: 'Populares', value: 'popular' },
  { label: 'Mejor puntuadas', value: 'top_rated' },
  { label: 'Próximos estrenos', value: 'upcoming' },
  { label: 'En cines', value: 'now_playing' }
];

const changeCategory = (cat) => {
  store.searchQuery = '';
  searchTerm.value = '';
  store.currentCategory = cat;
  store.currentPage = 1;
  store.fetchMovies();
};

const performSearch = () => {
  store.searchQuery = searchTerm.value;
  store.currentPage = 1;
  store.searchMovies();
};

const clearSearch = () => {
  searchTerm.value = '';
  store.searchQuery = '';
  store.currentCategory = 'popular';
  store.currentPage = 1;
  store.fetchMovies();
};

onMounted(() => {
  if (store.searchQuery) searchTerm.value = store.searchQuery;
  store.fetchMovies();
});
</script>

<style scoped>
.movies-container { max-width: 1200px; margin: 0 auto; padding: 1rem; }
h1 { text-align: center; color: #ff4444; margin-bottom: 1rem; }
.search-bar {
  display: flex; gap: 0.5rem; justify-content: center; margin-bottom: 1rem;
}
.search-bar input {
  width: 300px; padding: 0.5rem; border-radius: 25px; border: 1px solid #2a0000;
  background: #1a1a1a; color: white;
}
.search-bar button {
  background: #8b0000; border: none; padding: 0.5rem 1rem; border-radius: 25px;
  color: white; cursor: pointer;
}
.filters { display: flex; gap: 1rem; justify-content: center; margin-bottom: 1rem; flex-wrap: wrap; }
.filters button {
  background: #1a1a1a; border: 1px solid #2a0000; padding: 0.5rem 1rem;
  border-radius: 25px; color: white; cursor: pointer;
}
.filters button.active { background: #8b0000; }
.grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
.pagination { display: flex; justify-content: center; gap: 1rem; margin-top: 2rem; }
.pagination button {
  background: #8b0000; border: none; padding: 0.25rem 0.75rem; border-radius: 20px;
  color: white; cursor: pointer;
}
@media (max-width: 1024px) { .grid { grid-template-columns: repeat(3,1fr); } }
@media (max-width: 768px) { .grid { grid-template-columns: repeat(2,1fr); } }
</style>