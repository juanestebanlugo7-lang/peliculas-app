<template>
  <div v-if="movie" class="movie-detail">
    <!-- Backdrop -->
    <div class="backdrop" :style="{ backgroundImage: `url(${movie.backdrop})` }">
      <div class="overlay"></div>
    </div>

    <div class="content">
      <!-- Póster -->
      <div class="poster">
        <img :src="movie.poster" :alt="movie.title" />
      </div>

      <!-- Información principal -->
      <div class="info">
        <h1>{{ movie.title }}</h1>
        <p v-if="movie.tagline" class="tagline">{{ movie.tagline }}</p>
        <div class="meta">
          <span>{{ movie.year }}</span>
          <span v-if="movie.runtime">{{ movie.runtime }} min</span>
          <span>{{ movie.genres.join(', ') }}</span>
        </div>
        <div class="rating">⭐ {{ movie.rating }} / 10 ({{ movie.votes }} votos)</div>
        <p class="overview">{{ movie.overview }}</p>

        <!-- Botones de listas -->
        <div class="list-buttons">
          <button @click="toggleLista('favoritas')" :class="{ active: enFavoritas }">favoritas</button>
          <button @click="toggleLista('pendientes')" :class="{ active: enPendientes }">pendientes</button>
          <button @click="toggleLista('vistas')" :class="{ active: enVistas }">vistas</button>
        </div>
      </div>
    </div>

    <!-- Tráiler (si existe) -->
    <div v-if="movie.videos?.results?.length" class="trailer-section">
      <h3> Tráiler</h3>
      <iframe width="100%" height="400" :src="`https://www.youtube.com/embed/${movie.videos.results[0].key}`" frameborder="0" allowfullscreen></iframe>
    </div>

    <!-- Reparto principal -->
    <div v-if="movie.credits?.cast?.length" class="cast-section">
      <h3> Reparto Principal</h3>
      <div class="cast-list">
        <div v-for="actor in movie.credits.cast.slice(0, 8)" :key="actor.id" class="cast-item">
          <img v-if="actor.profile_path" :src="`https://image.tmdb.org/t/p/w185${actor.profile_path}`" :alt="actor.name" />
          <div v-else class="no-image"></div>
          <p><strong>{{ actor.name }}</strong></p>
          <small>{{ actor.character }}</small>
        </div>
      </div>
    </div>

    <!-- Películas recomendadas -->
    <div v-if="movie.recommendations?.results?.length" class="recommendations-section">
      <h3> Recomendaciones</h3>
      <div class="recommendations-list">
        <div v-for="rec in movie.recommendations.results.slice(0, 6)" :key="rec.id" class="rec-card" @click="goToMovie(rec.id)">
          <img v-if="rec.poster_path" :src="`https://image.tmdb.org/t/p/w200${rec.poster_path}`" :alt="rec.title" />
          <div v-else class="no-poster"></div>
          <p>{{ rec.title }}</p>
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="loading" class="loading">Cargando...</div>
  <div v-else class="error">No se encontró la película</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMoviesStore } from '../../stores/movies';
import { useListaStore } from '../../stores/lista';

const route = useRoute();
const router = useRouter();
const moviesStore = useMoviesStore();
const listaStore = useListaStore();

const movie = ref(null);
const loading = ref(true);
const enFavoritas = ref(false);
const enPendientes = ref(false);
const enVistas = ref(false);

onMounted(async () => {
  const id = route.params.id;
  try {
    movie.value = await moviesStore.fetchMovieDetails(id);
    if (movie.value) {
      enFavoritas.value = await listaStore.verificarEnLista('favoritas', id);
      enPendientes.value = await listaStore.verificarEnLista('pendientes', id);
      enVistas.value = await listaStore.verificarEnLista('vistas', id);
    }
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
});

const toggleLista = async (nombre) => {
  if (!movie.value) return;
  const en = (nombre === 'favoritas' ? enFavoritas : nombre === 'pendientes' ? enPendientes : enVistas).value;
  if (en) await listaStore.quitarPelicula(nombre, movie.value.id);
  else await listaStore.agregarPelicula(nombre, movie.value.id);
  if (nombre === 'favoritas') enFavoritas.value = !enFavoritas.value;
  else if (nombre === 'pendientes') enPendientes.value = !enPendientes.value;
  else enVistas.value = !enVistas.value;
};

const goToMovie = (id) => {
  router.push(`/movie/${id}`);
};
</script>

<style scoped>

.movie-detail { 
  position: relative; 
  min-height: 100vh; 
  color: white; }

.backdrop 
{ position: absolute;
   width: 100%;
    height: 100%; 
    background-size: cover;
     filter: blur(8px);
      z-index: 0; }
.overlay 
{ position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.7);
  z-index: 1; }
.content 
{ position: relative;
  z-index: 2;
  display: flex;
  gap: 2rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto; }
.poster img { 
  width: 300px;
  border-radius: 12px; }
.info 
{ flex: 1; }
.tagline 
{ font-style: italic;
  color: #ccc;
  margin-bottom: 0.5rem; }
.meta 
{ display: flex;
  gap: 1rem;
  margin: 1rem 0;
  color: #ccc; }
.rating 
{ background: rgba(0,0,0,0.5);
  display: inline-block;
  padding: 0.2rem 0.8rem;
  border-radius: 20px;
  margin: 1rem 0; }
.overview { 
  line-height: 1.5;
  margin-bottom: 1rem; }
.list-buttons {
  display: flex;
  gap: 1rem; }
.list-buttons button {
  background: rgba(0,0,0,0.4);
  border: 1px solid #555;
    border-radius: 25px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  color: white;
}
.list-buttons button.active { 
  background: #8b0000;
  border-color: #ff0000; }

.trailer-section, .cast-section, .recommendations-section {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}
h3 { 
  margin-bottom: 1rem;
  border-left: 4px solid #8b0000;
  padding-left: 1rem; }
.cast-list, .recommendations-list {
  display: flex;
  gap: 1rem; 
  overflow-x: auto;
  padding-bottom: 1rem;
}
.cast-item, .rec-card {
  flex: 0 0 120px;
  text-align: center;
  cursor: pointer;
}
.cast-item img, .rec-card img { 
  width: 120px;
  border-radius: 8px; }
.no-image, .no-poster {
  width: 120px;
  height: 180px;
  background: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  border-radius: 8px;
}
.loading, .error { 
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem; }
</style>