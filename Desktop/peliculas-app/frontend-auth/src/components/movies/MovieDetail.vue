<template>
  <div v-if="movie" class="detail-container">
    <div class="backdrop" :style="{ backgroundImage: `url(${movie.backdrop})` }">
      <div class="overlay"></div>
    </div>
    <div class="content">
      <img :src="movie.poster" :alt="movie.title" class="poster" />
      <div class="info">
        <h1>{{ movie.title }}</h1>
        <p class="tagline" v-if="movie.tagline">{{ movie.tagline }}</p>
        <div class="meta">{{ movie.year }} • {{ movie.runtime }} min • {{ movie.genres.join(', ') }}</div>
        <p class="overview">{{ movie.overview }}</p>
        <div class="list-buttons">
          <button @click="toggleLista('favoritas')" :class="{ active: enFavoritas }">❤️ favoritas</button>
          <button @click="toggleLista('pendientes')" :class="{ active: enPendientes }">⏳ pendientes</button>
          <button @click="toggleLista('vistas')" :class="{ active: enVistas }">👁️ vistas</button>
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="loading" class="loading">Cargando...</div>
  <div v-else class="error">No se encontró la película</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useMoviesStore } from '../../stores/movies';
import { useListaStore } from '../../stores/lista';

const route = useRoute();
const moviesStore = useMoviesStore();
const listaStore = useListaStore();
const movie = ref(null);
const loading = ref(true);
const enFavoritas = ref(false);
const enPendientes = ref(false);
const enVistas = ref(false);

onMounted(async () => {
  const id = route.params.id;
  movie.value = await moviesStore.fetchMovieDetails(id);
  enFavoritas.value = await listaStore.verificarEnLista('favoritas', id);
  enPendientes.value = await listaStore.verificarEnLista('pendientes', id);
  enVistas.value = await listaStore.verificarEnLista('vistas', id);
  loading.value = false;
});

const toggleLista = async (nombre) => {
  if (nombre === 'favoritas') {
    if (enFavoritas.value) await listaStore.quitarPelicula(nombre, movie.value.id);
    else await listaStore.agregarPelicula(nombre, movie.value.id);
    enFavoritas.value = !enFavoritas.value;
  } else if (nombre === 'pendientes') {
    if (enPendientes.value) await listaStore.quitarPelicula(nombre, movie.value.id);
    else await listaStore.agregarPelicula(nombre, movie.value.id);
    enPendientes.value = !enPendientes.value;
  } else if (nombre === 'vistas') {
    if (enVistas.value) await listaStore.quitarPelicula(nombre, movie.value.id);
    else await listaStore.agregarPelicula(nombre, movie.value.id);
    enVistas.value = !enVistas.value;
  }
};
</script>

<style scoped>
.detail-container { position: relative; min-height: 100vh; color: white; }
.backdrop {
  position: absolute; width: 100%; height: 100%; background-size: cover; filter: blur(8px); z-index: 0;
}
.overlay {
  position: absolute; width: 100%; height: 100%; background: rgba(0,0,0,0.7); z-index: 1;
}
.content {
  position: relative; z-index: 2; display: flex; gap: 2rem; padding: 2rem; max-width: 1200px; margin: 0 auto;
}
.poster { width: 300px; border-radius: 12px; }
.info { flex: 1; }
.meta { margin: 1rem 0; color: #ccc; }
.overview { line-height: 1.5; }
.list-buttons { display: flex; gap: 1rem; margin-top: 1.5rem; }
.list-buttons button {
  background: rgba(0,0,0,0.4); border: 1px solid #555; border-radius: 25px; padding: 0.5rem 1rem;
  cursor: pointer; color: white;
}
.list-buttons button.active { background: #8b0000; border-color: #ff0000; }
.loading, .error { text-align: center; padding: 2rem; color: white; }
</style>