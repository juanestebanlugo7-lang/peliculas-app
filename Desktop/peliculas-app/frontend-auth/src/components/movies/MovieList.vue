<template>
  <div class="movies-container">
    <h1 class="movies-title">🎬 Catálogo de Películas</h1>
    
    <!-- Barra de búsqueda -->
    <div class="search-bar">
      <input 
        type="text" 
        v-model="searchInput" 
        @keyup.enter="performSearch" 
        placeholder="Buscar películas..." 
        class="search-input"
      />
      <button @click="performSearch" class="search-btn">Buscar</button>
      <button v-if="moviesStore.searchQuery" @click="clearSearch" class="clear-btn">Limpiar</button>
    </div>

    <!-- Filtros -->
    <MovieFilters />

    <!-- Resultados -->
    <div v-if="moviesStore.loading" class="loading">
      <div class="spinner"></div>
      Cargando películas...
    </div>

    <div v-else-if="moviesStore.error" class="error">
      {{ moviesStore.error }}
    </div>

    <div v-else class="movies-grid">
      <MovieCard v-for="movie in moviesStore.movies" :key="movie.id" :movie="movie" />
    </div>

    <div v-if="moviesStore.movies.length === 0 && !moviesStore.loading" class="empty">
      🎬 No se encontraron películas
    </div>

    <!-- Paginación -->
    <MoviePagination v-if="moviesStore.totalPages > 1" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useMoviesStore } from '../../stores/movies';
import MovieCard from './MovieCard.vue';
import MovieFilters from './MovieFilters.vue';
import MoviePagination from './MoviePagination.vue';

const moviesStore = useMoviesStore();
const searchInput = ref(moviesStore.searchQuery);

const performSearch = () => {
  moviesStore.searchQuery = searchInput.value;
  moviesStore.currentPage = 1;
  moviesStore.searchMovies();
};

const clearSearch = () => {
  searchInput.value = '';
  moviesStore.searchQuery = '';
  moviesStore.currentCategory = 'popular';
  moviesStore.selectedGenre = null;
  moviesStore.selectedYear = null;
  moviesStore.currentPage = 1;
  moviesStore.fetchMovies();
};

onMounted(() => {
  moviesStore.fetchMovies();
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
  color: #ff4444;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.movies-title:after {
  content: '';
  display: block;
  width: 80px;
  height: 3px;
  background: linear-gradient(90deg, #ff0000, #8b0000);
  margin: 10px auto 0;
  border-radius: 2px;
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
  border: 1px solid #2a0000;
  border-radius: 25px;
  font-size: 1rem;
  outline: none;
  background: #1a1a1a;
  color: #e0e0e0;
}

.search-input:focus {
  border-color: #ff0000;
  box-shadow: 0 0 10px rgba(255, 0, 0, 0.3);
}

.search-input::placeholder {
  color: #666;
}

.search-btn, .clear-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s;
}

.search-btn {
  background: linear-gradient(135deg, #8b0000 0%, #ff0000 100%);
  color: white;
}

.search-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 0 15px rgba(255, 0, 0, 0.5);
}

.clear-btn {
  background: #2a0000;
  color: #ff4444;
  border: 1px solid #ff0000;
}

.clear-btn:hover {
  background: #ff0000;
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
  color: #ff4444;
}

.empty {
  color: #888;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #2a0000;
  border-top-color: #ff0000;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
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