<template>
  <div class="list-detail-container">
    <div class="header">
      <button @click="$router.back()" class="back-btn">← Volver</button>
      <h2>{{ listName }} ({{ movies.length }} películas)</h2>
    </div>

    <div v-if="loading" class="loading">Cargando películas...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="movies.length === 0" class="empty">No hay películas en esta lista.</div>
    <div v-else class="movies-grid">
      <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useListaStore } from '../stores/lista';
import { useMoviesStore } from '../stores/movies';
import MovieCard from '../components/movies/MovieCard.vue';

const route = useRoute();
const listaStore = useListaStore();
const moviesStore = useMoviesStore();

const listName = route.params.listName;
const movies = ref([]);
const loading = ref(true);
const error = ref('');

onMounted(async () => {
  try {
    await listaStore.fetchPeliculasDeLista(listName);
    const ids = listaStore.peliculasEnLista[listName] || [];
    const moviePromises = ids.map(id => moviesStore.fetchMovieDetails(id));
    const results = await Promise.all(moviePromises);
    movies.value = results.filter(m => m !== null);
  } catch (err) {
    console.error(err);
    error.value = 'Error al cargar las películas de la lista.';
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.list-detail-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}
.header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}
.back-btn {
  background: #8b0000;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  color: white;
  cursor: pointer;
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
@media (max-width: 1024px) {
  .movies-grid { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 768px) {
  .movies-grid { grid-template-columns: repeat(2, 1fr); }
}
</style>