<template>
  <div class="movies-container">
    <h1 class="movies-title">Catálogo de Películas</h1>
    
    <div class="search-bar">
      <input type="text" v-model="searchQuery" @keyup.enter="searchMovies" placeholder="Buscar películas..." class="search-input" />
      <button @click="searchMovies" class="search-btn">Buscar</button>
      <button v-if="searchQuery" @click="clearSearch" class="clear-btn">Limpiar</button>
    </div>

    <div v-if="moviesStore.loading" class="loading">Cargando películas...</div>
    <div v-else-if="moviesStore.error" class="error">{{ moviesStore.error }}</div>
    <div v-else class="movies-grid">
      <MovieCard v-for="movie in moviesStore.movies" :key="movie.id" :movie="movie" />
    </div>
    <div v-if="moviesStore.movies.length === 0 && !moviesStore.loading" class="empty">No se encontraron películas</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useMoviesStore } from '../../stores/movies';
import MovieCard from './MovieCard.vue';

const moviesStore = useMoviesStore();
const searchQuery = ref('');

const searchMovies = () => {
  if (searchQuery.value.trim()) {
    moviesStore.searchMovies(searchQuery.value);
  }
};

const clearSearch = () => {
  searchQuery.value = '';
  moviesStore.fetchPopularMovies();
};

onMounted(() => {
  moviesStore.fetchPopularMovies();
});
</script>

<style scoped>
.movies-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}
.movies-title {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  color: #333;
}
.search-bar {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  justify-content: center;
}
.search-input {
  flex: 1;
  max-width: 400px;
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 25px;
  font-size: 1rem;
  outline: none;
}
.search-input:focus {
  border-color: #667eea;
}
.search-btn, .clear-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1rem;
}
.search-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}
.clear-btn {
  background: #f56565;
  color: white;
}
.movies-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}
.loading, .error, .empty {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
}
.error {
  color: #f56565;
}
@media (max-width: 1024px) {
  .movies-grid { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 768px) {
  .movies-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 480px) {
  .movies-grid { grid-template-columns: 1fr; }
}
</style>